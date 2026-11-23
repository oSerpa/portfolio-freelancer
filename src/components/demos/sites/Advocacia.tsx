"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icone, Surgir } from "../ui";

const ouro = "#c6a15b";
const areas = [
  { t: "Direito Civil", d: "Contratos, indenizações, família e sucessões.", i: "M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" },
  { t: "Direito Trabalhista", d: "Defesa de empregados e consultoria preventiva para empresas.", i: "M3 7h18v13H3zM8 7V4h8v3M3 12h18" },
  { t: "Direito Empresarial", d: "Abertura, contratos societários e recuperação de empresas.", i: "M3 21V8l9-5 9 5v13M9 21v-8h6v8M3 21h18" },
  { t: "Direito do Consumidor", d: "Cobranças indevidas, produtos com defeito e serviços não prestados.", i: "M6 6h15l-2 9H8L6 3H3M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z" },
  { t: "Direito Imobiliário", d: "Compra e venda, usucapião, locação e regularização de imóveis.", i: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5" },
  { t: "Direito Previdenciário", d: "Aposentadorias, revisões e benefícios junto ao INSS.", i: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" },
];
const equipe = [
  ["Helena Albuquerque", "Sócia fundadora · Civil e Família", "HA"],
  ["Marcos Rocha", "Sócio · Empresarial e Tributário", "MR"],
  ["Lívia Torres", "Advogada · Trabalhista", "LT"],
];

export default function Advocacia() {
  const [area, setArea] = useState(0);
  const [form, setForm] = useState({ nome: "", contato: "", area: "", msg: "" });
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="bg-[#0b1322] text-[#e9edf4]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b1322]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border font-[family-name:var(--f-serif)] text-lg" style={{ borderColor: ouro, color: ouro }}>A&R</span>
            <span className="hidden font-[family-name:var(--f-serif)] text-lg sm:block">Albuquerque & Rocha</span>
          </div>
          <nav className="hidden gap-8 text-sm text-white/70 md:flex">
            {["Escritório", "Áreas", "Equipe", "Contato"].map((m) => <a key={m} href={`#${m.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}`} className="hover:text-white">{m}</a>)}
          </nav>
          <a href="#contato" className="border px-4 py-2 text-sm transition hover:bg-[#c6a15b] hover:text-[#0b1322]" style={{ borderColor: ouro, color: ouro }}>Fale conosco</a>
        </div>
      </header>

      <section id="escritorio" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full border border-white/5" />
        <div className="pointer-events-none absolute -right-20 top-20 h-[400px] w-[400px] rounded-full border border-white/5" />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.3em]" style={{ color: ouro }}>Advocacia desde 2005</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="mt-6 font-[family-name:var(--f-serif)] text-5xl leading-[1.05] md:text-7xl">
              Seu direito tratado com <em style={{ color: ouro }}>seriedade</em> e proximidade.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-xl text-lg text-white/65">Atendimento personalizado em todas as etapas, com explicações claras e transparência sobre cada passo do seu caso.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-10 flex flex-wrap gap-4">
              <a href="#contato" className="px-7 py-4 font-semibold text-[#0b1322]" style={{ background: ouro }}>Agendar consulta</a>
              <a href="#areas" className="border border-white/20 px-7 py-4 transition hover:border-white/60">Áreas de atuação</a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-px self-end bg-white/10">
            {[["20", "anos de atuação"], ["3 mil+", "casos acompanhados"], ["6", "áreas do direito"], ["24h", "para retorno"]].map(([n, r]) => (
              <div key={r} className="bg-[#0b1322] p-6">
                <div className="font-[family-name:var(--f-serif)] text-4xl" style={{ color: ouro }}>{n}</div>
                <div className="mt-1 text-sm text-white/55">{r}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="areas" className="bg-[#f4f1ea] text-[#0b1322]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Áreas de atuação</h2>
            <p className="max-w-sm text-[#0b1322]/65">Clique em uma área para ver como podemos ajudar.</p>
          </Surgir>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <ul className="border-t border-[#0b1322]/15">
              {areas.map((a, i) => (
                <li key={a.t}>
                  <button onClick={() => setArea(i)} className={`flex w-full items-center gap-4 border-b border-[#0b1322]/15 py-5 text-left transition ${area === i ? "pl-3" : "hover:pl-2"}`}>
                    <span className="transition-colors" style={{ color: area === i ? ouro : "#0b132280" }}><Icone d={a.i} /></span>
                    <span className={`flex-1 font-[family-name:var(--f-serif)] text-2xl ${area === i ? "" : "text-[#0b1322]/70"}`}>{a.t}</span>
                    <span className={area === i ? "" : "opacity-0"}>→</span>
                  </button>
                </li>
              ))}
            </ul>
            <AnimatePresence mode="wait">
              <motion.div key={area} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-fit bg-[#0b1322] p-10 text-[#e9edf4]">
                <span style={{ color: ouro }}><Icone d={areas[area].i} className="h-12 w-12" /></span>
                <h3 className="mt-6 font-[family-name:var(--f-serif)] text-3xl">{areas[area].t}</h3>
                <p className="mt-4 text-lg text-white/70">{areas[area].d}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/65">
                  <li>— Análise inicial do caso e dos documentos</li>
                  <li>— Estratégia explicada em linguagem simples</li>
                  <li>— Acompanhamento com atualizações periódicas</li>
                </ul>
                <a href="#contato" className="mt-8 inline-block border-b pb-1 text-sm" style={{ borderColor: ouro, color: ouro }}>Falar sobre {areas[area].t.toLowerCase()} →</a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Surgir><h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Como funciona</h2></Surgir>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {["Contato inicial", "Consulta e análise", "Proposta de honorários", "Acompanhamento"].map((t, i) => (
            <Surgir key={t} atraso={i * 0.08}>
              <div className="font-[family-name:var(--f-serif)] text-5xl" style={{ color: ouro }}>{i + 1}</div>
              <div className="mt-3 h-px w-full bg-white/15" />
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            </Surgir>
          ))}
        </div>
      </section>

      <section id="equipe" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir><h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Nossa equipe</h2></Surgir>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {equipe.map(([n, c, ini], i) => (
              <Surgir key={n} atraso={i * 0.1} className="group">
                <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-gradient-to-b from-[#1a2740] to-[#0f1a2e] p-6">
                  <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--f-serif)] text-8xl text-white/10 transition duration-500 group-hover:scale-110">{ini}</span>
                  <span className="relative h-1 w-12 transition-all duration-500 group-hover:w-24" style={{ background: ouro }} />
                </div>
                <h3 className="mt-5 font-[family-name:var(--f-serif)] text-2xl">{n}</h3>
                <p className="text-sm text-white/55">{c}</p>
              </Surgir>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[#f4f1ea] text-[#0b1322]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Agende uma consulta</h2>
            <p className="mt-4 text-[#0b1322]/65">Retornamos em até 24 horas úteis.</p>
            <dl className="mt-10 space-y-5 text-sm">
              <div><dt className="uppercase tracking-widest text-[#0b1322]/50">Endereço</dt><dd className="mt-1 text-lg">Av. Central, 1000, sala 801</dd></div>
              <div><dt className="uppercase tracking-widest text-[#0b1322]/50">Horário</dt><dd className="mt-1 text-lg">Seg a sex, 9h às 18h</dd></div>
            </dl>
          </div>
          <AnimatePresence mode="wait">
            {enviado ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col justify-center bg-[#0b1322] p-10 text-[#e9edf4]">
                <span className="text-4xl" style={{ color: ouro }}>✓</span>
                <h3 className="mt-4 font-[family-name:var(--f-serif)] text-3xl">Mensagem enviada</h3>
                <p className="mt-2 text-white/65">Obrigado, {form.nome.split(" ")[0] || "cliente"}. Entraremos em contato em breve.</p>
              </motion.div>
            ) : (
              <motion.form key="f" onSubmit={(e) => { e.preventDefault(); if (form.nome && form.contato) setEnviado(true); }} className="space-y-5">
                {([["nome", "Nome completo"], ["contato", "Telefone ou e-mail"]] as const).map(([k, r]) => (
                  <input key={k} required placeholder={r} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="w-full border-b border-[#0b1322]/25 bg-transparent py-3 outline-none focus:border-[#c6a15b]" />
                ))}
                <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full border-b border-[#0b1322]/25 bg-transparent py-3 outline-none">
                  <option value="">Área do seu caso</option>
                  {areas.map((a) => <option key={a.t}>{a.t}</option>)}
                </select>
                <textarea rows={3} placeholder="Conte brevemente o que aconteceu" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} className="w-full resize-none border-b border-[#0b1322]/25 bg-transparent py-3 outline-none focus:border-[#c6a15b]" />
                <button className="bg-[#0b1322] px-8 py-4 font-semibold text-white transition hover:bg-[#1a2740]">Enviar mensagem</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
      <footer className="px-5 py-8 text-center text-sm text-white/45">Albuquerque & Rocha Advogados · OAB/XX 0000</footer>
    </div>
  );
}
