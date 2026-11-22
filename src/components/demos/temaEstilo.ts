import type { CSSProperties } from "react";
import type { Tema } from "@/data/demos";

// Transforma o tema da demo em variáveis CSS usadas pelas classes bg-[var(--p)] etc.
export function temaEstilo(t: Tema): CSSProperties {
  return { "--p": t.primaria, "--bg": t.fundo, "--tx": t.texto, "--mu": t.suave, "--card": t.cartao } as CSSProperties;
}
