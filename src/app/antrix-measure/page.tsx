import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MeasureHero } from "@/components/MeasureHero";
import { Showcase } from "@/components/Showcase";
import { CtaBanner } from "@/components/CtaBanner";
import {
  Heading,
  Mentors,
  ScrollWords,
  Section,
  SpecTable,
  StatGrid,
  Tile,
} from "@/components/ui/kit";

export const metadata: Metadata = {
  title: "Antrix Measure | Diamond Measurement System | ±0.01mm Accuracy",
  description:
    "Antrix Measure delivers automated dimensional measurement for cut diamonds with ±0.01mm accuracy across 9 cut types. Request a demo.",
  keywords: [
    "diamond measurement system",
    "cut diamond dimensions",
    "diamond grading equipment",
    "automated diamond measurement",
    "Antrix Measure",
  ],
};

const specs = [
  { label: "Measurement Accuracy", value: "±0.01mm" },
  { label: "Supported Cut Types", value: "9 (Round + 8 Fancy Cuts)" },
  { label: "Measurement Mode", value: "Single Stone + Multi-Stone Batch" },
  { label: "Calibration", value: "High-Precision Optical System" },
  { label: "Sorting Output", value: "LED-Guided Bin Placement" },
  { label: "Shape Classification", value: "Automatic (9 Cut Types)" },
  { label: "Interface", value: "Desktop Application" },
];

const features = [
  {
    title: "Industry-leading accuracy.",
    body: "±0.01mm. Not a rounded figure, a hard engineering specification, 5x more precise than the industry standard.",
    wide: true,
  },
  {
    title: "9-cut classification.",
    body: "All 9 cut types classified and measured automatically. No manual selection.",
  },
  {
    title: "LED-guided bin sorting.",
    body: "The correct bin lights up. The operator places the stone. No lookup, no sorting errors.",
  },
  {
    title: "Self-calibrating optics.",
    body: "Accuracy holds regardless of environment, lighting variation, or operator differences.",
  },
  {
    title: "Multi-stone batches.",
    body: "Measure many stones in one session. Built for real processing throughput, not lab demos.",
  },
];

const mentors = [
  {
    photo: "/images/sms.jpg",
    name: "Dr. Saurin Sheth",
    title: "Assistant Professor, Department of Mechatronics",
    college: "G.H. Patel College of Engineering and Technology",
  },
  {
    photo: "/images/rvg.jpeg",
    name: "Dr. Ravi Gandhi",
    title: "Associate Professor, Department of Mechatronics",
    college: "G.H. Patel College of Engineering and Technology",
  },
];

export default function AntrixMeasurePage() {
  return (
    <main>
      <Nav />
      <MeasureHero />

      <Section className="!pt-0">
        <StatGrid
          items={[
            { to: 0.01, decimals: 2, prefix: "±", suffix: "mm", label: "Accuracy" },
            { to: 9, label: "Cut types" },
            { to: 5, suffix: "x", label: "Industry precision" },
            { to: 100, suffix: "%", label: "Automated" },
          ]}
        />
      </Section>

      <Section>
        <ScrollWords
          eyebrow="Why it matters"
          text="The diamond industry runs on precision. A single millimetre of error costs money, reputation and client trust. Antrix Measure eliminates that error completely."
        />
      </Section>

      <Showcase />

      <Section tone="light">
        <Heading eyebrow="Features" title="Built to" muted="perform." tone="light" />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
          {features.map((f, i) => (
            <Tile key={f.title} {...f} tone="light" delay={i * 0.08} />
          ))}
        </div>
      </Section>

      <Section id="specifications">
        <Heading eyebrow="Specifications" title="Hard numbers." />
        <div className="mt-xl">
          <SpecTable rows={specs} />
        </div>
      </Section>

      <Mentors
        title="With gratitude to our mentors."
        body="Antrix Measure would not exist without the guidance, patience and technical direction of our mentors in the Department of Mechatronics at G.H. Patel College of Engineering and Technology."
        people={mentors}
      />

      <CtaBanner
        lines={["See it", "in action."]}
        sub="A 30-minute live demonstration is the fastest way to understand what ±0.01mm looks like in practice."
        secondary={{ href: "/antrix-awm", label: "Meet the AWM engine" }}
      />
      <Footer />
    </main>
  );
}
