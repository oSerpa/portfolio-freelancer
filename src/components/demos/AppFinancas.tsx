"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import AppMoldura from "./AppMoldura";
import { usePersistente } from "./ui";

const tema = { p: "#a3e635", bg: "#0e1110", tx: "#f1f5ef", mu: "#8b968c", card: "#181d1a" };
const cores: Record<string, string> = { Moradia: "#f97316", Mercado: "#eab308", Transporte: "#38bdf8", Lazer: "#a855f7", Saúde: "#f43f5e", Outros: "#71717a" };
const categoriasSaida = Object.keys(cores);

type Lanc = { id: number; descricao: string; valor: number; categoria: string; dia: number };
type Meta = { id: number; nome: string; alvo: number; guardado: number };
type Tela = "geral" | "lancamentos" | "metas";

const iniciais: Lanc[] = [
  { id: 1, descricao: "Salário", valor: 4200, categoria: "Entrada", dia: 5 },
  { id: 2, descricao: "Freela de design", valor: 900, categoria: "Entrada", dia: 12 },
  { id: 3, descricao: "Aluguel", valor: -1300, categoria: "Moradia", dia: 6 },
  { id: 4, descricao: "Supermercado", valor: -640, categoria: "Mercado", dia: 8 },
  { id: 5, descricao: "Combustível", valor: -280, categoria: "Transporte", dia: 10 },
  { id: 6, descricao: "Cinema", valor: -90, categoria: "Lazer", dia: 14 },
  { id: 7, descricao: "Farmácia", valor: -120, categoria: "Saúde", dia: 15 },
  { id: 8, descricao: "Feira", valor: -160, categoria: "Mercado", dia: 18 },
];
const metasIniciais: Meta[] = [
  { id: 1, nome: "Reserva de emergência", alvo: 10000, guardado: 6200 },
  { id: 2, nome: "Viagem de férias", alvo: 5000, guardado: 1800 },
  { id: 3, nome: "Notebook novo", alvo: 6000, guardado: 4500 },
];
const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Rosca({ fatias }: { fatias: { c: string; total: number }[] }) {
  const soma = fatias.reduce((s, f) => s + f.total, 0) || 1;
  const r = 42, circ = 2 * Math.PI * r;
  let acumulado = 0;
  return (
    <svg viewBox="0 0 100 100" className="h-44 w-44 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--bg)" strokeWidth="12" />
      {fatias.map((f) => {
        const parte = (f.total / soma) * circ;
        const el = <motion.circle key={f.c} cx="50" cy="50" r={r} fill="none" stroke={cores[f.c]} strokeWidth="12" strokeDasharray={`${parte} ${circ}`} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: -acumulado }} transition={{ duration: 0.8 }} />;
        acumulado += parte;
        return el;
      })}
    </svg>
  );
}

function NumeroAnimado({ valor, className }: { valor: number; className?: string }) {
  return <motion.span key={valor} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={className}>{real(valor)}</motion.span>;
}

