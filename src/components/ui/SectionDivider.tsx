type Tone = "black" | "white";

const bgOf = (tone: Tone) => (tone === "white" ? "#ffffff" : "#080808");

export function SectionDivider({ from, to }: { from: Tone; to: Tone }) {
  if (from === to) return null;

  return (
    <div
      aria-hidden
      className="relative h-12 md:h-20"
      style={{ backgroundColor: bgOf(from) }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: bgOf(to),
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </div>
  );
}
