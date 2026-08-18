"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobal } from "@/store";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  // useGlobal with selector — Zustand-style: (state) => state.setScroller
  const setScroller = useGlobal((state) => state.setScroller);

  useEffect(() => {
    // Instantiated with no options — uses Lenis defaults
    const lenis = new Lenis({});

    // Wire Lenis RAF to GSAP ticker (time comes in seconds from GSAP, Lenis wants ms)
    function onTick(time: number) {
      lenis.raf(time * 1000);
    }

    // Register lenis instance in global store (used by other components)
    setScroller(lenis);

    // Sync Lenis scroll position with ScrollTrigger on every scroll event
    ScrollTrigger.refresh();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.isScrolling && lenis.stop();
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      setScroller(null);
      gsap.ticker.remove(onTick);
    };
  }, [setScroller]);

  // Renders children directly — this component is purely a side-effect wrapper
  return children;
}
