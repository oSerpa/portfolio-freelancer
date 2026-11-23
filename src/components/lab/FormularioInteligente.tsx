"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/* Formulário com máscara, validação enquanto digita e endereço preenchido pelo CEP (ViaCEP). */

const so = (v: string) => v.replace(/\D/g, "");

const mascaras = {
  cpf: (v: string) => so(v).slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
  fone: (v: string) => {
    const d = so(v).slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  },
  cep: (v: string) => so(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"),
};

// Confere os dois dígitos verificadores do CPF.
function cpfValido(v: string) {
  const d = so(v);
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  for (const t of [9, 10]) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += +d[i] * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== +d[t]) return false;
  }
  return true;
}

type Campos = { nome: string; email: string; cpf: string; fone: string; cep: string; rua: string; numero: string; bairro: string; cidade: string };
const vazio: Campos = { nome: "", email: "", cpf: "", fone: "", cep: "", rua: "", numero: "", bairro: "", cidade: "" };

function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const e: Partial<Record<keyof Campos, string>> = {};
  if (c.nome.trim().split(/\s+/).length < 2) e.nome = "Coloque nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) e.email = "E-mail incompleto.";
  if (!cpfValido(c.cpf)) e.cpf = so(c.cpf).length < 11 ? "CPF tem 11 números." : "Esse CPF não existe.";
  if (so(c.fone).length < 10) e.fone = "Faltam números no telefone.";
  if (so(c.cep).length < 8) e.cep = "CEP tem 8 números.";
  if (!c.rua.trim()) e.rua = "Informe a rua.";
  if (!c.numero.trim()) e.numero = "Número?";
  if (!c.cidade.trim()) e.cidade = "Informe a cidade.";
  return e;
}

