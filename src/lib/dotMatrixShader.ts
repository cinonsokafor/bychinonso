"use client";

import * as THREE from "three";
import { gsap } from "@/lib/gsap";

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FIELD_FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform float uAmplitude;
  uniform float uReveal;

  varying vec2 vUv;

  void main() {
    vec2 c = 2.0 * vUv - 1.0;
    float ds = uAmplitude * uReveal;

    c += ds * 0.4 * sin(c.yx + vec2(1.2, 3.4) + uTime);
    c += ds * 0.2 * sin(5.2 * c.yx + vec2(3.5, 0.4) + uTime);
    c += ds * 0.3 * sin(3.5 * c.yx + vec2(1.2, 3.1) + uTime);
    c += ds * 1.6 * sin(0.4 * c.yx + vec2(0.8, 2.4) + uTime);

    float L = length(c);
    float v = 0.0;
    for (int i = 0; i < 4; i++) {
      v = mix(v, float(i) / 3.0, cos(float(i) * L));
    }

    gl_FragColor = vec4(clamp(v, 0.0, 1.0), 0.0, 0.0, 1.0);
  }
`;

const HALFTONE_FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D uFieldTex;
  uniform vec2 uFieldRes;
  uniform vec2 uResolution;
  uniform float uReveal;

  uniform float uPixelSize;
  uniform float uGooeyness;
  uniform float uContrast;
  uniform float uBias;
  uniform int uInvert;
  uniform vec3 uBg;
  uniform vec3 uFg;
  uniform int uTransparentBg;

  // Vertical wave modulation — adds a scrolling sine wave to the dot bias.
  // Set uWaveAmplitude = 0 to disable.
  uniform float uWaveTime;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;

  varying vec2 vUv;

  float lumaToRadius(float luma, float pixelSize, float biasOffset) {
    float v = clamp((luma - 0.5 + uBias + biasOffset) * uContrast + 0.5, 0.0, 1.0);
    if (uInvert == 1) v = 1.0 - v;
    return v * pixelSize * 0.6 + pixelSize * 0.05;
  }

  float smin(float a, float b, float k) {
    if (k <= 0.001) return min(a, b);
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
  }

  void main() {
    vec2 pixelCoord = vUv * uResolution;
    vec2 baseCellIndex = floor(pixelCoord / uPixelSize);
    float minDist = 1.0e5;
    float smoothK = uGooeyness * 1.5;

    // R=1 → 3×3 neighborhood, checkerboard skip → 5 active cells/fragment.
    const int R = 1;
    for (int dx = -R; dx <= R; dx++) {
      for (int dy = -R; dy <= R; dy++) {
        vec2 cellIndex = baseCellIndex + vec2(float(dx), float(dy));
        if (mod(cellIndex.x + cellIndex.y, 2.0) > 0.5) continue;

        vec2 cellCenter = (cellIndex + 0.5) * uPixelSize;
        vec2 fieldUv    = (cellIndex + 0.5) / uFieldRes;
        float luma      = texture2D(uFieldTex, fieldUv).r;

        float cellY     = cellCenter.y / uResolution.y;
        float wavePhase = cellY * uWaveFrequency * 6.2831853 - uWaveTime;
        float waveBias  = sin(wavePhase) * uWaveAmplitude;

        float dist   = length(pixelCoord - cellCenter);
        float radius = lumaToRadius(luma, uPixelSize, waveBias);
        minDist = smin(minDist, dist - radius, smoothK * uPixelSize);
      }
    }

    float aa    = max(fwidth(minDist), 0.0001);
    float shape = 1.0 - smoothstep(-aa, aa, minDist);

    if (uTransparentBg == 1) {
      gl_FragColor = vec4(uFg * uReveal, shape * uReveal);
    } else {
      vec3 color = mix(uBg, uFg, shape);
      gl_FragColor = vec4(color * uReveal, 1.0);
    }
  }
`;

