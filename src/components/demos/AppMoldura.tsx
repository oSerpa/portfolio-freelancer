// Moldura comum dos apps: barra lateral no desktop, barra superior no celular.
export default function AppMoldura({ marca, menu, ativo, children }: { marca: string; menu: string[]; ativo: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-40px)] flex-col md:flex-row">
      <aside className="flex items-center gap-4 border-b border-[var(--card)] px-5 py-4 md:w-56 md:flex-col md:items-stretch md:border-b-0 md:border-r">
        <span className="font-display text-lg font-bold text-[var(--p)]">{marca}</span>
        <nav className="flex gap-1 overflow-x-auto text-sm md:mt-6 md:flex-col">
          {menu.map((m) => (
            <span key={m} className={`whitespace-nowrap rounded-lg px-3 py-2 ${m === ativo ? "bg-[var(--card)] font-semibold" : "text-[var(--mu)]"}`}>{m}</span>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1 p-5 md:p-8">{children}</div>
    </div>
  );
}
