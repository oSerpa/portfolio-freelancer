// Tipos e regras do formulário de orçamento, usados no navegador e no servidor.

export const tiposProjeto = ["Landing Page", "Site", "App", "Outro"] as const;
export const prazos = ["Urgente (até 2 semanas)", "Em até 1 mês", "Em até 3 meses", "Sem pressa"] as const;

export type Orcamento = {
  nome: string;
  email: string;
  whatsapp: string;
  tipo: string;
  prazo: string;
  descricao: string;
};

export function validar(o: Partial<Orcamento>): string | null {
  if (!o.nome || o.nome.trim().length < 2) return "Informe seu nome.";
  if (!o.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)) return "Informe um e-mail válido.";
  if (o.whatsapp && o.whatsapp.replace(/\D/g, "").length < 10) return "WhatsApp deve ter DDD e número.";
  if (!o.tipo || !(tiposProjeto as readonly string[]).includes(o.tipo)) return "Escolha o tipo de projeto.";
  if (!o.descricao || o.descricao.trim().length < 10) return "Conte um pouco mais sobre o projeto.";
  if (o.descricao.length > 3000) return "Descrição muito longa (máximo 3000 caracteres).";
  return null;
}

export function resumoTexto(o: Orcamento) {
  return [
    `Olá, Serpa! Quero um orçamento.`,
    ``,
    `Nome: ${o.nome}`,
    `E-mail: ${o.email}`,
    o.whatsapp ? `WhatsApp: ${o.whatsapp}` : null,
    `Tipo: ${o.tipo}`,
    o.prazo ? `Prazo: ${o.prazo}` : null,
    ``,
    o.descricao,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
