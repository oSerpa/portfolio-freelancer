"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import Relogio from "./Relogio";
import { navegacao, site } from "@/data/site";

export default function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linha/70 bg-tinta/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {navegacao.map((item) => (
            <a key={item.href} href={item.href} className="rotulo group relative text-cinza transition-colors hover:text-papel">
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-brasa transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="rotulo hidden items-center gap-2 text-cinza lg:flex">
          {site.cidade} <Relogio />
        </div>
        <button onClick={() => setAberto(!aberto)} className="rotulo md:hidden" aria-expanded={aberto}>
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>
      <AnimatePresence>
        {aberto && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-linha md:hidden"
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
