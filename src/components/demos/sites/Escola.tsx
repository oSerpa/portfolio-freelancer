"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Acordeao, Surgir } from "../ui";

const turmas = [
  { n: "Berçário", idade: "4 meses a 1 ano", cor: "#ffb4a2", d: "Rotina acolhedora, estímulos sensoriais e muito colo." },
  { n: "Maternal", idade: "2 a 3 anos", cor: "#ffd166", d: "Autonomia, linguagem e brincadeiras que ensinam a conviver." },
  { n: "Jardim", idade: "4 a 5 anos", cor: "#8ecae6", d: "Projetos investigativos, artes, música e pré-alfabetização." },
];
const rotina = [["07:30", "Acolhida", "🌞"], ["09:00", "Lanche da manhã", "🍎"], ["09:30", "Projeto do dia", "🔍"], ["10:30", "Parque e horta", "🌱"], ["11:30", "Almoço", "🍲"], ["13:00", "Descanso", "😴"], ["15:00", "Música e artes", "🎨"], ["16:30", "Saída", "👋"]];

function Bolha({ className, cor, atraso = 0 }: { className: string; cor: string; atraso?: number }) {
  return <motion.span aria-hidden animate={{ y: [0, -14, 0] }} transition={{ duration: 4 + atraso, repeat: Infinity, delay: atraso }} className={`absolute rounded-full ${className}`} style={{ background: cor }} />;
}

export default function Escola() {
  const [turma, setTurma] = useState(1);
  const [visita, setVisita] = useState({ nome: "", crianca: "", idade: "", ok: false });
  return (
    <div className="bg-[#fffaf0] font-[family-name:var(--f-redonda)] text-[#2d3047]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-2xl font-extrabold"><span className="text-[#ef476f]">C</span><span className="text-[#ffd166]">i</span><span className="text-[#06d6a0]">r</span><span className="text-[#118ab2]">a</span>nda</span>
        <nav className="hidden gap-7 font-semibold md:flex">
          <a href="#turmas" className="hover:text-[#ef476f]">Turmas</a>
          <a href="#rotina" className="hover:text-[#ef476f]">Rotina</a>
          <a href="#visita" className="hover:text-[#ef476f]">Visite</a>
        </nav>
        <a href="#visita" className="rounded-full bg-[#ef476f] px-5 py-2.5 text-sm font-bold text-white">Agendar visita</a>
      </header>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-24 pt-12 text-center">
        <Bolha className="left-[5%] top-10 h-16 w-16" cor="#ffd166" />
        <Bolha className="right-[8%] top-24 h-24 w-24" cor="#8ecae6" atraso={1} />
        <Bolha className="bottom-10 left-[15%] h-10 w-10" cor="#06d6a0" atraso={0.5} />
        <Bolha className="bottom-24 right-[18%] h-12 w-12" cor="#ffb4a2" atraso={1.5} />
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 80 }} className="relative mx-auto max-w-3xl text-5xl font-extrabold leading-tight md:text-7xl">
          Aqui a infância é levada <span className="relative inline-block text-[#ef476f]">a sério<svg viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full" aria-hidden><motion.path d="M5 15 Q 100 0 195 12" stroke="#ffd166" strokeWidth="6" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.8 }} /></svg></span>.
        </motion.h1>
        <p className="relative mx-auto mt-6 max-w-xl text-lg text-[#2d3047]/70">Educação infantil bilíngue com natureza, arte e afeto. Turmas pequenas e professoras que conhecem cada criança pelo nome.</p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          {["🌳 Área verde de 800m²", "👩‍🏫 1 professora para 8 crianças", "🇬🇧 Inglês diário", "🍲 Cozinha própria"].map((t, k) => (
            <motion.span key={t} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + k * 0.1 }} className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">{t}</motion.span>
          ))}
        </div>
      </section>

      <section id="turmas" className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir><h2 className="text-center text-4xl font-extrabold md:text-5xl">Nossas turmas</h2></Surgir>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {turmas.map((t, k) => (
            <motion.button key={t.n} onClick={() => setTurma(k)} whileHover={{ y: -6, rotate: k === 1 ? 0 : k === 0 ? -1 : 1 }} className={`rounded-[2rem] p-8 text-left transition-shadow ${turma === k ? "shadow-2xl" : "shadow-sm"}`} style={{ background: t.cor }}>
              <p className="text-sm font-bold opacity-70">{t.idade}</p>
              <h3 className="mt-2 text-3xl font-extrabold">{t.n}</h3>
              <AnimatePresence>{turma === k && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden">{t.d}</motion.p>}</AnimatePresence>
            </motion.button>
          ))}
        </div>
      </section>

      <section id="rotina" className="bg-[#118ab2] text-white">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir><h2 className="text-4xl font-extrabold md:text-5xl">Um dia na Ciranda</h2></Surgir>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
            {rotina.map(([h, a, e], k) => (
              <Surgir key={h} atraso={k * 0.05} className="w-40 shrink-0 rounded-3xl bg-white/15 p-5 backdrop-blur">
                <span className="text-4xl">{e}</span>
                <p className="mt-4 font-mono text-sm text-white/70">{h}</p>
                <p className="text-lg font-bold">{a}</p>
              </Surgir>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24">
        <h2 className="mb-6 text-4xl font-extrabold">Perguntas dos pais</h2>
        <Acordeao corLinha="border-[#2d3047]/15" itens={[
          { p: "Qual o horário de funcionamento?", r: "De segunda a sexta, das 7h30 às 18h30, com opção de meio período." },
          { p: "Como é a alimentação?", r: "Cardápio feito por nutricionista e preparado na nossa cozinha todos os dias." },
          { p: "Os pais recebem notícias durante o dia?", r: "Sim, pelo nosso app com fotos e registros da rotina." },
        ]} />
      </section>

      <section id="visita" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-10 rounded-[2.5rem] bg-[#ffd166] p-8 md:grid-cols-2 md:p-14">
          <div>
            <h2 className="text-4xl font-extrabold md:text-5xl">Venha conhecer a escola</h2>
            <p className="mt-4 text-[#2d3047]/75">Visitas guiadas de segunda a sexta. Traga a criança, ela vai adorar o parque.</p>
          </div>
          <AnimatePresence mode="wait">
            {visita.ok ? (
              <motion.div key="ok" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center">
                <span className="text-5xl">🎉</span>
                <p className="mt-3 text-2xl font-extrabold">Até breve, {visita.crianca || "pequeno"}!</p>
                <p className="text-[#2d3047]/70">Vamos te chamar no WhatsApp para combinar o dia.</p>
              </motion.div>
            ) : (
              <motion.form key="f" onSubmit={(e) => { e.preventDefault(); if (visita.nome) setVisita({ ...visita, ok: true }); }} className="space-y-3">
                {([["nome", "Seu nome"], ["crianca", "Nome da criança"], ["idade", "Idade da criança"]] as const).map(([k, p]) => (
                  <input key={k} placeholder={p} value={visita[k]} onChange={(e) => setVisita({ ...visita, [k]: e.target.value })} className="w-full rounded-2xl bg-white px-5 py-4 outline-none ring-[#ef476f] focus:ring-2" />
                ))}
                <button className="w-full rounded-2xl bg-[#ef476f] py-4 font-bold text-white transition hover:scale-[1.02]">Agendar visita</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
