export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-text-muted mb-sm">
      {children}
    </p>
  );
}