export default function FormularioInteligente() {
  const [c, setC] = useState<Campos>(vazio);
  const [tocados, setTocados] = useState<Partial<Record<keyof Campos, boolean>>>({});
  const [buscando, setBuscando] = useState(false);
  const [avisoCep, setAvisoCep] = useState("");
  const [enviado, setEnviado] = useState(false);
  const erros = validar(c);
  const ok = Object.keys(erros).length === 0;

  async function buscarCep(cep: string) {
    setAvisoCep("");
    setBuscando(true);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const j = await r.json();
      if (j.erro) throw new Error();
      setC((v) => ({ ...v, rua: j.logradouro || v.rua, bairro: j.bairro || v.bairro, cidade: j.localidade ? `${j.localidade}/${j.uf}` : v.cidade }));
      setAvisoCep("Endereço preenchido pelo CEP.");
    } catch {
      setAvisoCep("Não achei esse CEP. Preencha o endereço à mão.");
    } finally {
      setBuscando(false);
    }
  }

  function mudar(k: keyof Campos, valor: string) {
    const m = k === "cpf" || k === "fone" || k === "cep" ? mascaras[k](valor) : valor;
    setC((v) => ({ ...v, [k]: m }));
    if (k === "cep" && so(m).length === 8 && so(m) !== so(c.cep)) buscarCep(so(m));
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setTocados(Object.fromEntries(Object.keys(vazio).map((k) => [k, true])));
    if (ok) setEnviado(true);
  }

  function exemplo() {
    setC({ ...vazio, nome: "Ana Souza", email: "ana@email.com", cpf: "529.982.247-25", fone: "(61) 99876-5432" });
    setTocados({});
    mudar("cep", "70040-010");
  }

  const total = Object.keys(vazio).length - 1; // bairro é opcional
  const preenchidos = (Object.keys(vazio) as (keyof Campos)[]).filter((k) => k !== "bairro" && !erros[k]).length;

  const Campo = ({ k, rotulo, className = "", ...rest }: { k: keyof Campos; rotulo: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
    const erro = tocados[k] ? erros[k] : undefined;
    const certo = tocados[k] && !erros[k] && c[k];
    return (
      <label className={`block ${className}`}>
        <span className="rotulo mb-2 flex justify-between text-cinza">
          {rotulo}
          {certo && <span className="text-emerald-400">✓</span>}
        </span>
        <input
          value={c[k]}
          onChange={(e) => mudar(k, e.target.value)}
          onBlur={() => setTocados((t) => ({ ...t, [k]: true }))}
          aria-invalid={!!erro}
          className={`w-full border bg-tinta px-3 py-2.5 text-sm outline-none transition ${erro ? "border-red-400/70" : certo ? "border-emerald-500/50" : "border-linha focus:border-brasa"}`}
          {...rest}
        />
        <AnimatePresence>
          {erro && <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="block overflow-hidden pt-1 text-xs text-red-300">{erro}</motion.span>}
        </AnimatePresence>
      </label>
    );
  };

  if (enviado)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-80 flex-col items-center justify-center border border-linha p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-2xl text-tinta">✓</span>
        <p className="font-display mt-5 text-2xl font-semibold">Tudo certo, {c.nome.split(" ")[0]}.</p>
        <p className="mt-2 text-sm text-papel/60">Nada foi enviado, é só uma demonstração.</p>
        <button onClick={() => { setC(vazio); setTocados({}); setAvisoCep(""); setEnviado(false); }} className="mt-6 border border-linha px-4 py-2 font-mono text-sm hover:border-brasa hover:text-brasa">Recomeçar</button>
      </motion.div>
    );

  return (
    <form onSubmit={enviar} noValidate className="grid gap-8 lg:grid-cols-[1fr_260px]">
      <div className="grid gap-4 sm:grid-cols-6">
        {Campo({ k: "nome", rotulo: "Nome completo", className: "sm:col-span-3", autoComplete: "name" })}
        {Campo({ k: "email", rotulo: "E-mail", className: "sm:col-span-3", type: "email", autoComplete: "email" })}
        {Campo({ k: "cpf", rotulo: "CPF", className: "sm:col-span-3", inputMode: "numeric", placeholder: "000.000.000-00" })}
        {Campo({ k: "fone", rotulo: "Celular", className: "sm:col-span-3", inputMode: "numeric", placeholder: "(00) 00000-0000" })}
        <div className="sm:col-span-2">
          {Campo({ k: "cep", rotulo: buscando ? "CEP · buscando..." : "CEP", inputMode: "numeric", placeholder: "00000-000" })}
        </div>
        {Campo({ k: "rua", rotulo: "Rua", className: "sm:col-span-4" })}
        {Campo({ k: "numero", rotulo: "Número", className: "sm:col-span-2" })}
        {Campo({ k: "bairro", rotulo: "Bairro (opcional)", className: "sm:col-span-2" })}
        {Campo({ k: "cidade", rotulo: "Cidade", className: "sm:col-span-2" })}
        <AnimatePresence>
          {avisoCep && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-xs sm:col-span-6 ${avisoCep.startsWith("Não") ? "text-amber-300" : "text-emerald-400"}`}>{avisoCep}</motion.p>}
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-between gap-6 border border-linha bg-tinta p-5">
        <div>
          <p className="rotulo text-cinza">Progresso</p>
          <p className="font-display mt-2 text-4xl font-semibold tabular-nums">{preenchidos}/{total}</p>
          <div className="mt-3 h-1.5 bg-linha">
            <motion.div animate={{ width: `${(preenchidos / total) * 100}%` }} className="h-full bg-brasa" />
          </div>
          <ul className="mt-5 space-y-1.5 text-xs text-papel/60">
            <li>Máscara automática no CPF, celular e CEP</li>
            <li>CPF conferido pelos dígitos verificadores</li>
            <li>Endereço preenchido pelo CEP</li>
          </ul>
        </div>
        <div className="space-y-2">
          <button type="submit" className={`w-full py-3 text-sm font-semibold transition ${ok ? "bg-brasa text-tinta" : "bg-linha text-cinza"}`}>Enviar</button>
          <button type="button" onClick={exemplo} className="w-full py-2 font-mono text-xs text-cinza hover:text-brasa">preencher com exemplo</button>
        </div>
      </div>
    </form>
  );
}
