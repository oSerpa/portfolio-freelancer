"use client";

import { useEffect, useState } from "react";

// Hora local de Brasília, atualizada a cada minuto.
export default function Relogio() {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
    const tick = () => setHora(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{hora || "--:--"}</span>;
}
