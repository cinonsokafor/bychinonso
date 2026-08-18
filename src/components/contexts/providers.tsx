"use client";
import { ThemeProvider } from 'next-themes';
import LenisProvider from '@/components/contexts/lenis-provider';
import PageTransition from '../layouts/PageTransition';
import Preloader from '../layouts/Preloader';
// import PageTransition from '@/components/layouts/page-transition';
// import Preloader from "@/components/layouts/Preloader"
// import { QueryProvider } from '@/components/layouts/query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      themes={['light', 'dark']}
      defaultTheme="red"
      disableTransitionOnChange
    >
      <Preloader />
      <PageTransition>
        <LenisProvider>
          {children}
        </LenisProvider>
      </PageTransition>
    </ThemeProvider>
  );
}

{/* <div
  id="layer"
  className="red:text-white red:bg-red pointer-events-none fixed inset-0 z-[3] flex items-center justify-center bg-black text-white dark:bg-white dark:text-black"
  style={{ clipPath: "inset(100% 0% 0% 0%)" }}
>
  <div className="max-w-[14rem]">
    
  </div>
</div> */}
