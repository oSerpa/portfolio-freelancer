"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { linguagens } from "@/data/conteudo";

// Grade de linguagens. Clicar em qualquer uma abre um painel lateral com os detalhes.
export default function Linguagens() {
  const [aberta, setAberta] = useState<number | null>(null);
  const atual = aberta === null ? null : linguagens[aberta];

  useEffect(() => {
    if (aberta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowRight") setAberta((i) => ((i ?? 0) + 1) % linguagens.length);
      if (e.key === "ArrowLeft") setAberta((i) => ((i ?? 0) - 1 + linguagens.length) % linguagens.length);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", tecla);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", tecla);
    };
  }, [aberta]);

  return (
    <section id="linguagens" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <p className="rotulo text-cinza">(05) Linguagens</p>
        <div>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">A ferramenta certa para cada projeto</h2>
          <p className="mt-6 max-w-xl text-papel/65">Escolho a tecnologia pensando em custo, velocidade e em quem vai cuidar do projeto depois. Clique em qualquer uma para ver quando uso, vantagens e um exemplo de código.</p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 border-l border-t border-linha md:grid-cols-5">
        {linguagens.map((l, i) => (
          <motion.button
            key={l.nome}
            onClick={() => setAberta(i)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 5) * 0.06 }}
            className="group relative min-h-40 overflow-hidden border-b border-r border-linha p-5 text-left"
          >
            <span className="absolute inset-0 translate-y-full bg-brasa transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
            <span className="rotulo relative flex justify-between text-cinza transition-colors group-hover:text-tinta/70">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{l.tipo}</span>
            </span>
            <h3 className="font-display relative mt-6 text-xl font-semibold transition-colors group-hover:text-tinta">{l.nome}</h3>
            <p className="relative mt-1 text-sm text-cinza transition-colors group-hover:text-tinta/80">{l.uso}</p>
            <span className="rotulo relative mt-4 inline-block text-brasa transition-colors group-hover:text-tinta">Ver detalhes +</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {atual && aberta !== null && (
          <>
            <motion.div key="fundo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAberta(null)} className="fixed inset-0 z-[70] bg-tinta/70 backdrop-blur-sm" />
            <motion.aside
              key="painel"
              role="dialog"
              aria-modal="true"
              aria-label={`Detalhes de ${atual.nome}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
              className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-xl flex-col border-l border-linha bg-tinta-2"
            >
              <div className="flex items-center justify-between border-b border-linha px-6 py-4">
                <span className="rotulo text-cinza">{String(aberta + 1).padStart(2, "0")} / {linguagens.length}</span>
                <div className="flex gap-2">
                  <button onClick={() => setAberta((aberta - 1 + linguagens.length) % linguagens.length)} aria-label="Anterior" className="h-9 w-9 border border-linha hover:border-brasa hover:text-brasa">←</button>
                  <button onClick={() => setAberta((aberta + 1) % linguagens.length)} aria-label="Próxima" className="h-9 w-9 border border-linha hover:border-brasa hover:text-brasa">→</button>
                  <button onClick={() => setAberta(null)} aria-label="Fechar" className="h-9 w-9 border border-linha hover:border-brasa hover:text-brasa">×</button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={aberta} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex-1 overflow-y-auto px-6 py-8">
                  <p className="rotulo text-brasa">{atual.tipo}</p>
                  <h3 className="font-display mt-3 text-5xl font-semibold tracking-tight">{atual.nome}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-papel/75">{atual.descricao}</p>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <div>
                      <p className="rotulo mb-3 text-cinza">Quando uso</p>
                      <ul className="space-y-2">{atual.quando.map((q) => <li key={q} className="flex gap-2"><span className="text-brasa">→</span>{q}</li>)}</ul>
                    </div>
                    <div>
                      <p className="rotulo mb-3 text-cinza">Vantagens</p>
                      <ul className="space-y-2">{atual.vantagens.map((v) => <li key={v} className="flex gap-2"><span className="text-brasa">+</span>{v}</li>)}</ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <p className="rotulo mb-3 text-cinza">Entra em projetos de</p>
                    <div className="flex flex-wrap gap-2">{atual.projetos.map((p) => <span key={p} className="border border-linha px-3 py-1 text-sm">{p}</span>)}</div>
                  </div>

                  <div className="mt-10">
                    <p className="rotulo mb-3 text-cinza">Exemplo</p>
                    <pre className="overflow-x-auto border border-linha bg-tinta p-5 font-mono text-[13px] leading-relaxed text-papel/85">{atual.exemplo}</pre>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="border-t border-linha p-6">
                <a href="#orcamento" onClick={() => setAberta(null)} className="block bg-brasa py-4 text-center font-semibold text-tinta transition hover:bg-papel">Quero um projeto com {atual.nome}</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
