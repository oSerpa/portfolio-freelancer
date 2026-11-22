"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

// O elemento é "puxado" na direção do mouse quando ele chega perto.
export default function Magnetico({ children, forca = 0.35, className }: { children: React.ReactNode; forca?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function mover(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * forca);
    y.set((e.clientY - r.top - r.height / 2) * forca);
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={mover} onPointerLeave={() => { x.set(0); y.set(0); }} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}
