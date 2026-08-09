import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Check } from "lucide-react";

const specs = [
  "±0.02mm Measurement Accuracy",
  "9 Cut Types — Round + 8 Fancy Cuts",
  "Single & Multi-Stone Measurement",
  "LED-Guided Bin Placement",
  "Automatic Shape Classification",
  "High-Precision Optical Calibration",
  "Desktop Application Interface",
];

export function Products() {
  return (
    <section
      id="products"
      className="relative overflow-hidden py-2xl md:py-3xl bg-bg-secondary"
    >
      <AmbientBackground variant="dark" />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <Eyebrow>OUR PRODUCTS</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
            Precision, Packaged.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-xl">
          <div className="tech-sheen card-hover border border-border rounded-lg bg-bg-elevated p-lg md:p-xl">
            <span className="inline-block font-mono text-[11px] uppercase tracking-eyebrow text-text-muted border border-border rounded px-3 py-1">
              FLAGSHIP PRODUCT
            </span>

            <h3 className="mt-md text-[28px] md:text-[36px] font-bold tracking-display">
              Antrix Measure
            </h3>

            <p className="mt-sm text-[16px] md:text-[18px] text-white/90">
              Automated dimensional measurement for cut diamonds.
              ±0.02mm accuracy. Zero human error.
            </p>

            <p className="mt-md max-w-[720px] text-[16px] leading-[1.7] text-text-secondary">
              Antrix Measure is an automated machine vision system that
              measures the precise dimensions of cut diamonds across 9 cut
              types — faster, more accurately, and more consistently than
              any manual process. Built for diamond processors, sorters, and
              quality labs that need measurement data they can trust
              completely.
            </p>

            <ul className="mt-lg grid grid-cols-1 md:grid-cols-2 gap-sm max-w-[720px]">
              {specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-2 text-[15px] text-text-secondary"
                >
                  <Check size={16} className="mt-1 shrink-0 text-white" />
                  {spec}
                </li>
              ))}
            </ul>

            <div className="mt-xl flex flex-wrap gap-md">
              <Button href="/antrix-measure" arrow>
                Learn More About Antrix Measure
              </Button>
              <Button href="/#contact" variant="ghost">
                Request a Demo
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
