"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CtaFixo, Surgir } from "../ui";

const neon = "#d4ff00";
const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const aulas: Record<string, [string, string, string][]> = {
  Seg: [["06:30", "Funcional", "Duda"], ["12:00", "Spinning", "Léo"], ["18:30", "Cross Training", "Rafa"], ["19:30", "Yoga", "Bia"]],
  Ter: [["07:00", "Pilates", "Bia"], ["18:00", "Muay Thai", "Caio"], ["19:00", "Spinning", "Léo"]],
  Qua: [["06:30", "Funcional", "Duda"], ["12:00", "HIIT 30", "Rafa"], ["18:30", "Cross Training", "Rafa"], ["20:00", "Dança", "Mari"]],
  Qui: [["07:00", "Pilates", "Bia"], ["18:00", "Muay Thai", "Caio"], ["19:00", "Spinning", "Léo"]],
  Sex: [["06:30", "Funcional", "Duda"], ["18:00", "HIIT 30", "Rafa"], ["19:00", "Dança", "Mari"]],
  Sáb: [["09:00", "Aulão Cross", "Rafa"], ["10:30", "Yoga", "Bia"]],
};

function Imc() {
  const [peso, setPeso] = useState(75);
  const [altura, setAltura] = useState(175);
  const imc = peso / (altura / 100) ** 2;
  const faixa = imc < 18.5 ? "Abaixo do peso" : imc < 25 ? "Peso adequado" : imc < 30 ? "Sobrepeso" : "Obesidade";
  const pos = Math.min(100, Math.max(0, ((imc - 15) / 25) * 100));
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <p className="text-sm font-bold uppercase tracking-widest" style={{ color: neon }}>Calcule seu IMC</p>
      {([["Peso", peso, setPeso, 40, 150, "kg"], ["Altura", altura, setAltura, 140, 210, "cm"]] as const).map(([r, v, set, min, max, u]) => (
        <label key={r} className="mt-6 block">
          <span className="flex justify-between text-sm"><span className="text-white/60">{r}</span><b>{v} {u}</b></span>
          <input type="range" min={min} max={max} value={v} onChange={(e) => set(+e.target.value)} className="mt-2 w-full accent-[#d4ff00]" />
        </label>
      ))}
      <div className="mt-8 flex items-end justify-between">
        <motion.span key={imc.toFixed(1)} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl font-black tabular-nums">{imc.toFixed(1)}</motion.span>
        <span className="pb-2 text-right font-bold uppercase" style={{ color: neon }}>{faixa}</span>
      </div>
      <div className="relative mt-4 h-2 rounded-full bg-gradient-to-r from-sky-400 via-[#d4ff00] via-40% to-red-500">
        <motion.span animate={{ left: `${pos}%` }} className="absolute -top-1.5 h-5 w-1.5 -translate-x-1/2 rounded bg-white" />
      </div>
    </div>
  );
}

