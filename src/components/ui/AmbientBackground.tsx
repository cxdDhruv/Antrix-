export function AmbientBackground({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const b1 = variant === "light" ? "bg-black/[0.05]" : "bg-white/[0.06]";
  const b2 = variant === "light" ? "bg-black/[0.04]" : "bg-white/[0.045]";
  const b3 = variant === "light" ? "bg-black/[0.03]" : "bg-white/[0.03]";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full ${b1} blur-[120px]`}
        style={{ animation: "blob-float-1 24s ease-in-out infinite" }}
      />
      <div
        className={`absolute -bottom-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full ${b2} blur-[110px]`}
        style={{ animation: "blob-float-2 28s ease-in-out infinite" }}
      />
      <div
        className={`absolute top-[30%] left-[38%] w-[35vw] h-[35vw] rounded-full ${b3} blur-[100px]`}
        style={{ animation: "blob-float-3 20s ease-in-out infinite" }}
      />
    </div>
  );
}
