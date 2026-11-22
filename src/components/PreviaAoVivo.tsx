"use client";

import { useEffect, useRef, useState } from "react";

// Mostra a página de demonstração de verdade, em miniatura, dentro de um iframe.
export default function PreviaAoVivo({ src, titulo }: { src: string; titulo: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(0.25);
  const [carregou, setCarregou] = useState(false);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / 1280));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={caixa} className="relative aspect-[16/10] overflow-hidden bg-tinta-2">
      {!carregou && <div className="absolute inset-0 animate-pulse bg-linha/40" />}
      <iframe
        src={src}
        title={`Prévia: ${titulo}`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden
        onLoad={() => setCarregou(true)}
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
        style={{ width: 1280, height: 800, transform: `scale(${escala})` }}
      />
    </div>
  );
}
