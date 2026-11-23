"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Acordeao, CtaFixo, Surgir } from "../ui";

const modulos = [
  { t: "Fundamentos da web", aulas: 12, d: "Como a internet funciona, HTML semântico e CSS do zero." },
  { t: "JavaScript na prática", aulas: 18, d: "Lógica, funções, DOM e seus primeiros projetos interativos." },
  { t: "Git e GitHub", aulas: 6, d: "Versionamento, branches e como montar um portfólio que chama atenção." },
  { t: "React", aulas: 16, d: "Componentes, estado, hooks e consumo de APIs." },
  { t: "Back-end com Node.js", aulas: 14, d: "APIs REST, banco de dados e autenticação." },
  { t: "Carreira", aulas: 8, d: "Currículo, LinkedIn, entrevistas técnicas e primeira vaga." },
];

function Contagem() {
  const [resto, setResto] = useState<number | null>(null);
  useEffect(() => {
    const ciclo = 3 * 86400000;
    const tick = () => setResto(ciclo - (Date.now() % ciclo));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor((resto ?? 0) / 1000);
  const partes = [[Math.floor(s / 86400), "dias"], [Math.floor((s % 86400) / 3600), "horas"], [Math.floor((s % 3600) / 60), "min"], [s % 60, "seg"]] as const;
  return (
    <div className="flex gap-2">
      {partes.map(([v, r]) => (
        <div key={r} className="w-16 rounded-lg border border-white/10 bg-white/5 py-2 text-center">
          <div className="text-2xl font-bold tabular-nums">{resto === null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/50">{r}</div>
        </div>
      ))}
    </div>
  );
}

function Player() {
  const [tocando, setTocando] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#15112a] shadow-[0_40px_120px_-30px_rgba(139,92,246,.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-white/60">
        <span className="h-2 w-2 rounded-full bg-red-500" /> Aula 01 · Sua primeira página no ar
      </div>
      <div className="relative aspect-video bg-[radial-gradient(circle_at_30%_30%,#4c1d95,transparent_60%),radial-gradient(circle_at_80%_70%,#1e3a8a,transparent_55%)]">
        <pre className="absolute left-5 top-5 font-mono text-[11px] leading-relaxed text-violet-200/80 sm:text-xs">
{`<h1>Olá, mundo!</h1>
<style>
  h1 { color: violet; }
</style>`}
        </pre>
        <button onClick={() => setTocando(!tocando)} className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#15112a] shadow-xl transition hover:scale-110" aria-label="Assistir aula">
          {tocando ? "❚❚" : "▶"}
        </button>
      </div>
      <div className="px-4 py-3">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full bg-violet-500" animate={{ width: tocando ? "100%" : "18%" }} transition={{ duration: tocando ? 20 : 0.4, ease: "linear" }} />
        </div>
      </div>
    </div>
  );
}

export default function Curso() {
  const [aberto, setAberto] = useState(0);
  return (
    <div className="bg-[#0c0a14] font-[family-name:var(--f-grotesk)] text-white">
      <div className="bg-yellow-300 px-4 py-2 text-center text-sm font-semibold text-black">Turma de janeiro: últimas vagas com bônus de mentoria</div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-lg font-bold">{"</>"} Código do Zero</span>
        <nav className="hidden gap-7 text-sm text-white/60 md:flex">
          <a href="#grade" className="hover:text-white">Grade</a>
          <a href="#instrutor" className="hover:text-white">Instrutor</a>
          <a href="#faq" className="hover:text-white">Dúvidas</a>
        </nav>
        <a href="#cta" className="rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold transition hover:bg-violet-400">Quero entrar</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" /> Inscrições abertas
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            De zero a <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">desenvolvedor</span> em 12 semanas.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6 max-w-lg text-lg text-white/65">
            Aulas práticas, 5 projetos reais no seu portfólio e mentoria ao vivo toda semana para você não travar no caminho.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#cta" className="rounded-full bg-violet-500 px-7 py-4 font-semibold shadow-[0_10px_40px_-10px_rgba(139,92,246,.8)] transition hover:-translate-y-0.5 hover:bg-violet-400">Garantir minha vaga</a>
            <div className="text-sm text-white/50">Oferta acaba em</div>
            <Contagem />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Player />
        </motion.div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 text-center md:grid-cols-4">
          {[["74", "aulas gravadas"], ["5", "projetos no portfólio"], ["12", "semanas de conteúdo"], ["Vitalício", "acesso às aulas"]].map(([n, r]) => (
            <Surgir key={r}><div className="text-3xl font-bold text-violet-300">{n}</div><div className="mt-1 text-sm text-white/55">{r}</div></Surgir>
          ))}
        </div>
      </section>

      <section id="grade" className="mx-auto max-w-6xl px-5 py-24">
        <Surgir><h2 className="text-3xl font-bold md:text-5xl">O que você vai aprender</h2></Surgir>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            {modulos.map((m, i) => (
              <button key={m.t} onClick={() => setAberto(i)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${aberto === i ? "border-violet-400 bg-violet-500/10" : "border-white/10 hover:border-white/25"}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${aberto === i ? "bg-violet-500" : "bg-white/5"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-semibold">{m.t}</span>
                <span className="text-sm text-white/45">{m.aulas} aulas</span>
              </button>
            ))}
          </div>
          <motion.div key={aberto} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-fit rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-transparent p-8 lg:sticky lg:top-16">
            <p className="text-sm uppercase tracking-widest text-violet-300">Módulo {aberto + 1}</p>
            <h3 className="mt-3 text-3xl font-bold">{modulos[aberto].t}</h3>
            <p className="mt-4 text-white/70">{modulos[aberto].d}</p>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              {Array.from({ length: 4 }, (_, k) => <li key={k} className="flex items-center gap-3"><span className="text-violet-400">▶</span> Aula {k + 1} de {modulos[aberto].aulas}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="instrutor" className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir className="grid items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[200px_1fr] md:p-12">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-6xl font-bold">RM</div>
          <div>
            <p className="text-sm uppercase tracking-widest text-violet-300">Seu instrutor</p>
            <h3 className="mt-2 text-3xl font-bold">Rafael Moura</h3>
            <p className="mt-4 max-w-2xl text-white/65">Desenvolvedor há 10 anos, já liderou times em startups e ensina programação do jeito que gostaria de ter aprendido: direto ao ponto e com projeto de verdade.</p>
          </div>
        </Surgir>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir><h2 className="text-3xl font-bold md:text-5xl">Quem já passou por aqui</h2></Surgir>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[["Ana, turma 3", "Saí do zero e em quatro meses consegui meu estágio."], ["Bruno, turma 5", "As mentorias fizeram toda a diferença para não desistir."], ["Carla, turma 4", "Os projetos do curso foram o que mais chamou atenção nas entrevistas."]].map(([n, t], i) => (
            <Surgir key={n} atraso={i * 0.1} className="rounded-2xl border border-white/10 p-6">
              <div className="text-yellow-300">★★★★★</div>
              <p className="mt-4 text-lg">“{t}”</p>
              <p className="mt-4 text-sm text-white/50">{n}</p>
            </Surgir>
          ))}
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-6xl px-5 pb-24">
        <Surgir className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 text-center md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <p className="text-sm uppercase tracking-widest text-white/80">Inscrição com desconto</p>
          <div className="mt-4 text-white/70 line-through">12x de R$ 149</div>
          <div className="text-5xl font-bold md:text-7xl">12x de R$ 97</div>
          <p className="mt-3 text-white/80">ou R$ 997 à vista no Pix</p>
          <button className="mt-8 rounded-full bg-white px-10 py-4 font-bold text-violet-700 transition hover:scale-105">Garantir minha vaga</button>
          <p className="mt-4 text-sm text-white/80">Garantia incondicional de 7 dias</p>
        </Surgir>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 pb-28">
        <h2 className="mb-6 text-3xl font-bold">Perguntas frequentes</h2>
        <Acordeao corLinha="border-white/10" itens={[
          { p: "Preciso saber alguma coisa antes?", r: "Não. O curso começa do absoluto zero, explicando cada conceito." },
          { p: "Por quanto tempo tenho acesso?", r: "O acesso às aulas gravadas é vitalício, incluindo atualizações." },
          { p: "Como funcionam as mentorias?", r: "Encontros ao vivo toda quinta à noite, com gravação disponível depois." },
          { p: "Tem certificado?", r: "Sim, certificado de conclusão com carga horária de 120 horas." },
        ]} />
      </section>
      <CtaFixo texto="Garantir minha vaga" className="rounded-full bg-violet-500 text-white" />
    </div>
  );
}
