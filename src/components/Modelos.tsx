"use client";

import { useRef, useState } from "react";
import Titulo from "./Titulo";
import { modelos, type Categoria } from "@/data/conteudo";

const categorias = Object.keys(modelos) as Categoria[];

export default function Modelos() {
  const [ativa, setAtiva] = useState<Categoria>("Landing Pages");
  const trilho = useRef<HTMLDivElement>(null);

  function rolar(direcao: 1 | -1) {
    const el = trilho.current;
    if (!el) return;
    el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
  }

  function trocar(c: Categoria) {
    setAtiva(c);
    trilho.current?.scrollTo({ left: 0 });
  }

  return (
    <section id="modelos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <Titulo rotulo="Modelos" titulo="Exemplos do que dá para criar" texto="Escolha uma categoria e veja modelos que podem servir de ponto de partida para o seu projeto." />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" className="flex gap-2 rounded-full border border-borda bg-superficie p-1">
          {categorias.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={ativa === c}
              onClick={() => trocar(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                ativa === c ? "bg-destaque text-fundo" : "text-suave hover:text-texto"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => rolar(-1)} aria-label="Anterior" className="h-10 w-10 rounded-full border border-borda transition hover:border-apoio">←</button>
          <button onClick={() => rolar(1)} aria-label="Próximo" className="h-10 w-10 rounded-full border border-borda transition hover:border-apoio">→</button>
        </div>
      </div>

      <div ref={trilho} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
        {modelos[ativa].map((m) => (
          <article key={m.nome} className="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-borda bg-superficie sm:w-[60%] lg:w-[calc((100%-3rem)/3)]">
            <div className={`flex aspect-video items-end bg-gradient-to-br p-4 ${m.cor}`}>
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white">{m.segmento}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold">{m.nome}</h3>
              <p className="mt-2 text-sm text-suave">{m.descricao}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.tecnologias.map((t) => (
                  <span key={t} className="rounded-full border border-borda px-2.5 py-0.5 text-xs text-suave">{t}</span>
                ))}
              </div>
              {m.href ? (
                <a href={m.href} className="mt-5 inline-block text-sm font-semibold text-destaque hover:underline">Ver demonstração →</a>
              ) : (
                <p className="mt-5 text-sm text-suave/70">Demonstração em breve</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
