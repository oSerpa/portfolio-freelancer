"use client";

import { motion } from "motion/react";

// Nome da seção em destaque: número em laranja, traço que cresce e o nome grande.
export default function RotuloSecao({ numero, nome, claro = false }: { numero: string; nome: string; claro?: boolean }) {
  return (
    <motion.div
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "-60px" }}
      className={`flex items-center gap-4 self-start ${claro ? "text-tinta" : "text-papel"}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-brasa font-mono text-sm font-semibold text-tinta">{numero}</span>
      <motion.span
        variants={{ oculto: { scaleX: 0 }, visivel: { scaleX: 1 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`h-px w-10 origin-left ${claro ? "bg-tinta/40" : "bg-papel/40"}`}
      />
      <motion.span
        variants={{ oculto: { opacity: 0, x: -10 }, visivel: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-display text-xl font-semibold uppercase tracking-[0.08em] md:text-2xl"
      >
        {nome}
      </motion.span>
    </motion.div>
  );
}
