import Logo from "./Logo";
import { navegacao } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-borda/60 bg-fundo/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden gap-6 text-sm text-suave md:flex">
          {navegacao.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-texto">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#orcamento"
          className="rounded-full bg-destaque px-4 py-2 text-sm font-semibold text-fundo transition hover:bg-destaque-escuro"
        >
          Pedir orçamento
        </a>
      </div>
    </header>
  );
}
