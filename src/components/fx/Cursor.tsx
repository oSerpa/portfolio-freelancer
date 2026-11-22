"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// Cursor próprio no desktop: um ponto que cresce sobre links e botões.
export default function Cursor() {
  const [ativo, setAtivo] = useState(false);
  const [sobre, setSobre] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setAtivo(true);
    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setSobre(!!(e.target as Element).closest?.("a, button, select, input, textarea, label, [data-cursor]"));
    };
    window.addEventListener("pointermove", mover);
    return () => window.removeEventListener("pointermove", mover);
  }, [x, y]);

  if (!ativo) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      animate={{ width: sobre ? 48 : 10, height: sobre ? 48 : 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full bg-papel mix-blend-difference"
    />
  );
}