export default function Academia() {
  const [dia, setDia] = useState("Seg");
  const [plano, setPlano] = useState(1);
  return (
    <div className="bg-[#0a0a0a] font-[family-name:var(--f-grotesk)] text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-xl font-black italic tracking-tight">PULSO<span style={{ color: neon }}>FIT</span></span>
        <nav className="hidden gap-8 text-sm font-semibold uppercase md:flex">
          <a href="#aulas" className="hover:text-[#d4ff00]">Aulas</a>
          <a href="#planos" className="hover:text-[#d4ff00]">Planos</a>
          <a href="#imc" className="hover:text-[#d4ff00]">IMC</a>
        </nav>
        <a href="#cta" className="px-5 py-2.5 text-sm font-bold uppercase text-black" style={{ background: neon }}>Aula grátis</a>
      </header>

      <section className="relative overflow-hidden">
        <motion.div aria-hidden initial={{ x: "10%" }} animate={{ x: "-10%" }} transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }} className="pointer-events-none absolute -bottom-6 whitespace-nowrap text-[22vw] font-black italic leading-none text-white/[0.04]">FORÇA FOCO FÔLEGO</motion.div>
        <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-16 md:pt-24">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-[16vw] font-black uppercase italic leading-[0.85] tracking-tighter md:text-[9rem]">
            Treine<br /><span style={{ color: neon }}>sem</span> desculpas.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-white/65">Musculação, cross, lutas e mais de 40 aulas por semana. Aberto das 5h às 23h, inclusive feriados.</p>
            <a href="#cta" className="group inline-flex items-center gap-3 self-start px-8 py-5 text-lg font-black uppercase text-black" style={{ background: neon }}>
              Agendar aula grátis <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
        {[["40+", "aulas por semana"], ["1.200m²", "de área"], ["18h", "abertos por dia"], ["12", "professores"]].map(([n, r]) => (
          <div key={r} className="border-white/10 p-6 text-center odd:border-r md:border-r"><div className="text-3xl font-black" style={{ color: neon }}>{n}</div><div className="text-sm uppercase text-white/50">{r}</div></div>
        ))}
      </div>

      <section id="aulas" className="mx-auto max-w-6xl px-5 py-24">
        <Surgir><h2 className="text-5xl font-black uppercase italic md:text-6xl">Grade de aulas</h2></Surgir>
        <div className="mt-8 flex gap-2 overflow-x-auto">
          {dias.map((d) => (
            <button key={d} onClick={() => setDia(d)} className={`shrink-0 px-5 py-3 font-bold uppercase transition ${dia === d ? "text-black" : "bg-white/5 text-white/60 hover:text-white"}`} style={dia === d ? { background: neon } : undefined}>{d}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.ul key={dia} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {aulas[dia].map(([h, a, p]) => (
              <li key={h + a} className="group flex items-center gap-6 py-5 transition hover:bg-white/5 md:px-4">
                <span className="w-16 text-xl font-black tabular-nums" style={{ color: neon }}>{h}</span>
                <span className="flex-1 text-2xl font-bold uppercase">{a}</span>
                <span className="hidden text-white/50 sm:block">com {p}</span>
                <button className="border border-white/20 px-4 py-2 text-sm font-bold uppercase transition group-hover:border-[#d4ff00] group-hover:text-[#d4ff00]">Reservar</button>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </section>

      <section id="planos" className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir><h2 className="text-5xl font-black uppercase italic md:text-6xl">Planos</h2></Surgir>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[["Mensal", "R$ 119", "Sem fidelidade"], ["Semestral", "R$ 99", "Mais escolhido"], ["Anual", "R$ 89", "Melhor preço"]].map(([n, v, tag], i) => (
            <button key={n} onClick={() => setPlano(i)} className={`relative p-8 text-left transition ${plano === i ? "scale-[1.02] text-black" : "bg-white/5 hover:bg-white/10"}`} style={plano === i ? { background: neon } : undefined}>
              <span className={`text-xs font-bold uppercase tracking-widest ${plano === i ? "text-black/60" : "text-white/50"}`}>{tag}</span>
              <h3 className="mt-3 text-3xl font-black uppercase">{n}</h3>
              <p className="mt-4 text-5xl font-black">{v}<span className="text-lg font-bold">/mês</span></p>
              <ul className={`mt-6 space-y-2 text-sm ${plano === i ? "text-black/75" : "text-white/60"}`}>
                <li>✓ Musculação livre</li><li>✓ Todas as aulas coletivas</li><li>✓ Avaliação física</li>
              </ul>
            </button>
          ))}
        </div>
      </section>

      <section id="imc" className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 md:grid-cols-2 md:items-center">
        <Surgir>
          <h2 className="text-5xl font-black uppercase italic">Comece pelo seu ponto de partida</h2>
          <p className="mt-4 text-white/60">Na primeira visita você faz uma avaliação física completa e sai com um treino montado para o seu objetivo.</p>
        </Surgir>
        <Surgir atraso={0.1}><Imc /></Surgir>
      </section>

      <section id="cta" style={{ background: neon }} className="text-black">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-5xl font-black uppercase italic leading-none md:text-7xl">Primeira aula<br />por nossa conta.</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input placeholder="Seu WhatsApp" className="flex-1 bg-black/10 px-5 py-4 font-semibold outline-none placeholder:text-black/50" />
            <button className="bg-black px-8 py-4 font-black uppercase text-white">Quero treinar</button>
          </form>
        </div>
      </section>
      <CtaFixo texto="AGENDAR AULA GRÁTIS" className="bg-[#d4ff00] font-black text-black" />
    </div>
  );
}
