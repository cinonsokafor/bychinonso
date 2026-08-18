"use client";

import { gsap, DURATIONS } from "@/lib/gsap";

const SCREEN_SELECTOR = "#transition-screen";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Fades the cover screen IN (opaque). Ported from Ct(). */
export function coverIn() {
  const reduced = prefersReducedMotion();
  const tl = gsap.timeline();
  if (reduced) {
    tl.set(SCREEN_SELECTOR, { autoAlpha: 1 });
  } else {
    tl.set(SCREEN_SELECTOR, { willChange: "opacity" })
      .to(SCREEN_SELECTOR, { autoAlpha: 1, duration: 0.35, ease: "ease-transition" })
      .set(SCREEN_SELECTOR, { willChange: "auto" });
  }
  return tl;
}

/** Fades the cover screen OUT (transparent). Ported from Rt(). */
export function coverOut() {
  const reduced = prefersReducedMotion();
  const tl = gsap.timeline();
  if (reduced) {
    tl.set(SCREEN_SELECTOR, { autoAlpha: 0 });
  } else {
    tl.to(SCREEN_SELECTOR, { autoAlpha: 0, duration: 0.35, ease: "ease-transition" });
  }
  return tl;
}

/**
 * Generic fallback intro for any element carrying [data-animate] inside the
 * given scope. Ported 1:1 from It(container). Page-level components can use
 * their own custom intro instead by simply not using [data-animate] and
 * calling their own useGSAP timeline on mount.
 */
export function genericIntro(scope: HTMLElement | Document = document) {
  const reduced = prefersReducedMotion();
  const els = scope.querySelectorAll<HTMLElement>("[data-animate]");
  const tl = gsap.timeline({ defaults: { ease: "ease-transition" } });
  if (!els.length) return tl;

  if (reduced) {
    tl.set(els, { autoAlpha: 1, y: 0 });
    return tl;
  }

  tl.fromTo(
    els,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: DURATIONS.slow,
      stagger: DURATIONS.stagger,
      clearProps: "transform",
    }
  );
  return tl;
}
