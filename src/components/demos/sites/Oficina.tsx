"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icone, Surgir } from "../ui";

const amarelo = "#ffc300";
const servicos = [
  { n: "Revisão completa", d: "Checklist de 40 itens conforme o manual do fabricante.", i: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", base: 380 },
  { n: "Freios", d: "Pastilhas, discos e fluido com peças originais.", i: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 8a4 4 0 100 8 4 4 0 000-8z", base: 290 },
  { n: "Suspensão", d: "Amortecedores, molas e alinhamento.", i: "M4 6h16M4 12h16M4 18h16", base: 450 },
  { n: "Troca de óleo", d: "Óleo e filtros em 30 minutos, com hora marcada.", i: "M12 2C8 8 6 11 6 14a6 6 0 0012 0c0-3-2-6-6-12z", base: 180 },
  { n: "Ar-condicionado", d: "Higienização, carga de gás e diagnóstico.", i: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19", base: 220 },
  { n: "Diagnóstico eletrônico", d: "Scanner para identificar falhas na central.", i: "M13 2L3 14h9l-1 8 10-12h-9z", base: 120 },
];
const status = ["Recebido", "Em diagnóstico", "Aguardando aprovação", "Em serviço", "Pronto para retirada"];

export default function Oficina() {
  const [placa, setPlaca] = useState("");
  const [consulta, setConsulta] = useState<number | null>(null);
  const [selecionados, setSelecionados] = useState<number[]>([0]);
  const total = selecionados.reduce((s, i) => s + servicos[i].base, 0);

  return (
    <div className="bg-[#111214] font-[family-name:var(--f-grotesk)] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 text-lg font-bold uppercase"><span className="flex h-8 w-8 items-center justify-center text-black" style={{ background: amarelo }}>⚙</span>Torque Auto Center</span>
          <a href="#orcamento" className="hidden px-5 py-2.5 text-sm font-bold uppercase text-black sm:block" style={{ background: amarelo }}>Orçamento rápido</a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_40px,rgba(255,195,0,.04)_40px_80px)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:py-28">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block border px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ borderColor: amarelo, color: amarelo }}>Oficina certificada</motion.p>
            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mt-6 text-5xl font-bold uppercase leading-[0.95] md:text-7xl">Seu carro em <span style={{ color: amarelo }}>boas mãos</span>.</motion.h1>
            <p className="mt-6 max-w-md text-lg text-white/65">Orçamento transparente, fotos de cada etapa no seu WhatsApp e garantia de 6 meses em todos os serviços.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="border border-white/10 bg-[#1a1b1e] p-6">
            <p className="text-sm font-bold uppercase" style={{ color: amarelo }}>Acompanhe seu veículo</p>
            <form onSubmit={(e) => { e.preventDefault(); if (placa.length >= 7) setConsulta((placa.charCodeAt(6) + placa.charCodeAt(0)) % status.length); }} className="mt-4 flex gap-2">
              <input value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7))} placeholder="ABC1D23" className="min-w-0 flex-1 border-2 border-white/20 bg-white px-4 py-3 text-center font-mono text-xl font-bold tracking-[0.2em] text-black outline-none" />
              <button className="px-5 font-bold uppercase text-black" style={{ background: amarelo }}>Ver</button>
            </form>
            <AnimatePresence>
              {consulta !== null && (
                <motion.ol initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-5 space-y-3 overflow-hidden">
                  {status.map((s, k) => (
                    <li key={s} className="flex items-center gap-3 text-sm">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${k <= consulta ? "text-black" : "border border-white/20 text-white/40"}`} style={k <= consulta ? { background: amarelo } : undefined}>{k < consulta ? "✓" : k + 1}</span>
                      <span className={k <= consulta ? "" : "text-white/40"}>{s}</span>
                      {k === consulta && <span className="ml-auto animate-pulse text-xs" style={{ color: amarelo }}>agora</span>}
                    </li>
                  ))}
                </motion.ol>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="orcamento" className="bg-[#f2f2f0] text-[#111214]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir><h2 className="text-4xl font-bold uppercase md:text-5xl">Monte seu orçamento</h2></Surgir>
          <p className="mt-3 text-black/60">Selecione os serviços e veja uma estimativa na hora.</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-3 sm:grid-cols-2">
              {servicos.map((s, k) => {
                const on = selecionados.includes(k);
                return (
                  <button key={s.n} onClick={() => setSelecionados(on ? selecionados.filter((x) => x !== k) : [...selecionados, k])} className={`flex gap-4 border-2 p-5 text-left transition ${on ? "border-[#111214] bg-white" : "border-transparent bg-white/60 hover:bg-white"}`}>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center ${on ? "text-black" : "bg-black/5"}`} style={on ? { background: amarelo } : undefined}><Icone d={s.i} /></span>
                    <span><span className="block font-bold">{s.n}</span><span className="text-sm text-black/60">{s.d}</span></span>
                  </button>
                );
              })}
            </div>
            <div className="h-fit bg-[#111214] p-6 text-white lg:sticky lg:top-12">
              <p className="text-sm uppercase text-white/50">Estimativa</p>
              <motion.p key={total} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-2 text-5xl font-bold" style={{ color: amarelo }}>R$ {total}</motion.p>
              <p className="text-sm text-white/50">a partir de, para carros populares</p>
              <ul className="mt-5 space-y-1 text-sm text-white/70">{selecionados.map((k) => <li key={k}>· {servicos[k].n}</li>)}</ul>
              <button disabled={!selecionados.length} className="mt-6 w-full py-4 font-bold uppercase text-black disabled:opacity-40" style={{ background: amarelo }}>Agendar pelo WhatsApp</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-24 md:grid-cols-3">
        {[["6 meses", "de garantia"], ["Fotos", "de cada etapa no WhatsApp"], ["Peças", "originais com nota fiscal"]].map(([n, r], k) => (
          <Surgir key={n} atraso={k * 0.08} className="border-l-4 border-[#ffc300] pl-6"><div className="text-4xl font-bold uppercase" style={{ color: amarelo }}>{n}</div><div className="text-white/60">{r}</div></Surgir>
        ))}
      </section>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/45">Torque Auto Center · Av. Industrial, 2500 · Seg a sex 8h às 18h · Sáb 8h às 12h</footer>
    </div>
  );
}
