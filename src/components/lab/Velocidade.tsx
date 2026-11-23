"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* Antes e depois: a mesma página carregando de um jeito lento e de um jeito bem feito.
   É uma simulação para mostrar a diferença na prática, os tempos são ilustrativos. */

type Fase = { em: number; passo: number };

// Site lento: tela branca, carregando, e as partes aparecendo fora de ordem, empurrando o conteúdo.
const lento: Fase[] = [
  { em: 900, passo: 1 }, // aparece o spinner
  { em: 2300, passo: 2 }, // texto sem fonte
  { em: 3100, passo: 3 }, // banner entra e empurra tudo
  { em: 3900, passo: 4 }, // fonte carrega, cards
  { em: 4700, passo: 5 }, // pronto
];
// Site rápido: esqueleto no lugar certo e conteúdo logo depois, sem pular.
const rapido: Fase[] = [
  { em: 120, passo: 1 },
  { em: 650, passo: 5 },
];

function useCarregamento(fases: Fase[], rodada: number) {
  const [passo, setPasso] = useState(0);
  const [ms, setMs] = useState(0);
  useEffect(() => {
    if (rodada === 0) return;
    setPasso(0);
    setMs(0);
    const t0 = performance.now();
    const fim = fases[fases.length - 1].em;
    const timers = fases.map((f) => setTimeout(() => setPasso(f.passo), f.em));
    let raf = 0;
    const tick = () => {
      const d = performance.now() - t0;
      setMs(Math.min(d, fim));
      if (d < fim) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(raf); };
  }, [fases, rodada]);
  return { passo, ms };
}

function PaginaLenta({ passo }: { passo: number }) {
  if (passo === 0) return <div className="h-full bg-white" />;
  if (passo === 1)
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-500" />
      </div>
    );
  return (
    <div className="h-full overflow-hidden bg-white p-4 text-neutral-900" style={{ fontFamily: passo >= 4 ? "var(--font-bricolage)" : "Times New Roman, serif" }}>
      {passo >= 3 && <div className="mb-3 h-20 bg-[linear-gradient(135deg,#7c4a2d,#d9a066)]" />}
      <p className="text-lg font-bold leading-tight">Café especial torrado toda semana</p>
      <p className="mt-1 text-xs text-neutral-500">Grãos selecionados direto do produtor.</p>
      <span className={`mt-3 inline-block px-3 py-1.5 text-xs ${passo >= 4 ? "bg-[#ff4d1c] font-semibold" : "border border-neutral-400"}`}>Pedir agora</span>
      {passo >= 4 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["Espresso", "Coado"].map((c) => <div key={c} className="border border-neutral-200 p-2 text-xs"><b>{c}</b></div>)}
        </div>
      )}
    </div>
  );
}

function PaginaRapida({ passo }: { passo: number }) {
  if (passo === 0) return <div className="h-full bg-white" />;
  const pronto = passo >= 5;
  const osso = "animate-pulse bg-neutral-200";
  return (
    <div className="h-full overflow-hidden bg-white p-4 text-neutral-900" style={{ fontFamily: "var(--font-bricolage)" }}>
      <div className={`mb-3 h-20 transition-colors duration-300 ${pronto ? "bg-[linear-gradient(135deg,#7c4a2d,#d9a066)]" : osso}`} />
      {pronto ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <p className="text-lg font-bold leading-tight">Café especial torrado toda semana</p>
          <p className="mt-1 text-xs text-neutral-500">Grãos selecionados direto do produtor.</p>
          <span className="mt-3 inline-block bg-[#ff4d1c] px-3 py-1.5 text-xs font-semibold">Pedir agora</span>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Espresso", "Coado"].map((c) => <div key={c} className="border border-neutral-200 p-2 text-xs"><b>{c}</b></div>)}
          </div>
        </motion.div>
      ) : (
        <div>
          <div className={`h-5 w-4/5 ${osso}`} />
          <div className={`mt-2 h-3 w-3/5 ${osso}`} />
          <div className={`mt-3 h-7 w-24 ${osso}`} />
          <div className="mt-3 grid grid-cols-2 gap-2"><div className={`h-9 ${osso}`} /><div className={`h-9 ${osso}`} /></div>
        </div>
      )}
    </div>
  );
}

function Painel({ titulo, ms, pronto, destaque, children }: { titulo: string; ms: number; pronto: boolean; destaque?: boolean; children: React.ReactNode }) {
  return (
    <div className={`border ${destaque ? "border-brasa" : "border-linha"}`}>
      <div className="flex items-center justify-between border-b border-linha px-4 py-3">
        <span className={`rotulo ${destaque ? "text-brasa" : "text-cinza"}`}>{titulo}</span>
        <span className="font-mono text-sm tabular-nums text-papel">
          {(ms / 1000).toFixed(1)}s
          <AnimatePresence>{pronto && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="ml-2 text-emerald-400">pronto</motion.span>}</AnimatePresence>
        </span>
      </div>
      <div className="h-72 p-3">{children}</div>
    </div>
  );
}

export default function Velocidade() {
  const [rodada, setRodada] = useState(0);
  const lentoC = useCarregamento(lento, rodada);
  const rapidoC = useCarregamento(rapido, rodada);
  const visto = useRef(false);
  const caixa = useRef<HTMLDivElement>(null);

  // Começa sozinho na primeira vez que a demo aparece na tela.
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visto.current) { visto.current = true; setRodada(1); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={caixa}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-papel/65">A mesma página carregando de dois jeitos. Repare na tela branca, nas partes que pulam de lugar e na fonte que troca no meio do caminho.</p>
        <button onClick={() => setRodada((r) => r + 1)} className="border border-linha px-4 py-2.5 font-mono text-sm transition hover:border-brasa hover:text-brasa">↻ Carregar de novo</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Painel titulo="Site comum" ms={lentoC.ms} pronto={lentoC.passo === 5}><PaginaLenta passo={lentoC.passo} /></Painel>
        <Painel titulo="Feito sob medida" ms={rapidoC.ms} pronto={rapidoC.passo === 5} destaque><PaginaRapida passo={rapidoC.passo} /></Painel>
      </div>
      <p className="rotulo mt-4 text-cinza/70">Simulação com tempos ilustrativos. No seu projeto, imagens otimizadas, fontes pré-carregadas e páginas geradas com antecedência fazem essa diferença.</p>
    </div>
  );
}
