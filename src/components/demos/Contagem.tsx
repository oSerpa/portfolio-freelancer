"use client";

import { useEffect, useState } from "react";

// Contagem regressiva que reinicia a cada 3 dias, só para efeito visual na demo.
export default function Contagem() {
  const [resto, setResto] = useState<number | null>(null);

  useEffect(() => {
    const ciclo = 3 * 24 * 60 * 60 * 1000;
    const tick = () => setResto(ciclo - (Date.now() % ciclo));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = Math.floor((resto ?? 0) / 1000);
  const partes = [
    [Math.floor(s / 86400), "dias"],
    [Math.floor((s % 86400) / 3600), "horas"],
    [Math.floor((s % 3600) / 60), "min"],
    [s % 60, "seg"],
  ] as const;

  return (
    <div className="mt-8 flex gap-3">
      {partes.map(([v, r]) => (
        <div key={r} className="w-16 rounded-xl bg-[var(--card)] py-3 text-center">
          <div className="text-2xl font-bold tabular-nums">{resto === null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="text-xs text-[var(--mu)]">{r}</div>
        </div>
      ))}
    </div>
  );
}
