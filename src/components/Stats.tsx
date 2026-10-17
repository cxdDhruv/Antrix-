import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { to: 0.01, decimals: 2, prefix: "±", suffix: "mm", label: "Measurement accuracy" },
  { to: 9, decimals: 0, prefix: "", suffix: "", label: "Diamond cut types" },
  { to: 8, decimals: 0, prefix: "", suffix: "", label: "Edge detectors benchmarked" },
  { to: 0.26, decimals: 2, prefix: "", suffix: "px", label: "Best-case edge uncertainty" },
];

export function Stats() {
  return (
    <section className="bg-black pb-2xl md:pb-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl grid grid-cols-2 lg:grid-cols-4 gap-y-xl gap-x-md">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div className="text-[44px] md:text-[72px] font-semibold tracking-tighter leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              <CountUp
                to={s.to}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                duration={1.6}
              />
            </div>
            <div className="mt-sm text-[14px] md:text-[15px] text-text-secondary">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
