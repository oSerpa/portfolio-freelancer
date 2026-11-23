"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AppMoldura from "./AppMoldura";
import { usePersistente } from "./ui";

const tema = { p: "#f97316", bg: "#f8f7f4", tx: "#1c1917", mu: "#78716c", card: "#ffffff" };
const colunas = ["A fazer", "Fazendo", "Revisão", "Feito"] as const;
type Coluna = (typeof colunas)[number];
const prioridades = { Alta: "bg-red-100 text-red-700", Média: "bg-amber-100 text-amber-700", Baixa: "bg-emerald-100 text-emerald-700" } as const;
type Prioridade = keyof typeof prioridades;
const pessoas = [
  { id: "AL", nome: "Ana Lima", cor: "bg-violet-500" },
  { id: "BR", nome: "Bruno Reis", cor: "bg-sky-500" },
  { id: "CS", nome: "Carla Souza", cor: "bg-rose-500" },
];
type Tarefa = { id: number; titulo: string; coluna: Coluna; dono: string; prioridade: Prioridade; prazo: number };
type Tela = "quadro" | "equipe" | "relatorios";

const iniciais: Tarefa[] = [
  { id: 1, titulo: "Revisar layout da home", coluna: "A fazer", dono: "AL", prioridade: "Média", prazo: 3 },
  { id: 2, titulo: "Criar tela de login", coluna: "Fazendo", dono: "BR", prioridade: "Alta", prazo: 1 },
  { id: 3, titulo: "Configurar banco de dados", coluna: "Feito", dono: "CS", prioridade: "Alta", prazo: -2 },
  { id: 4, titulo: "Escrever testes do carrinho", coluna: "A fazer", dono: "BR", prioridade: "Baixa", prazo: 6 },
  { id: 5, titulo: "Publicar versão beta", coluna: "A fazer", dono: "AL", prioridade: "Alta", prazo: 5 },
  { id: 6, titulo: "Ajustar textos do onboarding", coluna: "Revisão", dono: "CS", prioridade: "Média", prazo: 2 },
  { id: 7, titulo: "Integrar pagamento por Pix", coluna: "Fazendo", dono: "CS", prioridade: "Alta", prazo: 4 },
];
const prazoTexto = (d: number) => (d < 0 ? "atrasada" : d === 0 ? "hoje" : d === 1 ? "amanhã" : `em ${d} dias`);

