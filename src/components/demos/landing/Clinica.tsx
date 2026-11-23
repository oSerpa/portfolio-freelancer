"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Acordeao, CtaFixo, Surgir } from "../ui";

const tratamentos = [
  { t: "Limpeza de pele profunda", d: "Remove impurezas e cravos e devolve o viço em uma sessão.", min: "60 min" },
  { t: "Peeling de diamante", d: "Renova a textura e suaviza manchas leves e marcas.", min: "45 min" },
  { t: "Microagulhamento", d: "Estimula colágeno para tratar cicatrizes e poros dilatados.", min: "50 min" },
  { t: "Drenagem linfática", d: "Reduz inchaço e melhora a circulação com toque manual.", min: "50 min" },
  { t: "Radiofrequência", d: "Firmeza para rosto e corpo, sem agulhas e sem pausa na rotina.", min: "40 min" },
  { t: "Hidratação facial", d: "Ativos de alta absorção para pele macia e luminosa.", min: "40 min" },
];

const queixas: Record<string, string[]> = {
  Manchas: ["Peeling de diamante", "Hidratação facial"],
  Acne: ["Limpeza de pele profunda", "Peeling de diamante"],
  Flacidez: ["Radiofrequência", "Microagulhamento"],
  "Pele opaca": ["Hidratação facial", "Limpeza de pele profunda"],
  Inchaço: ["Drenagem linfática", "Radiofrequência"],
};

const depoimentos = [
  ["Carla M.", "Atendimento impecável. Minha pele nunca esteve tão bonita e o ambiente é um abraço."],
  ["Juliana R.", "Fiz a avaliação sem compromisso e saí com um plano claro. Resultado logo na primeira sessão."],
  ["Patrícia S.", "Profissionais atenciosas, explicam tudo. Já indiquei para todas as amigas."],
];

