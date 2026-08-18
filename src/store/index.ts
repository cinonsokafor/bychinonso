import { create } from "zustand";
import type Lenis from "lenis";

interface GlobalState {
  scroller: Lenis | null;
  setScroller: (scroller: Lenis | null) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (isPreloaderComplete: boolean) => void;
}

export const useGlobal = create<GlobalState>((set) => ({
  scroller: null,
  setScroller: (scroller) => set({ scroller }),
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  isPreloaderComplete: false,
  setIsPreloaderComplete: (isPreloaderComplete) => set({ isPreloaderComplete }),
}));

export const useMenuOpen = () => {
  const { isMenuOpen, setIsMenuOpen } = useGlobal();
  return { isMenuOpen, setIsMenuOpen };
};

export const usePreloaderComplete = () => {
  const { isPreloaderComplete, setIsPreloaderComplete } = useGlobal();
  return { isPreloaderComplete, setIsPreloaderComplete };
};

export const useScroller = () => {
  const { scroller, setScroller } = useGlobal();
  return { scroller, setScroller };
};
