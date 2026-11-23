"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CtaFixo, Surgir } from "../ui";

const palestrantes = [
  ["Júlia Andrade", "Design Systems", "from-fuchsia-500 to-orange-400"],
  ["Pedro Lins", "Performance web", "from-cyan-400 to-blue-600"],
  ["Marina Costa", "IA no front-end", "from-violet-500 to-indigo-600"],
  ["Rodrigo Alves", "Acessibilidade", "from-emerald-400 to-teal-600"],
  ["Beatriz Nunes", "Carreira tech", "from-amber-400 to-rose-500"],
  ["Thiago Rocha", "Animação na web", "from-pink-500 to-purple-600"],
];
const agenda: Record<string, [string, string, string][]> = {
  "Dia 1": [["09:00", "Credenciamento e café", ""], ["10:00", "Abertura: o front-end em 2027", "Júlia Andrade"], ["11:00", "Core Web Vitals sem mistério", "Pedro Lins"], ["14:00", "IA como par de programação", "Marina Costa"], ["16:00", "Painel: carreira e mercado", "Beatriz Nunes"]],
  "Dia 2": [["09:30", "Acessibilidade que vende", "Rodrigo Alves"], ["11:00", "Animações que não atrapalham", "Thiago Rocha"], ["14:00", "Workshops práticos", "Vários"], ["17:00", "Encerramento e networking", ""]],
};

function useContagem(alvo: number) {
  const [agora, setAgora] = useState<number | null>(null);
  useEffect(() => { setAgora(Date.now()); const id = setInterval(() => setAgora(Date.now()), 1000); return () => clearInterval(id); }, []);
  const s = Math.max(0, Math.floor((alvo - (agora ?? alvo)) / 1000));
  return agora === null ? null : [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export default function Evento() {
  const [dia, setDia] = useState("Dia 1");
  const [ingresso, setIngresso] = useState(1);
  const [qtd, setQtd] = useState(1);
  const tempo = useContagem(new Date("2027-05-14T09:00:00-03:00").getTime());
  const lotes = [["Estudante", 190, 92], ["Profissional", 390, 68], ["VIP + workshop", 690, 40]] as const;

  return (
    <div className="bg-[#07070c] font-[family-name:var(--f-grotesk)] text-white">
      <section className="relative overflow-hidden">
        <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute -right-1/4 -top-1/2 h-[900px] w-[900px] rounded-full bg-[conic-gradient(from_0deg,#ff2e88,#7c3aed,#06b6d4,#ff2e88)] opacity-30 blur-3xl" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
          <span className="font-bold">FRONT<span className="text-[#ff2e88]">/</span>SUMMIT</span>
          <a href="#ingressos" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">Ingressos</a>
        </header>
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 md:pt-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm text-white/60">14 e 15 de maio de 2027 · São Paulo</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-4 text-[17vw] font-bold leading-[0.85] tracking-tighter md:text-[10rem]">
            Front<br /><span className="bg-gradient-to-r from-[#ff2e88] via-violet-400 to-cyan-300 bg-clip-text text-transparent">Summit</span>
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-white/65">Dois dias com as pessoas que estão construindo a web de amanhã. Palestras, workshops e muito networking.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["dias", "horas", "min", "seg"].map((r, k) => (
              <div key={r} className="w-20 rounded-2xl border border-white/15 bg-white/5 py-3 text-center backdrop-blur">
                <div className="text-3xl font-bold tabular-nums">{tempo ? String(tempo[k]).padStart(2, "0") : "--"}</div>
                <div className="text-xs text-white/50">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Surgir><h2 className="text-4xl font-bold md:text-6xl">Palestrantes</h2></Surgir>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {palestrantes.map(([n, t, g], k) => (
            <Surgir key={n} atraso={(k % 3) * 0.08} className="group">
              <div className={`relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br ${g}`}>
                <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/30 transition duration-500 group-hover:scale-125 md:text-8xl">{n.split(" ").map((x) => x[0]).join("")}</span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs backdrop-blur">{t}</span>
              </div>
              <p className="mt-3 font-semibold">{n}</p>
            </Surgir>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24">
        <Surgir><h2 className="text-4xl font-bold md:text-6xl">Agenda</h2></Surgir>
        <div className="mt-8 inline-flex rounded-full bg-white/10 p-1">
          {Object.keys(agenda).map((d) => (
            <button key={d} onClick={() => setDia(d)} className="relative rounded-full px-6 py-2.5 text-sm font-semibold">
              {dia === d && <motion.span layoutId="dia-evento" className="absolute inset-0 rounded-full bg-[#ff2e88]" />}
              <span className="relative">{d}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.ol key={dia} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative mt-8 border-l border-white/15 pl-8">
            {agenda[dia].map(([h, t, p]) => (
              <li key={h} className="relative pb-8">
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-[#ff2e88] ring-4 ring-[#07070c]" />
                <p className="font-mono text-sm text-[#ff2e88]">{h}</p>
                <p className="mt-1 text-xl font-semibold">{t}</p>
                {p && <p className="text-white/50">{p}</p>}
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </section>

      <section id="ingressos" className="mx-auto max-w-6xl px-5 pb-28">
        <Surgir><h2 className="text-4xl font-bold md:text-6xl">Ingressos</h2></Surgir>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {lotes.map(([n, v, vendidos], k) => (
            <button key={n} onClick={() => setIngresso(k)} className={`rounded-3xl border p-6 text-left transition ${ingresso === k ? "border-[#ff2e88] bg-[#ff2e88]/10" : "border-white/10 hover:border-white/30"}`}>
              <p className="text-white/60">{n}</p>
              <p className="mt-2 text-4xl font-bold">R$ {v}</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-[#ff2e88] to-violet-500" style={{ width: `${vendidos}%` }} /></div>
              <p className="mt-2 text-xs text-white/50">{vendidos}% do lote vendido</p>
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-5 text-black sm:flex-row">
          <div className="flex items-center gap-4">
            <button onClick={() => setQtd(Math.max(1, qtd - 1))} className="h-10 w-10 rounded-full bg-black/10 text-xl">−</button>
            <span className="w-6 text-center text-xl font-bold">{qtd}</span>
            <button onClick={() => setQtd(Math.min(10, qtd + 1))} className="h-10 w-10 rounded-full bg-black/10 text-xl">+</button>
            <span className="text-black/60">× {lotes[ingresso][0]}</span>
          </div>
          <button className="w-full rounded-full bg-black px-8 py-4 font-semibold text-white sm:w-auto">Comprar · R$ {lotes[ingresso][1] * qtd}</button>
        </div>
      </section>
      <CtaFixo texto="Garantir ingresso" href="#ingressos" className="rounded-full bg-[#ff2e88] text-white" />
    </div>
  );
}
