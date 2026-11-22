"use client";

import { motion } from "motion/react";
import { useState } from "react";
import TextoRevelado from "./fx/TextoRevelado";
import Revelar from "./fx/Revelar";
import { servicos } from "@/data/conteudo";

export default function Servicos() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section id="servicos" className="bg-papel text-tinta">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <p className="rotulo text-tinta/60">(01) Serviços</p>
          <TextoRevelado
            className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight"
            linhas={[{ texto: "Do rascunho ao ar," }, { texto: "sem enrolação." }]}
          />
        </div>

        <ul className="mt-20 border-t border-tinta">
          {servicos.map((s, i) => {
            const ativo = aberto === i;
            return (
              <li key={s.titulo} className="border-b border-tinta">
                <button
                  onClick={() => setAberto(ativo ? null : i)}
                  onMouseEnter={() => setAberto(i)}
                  className="group relative flex w-full items-center gap-6 overflow-hidden py-7 text-left md:py-9"
                  aria-expanded={ativo}
                >
                  <span className={`absolute inset-0 origin-bottom bg-brasa transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${ativo ? "scale-y-100" : "scale-y-0"}`} />
                  <span className="rotulo relative w-10 shrink-0">0{i + 1}</span>
                  <span className="font-display relative flex-1 text-[clamp(1.75rem,4.5vw,4rem)] font-semibold leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-3">{s.titulo}</span>
                  <span className={`relative text-3xl transition-transform duration-500 ${ativo ? "rotate-45" : ""}`}>+</span>
                </button>
                <motion.div initial={false} animate={{ height: ativo ? "auto" : 0, opacity: ativo ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <div className="grid gap-6 pb-10 pl-16 md:grid-cols-2">
                    <p className="max-w-md text-lg text-tinta/75">{s.texto}</p>
                    <ul className="rotulo space-y-2 text-tinta/80">
                      {s.itens.map((it) => <li key={it}>→ {it}</li>)}
                    </ul>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>

        <Revelar className="mt-16 grid gap-px bg-tinta/15 sm:grid-cols-3">
          {[
            ["Design próprio", "Nada de tema pronto. Cada layout nasce para a sua marca."],
            ["Rápido no celular", "Código leve e otimizado, pensado primeiro para a tela pequena."],
            ["Você no controle", "Acompanha cada etapa e recebe o código e os acessos no final."],
          ].map(([t, d]) => (
            <div key={t} className="bg-papel p-6">
              <p className="font-display text-xl font-semibold">{t}</p>
              <p className="mt-2 text-tinta/65">{d}</p>
            </div>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
