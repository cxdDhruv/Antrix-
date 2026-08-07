import type { Metadata } from "next";
import { Eye, Cpu, Bot, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlowSection } from "@/components/ui/GlowSection";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Solutions — Custom Machine Vision, Mechatronics & Robotics | Antrix",
  description:
    "Antrix designs and builds custom precision systems for industries that need more than off-the-shelf tools. Computer vision, mechatronics, and robotics — engineered as one.",
};

const pillars = [
  {
    icon: Eye,
    tag: "COMPUTER VISION",
    title: "See What Standard Systems Miss.",
    body: "We build custom computer vision systems that detect, measure, classify, inspect, and track — in real time, at industrial scale, under real-world conditions. If your process involves any object that needs to be seen, analyzed, or verified by a machine — we build the system that does it with precision.",
    applications: [
      "Diamond & Gemstone Grading Automation",
      "Sub-Millimeter Dimensional Measurement",
      "Automotive Component Quality Inspection",
      "Pharmaceutical Packaging Verification",
      "Electronics & PCB Assembly Inspection",
      "Deep Learning-Based Defect & Anomaly Detection",
      "Automated Optical Inspection (AOI)",
      "Edge-Deployed Real-Time Inference",
    ],
  },
  {
    icon: Cpu,
    tag: "MECHATRONICS",
    title: "Hardware and Software. Engineered as One.",
    body: "We don't just write code for someone else's machine. We engineer the complete system — mechanical design, electronics, embedded firmware, sensors, actuators, and control logic — built together from day one. The result is a system that works as one precise unit, not a collection of parts that barely communicate.",
    applications: [
      "Custom Precision Measurement Instruments",
      "Automated Inspection Stations",
      "Sensor-Integrated Mechanical Systems",
      "Embedded Control Systems",
      "Industrial IoT Integration",
      "Motion Control & Actuation Systems",
      "Custom Jigs, Fixtures & Automated Tooling",
      "End-of-Line Testing Equipment",
    ],
  },
  {
    icon: Bot,
    tag: "ROBOTICS",
    title: "Motion with Intelligence.",
    body: "We design and build robotic systems that combine mechanical precision with machine intelligence. From robotic arms to autonomous guided systems — our robots are built to perform repeatable, precise tasks that human operators cannot maintain at scale.",
    applications: [
      "Robotic Pick & Place Systems",
      "Eye-in-Hand Vision-Guided Robots",
      "Collaborative Robot (Cobot) Integration",
      "Autonomous Guided Vehicles (AGV)",
      "Sorting & Bin-Picking Automation",
      "Assembly Automation",
      "Custom Robotic End Effectors",
      "Multi-Axis Motion Systems",
    ],
  },
];

const process = [
  {
    num: "01",
    title: "CONSULT",
    body: "You bring the problem. We ask the hard questions — tolerances, throughput, environment, constraints. No assumptions. No guesswork.",
  },
  {
    num: "02",
    title: "DESIGN",
    body: "We engineer a solution built specifically for your process. Every component — mechanical, electronic, software — designed together, not assembled separately.",
  },
  {
    num: "03",
    title: "BUILD",
    body: "We build, test, and validate the system before it ever reaches your floor. You see it working before you sign off.",
  },
  {
    num: "04",
    title: "DEPLOY",
    body: "On-site installation, calibration, and operator training. Your team is ready from day one.",
  },
  {
    num: "05",
    title: "SUPPORT",
    body: "We stand behind what we build. Long-term support, maintenance, and upgrades — on your terms.",
  },
];

