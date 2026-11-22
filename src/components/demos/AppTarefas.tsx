"use client";

import { useState } from "react";
import AppMoldura from "./AppMoldura";

const colunas = ["A fazer", "Fazendo", "Feito"] as const;
type Coluna = (typeof colunas)[number];
type Tarefa = { id: number; titulo: string; coluna: Coluna; dono: string };

const iniciais: Tarefa[] = [
  { id: 1, titulo: "Revisar layout da home", coluna: "A fazer", dono: "AL" },
  { id: 2, titulo: "Criar tela de login", coluna: "Fazendo", dono: "BR" },
  { id: 3, titulo: "Configurar banco de dados", coluna: "Feito", dono: "CS" },
  { id: 4, titulo: "Escrever testes do carrinho", coluna: "A fazer", dono: "BR" },
  { id: 5, titulo: "Publicar versão beta", coluna: "A fazer", dono: "AL" },
];

export default function AppTarefas({ marca }: { marca: string }) {
  const [tarefas, setTarefas] = useState(iniciais);
  const [nova, setNova] = useState("");
  const [arrastando, setArrastando] = useState<number | null>(null);

  const mover = (id: number, coluna: Coluna) => setTarefas((ts) => ts.map((t) => (t.id === id ? { ...t, coluna } : t)));
  const passo = (t: Tarefa, dir: 1 | -1) => {
    const i = colunas.indexOf(t.coluna) + dir;
    if (i >= 0 && i < colunas.length) mover(t.id, colunas[i]);
  };

  function adicionar(e: React.FormEvent) {
    e.preventDefault();
    if (!nova.trim()) return;
    setTarefas([...tarefas, { id: Date.now(), titulo: nova.trim(), coluna: "A fazer", dono: "EU" }]);
    setNova("");
  }

  return (
    <AppMoldura marca={marca} menu={["Quadro", "Equipe", "Relatórios"]} ativo="Quadro">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold">Sprint atual</h1>
        <form onSubmit={adicionar} className="flex gap-2">
          <input value={nova} onChange={(e) => setNova(e.target.value)} placeholder="Nova tarefa" className="rounded-lg border border-[var(--card)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--p)]" />
          <button className="rounded-lg bg-[var(--p)] px-4 py-2 text-sm font-semibold text-white">Adicionar</button>
        </form>
      </div>
      <p className="mt-2 text-sm text-[var(--mu)]">Arraste os cartões entre as colunas ou use as setas.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {colunas.map((c) => {
          const itens = tarefas.filter((t) => t.coluna === c);
          return (
            <div
              key={c}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => arrastando !== null && mover(arrastando, c)}
              className="min-h-48 rounded-2xl bg-[var(--card)] p-4"
            >
              <h2 className="mb-3 flex items-center justify-between text-sm font-semibold">
                {c} <span className="rounded-full bg-[var(--bg)] px-2 text-xs text-[var(--mu)]">{itens.length}</span>
              </h2>
              <div className="space-y-2">
                {itens.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={() => setArrastando(t.id)}
                    onDragEnd={() => setArrastando(null)}
                    className={`cursor-grab rounded-xl bg-[var(--bg)] p-3 shadow-sm ${t.coluna === "Feito" ? "opacity-60" : ""}`}
                  >
                    <p className={`text-sm ${t.coluna === "Feito" ? "line-through" : ""}`}>{t.titulo}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--p)] text-[10px] font-bold text-white">{t.dono}</span>
                      <span className="flex gap-1 text-[var(--mu)]">
                        <button onClick={() => passo(t, -1)} aria-label="Voltar coluna" className="px-1 hover:text-[var(--p)]">←</button>
                        <button onClick={() => passo(t, 1)} aria-label="Avançar coluna" className="px-1 hover:text-[var(--p)]">→</button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppMoldura>
  );
}
