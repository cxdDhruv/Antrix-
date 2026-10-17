import type { Metadata } from "next";
import { Eye, Cpu, Bot } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { Row } from "@/components/Industries";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowLink,
  Heading,
  PageHero,
  PillLink,
  Section,
  Tile,
} from "@/components/ui/kit";

export const metadata: Metadata = {
  title: "Solutions | Custom Machine Vision, Mechatronics & Robotics | Antrix",
  description:
    "Antrix designs and builds custom precision systems for industries that need more than off-the-shelf tools. Computer vision, mechatronics, and robotics, engineered as one.",
};

const pillars = [
  {
    icon: Eye,
    tag: "Computer Vision",
    title: "See what standard systems miss.",
    body: "Custom vision systems that detect, measure, classify, inspect and track in real time, at industrial scale, under real-world conditions.",
    applications: [
      "Diamond & Gemstone Grading",
      "Sub-Millimetre Measurement",
      "Automotive Quality Inspection",
      "Pharma Packaging Verification",
      "PCB Assembly Inspection",
      "Deep-Learning Defect Detection",
      "Automated Optical Inspection",
      "Edge Real-Time Inference",
    ],
  },
  {
    icon: Cpu,
    tag: "Mechatronics",
    title: "Hardware and software. Engineered as one.",
    body: "Mechanical design, electronics, embedded firmware, sensors, actuators and control logic, built together from day one. One precise unit, not a collection of parts.",
    applications: [
      "Precision Measurement Instruments",
      "Automated Inspection Stations",
      "Sensor-Integrated Systems",
      "Embedded Control",
      "Industrial IoT Integration",
      "Motion Control & Actuation",
      "Jigs, Fixtures & Tooling",
      "End-of-Line Testing",
    ],
  },
  {
    icon: Bot,
    tag: "Robotics",
    title: "Motion with intelligence.",
    body: "Robotic systems that combine mechanical precision with machine intelligence, performing repeatable tasks human operators cannot maintain at scale.",
    applications: [
      "Pick & Place Systems",
      "Vision-Guided Robots",
      "Cobot Integration",
      "Autonomous Guided Vehicles",
      "Sorting & Bin-Picking",
      "Assembly Automation",
      "Custom End Effectors",
      "Multi-Axis Motion",
    ],
  },
];

const steps = [
  { num: "01", title: "Consult", body: "Tolerances, throughput, environment, constraints. No assumptions." },
  { num: "02", title: "Design", body: "Mechanical, electronic and software, designed together for your process." },
  { num: "03", title: "Build", body: "Built, tested and validated before it reaches your floor." },
  { num: "04", title: "Deploy", body: "On-site installation, calibration and operator training." },
  { num: "05", title: "Support", body: "Long-term support, maintenance and upgrades, on your terms." },
];

const audience = [
  {
    title: "Manufacturers at scale.",
    body: "Automated inspection at a volume human operators cannot sustain.",
  },
  {
    title: "Processing industries.",
    body: "Where measurement error directly costs money or reputation.",
  },
  {
    title: "Engineering teams.",
    body: "A specific problem, and a partner who builds the solution from the ground up.",
  },
  {
    title: "First-time automators.",
    body: "A system that works on day one, not a year of integration headaches.",
  },
];

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
  "Medical Devices",
  "Packaging",
  "Semiconductor",
  "Agriculture",
];

export default function SolutionsPage() {
  return (
    <main>
      <Nav />

      <PageHero
        eyebrow="Solutions"
        lines={["Your problem.", "Our engineering."]}
        sub="Custom precision systems for industries that need more than standard tools. If it involves vision, motion or intelligence in the physical world, we can engineer it."
        ctas={
          <>
            <PillLink href="/#contact">Start a conversation</PillLink>
            <ArrowLink href="#pillars">What we build</ArrowLink>
          </>
        }
      />

      <Section id="pillars" className="!pt-0">
        <div className="space-y-md">
          {pillars.map((p, i) => (
            <div
              key={p.tag}
              className="sticky"
              style={{ top: `${80 + i * 28}px` }}
            >
              <Reveal>
                <div className="rounded-[32px] border border-white/10 bg-[#0d0d0d] p-lg md:p-2xl shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.9)]">
                  <div className="grid lg:grid-cols-[1fr_1.1fr] gap-xl">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                          <p.icon size={22} />
                        </div>
                        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
                          {p.tag}
                        </span>
                      </div>
                      <h2 className="mt-lg text-[36px] md:text-[56px] font-semibold tracking-tightest leading-[1.02]">
                        {p.title}
                      </h2>
                      <p className="mt-md max-w-[520px] text-[17px] leading-[1.6] text-text-secondary">
                        {p.body}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-xs content-start">
                      {p.applications.map((a) => (
                        <div
                          key={a}
                          className="rounded-2xl border border-white/10 px-md py-sm text-[15px] text-white/80 transition-colors duration-300 hover:border-white/40 hover:text-white"
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      <HowItWorks steps={steps} title="How we" muted="work." />

      <Section>
        <Heading eyebrow="Who we work with" title="Any industry." muted="Any scale." />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          {audience.map((a, i) => (
            <Tile key={a.title} {...a} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      <section className="bg-black pb-2xl md:pb-3xl overflow-hidden space-y-sm">
        <Row items={industries.slice(0, 7)} />
        <Row items={industries.slice(7)} outline />
      </section>

      <CtaBanner
        lines={["Need precision", "engineering?"]}
        sub="Tell us what you're trying to solve. We'll tell you exactly how we'd build it."
        primary={{ href: "/#contact", label: "Start a conversation" }}
        secondary={{ href: "/antrix-measure", label: "See our products" }}
      />
      <Footer />
    </main>
  );
}
