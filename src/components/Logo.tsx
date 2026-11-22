export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#inicio" className={`font-mono text-sm font-medium tracking-tight ${className}`}>
      serpa<span className="text-brasa">.</span>dev<span className="animate-pisca text-brasa">_</span>
    </a>
  );
}
