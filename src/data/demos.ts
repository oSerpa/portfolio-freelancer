// Conteúdo das páginas de demonstração do carrossel. Todos os nomes e textos são fictícios.

export type Tema = { primaria: string; fundo: string; texto: string; suave: string; cartao: string };

type Base = { slug: string; marca: string; tema: Tema };

export type DemoLanding = Base & {
  tipo: "landing";
  selo: string;
  titulo: string;
  subtitulo: string;
  cta: string;
  contagem?: boolean;
  beneficios: { t: string; d: string }[];
  depoimentos: { nome: string; texto: string }[];
  faq: { p: string; r: string }[];
};

export type DemoSite = Base & {
  tipo: "site";
  menu: string[];
  slogan: string;
  sobre: string;
  tituloItens: string;
  itens: { t: string; d: string; preco?: string }[];
  galeria?: string[];
  contato: { endereco: string; horario: string; telefone: string };
};

export type DemoApp = Base & { tipo: "app"; app: "barbearia" | "financas" | "tarefas" };

export type Demo = DemoLanding | DemoSite | DemoApp;

const escuro = (primaria: string): Tema => ({ primaria, fundo: "#0f0f14", texto: "#f4f4f6", suave: "#a1a1aa", cartao: "#1a1a22" });
const claro = (primaria: string): Tema => ({ primaria, fundo: "#ffffff", texto: "#18181b", suave: "#52525b", cartao: "#f4f4f5" });

