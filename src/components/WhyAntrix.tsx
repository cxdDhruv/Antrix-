import { Reveal } from "@/components/ui/Reveal";

const points = [
  {
    title: "Precision as a baseline.",
    body: 'Not "approximately." Not "close enough." Every system is engineered to a hard precision spec.',
    wide: true,
  },
  {
    title: "Hardware + software, together.",
    body: "Optics, mechanics, electronics and software engineered as one unit.",
  },
  {
    title: "Built for real environments.",
    body: "Real lighting, real vibration, real operators. Not lab conditions.",
  },
  {
    title: "India-made. World-class.",
    body: "Engineered in Surat. Built to global precision standards.",
    wide: true,
  },
];

export function WhyAntrix() {
  return (
    <section className="bg-black py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <p className="text-[15px] md:text-[17px] font-semibold text-text-secondary">
            Why Antrix
          </p>
          <h2 className="mt-xs text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1]">
            The difference between
            <br />
            <span className="text-white/40">good and exact.</span>
          </h2>
        </Reveal>

        <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
          {points.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className={p.wide ? "md:col-span-2" : ""}
            >
              <div className="group relative h-full min-h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0d] p-lg md:p-xl flex flex-col justify-end transition-colors duration-500 hover:border-white/30">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <h3 className="relative text-[28px] md:text-[40px] font-semibold tracking-tighter leading-[1.1]">
                  {p.title}
                </h3>
                <p className="relative mt-sm max-w-[480px] text-[16px] md:text-[17px] leading-[1.6] text-text-secondary">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
