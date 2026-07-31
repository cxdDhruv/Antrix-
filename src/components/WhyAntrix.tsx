import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  {
    num: "01",
    title: "Precision as a Baseline",
    body: 'Not "approximately." Not "close enough." Every system we build is engineered to a hard precision spec — not a best-effort guess.',
  },
  {
    num: "02",
    title: "Hardware + Software, Together",
    body: "We don't just write code for someone else's camera. We engineer the complete system — optics, mechanics, electronics, and software as one unit.",
  },
  {
    num: "03",
    title: "Built for Real Environments",
    body: "Factory floors are not labs. Our systems are designed for real lighting, real vibration, and real operators — not ideal conditions.",
  },
  {
    num: "04",
    title: "India-Made. World-Class.",
    body: "Engineered in Surat. Built to global precision standards. No compromise on quality because of geography.",
  },
];

export function WhyAntrix() {
  return (
    <section className="py-2xl md:py-3xl bg-bg-secondary">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <Eyebrow>WHY ANTRIX</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
            The Difference Between
            <br />
            Good and Exact.
          </h2>
        </Reveal>

        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          {points.map((point, i) => (
            <Reveal key={point.num} delay={i * 0.1}>
              <div className="border border-border rounded-lg p-lg h-full">
                <span className="font-mono text-[13px] text-text-muted">
                  {point.num}
                </span>
                <h3 className="mt-xs text-[20px] font-semibold tracking-display">
                  {point.title}
                </h3>
                <p className="mt-sm text-[15px] leading-[1.7] text-text-secondary">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