export const demos: Demo[] = [
  {
    tipo: "landing",
    slug: "curso",
    marca: "Código do Zero",
    tema: escuro("#a855f7"),
    selo: "Turma de janeiro com vagas limitadas",
    titulo: "Aprenda programação do zero e conquiste sua primeira vaga",
    subtitulo: "12 semanas de aulas práticas, projetos reais e mentoria ao vivo toda semana.",
    cta: "Garantir minha vaga",
    contagem: true,
    beneficios: [
      { t: "Projetos reais", d: "Você termina o curso com 5 projetos publicados no seu GitHub." },
      { t: "Mentoria ao vivo", d: "Encontros semanais para tirar dúvidas direto com o instrutor." },
      { t: "Certificado", d: "Certificado de conclusão com carga horária de 120 horas." },
    ],
    depoimentos: [
      { nome: "Ana, aluna da turma 3", texto: "Saí do zero e em quatro meses consegui meu estágio." },
      { nome: "Bruno, aluno da turma 5", texto: "As mentorias fizeram toda a diferença para não desistir." },
    ],
    faq: [
      { p: "Preciso saber alguma coisa antes?", r: "Não. O curso começa do absoluto zero." },
      { p: "Por quanto tempo tenho acesso?", r: "Acesso vitalício às aulas gravadas." },
      { p: "Tem garantia?", r: "Sim, 7 dias de garantia incondicional." },
    ],
  },
  {
    tipo: "landing",
    slug: "clinica",
    marca: "Lumière Estética",
    tema: { primaria: "#e11d48", fundo: "#fff7f5", texto: "#3f1d24", suave: "#7c5960", cartao: "#ffe9e3" },
    selo: "Avaliação gratuita em dezembro",
    titulo: "Realce sua beleza natural com quem entende de pele",
    subtitulo: "Tratamentos faciais e corporais com profissionais especializados e equipamentos de última geração.",
    cta: "Agendar pelo WhatsApp",
    beneficios: [
      { t: "Limpeza de pele", d: "Remoção de impurezas e hidratação profunda em uma sessão." },
      { t: "Harmonização", d: "Procedimentos sutis para valorizar seus traços." },
      { t: "Drenagem", d: "Massagem que reduz inchaço e melhora a circulação." },
    ],
    depoimentos: [
      { nome: "Carla M.", texto: "Atendimento impecável, minha pele nunca esteve tão bonita." },
      { nome: "Juliana R.", texto: "Ambiente acolhedor e resultado logo na primeira sessão." },
    ],
    faq: [
      { p: "A avaliação é mesmo gratuita?", r: "Sim, sem compromisso de fechar pacote." },
      { p: "Vocês aceitam cartão?", r: "Aceitamos cartão em até 10x sem juros." },
      { p: "Onde fica a clínica?", r: "No centro da cidade, com estacionamento conveniado." },
    ],
  },
  {
    tipo: "landing",
    slug: "delivery",
    marca: "Rangô",
    tema: { primaria: "#10b981", fundo: "#04201a", texto: "#ecfdf5", suave: "#9ccfbd", cartao: "#0a2f27" },
    selo: "Novo no seu bairro",
    titulo: "Sua comida favorita chegando em até 30 minutos",
    subtitulo: "Restaurantes da sua região, entrega rápida e frete grátis no primeiro pedido.",
    cta: "Baixar o app",
    beneficios: [
      { t: "Entrega rápida", d: "Acompanhe o entregador em tempo real no mapa." },
      { t: "Cupons toda semana", d: "Descontos exclusivos para quem usa o app." },
      { t: "Pagamento fácil", d: "Pix, cartão ou dinheiro na entrega." },
    ],
    depoimentos: [
      { nome: "Marcos", texto: "Pedi às 20h e às 20h25 já estava jantando." },
      { nome: "Lívia", texto: "Os cupons valem muito a pena, uso toda sexta." },
    ],
    faq: [
      { p: "Funciona na minha cidade?", r: "Estamos em mais de 40 cidades e crescendo." },
      { p: "O frete grátis vale sempre?", r: "No primeiro pedido e em campanhas especiais." },
      { p: "Posso agendar um pedido?", r: "Sim, com até 7 dias de antecedência." },
    ],
  },
  {
    tipo: "site",
    slug: "advocacia",
    marca: "Albuquerque & Rocha Advogados",
    tema: { primaria: "#b08d57", fundo: "#0e1726", texto: "#eef2f7", suave: "#9fb0c6", cartao: "#16233a" },
    menu: ["Início", "Áreas", "Equipe", "Contato"],
    slogan: "Há 20 anos defendendo o que é seu por direito.",
    sobre: "Escritório com atuação em direito civil, trabalhista e empresarial, com atendimento próximo e transparente do primeiro contato até a solução do caso.",
    tituloItens: "Áreas de atuação",
    itens: [
      { t: "Direito civil", d: "Contratos, indenizações, família e sucessões." },
      { t: "Direito trabalhista", d: "Defesa de empregados e consultoria para empresas." },
      { t: "Direito empresarial", d: "Abertura de empresas, societário e recuperação." },
      { t: "Direito do consumidor", d: "Cobranças indevidas, produtos com defeito e serviços." },
    ],
    contato: { endereco: "Av. Central, 1000, sala 801", horario: "Seg a sex, 9h às 18h", telefone: "(00) 0000-0000" },
  },
  {
    tipo: "site",
    slug: "restaurante",
    marca: "Cantina Nonna",
    tema: { primaria: "#c2410c", fundo: "#fffbf5", texto: "#2b1a10", suave: "#6b5444", cartao: "#fbeedd" },
    menu: ["Início", "Cardápio", "Reservas", "Contato"],
    slogan: "Massa fresca feita todo dia, do jeito da nonna.",
    sobre: "Restaurante familiar de culinária italiana. Receitas passadas de geração em geração, ingredientes frescos e um ambiente para reunir quem você gosta.",
    tituloItens: "Cardápio",
    itens: [
      { t: "Lasanha à bolonhesa", d: "Massa fresca, molho de carne e queijo gratinado.", preco: "R$ 58" },
      { t: "Nhoque ao sugo", d: "Nhoque de batata com molho de tomate italiano.", preco: "R$ 46" },
      { t: "Fettuccine Alfredo", d: "Molho cremoso de queijo parmesão.", preco: "R$ 52" },
      { t: "Tiramisù", d: "Sobremesa clássica com café e mascarpone.", preco: "R$ 24" },
    ],
    contato: { endereco: "Rua das Oliveiras, 45", horario: "Ter a dom, 11h30 às 23h", telefone: "(00) 0000-0000" },
  },
  {
    tipo: "site",
    slug: "fotografo",
    marca: "Estúdio Lente",
    tema: claro("#18181b"),
    menu: ["Início", "Ensaios", "Sobre", "Contato"],
    slogan: "Fotografia que conta a sua história.",
    sobre: "Fotógrafo de ensaios, casamentos e eventos. Cada trabalho é pensado junto com o cliente para registrar momentos com naturalidade.",
    tituloItens: "Tipos de ensaio",
    itens: [
      { t: "Casamentos", d: "Cobertura completa do making of à festa." },
      { t: "Ensaios pessoais", d: "Retratos em estúdio ou ao ar livre." },
      { t: "Gestantes e família", d: "Registros para guardar para sempre." },
      { t: "Corporativo", d: "Fotos profissionais para equipes e LinkedIn." },
    ],
    galeria: ["#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#e4e4e7", "#3f3f46"],
    contato: { endereco: "Atendimento em toda a região", horario: "Agenda aberta para 2027", telefone: "(00) 0000-0000" },
  },
  { tipo: "app", slug: "barbearia", marca: "Navalha Agenda", app: "barbearia", tema: escuro("#38bdf8") },
  { tipo: "app", slug: "financas", marca: "Bolso", app: "financas", tema: escuro("#84cc16") },
  { tipo: "app", slug: "tarefas", marca: "Quadro", app: "tarefas", tema: claro("#f97316") },
];

export function buscarDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
