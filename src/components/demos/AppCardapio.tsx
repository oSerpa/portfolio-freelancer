"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Item = { id: number; n: string; d: string; p: number; cat: string; e: string; tag?: string };
const itens: Item[] = [
  { id: 1, n: "Smash duplo", d: "Dois blends de 90g, cheddar, cebola caramelizada.", p: 38, cat: "Burgers", e: "🍔", tag: "Mais pedido" },
  { id: 2, n: "Chicken crispy", d: "Frango empanado, maionese de alho e alface.", p: 34, cat: "Burgers", e: "🍗" },
  { id: 3, n: "Veggie", d: "Burger de grão-de-bico, rúcula e tomate seco.", p: 32, cat: "Burgers", e: "🥬", tag: "Vegano" },
  { id: 4, n: "Batata rústica", d: "Com páprica e molho da casa.", p: 18, cat: "Porções", e: "🍟" },
  { id: 5, n: "Onion rings", d: "Anéis de cebola crocantes.", p: 22, cat: "Porções", e: "🧅" },
  { id: 6, n: "Milkshake", d: "Chocolate, morango ou doce de leite.", p: 19, cat: "Bebidas", e: "🥤" },
  { id: 7, n: "Limonada", d: "Feita na hora, com hortelã.", p: 12, cat: "Bebidas", e: "🍋" },
  { id: 8, n: "Brownie", d: "Com sorvete de creme.", p: 21, cat: "Sobremesas", e: "🍫" },
];
const cats = ["Burgers", "Porções", "Bebidas", "Sobremesas"];
const etapas = ["Pedido enviado", "Na cozinha", "Saindo da chapa", "A caminho da mesa"];
const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function AppCardapio() {
  const [cat, setCat] = useState("Burgers");
  const [sacola, setSacola] = useState<Record<number, number>>({});
  const [aberta, setAberta] = useState(false);
  const [detalhe, setDetalhe] = useState<Item | null>(null);
  const [etapa, setEtapa] = useState<number | null>(null);
  const qtd = Object.values(sacola).reduce((a, b) => a + b, 0);
  const total = Object.entries(sacola).reduce((s, [id, q]) => s + (itens.find((i) => i.id === +id)?.p ?? 0) * q, 0);

  useEffect(() => {
    if (etapa === null || etapa >= etapas.length - 1) return;
    const id = setTimeout(() => setEtapa((e) => (e ?? 0) + 1), 2500);
    return () => clearTimeout(id);
  }, [etapa]);

  const mudar = (id: number, d: number) => setSacola((s) => { const q = (s[id] ?? 0) + d; const n = { ...s }; if (q <= 0) delete n[id]; else n[id] = q; return n; });

  return (
    <div className="min-h-[calc(100vh-32px)] bg-[#1b1b1b] font-[family-name:var(--f-redonda)] md:flex md:items-start md:justify-center md:gap-12 md:py-10">
      <div className="hidden max-w-xs shrink-0 pt-20 text-white md:block">
        <p className="text-sm uppercase tracking-widest text-[#ffb703]">Cardápio digital</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight">O cliente pede pelo QR Code da mesa.</h1>
        <p className="mt-4 text-white/60">Sem app para baixar, sem esperar o garçom. O pedido cai direto na cozinha e o cliente acompanha o preparo.</p>
      </div>
      <div className="relative mx-auto md:mx-0 min-h-[calc(100vh-32px)] w-full max-w-[420px] overflow-hidden bg-[#fffaf2] text-[#1b1b1b] md:min-h-[780px] md:rounded-[2.5rem] md:shadow-2xl">
        <div className="bg-[#1b1b1b] px-5 pb-6 pt-6 text-white">
          <div className="flex items-center justify-between">
            <div><p className="text-xs text-white/50">Mesa 12</p><p className="text-xl font-extrabold">Chapa Quente 🔥</p></div>
            <span className="rounded-full bg-[#ffb703] px-3 py-1 text-xs font-bold text-black">Aberto</span>
          </div>
        </div>
        <div className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-[#fffaf2] px-5 py-3 [scrollbar-width:none]">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold">
              {cat === c && <motion.span layoutId="cat-cardapio" className="absolute inset-0 rounded-full bg-[#1b1b1b]" />}
              <span className={`relative ${cat === c ? "text-white" : ""}`}>{c}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.ul key={cat} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 px-5 pb-32 pt-2">
            {itens.filter((i) => i.cat === cat).map((i) => (
              <li key={i.id} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm">
                <button onClick={() => setDetalhe(i)} className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#ffb703]/20 text-4xl">{i.e}</button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2"><p className="font-bold">{i.n}</p>{i.tag && <span className="shrink-0 rounded-full bg-[#ffb703]/25 px-2 py-0.5 text-[10px] font-bold">{i.tag}</span>}</div>
                  <p className="line-clamp-2 text-xs text-black/55">{i.d}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-extrabold">{real(i.p)}</span>
                    {sacola[i.id] ? (
                      <div className="flex items-center gap-3 rounded-full bg-[#1b1b1b] px-1 text-white">
                        <button onClick={() => mudar(i.id, -1)} className="h-7 w-7">−</button><span className="text-sm font-bold">{sacola[i.id]}</span><button onClick={() => mudar(i.id, 1)} className="h-7 w-7">+</button>
                      </div>
                    ) : (
                      <button onClick={() => mudar(i.id, 1)} className="h-8 w-8 rounded-full bg-[#ffb703] text-lg font-bold">+</button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <AnimatePresence>
          {qtd > 0 && etapa === null && !aberta && (
            <motion.button initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={() => setAberta(true)} className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[#1b1b1b] px-5 py-4 font-bold text-white shadow-2xl">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffb703] text-sm text-black">{qtd}</span>Ver sacola<span>{real(total)}</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(aberta || detalhe) && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setAberta(false); setDetalhe(null); }} className="absolute inset-0 z-20 bg-black/50" />}
          {detalhe && (
            <motion.div key="det" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28 }} className="absolute inset-x-0 bottom-0 z-30 rounded-t-3xl bg-white p-6">
              <div className="flex h-40 items-center justify-center rounded-2xl bg-[#ffb703]/20 text-7xl">{detalhe.e}</div>
              <p className="mt-4 text-2xl font-extrabold">{detalhe.n}</p>
              <p className="mt-1 text-black/60">{detalhe.d}</p>
              <button onClick={() => { mudar(detalhe.id, 1); setDetalhe(null); }} className="mt-6 w-full rounded-2xl bg-[#ffb703] py-4 font-bold">Adicionar · {real(detalhe.p)}</button>
            </motion.div>
          )}
          {aberta && (
            <motion.div key="sacola" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28 }} className="absolute inset-x-0 bottom-0 z-30 max-h-[80%] overflow-y-auto rounded-t-3xl bg-white p-6">
              <p className="text-xl font-extrabold">Sua sacola</p>
              <ul className="mt-4 divide-y divide-black/5">
                {Object.entries(sacola).map(([id, q]) => { const i = itens.find((x) => x.id === +id)!; return (
                  <li key={id} className="flex items-center gap-3 py-3"><span className="text-2xl">{i.e}</span><span className="flex-1 font-semibold">{q}× {i.n}</span><span>{real(i.p * q)}</span></li>
                ); })}
              </ul>
              <div className="mt-4 flex justify-between text-lg font-extrabold"><span>Total</span><span>{real(total)}</span></div>
              <button onClick={() => { setAberta(false); setEtapa(0); }} className="mt-6 w-full rounded-2xl bg-[#1b1b1b] py-4 font-bold text-white">Enviar pedido para a cozinha</button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {etapa !== null && (
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute inset-x-0 bottom-0 z-30 rounded-t-3xl bg-[#1b1b1b] p-6 text-white">
              <p className="text-sm text-white/50">Pedido #{(total * 7) % 1000}</p>
              <AnimatePresence mode="wait"><motion.p key={etapa} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-2xl font-extrabold">{etapas[etapa]}</motion.p></AnimatePresence>
              <div className="mt-4 flex gap-1.5">{etapas.map((_, k) => <div key={k} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${k <= etapa ? "bg-[#ffb703]" : "bg-white/15"}`} />)}</div>
              {etapa === etapas.length - 1 && <button onClick={() => { setEtapa(null); setSacola({}); }} className="mt-6 w-full rounded-2xl bg-[#ffb703] py-3 font-bold text-black">Bom apetite! Fazer novo pedido</button>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
