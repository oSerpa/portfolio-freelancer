import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { validar, type Orcamento } from "@/lib/orcamento";

// Recebe o formulário e manda para o seu e-mail usando a API do Resend.
// Precisa da variável de ambiente RESEND_API_KEY configurada na Vercel.

const escapar = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let dados: Partial<Orcamento> & { site?: string };
  try {
    dados = await req.json();
  } catch {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  // Campo escondido: se veio preenchido, é robô. Responde ok e ignora.
  if (dados.site) return NextResponse.json({ ok: true });

  const erro = validar(dados);
  if (erro) return NextResponse.json({ erro }, { status: 400 });
  const o = dados as Orcamento;

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    console.error("RESEND_API_KEY não configurada");
    return NextResponse.json({ erro: "Envio por e-mail indisponível no momento." }, { status: 503 });
  }

  const linhas: [string, string][] = [
    ["Nome", o.nome],
    ["E-mail", o.email],
    ["WhatsApp", o.whatsapp || "não informado"],
    ["Tipo de projeto", o.tipo],
    ["Prazo", o.prazo || "não informado"],
  ];

  const html = `
    <h2>Novo pedido de orçamento</h2>
    <table cellpadding="6">${linhas.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapar(v)}</td></tr>`).join("")}</table>
    <h3>Sobre o projeto</h3>
    <p style="white-space:pre-wrap">${escapar(o.descricao)}</p>`;

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Orçamentos serpa.dev <onboarding@resend.dev>",
      to: [process.env.ORCAMENTO_EMAIL || site.email],
      reply_to: o.email,
      subject: `Orçamento: ${o.tipo} para ${o.nome}`,
      html,
    }),
  });

  if (!resposta.ok) {
    console.error("Erro no Resend", resposta.status, await resposta.text());
    return NextResponse.json({ erro: "Não foi possível enviar agora." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
