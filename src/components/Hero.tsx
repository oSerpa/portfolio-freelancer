"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import TextoRevelado from "./fx/TextoRevelado";
import Magnetico from "./fx/Magnetico";
import CodigoAoVivo from "./CodigoAoVivo";
import { site, linkWhatsApp } from "@/data/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitulo = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacidade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function luz(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={luz}
      className="relative overflow-hidden pt-16 [--mx:70%] [--my:30%]"
    >
      {/* grid de fundo com luz que segue o mouse */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-linha)_1px,transparent_1px),linear-gradient(90deg,var(--color-linha)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_var(--mx)_var(--my),rgba(255,77,28,.16),transparent_60%)]" />

      <motion.div style={{ y: yTitulo, opacity: opacidade }} className="relative mx-auto max-w-[1400px] px-5 pb-20 pt-14 md:px-8 md:pt-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="rotulo flex flex-wrap items-center gap-x-6 gap-y-2 text-cinza">
          <span>Desenvolvedor freelancer</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            Agenda aberta para novos projetos
          </span>
        </motion.div>

        <TextoRevelado
          comoTitulo
          atraso={0.3}
          className="font-display mt-8 text-[clamp(2.75rem,8.5vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]"
          linhas={[
            { texto: "Sites que fazem" },
            { texto: "seu negócio" },
            { texto: "ser lembrado.", className: "text-brasa" },
          ]}
        />

        <div className="mt-14 grid items-end gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_1.15fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
            <p className="max-w-md text-lg leading-relaxed text-papel/70">{site.descricao}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Magnetico>
                <a href="#orcamento" className="group relative inline-flex items-center gap-3 overflow-hidden bg-brasa px-7 py-4 font-semibold text-tinta">
                  <span className="absolute inset-0 -translate-x-full bg-papel transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">Pedir orçamento</span>
                  <span className="relative transition-transform group-hover:translate-x-1">→</span>
                </a>
              </Magnetico>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="rotulo border-b border-cinza pb-1 text-papel transition hover:border-brasa hover:text-brasa">
                Chamar no WhatsApp
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <CodigoAoVivo />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
