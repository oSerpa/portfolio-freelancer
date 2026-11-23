import Image from "next/image";

// Miniatura da página de demonstração. Antes era um iframe ao vivo, mas 6 páginas
// rodando ao mesmo tempo deixavam o site pesado. A imagem vem de scripts/gerar-previas.cjs.
export default function Previa({ src, titulo }: { src: string; titulo: string }) {
  const slug = src.split("/").pop();
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-tinta-2">
      <Image
        src={`/previas/${slug}.jpg`}
        alt={`Prévia: ${titulo}`}
        fill
        sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 86vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