export interface DotMatrixParams {
  amplitude: number;
  timeSpeed: number;
  holdAmplitudeMultiplier: number;
  holdTimeSpeedMultiplier: number;
  lerpSpeed: number;
  autoReveal: boolean;
  revealDuration: number;
  revealDelay: number;
  revealEase: string;
  pixelSize: number;
  gooeyness: number;
  contrast: number;
  bias: number;
  invert: 0 | 1;
  bg: string;
  fg: string;
  transparentBg: 0 | 1;
  waveFrequency: number;
  waveAmplitude: number;
  waveTimeSpeed: number;
  maxDpr: number;
  targetFrameMs: number;
  interactive: boolean;
}

export const DEFAULT_DOT_MATRIX_PARAMS: DotMatrixParams = {
  amplitude: 0.8,
  timeSpeed: 0.0045,
  holdAmplitudeMultiplier: 2,
  holdTimeSpeedMultiplier: 1.5,
  lerpSpeed: 0.03,
  autoReveal: true,
  revealDuration: 2,
  revealDelay: 0.3,
  revealEase: "ease-secondary",
  pixelSize: 4,
  gooeyness: 0.58,
  contrast: 1.5,
  bias: 0,
  invert: 1,
  bg: "#E8E8E3",
  fg: "#080807",
  transparentBg: 0,
  waveFrequency: 1,
  waveAmplitude: 0,
  waveTimeSpeed: 0,
  maxDpr: 1,
  targetFrameMs: 1000 / 60,
  interactive: true,
};

