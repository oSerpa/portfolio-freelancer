"use client";

import { motion } from "motion/react";

type Linha = { texto: string; className?: string };

// Cada palavra sobe de dentro de uma máscara, uma depois da outra.
export default function TextoRevelado({ linhas, className, atraso = 0, comoTitulo = false }: { linhas: Linha[]; className?: string; atraso?: number; comoTitulo?: boolean }) {
  let i = 0;
  const Tag = comoTitulo ? motion.h1 : motion.h2;
  return (
    <Tag className={className} initial="oculto" whileInView="visivel" viewport={{ once: true, margin: "-60px" }}>
      {linhas.map((l, li) => (
        <span key={li} className="block">
          {l.texto.split(" ").map((p, pi) => {
            const ordem = i++;
            return (
              <span key={pi} className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
                <motion.span
                  className={`inline-block ${l.className ?? ""}`}
                  variants={{ oculto: { y: "110%" }, visivel: { y: 0 } }}
                  transition={{ duration: 0.9, delay: atraso + ordem * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
