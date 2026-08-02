import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlowSection } from "@/components/ui/GlowSection";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Antrix — Precision Machine Vision & Mechatronics",
  description:
    "Antrix builds machine vision and mechatronics systems that give industries the ability to see, measure, and act with a level of precision no human process can consistently deliver.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <GlowSection className="pt-[72px]">
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl py-2xl">
          <Eyebrow>WHO WE ARE</Eyebrow>
          <h1 className="text-[36px] md:text-[64px] font-extrabold leading-[1.05] tracking-tighter max-w-[1180px]">
            We Exist to Make
            <br />
            Precision Inevitable.
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-lg max-w-[1100px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              Most industries still rely on human judgment for tasks that
              demand a level of precision humans were never built to sustain.
              The margin for error is shrinking. The cost of being wrong is
              rising.
            </p>
            <p className="mt-md max-w-[1100px] text-[18px] md:text-[22px] font-semibold text-white">
              Antrix exists to close that gap.
            </p>
          </Reveal>
        </div>
      </GlowSection>

      <section className="relative z-10 py-2xl md:py-3xl bg-bg-secondary">
        <div className="max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>MISSION</Eyebrow>
            <p className="max-w-[1180px] text-[18px] md:text-[22px] leading-[1.7] text-white/90">
              We build machine vision and mechatronics systems that give
              industries the ability to see, measure, and act with a level of
              precision that no human process can consistently deliver.
            </p>
            <p className="mt-md text-[18px] md:text-[22px] font-semibold text-white">
              Not approximately. Not close enough. Exact.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-2xl md:py-3xl">
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>PHILOSOPHY</Eyebrow>
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-display leading-[1.2] max-w-[1180px]">
              What We Believe.
            </h2>
            <div className="mt-lg max-w-[1180px] space-y-sm text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              <p>
                We believe precision is not a luxury — it is a baseline.
              </p>
              <p>
                We believe the physical world deserves the same level of
                intelligent engineering that the digital world takes for
                granted.
              </p>
              <p>
                We believe that when a system is built right, it does not
                need to be watched, corrected, or second-guessed.
              </p>
            </div>
            <p className="mt-md text-[18px] font-semibold text-white">
              That is the standard we build to. Every time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 py-2xl md:py-3xl bg-bg-secondary">
        <div className="max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>WHAT WE BUILD</Eyebrow>
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-display leading-[1.2] max-w-[1180px] mb-lg">
              Antrix designs and engineers two things.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <Reveal delay={0.05}>
              <div className="border border-border rounded-lg p-lg h-full bg-bg-elevated">
                <h3 className="text-[20px] font-semibold tracking-display">
                  Products
                </h3>
                <p className="mt-sm text-[15px] leading-[1.7] text-text-secondary">
                  Precision systems built for specific industry problems,
                  packaged and ready to deploy. Antrix Measure is our
                  flagship — automated dimensional measurement for cut
                  diamonds at ±0.02mm accuracy.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border border-border rounded-lg p-lg h-full bg-bg-elevated">
                <h3 className="text-[20px] font-semibold tracking-display">
                  Custom Solutions
                </h3>
                <p className="mt-sm text-[15px] leading-[1.7] text-text-secondary">
                  If your industry has a measurement, inspection, sorting, or
                  automation problem that off-the-shelf tools cannot solve —
                  we build it from the ground up. Machine vision.
                  Mechatronics. Complete systems. Any industry.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-2xl md:py-3xl">
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>VISION</Eyebrow>
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-display leading-[1.2] max-w-[1180px]">
              Where We Are Going.
            </h2>
            <p className="mt-lg max-w-[1100px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              Every industry that touches the physical world has a precision
              problem waiting to be solved.
            </p>
            <p className="mt-md max-w-[1100px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              Antrix is building the systems to solve them — one product, one
              solution, one industry at a time.
            </p>
            <p className="mt-md text-[18px] md:text-[22px] font-semibold text-white">
              We are not building for today&apos;s problems.
              <br />
              We are built for what&apos;s next.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 py-2xl md:py-3xl bg-bg-secondary border-y border-border">
        <div className="max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>FOUNDER</Eyebrow>
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-display">
              Dhruv Jasani
            </h2>
            <p className="mt-xs text-[15px] text-text-secondary">
              Founder, Antrix
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-2xl md:py-3xl">
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl text-center">
          <Reveal>
            <p className="text-[18px] md:text-[22px] text-white/90">
              Based in Surat, Gujarat, India.
              <br />
              Building for the world.
            </p>
            <div className="mt-xl flex flex-wrap justify-center gap-md">
              <Button href="/antrix-measure" arrow>
                See Our Products
              </Button>
              <Button href="/#contact" variant="ghost">
                Work With Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
