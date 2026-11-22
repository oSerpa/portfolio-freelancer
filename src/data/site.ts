// Dados de contato e informações gerais do site. Edite aqui.
export const site = {
  nome: "Serpa",
  marca: "serpa.dev",
  titulo: "Sites, apps e landing pages sob medida",
  descricao:
    "Desenvolvo sites, aplicativos e landing pages rápidos, bonitos e feitos para trazer clientes. Peça seu orçamento sem compromisso.",
  email: "felipeserpadesouza93@gmail.com",
  whatsapp: "5561920021863",
  whatsappExibicao: "(61) 92002-1863",
  github: "https://github.com/oSerpa",
};

export function linkWhatsApp(mensagem = "Olá, Serpa! Vim pelo seu site e quero um orçamento.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const navegacao = [
  { href: "#servicos", label: "Serviços" },
  { href: "#modelos", label: "Modelos" },
  { href: "#linguagens", label: "Linguagens" },
  { href: "#orcamento", label: "Orçamento" },
];
