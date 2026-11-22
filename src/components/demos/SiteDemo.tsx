import type { DemoSite } from "@/data/demos";

const ancora = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function SiteDemo({ d }: { d: DemoSite }) {
  return (
    <>
      <header className="border-b border-[var(--card)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-5">
          <span className="font-display text-lg font-bold">{d.marca}</span>
          <nav className="flex gap-5 text-sm text-[var(--mu)]">
            {d.menu.map((m) => (
              <a key={m} href={`#${ancora(m)}`} className="hover:text-[var(--p)]">{m}</a>
            ))}
          </nav>
        </div>
      </header>

      <section id={ancora(d.menu[0])} className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{d.slogan}</h1>
          <p className="mt-5 text-[var(--mu)]">{d.sobre}</p>
          <a href={`#${ancora(d.menu[3])}`} className="mt-8 inline-block rounded-md bg-[var(--p)] px-6 py-3 font-semibold text-white">Fale com a gente</a>
        </div>
        <div className="aspect-[4/3] rounded-2xl bg-[var(--card)] bg-[linear-gradient(135deg,var(--p)_0%,transparent_70%)] opacity-90" />
      </section>

      <section id={ancora(d.menu[1])} className="bg-[var(--card)]">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h2 className="font-display mb-10 text-3xl font-bold">{d.tituloItens}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {d.itens.map((i) => (
              <div key={i.t} className="flex items-start justify-between gap-4 rounded-xl bg-[var(--bg)] p-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">{i.t}</h3>
                  <p className="mt-1 text-sm text-[var(--mu)]">{i.d}</p>
                </div>
                {i.preco && <span className="shrink-0 font-semibold text-[var(--p)]">{i.preco}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {d.galeria && (
        <section id={ancora(d.menu[2])} className="mx-auto max-w-5xl px-5 py-20">
          <h2 className="font-display mb-10 text-3xl font-bold">Trabalhos recentes</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {d.galeria.map((c, i) => (
              <div key={i} className={`rounded-lg ${i % 3 === 0 ? "row-span-2" : ""}`} style={{ background: c, minHeight: 160 }} />
            ))}
          </div>
        </section>
      )}

      {!d.galeria && (
        <section id={ancora(d.menu[2])} className="mx-auto max-w-5xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl font-bold">{d.menu[2]}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--mu)]">Seção pensada para apresentar {d.menu[2].toLowerCase()} com fotos, textos e chamadas para contato.</p>
        </section>
      )}

      <section id={ancora(d.menu[3])} className="bg-[var(--p)] text-white">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 py-16 md:grid-cols-3">
          <div><p className="text-sm opacity-80">Endereço</p><p className="font-semibold">{d.contato.endereco}</p></div>
          <div><p className="text-sm opacity-80">Horário</p><p className="font-semibold">{d.contato.horario}</p></div>
          <div><p className="text-sm opacity-80">Telefone</p><p className="font-semibold">{d.contato.telefone}</p></div>
        </div>
      </section>
    </>
  );
}
