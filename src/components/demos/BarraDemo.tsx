"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { linkWhatsApp } from "@/data/site";

// Faixa no topo de toda demo, lembrando que é um modelo e levando de volta ao site principal.
// Some quando a página está dentro da prévia em miniatura do carrossel.
export default function BarraDemo({ nome }: { nome: string }) {
  const [emPrevia, setEmPrevia] = useState(false);
  useEffect(() => setEmPrevia(window.self !== window.top), []);
  if (emPrevia) return null;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-[#0d0d0c] px-4 py-2 font-mono text-xs text-[#f1ede4]">
      <Link href="/#modelos" className="shrink-0 hover:text-[#ff4d1c]">← serpa.dev</Link>
      <span className="hidden truncate text-[#8a877f] sm:block">Modelo de demonstração. Nomes e dados são fictícios.</span>
      <a
        href={linkWhatsApp(`Olá, Serpa! Vi o modelo "${nome}" no seu site e quero um projeto parecido.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-[#ff4d1c] px-3 py-1 font-semibold text-[#0d0d0c]"
      >
        Quero um assim
      </a>
    </div>
  );
}
