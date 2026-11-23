"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Surgir } from "../ui";

// "Fotos" desenhadas com CSS para a demo não depender de imagens externas.
type Foto = { titulo: string; cat: string; fundo: string; forma: string; alto: boolean };
const fotos: Foto[] = [
  { titulo: "Marina & Pedro", cat: "Casamentos", fundo: "linear-gradient(180deg,#f7d9b5,#e89a6b 55%,#5b3a4a)", forma: "sol", alto: true },
  { titulo: "Retrato em luz natural", cat: "Ensaios", fundo: "linear-gradient(135deg,#d6d3cc,#8c8a85)", forma: "perfil", alto: false },
  { titulo: "Família Souza", cat: "Família", fundo: "linear-gradient(180deg,#bfe3d0,#5f9c84)", forma: "colinas", alto: false },
  { titulo: "Cerimônia na praia", cat: "Casamentos", fundo: "linear-gradient(180deg,#9fd3f2,#f4e1c1 60%,#e9c99a)", forma: "mar", alto: false },
  { titulo: "Ana, 30 semanas", cat: "Família", fundo: "linear-gradient(160deg,#f3e3e0,#c9a39c)", forma: "perfil", alto: true },
  { titulo: "Editorial urbano", cat: "Ensaios", fundo: "linear-gradient(180deg,#2b2d42,#8d99ae)", forma: "predios", alto: true },
  { titulo: "Festa no jardim", cat: "Casamentos", fundo: "linear-gradient(180deg,#e9f1c9,#97b36b)", forma: "colinas", alto: false },
  { titulo: "Pôr do sol na serra", cat: "Ensaios", fundo: "linear-gradient(180deg,#ffb88c,#de6262 60%,#3d1c2c)", forma: "sol", alto: false },
  { titulo: "Irmãos", cat: "Família", fundo: "linear-gradient(180deg,#fce7c4,#d8a24a)", forma: "mar", alto: false },
];
const categorias = ["Todos", "Casamentos", "Ensaios", "Família"];

function Desenho({ f }: { f: Foto }) {
  return (
    <div className="absolute inset-0" style={{ background: f.fundo }}>
      {f.forma === "sol" && <div className="absolute left-1/2 top-[38%] h-1/4 aspect-square -translate-x-1/2 rounded-full bg-[#fff3d6]/80 blur-[2px]" />}
      {(f.forma === "colinas" || f.forma === "sol") && <div className="absolute -bottom-[20%] -left-[10%] h-1/2 w-[80%] rounded-[50%] bg-black/25" />}
      {f.forma === "colinas" && <div className="absolute -bottom-[25%] -right-[10%] h-1/2 w-[80%] rounded-[50%] bg-black/15" />}
      {f.forma === "mar" && <div className="absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(180deg,rgba(255,255,255,.35),rgba(0,0,0,.15))]" />}
      {f.forma === "perfil" && <div className="absolute bottom-0 left-1/2 h-[70%] w-[45%] -translate-x-1/2 rounded-t-full bg-black/25" />}
      {f.forma === "predios" && (
        <div className="absolute inset-x-0 bottom-0 flex h-2/3 items-end gap-1 px-2">
          {[60, 85, 45, 95, 70, 55].map((h, i) => <div key={i} className="flex-1 bg-black/35" style={{ height: `${h}%` }} />)}
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,.25))]" />
    </div>
  );
}

