import TextoRevelado from "./fx/TextoRevelado";
import FormOrcamento from "./FormOrcamento";
import { site, linkWhatsApp } from "@/data/site";

const canais = [
  { nome: "WhatsApp", valor: site.whatsappExibicao, href: linkWhatsApp(), externo: true },
  { nome: "E-mail", valor: site.email, href: `mailto:${site.email}`, externo: false },
  { nome: "GitHub", valor: "@" + site.github.split("/").pop(), href: site.github, externo: true },
];

export default function Contato() {
  return (
    <section id="orcamento" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
      <p className="rotulo text-cinza">(06) Orçamento</p>
      <TextoRevelado
        className="font-display mt-6 text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
        linhas={[{ texto: "Vamos" }, { texto: "conversar?", className: "text-brasa" }]}
      />
      <div className="mt-20 grid gap-16 lg:grid-cols-[1.6fr_1fr]">
        <FormOrcamento />
        <div>
          <p className="rotulo mb-4 text-cinza">Ou fale direto</p>
          <ul className="border-t border-linha">
            {canais.map((c) => (
              <li key={c.nome}>
                <a href={c.href} {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center justify-between gap-4 border-b border-linha py-6">
                  <span>
                    <span className="rotulo block text-cinza">{c.nome}</span>
                    <span className="font-display mt-1 block break-all text-lg transition-colors group-hover:text-brasa sm:text-xl md:text-2xl">{c.valor}</span>
                  </span>
                  <span className="text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brasa">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
