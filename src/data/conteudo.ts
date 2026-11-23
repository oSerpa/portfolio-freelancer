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
    { nome: "Lançamento de curso", segmento: "Educação", descricao: "Página de vendas com aula de amostra, grade de módulos e oferta com contagem regressiva.", tecnologias: ["Next.js", "Tailwind"], cor: "from-violet-500 to-fuchsia-500", href: "/modelos/curso" },
    { nome: "Clínica estética", segmento: "Saúde e beleza", descricao: "Visual elegante com indicação de tratamento pela queixa e agendamento pelo WhatsApp.", tecnologias: ["HTML", "CSS", "JavaScript"], cor: "from-rose-400 to-orange-300", href: "/modelos/clinica" },
    { nome: "App de delivery", segmento: "Startup", descricao: "Apresentação de app com celular animado, busca por CEP e cupom.", tecnologias: ["React", "Tailwind"], cor: "from-emerald-400 to-cyan-500", href: "/modelos/delivery" },
    { nome: "Academia", segmento: "Fitness", descricao: "Grade de aulas por dia, planos e calculadora de IMC.", tecnologias: ["Next.js", "Tailwind"], cor: "from-lime-300 to-lime-500", href: "/modelos/academia" },
    { nome: "Lançamento imobiliário", segmento: "Imóveis", descricao: "Plantas interativas e simulador de financiamento.", tecnologias: ["React", "TypeScript"], cor: "from-emerald-700 to-stone-400", href: "/modelos/imobiliario" },
    { nome: "Evento de tecnologia", segmento: "Eventos", descricao: "Palestrantes, agenda por dia e venda de ingressos por lote.", tecnologias: ["Next.js", "Motion"], cor: "from-pink-500 to-violet-600", href: "/modelos/evento" },
  ],
  Sites: [
    { nome: "Escritório de advocacia", segmento: "Jurídico", descricao: "Site institucional com áreas de atuação, equipe e blog.", tecnologias: ["Next.js", "TypeScript"], cor: "from-slate-500 to-slate-800", href: "/modelos/advocacia" },
    { nome: "Restaurante", segmento: "Gastronomia", descricao: "Cardápio online, reservas e localização.", tecnologias: ["PHP", "MySQL"], cor: "from-amber-400 to-red-500", href: "/modelos/restaurante" },
    { nome: "Portfólio de fotógrafo", segmento: "Criativo", descricao: "Galeria com filtro por categoria e visualização em tela cheia.", tecnologias: ["React", "Vite"], cor: "from-zinc-400 to-zinc-700", href: "/modelos/fotografo" },
    { nome: "Escola infantil", segmento: "Educação", descricao: "Turmas por idade, rotina do dia e agendamento de visita.", tecnologias: ["HTML", "CSS", "JavaScript"], cor: "from-yellow-300 to-pink-400", href: "/modelos/escola" },
    { nome: "Oficina mecânica", segmento: "Automotivo", descricao: "Acompanhamento pela placa e orçamento por serviço.", tecnologias: ["PHP", "MySQL"], cor: "from-zinc-700 to-yellow-400", href: "/modelos/oficina" },
    { nome: "Pet shop", segmento: "Pets", descricao: "Banho e tosa por porte do pet e loja com carrinho.", tecnologias: ["Next.js", "Tailwind"], cor: "from-teal-400 to-orange-400", href: "/modelos/petshop" },
  ],
  Apps: [
    { nome: "Agenda para barbearia", segmento: "Serviços", descricao: "Agendamento online com horários livres e lembretes.", tecnologias: ["Next.js", "PostgreSQL"], cor: "from-sky-400 to-indigo-600", href: "/modelos/barbearia" },
    { nome: "Controle financeiro", segmento: "Finanças", descricao: "Painel de receitas e despesas com gráficos.", tecnologias: ["React", "Node.js"], cor: "from-lime-400 to-green-600", href: "/modelos/financas" },
    { nome: "Lista de tarefas da equipe", segmento: "Produtividade", descricao: "Quadro de tarefas em colunas com arrastar e soltar.", tecnologias: ["React Native", "TypeScript"], cor: "from-yellow-300 to-orange-500", href: "/modelos/tarefas" },
    { nome: "Cardápio digital", segmento: "Restaurantes", descricao: "Pedido pelo QR Code da mesa com sacola e status do preparo.", tecnologias: ["React", "Node.js"], cor: "from-amber-400 to-neutral-800", href: "/modelos/cardapio" },
    { nome: "Controle de estoque", segmento: "Comércio", descricao: "Entradas, saídas, alertas de reposição e histórico.", tecnologias: ["Next.js", "PostgreSQL"], cor: "from-indigo-400 to-slate-500", href: "/modelos/estoque" },
    { nome: "Rastreador de hábitos", segmento: "Bem-estar", descricao: "Metas diárias, sequência de dias e estatísticas.", tecnologias: ["React Native", "TypeScript"], cor: "from-pink-400 to-purple-700", href: "/modelos/habitos" },
  ],
};

