import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demos, buscarDemo } from "@/data/demos";
import BarraDemo from "@/components/demos/BarraDemo";
import LandingDemo from "@/components/demos/LandingDemo";
import SiteDemo from "@/components/demos/SiteDemo";
import AppBarbearia from "@/components/demos/AppBarbearia";
import AppFinancas from "@/components/demos/AppFinancas";
import AppTarefas from "@/components/demos/AppTarefas";
import { temaEstilo } from "@/components/demos/temaEstilo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = buscarDemo((await params).slug);
  return { title: d ? `${d.marca} | Modelo serpa.dev` : "Modelo não encontrado" };
}

const apps = { barbearia: AppBarbearia, financas: AppFinancas, tarefas: AppTarefas };

export default async function PaginaDemo({ params }: Props) {
  const d = buscarDemo((await params).slug);
  if (!d) notFound();

  let conteudo: React.ReactNode;
  if (d.tipo === "landing") conteudo = <LandingDemo d={d} />;
  else if (d.tipo === "site") conteudo = <SiteDemo d={d} />;
  else {
    const App = apps[d.app];
    conteudo = <App marca={d.marca} />;
  }

  return (
    <div style={temaEstilo(d.tema)} className="min-h-screen bg-[var(--bg)] text-[var(--tx)]">
      <BarraDemo nome={d.marca} />
      {conteudo}
    </div>
  );
}
