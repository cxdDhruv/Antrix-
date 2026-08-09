import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

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

export function Industries() {
  const loop = [...industries, ...industries];

  return (
    <section className="relative py-2xl md:py-3xl bg-bg-secondary overflow-hidden">
      <AmbientBackground variant="dark" />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <Eyebrow>WHO WE SERVE</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
            Any Industry.
            <br />
            Any Problem.
          </h2>
          <p className="mt-lg max-w-[640px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Our systems are built for industries where precision is not a
            preference. It&apos;s a requirement. If your process involves
            measurement, inspection, sorting, or automation of physical
            objects, Antrix can engineer a solution for it.
          </p>
          <p className="mt-md max-w-[640px] text-[16px] md:text-[18px] font-semibold text-white">
            Whatever your industry, we can build the machine vision and
            mechatronics solution for it.
          </p>
        </Reveal>
      </div>

      <div className="relative z-10 mt-xl">
        <div className="flex w-max ticker-track">
          {loop.map((industry, i) => (
            <div
              key={`${industry}-${i}`}
              className="flex items-center px-md whitespace-nowrap text-[16px] md:text-[20px] text-text-secondary"
            >
              {industry}
              <span className="mx-md text-text-muted">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
