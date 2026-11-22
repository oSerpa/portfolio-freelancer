import { site, linkWhatsApp } from "@/data/site";
import Servicos from "@/components/Servicos";
import Modelos from "@/components/Modelos";
import Linguagens from "@/components/Linguagens";
import Contato from "@/components/Contato";

export default function Home() {
  return (
    <>
    <section id="inicio" className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-4 py-20">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-destaque">Desenvolvedor freelancer</p>
      <h1 className="font-display max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
        {site.titulo}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-suave">{site.descricao}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href="#orcamento" className="rounded-full bg-destaque px-6 py-3 font-semibold text-fundo transition hover:bg-destaque-escuro">
          Pedir orçamento
        </a>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-borda px-6 py-3 font-semibold transition hover:border-apoio"
        >
          Falar no WhatsApp
        </a>
      </div>
    </section>
    <Servicos />
    <Modelos />
    <Linguagens />
    <Contato />
    </>
  );
}
