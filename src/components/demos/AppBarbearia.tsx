"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AppMoldura from "./AppMoldura";
import { usePersistente } from "./ui";

const tema = { p: "#38bdf8", bg: "#0b0f17", tx: "#eef2f7", mu: "#8a94a6", card: "#161c28" };
const servicos = [
  { nome: "Corte", preco: 45, min: 30, icone: "✂️" },
  { nome: "Barba", preco: 35, min: 25, icone: "🪒" },
  { nome: "Corte + barba", preco: 70, min: 55, icone: "💈" },
  { nome: "Sobrancelha", preco: 15, min: 10, icone: "✨" },
];
const barbeiros = [
  { nome: "Rafael", nota: "4,9", cor: "from-sky-400 to-indigo-500" },
  { nome: "Diego", nota: "4,8", cor: "from-amber-400 to-orange-500" },
  { nome: "Tiago", nota: "5,0", cor: "from-emerald-400 to-teal-500" },
];
const horarios = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

type Agendamento = { id: number; servico: number; barbeiro: number; data: string; hora: string };
type Tela = "agendar" | "meus" | "perfil";

function dias() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  }).filter((d) => d.getDay() !== 0);
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const bonito = (s: string) => new Date(s + "T12:00").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
// horários ocupados "aleatórios" mas fixos por dia e barbeiro
const ocupado = (data: string, barbeiro: number, h: string) => (data.charCodeAt(9) + barbeiro * 3 + h.charCodeAt(1) + h.charCodeAt(3)) % 5 === 0;