const audience = [
  "Manufacturers who need automated inspection at a scale human operators cannot sustain.",
  "Processing industries where measurement error directly costs money or reputation.",
  "Engineering teams who have a specific problem and need a partner who can build the solution from ground up — not sell them a generic product.",
  "Companies entering automation for the first time who need a system that works on day one — not a year of integration headaches.",
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
  const industryLoop = [...industries, ...industries];

  return (
    <main>
      <Nav />

      <GlowSection className="pt-[72px]">
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl pt-lg pb-2xl">
          <Eyebrow>WHAT WE SOLVE</Eyebrow>
          <h1 className="text-[36px] md:text-[64px] font-extrabold leading-[1.05] tracking-tighter max-w-[1180px]">
            Your Problem.
            <br />
            Our Engineering.
          </h1>
          <p className="mt-lg max-w-[1100px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Antrix designs and builds custom precision systems for
            industries that need more than what standard tools offer. If it
            involves vision, motion, or intelligence in the physical world —
            we can engineer it.
          </p>
        </div>
      </GlowSection>

      <SectionDivider from="black" to="white" />
      <section className="relative z-10 overflow-hidden py-2xl md:py-3xl theme-light">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>WHAT WE BUILD FOR YOU</Eyebrow>
          </Reveal>

          <div className="mt-md space-y-lg">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.tag} delay={i * 0.08}>
                <div className="border border-border rounded-lg p-lg md:p-xl bg-bg-elevated">
                  <div className="flex items-center gap-3">
                    <pillar.icon size={24} className="text-white" />
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow text-text-muted">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="mt-md text-[24px] md:text-[32px] font-bold tracking-display max-w-[600px]">
                    {pillar.title}
                  </h3>
                  <p className="mt-sm max-w-[1180px] text-[15px] md:text-[16px] leading-[1.7] text-text-secondary">
                    {pillar.body}
                  </p>

                  <p className="mt-lg font-mono text-[11px] uppercase tracking-eyebrow text-text-muted">
                    Applications
                  </p>
                  <div className="mt-sm flex flex-wrap gap-2">
                    {pillar.applications.map((app) => (
                      <span
                        key={app}
                        className="inline-block rounded-full border border-border px-4 py-2 text-[13px] text-text-secondary hover:border-white/40 hover:text-white transition-colors"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="white" to="black" />
      <section className="relative overflow-hidden py-2xl md:py-3xl">
        <AmbientBackground variant="dark" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>THE PROCESS</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              How We Work.
            </h2>
          </Reveal>

          <div className="mt-xl grid grid-cols-1 md:grid-cols-5 gap-lg">
            {process.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="border-t border-border pt-md">
                  <span className="font-mono text-[13px] text-text-muted">
                    {step.num}
                  </span>
                  <h3 className="mt-xs text-[16px] font-semibold tracking-display">
                    {step.title}
                  </h3>
                  <p className="mt-sm text-[14px] leading-[1.7] text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="black" to="white" />
      <section className="relative z-10 overflow-hidden py-2xl md:py-3xl theme-light">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>WHO WE WORK WITH</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1] max-w-[1100px]">
              Any Industry. Any Scale.
            </h2>
          </Reveal>

          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
            {audience.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="flex items-start gap-3 border border-border rounded-lg p-lg h-full">
                  <ArrowRight size={18} className="mt-1 shrink-0 text-white" />
                  <p className="text-[15px] leading-[1.7] text-text-secondary">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mt-xl text-[18px] md:text-[22px] font-semibold text-white">
              Any industry. Any scale. Any problem.
              <br />
              If precision matters — Antrix can build it.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider from="white" to="black" />
      <section className="relative z-10 py-lg overflow-hidden">
        <AmbientBackground variant="dark" />
        <div className="relative z-10 flex w-max ticker-track">
          {industryLoop.map((industry, i) => (
            <div
              key={`${industry}-${i}`}
              className="flex items-center px-md whitespace-nowrap text-[16px] md:text-[20px] text-text-secondary"
            >
              {industry}
              <span className="mx-md text-text-muted">·</span>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider from="black" to="white" />
      <section className="relative overflow-hidden py-2xl md:py-3xl border-y border-border theme-light">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl text-center">
          <Reveal>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1] max-w-[720px] mx-auto">
              Have a Problem That Needs Precision Engineering?
            </h2>
            <p className="mt-lg max-w-[560px] mx-auto text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              Tell us what you&apos;re trying to solve. If it involves
              machine vision, mechatronics, or robotics — we&apos;ll tell you
              exactly how we&apos;d build it.
            </p>
            <div className="mt-xl flex justify-center">
              <Button href="/#contact" arrow>
                Start a Conversation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider from="white" to="black" />
      <Footer />
    </main>
  );
}