function colorToVec3(hex: string) {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

export interface DotMatrixInstance {
  destroy: () => void;
  resize: () => void;
  params: DotMatrixParams;
  revealState: { reveal: number };
  syncReveal: () => void;
}

/**
 * Ported 1:1 from Le(container, canvas, options). Two render passes:
 * 1) a low-res "field" pass generates a turbulent luminance field,
 * 2) a display pass samples that field per-cell to draw smoothly-merged
 *    ("gooey") dots — classic metaball/halftone technique.
 * Holding mousedown/touchstart boosts amplitude+speed ("hold to disrupt"),
 * only when params.interactive is true.
 */
export function initDotMatrixShader(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  overrides: Partial<DotMatrixParams> = {}
): DotMatrixInstance {
  const params: DotMatrixParams = { ...DEFAULT_DOT_MATRIX_PARAMS, ...overrides };

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setClearColor(0, params.transparentBg ? 0 : 1);

  const fieldTarget = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RedFormat,
    type: THREE.UnsignedByteType,
    depthBuffer: false,
    stencilBuffer: false,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);

  const fieldMaterial = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FIELD_FRAGMENT_SHADER,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: params.amplitude },
      uReveal: { value: 0 },
    },
  });

  const halftoneMaterial = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: HALFTONE_FRAGMENT_SHADER,
    transparent: params.transparentBg === 1,
    uniforms: {
      uFieldTex: { value: fieldTarget.texture },
      uFieldRes: { value: new THREE.Vector2(1, 1) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uReveal: { value: 0 },
      uPixelSize: { value: params.pixelSize },
      uGooeyness: { value: params.gooeyness },
      uContrast: { value: params.contrast },
      uBias: { value: params.bias },
      uInvert: { value: params.invert },
      uBg: { value: colorToVec3(params.bg) },
      uFg: { value: colorToVec3(params.fg) },
      uTransparentBg: { value: params.transparentBg },
      uWaveTime: { value: 0 },
      uWaveFrequency: { value: params.waveFrequency },
      uWaveAmplitude: { value: params.waveAmplitude },
    },
  });

  const fieldScene = new THREE.Scene();
  const displayScene = new THREE.Scene();
  fieldScene.add(new THREE.Mesh(geometry, fieldMaterial));
  displayScene.add(new THREE.Mesh(geometry, halftoneMaterial));

  const hold = { isHolding: false, currentAmplitude: params.amplitude, currentTimeSpeed: params.timeSpeed };
  const revealState = { reveal: 0 };

  const syncReveal = () => {
    fieldMaterial.uniforms.uReveal.value = revealState.reveal;
    halftoneMaterial.uniforms.uReveal.value = revealState.reveal;
  };

  const autoRevealTween = () => {
    gsap.to(revealState, {
      reveal: 1,
      duration: params.revealDuration,
      delay: params.revealDelay,
      ease: params.revealEase,
      onUpdate: syncReveal,
    });
  };

  const onHoldStart = () => (hold.isHolding = true);
  const onHoldEnd = () => (hold.isHolding = false);

  if (params.interactive) {
    canvas.addEventListener("mousedown", onHoldStart);
    window.addEventListener("mouseup", onHoldEnd);
    canvas.addEventListener("touchstart", onHoldStart, { passive: true });
    window.addEventListener("touchend", onHoldEnd);
  }

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    const dpr = Math.min(window.devicePixelRatio, params.maxDpr);
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr);
    const pw = w * dpr;
    const ph = h * dpr;
    halftoneMaterial.uniforms.uResolution.value.set(pw, ph);
    const fw = Math.ceil(pw / params.pixelSize) + 1;
    const fh = Math.ceil(ph / params.pixelSize) + 1;
    fieldTarget.setSize(fw, fh);
    halftoneMaterial.uniforms.uFieldRes.value.set(fw, fh);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  let isIntersecting = true;
  let ticking = false;

  const renderFrame = (_time: number, deltaMs: number) => {
    const clampedDelta = Math.min(deltaMs / params.targetFrameMs, 3);
    const targetAmplitude = hold.isHolding ? params.amplitude * params.holdAmplitudeMultiplier : params.amplitude;
    const targetTimeSpeed = hold.isHolding ? params.timeSpeed * params.holdTimeSpeedMultiplier : params.timeSpeed;
    const lerpFactor = 1 - Math.pow(1 - params.lerpSpeed, clampedDelta);

    hold.currentAmplitude += (targetAmplitude - hold.currentAmplitude) * lerpFactor;
    hold.currentTimeSpeed += (targetTimeSpeed - hold.currentTimeSpeed) * lerpFactor;
    fieldMaterial.uniforms.uAmplitude.value = hold.currentAmplitude;
    fieldMaterial.uniforms.uTime.value += hold.currentTimeSpeed * clampedDelta;

    if (params.waveAmplitude > 0 && params.waveTimeSpeed > 0) {
      halftoneMaterial.uniforms.uWaveTime.value += params.waveTimeSpeed * clampedDelta;
    }

    renderer.setRenderTarget(fieldTarget);
    renderer.render(fieldScene, camera);
    renderer.setRenderTarget(null);
    renderer.render(displayScene, camera);
  };

  const startTicking = () => {
    if (!ticking) {
      gsap.ticker.add(renderFrame);
      ticking = true;
    }
  };
  const stopTicking = () => {
    if (ticking) {
      gsap.ticker.remove(renderFrame);
      ticking = false;
    }
  };

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) startTicking();
      else stopTicking();
    },
    { threshold: 0 }
  );
  intersectionObserver.observe(canvas);

  const onVisibilityChange = () => {
    if (document.hidden) stopTicking();
    else if (isIntersecting) startTicking();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const destroy = () => {
    stopTicking();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (params.interactive) {
      window.removeEventListener("mouseup", onHoldEnd);
      window.removeEventListener("touchend", onHoldEnd);
      canvas.removeEventListener("mousedown", onHoldStart);
      canvas.removeEventListener("touchstart", onHoldStart);
    }
    gsap.killTweensOf(revealState);
    fieldScene.clear();
    displayScene.clear();
    geometry.dispose();
    fieldMaterial.dispose();
    halftoneMaterial.dispose();
    fieldTarget.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  // initial paint
  resize();
  renderer.setRenderTarget(fieldTarget);
  renderer.render(fieldScene, camera);
  renderer.setRenderTarget(null);
  renderer.render(displayScene, camera);
  canvas.style.opacity = "1";
  startTicking();
  if (params.autoReveal) autoRevealTween();

  return { destroy, resize, params, revealState, syncReveal };
}
