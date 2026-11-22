// Conteúdo das seções. Edite os textos à vontade.

export const servicos = [
  {
    titulo: "Landing Pages",
    texto: "Páginas focadas em conversão para lançar um produto, captar contatos ou vender um serviço.",
    itens: ["Entrega rápida", "Foco em conversão", "Integração com WhatsApp e formulários"],
  },
  {
    titulo: "Sites",
    texto: "Sites institucionais e portfólios com várias páginas, fáceis de atualizar e bem posicionados no Google.",
    itens: ["Design responsivo", "SEO básico incluso", "Painel para editar conteúdo"],
  },
  {
    titulo: "Apps",
    texto: "Aplicações web e mobile sob medida: agendamentos, painéis, sistemas internos e muito mais.",
    itens: ["Web e mobile", "Login e banco de dados", "Feito para crescer"],
  },
];

export type Categoria = "Landing Pages" | "Apps" | "Sites";

export type Modelo = {
  nome: string;
  segmento: string;
  descricao: string;
  tecnologias: string[];
  cor: string; // cor de fundo da prévia enquanto a demo não existe
  href?: string; // link da demonstração (etapa 3)
};

export const modelos: Record<Categoria, Modelo[]> = {
  "Landing Pages": [
    { nome: "Lançamento de curso", segmento: "Educação", descricao: "Página de vendas com contagem regressiva, depoimentos e checkout.", tecnologias: ["Next.js", "Tailwind"], cor: "from-violet-500 to-fuchsia-500", href: "/modelos/curso" },
    { nome: "Clínica estética", segmento: "Saúde", descricao: "Captação de agendamentos direto pelo WhatsApp.", tecnologias: ["HTML", "CSS", "JavaScript"], cor: "from-rose-400 to-orange-300", href: "/modelos/clinica" },
    { nome: "App de delivery", segmento: "Startup", descricao: "Apresentação de app com chamada para download nas lojas.", tecnologias: ["React", "Tailwind"], cor: "from-emerald-400 to-cyan-500", href: "/modelos/delivery" },
  ],
  Sites: [
    { nome: "Escritório de advocacia", segmento: "Jurídico", descricao: "Site institucional com áreas de atuação, equipe e blog.", tecnologias: ["Next.js", "TypeScript"], cor: "from-slate-500 to-slate-800", href: "/modelos/advocacia" },
    { nome: "Restaurante", segmento: "Gastronomia", descricao: "Cardápio online, reservas e localização.", tecnologias: ["PHP", "MySQL"], cor: "from-amber-400 to-red-500", href: "/modelos/restaurante" },
    { nome: "Portfólio de fotógrafo", segmento: "Criativo", descricao: "Galeria de trabalhos com páginas por ensaio.", tecnologias: ["React", "Vite"], cor: "from-zinc-400 to-zinc-700", href: "/modelos/fotografo" },
  ],
  Apps: [
    { nome: "Agenda para barbearia", segmento: "Serviços", descricao: "Agendamento online com horários livres e lembretes.", tecnologias: ["Next.js", "PostgreSQL"], cor: "from-sky-400 to-indigo-600", href: "/modelos/barbearia" },
    { nome: "Controle financeiro", segmento: "Finanças", descricao: "Painel de receitas e despesas com gráficos.", tecnologias: ["React", "Node.js"], cor: "from-lime-400 to-green-600", href: "/modelos/financas" },
    { nome: "Lista de tarefas da equipe", segmento: "Produtividade", descricao: "Quadro de tarefas em colunas com arrastar e soltar.", tecnologias: ["React Native", "TypeScript"], cor: "from-yellow-300 to-orange-500", href: "/modelos/tarefas" },
  ],
};

export const linguagens = [
  { nome: "HTML e CSS", uso: "Base de qualquer página, leve e rápida." },
  { nome: "JavaScript", uso: "Interatividade e animações no navegador." },
  { nome: "TypeScript", uso: "JavaScript com tipos, menos erro em projeto grande." },
  { nome: "React", uso: "Interfaces modernas e componentizadas." },
  { nome: "Next.js", uso: "Sites rápidos e bem ranqueados no Google." },
  { nome: "Tailwind CSS", uso: "Visual consistente e responsivo." },
  { nome: "Node.js", uso: "APIs e integrações no servidor." },
  { nome: "PHP", uso: "Sites em hospedagem compartilhada e WordPress." },
  { nome: "React Native", uso: "Apps para Android e iOS com um só código." },
  { nome: "SQL", uso: "Bancos de dados como MySQL e PostgreSQL." },
];
