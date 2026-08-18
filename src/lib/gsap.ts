"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

/** Exact timing tokens from the original bundle (var c = {...}). */
export const DURATIONS = {
  offset: 375,
  fast: 0.3,
  normal: 0.65,
  slow: 1.075,
  slower: 1.25,
  stagger: 0.05,
  ease: {
    transition: "cubic-bezier(0.22, 1, 0.36, 1)",
    pop: "cubic-bezier(0.48, 1.68, 0.64, 1)",
    fade: "cubic-bezier(0.76, 0, 0.24, 1)",
  },
} as const;

let registered = false;

/**
 * Registers GSAP plugins + the site's custom eases exactly once.
 * Call registerGsap() at the top of any client component that needs GSAP
 * (or rely on it being called once in <PageTransition>, which every page
 * is wrapped in).
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

  CustomEase.create("ease-primary", "0.55, 0, 0.7, 0");
  CustomEase.create("ease-secondary", "0.31, 0.75, 0.22, 1");
  CustomEase.create("ease-fade", "0.76, 0, 0.24, 1");
  CustomEase.create("ease-preloader", "0.25, 1, 0.5, 1");
  CustomEase.create("ease-transition", "0.22, 1, 0.36, 1");
  CustomEase.create("ease-menu", ".7,0,.22,1");

  registered = true;
}

export { gsap, ScrollTrigger, SplitText };

