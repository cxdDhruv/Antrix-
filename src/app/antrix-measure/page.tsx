import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MeasureHero } from "@/components/MeasureHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Antrix Measure — Diamond Measurement System | ±0.02mm Accuracy",
  description:
    "Antrix Measure delivers automated dimensional measurement for cut diamonds with ±0.02mm accuracy across 9 cut types. Request a demo.",
  keywords: [
    "diamond measurement system",
    "cut diamond dimensions",
    "diamond grading equipment",
    "automated diamond measurement",
    "Antrix Measure",
  ],
};

const specs = [
  { label: "Measurement Accuracy", value: "±0.02mm" },
  { label: "Supported Cut Types", value: "9 (Round + 8 Fancy Cuts)" },
  { label: "Measurement Mode", value: "Single Stone + Multi-Stone Batch" },
  { label: "Calibration", value: "High-Precision Optical System" },
  { label: "Sorting Output", value: "LED-Guided Bin Placement" },
  { label: "Shape Classification", value: "Automatic (9 Cut Types)" },
  { label: "Interface", value: "Desktop Application" },
];

const features = [
  {
    title: "Industry-Leading Accuracy",
    body: "±0.02mm. That is not a rounded figure — it is a hard engineering specification. 2.5x more precise than the industry standard. Built for buyers who cannot afford to be approximately right.",
  },
  {
    title: "9-Cut Automatic Classification",
    body: "Round, Oval, Pear, Marquise, Princess, Emerald, Cushion, Heart, Radiant — Antrix Measure classifies and measures all 9 cut types automatically. No manual selection required.",
  },
  {
    title: "LED-Guided Bin Sorting",
    body: "Once a stone is measured, an LED lights up on the correct bin — the operator simply places it there. No manual lookup, no guesswork, no sorting errors.",
  },
  {
    title: "Precision Optical Calibration",
    body: "Every measurement session is calibrated by the system itself. Accuracy is maintained regardless of environmental changes, lighting variation, or operator differences.",
  },
  {
    title: "Multi-Stone Batch Measurement",
    body: "Measure multiple stones in a single session. Built for the throughput demands of real diamond processing operations — not just lab demonstrations.",
  },
];

export default function AntrixMeasurePage() {
  return (
    <main>
      <Nav />

      <MeasureHero />

      <section className="py-2xl md:py-3xl bg-bg-secondary">
        <div className="max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <p className="max-w-[760px] text-[18px] md:text-[22px] leading-[1.7] text-white/90">
              The diamond industry runs on precision. A single millimeter of
              error in cut measurement costs money, reputation, and client
              trust.
              <br />
              <br />
              <span className="font-semibold text-white">
                Antrix Measure eliminates that error completely.
              </span>
              <br />
              <br />
              Using advanced machine vision and a precision-calibrated
              optical system, Antrix Measure delivers dimensional
              measurements you can stake your business on.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="specifications" className="py-2xl md:py-3xl scroll-mt-[72px]">
        <div className="max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>SPECIFICATIONS</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              Hard Numbers.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-xl">
            <div className="border border-border rounded-lg overflow-hidden">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex flex-col md:flex-row md:items-center justify-between px-lg py-md ${
                    i !== specs.length - 1 ? "border-b border-border" : ""
                  } ${i % 2 === 0 ? "bg-bg-secondary" : ""}`}
                >
                  <span className="text-[15px] text-text-secondary">
                    {spec.label}
                  </span>
                  <span className="text-[16px] font-semibold text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-2xl md:py-3xl bg-bg-secondary">
        <div className="max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>FEATURES</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              Built to Perform.
            </h2>
          </Reveal>

          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.08}>
                <div className="border border-border rounded-lg p-lg h-full bg-bg-elevated">
                  <h3 className="text-[20px] font-semibold tracking-display">
                    {feature.title}
                  </h3>
                  <p className="mt-sm text-[15px] leading-[1.7] text-text-secondary">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-2xl md:py-3xl border-y border-border">
        <div className="max-w-content mx-auto px-md md:px-xl text-center">
          <Reveal>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1] max-w-[640px] mx-auto">
              See Antrix Measure in Action.
            </h2>
            <p className="mt-lg max-w-[520px] mx-auto text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              A 30-minute live demonstration is the fastest way to understand
              what ±0.02mm accuracy looks like in practice.
            </p>
            <div className="mt-xl flex justify-center">
              <Button href="/#contact" arrow>
                Request a Demo
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
