export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-text-muted mb-sm ${className}`}
    >
      {children}
    </p>
  );
}
