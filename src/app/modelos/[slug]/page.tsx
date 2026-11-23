import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Space_Grotesk, Outfit } from "next/font/google";
import { demos, buscarDemo } from "@/data/demos";
import BarraDemo from "@/components/demos/BarraDemo";
import Curso from "@/components/demos/landing/Curso";
import Clinica from "@/components/demos/landing/Clinica";
import Delivery from "@/components/demos/landing/Delivery";
import Advocacia from "@/components/demos/sites/Advocacia";
import Restaurante from "@/components/demos/sites/Restaurante";
import Fotografo from "@/components/demos/sites/Fotografo";
import AppBarbearia from "@/components/demos/AppBarbearia";
import AppFinancas from "@/components/demos/AppFinancas";
import AppTarefas from "@/components/demos/AppTarefas";

// Fontes extras só das demos, para cada modelo ter personalidade própria.
const serif = Playfair_Display({ variable: "--f-serif", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--f-grotesk", subsets: ["latin"] });
const redonda = Outfit({ variable: "--f-redonda", subsets: ["latin"] });

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = buscarDemo((await params).slug);
  return { title: d ? `${d.marca} | Modelo serpa.dev` : "Modelo não encontrado" };
}

const paginas: Record<string, React.ComponentType> = {
  curso: Curso,
  clinica: Clinica,
  delivery: Delivery,
  advocacia: Advocacia,
  restaurante: Restaurante,
  fotografo: Fotografo,
  barbearia: AppBarbearia,
  financas: AppFinancas,
  tarefas: AppTarefas,
};

export default async function PaginaDemo({ params }: Props) {
  const { slug } = await params;
  const d = buscarDemo(slug);
  const Pagina = paginas[slug];
  if (!d || !Pagina) notFound();

  return (
    <div className={`${serif.variable} ${grotesk.variable} ${redonda.variable} min-h-screen`}>
      <BarraDemo nome={d.marca} />
      <Pagina />
    </div>
  );
}
