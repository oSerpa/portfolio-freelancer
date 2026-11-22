import Logo from "./Logo";
import { site, linkWhatsApp } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-borda/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-suave md:flex-row">
        <Logo />
        <div className="flex gap-5">
          <a href={`mailto:${site.email}`} className="hover:text-texto">E-mail</a>
          <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="hover:text-texto">WhatsApp</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-texto">GitHub</a>
        </div>
        <p>© {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