export default function AppBarbearia() {
  const [tela, setTela] = useState<Tela>("agendar");
  const [passo, setPasso] = useState(0);
  const [servico, setServico] = useState<number | null>(null);
  const [barbeiro, setBarbeiro] = useState<number | null>(null);
  const [data, setData] = useState(iso(dias()[0]));
  const [hora, setHora] = useState<string | null>(null);
  const [agenda, setAgenda] = usePersistente<Agendamento[]>("demo-barbearia", []);
  const [confirmado, setConfirmado] = useState<Agendamento | null>(null);

  function confirmar() {
    if (servico === null || barbeiro === null || !hora) return;
    const novo = { id: Date.now(), servico, barbeiro, data, hora };
    setAgenda([...agenda, novo].sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora)));
    setConfirmado(novo);
  }
  function reiniciar() {
    setPasso(0); setServico(null); setBarbeiro(null); setHora(null); setConfirmado(null);
  }

  const passos = ["Serviço", "Profissional", "Data e hora", "Confirmar"];
  const card = (sel: boolean) => `rounded-2xl border p-4 text-left transition ${sel ? "border-[var(--p)] bg-[var(--p)]/10" : "border-[var(--card)] bg-[var(--card)] hover:border-[var(--mu)]/40"}`;

  return (
    <AppMoldura marca="Navalha" tema={tema} ativo={tela} aoNavegar={setTela} menu={[
      { id: "agendar", label: "Agendar", icone: "📅" },
      { id: "meus", label: `Meus horários${agenda.length ? ` (${agenda.length})` : ""}`, icone: "🕒" },
      { id: "perfil", label: "Perfil", icone: "👤" },
    ]}>
      {tela === "agendar" && (
        confirmado ? (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto mt-10 max-w-md rounded-3xl bg-[var(--card)] p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--p)] text-3xl text-[var(--bg)]">✓</motion.div>
            <h2 className="mt-5 text-2xl font-bold">Horário confirmado!</h2>
            <p className="mt-2 text-[var(--mu)]">{servicos[confirmado.servico].nome} com {barbeiros[confirmado.barbeiro].nome}<br />{bonito(confirmado.data)} às {confirmado.hora}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { reiniciar(); setTela("meus"); }} className="flex-1 rounded-xl border border-[var(--mu)]/30 py-3">Ver meus horários</button>
              <button onClick={reiniciar} className="flex-1 rounded-xl bg-[var(--p)] py-3 font-semibold text-[var(--bg)]">Novo</button>
            </div>
          </motion.div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-bold md:text-3xl">Agende seu horário</h1>
            <div className="mt-6 flex gap-2">
              {passos.map((p, i) => (
                <button key={p} disabled={i > passo} onClick={() => setPasso(i)} className="flex-1 text-left disabled:cursor-default">
                  <div className="h-1 overflow-hidden rounded-full bg-[var(--card)]"><motion.div className="h-full bg-[var(--p)]" animate={{ width: i <= passo ? "100%" : "0%" }} /></div>
                  <span className={`mt-2 block text-xs ${i <= passo ? "" : "text-[var(--mu)]"}`}>{p}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={passo} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="mt-8">
                {passo === 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {servicos.map((s, i) => (
                      <button key={s.nome} onClick={() => { setServico(i); setPasso(1); }} className={card(servico === i)}>
                        <span className="text-2xl">{s.icone}</span>
                        <div className="mt-3 font-semibold">{s.nome}</div>
                        <div className="text-sm text-[var(--mu)]">R$ {s.preco} · {s.min} min</div>
                      </button>
                    ))}
                  </div>
                )}
                {passo === 1 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {barbeiros.map((b, i) => (
                      <button key={b.nome} onClick={() => { setBarbeiro(i); setHora(null); setPasso(2); }} className={card(barbeiro === i)}>
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white ${b.cor}`}>{b.nome[0]}</div>
                        <div className="mt-3 font-semibold">{b.nome}</div>
                        <div className="text-sm text-amber-400">★ {b.nota}</div>
                      </button>
                    ))}
                  </div>
                )}
                {passo === 2 && barbeiro !== null && (
                  <div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {dias().map((d) => (
                        <button key={iso(d)} onClick={() => { setData(iso(d)); setHora(null); }} className={`flex w-16 shrink-0 flex-col items-center rounded-2xl py-3 transition ${data === iso(d) ? "bg-[var(--p)] text-[var(--bg)]" : "bg-[var(--card)]"}`}>
                          <span className="text-xs uppercase">{d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}</span>
                          <span className="text-xl font-bold">{d.getDate()}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {horarios.map((h) => {
                        const tomado = ocupado(data, barbeiro, h) || agenda.some((a) => a.data === data && a.hora === h && a.barbeiro === barbeiro);
                        return <button key={h} disabled={tomado} onClick={() => setHora(h)} className={`rounded-xl py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-25 disabled:line-through ${hora === h ? "bg-[var(--p)] font-semibold text-[var(--bg)]" : "bg-[var(--card)] hover:bg-[var(--mu)]/20"}`}>{h}</button>;
                      })}
                    </div>
                    <button disabled={!hora} onClick={() => setPasso(3)} className="mt-6 w-full rounded-xl bg-[var(--p)] py-3.5 font-semibold text-[var(--bg)] disabled:opacity-30">Continuar</button>
                  </div>
                )}
                {passo === 3 && servico !== null && barbeiro !== null && hora && (
                  <div className="rounded-3xl bg-[var(--card)] p-6">
                    <dl className="space-y-4">
                      {[["Serviço", servicos[servico].nome], ["Profissional", barbeiros[barbeiro].nome], ["Quando", `${bonito(data)} às ${hora}`], ["Duração", `${servicos[servico].min} min`]].map(([k, v]) => (
                        <div key={k} className="flex justify-between"><dt className="text-[var(--mu)]">{k}</dt><dd className="font-medium capitalize">{v}</dd></div>
                      ))}
                      <div className="flex justify-between border-t border-[var(--bg)] pt-4 text-lg font-bold"><dt>Total</dt><dd>R$ {servicos[servico].preco}</dd></div>
                    </dl>
                    <button onClick={confirmar} className="mt-6 w-full rounded-xl bg-[var(--p)] py-3.5 font-semibold text-[var(--bg)]">Confirmar agendamento</button>
                    <p className="mt-3 text-center text-xs text-[var(--mu)]">Pagamento no local. Cancele grátis até 2h antes.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )
      )}

      {tela === "meus" && (
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold md:text-3xl">Meus horários</h1>
          {agenda.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-[var(--mu)]/30 p-10 text-center text-[var(--mu)]">
              Nenhum horário marcado ainda.
              <button onClick={() => setTela("agendar")} className="mt-4 block w-full rounded-xl bg-[var(--p)] py-3 font-semibold text-[var(--bg)]">Agendar agora</button>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              <AnimatePresence>
                {agenda.map((a) => (
                  <motion.li key={a.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} className="flex items-center gap-4 rounded-2xl bg-[var(--card)] p-4">
                    <div className="flex w-14 flex-col items-center rounded-xl bg-[var(--p)]/15 py-2 text-[var(--p)]">
                      <span className="text-xs uppercase">{bonito(a.data).split(",")[0]}</span>
                      <span className="text-lg font-bold">{a.hora}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{servicos[a.servico].nome}</p>
                      <p className="text-sm text-[var(--mu)]">com {barbeiros[a.barbeiro].nome} · {bonito(a.data)}</p>
                    </div>
                    <button onClick={() => setAgenda(agenda.filter((x) => x.id !== a.id))} className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-400/10">Cancelar</button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      )}

      {tela === "perfil" && (
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-2xl font-bold">V</div>
            <div><h1 className="text-2xl font-bold">Visitante</h1><p className="text-[var(--mu)]">Cliente desde hoje</p></div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[["Agendados", agenda.length], ["Gasto previsto", `R$ ${agenda.reduce((s, a) => s + servicos[a.servico].preco, 0)}`], ["Pontos", agenda.length * 10]].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-[var(--card)] p-4"><div className="text-2xl font-bold">{v}</div><div className="text-sm text-[var(--mu)]">{k}</div></div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-[var(--card)] p-5">
            <p className="font-semibold">Programa de fidelidade</p>
            <p className="text-sm text-[var(--mu)]">A cada 10 cortes, o próximo é por nossa conta.</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg)]"><motion.div className="h-full bg-[var(--p)]" initial={{ width: 0 }} animate={{ width: `${Math.min(100, agenda.length * 10)}%` }} /></div>
            <p className="mt-2 text-xs text-[var(--mu)]">{Math.min(10, agenda.length)} de 10</p>
          </div>
          <p className="mt-6 text-xs text-[var(--mu)]">Os agendamentos ficam salvos neste navegador.</p>
        </div>
      )}
    </AppMoldura>
  );
}
