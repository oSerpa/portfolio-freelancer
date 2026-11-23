"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AppMoldura from "./AppMoldura";
import { usePersistente } from "./ui";

const tema = { p: "#f472b6", bg: "#140f1f", tx: "#f5f0ff", mu: "#9b8fb5", card: "#221a33" };
type Habito = { id: number; nome: string; e: string; feitos: string[] };
type Tela = "hoje" | "semana" | "stats";
const dataIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const ultimos = (n: number) => Array.from({ length: n }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (n - 1 - i)); return d; });
const hoje = () => dataIso(new Date());

function exemplo(): Habito[] {
  const dias = ultimos(14).map(dataIso);
  const pega = (padrao: number[]) => dias.filter((_, i) => padrao.includes(i % 7) && i < 13);
  return [
    { id: 1, nome: "Beber 2L de água", e: "💧", feitos: pega([0, 1, 2, 3, 4, 5]) },
    { id: 2, nome: "Ler 20 páginas", e: "📚", feitos: pega([0, 2, 4, 6]) },
    { id: 3, nome: "Treinar", e: "🏋️", feitos: pega([1, 3, 5]) },
    { id: 4, nome: "Meditar 10 min", e: "🧘", feitos: pega([0, 1, 3, 4, 6]) },
  ];
}
function sequencia(h: Habito) {
  let n = 0;
  const d = new Date();
  if (!h.feitos.includes(dataIso(d))) d.setDate(d.getDate() - 1);
  while (h.feitos.includes(dataIso(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export default function AppHabitos() {
  const [tela, setTela] = useState<Tela>("hoje");
  const [habitos, setHabitos] = usePersistente<Habito[]>("demo-habitos", exemplo());
  const [novo, setNovo] = useState("");
  const [festa, setFesta] = useState<number | null>(null);
  const h0 = hoje();
  const feitosHoje = habitos.filter((h) => h.feitos.includes(h0)).length;
  const pct = habitos.length ? feitosHoje / habitos.length : 0;

  const alternar = (id: number, dia = h0) => setHabitos(habitos.map((h) => {
    if (h.id !== id) return h;
    const tem = h.feitos.includes(dia);
    if (!tem && dia === h0) { setFesta(id); setTimeout(() => setFesta(null), 700); }
    return { ...h, feitos: tem ? h.feitos.filter((x) => x !== dia) : [...h.feitos, dia] };
  }));

  const r = 52, circ = 2 * Math.PI * r;
  return (
    <AppMoldura marca="Ritmo" tema={tema} ativo={tela} aoNavegar={setTela} menu={[
      { id: "hoje", label: "Hoje", icone: "☀" },
      { id: "semana", label: "Semana", icone: "▦" },
      { id: "stats", label: "Estatísticas", icone: "↗" },
    ]}>
      {tela === "hoje" && (
        <div className="mx-auto max-w-xl">
          <p className="text-sm capitalize text-[var(--mu)]">{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</p>
          <h1 className="text-2xl font-bold md:text-3xl">Seu dia</h1>
          <div className="mt-6 flex items-center gap-6 rounded-3xl bg-[var(--card)] p-6">
            <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--bg)" strokeWidth="12" />
              <motion.circle cx="60" cy="60" r={r} fill="none" stroke="var(--p)" strokeWidth="12" strokeLinecap="round" strokeDasharray={circ} animate={{ strokeDashoffset: circ * (1 - pct) }} transition={{ type: "spring", stiffness: 60 }} />
            </svg>
            <div>
              <p className="text-4xl font-bold">{feitosHoje}/{habitos.length}</p>
              <p className="text-[var(--mu)]">{pct === 1 ? "Dia completo! 🎉" : pct >= 0.5 ? "Falta pouco!" : "Bora começar?"}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            <AnimatePresence>
              {habitos.map((h) => {
                const feito = h.feitos.includes(h0);
                return (
                  <motion.li key={h.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} className="relative">
                    <button onClick={() => alternar(h.id)} className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${feito ? "bg-[var(--p)]/15" : "bg-[var(--card)]"}`}>
                      <span className="text-2xl">{h.e}</span>
                      <span className={`flex-1 font-medium ${feito ? "text-[var(--mu)] line-through" : ""}`}>{h.nome}</span>
                      <span className="text-xs text-[var(--mu)]">🔥 {sequencia(h)}</span>
                      <motion.span animate={{ scale: feito ? [1, 1.3, 1] : 1 }} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${feito ? "border-[var(--p)] bg-[var(--p)] text-[var(--bg)]" : "border-[var(--mu)]/40"}`}>{feito ? "✓" : ""}</motion.span>
                    </button>
                    <AnimatePresence>
                      {festa === h.id && Array.from({ length: 10 }, (_, k) => (
                        <motion.span key={k} initial={{ opacity: 1, x: 0, y: 0 }} animate={{ opacity: 0, x: Math.cos(k * 0.63) * 60, y: Math.sin(k * 0.63) * 40 }} transition={{ duration: 0.7 }} className="pointer-events-none absolute right-6 top-1/2 h-2 w-2 rounded-full" style={{ background: ["#f472b6", "#a78bfa", "#fde047"][k % 3] }} />
                      ))}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <form onSubmit={(e) => { e.preventDefault(); if (novo.trim()) { setHabitos([...habitos, { id: Date.now(), nome: novo.trim(), e: "✨", feitos: [] }]); setNovo(""); } }} className="mt-4 flex gap-2">
            <input value={novo} onChange={(e) => setNovo(e.target.value)} placeholder="Novo hábito" className="flex-1 rounded-2xl bg-[var(--card)] px-4 py-3 text-sm outline-none" />
            <button className="rounded-2xl bg-[var(--p)] px-5 font-semibold text-[var(--bg)]">Criar</button>
          </form>
        </div>
      )}
      {tela === "semana" && (
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Últimos 7 dias</h1>
          <p className="text-sm text-[var(--mu)]">Toque nos quadrados para marcar dias anteriores.</p>
          <div className="mt-6 overflow-x-auto rounded-3xl bg-[var(--card)] p-5">
            <table className="w-full min-w-[480px]">
              <thead><tr><th />{ultimos(7).map((d) => <th key={dataIso(d)} className="pb-3 text-center text-xs font-normal capitalize text-[var(--mu)]">{d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}<br /><b className="text-base text-[var(--tx)]">{d.getDate()}</b></th>)}</tr></thead>
              <tbody>
                {habitos.map((h) => (
                  <tr key={h.id}>
                    <td className="py-1.5 pr-3 text-sm">{h.e} {h.nome}</td>
                    {ultimos(7).map((d) => { const k = dataIso(d); const on = h.feitos.includes(k); return (
                      <td key={k} className="p-1 text-center"><motion.button whileTap={{ scale: 0.85 }} onClick={() => alternar(h.id, k)} className={`h-9 w-9 rounded-xl transition ${on ? "bg-[var(--p)]" : "bg-[var(--bg)] hover:bg-[var(--mu)]/20"}`} aria-label={`${h.nome} ${k}`} /></td>
                    ); })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tela === "stats" && (
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Estatísticas</h1>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {habitos.map((h) => {
              const taxa = Math.round((ultimos(14).filter((d) => h.feitos.includes(dataIso(d))).length / 14) * 100);
              return (
                <div key={h.id} className="rounded-3xl bg-[var(--card)] p-5">
                  <div className="flex items-center justify-between"><span className="font-semibold">{h.e} {h.nome}</span><span className="text-sm text-[var(--mu)]">🔥 {sequencia(h)} dias</span></div>
                  <div className="mt-4 flex items-end gap-1">
                    {ultimos(14).map((d) => <motion.div key={dataIso(d)} initial={{ height: 0 }} animate={{ height: h.feitos.includes(dataIso(d)) ? 36 : 8 }} className={`flex-1 rounded-sm ${h.feitos.includes(dataIso(d)) ? "bg-[var(--p)]" : "bg-[var(--bg)]"}`} />)}
                  </div>
                  <p className="mt-3 text-sm text-[var(--mu)]">{taxa}% dos últimos 14 dias</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => setHabitos(exemplo())} className="mt-6 text-xs text-[var(--mu)] underline">Restaurar dados de exemplo</button>
        </div>
      )}
    </AppMoldura>
  );
}
