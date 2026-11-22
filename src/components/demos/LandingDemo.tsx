import type { DemoLanding } from "@/data/demos";
import Contagem from "./Contagem";

export default function LandingDemo({ d }: { d: DemoLanding }) {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <span className="font-display text-lg font-bold">{d.marca}</span>
        <a href="#cta" className="rounded-full bg-[var(--p)] px-4 py-2 text-sm font-semibold text-white">{d.cta}</a>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-20 pt-12 text-center md:pt-20">
        <span className="inline-block rounded-full border border-[var(--p)] px-3 py-1 text-xs font-medium text-[var(--p)]">{d.selo}</span>
        <h1 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{d.titulo}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--mu)]">{d.subtitulo}</p>
        {d.contagem && <div className="flex justify-center"><Contagem /></div>}
        <a href="#cta" className="mt-10 inline-block rounded-full bg-[var(--p)] px-8 py-4 font-semibold text-white shadow-lg transition hover:opacity-90">{d.cta}</a>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 pb-20 md:grid-cols-3">
        {d.beneficios.map((b) => (
          <div key={b.t} className="rounded-2xl bg-[var(--card)] p-6">
            <div className="mb-4 h-10 w-10 rounded-lg bg-[var(--p)] opacity-80" />
            <h3 className="font-display text-lg font-semibold">{b.t}</h3>
            <p className="mt-2 text-sm text-[var(--mu)]">{b.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <h2 className="font-display mb-8 text-center text-3xl font-bold">Quem já experimentou</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {d.depoimentos.map((t) => (
            <blockquote key={t.nome} className="rounded-2xl border border-[var(--card)] p-6">
              <p className="text-lg">“{t.texto}”</p>
              <footer className="mt-4 text-sm text-[var(--mu)]">{t.nome}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="font-display mb-8 text-center text-3xl font-bold">Perguntas frequentes</h2>
        <div className="space-y-3">
          {d.faq.map((f) => (
            <details key={f.p} className="group rounded-xl bg-[var(--card)] p-5">
              <summary className="cursor-pointer list-none font-semibold">
                {f.p} <span className="float-right text-[var(--p)] group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[var(--mu)]">{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="cta" className="bg-[var(--p)] px-5 py-16 text-center text-white">
        <h2 className="font-display text-3xl font-bold">Pronto para começar?</h2>
        <button className="mt-6 rounded-full bg-white px-8 py-4 font-semibold text-black">{d.cta}</button>
      </section>
    </>
  );
}
