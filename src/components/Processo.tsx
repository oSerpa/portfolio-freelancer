"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import RotuloSecao from "./RotuloSecao";

const etapas = [
  { t: "Conversa", d: "Entendo seu negócio, seu público e o que o projeto precisa resolver." },
  { t: "Proposta", d: "Você recebe escopo, prazo e valor fechados, sem surpresa no meio do caminho." },
  { t: "Design", d: "Desenho as telas e ajustamos juntos antes de qualquer linha de código." },
  { t: "Código", d: "Desenvolvo com prévias online para você acompanhar e testar no celular." },
  { t: "Entrega", d: "Publico, configuro domínio e fico de suporte nos primeiros 30 dias." },
];

// No desktop a seção "trava" e as etapas passam na horizontal conforme a rolagem.
export default function Processo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const trilho = useRef<HTMLDivElement>(null);
  const [distancia, setDistancia] = useState(0);
  useEffect(() => {
    const medir = () => {
      const el = trilho.current;
      if (el) setDistancia(Math.max(0, el.scrollWidth - window.innerWidth + 32));
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distancia]);
  const largura = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" ref={ref} className="relative md:h-[320vh]">
      <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-5 pt-24 md:px-8 md:pt-0">
          <div className="flex items-end justify-between gap-6">
            <div>
              <RotuloSecao numero="04" nome="Processo" />
              <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">Como trabalhamos</h2>
            </div>
            <div className="hidden h-px w-64 bg-linha md:block">
              <motion.div style={{ width: largura }} className="h-px bg-brasa" />
            </div>
          </div>
        </div>

        <motion.div ref={trilho} style={{ x }} className="mt-14 hidden gap-6 pl-8 md:flex lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]">
          {etapas.map((e, i) => (
            <article key={e.t} className="group flex h-[52vh] w-[38vw] max-w-[520px] shrink-0 flex-col justify-between border border-linha p-8 transition-colors hover:border-brasa">
              <span className="font-display texto-vazado text-[9rem] font-bold leading-none text-papel/40 transition-colors group-hover:text-brasa">0{i + 1}</span>
              <div>
                <h3 className="font-display text-4xl font-semibold">{e.t}</h3>
                <p className="mt-3 max-w-sm text-papel/65">{e.d}</p>
              </div>
            </article>
          ))}
        </motion.div>

        <ol className="mx-auto mt-10 max-w-[1400px] space-y-px px-5 pb-24 md:hidden">
          {etapas.map((e, i) => (
            <motion.li key={e.t} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-5 border-t border-linha py-6">
              <span className="font-display texto-vazado text-5xl font-bold text-brasa">0{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold">{e.t}</h3>
                <p className="mt-1 text-papel/65">{e.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