export default function AppFinancas() {
  const [tela, setTela] = useState<Tela>("geral");
  const [lista, setLista] = usePersistente<Lanc[]>("demo-financas", iniciais);
  const [metas, setMetas] = usePersistente<Meta[]>("demo-financas-metas", metasIniciais);
  const [form, setForm] = useState({ descricao: "", valor: "", categoria: "Mercado", tipo: "saida" as "saida" | "entrada" });
  const [filtro, setFiltro] = useState("Todas");
  const [busca, setBusca] = useState("");

  const entradas = lista.filter((l) => l.valor > 0).reduce((s, l) => s + l.valor, 0);
  const saidas = lista.filter((l) => l.valor < 0).reduce((s, l) => s - l.valor, 0);
  const porCategoria = useMemo(() => categoriasSaida.map((c) => ({ c, total: lista.filter((l) => l.categoria === c).reduce((s, l) => s - l.valor, 0) })).filter((x) => x.total > 0).sort((a, b) => b.total - a.total), [lista]);
  const filtrada = lista.filter((l) => (filtro === "Todas" || l.categoria === filtro) && l.descricao.toLowerCase().includes(busca.toLowerCase())).sort((a, b) => b.dia - a.dia);

  function adicionar(e: React.FormEvent) {
    e.preventDefault();
    const n = Math.abs(Number(form.valor.replace(",", ".")));
    if (!form.descricao || !n) return;
    const entrada = form.tipo === "entrada";
    setLista([{ id: Date.now(), descricao: form.descricao, valor: entrada ? n : -n, categoria: entrada ? "Entrada" : form.categoria, dia: new Date().getDate() }, ...lista]);
    setForm({ ...form, descricao: "", valor: "" });
  }

  const campo = "w-full rounded-xl border border-transparent bg-[var(--bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--p)]";
  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const formulario = (
    <form onSubmit={adicionar} className="grid gap-2 rounded-2xl bg-[var(--card)] p-5 sm:grid-cols-2">
      <div className="flex gap-1 rounded-xl bg-[var(--bg)] p-1 sm:col-span-2">
        {(["saida", "entrada"] as const).map((t) => (
          <button type="button" key={t} onClick={() => setForm({ ...form, tipo: t })} className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${form.tipo === t ? (t === "saida" ? "bg-red-400/20 text-red-300" : "bg-[var(--p)]/20 text-[var(--p)]") : "text-[var(--mu)]"}`}>{t === "saida" ? "Despesa" : "Receita"}</button>
        ))}
      </div>
      <input className={`${campo} sm:col-span-2`} placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
      <input className={campo} placeholder="Valor" inputMode="decimal" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
      <select className={campo} value={form.categoria} disabled={form.tipo === "entrada"} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
        {categoriasSaida.map((c) => <option key={c}>{c}</option>)}
      </select>
      <button className="rounded-xl bg-[var(--p)] py-2.5 text-sm font-semibold text-[var(--bg)] sm:col-span-2">Adicionar</button>
    </form>
  );

  return (
    <AppMoldura marca="Bolso" tema={tema} ativo={tela} aoNavegar={setTela} menu={[
      { id: "geral", label: "Visão geral", icone: "◐" },
      { id: "lancamentos", label: "Lançamentos", icone: "≡" },
      { id: "metas", label: "Metas", icone: "◎" },
    ]}>
      {tela === "geral" && (
        <>
          <p className="text-sm capitalize text-[var(--mu)]">{mes}</p>
          <h1 className="text-2xl font-bold md:text-3xl">Olá! Aqui está seu mês.</h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[var(--p)] p-5 text-[var(--bg)]">
              <p className="text-sm opacity-70">Saldo</p>
              <NumeroAnimado valor={entradas - saidas} className="mt-1 block text-3xl font-bold tabular-nums" />
            </div>
            <div className="rounded-2xl bg-[var(--card)] p-5"><p className="text-sm text-[var(--mu)]">Receitas</p><NumeroAnimado valor={entradas} className="mt-1 block text-2xl font-bold tabular-nums" /></div>
            <div className="rounded-2xl bg-[var(--card)] p-5"><p className="text-sm text-[var(--mu)]">Despesas</p><NumeroAnimado valor={-saidas} className="mt-1 block text-2xl font-bold tabular-nums text-red-300" /></div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl bg-[var(--card)] p-5">
              <h2 className="font-semibold">Para onde foi o dinheiro</h2>
              <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
                <div className="relative">
                  <Rosca fatias={porCategoria} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-xs text-[var(--mu)]">gasto</span><span className="font-bold">{real(saidas)}</span></div>
                </div>
                <ul className="w-full flex-1 space-y-2.5 text-sm">
                  {porCategoria.map(({ c, total }) => (
                    <li key={c} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: cores[c] }} />
                      <span className="flex-1">{c}</span>
                      <span className="tabular-nums text-[var(--mu)]">{Math.round((total / (saidas || 1)) * 100)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {formulario}
          </div>
        </>
      )}

      {tela === "lancamentos" && (
        <>
          <h1 className="text-2xl font-bold md:text-3xl">Lançamentos</h1>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar..." className="flex-1 rounded-xl bg-[var(--card)] px-4 py-2.5 text-sm outline-none" />
            <div className="flex gap-1 overflow-x-auto">
              {["Todas", "Entrada", ...categoriasSaida].map((c) => (
                <button key={c} onClick={() => setFiltro(c)} className={`shrink-0 rounded-full px-3 py-2 text-xs transition ${filtro === c ? "bg-[var(--p)] text-[var(--bg)]" : "bg-[var(--card)] text-[var(--mu)]"}`}>{c}</button>
              ))}
            </div>
          </div>
          <ul className="mt-4 divide-y divide-[var(--bg)] overflow-hidden rounded-2xl bg-[var(--card)]">
            <AnimatePresence initial={false}>
              {filtrada.map((l) => (
                <motion.li key={l.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold" style={{ background: (cores[l.categoria] ?? tema.p) + "33", color: cores[l.categoria] ?? tema.p }}>{l.categoria[0]}</span>
                  <div className="flex-1"><p className="text-sm font-medium">{l.descricao}</p><p className="text-xs text-[var(--mu)]">{l.categoria} · dia {l.dia}</p></div>
                  <span className={`text-sm font-semibold tabular-nums ${l.valor < 0 ? "text-red-300" : "text-[var(--p)]"}`}>{real(l.valor)}</span>
                  <button onClick={() => setLista(lista.filter((x) => x.id !== l.id))} aria-label="Remover" className="text-[var(--mu)] hover:text-red-400">×</button>
                </motion.li>
              ))}
            </AnimatePresence>
            {filtrada.length === 0 && <li className="p-6 text-center text-sm text-[var(--mu)]">Nada encontrado.</li>}
          </ul>
          <div className="mt-4">{formulario}</div>
          <button onClick={() => { setLista(iniciais); setMetas(metasIniciais); }} className="mt-4 text-xs text-[var(--mu)] underline">Restaurar dados de exemplo</button>
        </>
      )}

      {tela === "metas" && (
        <>
          <h1 className="text-2xl font-bold md:text-3xl">Metas</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {metas.map((m) => {
              const pct = Math.min(100, Math.round((m.guardado / m.alvo) * 100));
              return (
                <div key={m.id} className="rounded-2xl bg-[var(--card)] p-5">
                  <div className="flex items-start justify-between"><p className="font-semibold">{m.nome}</p><span className="text-sm font-bold text-[var(--p)]">{pct}%</span></div>
                  <p className="mt-3 text-2xl font-bold tabular-nums">{real(m.guardado)}</p>
                  <p className="text-sm text-[var(--mu)]">de {real(m.alvo)}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg)]"><motion.div className="h-full rounded-full bg-[var(--p)]" initial={false} animate={{ width: `${pct}%` }} /></div>
                  <div className="mt-4 flex gap-2">
                    {[50, 200].map((v) => (
                      <button key={v} onClick={() => setMetas(metas.map((x) => (x.id === m.id ? { ...x, guardado: Math.min(x.alvo, x.guardado + v) } : x)))} className="flex-1 rounded-lg bg-[var(--bg)] py-2 text-xs hover:text-[var(--p)]">+ R$ {v}</button>
                    ))}
                  </div>
                  {pct === 100 && <p className="mt-3 text-center text-sm text-[var(--p)]">Meta batida! 🎉</p>}
                </div>
              );
            })}
          </div>
        </>
      )}
    </AppMoldura>
  );
}
