// Lista das páginas de demonstração do carrossel. Todos os nomes e dados são fictícios.
export type Demo = { slug: string; marca: string };

export const demos: Demo[] = [
  { slug: "curso", marca: "Código do Zero" },
  { slug: "clinica", marca: "Lumière Estética" },
  { slug: "delivery", marca: "Rangô" },
  { slug: "advocacia", marca: "Albuquerque & Rocha Advogados" },
  { slug: "restaurante", marca: "Cantina Nonna" },
  { slug: "fotografo", marca: "Estúdio Lente" },
  { slug: "barbearia", marca: "Navalha Agenda" },
  { slug: "financas", marca: "Bolso" },
  { slug: "tarefas", marca: "Quadro" },
];

export function buscarDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
