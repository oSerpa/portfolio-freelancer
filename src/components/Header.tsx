"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import Relogio from "./Relogio";
import { navegacao, site } from "@/data/site";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [atual, setAtual] = useState<string | null>(null);

  // Descobre em qual seção a pessoa está para destacar no menu.
  useEffect(() => {
    const ids = navegacao.map((n) => n.href.slice(1));
    const verificar = () => {
      const meio = window.innerHeight * 0.4;
      let ativo: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= meio && r.bottom > meio) ativo = id;
      }
      setAtual(ativo);
    };
    verificar();
    window.addEventListener("scroll", verificar, { passive: true });
    return () => window.removeEventListener("scroll", verificar);
  }, []);

  const i = navegacao.findIndex((n) => n.href === `#${atual}`);
  const secaoAtual = i < 0 ? null : { label: navegacao[i].label, n: i + 1 };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linha/70 bg-tinta/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <AnimatePresence mode="wait">
            {secaoAtual && (
              <motion.span key={secaoAtual.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rotulo flex items-center gap-2 text-papel lg:hidden">
                <span className="text-brasa">0{secaoAtual.n}</span>{secaoAtual.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {navegacao.map((item, i) => {
            const ativo = item.href === `#${atual}`;
            return (
              <a key={item.href} href={item.href} className={`rotulo group relative transition-colors hover:text-papel ${ativo ? "text-papel" : "text-cinza"}`}>
                <span className={`mr-1.5 ${ativo ? "text-brasa" : "text-cinza/50"}`}>0{i + 1}</span>
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px w-full bg-brasa transition-transform duration-300 ${ativo ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"}`} />
              </a>
            );
          })}
        </nav>
        <div className="rotulo hidden items-center gap-2 text-cinza xl:flex">
          {site.cidade} <Relogio />
        </div>
        <button onClick={() => setAberto(!aberto)} className="rotulo lg:hidden" aria-expanded={aberto}>
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>
      <AnimatePresence>
        {aberto && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-linha lg:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {navegacao.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setAberto(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display border-b border-linha py-3 text-2xl"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
