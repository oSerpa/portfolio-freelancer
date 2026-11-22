"use client";

import { useState } from "react";
import { linkWhatsApp } from "@/data/site";
import { tiposProjeto, faixasOrcamento, prazos, validar, resumoTexto, type Orcamento } from "@/lib/orcamento";

const vazio: Orcamento = { nome: "", email: "", whatsapp: "", tipo: "", faixa: "", prazo: "", descricao: "" };
type Estado = "editando" | "enviando" | "enviado" | "falhou";

export default function FormOrcamento() {
  const [dados, setDados] = useState(vazio);
  const [estado, setEstado] = useState<Estado>("editando");
  const [erro, setErro] = useState<string | null>(null);
  const [isca, setIsca] = useState("");

  const mudar = (campo: keyof Orcamento) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setDados({ ...dados, [campo]: e.target.value });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const problema = validar(dados);
    if (problema) return setErro(problema);
    setErro(null);
    setEstado("enviando");
    try {
      const r = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, site: isca }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErro(j.erro ?? "Não foi possível enviar.");
        setEstado("falhou");
        return;
      }
      setEstado("enviado");
    } catch {
      setErro("Sem conexão. Tente de novo ou envie pelo WhatsApp.");
      setEstado("falhou");
    }
  }

  const whats = linkWhatsApp(resumoTexto(dados));
  const campo = "w-full rounded-xl border border-borda bg-fundo px-4 py-3 text-sm outline-none transition placeholder:text-suave/60 focus:border-destaque";
  const rotulo = "mb-1.5 block text-sm text-suave";

  if (estado === "enviado") {
    return (
      <div className="rounded-2xl border border-destaque/40 bg-superficie p-8 text-center">
        <p className="font-display text-2xl font-bold">Pedido recebido!</p>
        <p className="mx-auto mt-3 max-w-md text-suave">Recebi seu orçamento por e-mail e respondo em até 1 dia útil. Se quiser agilizar, mande o resumo também pelo WhatsApp.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={whats} target="_blank" rel="noopener noreferrer" className="rounded-full bg-destaque px-6 py-3 font-semibold text-fundo hover:bg-destaque-escuro">Enviar pelo WhatsApp</a>
          <button onClick={() => { setDados(vazio); setEstado("editando"); }} className="rounded-full border border-borda px-6 py-3 font-semibold hover:border-apoio">Novo pedido</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-4 rounded-2xl border border-borda bg-superficie p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="nome" className={rotulo}>Nome *</label>
        <input id="nome" className={campo} value={dados.nome} onChange={mudar("nome")} autoComplete="name" placeholder="Seu nome" />
      </div>
      <div>
        <label htmlFor="email" className={rotulo}>E-mail *</label>
        <input id="email" type="email" className={campo} value={dados.email} onChange={mudar("email")} autoComplete="email" placeholder="voce@email.com" />
      </div>
      <div>
        <label htmlFor="whatsapp" className={rotulo}>WhatsApp</label>
        <input id="whatsapp" type="tel" className={campo} value={dados.whatsapp} onChange={mudar("whatsapp")} autoComplete="tel" placeholder="(00) 00000-0000" />
      </div>
      <div>
        <label htmlFor="tipo" className={rotulo}>Tipo de projeto *</label>
        <select id="tipo" className={campo} value={dados.tipo} onChange={mudar("tipo")}>
          <option value="">Escolha uma opção</option>
          {tiposProjeto.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="faixa" className={rotulo}>Quanto pretende investir?</label>
        <select id="faixa" className={campo} value={dados.faixa} onChange={mudar("faixa")}>
          <option value="">Prefiro não dizer</option>
          {faixasOrcamento.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="prazo" className={rotulo}>Prazo</label>
        <select id="prazo" className={campo} value={dados.prazo} onChange={mudar("prazo")}>
          <option value="">Escolha uma opção</option>
          {prazos.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="descricao" className={rotulo}>Conte sobre o projeto *</label>
        <textarea id="descricao" rows={5} maxLength={3000} className={campo} value={dados.descricao} onChange={mudar("descricao")} placeholder="O que você precisa, para qual negócio, se já tem algum site de referência..." />
      </div>

      {/* Campo escondido contra robôs de spam */}
      <input type="text" tabIndex={-1} autoComplete="off" value={isca} onChange={(e) => setIsca(e.target.value)} className="hidden" aria-hidden="true" name="site" />

      {erro && (
        <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300 md:col-span-2">
          {erro}
          {estado === "falhou" && (
            <> {" "}<a href={whats} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Enviar pelo WhatsApp</a></>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 md:col-span-2">
        <button disabled={estado === "enviando"} className="rounded-full bg-destaque px-8 py-3 font-semibold text-fundo transition hover:bg-destaque-escuro disabled:opacity-60">
          {estado === "enviando" ? "Enviando..." : "Pedir orçamento"}
        </button>
        <span className="text-sm text-suave">Respondo em até 1 dia útil.</span>
      </div>
    </form>
  );
}
