import type { DotMatrixInstance } from "./dotMatrixShader";

let heroShaderInstance: DotMatrixInstance | null = null;

export function setHeroShaderInstance(instance: DotMatrixInstance | null) {
  heroShaderInstance = instance;
}

export function getHeroShaderInstance() {
  return heroShaderInstance;
}
