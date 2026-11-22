"use client";

import { motion } from "motion/react";
import { linguagens } from "@/data/conteudo";

export default function Linguagens() {
  return (
    <section id="linguagens" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <p className="rotulo text-cinza">(05) Linguagens</p>
        <div>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">A ferramenta certa para cada projeto</h2>
          <p className="mt-6 max-w-xl text-papel/65">Escolho a tecnologia pensando em custo, velocidade e em quem vai cuidar do projeto depois.</p>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-2 border-l border-t border-linha md:grid-cols-5">
        {linguagens.map((l, i) => (
          <motion.div
            key={l.nome}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 5) * 0.06 }}
            className="group relative min-h-36 overflow-hidden border-b border-r border-linha p-5"
          >
            <span className="absolute inset-0 translate-y-full bg-brasa transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
            <span className="rotulo relative text-cinza transition-colors group-hover:text-tinta/70">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display relative mt-6 text-xl font-semibold transition-colors group-hover:text-tinta">{l.nome}</h3>
            <p className="relative mt-1 text-sm text-cinza transition-colors group-hover:text-tinta/80">{l.uso}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
