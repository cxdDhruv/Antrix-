import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-2xl md:py-3xl theme-light"
    >
      <AmbientBackground variant="light" />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <Eyebrow>WHO WE ARE</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1] max-w-[720px]">
            We build systems that see, measure, and act with total precision.
          </h2>
          <p className="mt-lg max-w-[640px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Antrix engineers intelligent precision systems for the physical
            world. From flagship products to fully custom builds, we solve
            problems that demand more than human eyes can deliver.
          </p>
          <p className="mt-md text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Based in Surat, Gujarat, India. Built for the world.
          </p>
          <div className="mt-lg">
            <Button href="/about" variant="ghost" arrow>
              More About Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
