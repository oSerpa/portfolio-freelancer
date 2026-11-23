"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CtaFixo, Surgir } from "../ui";

const verde = "#1f3d34";
const areia = "#efe8dc";
type Comodo = { n: string; c: string; r: string };
const plantas: Record<string, { area: string; preco: number; comodos: Comodo[] }> = {
  "2 quartos": { area: "68 m²", preco: 520000, comodos: [
    { n: "Sala", c: "1 / 1 / 3 / 3", r: "#d9cfbf" }, { n: "Cozinha", c: "1 / 3 / 2 / 4", r: "#e7dfd2" }, { n: "Varanda", c: "3 / 1 / 4 / 3", r: "#c9d6c3" },
    { n: "Suíte", c: "2 / 3 / 4 / 4", r: "#e2d7c6" }, { n: "Quarto", c: "1 / 4 / 3 / 5", r: "#ece4d7" }, { n: "Banho", c: "3 / 4 / 4 / 5", r: "#d4dde0" },
  ] },
  "3 quartos": { area: "94 m²", preco: 740000, comodos: [
    { n: "Sala", c: "1 / 1 / 3 / 3", r: "#d9cfbf" }, { n: "Cozinha", c: "3 / 1 / 4 / 2", r: "#e7dfd2" }, { n: "Varanda gourmet", c: "3 / 2 / 4 / 4", r: "#c9d6c3" },
    { n: "Suíte", c: "1 / 3 / 3 / 4", r: "#e2d7c6" }, { n: "Quarto", c: "1 / 4 / 2 / 5", r: "#ece4d7" }, { n: "Quarto", c: "2 / 4 / 3 / 5", r: "#ece4d7" }, { n: "Banho", c: "3 / 4 / 4 / 5", r: "#d4dde0" },
  ] },
  Cobertura: { area: "168 m²", preco: 1350000, comodos: [
    { n: "Living", c: "1 / 1 / 3 / 3", r: "#d9cfbf" }, { n: "Terraço com piscina", c: "3 / 1 / 4 / 4", r: "#bcd3d6" }, { n: "Cozinha", c: "1 / 3 / 2 / 4", r: "#e7dfd2" },
    { n: "Suíte master", c: "1 / 4 / 3 / 5", r: "#e2d7c6" }, { n: "Suíte", c: "2 / 3 / 3 / 4", r: "#ece4d7" }, { n: "Spa", c: "3 / 4 / 4 / 5", r: "#d4dde0" },
  ] },
};
const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function Imobiliario() {
  const [tipo, setTipo] = useState("3 quartos");
  const [entrada, setEntrada] = useState(20);
  const [anos, setAnos] = useState(30);
  const preco = plantas[tipo].preco;
  const financiado = preco * (1 - entrada / 100);
  const i = 0.0085, n = anos * 12;
  const parcela = (financiado * i) / (1 - Math.pow(1 + i, -n));

  return (
    <div style={{ background: areia, color: verde }}>
      <section className="relative min-h-[88vh] overflow-hidden" style={{ background: verde }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#8fb3c9_0%,#d9c7a7_55%,#1f3d34_100%)] opacity-90" />
        <div className="absolute bottom-0 left-1/2 flex h-[70%] w-[min(90%,560px)] -translate-x-1/2 items-end gap-3">
          {[78, 100, 88].map((h, k) => (
            <motion.div key={k} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.2 + k * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="relative flex-1 bg-[#f5f1ea] shadow-2xl">
              <div className="grid h-full grid-cols-3 gap-1.5 p-2.5">{Array.from({ length: 45 }, (_, j) => <span key={j} className={(j + k) % 7 === 0 ? "bg-amber-200/80" : "bg-[#3d5a52]/25"} />)}</div>
            </motion.div>
          ))}
        </div>
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6 text-[#f5f1ea]">
          <span className="font-[family-name:var(--f-serif)] text-2xl">Aurora <span className="italic">Residencial</span></span>
          <a href="#contato" className="border border-[#f5f1ea]/60 px-5 py-2 text-sm backdrop-blur transition hover:bg-[#f5f1ea] hover:text-[#1f3d34]">Agendar visita</a>
        </header>
        <div className="relative mx-auto max-w-6xl px-5 pt-10 text-[#f5f1ea]">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.3em]">Lançamento · Bairro Jardins</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 max-w-2xl font-[family-name:var(--f-serif)] text-5xl leading-tight drop-shadow md:text-7xl">Morar perto de tudo, longe do barulho.</motion.h1>
        </div>
      </section>

      <div className="mx-auto -mt-12 max-w-5xl px-5">
        <div className="relative grid grid-cols-2 gap-px bg-[#1f3d34]/15 shadow-xl md:grid-cols-4">
          {[["2 a 4", "dormitórios"], ["68 a 168 m²", "de área privativa"], ["32", "itens de lazer"], ["Dez/2028", "entrega prevista"]].map(([n, r]) => (
            <div key={r} className="bg-[#f5f1ea] p-6"><div className="font-[family-name:var(--f-serif)] text-2xl">{n}</div><div className="text-sm opacity-60">{r}</div></div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Surgir><h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Escolha sua planta</h2></Surgir>
        <div className="mt-8 flex flex-wrap gap-2">
          {Object.keys(plantas).map((p) => (
            <button key={p} onClick={() => setTipo(p)} className={`px-5 py-2.5 text-sm transition ${tipo === p ? "text-[#f5f1ea]" : "border border-[#1f3d34]/25 hover:border-[#1f3d34]"}`} style={tipo === p ? { background: verde } : undefined}>{p}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div key={tipo} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid aspect-[4/3] grid-cols-4 grid-rows-3 gap-1.5 border-4 bg-[#1f3d34] p-1.5" style={{ borderColor: verde }}>
              {plantas[tipo].comodos.map((c, k) => (
                <motion.div key={c.n + k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: k * 0.05 }} className="flex items-center justify-center p-1 text-center text-xs font-medium sm:text-sm" style={{ gridArea: c.c, background: c.r }}>{c.n}</motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div>
            <p className="font-[family-name:var(--f-serif)] text-5xl">{plantas[tipo].area}</p>
            <p className="mt-1 opacity-60">a partir de {real(preco)}</p>
            <div className="mt-8 space-y-6 bg-[#f5f1ea] p-6">
              <p className="text-sm uppercase tracking-widest opacity-60">Simule seu financiamento</p>
              <label className="block text-sm">Entrada: <b>{entrada}%</b> ({real(preco * entrada / 100)})<input type="range" min={10} max={60} value={entrada} onChange={(e) => setEntrada(+e.target.value)} className="mt-2 w-full accent-[#1f3d34]" /></label>
              <label className="block text-sm">Prazo: <b>{anos} anos</b><input type="range" min={10} max={35} value={anos} onChange={(e) => setAnos(+e.target.value)} className="mt-2 w-full accent-[#1f3d34]" /></label>
              <div className="border-t border-[#1f3d34]/15 pt-4">
                <p className="text-sm opacity-60">Parcela estimada</p>
                <motion.p key={Math.round(parcela)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-[family-name:var(--f-serif)] text-4xl">{real(parcela)}<span className="text-base">/mês</span></motion.p>
                <p className="mt-1 text-xs opacity-50">Simulação ilustrativa com juros de 0,85% a.m.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-[#f5f1ea]" style={{ background: verde }}>
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir><h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Lazer de clube</h2></Surgir>
          <div className="mt-10 grid grid-cols-2 gap-px bg-[#f5f1ea]/15 md:grid-cols-4">
            {["Piscina aquecida", "Academia", "Coworking", "Pet place", "Espaço gourmet", "Quadra de beach tennis", "Brinquedoteca", "Bicicletário"].map((l, k) => (
              <Surgir key={l} atraso={(k % 4) * 0.05} className="bg-[#1f3d34] p-6 transition hover:bg-[#2a4d43]"><span className="font-[family-name:var(--f-serif)] text-2xl italic opacity-40">{String(k + 1).padStart(2, "0")}</span><p className="mt-3">{l}</p></Surgir>
            ))}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[["Fundação", 100], ["Estrutura", 62], ["Acabamento", 10]].map(([e, p]) => (
              <div key={e as string}>
                <div className="flex justify-between text-sm"><span>{e}</span><span>{p}%</span></div>
                <div className="mt-2 h-1.5 bg-[#f5f1ea]/15"><motion.div initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="h-full bg-[#d9c7a7]" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2">
        <h2 className="font-[family-name:var(--f-serif)] text-4xl md:text-5xl">Visite o decorado</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {["Nome", "WhatsApp", "E-mail"].map((p) => <input key={p} placeholder={p} className="w-full border-b border-[#1f3d34]/30 bg-transparent py-3 outline-none focus:border-[#1f3d34]" />)}
          <button className="w-full py-4 text-[#f5f1ea]" style={{ background: verde }}>Quero agendar minha visita</button>
        </form>
      </section>
      <CtaFixo texto="Agendar visita ao decorado" href="#contato" className="bg-[#1f3d34] text-[#f5f1ea]" />
    </div>
  );
}
