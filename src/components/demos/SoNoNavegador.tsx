"use client";

import { useEffect, useState } from "react";

// Renderiza o conteúdo só depois de carregar no navegador (evita diferença de datas entre servidor e cliente).
export default function SoNoNavegador({ children }: { children: React.ReactNode }) {
  const [pronto, setPronto] = useState(false);
  useEffect(() => setPronto(true), []);
  return pronto ? <>{children}</> : <div className="min-h-[calc(100vh-32px)] animate-pulse bg-neutral-900/5" />;
}
