import Titulo from "./Titulo";
import { site, linkWhatsApp } from "@/data/site";

const canais = [
  { nome: "WhatsApp", valor: site.whatsappExibicao, href: linkWhatsApp(), externo: true },
  { nome: "E-mail", valor: site.email, href: `mailto:${site.email}`, externo: false },
  { nome: "GitHub", valor: site.github.replace("https://", ""), href: site.github, externo: true },
];

export default function Contato() {
  return (
    <section id="orcamento" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <Titulo rotulo="Orçamento" titulo="Vamos tirar sua ideia do papel" texto="Me chame pelo canal que preferir. O formulário de orçamento entra aqui na próxima etapa." />
      <div className="grid gap-4 md:grid-cols-3">
        {canais.map((c) => (
          <a
            key={c.nome}
            href={c.href}
            {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group rounded-2xl border border-borda bg-superficie p-6 transition hover:border-destaque"
          >
            <p className="text-sm text-suave">{c.nome}</p>
            <p className="mt-1 break-all font-display text-lg font-semibold group-hover:text-destaque">{c.valor}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
