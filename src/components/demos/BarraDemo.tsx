import Link from "next/link";
import { linkWhatsApp } from "@/data/site";

// Faixa no topo de toda demo, lembrando que é um modelo e levando de volta ao site principal.
export default function BarraDemo({ nome }: { nome: string }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-[#0b1020] px-4 py-2 text-xs text-[#e8ecf7] sm:text-sm">
      <Link href="/#modelos" className="shrink-0 hover:text-[#b6f35c]">← Voltar</Link>
      <span className="hidden truncate text-[#9aa6c4] sm:block">Modelo de demonstração feito por serpa.dev. Nomes e dados são fictícios.</span>
      <a
        href={linkWhatsApp(`Olá, Serpa! Vi o modelo "${nome}" no seu site e quero um projeto parecido.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-full bg-[#b6f35c] px-3 py-1 font-semibold text-[#0b1020]"
      >
        Quero um assim
      </a>
    </div>
  );
}
