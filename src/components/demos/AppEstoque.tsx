"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AppMoldura from "./AppMoldura";
import { usePersistente } from "./ui";

const tema = { p: "#6366f1", bg: "#f5f6fa", tx: "#111827", mu: "#6b7280", card: "#ffffff" };
type Produto = { id: number; nome: string; sku: string; cat: string; qtd: number; minimo: number; custo: number };
type Mov = { id: number; produto: string; delta: number; quando: string };
type Tela = "produtos" | "movimentos" | "alertas";

const iniciais: Produto[] = [
  { id: 1, nome: "Camiseta básica P", sku: "CAM-P", cat: "Roupas", qtd: 24, minimo: 10, custo: 22 },
  { id: 2, nome: "Camiseta básica M", sku: "CAM-M", cat: "Roupas", qtd: 6, minimo: 10, custo: 22 },
  { id: 3, nome: "Boné aba curva", sku: "BON-01", cat: "Acessórios", qtd: 15, minimo: 5, custo: 18 },
  { id: 4, nome: "Moletom canguru", sku: "MOL-01", cat: "Roupas", qtd: 3, minimo: 6, custo: 65 },
  { id: 5, nome: "Meia cano alto", sku: "MEI-01", cat: "Acessórios", qtd: 48, minimo: 20, custo: 6 },
  { id: 6, nome: "Ecobag", sku: "ECO-01", cat: "Acessórios", qtd: 0, minimo: 8, custo: 9 },
];
const real = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const nivel = (p: Produto) => (p.qtd === 0 ? "esgotado" : p.qtd < p.minimo ? "baixo" : "ok");
const corNivel = { esgotado: "bg-red-100 text-red-700", baixo: "bg-amber-100 text-amber-700", ok: "bg-emerald-100 text-emerald-700" };

