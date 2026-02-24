'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export interface LenisOptions {
  /** Scroll duration multiplier. Lower is faster. Default 1.2 */
  duration?: number;
  /** Easing function for scroll momentum */
  easing?: (t: number) => number;
  /** Disable on touch / pointer-coarse devices */
  disableOnTouch?: boolean;
}

/**
 * useLenis — initialises Lenis smooth scroll with GPU-acceleration hooks.
 *
 * GPU optimisations applied:
 *  - `will-change: transform` on <html> during active scroll, removed on idle
 *    so the compositor layer is only promoted when actually needed.
 *  - `transform: translateZ(0)` on <body> forces a new composite layer,
 *    preventing the browser from re-painting the whole page on scroll.
 *  - RAF loop is driven by Lenis itself (no duplicate requestAnimationFrame).
 *
 * Native CSS `scroll-behavior: smooth` is kept in globals.css as a
 * zero-JS fallback for reduced-motion preferences and crawlers.
 */
export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    disableOnTouch = true,
  } = options;

  useEffect(() => {
    // Respect prefers-reduced-motion — fall back to native scroll
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pointer-coarse = touch device; native momentum scroll is better there
    const isTouch =
      disableOnTouch &&
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;

    if (prefersReduced || isTouch) return;

    // Force composite layer on <body> — avoids full-page repaints during scroll
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';

    const lenis = new Lenis({ duration, easing });
    lenisRef.current = lenis;

    let rafId: number;
    let scrolling = false;
    let idleTimeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        // Promote html element to compositor layer only while scrolling
        document.documentElement.style.willChange = 'transform';
      }
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        scrolling = false;
        // Release the layer when idle — avoids permanent VRAM usage
        document.documentElement.style.willChange = 'auto';
      }, 150);
    };

    lenis.on('scroll', onScroll);

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimeout);
      lenis.destroy();
      lenisRef.current = null;

      // Clean up GPU hints
      document.documentElement.style.willChange = 'auto';
      document.body.style.transform = '';
      document.body.style.backfaceVisibility = '';
    };
  }, [duration, easing, disableOnTouch]);

  return lenisRef;
}
