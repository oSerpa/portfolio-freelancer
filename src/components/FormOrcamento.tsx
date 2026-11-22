"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { linkWhatsApp } from "@/data/site";
import { tiposProjeto, faixasOrcamento, prazos, validar, resumoTexto, type Orcamento } from "@/lib/orcamento";

const vazio: Orcamento = { nome: "", email: "", whatsapp: "", tipo: "", faixa: "", prazo: "", descricao: "" };
type Estado = "editando" | "enviando" | "enviado" | "falhou";

function Chips({ opcoes, valor, aoEscolher, rotulo }: { opcoes: readonly string[]; valor: string; aoEscolher: (v: string) => void; rotulo: string }) {
  return (
    <fieldset>
      <legend className="rotulo mb-3 text-cinza">{rotulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => aoEscolher(valor === o ? "" : o)}
            aria-pressed={valor === o}
            className={`border px-4 py-2 text-sm transition-colors ${valor === o ? "border-brasa bg-brasa text-tinta" : "border-linha text-papel/80 hover:border-papel"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function FormOrcamento() {
  const [dados, setDados] = useState(vazio);
  const [estado, setEstado] = useState<Estado>("editando");
  const [erro, setErro] = useState<string | null>(null);
  const [isca, setIsca] = useState("");

  const set = (campo: keyof Orcamento, v: string) => setDados((d) => ({ ...d, [campo]: v }));
  const mudar = (campo: keyof Orcamento) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(campo, e.target.value);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const problema = validar(dados);
    if (problema) return setErro(problema);
    setErro(null);
    setEstado("enviando");
    try {
      const r = await fetch("/api/orcamento", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...dados, site: isca }) });
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
  const campo = "peer w-full border-b border-linha bg-transparent pb-3 pt-6 text-lg outline-none transition-colors placeholder:text-transparent focus:border-brasa";
  const flutua = "rotulo pointer-events-none absolute left-0 top-0 text-cinza transition-all";

  return (
    <AnimatePresence mode="wait">
      {estado === "enviado" ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="border border-brasa p-10">
          <p className="font-display text-4xl font-semibold">Pedido recebido.</p>
          <p className="mt-4 max-w-md text-papel/70">Seu orçamento chegou no meu e-mail. Mande o resumo pelo WhatsApp que eu respondo no mesmo instante.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={whats} target="_blank" rel="noopener noreferrer" className="bg-brasa px-6 py-3 font-semibold text-tinta">Enviar pelo WhatsApp</a>
            <button onClick={() => { setDados(vazio); setEstado("editando"); }} className="border border-linha px-6 py-3 font-semibold hover:border-papel">Novo pedido</button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" exit={{ opacity: 0 }} onSubmit={enviar} noValidate className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {([
            ["nome", "Seu nome *", "text", "name"],
            ["email", "Seu e-mail *", "email", "email"],
          ] as const).map(([id, rot, tipo, auto]) => (
            <div key={id} className="relative">
              <input id={id} type={tipo} autoComplete={auto} placeholder={rot} value={dados[id]} onChange={mudar(id)} className={campo} />
              <label htmlFor={id} className={flutua}>{rot}</label>
            </div>
          ))}
          <div className="relative md:col-span-2">
            <input id="whatsapp" type="tel" autoComplete="tel" placeholder="WhatsApp" value={dados.whatsapp} onChange={mudar("whatsapp")} className={campo} />
            <label htmlFor="whatsapp" className={flutua}>WhatsApp (opcional)</label>
          </div>
          <div className="md:col-span-2"><Chips rotulo="O que você precisa? *" opcoes={tiposProjeto} valor={dados.tipo} aoEscolher={(v) => set("tipo", v)} /></div>
          <Chips rotulo="Investimento" opcoes={faixasOrcamento} valor={dados.faixa} aoEscolher={(v) => set("faixa", v)} />
          <Chips rotulo="Prazo" opcoes={prazos} valor={dados.prazo} aoEscolher={(v) => set("prazo", v)} />
          <div className="relative md:col-span-2">
            <textarea id="descricao" rows={4} maxLength={3000} placeholder="Conte sobre o projeto" value={dados.descricao} onChange={mudar("descricao")} className={`${campo} resize-none`} />
            <label htmlFor="descricao" className={flutua}>Conte sobre o projeto *</label>
          </div>

          <input type="text" tabIndex={-1} autoComplete="off" value={isca} onChange={(e) => setIsca(e.target.value)} className="hidden" aria-hidden="true" name="site" />

          {erro && (
            <p role="alert" className="border-l-2 border-brasa bg-brasa/10 px-4 py-3 text-sm md:col-span-2">
              {erro}
              {estado === "falhou" && <> <a href={whats} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Enviar pelo WhatsApp</a></>}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 md:col-span-2">
            <button disabled={estado === "enviando"} className="group relative overflow-hidden bg-brasa px-8 py-4 font-semibold text-tinta disabled:opacity-60">
              <span className="absolute inset-0 -translate-x-full bg-papel transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">{estado === "enviando" ? "Enviando..." : "Pedir orçamento →"}</span>
            </button>
            <span className="rotulo text-cinza">Respondo no WhatsApp no mesmo instante</span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
