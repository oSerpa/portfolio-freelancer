"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Acordeao, CtaFixo, Surgir } from "../ui";

const categorias = ["🍔 Lanches", "🍕 Pizza", "🍣 Japonesa", "🥗 Saudável", "🍝 Italiana", "🌮 Mexicana", "🍰 Doces", "☕ Café", "🍜 Asiática", "🥩 Churrasco"];
const restaurantes = [
  { n: "Brasa Burger", c: "Lanches", t: "25-35 min", nota: "4,8", cor: "from-orange-400 to-red-500" },
  { n: "Forno da Vila", c: "Pizza", t: "30-40 min", nota: "4,7", cor: "from-yellow-300 to-orange-500" },
  { n: "Sushi Kai", c: "Japonesa", t: "35-45 min", nota: "4,9", cor: "from-rose-300 to-pink-500" },
];
const etapas = ["Pedido confirmado", "Preparando", "Saiu para entrega", "Chegou!"];

function Celular() {
  const [etapa, setEtapa] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setEtapa((e) => (e + 1) % etapas.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative mx-auto w-[270px] rounded-[2.6rem] border-[10px] border-[#111] bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,.45)]">
      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#111]" />
      <div className="h-[520px] overflow-hidden rounded-[2rem] bg-[#f7f7f2] px-4 pt-8 text-[#111]">
        <p className="text-xs text-black/50">Entregar em</p>
        <p className="font-semibold">Rua das Palmeiras, 85 ▾</p>
        <div className="mt-3 rounded-xl bg-white px-3 py-2 text-sm text-black/40 shadow-sm">Buscar pratos ou restaurantes</div>
        <div className="mt-4 flex gap-2 overflow-hidden text-xs">
          {categorias.slice(0, 4).map((c) => <span key={c} className="shrink-0 rounded-full bg-white px-3 py-1.5 shadow-sm">{c}</span>)}
        </div>
        <div className="mt-4 space-y-3">
          {restaurantes.map((r) => (
            <div key={r.n} className="flex gap-3 rounded-2xl bg-white p-2 shadow-sm">
              <div className={`h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br ${r.cor}`} />
              <div className="text-xs">
                <p className="text-sm font-semibold">{r.n}</p>
                <p className="text-black/50">{r.c} · {r.t}</p>
                <p className="text-amber-500">★ {r.nota}</p>
              </div>
            </div>
          ))}
        </div>
        <motion.div layout className="mt-4 rounded-2xl bg-[#111] p-4 text-white">
          <p className="text-[10px] uppercase tracking-widest text-white/50">Seu pedido</p>
          <AnimatePresence mode="wait">
            <motion.p key={etapa} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 font-semibold">{etapas[etapa]}</motion.p>
          </AnimatePresence>
          <div className="mt-3 flex gap-1">
            {etapas.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= etapa ? "bg-[#3ddc84]" : "bg-white/20"}`} />)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Delivery() {
  const [copiado, setCopiado] = useState(false);
  const [cep, setCep] = useState("");
  const [buscou, setBuscou] = useState(false);

  function copiar() {
    try { navigator.clipboard?.writeText("PRIMEIRO15"); } catch {}
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="bg-[#f7f7f2] font-[family-name:var(--f-redonda)] text-[#111]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-2xl font-extrabold tracking-tight">rangô<span className="text-[#3ddc84]">.</span></span>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#como" className="hover:text-[#1fae5b]">Como funciona</a>
          <a href="#parceiros" className="hover:text-[#1fae5b]">Para restaurantes</a>
          <a href="#faq" className="hover:text-[#1fae5b]">Ajuda</a>
        </nav>
        <a href="#cta" className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white">Baixar app</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block rounded-full bg-[#3ddc84]/20 px-4 py-1.5 text-sm font-semibold text-[#14833f]">Frete grátis no primeiro pedido</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-[2.6rem] font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
            Bateu a fome?<br /><span className="relative inline-block md:whitespace-nowrap">Chega em 30 min.<motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="absolute -bottom-1 left-0 h-3 w-full origin-left -skew-x-12 bg-[#3ddc84]/60 -z-0" /></span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-md text-lg text-black/60">Os melhores restaurantes do seu bairro, entrega acompanhada em tempo real e cupons toda semana.</motion.p>
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} onSubmit={(e) => { e.preventDefault(); setBuscou(true); }} className="mt-8 flex max-w-md overflow-hidden rounded-full bg-white p-1.5 shadow-lg">
            <input value={cep} onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="Digite seu CEP" inputMode="numeric" className="min-w-0 flex-1 bg-transparent px-5 outline-none" />
            <button className="rounded-full bg-[#3ddc84] px-6 py-3 font-semibold text-[#111]">Ver restaurantes</button>
          </motion.form>
          <AnimatePresence>
            {buscou && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 pl-5 text-sm text-[#14833f]">✓ Encontramos 128 restaurantes entregando{cep ? ` no CEP ${cep}` : " perto de você"}.</motion.p>}
          </AnimatePresence>
        </div>
        <motion.div initial={{ opacity: 0, y: 60, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 60 }} className="relative">
          <div className="absolute inset-0 m-auto h-80 w-80 rounded-full bg-[#3ddc84]/40 blur-3xl" />
          <Celular />
        </motion.div>
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-white py-5">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex w-max gap-4">
          {[...categorias, ...categorias].map((c, i) => <span key={i} className="shrink-0 rounded-full border border-black/10 px-5 py-2.5 text-lg">{c}</span>)}
        </motion.div>
      </div>

      <section id="como" className="mx-auto max-w-6xl px-5 py-24">
        <Surgir><h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Simples assim</h2></Surgir>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[["Escolha", "Navegue por categorias e veja avaliações reais de quem já pediu."], ["Peça", "Pague com Pix, cartão ou dinheiro. Tudo pelo app, sem ligação."], ["Acompanhe", "Veja o entregador no mapa e receba aviso quando estiver chegando."]].map(([t, d], i) => (
            <Surgir key={t} atraso={i * 0.1} className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3ddc84] text-xl font-extrabold">{i + 1}</span>
              <h3 className="mt-6 text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-black/60">{d}</p>
            </Surgir>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir className="flex flex-col items-center justify-between gap-8 rounded-[2rem] bg-[#111] p-10 text-white md:flex-row md:p-14">
          <div>
            <p className="text-[#3ddc84]">Cupom de boas-vindas</p>
            <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">15% OFF no primeiro pedido</h2>
          </div>
          <button onClick={copiar} className="group relative min-w-56 rounded-2xl border-2 border-dashed border-[#3ddc84] px-8 py-5 text-center">
            <span className="block font-mono text-2xl font-bold tracking-widest">PRIMEIRO15</span>
            <span className="text-sm text-white/60">{copiado ? "✓ Copiado!" : "Toque para copiar"}</span>
          </button>
        </Surgir>
      </section>

      <section id="parceiros" className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 md:grid-cols-2 md:items-center">
        <Surgir>
          <h2 className="text-4xl font-extrabold tracking-tight">Tem um restaurante?</h2>
          <p className="mt-4 text-lg text-black/60">Cadastre seu cardápio, receba pedidos pelo painel e alcance milhares de clientes na sua região.</p>
          <button className="mt-6 rounded-full border-2 border-[#111] px-7 py-3 font-semibold transition hover:bg-[#111] hover:text-white">Quero ser parceiro</button>
        </Surgir>
        <Surgir atraso={0.1} className="grid grid-cols-2 gap-4">
          {[["+40", "cidades"], ["3 mil", "restaurantes"], ["28 min", "tempo médio"], ["4,8", "nota no app"]].map(([n, r]) => (
            <div key={r} className="rounded-3xl bg-white p-6 shadow-sm"><div className="text-3xl font-extrabold">{n}</div><div className="text-black/55">{r}</div></div>
          ))}
        </Surgir>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 pb-24">
        <h2 className="mb-6 text-4xl font-extrabold tracking-tight">Dúvidas</h2>
        <Acordeao corLinha="border-black/10" itens={[
          { p: "Funciona na minha cidade?", r: "Estamos em mais de 40 cidades. Digite seu CEP no topo da página para conferir." },
          { p: "O frete grátis vale sempre?", r: "Vale no primeiro pedido e em campanhas especiais divulgadas no app." },
          { p: "Posso agendar um pedido?", r: "Sim, com até 7 dias de antecedência." },
        ]} />
      </section>

      <section id="cta" className="bg-[#3ddc84]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-20 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">Baixe o rangô e peça agora</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["App Store", "Google Play"].map((l) => (
              <button key={l} className="rounded-2xl bg-[#111] px-6 py-3 text-left text-white">
                <span className="block text-[10px] uppercase tracking-widest text-white/60">Disponível na</span>
                <span className="text-lg font-semibold">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <CtaFixo texto="Baixar o app" className="rounded-full bg-[#111] text-white" />
    </div>
  );
}
