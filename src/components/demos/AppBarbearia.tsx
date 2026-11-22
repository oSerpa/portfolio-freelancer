"use client";

import { useState } from "react";
import AppMoldura from "./AppMoldura";

const servicos = [
  { nome: "Corte", preco: 40, min: 30 },
  { nome: "Barba", preco: 30, min: 20 },
  { nome: "Corte + barba", preco: 60, min: 50 },
];
const barbeiros = ["Rafael", "Diego", "Tiago"];
const horarios = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
const ocupados = new Set(["09:30", "11:00", "15:00"]);

function proximosDias() {
  const fmt = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit" });
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return fmt.format(d);
  });
}

export default function AppBarbearia({ marca }: { marca: string }) {
  const dias = proximosDias();
  const [servico, setServico] = useState(0);
  const [barbeiro, setBarbeiro] = useState(0);
  const [dia, setDia] = useState(0);
  const [hora, setHora] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  const opcao = (sel: boolean) => `rounded-xl border px-4 py-3 text-sm transition ${sel ? "border-[var(--p)] bg-[var(--p)]/15" : "border-[var(--card)] hover:border-[var(--mu)]"}`;

  if (confirmado) {
    return (
      <AppMoldura marca={marca} menu={["Agendar", "Meus horários", "Perfil"]} ativo="Meus horários">
        <div className="mx-auto max-w-md rounded-2xl bg-[var(--card)] p-8 text-center">
          <div className="text-4xl">✓</div>
          <h2 className="font-display mt-3 text-2xl font-bold">Horário confirmado</h2>
          <p className="mt-3 text-[var(--mu)]">{servicos[servico].nome} com {barbeiros[barbeiro]}, {dias[dia]} às {hora}.</p>
          <button onClick={() => { setConfirmado(false); setHora(null); }} className="mt-6 rounded-full bg-[var(--p)] px-6 py-3 font-semibold text-black">Novo agendamento</button>
        </div>
      </AppMoldura>
    );
  }

  return (
    <AppMoldura marca={marca} menu={["Agendar", "Meus horários", "Perfil"]} ativo="Agendar">
      <h1 className="font-display text-2xl font-bold">Agende seu horário</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-6">
          <div>
            <p className="mb-2 text-sm text-[var(--mu)]">Serviço</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {servicos.map((s, i) => (
                <button key={s.nome} onClick={() => setServico(i)} className={opcao(servico === i)}>
                  <div className="font-semibold">{s.nome}</div>
                  <div className="text-[var(--mu)]">R$ {s.preco} · {s.min} min</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm text-[var(--mu)]">Barbeiro</p>
            <div className="flex flex-wrap gap-2">
              {barbeiros.map((b, i) => <button key={b} onClick={() => setBarbeiro(i)} className={opcao(barbeiro === i)}>{b}</button>)}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm text-[var(--mu)]">Dia</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {dias.map((d, i) => <button key={d} onClick={() => { setDia(i); setHora(null); }} className={`${opcao(dia === i)} shrink-0 capitalize`}>{d}</button>)}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm text-[var(--mu)]">Horário</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {horarios.map((h) => {
                const ocupado = dia === 0 && ocupados.has(h);
                return (
                  <button key={h} disabled={ocupado} onClick={() => setHora(h)} className={`${opcao(hora === h)} disabled:cursor-not-allowed disabled:opacity-30 disabled:line-through`}>{h}</button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-fit rounded-2xl bg-[var(--card)] p-6">
          <h2 className="font-semibold">Resumo</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-[var(--mu)]">Serviço</dt><dd>{servicos[servico].nome}</dd></div>
            <div className="flex justify-between"><dt className="text-[var(--mu)]">Barbeiro</dt><dd>{barbeiros[barbeiro]}</dd></div>
            <div className="flex justify-between"><dt className="text-[var(--mu)]">Quando</dt><dd className="capitalize">{dias[dia]} {hora ?? "--:--"}</dd></div>
            <div className="flex justify-between border-t border-[var(--bg)] pt-2 font-semibold"><dt>Total</dt><dd>R$ {servicos[servico].preco}</dd></div>
          </dl>
          <button disabled={!hora} onClick={() => setConfirmado(true)} className="mt-6 w-full rounded-full bg-[var(--p)] py-3 font-semibold text-black disabled:opacity-40">Confirmar</button>
        </div>
      </div>
    </AppMoldura>
  );
}