export type Linguagem = {
  nome: string;
  uso: string;
  tipo: string; // categoria curta: Front-end, Back-end, Mobile...
  descricao: string;
  quando: string[]; // quando faz sentido usar
  vantagens: string[];
  projetos: string[]; // tipos de projeto em que entra
  exemplo: string; // trecho curto de código
};

export const linguagens: Linguagem[] = [
  {
    nome: "HTML e CSS", uso: "Base de qualquer página, leve e rápida.", tipo: "Front-end",
    descricao: "HTML define a estrutura da página e CSS cuida do visual. Toda página da web usa os dois, e sozinhos já resolvem sites simples com ótimo desempenho.",
    quando: ["Landing pages estáticas", "Sites de uma página", "Quando o orçamento é enxuto"],
    vantagens: ["Carrega muito rápido", "Hospedagem barata ou grátis", "Fácil de manter"],
    projetos: ["Landing Pages", "Sites"],
    exemplo: `<section class="hero">\n  <h1>Seu negócio aqui</h1>\n  <a href="#contato">Fale comigo</a>\n</section>`,
  },
  {
    nome: "JavaScript", uso: "Interatividade e animações no navegador.", tipo: "Front-end",
    descricao: "A linguagem que dá vida à página: menus, carrosséis, formulários que validam na hora, animações e qualquer coisa que reage ao clique do usuário.",
    quando: ["Formulários com validação", "Animações e efeitos", "Integração com APIs"],
    vantagens: ["Roda em qualquer navegador", "Ecossistema enorme", "Serve no front e no back"],
    projetos: ["Landing Pages", "Sites", "Apps"],
    exemplo: `botao.addEventListener("click", () => {\n  menu.classList.toggle("aberto");\n});`,
  },
  {
    nome: "TypeScript", uso: "JavaScript com tipos, menos erro em projeto grande.", tipo: "Front-end e Back-end",
    descricao: "É JavaScript com tipagem. O editor avisa os erros antes do código ir para o ar, o que deixa projetos maiores mais seguros e fáceis de evoluir.",
    quando: ["Sistemas e painéis", "Projetos que vão crescer", "Código mantido por mais de uma pessoa"],
    vantagens: ["Menos bugs em produção", "Autocompletar no editor", "Refatorar sem medo"],
    projetos: ["Sites", "Apps"],
    exemplo: `type Pedido = { id: number; total: number };\n\nfunction somar(p: Pedido[]) {\n  return p.reduce((s, x) => s + x.total, 0);\n}`,
  },
  {
    nome: "React", uso: "Interfaces modernas e componentizadas.", tipo: "Front-end",
    descricao: "Biblioteca para montar interfaces em componentes reutilizáveis. É o padrão de mercado para telas com muita interação, como painéis e aplicativos web.",
    quando: ["Apps web com muitas telas", "Painéis administrativos", "Interfaces que mudam em tempo real"],
    vantagens: ["Componentes reaproveitáveis", "Comunidade gigante", "Fácil achar quem dê manutenção"],
    projetos: ["Sites", "Apps"],
    exemplo: `function Contador() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}`,
  },
  {
    nome: "Next.js", uso: "Sites rápidos e bem ranqueados no Google.", tipo: "Full-stack",
    descricao: "Framework em cima do React que entrega páginas já prontas para o Google ler, com rotas, imagens otimizadas e API no mesmo projeto. Este site é feito com ele.",
    quando: ["Sites que precisam aparecer no Google", "Landing pages com formulário", "Projetos com área logada"],
    vantagens: ["Ótimo para SEO", "Muito rápido", "Front e back no mesmo lugar"],
    projetos: ["Landing Pages", "Sites", "Apps"],
    exemplo: `export default async function Pagina() {\n  const posts = await buscarPosts();\n  return <Lista itens={posts} />;\n}`,
  },
  {
    nome: "Tailwind CSS", uso: "Visual consistente e responsivo.", tipo: "Front-end",
    descricao: "Forma de escrever CSS com classes prontas direto no HTML. Acelera o desenvolvimento e mantém espaçamentos, cores e tamanhos padronizados no projeto todo.",
    quando: ["Qualquer projeto com design próprio", "Layouts responsivos", "Sistemas de design"],
    vantagens: ["Desenvolvimento rápido", "CSS final pequeno", "Visual consistente"],
    projetos: ["Landing Pages", "Sites", "Apps"],
    exemplo: `<button class="rounded bg-orange-500 px-6 py-3\n  font-semibold hover:bg-orange-600">\n  Comprar\n</button>`,
  },
  {
    nome: "Node.js", uso: "APIs e integrações no servidor.", tipo: "Back-end",
    descricao: "Permite rodar JavaScript no servidor. Uso para criar APIs, enviar e-mails, integrar com pagamentos, WhatsApp e outros serviços.",
    quando: ["APIs para apps", "Integrações com pagamento", "Automação e envio de e-mails"],
    vantagens: ["Mesma linguagem do front", "Rápido para tempo real", "Muitas bibliotecas prontas"],
    projetos: ["Apps", "Sites"],
    exemplo: `app.post("/pedidos", async (req, res) => {\n  const pedido = await salvar(req.body);\n  res.status(201).json(pedido);\n});`,
  },
  {
    nome: "PHP", uso: "Sites em hospedagem compartilhada e WordPress.", tipo: "Back-end",
    descricao: "Linguagem de servidor por trás do WordPress e de boa parte da web. Roda em praticamente qualquer hospedagem, inclusive as mais baratas.",
    quando: ["Sites em WordPress", "Hospedagem compartilhada", "Sistemas que já usam PHP"],
    vantagens: ["Hospedagem barata", "Muito difundido", "Integra fácil com MySQL"],
    projetos: ["Sites"],
    exemplo: `<?php\n$produtos = $pdo->query("SELECT * FROM produtos")->fetchAll();\nforeach ($produtos as $p) echo "<li>{$p['nome']}</li>";`,
  },
  {
    nome: "React Native", uso: "Apps para Android e iOS com um só código.", tipo: "Mobile",
    descricao: "Cria aplicativos nativos para Android e iPhone a partir do mesmo código, usando React. Sai mais barato do que fazer dois apps separados.",
    quando: ["App publicado nas lojas", "Uso de câmera, GPS ou notificações", "Mesmo app em Android e iOS"],
    vantagens: ["Um código, duas plataformas", "Desempenho de app nativo", "Atualizações mais rápidas"],
    projetos: ["Apps"],
    exemplo: `export default function Inicio() {\n  return (\n    <View><Text>Olá, cliente!</Text></View>\n  );\n}`,
  },
  {
    nome: "SQL", uso: "Bancos de dados como MySQL e PostgreSQL.", tipo: "Banco de dados",
    descricao: "Linguagem para guardar e consultar dados: clientes, pedidos, agendamentos. Uso principalmente PostgreSQL e MySQL, conforme a hospedagem do projeto.",
    quando: ["Cadastro de clientes e pedidos", "Agendamentos", "Relatórios e painéis"],
    vantagens: ["Dados organizados e seguros", "Consultas rápidas", "Padrão em todo o mercado"],
    projetos: ["Sites", "Apps"],
    exemplo: `SELECT cliente, SUM(total) AS gasto\nFROM pedidos\nGROUP BY cliente\nORDER BY gasto DESC;`,
  },
];
