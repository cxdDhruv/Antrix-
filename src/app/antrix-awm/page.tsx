import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AwmHero } from "@/components/AwmHero";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/ui/Reveal";
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
  title: "Antrix AWM | Sub-Pixel Edge Measurement Engine",
  description:
    "Antrix AWM (Adaptive Window Moments) is a proprietary sub-pixel edge localization engine, benchmarked against eight established detection methods for accuracy and repeatability.",
  keywords: [
    "sub-pixel edge detection",
    "machine vision measurement",
    "edge localization",
    "dimensional inspection",
    "Antrix AWM",
  ],
};

const specs = [
  { label: "Best-Case Accuracy", value: "0.26 px expanded uncertainty" },
  { label: "Closely-Spaced Edges", value: "Accurate to 8 px separation" },
  { label: "Vs. Best Alternative", value: "Up to ~20% lower uncertainty" },
  { label: "Pixel-Locking Bias", value: "At the noise floor" },
  { label: "Benchmark", value: "9 methods, known ground truth" },
  { label: "Geometries Tested", value: "Edges, curves, corners, gaps" },
];

const features = [
  {
    title: "Best overall accuracy. No calibration.",
    body: "Lowest combined bias + noise error of any tested method on straight edges, curves and corners, down to 0.26 px expanded uncertainty.",
    wide: true,
  },
  {
    title: "Closely-spaced edges.",
    body: "Bore holes, slots, thin features. Stays accurate where classical moment methods break down.",
  },
  {
    title: "~20% lower uncertainty.",
    body: "Measurably better than the previous best-in-class method on two-edge and narrow geometries.",
  },
  {
    title: "Sub-micron-class repeatability.",
    body: "Pixel-locking bias sits at the noise floor. No systematic error tied to where an edge falls within a pixel.",
    wide: true,
  },
];

const figures = [
  {
    src: "/images/awm/bias_variance_summary.png",
    alt: "Bias-variance Pareto position",
    caption: "Position on the accuracy/stability frontier against eight established detectors.",
  },
  {
    src: "/images/awm/two_edge_breakdown.png",
    alt: "Two-edge breakdown",
    caption: "Measurement safety as edges move closer. AWM stays reliable where classical methods fail.",
  },
  {
    src: "/images/awm/recommendation_by_scenario.png",
    alt: "Recommended detector by scenario",
    caption: "Where Antrix AWM is the top pick across real-world measurement scenarios.",
  },
  {
    src: "/images/awm/detector_radius_accuracy.png",
    alt: "Detector accuracy by edge radius",
    caption: "Accuracy holds across edge curvature, from tight corners to near-straight edges.",
  },
];

const uses = [
  "Caliper & gauge-style measurement",
  "Bore and hole diameter inspection",
  "PCB trace width & spacing",
  "Live-camera sub-pixel metrology",
];

export default function AntrixAwmPage() {
  return (
    <main>
      <Nav />
      <AwmHero />

      <Section className="!pt-0">
        <StatGrid
          items={[
            { to: 0.26, decimals: 2, suffix: "px", label: "Best-case uncertainty" },
            { to: 9, label: "Methods benchmarked" },
            { to: 20, prefix: "~", suffix: "%", label: "Lower uncertainty" },
            { to: 8, suffix: "px", label: "Min. edge separation" },
          ]}
        />
      </Section>

      <Section>
        <ScrollWords
          eyebrow="The one number that matters"
          text="Every optical measurement system lives or dies on how precisely it can locate an edge. Antrix AWM finds edge, hole and gap boundaries to a small fraction of a pixel, even on noisy images and closely-spaced edges."
        />
      </Section>

      <Section tone="light">
        <Heading eyebrow="Why it matters" title="Where others fail," muted="it holds." tone="light" />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
          {features.map((f, i) => (
            <Tile key={f.title} {...f} tone="light" delay={i * 0.08} />
          ))}
        </div>
      </Section>

      <Section id="specifications">
        <Heading eyebrow="Measured accuracy" title="Validated," muted="not estimated." />
        <div className="mt-xl">
          <SpecTable rows={specs} />
        </div>
      </Section>

      <Section>
        <Heading eyebrow="The figures" title="The benchmark," muted="visualized." />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          {figures.map((f, i) => (
            <Reveal key={f.src} delay={i * 0.08}>
              <figure className="group">
                <div className="overflow-hidden rounded-[28px] bg-white p-md md:p-lg">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-sm px-xs text-[14px] leading-[1.6] text-text-secondary">
                  {f.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <Heading eyebrow="Where it fits" title="Inside every" muted="Antrix measurement." tone="light">
          Any machine-vision application where sub-pixel precision on a live
          camera feed, not a lab microscope, needs to be trustworthy.
        </Heading>
        <div className="mt-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          {uses.map((u, i) => (
            <Reveal key={u} delay={i * 0.06}>
              <div className="h-full rounded-[24px] bg-white p-lg text-[19px] font-semibold tracking-tighter leading-[1.25]">
                {u}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Mentors
        title="With gratitude to our mentor."
        body="Antrix AWM would not exist without the guidance, patience and technical direction of Dr. Ajay M. Patel at G.H. Patel College of Engineering and Technology."
        people={[
          {
            photo: "/images/amp.jpg",
            name: "Dr. Ajay M. Patel",
            title: "Assistant Professor",
            college: "G.H. Patel College of Engineering and Technology",
          },
        ]}
      />

      <CtaBanner
        lines={["Put AWM", "to the test."]}
        sub="Integrate Antrix AWM into your inspection pipeline, or license the measurement engine directly."
        primary={{ href: "/#contact", label: "Talk to us" }}
        secondary={{ href: "/antrix-measure", label: "See Antrix Measure" }}
      />
      <Footer />
    </main>
  );
}
