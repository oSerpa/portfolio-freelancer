"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { linguagens } from "@/data/conteudo";

// Duas faixas que andam em sentidos opostos conforme a rolagem.
export default function FaixaTecnologias() {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const nomes = linguagens.map((l) => l.nome);
  const linha = [...nomes, ...nomes, ...nomes];

  return (
    <a href="#linguagens" ref={ref} className="group relative block overflow-hidden border-y border-linha pb-6 pt-12" aria-label="Ver todas as linguagens com detalhes">
      <span className="rotulo absolute right-5 top-2 z-10 bg-tinta px-2 py-1 text-cinza transition-colors group-hover:text-brasa md:right-8">Ver todas com detalhes ↓</span>
      <motion.div style={{ x: x1 }} className="font-display flex whitespace-nowrap text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none">
        {linha.map((n, i) => (
          <span key={i} className="flex items-center">
            <span className={i % 2 ? "texto-vazado text-papel/50" : ""}>{n}</span>
            <span aria-hidden className="mx-8 inline-block h-3 w-3 rotate-45 bg-brasa" />
          </span>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="rotulo mt-4 flex whitespace-nowrap text-cinza">
        {linha.map((n, i) => (
          <span key={i} className="mx-6">{linguagens[i % linguagens.length].uso}</span>
        ))}
      </motion.div>
    </a>
  );
}