export default function AppTarefas() {
  const [tela, setTela] = useState<Tela>("quadro");
  const [tarefas, setTarefas] = usePersistente<Tarefa[]>("demo-tarefas", iniciais);
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [sobre, setSobre] = useState<Coluna | null>(null);
  const [filtro, setFiltro] = useState<string | null>(null);
  const [nova, setNova] = useState({ titulo: "", dono: "AL", prioridade: "Média" as Prioridade, aberto: false });

  const mover = (id: number, coluna: Coluna) => setTarefas((ts) => ts.map((t) => (t.id === id ? { ...t, coluna } : t)));
  const passo = (t: Tarefa, dir: 1 | -1) => {
    const i = colunas.indexOf(t.coluna) + dir;
    if (i >= 0 && i < colunas.length) mover(t.id, colunas[i]);
  };
  function adicionar(e: React.FormEvent) {
    e.preventDefault();
    if (!nova.titulo.trim()) return;
    setTarefas([...tarefas, { id: Date.now(), titulo: nova.titulo.trim(), coluna: "A fazer", dono: nova.dono, prioridade: nova.prioridade, prazo: 7 }]);
    setNova({ ...nova, titulo: "", aberto: false });
  }

  const feitas = tarefas.filter((t) => t.coluna === "Feito").length;
  const pct = Math.round((feitas / (tarefas.length || 1)) * 100);
  const visiveis = tarefas.filter((t) => !filtro || t.dono === filtro);

  return (
    <AppMoldura marca="Quadro" tema={tema} ativo={tela} aoNavegar={setTela} menu={[
      { id: "quadro", label: "Quadro", icone: "▦" },
      { id: "equipe", label: "Equipe", icone: "◍" },
      { id: "relatorios", label: "Relatórios", icone: "▤" },
    ]}>
      {tela === "quadro" && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--mu)]">Projeto App Loja · Sprint 4</p>
              <h1 className="text-2xl font-bold md:text-3xl">Quadro da sprint</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {pessoas.map((p) => (
                  <button key={p.id} onClick={() => setFiltro(filtro === p.id ? null : p.id)} title={p.nome} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold text-white transition ${p.cor} ${filtro === p.id ? "z-10 scale-110 border-[var(--tx)]" : filtro ? "border-white opacity-40" : "border-white"}`}>{p.id}</button>
                ))}
              </div>
              <button onClick={() => setNova({ ...nova, aberto: !nova.aberto })} className="rounded-xl bg-[var(--p)] px-4 py-2.5 text-sm font-semibold text-white">+ Nova tarefa</button>
            </div>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/5"><motion.div className="h-full bg-[var(--p)]" animate={{ width: `${pct}%` }} /></div>
          <p className="mt-1 text-xs text-[var(--mu)]">{pct}% concluído · arraste os cartões ou use as setas</p>

          <AnimatePresence>
            {nova.aberto && (
              <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={adicionar} className="overflow-hidden">
                <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
                  <input autoFocus value={nova.titulo} onChange={(e) => setNova({ ...nova, titulo: e.target.value })} placeholder="O que precisa ser feito?" className="flex-1 rounded-lg bg-[var(--bg)] px-3 py-2 text-sm outline-none" />
                  <select value={nova.dono} onChange={(e) => setNova({ ...nova, dono: e.target.value })} className="rounded-lg bg-[var(--bg)] px-3 py-2 text-sm">{pessoas.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}</select>
                  <select value={nova.prioridade} onChange={(e) => setNova({ ...nova, prioridade: e.target.value as Prioridade })} className="rounded-lg bg-[var(--bg)] px-3 py-2 text-sm">{Object.keys(prioridades).map((p) => <option key={p}>{p}</option>)}</select>
                  <button className="rounded-lg bg-[var(--tx)] px-4 py-2 text-sm font-semibold text-white">Criar</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {colunas.map((c) => {
              const itens = visiveis.filter((t) => t.coluna === c);
              return (
                <div
                  key={c}
                  onDragOver={(e) => { e.preventDefault(); setSobre(c); }}
                  onDragLeave={() => setSobre(null)}
                  onDrop={() => { if (arrastando !== null) mover(arrastando, c); setSobre(null); }}
                  className={`min-h-52 rounded-2xl p-3 transition-colors ${sobre === c ? "bg-[var(--p)]/10 ring-2 ring-[var(--p)]/40" : "bg-black/[0.035]"}`}
                >
                  <h2 className="mb-3 flex items-center justify-between px-1 text-sm font-semibold">
                    {c}<span className="rounded-full bg-white px-2 text-xs text-[var(--mu)]">{itens.length}</span>
                  </h2>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {itens.map((t) => {
                        const dono = pessoas.find((p) => p.id === t.dono);
                        return (
                          <motion.div
                            key={t.id}
                            layout
                            layoutId={`t-${t.id}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            draggable
                            onDragStart={() => setArrastando(t.id)}
                            onDragEnd={() => setArrastando(null)}
                            className={`group cursor-grab rounded-xl bg-white p-3 shadow-sm active:cursor-grabbing ${t.coluna === "Feito" ? "opacity-60" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${prioridades[t.prioridade]}`}>{t.prioridade}</span>
                              <button onClick={() => setTarefas(tarefas.filter((x) => x.id !== t.id))} aria-label="Excluir" className="text-xs text-[var(--mu)] opacity-0 transition hover:text-red-500 group-hover:opacity-100">✕</button>
                            </div>
                            <p className={`mt-2 text-sm font-medium ${t.coluna === "Feito" ? "line-through" : ""}`}>{t.titulo}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${dono?.cor}`}>{t.dono}</span>
                                <span className={`text-xs ${t.prazo < 0 && t.coluna !== "Feito" ? "text-red-600" : "text-[var(--mu)]"}`}>{t.coluna === "Feito" ? "concluída" : prazoTexto(t.prazo)}</span>
                              </div>
                              <span className="flex text-[var(--mu)]">
                                <button onClick={() => passo(t, -1)} aria-label="Voltar coluna" className="px-1 hover:text-[var(--p)]">←</button>
                                <button onClick={() => passo(t, 1)} aria-label="Avançar coluna" className="px-1 hover:text-[var(--p)]">→</button>
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => setTarefas(iniciais)} className="mt-6 text-xs text-[var(--mu)] underline">Restaurar quadro de exemplo</button>
        </>
      )}

      {tela === "equipe" && (
        <>
          <h1 className="text-2xl font-bold md:text-3xl">Equipe</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pessoas.map((p) => {
              const minhas = tarefas.filter((t) => t.dono === p.id);
              const abertas = minhas.filter((t) => t.coluna !== "Feito");
              return (
                <div key={p.id} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white ${p.cor}`}>{p.id}</span>
                    <div><p className="font-semibold">{p.nome}</p><p className="text-sm text-[var(--mu)]">{abertas.length} em aberto</p></div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {abertas.slice(0, 4).map((t) => <li key={t.id} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${t.prioridade === "Alta" ? "bg-red-500" : t.prioridade === "Média" ? "bg-amber-500" : "bg-emerald-500"}`} />{t.titulo}</li>)}
                    {abertas.length === 0 && <li className="text-[var(--mu)]">Tudo em dia 🎉</li>}
                  </ul>
                  <button onClick={() => { setFiltro(p.id); setTela("quadro"); }} className="mt-4 text-sm font-semibold text-[var(--p)]">Ver no quadro →</button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tela === "relatorios" && (
        <>
          <h1 className="text-2xl font-bold md:text-3xl">Relatórios</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[["Concluídas", `${feitas}/${tarefas.length}`], ["Prioridade alta abertas", tarefas.filter((t) => t.prioridade === "Alta" && t.coluna !== "Feito").length], ["Atrasadas", tarefas.filter((t) => t.prazo < 0 && t.coluna !== "Feito").length]].map(([k, v]) => (
              <div key={k as string} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-3xl font-bold">{v}</p><p className="text-sm text-[var(--mu)]">{k}</p></div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Tarefas por etapa</h2>
            <div className="mt-6 flex h-48 items-end gap-4">
              {colunas.map((c) => {
                const n = tarefas.filter((t) => t.coluna === c).length;
                const max = Math.max(1, ...colunas.map((x) => tarefas.filter((t) => t.coluna === x).length));
                return (
                  <div key={c} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-sm font-semibold">{n}</span>
                    <motion.div className="w-full rounded-t-lg bg-[var(--p)]" initial={{ height: 0 }} animate={{ height: `${(n / max) * 140}px` }} transition={{ duration: 0.6 }} style={{ opacity: 0.4 + (colunas.indexOf(c) / colunas.length) * 0.6 }} />
                    <span className="text-xs text-[var(--mu)]">{c}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </AppMoldura>
  );
}
