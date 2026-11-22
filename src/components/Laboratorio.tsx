"use client";

import { AnimatePresence, motion, animate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import TextoRevelado from "./fx/TextoRevelado";

const abas = ["Responsivo", "Personalize", "Microinterações"] as const;
type Aba = (typeof abas)[number];

/* ---------- 1. Responsivo: arraste para mudar a largura e ver o layout se reorganizar ---------- */
function Responsivo() {
  const [largura, setLargura] = useState(100);
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <span className="rotulo text-cinza">Largura</span>
        <input type="range" min={28} max={100} value={largura} onChange={(e) => setLargura(+e.target.value)} className="flex-1 accent-[var(--color-brasa)]" aria-label="Largura da prévia" />
        <span className="rotulo w-16 text-right text-brasa">{largura < 45 ? "celular" : largura < 75 ? "tablet" : "desktop"}</span>
      </div>
      <div className="flex justify-center border border-dashed border-linha bg-tinta p-3">
        <motion.div animate={{ width: `${largura}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }} className="@container overflow-hidden bg-papel text-tinta">
          <div className="flex items-center justify-between border-b border-tinta/10 px-4 py-3">
            <span className="font-display font-bold">Aurora Café</span>
            <span className="hidden gap-4 text-xs @lg:flex"><span>Cardápio</span><span>Sobre</span><span>Contato</span></span>
            <span className="text-lg @lg:hidden">☰</span>
          </div>
          <div className="grid gap-4 p-4 @2xl:grid-cols-2 @2xl:items-center @2xl:p-8">
            <div>
              <h4 className="font-display text-2xl font-bold leading-tight @2xl:text-4xl">Café especial torrado toda semana</h4>
              <p className="mt-2 text-sm text-tinta/60">Grãos selecionados direto do produtor.</p>
              <span className="mt-4 inline-block bg-brasa px-4 py-2 text-sm font-semibold">Pedir agora</span>
            </div>
            <div className="aspect-video bg-[linear-gradient(135deg,#7c4a2d,#d9a066)]" />
          </div>
          <div className="grid grid-cols-1 gap-3 px-4 pb-5 @md:grid-cols-2 @3xl:grid-cols-4 @2xl:px-8">
            {["Espresso", "Coado", "Latte", "Cold brew"].map((c) => (
              <div key={c} className="border border-tinta/10 p-3 text-sm"><b>{c}</b><div className="text-tinta/50">a partir de R$ 9</div></div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- 2. Personalize: mude cor, cantos, fonte e tema em tempo real ---------- */
const cores = ["#ff4d1c", "#7c5cff", "#10b981", "#eab308"];
const fontes = { Moderna: "var(--font-bricolage)", Clássica: "Georgia, serif", Técnica: "var(--font-jetbrains)" } as const;

function Personalize() {
  const [cor, setCor] = useState(cores[0]);
  const [raio, setRaio] = useState(4);
  const [fonte, setFonte] = useState<keyof typeof fontes>("Moderna");
  const [escuro, setEscuro] = useState(true);
  const fundo = escuro ? "#151513" : "#f1ede4";
  const texto = escuro ? "#f1ede4" : "#0d0d0c";

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="space-y-6">
        <div>
          <p className="rotulo mb-3 text-cinza">Cor da marca</p>
          <div className="flex gap-3">
            {cores.map((c) => (
              <button key={c} onClick={() => setCor(c)} aria-label={`Cor ${c}`} className={`h-9 w-9 transition-transform ${cor === c ? "scale-110 ring-2 ring-papel ring-offset-2 ring-offset-tinta" : ""}`} style={{ background: c }} />
            ))}
          </div>
        </div>
        <div>
          <p className="rotulo mb-3 text-cinza">Cantos: {raio}px</p>
          <input type="range" min={0} max={28} value={raio} onChange={(e) => setRaio(+e.target.value)} className="w-full accent-[var(--color-brasa)]" aria-label="Arredondamento" />
        </div>
        <div>
          <p className="rotulo mb-3 text-cinza">Tipografia</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(fontes) as (keyof typeof fontes)[]).map((f) => (
              <button key={f} onClick={() => setFonte(f)} className={`border px-3 py-1.5 text-sm transition ${fonte === f ? "border-brasa text-brasa" : "border-linha text-cinza hover:text-papel"}`}>{f}</button>
            ))}
          </div>
        </div>
        <button onClick={() => setEscuro(!escuro)} className="flex items-center gap-3">
          <span className={`relative h-6 w-11 border border-linha transition-colors ${escuro ? "bg-brasa" : "bg-linha"}`}>
            <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`absolute top-0.5 h-4 w-4 bg-papel ${escuro ? "right-0.5" : "left-0.5"}`} />
          </span>
          <span className="rotulo text-cinza">Tema escuro</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <motion.div animate={{ backgroundColor: fundo, color: texto, borderRadius: raio }} transition={{ duration: 0.4 }} className="p-6" style={{ fontFamily: fontes[fonte] }}>
          <motion.div animate={{ backgroundColor: cor, borderRadius: Math.max(0, raio - 6) }} className="aspect-[16/9] w-full opacity-90" />
          <p className="mt-5 text-xs uppercase tracking-widest opacity-60">Coleção de verão</p>
          <h4 className="mt-1 text-2xl font-bold">Tênis Aurora Run</h4>
          <p className="mt-1 text-sm opacity-70">Leve, respirável e feito para o dia todo.</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xl font-bold">R$ 349</span>
            <motion.button whileTap={{ scale: 0.95 }} animate={{ backgroundColor: cor, borderRadius: raio }} className="px-5 py-2.5 text-sm font-semibold text-tinta">Comprar</motion.button>
          </div>
        </motion.div>
        <pre className="overflow-auto border border-linha bg-tinta p-5 font-mono text-xs leading-relaxed text-cinza">
{`:root {
  --cor-marca: `}<span className="text-brasa">{cor}</span>{`;
  --raio: `}<span className="text-papel">{raio}px</span>{`;
  --fonte: `}<span className="text-papel">{fonte.toLowerCase()}</span>{`;
  --fundo: `}<span className="text-papel">{fundo}</span>{`;
}`}
          <span className="mt-4 block text-cinza/60">{"// o tema inteiro do site muda\n// trocando só essas variáveis"}</span>
        </pre>
      </div>
    </div>
  );
}

/* ---------- 3. Microinterações: os detalhes que fazem o site parecer vivo ---------- */
function Curtir() {
  const [ativo, setAtivo] = useState(false);
  const [n, setN] = useState(128);
  return (
    <button onClick={() => { setAtivo(!ativo); setN((v) => v + (ativo ? -1 : 1)); }} className="relative flex items-center gap-3" aria-pressed={ativo}>
      <span className="relative">
        <motion.span animate={{ scale: ativo ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.35 }} className={`block text-3xl ${ativo ? "text-brasa" : "text-cinza"}`}>♥</motion.span>
        <AnimatePresence>
          {ativo && [...Array(8)].map((_, i) => (
            <motion.span key={i} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos((i / 8) * Math.PI * 2) * 28, y: Math.sin((i / 8) * Math.PI * 2) * 28, opacity: 0, scale: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-brasa" />
          ))}
        </AnimatePresence>
      </span>
      <span className="font-mono tabular-nums">{n}</span>
    </button>
  );
}

function BotaoEnvio() {
  const [estado, setEstado] = useState<"parado" | "enviando" | "ok">("parado");
  function clicar() {
    if (estado !== "parado") return;
    setEstado("enviando");
    setTimeout(() => setEstado("ok"), 1400);
    setTimeout(() => setEstado("parado"), 3200);
  }
  return (
    <motion.button layout onClick={clicar} className={`flex h-12 items-center justify-center overflow-hidden px-6 font-semibold ${estado === "ok" ? "bg-emerald-400 text-tinta" : "bg-papel text-tinta"}`} style={{ borderRadius: estado === "enviando" ? 24 : 0 }}>
      <AnimatePresence mode="wait">
        <motion.span key={estado} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
          {estado === "parado" ? "Enviar" : estado === "enviando" ? <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-tinta border-t-transparent align-middle" /> : "Enviado ✓"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function Contador() {
  const v = useMotionValue(0);
  const texto = useTransform(v, (x) => Math.round(x).toLocaleString("pt-BR"));
  const [alvo, setAlvo] = useState(1240);
  useEffect(() => { const c = animate(v, alvo, { duration: 1.2, ease: "easeOut" }); return c.stop; }, [alvo, v]);
  return (
    <button onClick={() => setAlvo(Math.floor(Math.random() * 9000) + 500)} className="text-left">
      <motion.span className="font-display block text-4xl font-semibold tabular-nums">{texto}</motion.span>
      <span className="rotulo text-cinza">clique para gerar outro</span>
    </button>
  );
}

function Arrastar() {
  return (
    <div className="relative h-24 w-full overflow-hidden border border-dashed border-linha">
      <motion.div drag dragConstraints={{ left: 0, right: 160, top: 0, bottom: 40 }} dragElastic={0.2} whileDrag={{ scale: 1.1, rotate: 6 }} className="absolute left-3 top-3 flex h-12 w-12 cursor-grab items-center justify-center bg-brasa text-tinta active:cursor-grabbing" data-cursor>
        ✥
      </motion.div>
      <span className="rotulo absolute bottom-2 right-3 text-cinza/60">me arraste</span>
    </div>
  );
}

function Micro() {
  const itens: [string, React.ReactNode][] = [
    ["Curtir com explosão", <Curtir key="c" />],
    ["Botão com estados", <BotaoEnvio key="b" />],
    ["Números animados", <Contador key="n" />],
    ["Arrastar e soltar", <Arrastar key="a" />],
  ];
  return (
    <div className="grid gap-px bg-linha sm:grid-cols-2 lg:grid-cols-4">
      {itens.map(([t, el]) => (
        <div key={t} className="flex min-h-52 flex-col justify-between bg-tinta-2 p-6">
          <p className="rotulo text-cinza">{t}</p>
          <div className="mt-6 flex items-center">{el}</div>
        </div>
      ))}
    </div>
  );
}

export default function Laboratorio() {
  const [aba, setAba] = useState<Aba>("Responsivo");
  return (
    <section id="laboratorio" className="border-y border-linha bg-tinta-2/40">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <p className="rotulo text-cinza">(03) Laboratório</p>
          <div>
            <TextoRevelado className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight" linhas={[{ texto: "Mexa à vontade." }, { texto: "Isso aqui é código.", className: "text-brasa" }]} />
            <p className="mt-6 max-w-xl text-papel/65">Uma amostra do que dá para colocar no seu projeto: layouts que se adaptam a qualquer tela, identidade visual configurável e animações que respondem ao usuário.</p>
          </div>
        </div>

        <div className="mt-14 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {abas.map((a, i) => (
            <button key={a} onClick={() => setAba(a)} className={`relative shrink-0 border px-4 py-2.5 text-sm transition-colors ${aba === a ? "border-brasa text-tinta" : "border-linha text-cinza hover:text-papel"}`}>
              {aba === a && <motion.span layoutId="aba-lab" className="absolute inset-0 bg-brasa" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
              <span className="relative font-mono">0{i + 1} {a}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div key={aba} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              {aba === "Responsivo" ? <Responsivo /> : aba === "Personalize" ? <Personalize /> : <Micro />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
