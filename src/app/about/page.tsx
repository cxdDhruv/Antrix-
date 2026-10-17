import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowLink,
  Heading,
  PageHero,
  ScrollWords,
  Section,
} from "@/components/ui/kit";

export const metadata: Metadata = {
  title: "About Antrix | Precision Machine Vision & Mechatronics",
  description:
    "Antrix builds machine vision and mechatronics systems that give industries the ability to see, measure, and act with a level of precision no human process can consistently deliver.",
};

const beliefs = [
  "Precision is not a luxury. It is a baseline.",
  "The physical world deserves the same intelligent engineering the digital world takes for granted.",
  "A system built right doesn't need to be watched, corrected, or second-guessed.",
];

const builds = [
  {
    tag: "Products",
    title: "Packaged precision.",
    body: "Systems built for specific industry problems, ready to deploy. Antrix Measure is our flagship: automated diamond measurement at ±0.01mm.",
    href: "/antrix-measure",
    cta: "Explore Antrix Measure",
  },
  {
    tag: "Custom Solutions",
    title: "Built from the ground up.",
    body: "Measurement, inspection, sorting or automation problems that off-the-shelf tools can't solve. Machine vision. Mechatronics. Any industry.",
    href: "/solutions",
    cta: "See solutions",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <PageHero
        eyebrow="About Antrix"
        lines={["We make precision", "inevitable."]}
        sub="Most industries still rely on human judgment for tasks that demand precision humans were never built to sustain. Antrix exists to close that gap."
      />

      <Section className="!pt-0">
        <ScrollWords
          eyebrow="Mission"
          text="We build machine vision and mechatronics systems that let industries see, measure and act with a precision no human process can consistently deliver. Not approximately. Not close enough. Exact."
        />
      </Section>

      <Section tone="light">
        <Heading eyebrow="Philosophy" title="What we" muted="believe." tone="light" />
        <div className="mt-2xl divide-y divide-black/10 border-y border-black/10">
          {beliefs.map((b, i) => (
            <Reveal key={b} delay={i * 0.08}>
              <div className="grid md:grid-cols-[120px_1fr] gap-sm py-lg md:py-xl">
                <span className="text-[17px] font-semibold text-black/30">0{i + 1}</span>
                <p className="text-[26px] md:text-[44px] font-semibold tracking-tighter leading-[1.15]">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-xl">
          <p className="text-[19px] md:text-[21px] font-semibold">
            That is the standard we build to. Every time.
          </p>
        </Reveal>
      </Section>

      <Section>
        <Heading eyebrow="What we build" title="Two things." muted="Both exact." />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          {builds.map((b, i) => (
            <Reveal key={b.tag} delay={i * 0.1} className="h-full">
              <div className="group relative h-full min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d] p-lg md:p-xl flex flex-col transition-colors duration-500 hover:border-white/30">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <p className="relative text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {b.tag}
                </p>
                <h3 className="relative mt-sm text-[36px] md:text-[52px] font-semibold tracking-tighter leading-[1.05]">
                  {b.title}
                </h3>
                <p className="relative mt-md max-w-[460px] text-[17px] leading-[1.6] text-text-secondary">
                  {b.body}
                </p>
                <div className="relative mt-auto pt-lg">
                  <ArrowLink href={b.href}>{b.cta}</ArrowLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="text-center">
          <p className="text-[15px] md:text-[17px] font-semibold text-text-secondary">
            Vision
          </p>
          <h2 className="mt-sm mx-auto max-w-[1100px] text-[36px] md:text-[72px] font-semibold tracking-tightest leading-[1.05]">
            Every industry that touches the physical world has a precision
            problem <span className="text-white/40">waiting to be solved.</span>
          </h2>
          <p className="mt-lg mx-auto max-w-[620px] text-[17px] md:text-[21px] leading-[1.5] text-text-secondary">
            One product, one solution, one industry at a time. We are not
            building for today&apos;s problems. We are built for what&apos;s
            next.
          </p>
        </Reveal>
      </Section>

      <Section tone="light">
        <Reveal>
          <div className="grid md:grid-cols-[auto_1fr] items-center gap-lg md:gap-xl rounded-[32px] bg-white p-lg md:p-xl">
            <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-full bg-black">
              <Image src="/images/logo.png" alt="" width={96} height={96} className="w-20 h-20 md:w-24 md:h-24" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-black/50">Founder</p>
              <h2 className="mt-xs text-[40px] md:text-[64px] font-semibold tracking-tightest leading-[1]">
                Dhruv Jasani
              </h2>
              <p className="mt-sm text-[17px] text-black/60">
                Founder, Antrix · Surat, Gujarat, India
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBanner
        lines={["Based in Surat.", "Building for the world."]}
        sub="Whether you need a product or a fully custom system, let's talk."
        primary={{ href: "/#contact", label: "Work with us" }}
        secondary={{ href: "/antrix-measure", label: "See our products" }}
      />
      <Footer />
    </main>
  );
}
