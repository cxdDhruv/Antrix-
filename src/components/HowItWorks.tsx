import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

const steps = [
  {
    num: "01",
    title: "UNDERSTAND",
    body: "We start by understanding your process, your tolerances, and exactly where precision is breaking down.",
  },
  {
    num: "02",
    title: "ENGINEER",
    body: "Our team designs the vision pipeline, mechanical system, and software stack, built specifically for your environment.",
  },
  {
    num: "03",
    title: "DEPLOY",
    body: "We deploy, calibrate, and validate on-site. Your team gets a system that works from day one.",
  },
  {
    num: "04",
    title: "SUPPORT",
    body: "We don't disappear after delivery. Antrix stands behind every system we build.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-2xl md:py-3xl theme-light">
      <AmbientBackground variant="light" />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <Eyebrow>THE PROCESS</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
            From Problem to
            <br />
            Precision System.
          </h2>
        </Reveal>

        <div className="mt-xl grid grid-cols-1 md:grid-cols-4 gap-lg">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="tech-sheen step-hover border-t border-border pt-md">
                <span className="font-mono text-[13px] text-text-muted">
                  STEP {step.num}
                </span>
                <h3 className="mt-xs text-[18px] font-semibold tracking-display">
                  {step.title}
                </h3>
                <p className="mt-sm text-[15px] leading-[1.7] text-text-secondary">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
