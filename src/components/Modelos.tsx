"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import TextoRevelado from "./fx/TextoRevelado";
import PreviaAoVivo from "./PreviaAoVivo";
import { modelos, type Categoria } from "@/data/conteudo";
import RotuloSecao from "./RotuloSecao";

const categorias = Object.keys(modelos) as Categoria[];

function inclinar(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
}

export default function Modelos() {
  const [ativa, setAtiva] = useState<Categoria>("Landing Pages");
  const trilho = useRef<HTMLDivElement>(null);

  const rolar = (dir: 1 | -1) => trilho.current?.scrollBy({ left: dir * trilho.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="modelos" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <RotuloSecao numero="02" nome="Modelos" />
          <div>
            <TextoRevelado
              className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight"
              linhas={[{ texto: "Modelos que" }, { texto: "funcionam de verdade." }]}
            />
            <p className="mt-6 max-w-xl text-papel/65">As prévias abaixo são as páginas reais rodando. Abra, clique, teste no celular. Qualquer uma pode virar ponto de partida para o seu projeto.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-b border-linha">
          <div role="tablist" className="flex gap-8">
            {categorias.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={ativa === c}
                onClick={() => { setAtiva(c); trilho.current?.scrollTo({ left: 0 }); }}
                className={`relative pb-4 font-display text-lg font-medium transition-colors md:text-2xl ${ativa === c ? "text-papel" : "text-cinza hover:text-papel"}`}
              >
                {c}
                <sup className="rotulo ml-1 text-brasa">{modelos[c].length}</sup>
                {ativa === c && <motion.span layoutId="aba" className="absolute inset-x-0 -bottom-px h-[2px] bg-brasa" />}
              </button>
            ))}
          </div>
          <div className="mb-4 flex gap-2">
            {[-1, 1].map((d) => (
              <button key={d} onClick={() => rolar(d as 1 | -1)} aria-label={d < 0 ? "Anterior" : "Próximo"} className="h-11 w-11 border border-linha transition hover:border-brasa hover:text-brasa">
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={ativa}
          ref={trilho}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:px-8 lg:px-[max(2rem,calc((100vw-1400px)/2+2rem))]"
        >
          {modelos[ativa].map((m, i) => (
            <article
              key={m.nome}
              onPointerMove={inclinar}
              onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
              className="group w-[86%] shrink-0 snap-start transition-transform duration-200 ease-out sm:w-[60%] lg:w-[calc((min(100vw,1400px)-4rem-3rem)/3)]"
            >
              <Link href={m.href ?? "#"} className="block border border-linha bg-tinta-2 transition-colors group-hover:border-brasa">
                <div className="flex items-center gap-3 border-b border-linha px-3 py-2">
                  <div className="flex gap-1">{[0, 1, 2].map((k) => <span key={k} className="h-2 w-2 rounded-full bg-linha" />)}</div>
                  <span className="truncate font-mono text-[11px] text-cinza">serpa.dev{m.href}</span>
                </div>
                {m.href && <PreviaAoVivo src={m.href} titulo={m.nome} />}
              </Link>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="rotulo text-cinza">0{i + 1} · {m.segmento}</p>
                  <h3 className="font-display mt-2 text-2xl font-semibold">{m.nome}</h3>
                  <p className="mt-2 text-sm text-papel/60">{m.descricao}</p>
                  <p className="rotulo mt-3 text-papel/50">{m.tecnologias.join(" / ")}</p>
                </div>
                <Link href={m.href ?? "#"} aria-label={`Abrir ${m.nome}`} className="flex h-11 w-11 shrink-0 items-center justify-center border border-linha transition group-hover:border-brasa group-hover:bg-brasa group-hover:text-tinta">↗</Link>
              </div>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
