"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Surgir } from "../ui";

const portes = [{ n: "Pequeno", e: "🐩", f: 1 }, { n: "Médio", e: "🐕", f: 1.3 }, { n: "Grande", e: "🐕‍🦺", f: 1.7 }];
const servicos = [{ n: "Banho", p: 50, min: 60 }, { n: "Banho e tosa", p: 85, min: 90 }, { n: "Tosa higiênica", p: 40, min: 40 }, { n: "Hidratação", p: 35, min: 30 }];
const produtos = [
  { n: "Ração premium 3kg", p: 129.9, e: "🦴", cor: "#ffe8cc" },
  { n: "Cama nuvem", p: 159.9, e: "☁️", cor: "#dbeafe" },
  { n: "Brinquedo mordedor", p: 34.9, e: "🧸", cor: "#fce7f3" },
  { n: "Petiscos naturais", p: 24.9, e: "🥕", cor: "#dcfce7" },
];

export default function PetShop() {
  const [porte, setPorte] = useState(0);
  const [serv, setServ] = useState<number[]>([1]);
  const [busca, setBusca] = useState(false);
  const [carrinho, setCarrinho] = useState<Record<number, number>>({});
  const [pulo, setPulo] = useState(0);
  const preco = Math.round(serv.reduce((s, i) => s + servicos[i].p, 0) * portes[porte].f + (busca ? 15 : 0));
  const tempo = Math.round(serv.reduce((s, i) => s + servicos[i].min, 0) * portes[porte].f);
  const itens = Object.values(carrinho).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#f0fbf9] font-[family-name:var(--f-redonda)] text-[#0f3b3a]">
      <header className="sticky top-8 z-30 bg-[#f0fbf9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="text-2xl font-extrabold">🐾 Patas<span className="text-[#ff7a45]">&</span>Cia</span>
          <nav className="hidden gap-7 font-semibold md:flex">
            <a href="#servicos" className="hover:text-[#ff7a45]">Banho e tosa</a>
            <a href="#loja" className="hover:text-[#ff7a45]">Loja</a>
          </nav>
          <motion.a key={pulo} href="#loja" animate={pulo ? { scale: [1, 1.3, 1] } : {}} className="relative rounded-full bg-white px-4 py-2 font-semibold shadow-sm">
            🛒 Carrinho
            {itens > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff7a45] text-xs text-white">{itens}</span>}
          </motion.a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-10 md:grid-cols-2">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold leading-tight md:text-6xl">Cuidado de verdade para quem é da <span className="text-[#ff7a45]">família</span>.</motion.h1>
          <p className="mt-5 max-w-md text-lg text-[#0f3b3a]/70">Banho e tosa com produtos hipoalergênicos, câmera ao vivo para você acompanhar e leva e traz no bairro.</p>
          <div className="mt-8 flex gap-3">
            <a href="#servicos" className="rounded-full bg-[#ff7a45] px-7 py-4 font-bold text-white shadow-lg shadow-[#ff7a45]/30 transition hover:-translate-y-0.5">Agendar banho</a>
            <a href="#loja" className="rounded-full bg-white px-7 py-4 font-bold shadow-sm">Ver loja</a>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 70 }} className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full bg-[#2ec4b6]">
          <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-[9rem] md:text-[11rem]">🐶</motion.span>
          <motion.span animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -left-2 top-10 rounded-2xl bg-white px-4 py-2 text-sm font-bold shadow-lg">🫧 Cheirosinho!</motion.span>
          <motion.span animate={{ y: [0, 12, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute -right-2 bottom-12 rounded-2xl bg-white px-4 py-2 text-sm font-bold shadow-lg">⭐ 4,9 no Google</motion.span>
        </motion.div>
      </section>

      <section id="servicos" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24">
        <Surgir className="rounded-[2.5rem] bg-white p-6 shadow-sm md:p-12">
          <h2 className="text-4xl font-extrabold">Agende o banho e tosa</h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-7">
              <div>
                <p className="mb-3 font-bold">Porte do seu pet</p>
                <div className="grid grid-cols-3 gap-3">
                  {portes.map((p, k) => (
                    <button key={p.n} onClick={() => setPorte(k)} className={`rounded-2xl border-2 py-4 transition ${porte === k ? "border-[#2ec4b6] bg-[#2ec4b6]/10" : "border-[#0f3b3a]/10"}`}>
                      <motion.span animate={porte === k ? { scale: [1, 1.3, 1] } : {}} className="block text-3xl">{p.e}</motion.span>
                      <span className="text-sm font-semibold">{p.n}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-bold">Serviços</p>
                <div className="flex flex-wrap gap-2">
                  {servicos.map((s, k) => {
                    const on = serv.includes(k);
                    return <button key={s.n} onClick={() => setServ(on ? serv.filter((x) => x !== k) : [...serv, k])} className={`rounded-full px-5 py-2.5 font-semibold transition ${on ? "bg-[#0f3b3a] text-white" : "bg-[#0f3b3a]/5 hover:bg-[#0f3b3a]/10"}`}>{on ? "✓ " : ""}{s.n}</button>;
                  })}
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <button type="button" onClick={() => setBusca(!busca)} className={`relative h-7 w-12 rounded-full transition ${busca ? "bg-[#2ec4b6]" : "bg-[#0f3b3a]/15"}`}>
                  <motion.span layout className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${busca ? "right-1" : "left-1"}`} />
                </button>
                <span className="font-semibold">Leva e traz (+ R$ 15)</span>
              </label>
            </div>
            <div className="rounded-3xl bg-[#0f3b3a] p-6 text-white">
              <p className="text-white/60">Resumo</p>
              <motion.p key={preco} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 text-5xl font-extrabold">R$ {preco}</motion.p>
              <p className="text-white/60">cerca de {tempo} min · porte {portes[porte].n.toLowerCase()}</p>
              <button disabled={!serv.length} className="mt-8 w-full rounded-2xl bg-[#ff7a45] py-4 font-bold disabled:opacity-40">Escolher horário</button>
              <p className="mt-3 text-center text-xs text-white/50">Acompanhe pela câmera ao vivo 📹</p>
            </div>
          </div>
        </Surgir>
      </section>

      <section id="loja" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24">
        <Surgir><h2 className="text-4xl font-extrabold">Loja</h2></Surgir>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {produtos.map((p, k) => (
            <Surgir key={p.n} atraso={k * 0.06} className="rounded-3xl bg-white p-4 shadow-sm">
              <motion.div whileHover={{ rotate: [0, -5, 5, 0] }} className="flex aspect-square items-center justify-center rounded-2xl text-6xl" style={{ background: p.cor }}>{p.e}</motion.div>
              <p className="mt-3 font-semibold leading-tight">{p.n}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-extrabold">{p.p.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                <AnimatePresence mode="wait">
                  {carrinho[k] ? (
                    <motion.div key="q" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2 rounded-full bg-[#0f3b3a]/5 px-1">
                      <button onClick={() => setCarrinho({ ...carrinho, [k]: carrinho[k] - 1 })} className="h-7 w-7 font-bold">−</button>
                      <span className="text-sm font-bold">{carrinho[k]}</span>
                      <button onClick={() => { setCarrinho({ ...carrinho, [k]: carrinho[k] + 1 }); setPulo((x) => x + 1); }} className="h-7 w-7 font-bold">+</button>
                    </motion.div>
                  ) : (
                    <motion.button key="a" initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={() => { setCarrinho({ ...carrinho, [k]: 1 }); setPulo((x) => x + 1); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff7a45] text-xl font-bold text-white">+</motion.button>
                  )}
                </AnimatePresence>
              </div>
            </Surgir>
          ))}
        </div>
      </section>
      <footer className="bg-[#0f3b3a] px-5 py-10 text-center text-white/70">🐾 Patas&Cia · Rua dos Ipês, 300 · Seg a sáb 8h às 19h</footer>
    </div>
  );
}
