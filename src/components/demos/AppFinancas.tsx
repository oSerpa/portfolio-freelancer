"use client";

import { useState } from "react";
import AppMoldura from "./AppMoldura";

type Lancamento = { id: number; descricao: string; valor: number; categoria: string };

const categorias = ["Salário", "Moradia", "Mercado", "Transporte", "Lazer", "Outros"];
const cores: Record<string, string> = { Moradia: "#f97316", Mercado: "#eab308", Transporte: "#38bdf8", Lazer: "#a855f7", Outros: "#71717a" };

const iniciais: Lancamento[] = [
  { id: 1, descricao: "Salário", valor: 4200, categoria: "Salário" },
  { id: 2, descricao: "Aluguel", valor: -1300, categoria: "Moradia" },
  { id: 3, descricao: "Supermercado", valor: -640, categoria: "Mercado" },
  { id: 4, descricao: "Combustível", valor: -280, categoria: "Transporte" },
  { id: 5, descricao: "Cinema", valor: -90, categoria: "Lazer" },
];

const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function AppFinancas({ marca }: { marca: string }) {
  const [lista, setLista] = useState(iniciais);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("Mercado");

  const entradas = lista.filter((l) => l.valor > 0).reduce((s, l) => s + l.valor, 0);
  const saidas = lista.filter((l) => l.valor < 0).reduce((s, l) => s - l.valor, 0);
  const porCategoria = Object.keys(cores)
    .map((c) => ({ c, total: lista.filter((l) => l.categoria === c).reduce((s, l) => s - l.valor, 0) }))
    .filter((x) => x.total > 0);
  const maior = Math.max(1, ...porCategoria.map((x) => x.total));

  function adicionar(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(valor.replace(",", "."));
    if (!descricao || !n) return;
    const sinal = categoria === "Salário" ? 1 : -1;
    setLista([{ id: Date.now(), descricao, valor: sinal * Math.abs(n), categoria }, ...lista]);
    setDescricao("");
    setValor("");
  }

  const campo = "rounded-lg border border-[var(--card)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--p)]";

  return (
    <AppMoldura marca={marca} menu={["Visão geral", "Lançamentos", "Metas"]} ativo="Visão geral">
      <h1 className="font-display text-2xl font-bold">Visão geral do mês</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[["Saldo", entradas - saidas], ["Entradas", entradas], ["Saídas", -saidas]].map(([r, v]) => (
          <div key={r} className="rounded-2xl bg-[var(--card)] p-5">
            <p className="text-sm text-[var(--mu)]">{r}</p>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${Number(v) < 0 ? "text-red-400" : r === "Saldo" ? "text-[var(--p)]" : ""}`}>{real(Number(v))}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-[var(--card)] p-5">
          <h2 className="font-semibold">Gastos por categoria</h2>
          <div className="mt-4 space-y-3">
            {porCategoria.map(({ c, total }) => (
              <div key={c}>
                <div className="flex justify-between text-sm"><span>{c}</span><span className="tabular-nums text-[var(--mu)]">{real(total)}</span></div>
                <div className="mt-1 h-2 rounded-full bg-[var(--bg)]">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${(total / maior) * 100}%`, background: cores[c] }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[var(--card)] p-5">
          <h2 className="font-semibold">Novo lançamento</h2>
          <form onSubmit={adicionar} className="mt-4 grid gap-2 sm:grid-cols-2">
            <input className={`${campo} sm:col-span-2`} placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            <input className={campo} placeholder="Valor" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} />
            <select className={campo} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categorias.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="rounded-lg bg-[var(--p)] py-2 text-sm font-semibold text-black sm:col-span-2">Adicionar</button>
          </form>
          <ul className="mt-5 max-h-56 divide-y divide-[var(--bg)] overflow-y-auto text-sm">
            {lista.map((l) => (
              <li key={l.id} className="flex items-center justify-between py-2">
                <span>{l.descricao} <span className="text-[var(--mu)]">· {l.categoria}</span></span>
                <span className="flex items-center gap-3">
                  <span className={`tabular-nums ${l.valor < 0 ? "text-red-400" : "text-[var(--p)]"}`}>{real(l.valor)}</span>
                  <button onClick={() => setLista(lista.filter((x) => x.id !== l.id))} aria-label="Remover" className="text-[var(--mu)] hover:text-red-400">×</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppMoldura>
  );
}
