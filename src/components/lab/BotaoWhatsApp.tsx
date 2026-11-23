"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { site } from "@/data/site";

/* Gerador de botão de WhatsApp: o visitante monta o botão do próprio negócio e testa o link. */

const mascaraFone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const cores = ["#25d366", "#0d0d0c", "#ff4d1c", "#3b82f6"];
const IconeZap = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

export default function BotaoWhatsApp() {
  const [empresa, setEmpresa] = useState("Studio Bella");
  const [fone, setFone] = useState(mascaraFone(site.whatsapp.slice(2)));
  const [msg, setMsg] = useState("Olá! Vi o site e quero agendar um horário.");
  const [cor, setCor] = useState(cores[0]);
  const [aberto, setAberto] = useState(true);
  const [copiado, setCopiado] = useState(false);

  const digitos = fone.replace(/\D/g, "");
  const valido = digitos.length >= 10;
  const link = `https://wa.me/55${digitos}?text=${encodeURIComponent(msg)}`;
  const codigo = `<a href="${link}" target="_blank" class="botao-whatsapp">Fale conosco</a>`;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* navegador sem permissão para a área de transferência */
    }
  }

  const campo = "w-full border border-linha bg-tinta px-3 py-2.5 text-sm outline-none transition focus:border-brasa";

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-5">
        <label className="block">
          <span className="rotulo mb-2 block text-cinza">Nome do negócio</span>
          <input value={empresa} onChange={(e) => setEmpresa(e.target.value.slice(0, 30))} className={campo} />
        </label>
        <label className="block">
          <span className="rotulo mb-2 block text-cinza">WhatsApp</span>
          <input value={fone} onChange={(e) => setFone(mascaraFone(e.target.value))} inputMode="numeric" className={`${campo} ${!valido ? "border-red-400/70" : ""}`} placeholder="(61) 90000-0000" />
          {!valido && <span className="mt-1 block text-xs text-red-300">Digite DDD e número.</span>}
        </label>
        <label className="block">
          <span className="rotulo mb-2 block text-cinza">Mensagem que já vem escrita</span>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value.slice(0, 140))} rows={3} className={`${campo} resize-none`} />
        </label>
        <div>
          <p className="rotulo mb-2 text-cinza">Cor do botão</p>
          <div className="flex gap-3">
            {cores.map((c) => (
              <button key={c} onClick={() => setCor(c)} aria-label={`Cor ${c}`} className={`h-9 w-9 border border-linha transition-transform ${cor === c ? "scale-110 ring-2 ring-papel ring-offset-2 ring-offset-tinta" : ""}`} style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        {/* Prévia: um site de exemplo com o botão flutuante */}
        <div className="relative h-[380px] overflow-hidden bg-[#f6f3ee] text-[#1b1b1b]">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
            <span className="font-display truncate font-bold">{empresa || "Seu negócio"}</span>
            <span className="text-xs text-black/50">Serviços · Contato</span>
          </div>
          <div className="space-y-2 p-4">
            <div className="h-24 bg-black/[0.06]" />
            <div className="h-3 w-3/4 bg-black/[0.08]" />
            <div className="h-3 w-1/2 bg-black/[0.08]" />
          </div>

          <AnimatePresence>
            {aberto && (
              <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} className="absolute bottom-24 right-4 w-60 overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="px-4 py-3 text-white" style={{ background: cor === "#25d366" ? "#075e54" : cor }}>
                  <p className="text-sm font-semibold">{empresa || "Seu negócio"}</p>
                  <p className="text-[11px] opacity-80">Responde em poucos minutos</p>
                </div>
                <div className="bg-[#ece5dd] p-3">
                  <p className="ml-auto w-fit max-w-[90%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2 text-xs">{msg || "..."}</p>
                </div>
                <a href={valido ? link : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!valido} className={`block px-4 py-2.5 text-center text-xs font-semibold text-white ${valido ? "" : "pointer-events-none opacity-50"}`} style={{ background: cor }}>
                  Abrir conversa
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button onClick={() => setAberto(!aberto)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} aria-label="Abrir ou fechar o WhatsApp" className="absolute bottom-5 right-4 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg" style={{ background: cor }}>
            <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ background: cor }} />
            <IconeZap />
          </motion.button>
        </div>

        <div className="flex min-w-0 flex-col border border-linha bg-tinta">
          <div className="flex items-center justify-between border-b border-linha px-4 py-3">
            <span className="rotulo text-cinza">Link gerado</span>
            <button onClick={copiar} className="font-mono text-xs text-brasa hover:underline">{copiado ? "copiado ✓" : "copiar código"}</button>
          </div>
          <pre className="flex-1 overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-relaxed text-cinza">{codigo}</pre>
          <a href={valido ? link : undefined} target="_blank" rel="noopener noreferrer" className={`m-4 mt-0 block bg-brasa py-3 text-center text-sm font-semibold text-tinta ${valido ? "" : "pointer-events-none opacity-50"}`}>
            Testar no meu WhatsApp ↗
          </a>
        </div>
      </div>
    </div>
  );
}
