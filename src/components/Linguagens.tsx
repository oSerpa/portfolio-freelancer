import Titulo from "./Titulo";
import { linguagens } from "@/data/conteudo";

export default function Linguagens() {
  return (
    <section id="linguagens" className="border-y border-borda/60 bg-superficie/40">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <Titulo rotulo="Linguagens" titulo="Tecnologias que posso usar no seu projeto" texto="Escolho a ferramenta certa para cada caso, pensando em custo, velocidade e facilidade de manutenção." />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {linguagens.map((l) => (
            <div key={l.nome} className="rounded-xl border border-borda bg-fundo p-4">
              <h3 className="font-display font-semibold">{l.nome}</h3>
              <p className="mt-1 text-sm text-suave">{l.uso}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