export default function AppEstoque() {
  const [tela, setTela] = useState<Tela>("produtos");
  const [produtos, setProdutos] = usePersistente<Produto[]>("demo-estoque", iniciais);
  const [movs, setMovs] = usePersistente<Mov[]>("demo-estoque-mov", []);
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("Todas");
  const [novo, setNovo] = useState({ aberto: false, nome: "", qtd: "", minimo: "5", custo: "" });

  const ajustar = (p: Produto, delta: number) => {
    if (p.qtd + delta < 0) return;
    setProdutos(produtos.map((x) => (x.id === p.id ? { ...x, qtd: x.qtd + delta } : x)));
    setMovs([{ id: Date.now(), produto: p.nome, delta, quando: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }, ...movs].slice(0, 50));
  };
  const alertas = produtos.filter((p) => nivel(p) !== "ok");
  const lista = produtos.filter((p) => (cat === "Todas" || p.cat === cat) && (p.nome + p.sku).toLowerCase().includes(busca.toLowerCase()));
  const valorTotal = produtos.reduce((s, p) => s + p.qtd * p.custo, 0);

  function adicionar(e: React.FormEvent) {
    e.preventDefault();
    if (!novo.nome) return;
    setProdutos([...produtos, { id: Date.now(), nome: novo.nome, sku: novo.nome.slice(0, 3).toUpperCase() + "-" + String(produtos.length + 1).padStart(2, "0"), cat: "Acessórios", qtd: +novo.qtd || 0, minimo: +novo.minimo || 0, custo: +novo.custo.replace(",", ".") || 0 }]);
    setNovo({ aberto: false, nome: "", qtd: "", minimo: "5", custo: "" });
  }

  return (
    <AppMoldura marca="Estoca" tema={tema} ativo={tela} aoNavegar={setTela} menu={[
      { id: "produtos", label: "Produtos", icone: "▣" },
      { id: "movimentos", label: "Movimentações", icone: "⇅" },
      { id: "alertas", label: `Alertas${alertas.length ? ` (${alertas.length})` : ""}`, icone: "⚠" },
    ]}>
      {tela === "produtos" && (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm text-[var(--mu)]">Loja Centro</p><h1 className="text-2xl font-bold md:text-3xl">Estoque</h1></div>
            <button onClick={() => setNovo({ ...novo, aberto: !novo.aberto })} className="rounded-xl bg-[var(--p)] px-4 py-2.5 text-sm font-semibold text-white">+ Produto</button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[["Itens em estoque", produtos.reduce((s, p) => s + p.qtd, 0)], ["Valor em estoque", real(valorTotal)], ["Precisam de reposição", alertas.length]].map(([k, v], i) => (
              <div key={k as string} className={`rounded-2xl p-5 shadow-sm ${i === 2 && alertas.length ? "bg-amber-50" : "bg-white"}`}><p className="text-sm text-[var(--mu)]">{k}</p><p className="mt-1 text-2xl font-bold tabular-nums">{v}</p></div>
            ))}
          </div>
          <AnimatePresence>
            {novo.aberto && (
              <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={adicionar} className="overflow-hidden">
                <div className="mt-4 grid gap-2 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-5">
                  <input autoFocus placeholder="Nome do produto" value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })} className="rounded-lg bg-[var(--bg)] px-3 py-2 text-sm outline-none sm:col-span-2" />
                  <input placeholder="Qtd" inputMode="numeric" value={novo.qtd} onChange={(e) => setNovo({ ...novo, qtd: e.target.value })} className="rounded-lg bg-[var(--bg)] px-3 py-2 text-sm outline-none" />
                  <input placeholder="Custo" inputMode="decimal" value={novo.custo} onChange={(e) => setNovo({ ...novo, custo: e.target.value })} className="rounded-lg bg-[var(--bg)] px-3 py-2 text-sm outline-none" />
                  <button className="rounded-lg bg-[var(--tx)] py-2 text-sm font-semibold text-white">Salvar</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou código" className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm shadow-sm outline-none" />
            <div className="flex gap-1">{["Todas", "Roupas", "Acessórios"].map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-xl px-3 py-2 text-sm ${cat === c ? "bg-[var(--tx)] text-white" : "bg-white text-[var(--mu)] shadow-sm"}`}>{c}</button>)}</div>
          </div>
          <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-xs uppercase text-[var(--mu)]"><tr><th className="p-4">Produto</th><th className="p-4">Situação</th><th className="p-4">Nível</th><th className="p-4 text-right">Quantidade</th></tr></thead>
              <tbody className="divide-y divide-black/5">
                {lista.map((p) => {
                  const n = nivel(p);
                  return (
                    <motion.tr key={p.id} layout>
                      <td className="p-4"><p className="font-semibold">{p.nome}</p><p className="font-mono text-xs text-[var(--mu)]">{p.sku}</p></td>
                      <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${corNivel[n]}`}>{n === "ok" ? "Em dia" : n === "baixo" ? "Baixo" : "Esgotado"}</span></td>
                      <td className="p-4"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-black/5"><motion.div className={`h-full ${n === "ok" ? "bg-emerald-500" : n === "baixo" ? "bg-amber-500" : "bg-red-500"}`} animate={{ width: `${Math.min(100, (p.qtd / (p.minimo * 2 || 1)) * 100)}%` }} /></div></td>
                      <td className="p-4"><div className="flex items-center justify-end gap-2">
                        <button onClick={() => ajustar(p, -1)} className="h-8 w-8 rounded-lg bg-[var(--bg)] hover:bg-red-50">−</button>
                        <motion.span key={p.qtd} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="w-8 text-center font-bold tabular-nums">{p.qtd}</motion.span>
                        <button onClick={() => ajustar(p, 1)} className="h-8 w-8 rounded-lg bg-[var(--bg)] hover:bg-emerald-50">+</button>
                      </div></td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={() => { setProdutos(iniciais); setMovs([]); }} className="mt-4 text-xs text-[var(--mu)] underline">Restaurar dados de exemplo</button>
        </>
      )}
      {tela === "movimentos" && (
        <>
          <h1 className="text-2xl font-bold md:text-3xl">Movimentações</h1>
          {movs.length === 0 ? <p className="mt-8 rounded-2xl bg-white p-8 text-center text-[var(--mu)] shadow-sm">Nenhuma movimentação ainda. Use os botões + e − na tela de produtos.</p> : (
            <ul className="mt-6 divide-y divide-black/5 rounded-2xl bg-white shadow-sm">
              {movs.map((m) => (
                <li key={m.id} className="flex items-center gap-4 p-4 text-sm">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full font-bold ${m.delta > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{m.delta > 0 ? "↑" : "↓"}</span>
                  <span className="flex-1">{m.delta > 0 ? "Entrada" : "Saída"} de <b>{Math.abs(m.delta)}</b> · {m.produto}</span>
                  <span className="text-[var(--mu)]">{m.quando}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {tela === "alertas" && (
        <>
          <h1 className="text-2xl font-bold md:text-3xl">Reposição</h1>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {alertas.length === 0 && <p className="text-[var(--mu)]">Tudo em dia 🎉</p>}
            {alertas.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${corNivel[nivel(p)]}`}>{p.qtd} un.</span>
                <div className="flex-1"><p className="font-semibold">{p.nome}</p><p className="text-sm text-[var(--mu)]">Mínimo: {p.minimo} · sugerido repor {p.minimo * 2 - p.qtd}</p></div>
                <button onClick={() => ajustar(p, p.minimo * 2 - p.qtd)} className="rounded-xl bg-[var(--p)] px-4 py-2 text-sm font-semibold text-white">Repor</button>
              </div>
            ))}
          </div>
        </>
      )}
    </AppMoldura>
  );
}
