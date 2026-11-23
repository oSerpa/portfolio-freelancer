"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Peças reaproveitadas pelas demos.

export function Surgir({ children, atraso = 0, className }: { children: React.ReactNode; atraso?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Acordeao({ itens, className = "", corLinha = "border-current/15" }: { itens: { p: string; r: string }[]; className?: string; corLinha?: string }) {
  const [aberto, setAberto] = useState<number | null>(0);
  return (
    <div className={className}>
      {itens.map((it, i) => (
        <div key={it.p} className={`border-b ${corLinha}`}>
          <button onClick={() => setAberto(aberto === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold" aria-expanded={aberto === i}>
            {it.p}
            <motion.span animate={{ rotate: aberto === i ? 45 : 0 }} className="text-2xl leading-none">+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {aberto === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="pb-5 opacity-75">{it.r}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Barra de ação que aparece fixa no rodapé do celular depois de rolar um pouco.
export function CtaFixo({ texto, href = "#cta", className }: { texto: string; href?: string; className: string }) {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const ver = () => setVisivel(window.scrollY > 500);
    ver();
    window.addEventListener("scroll", ver, { passive: true });
    return () => window.removeEventListener("scroll", ver);
  }, []);
  return (
    <AnimatePresence>
      {visivel && (
        <motion.a href={href} initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} className={`fixed inset-x-3 bottom-3 z-40 block py-4 text-center font-semibold shadow-2xl md:hidden ${className}`}>
          {texto}
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// Lê e grava no localStorage com segurança (modo anônimo, bloqueio etc.).
export function usePersistente<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(inicial);
  const [carregou, setCarregou] = useState(false);
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(chave);
      if (salvo) setValor(JSON.parse(salvo));
    } catch {}
    setCarregou(true);
  }, [chave]);
  useEffect(() => {
    if (!carregou) return;
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {}
  }, [chave, valor, carregou]);
  return [valor, setValor] as const;
}

export function Icone({ d, className = "h-6 w-6" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}
