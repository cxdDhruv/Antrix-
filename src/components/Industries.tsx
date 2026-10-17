import { Reveal } from "@/components/ui/Reveal";

const industries = [
  "Diamond Processing",
  "Jewelry Manufacturing",
  "Automotive",
  "Pharmaceuticals",
  "Electronics Assembly",
  "Food & Beverage",
  "Aerospace",
  "Textile",
  "Industrial Automation",
  "Gemology Labs",
];

export function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max ${outline ? "ticker-track-reverse" : "ticker-track"}`}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className={`px-md md:px-lg whitespace-nowrap text-[44px] md:text-[96px] font-semibold tracking-tighter leading-[1.15] ${
              outline ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]" : "text-white"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Industries() {
  const half = Math.ceil(industries.length / 2);
  return (
    <section className="bg-black py-2xl md:py-3xl overflow-hidden">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <p className="text-[15px] md:text-[17px] font-semibold text-text-secondary">
            Who we serve
          </p>
          <h2 className="mt-xs text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1]">
            Any industry.
            <br />
            <span className="text-white/40">Any problem.</span>
          </h2>
          <p className="mt-lg max-w-[620px] text-[17px] md:text-[19px] leading-[1.6] text-text-secondary">
            If your process involves measurement, inspection, sorting or
            automation of physical objects, Antrix can engineer the solution.
          </p>
        </Reveal>
      </div>

      <div className="mt-2xl space-y-sm">
        <Row items={industries.slice(0, half)} />
        <Row items={industries.slice(half)} outline />
      </div>
    </section>
  );
}