export default function Clinica() {
  const [queixa, setQueixa] = useState("Manchas");
  const [dep, setDep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDep((d) => (d + 1) % depoimentos.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#fbf6f2] text-[#3b2a2a]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <span className="font-[family-name:var(--f-serif)] text-2xl italic">Lumière</span>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#tratamentos" className="hover:text-[#a15c6b]">Tratamentos</a>
          <a href="#protocolo" className="hover:text-[#a15c6b]">Seu protocolo</a>
          <a href="#contato" className="hover:text-[#a15c6b]">Contato</a>
        </nav>
        <a href="#cta" className="rounded-full border border-[#3b2a2a] px-5 py-2 text-sm transition hover:bg-[#3b2a2a] hover:text-[#fbf6f2]">Agendar</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-8 md:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.3em] text-[#a15c6b]">Estética avançada</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="mt-5 font-[family-name:var(--f-serif)] text-5xl leading-[1.05] md:text-7xl">
            Sua pele, no seu <em className="text-[#a15c6b]">melhor</em> momento.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-md text-lg text-[#3b2a2a]/70">
            Tratamentos faciais e corporais personalizados, com avaliação gratuita e acompanhamento de perto em cada sessão.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-wrap items-center gap-6">
            <a href="#cta" className="rounded-full bg-[#a15c6b] px-8 py-4 text-white shadow-lg shadow-[#a15c6b]/30 transition hover:bg-[#8c4b5a]">Agendar avaliação gratuita</a>
            <span className="text-sm"><b>4,9</b> ★ em 320 avaliações</span>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="relative mx-auto w-full max-w-md">
          <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-[radial-gradient(circle_at_50%_35%,#f3d5c8_0%,#e8b9a8_35%,#c98e7f_70%,#a96b5e_100%)]">
            <div className="flex h-full items-end justify-center">
              <div className="mb-[-10%] h-[70%] w-[55%] rounded-t-full bg-[#fbf6f2]/25 blur-[1px]" />
            </div>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-4 bottom-16 rounded-2xl bg-white px-5 py-4 shadow-xl md:-left-10">
            <p className="text-xs uppercase tracking-widest text-[#a15c6b]">Avaliação</p>
            <p className="font-[family-name:var(--f-serif)] text-xl">100% gratuita</p>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -right-3 top-16 rounded-full bg-[#3b2a2a] px-4 py-2 text-sm text-[#fbf6f2] md:-right-8">
            + de 2 mil clientes
          </motion.div>
        </motion.div>
      </section>

      <section id="tratamentos" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Tratamentos</h2>
            <p className="max-w-sm text-[#3b2a2a]/65">Protocolos feitos para o seu tipo de pele, com produtos dermatológicos e profissionais certificadas.</p>
          </Surgir>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-[#3b2a2a]/10 sm:grid-cols-2 lg:grid-cols-3">
            {tratamentos.map((t, i) => (
              <Surgir key={t.t} atraso={(i % 3) * 0.08} className="group bg-white p-8 transition-colors hover:bg-[#fbf0ec]">
                <span className="font-[family-name:var(--f-serif)] text-3xl italic text-[#a15c6b]/50 transition group-hover:text-[#a15c6b]">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{t.t}</h3>
                <p className="mt-2 text-[#3b2a2a]/65">{t.d}</p>
                <p className="mt-5 text-xs uppercase tracking-widest text-[#3b2a2a]/45">{t.min}</p>
              </Surgir>
            ))}
          </div>
        </div>
      </section>

      <section id="protocolo" className="mx-auto max-w-6xl px-5 py-24">
        <Surgir className="grid gap-12 rounded-[2rem] bg-[#3b2a2a] p-8 text-[#fbf6f2] md:grid-cols-2 md:p-14">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#e8b9a8]">Monte seu protocolo</p>
            <h2 className="mt-4 font-[family-name:var(--f-serif)] text-4xl">O que mais te incomoda hoje?</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {Object.keys(queixas).map((q) => (
                <button key={q} onClick={() => setQueixa(q)} className={`rounded-full border px-5 py-2.5 text-sm transition ${queixa === q ? "border-[#e8b9a8] bg-[#e8b9a8] text-[#3b2a2a]" : "border-white/25 hover:border-white/60"}`}>{q}</button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#fbf6f2]/5 p-6">
            <p className="text-sm text-[#fbf6f2]/60">Indicado para {queixa.toLowerCase()}</p>
            <AnimatePresence mode="wait">
              <motion.ul key={queixa} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 space-y-3">
                {queixas[queixa].map((t, i) => (
                  <li key={t} className="flex items-center gap-4 rounded-2xl bg-[#fbf6f2] p-4 text-[#3b2a2a]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a15c6b] text-sm text-white">{i + 1}</span>
                    <span className="font-semibold">{t}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <a href="#cta" className="mt-6 block rounded-full bg-[#e8b9a8] py-3 text-center font-semibold text-[#3b2a2a]">Quero esse protocolo</a>
          </div>
        </Surgir>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#a15c6b]">Quem já viveu a experiência</p>
        <div className="relative mt-8 min-h-48">
          <AnimatePresence mode="wait">
            <motion.blockquote key={dep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <p className="font-[family-name:var(--f-serif)] text-3xl leading-snug md:text-4xl">“{depoimentos[dep][1]}”</p>
              <footer className="mt-6 text-sm uppercase tracking-widest text-[#3b2a2a]/55">{depoimentos[dep][0]}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {depoimentos.map((_, i) => <button key={i} onClick={() => setDep(i)} aria-label={`Depoimento ${i + 1}`} className={`h-2 rounded-full transition-all ${dep === i ? "w-8 bg-[#a15c6b]" : "w-2 bg-[#3b2a2a]/20"}`} />)}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24">
        <h2 className="mb-6 font-[family-name:var(--f-serif)] text-4xl">Dúvidas frequentes</h2>
        <Acordeao corLinha="border-[#3b2a2a]/15" itens={[
          { p: "A avaliação é mesmo gratuita?", r: "Sim. Você conhece a clínica, conversa com a especialista e recebe um plano, sem compromisso." },
          { p: "Os procedimentos doem?", r: "A maioria é indolor. Nos que podem incomodar usamos anestésico tópico." },
          { p: "Quais formas de pagamento?", r: "Pix, débito e cartão de crédito em até 10x." },
        ]} />
      </section>

      <section id="cta" className="bg-[#a15c6b] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:items-center" id="contato">
          <div>
            <h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-6xl">Agende sua avaliação gratuita</h2>
            <p className="mt-4 max-w-md text-white/80">Atendemos de segunda a sábado. Resposta rápida pelo WhatsApp.</p>
          </div>
          <div className="space-y-4">
            <button className="w-full rounded-full bg-white py-4 font-semibold text-[#a15c6b] transition hover:scale-[1.02]">Agendar pelo WhatsApp</button>
            <p className="text-sm text-white/80">Rua das Flores, 120 · Centro<br />Seg a sex 9h às 20h · Sáb 9h às 14h</p>
          </div>
        </div>
      </section>
      <CtaFixo texto="Agendar avaliação gratuita" className="rounded-full bg-[#a15c6b] text-white" />
    </div>
  );
}
