"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CtaFixo, Surgir } from "../ui";

const terra = "#b5442a";
const cardapio: Record<string, { n: string; d: string; p: string; tag?: string }[]> = {
  Entradas: [
    { n: "Bruschetta della casa", d: "Pão rústico, tomate, manjericão e azeite.", p: "R$ 32" },
    { n: "Burrata", d: "Com tomates confitados e pesto de rúcula.", p: "R$ 58", tag: "Favorito" },
    { n: "Carpaccio", d: "Lâminas de filé, alcaparras e parmesão.", p: "R$ 46" },
  ],
  Massas: [
    { n: "Lasanha da Nonna", d: "Massa fresca, ragu de 6 horas e bechamel.", p: "R$ 68", tag: "Da casa" },
    { n: "Nhoque ao sugo", d: "Batata, molho de tomate italiano e grana padano.", p: "R$ 54" },
    { n: "Fettuccine Alfredo", d: "Manteiga, creme e parmesão.", p: "R$ 59" },
    { n: "Ravioli de abóbora", d: "Com manteiga de sálvia e amêndoas.", p: "R$ 62", tag: "Vegetariano" },
  ],
  Sobremesas: [
    { n: "Tiramisù", d: "Café, mascarpone e cacau.", p: "R$ 28", tag: "Favorito" },
    { n: "Panna cotta", d: "Com calda de frutas vermelhas.", p: "R$ 24" },
  ],
  Bebidas: [
    { n: "Vinho da casa (taça)", d: "Tinto ou branco, seleção do sommelier.", p: "R$ 29" },
    { n: "Limonada siciliana", d: "Feita na hora.", p: "R$ 14" },
    { n: "Espresso", d: "Grãos torrados artesanalmente.", p: "R$ 8" },
  ],
};
const horarios = ["12:00", "12:30", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00"];

function Selo() {
  return (
    <motion.svg viewBox="0 0 120 120" className="h-28 w-28 md:h-36 md:w-36" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} aria-hidden>
      <defs><path id="circulo" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
      <circle cx="60" cy="60" r="58" fill={terra} />
      <text fill="#f6efe4" fontSize="11" letterSpacing="3"><textPath href="#circulo">MASSA FRESCA · FEITA TODO DIA · </textPath></text>
      <text x="60" y="68" textAnchor="middle" fill="#f6efe4" fontSize="22">✻</text>
    </motion.svg>
  );
}

function AbertoAgora() {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const d = new Date();
    const h = d.getHours() + d.getMinutes() / 60;
    const dia = d.getDay();
    const aberto = dia !== 1 && ((h >= 11.5 && h < 15) || (h >= 18.5 && h < 23));
    setTxt(aberto ? "Aberto agora" : "Fechado agora");
  }, []);
  if (!txt) return null;
  return <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm"><span className={`h-2 w-2 rounded-full ${txt === "Aberto agora" ? "bg-green-600" : "bg-red-500"}`} />{txt}</span>;
}

