import Titulo from "./Titulo";
import { servicos } from "@/data/conteudo";

export default function Servicos() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <Titulo rotulo="Serviços" titulo="O que eu faço por você" texto="Do primeiro rascunho até o site no ar, com você acompanhando cada etapa." />
      <div className="grid gap-6 md:grid-cols-3">
        {servicos.map((s) => (
          <article key={s.titulo} className="rounded-2xl border border-borda bg-superficie p-6 transition hover:border-apoio">
            <h3 className="font-display text-xl font-semibold">{s.titulo}</h3>
            <p className="mt-3 text-suave">{s.texto}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {s.itens.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-destaque">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
