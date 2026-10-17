export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`text-[15px] md:text-[17px] font-semibold text-text-secondary mb-sm ${className}`}
    >
      {children}
    </p>
  );
}
