"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Rolagem suave em todo o site, inclusive nos links de âncora do menu.
export default function RolagemSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15 });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    const clique = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const alvo = document.getElementById(link.hash.slice(1));
      if (!alvo) return;
      e.preventDefault();
      lenis.resize();
      lenis.scrollTo(alvo, { offset: -64 });
      history.replaceState(null, "", link.hash);
    };
    document.addEventListener("click", clique);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("click", clique);
      lenis.destroy();
    };
  }, []);
  return null;
}
