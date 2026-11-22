"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Painel que "digita" um componente e mostra o resultado ao lado.
type Token = [string, string]; // [classe de cor, texto]
const k = "text-[#ff7b54]", s = "text-[#b5d99c]", t = "text-[#8ab4f8]", p = "text-papel/85", c = "text-cinza";

const exemplos: { arquivo: string; tokens: Token[] }[] = [
  {
    arquivo: "BotaoCompra.tsx",
    tokens: [
      [k, "export function "], [t, "BotaoCompra"], [p, "() {\n  "],
      [k, "return "], [p, "(\n    <"], [t, "button"], [p, " className="], [s, '"pulsar"'], [p, ">\n      "],
      [p, "Quero agora\n    </"], [t, "button"], [p, ">\n  );\n}"],
    ],
  },
  {
    arquivo: "Preco.tsx",
    tokens: [
      [c, "// cartão de plano com destaque\n"],
      [k, "const "], [p, "plano = { nome: "], [s, '"Pro"'], [p, ", valor: "], [s, "97"], [p, " };\n\n"],
      [k, "return "], [p, "<"], [t, "Cartao"], [p, " destaque>\n  {plano.nome} R$ {plano.valor}\n</"], [t, "Cartao"], [p, ">"],
    ],
  },
  {
    arquivo: "Agenda.tsx",
    tokens: [
      [k, "const "], [p, "[hora, setHora] = "], [t, "useState"], [p, "("], [s, '"14:00"'], [p, ");\n\n"],
      [k, "return "], [p, "horarios."], [t, "map"], [p, "(h =>\n  <"], [t, "Chip"], [p, " ativo={h === hora}\n    onClick={() => "], [t, "setHora"], [p, "(h)} />\n)"],
    ],
  },
];

function Resultado({ i }: { i: number }) {
  const [hora, setHora] = useState("14:00");
  if (i === 0)
    return (
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative bg-brasa px-6 py-3 font-semibold text-tinta">
        <span className="absolute inset-0 animate-ping bg-brasa/40" />
        <span className="relative">Quero agora</span>
      </motion.button>
    );
  if (i === 1)
    return (
      <div className="w-44 border border-brasa bg-tinta p-4">
        <div className="rotulo text-brasa">Mais escolhido</div>
        <div className="font-display mt-1 text-xl">Pro</div>
        <div className="text-2xl font-bold">R$ 97<span className="text-sm font-normal text-cinza">/mês</span></div>
        <div className="mt-3 bg-papel py-2 text-center text-sm font-semibold text-tinta">Assinar</div>
      </div>
    );
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {["09:00", "11:30", "14:00", "16:30"].map((h) => (
        <button key={h} onClick={() => setHora(h)} className={`border px-3 py-1.5 font-mono text-xs transition ${h === hora ? "border-brasa bg-brasa text-tinta" : "border-linha text-cinza hover:text-papel"}`}>{h}</button>
      ))}
    </div>
  );
}

export default function CodigoAoVivo() {
  const [atual, setAtual] = useState(0);
  const [chars, setChars] = useState(0);
  const total = exemplos[atual].tokens.reduce((n, [, txt]) => n + txt.length, 0);
  const pronto = chars >= total;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setChars(total); return; }
    if (!pronto) {
      const id = setTimeout(() => setChars((n) => n + 2), 22);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => { setAtual((a) => (a + 1) % exemplos.length); setChars(0); }, 4200);
    return () => clearTimeout(id);
  }, [chars, pronto, total]);

  let resto = chars;
  return (
    <div className="border border-linha bg-tinta-2/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-linha px-4 py-2.5">
        <div className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-linha" />)}</div>
        <div className="flex gap-4">
          {exemplos.map((e, i) => (
            <button key={e.arquivo} onClick={() => { setAtual(i); setChars(0); }} className={`rotulo normal-case transition ${i === atual ? "text-papel" : "text-cinza/60 hover:text-cinza"}`}>{e.arquivo}</button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-[1.2fr_1fr]">
        <pre className="min-h-56 overflow-hidden whitespace-pre-wrap border-b border-linha p-5 font-mono text-[12.5px] leading-relaxed sm:border-b-0 sm:border-r">
          {exemplos[atual].tokens.map(([cls, txt], i) => {
            if (resto <= 0) return null;
            const parte = txt.slice(0, resto);
            resto -= txt.length;
            return <span key={i} className={cls}>{parte}</span>;
          })}
          {!pronto && <span className="animate-pisca text-brasa">▍</span>}
        </pre>
        <div className="flex min-h-64 flex-col bg-[radial-gradient(circle_at_center,rgba(255,77,28,.08),transparent_70%)] p-4">
          <span className="rotulo text-cinza/60">Resultado</span>
          <div className="flex flex-1 items-center justify-center py-4">
          <AnimatePresence mode="wait">
            {pronto ? (
              <motion.div key={atual} initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
                <Resultado i={atual} />
              </motion.div>
            ) : (
              <motion.span key="compilando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rotulo text-cinza/60">compilando...</motion.span>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
