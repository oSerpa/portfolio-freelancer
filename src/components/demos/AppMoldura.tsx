"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

export type TemaApp = { p: string; bg: string; tx: string; mu: string; card: string };

// Moldura comum dos apps: barra lateral no desktop, abas no topo no celular.
// O menu troca de tela de verdade.
export default function AppMoldura<T extends string>({
  marca, menu, ativo, aoNavegar, tema, children,
}: { marca: string; menu: { id: T; label: string; icone: string }[]; ativo: T; aoNavegar: (id: T) => void; tema: TemaApp; children: React.ReactNode }) {
  const estilo = { "--p": tema.p, "--bg": tema.bg, "--tx": tema.tx, "--mu": tema.mu, "--card": tema.card } as CSSProperties;
  return (
    <div style={estilo} className="flex min-h-[calc(100vh-32px)] flex-col bg-[var(--bg)] font-[family-name:var(--f-redonda)] text-[var(--tx)] md:flex-row">
      <aside className="border-b border-[var(--card)] px-4 py-3 md:sticky md:top-8 md:h-[calc(100vh-32px)] md:w-60 md:border-b-0 md:border-r md:px-5 md:py-6">
        <div className="flex items-center justify-between md:block">
          <span className="text-lg font-bold">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--p)] text-sm text-[var(--bg)]">{marca[0]}</span>
            {marca}
          </span>
        </div>
        <nav className="mt-3 flex gap-1 overflow-x-auto md:mt-8 md:flex-col">
          {menu.map((m) => (
            <button key={m.id} onClick={() => aoNavegar(m.id)} className="relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm">
              {ativo === m.id && <motion.span layoutId={`menu-${marca}`} className="absolute inset-0 rounded-xl bg-[var(--card)]" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
              <span className="relative">{m.icone}</span>
              <span className={`relative ${ativo === m.id ? "font-semibold" : "text-[var(--mu)]"}`}>{m.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <motion.main key={ativo} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-w-0 flex-1 p-5 md:p-10">
        {children}
      </motion.main>
    </div>
  );
}