export default function Restaurante() {
  const [aba, setAba] = useState("Massas");
  const [res, setRes] = useState({ data: "", hora: "", pessoas: 2, nome: "" });
  const [confirmada, setConfirmada] = useState(false);

  return (
    <div className="bg-[#f6efe4] text-[#2b1a10]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <span className="font-[family-name:var(--f-serif)] text-2xl font-bold italic" style={{ color: terra }}>Cantina Nonna</span>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#cardapio" className="hover:underline">Cardápio</a>
          <a href="#historia" className="hover:underline">Nossa história</a>
          <a href="#reservas" className="hover:underline">Reservas</a>
        </nav>
        <a href="#reservas" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: terra }}>Reservar mesa</a>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6">
        <div className="relative">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="font-[family-name:var(--f-serif)] text-[15vw] font-bold leading-[0.85] tracking-tight md:text-[9rem]">
            Mangia<br /><span className="italic" style={{ color: terra }}>bene.</span>
          </motion.h1>
          <div className="absolute right-0 top-0 md:right-10 md:top-6"><Selo /></div>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
          <div>
            <AbertoAgora />
            <p className="mt-5 max-w-sm text-lg text-[#2b1a10]/70">Receitas da família desde 1987, massa feita à mão todas as manhãs e um salão para reunir quem você gosta.</p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9 }} className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_30%_40%,#f2c879,transparent_45%),radial-gradient(circle_at_70%_60%,#c4532f,transparent_55%),linear-gradient(135deg,#7a2e17,#3a1608)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[70%] aspect-square rounded-full bg-[radial-gradient(circle,#f5d9a0_0%,#e7b35d_45%,#c4532f_70%,transparent_72%)] shadow-[inset_0_-20px_40px_rgba(0,0,0,.25)]" />
            </div>
            <span className="absolute bottom-4 left-4 rounded-full bg-[#f6efe4] px-4 py-2 text-sm font-semibold">Prato do dia: Lasanha da Nonna</span>
          </motion.div>
        </div>
      </section>

      <section id="cardapio" className="bg-[#2b1a10] text-[#f6efe4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Surgir><h2 className="text-center font-[family-name:var(--f-serif)] text-5xl md:text-6xl">Cardápio</h2></Surgir>
          <div className="mx-auto mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white/10 p-1 [scrollbar-width:none]">
            {Object.keys(cardapio).map((c) => (
              <button key={c} onClick={() => setAba(c)} className="relative shrink-0 rounded-full px-4 py-2.5 text-sm sm:px-5">
                {aba === c && <motion.span layoutId="aba-cardapio" className="absolute inset-0 rounded-full" style={{ background: terra }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={aba} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-8 md:grid-cols-2">
              {cardapio[aba].map((i) => (
                <li key={i.n}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-[family-name:var(--f-serif)] text-2xl">{i.n}</h3>
                    <span className="flex-1 border-b border-dotted border-white/30" />
                    <span className="font-semibold text-[#f2c879]">{i.p}</span>
                  </div>
                  <p className="mt-1 text-white/60">{i.d}</p>
                  {i.tag && <span className="mt-2 inline-block rounded-full border border-[#f2c879]/50 px-2.5 py-0.5 text-xs text-[#f2c879]">{i.tag}</span>}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>

      <section id="historia" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <Surgir className="grid grid-cols-2 gap-4">
          <div className="aspect-[3/4] rounded-t-full bg-[linear-gradient(160deg,#d9a066,#8b4a24)]" />
          <div className="mt-12 aspect-[3/4] rounded-b-full bg-[linear-gradient(160deg,#9aa86a,#4f5d2f)]" />
        </Surgir>
        <Surgir atraso={0.1}>
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: terra }}>Desde 1987</p>
          <h2 className="mt-4 font-[family-name:var(--f-serif)] text-4xl md:text-5xl">A cozinha da avó, do jeito que ela ensinou.</h2>
          <p className="mt-6 text-lg text-[#2b1a10]/70">Dona Giuseppina chegou de Nápoles com um caderno de receitas. Três gerações depois, a massa ainda é aberta no rolo e o molho ainda leva o dia inteiro no fogo.</p>
        </Surgir>
      </section>

      <section id="reservas" className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir className="grid gap-10 text-white md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <h2 className="font-[family-name:var(--f-serif)] text-4xl text-[#2b1a10] md:text-5xl">Reserve sua mesa</h2>
            <p className="mt-4 text-[#2b1a10]/70">Ter a dom · 11h30 às 15h e 18h30 às 23h<br />Rua das Oliveiras, 45</p>
          </div>
          <div className="rounded-3xl p-6 md:p-8" style={{ background: terra }}>
            <AnimatePresence mode="wait">
              {confirmada ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                  <p className="font-[family-name:var(--f-serif)] text-4xl">Grazie, {res.nome.split(" ")[0]}!</p>
                  <p className="mt-3 text-white/85">Mesa para {res.pessoas} {res.pessoas > 1 ? "pessoas" : "pessoa"} em {new Date(res.data + "T12:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} às {res.hora}.</p>
                  <button onClick={() => setConfirmada(false)} className="mt-6 rounded-full bg-[#f6efe4] px-6 py-3 font-semibold text-[#2b1a10]">Fazer outra reserva</button>
                </motion.div>
              ) : (
                <motion.form key="f" onSubmit={(e) => { e.preventDefault(); if (res.data && res.hora && res.nome) setConfirmada(true); }} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="text-sm">Data<input type="date" required value={res.data} onChange={(e) => setRes({ ...res, data: e.target.value })} className="mt-1 w-full rounded-xl bg-white/15 px-3 py-2.5 text-white outline-none [color-scheme:dark]" /></label>
                    <label className="text-sm">Pessoas
                      <div className="mt-1 flex items-center justify-between rounded-xl bg-white/15 px-2 py-1.5">
                        <button type="button" onClick={() => setRes({ ...res, pessoas: Math.max(1, res.pessoas - 1) })} className="h-8 w-8 rounded-lg bg-white/15">−</button>
                        <span className="font-semibold">{res.pessoas}</span>
                        <button type="button" onClick={() => setRes({ ...res, pessoas: Math.min(12, res.pessoas + 1) })} className="h-8 w-8 rounded-lg bg-white/15">+</button>
                      </div>
                    </label>
                  </div>
                  <div>
                    <p className="text-sm">Horário</p>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {horarios.map((h) => <button type="button" key={h} onClick={() => setRes({ ...res, hora: h })} className={`rounded-lg py-2 text-sm transition ${res.hora === h ? "bg-[#f6efe4] font-semibold text-[#2b1a10]" : "bg-white/15 hover:bg-white/25"}`}>{h}</button>)}
                    </div>
                  </div>
                  <input required placeholder="Seu nome" value={res.nome} onChange={(e) => setRes({ ...res, nome: e.target.value })} className="w-full rounded-xl bg-white/15 px-4 py-3 text-white outline-none placeholder:text-white/60" />
                  <button className="w-full rounded-full bg-[#f6efe4] py-4 font-semibold text-[#2b1a10] disabled:opacity-50" disabled={!res.data || !res.hora || !res.nome}>Confirmar reserva</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Surgir>
      </section>
      <footer className="border-t border-[#2b1a10]/10 px-5 py-8 text-center text-sm text-[#2b1a10]/55">Cantina Nonna · Rua das Oliveiras, 45 · (00) 0000-0000</footer>
      <CtaFixo texto="Reservar mesa" href="#reservas" className="rounded-full bg-[#b5442a] text-white" />
    </div>
  );
}
