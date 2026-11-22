export default function Titulo({ rotulo, titulo, texto }: { rotulo: string; titulo: string; texto?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-destaque">{rotulo}</p>
      <h2 className="font-display text-3xl font-bold md:text-4xl">{titulo}</h2>
      {texto && <p className="mt-4 text-suave">{texto}</p>}
    </div>
  );
}
