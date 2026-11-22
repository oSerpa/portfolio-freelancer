import { site, linkWhatsApp, navegacao } from "@/data/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-linha">
      <div className="mx-auto max-w-[1400px] px-5 pt-16 md:px-8">
        <div className="grid gap-10 text-sm md:grid-cols-4">
          <div>
            <p className="rotulo text-cinza">Navegação</p>
            <ul className="mt-4 space-y-2">{navegacao.map((n) => <li key={n.href}><a href={n.href} className="hover:text-brasa">{n.label}</a></li>)}</ul>
          </div>
          <div>
            <p className="rotulo text-cinza">Contato</p>
            <ul className="mt-4 space-y-2">
              <li><a href={`mailto:${site.email}`} className="hover:text-brasa">E-mail</a></li>
              <li><a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="hover:text-brasa">WhatsApp</a></li>
              <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-brasa">GitHub</a></li>
            </ul>
          </div>
          <div className="md:col-span-2 md:text-right">
            <p className="rotulo text-cinza">Feito à mão com Next.js, Tailwind e Motion</p>
            <a href="#inicio" className="rotulo mt-4 inline-block border-b border-cinza pb-1 hover:border-brasa hover:text-brasa">Voltar ao topo ↑</a>
          </div>
        </div>
      </div>
      <p aria-hidden className="font-display mt-12 select-none whitespace-nowrap text-center text-[22vw] font-bold leading-[0.75] tracking-[-0.06em] text-linha">
        serpa<span className="text-brasa">.</span>dev
      </p>
      <div className="rotulo mx-auto flex max-w-[1400px] justify-between px-5 py-6 text-cinza md:px-8">
        <span>© {new Date().getFullYear()} {site.nome}</span>
        <span>{site.cidade}, Brasil</span>
      </div>
    </footer>
  );
}