export default function Fotografo() {
  const [cat, setCat] = useState("Todos");
  const [aberta, setAberta] = useState<number | null>(null);
  const lista = fotos.filter((f) => cat === "Todos" || f.cat === cat);

  useEffect(() => {
    if (aberta === null) return;
    const t = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowRight") setAberta((a) => ((a ?? 0) + 1) % lista.length);
      if (e.key === "ArrowLeft") setAberta((a) => ((a ?? 0) - 1 + lista.length) % lista.length);
    };
    window.addEventListener("keydown", t);
    return () => window.removeEventListener("keydown", t);
  }, [aberta, lista.length]);

  return (
    <div className="bg-white font-[family-name:var(--f-grotesk)] text-[#111]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <span className="text-sm font-bold uppercase tracking-[0.35em]">Estúdio Lente</span>
        <nav className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
          <a href="#trabalhos" className="hover:opacity-60">Trabalhos</a>
          <a href="#sobre" className="hover:opacity-60">Sobre</a>
          <a href="#contato" className="hover:opacity-60">Contato</a>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-[13vw] font-bold uppercase leading-[0.85] tracking-tighter md:text-[8.5rem]">
          Histórias<br /><span className="text-[#111]/25">em luz.</span>
        </motion.h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <p className="text-lg text-black/60 md:col-span-2 md:max-w-xl">Fotografia de casamentos, ensaios e famílias com direção leve e natural. Cada álbum é editado à mão, foto por foto.</p>
          <a href="#contato" className="self-end justify-self-start border-b border-black pb-1 text-sm uppercase tracking-widest md:justify-self-end">Consultar datas →</a>
        </div>
      </section>

      <section id="trabalhos" className="mx-auto max-w-7xl px-5 pb-24">
        <div className="mb-8 flex flex-wrap gap-6 border-b border-black/10 pb-4 text-sm uppercase tracking-widest">
          {categorias.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`relative pb-1 transition ${cat === c ? "" : "text-black/40 hover:text-black"}`}>
              {c}
              {cat === c && <motion.span layoutId="cat-foto" className="absolute -bottom-[17px] left-0 h-0.5 w-full bg-black" />}
            </button>
          ))}
        </div>
        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {lista.map((f, i) => (
              <motion.button
                layout
                key={f.titulo}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setAberta(i)}
                className={`group relative mb-4 block w-full overflow-hidden ${f.alto ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><Desenho f={f} /></div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition group-hover:opacity-100">
                  <div className="text-left text-white">
                    <p className="text-xs uppercase tracking-widest text-white/70">{f.cat}</p>
                    <p className="text-lg font-semibold">{f.titulo}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section id="sobre" className="bg-[#111] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center">
          <Surgir className="relative aspect-[4/5] overflow-hidden"><Desenho f={fotos[1]} /></Surgir>
          <Surgir atraso={0.1}>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Sobre</p>
            <h2 className="mt-4 text-4xl font-bold uppercase leading-tight md:text-5xl">Menos pose, mais verdade.</h2>
            <p className="mt-6 text-lg text-white/65">Fotografo há 12 anos. Gosto de chegar cedo, conversar e deixar as pessoas à vontade. As melhores fotos quase sempre acontecem entre uma pose e outra.</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {[["400+", "casamentos"], ["12", "anos"], ["30 dias", "para entrega"]].map(([n, r]) => <div key={r}><div className="text-2xl font-bold">{n}</div><div className="text-sm text-white/50">{r}</div></div>)}
            </div>
          </Surgir>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <Surgir><h2 className="text-4xl font-bold uppercase md:text-5xl">Pacotes</h2></Surgir>
        <div className="mt-12 grid gap-px bg-black/10 md:grid-cols-3">
          {[["Ensaio", ["1h30 de sessão", "40 fotos editadas", "Galeria online"]], ["Família", ["2h em casa ou ao ar livre", "60 fotos editadas", "Álbum impresso 20x20"]], ["Casamento", ["Cobertura completa", "500+ fotos editadas", "Álbum premium e making of"]]].map(([t, itens], i) => (
            <Surgir key={t as string} atraso={i * 0.08} className={`p-8 ${i === 2 ? "bg-[#111] text-white" : "bg-white"}`}>
              <p className="text-sm uppercase tracking-widest opacity-50">0{i + 1}</p>
              <h3 className="mt-4 text-3xl font-bold uppercase">{t as string}</h3>
              <ul className="mt-6 space-y-2 opacity-75">{(itens as string[]).map((x) => <li key={x}>— {x}</li>)}</ul>
              <a href="#contato" className="mt-8 inline-block border-b border-current pb-1 text-sm uppercase tracking-widest">Valores sob consulta</a>
            </Surgir>
          ))}
        </div>
      </section>

      <section id="contato" className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center">
          <h2 className="text-[11vw] font-bold uppercase leading-none tracking-tighter md:text-8xl">Vamos fotografar?</h2>
          <a href="#" className="mt-8 inline-block bg-[#111] px-10 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-black/80">contato@estudiolente.com</a>
        </div>
      </section>

      <AnimatePresence>
        {aberta !== null && lista[aberta] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={() => setAberta(null)}>
            <motion.div key={aberta} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`relative w-full max-w-3xl overflow-hidden ${lista[aberta].alto ? "aspect-[3/4] max-w-md" : "aspect-[4/3]"}`} onClick={(e) => e.stopPropagation()}>
              <Desenho f={lista[aberta]} />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-white">
              <p className="text-xs uppercase tracking-widest text-white/60">{lista[aberta].cat} · {aberta + 1}/{lista.length}</p>
              <p className="text-lg">{lista[aberta].titulo}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setAberta((aberta - 1 + lista.length) % lista.length); }} className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 text-3xl text-white" aria-label="Anterior">‹</button>
            <button onClick={(e) => { e.stopPropagation(); setAberta((aberta + 1) % lista.length); }} className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 text-3xl text-white" aria-label="Próxima">›</button>
            <button onClick={() => setAberta(null)} className="absolute right-4 top-4 text-sm uppercase tracking-widest text-white" aria-label="Fechar">Fechar ✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
