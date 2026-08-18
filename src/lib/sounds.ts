"use client";

import { Howl, Howler } from "howler";

/**
 * Audio files must live in /public/sounds/ (served locally, no external CDN):
 *   tap_01.mp3 ... tap_05.mp3, select.mp3, bgm.mp3
 */
const SFX_VOLUME = 0.15;
const BGM_VOLUME = 0.095;
const SRC = "/sounds";

let hoverSounds: Howl[] | null = null;
let selectSound: Howl | null = null;
let bgm: Howl | null = null;

/** Lazily builds Howl instances once, client-side only. */
function getSounds() {
  if (typeof window === "undefined") {
    return { hoverSounds: [], selectSound: null, bgm: null };
  }
  if (!hoverSounds) {
    hoverSounds = [1, 2, 3, 4, 5].map(
      (n) =>
        new Howl({
          src: [`${SRC}/tap_0${n}.mp3`],
          volume: SFX_VOLUME,
        })
    );
    selectSound = new Howl({ src: [`${SRC}/select.mp3`], volume: SFX_VOLUME });
    bgm = new Howl({
      src: [`${SRC}/bgm.mp3`],
      volume: BGM_VOLUME,
      loop: true,
      autoplay: false,
      html5: true,
      preload: false,
    });
  }
  return { hoverSounds, selectSound, bgm };
}

function resumeAudioContext() {
  if (Howler.ctx && Howler.ctx.state === "suspended") Howler.ctx.resume();
}

/** Plays one random hover tap (only if sound is enabled). */
export function playHoverSound(enabled: boolean) {
  if (!enabled) return;
  const { hoverSounds } = getSounds();
  if (!hoverSounds?.length) return;
  resumeAudioContext();
  hoverSounds[Math.floor(Math.random() * hoverSounds.length)].play();
}

/** Plays the click/select sound (only if sound is enabled). */
export function playSelectSound(enabled: boolean) {
  if (!enabled) return;
  const { selectSound } = getSounds();
  resumeAudioContext();
  selectSound?.play();
}

/** Starts/resumes the looping background track. */
export function playBgm(enabled: boolean) {
  if (!enabled) return;
  const { bgm } = getSounds();
  if (!bgm) return;
  resumeAudioContext();
  bgm.volume(BGM_VOLUME);
  if (bgm.state() === "unloaded") bgm.load();
  if (!bgm.playing()) bgm.play();
}

/** Fades the bgm out, optionally pausing after the fade (used on page-leave). */
export function stopBgm(fade = false) {
  const { bgm } = getSounds();
  if (!bgm?.playing()) return;
  if (fade) {
    bgm.fade(BGM_VOLUME, 0, 600);
    bgm.once("fade", () => bgm.pause());
  } else {
    bgm.pause();
  }
}

/**
 * Attaches the site-wide "anything with button/a gets a hover tap + click
 * select sound" behavior. Call once, e.g. from a top-level provider effect.
 * Returns a cleanup function.
 */
export function attachGlobalSoundListeners(getEnabled: () => boolean) {
  if (typeof window === "undefined") return () => {};

  const onEnter = (e: MouseEvent) => {
    const target = e.target;
    if (target instanceof Element && target.matches("button, a")) {
      playHoverSound(getEnabled());
    }
  };
  const onClick = (e: MouseEvent) => {
    if ((e.target as Element)?.closest?.("button, a")) {
      playSelectSound(getEnabled());
    }
  };

  document.addEventListener("mouseenter", onEnter, true);
  document.addEventListener("click", onClick, true);

  return () => {
    document.removeEventListener("mouseenter", onEnter, true);
    document.removeEventListener("click", onClick, true);
  };
}
