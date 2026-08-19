import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AwmHero } from "@/components/AwmHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CountUp } from "@/components/ui/CountUp";

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
  { label: "Closely-Spaced Edges", value: "Stays accurate to 8 px separation" },
  { label: "Vs. Best Alternative", value: "Up to ~20% lower uncertainty" },
  { label: "Pixel-Locking Bias", value: "At the noise floor (undetectable)" },
  { label: "Benchmark", value: "9-method, analytically known ground truth" },
  { label: "Geometries Tested", value: "Straight edges, curves, corners, gaps" },
];

const features = [
  {
    title: "Best Overall Accuracy, No Calibration Needed",
    body: "Lowest combined bias + noise error of any tested method on straight edges, curved edges, and corners alike, with expanded uncertainty as low as 0.26 px in low-blur conditions.",
  },
  {
    title: "Best-in-Class on Closely-Spaced Edges",
    body: "Where two boundaries sit near each other, bore holes, slots, thin features, Antrix AWM stays accurate down to gaps where every classical moment-based method breaks down completely.",
  },
  {
    title: "Real Improvement Where It Counts",
    body: "On two-edge and narrow-feature geometries, Antrix AWM measurably outperforms the previous best-in-class method, with up to ~20% lower measurement uncertainty.",
  },
  {
    title: "Sub-Micron-Class Repeatability",
    body: "Pixel-locking, the bias that repeats at the same sub-pixel phase, sits at the noise floor of what is measurable. No detectable systematic error tied to where an edge falls within a pixel.",
  },
];

const mentors = [
  {
    photo: "/images/amp.jpg",
    name: "Dr. Ajay M. Patel",
    title: "Assistant Professor",
    college: "G.H. Patel College of Engineering and Technology",
  },
];

export default function AntrixAwmPage() {
  return (
    <main>
      <Nav />

      <AwmHero />

      <section className="relative overflow-hidden py-2xl md:py-3xl theme-light">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <p className="max-w-[760px] text-[18px] md:text-[22px] leading-[1.7] text-white/90">
              Every optical measurement system lives or dies on one number:
              how precisely it can locate an edge.
              <br />
              <br />
              <span className="font-semibold text-white">
                Antrix AWM finds edge, hole, and gap boundaries to a small
                fraction of a pixel.
              </span>
              <br />
              <br />
              It was benchmarked head-to-head against eight established
              sub-pixel detection methods across thousands of simulated
              measurement trials, and it keeps its accuracy in conditions
              where most edge detectors quietly fail: noisy images and
              closely-spaced edges.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="specifications"
        className="relative overflow-hidden py-2xl md:py-3xl scroll-mt-[72px]"
      >
        <AmbientBackground variant="dark" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>MEASURED ACCURACY</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              Validated, Not Estimated.
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="mt-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
              <div>
                <div className="text-[36px] md:text-[48px] font-extrabold tracking-tighter">
                  <CountUp to={0.26} decimals={2} suffix=" px" />
                </div>
                <p className="mt-1 text-[13px] text-text-secondary">
                  Best-Case Uncertainty
                </p>
              </div>
              <div>
                <div className="text-[36px] md:text-[48px] font-extrabold tracking-tighter">
                  <CountUp to={9} />
                </div>
                <p className="mt-1 text-[13px] text-text-secondary">
                  Detectors Benchmarked
                </p>
              </div>
              <div>
                <div className="text-[36px] md:text-[48px] font-extrabold tracking-tighter">
                  ~<CountUp to={20} suffix="%" />
                </div>
                <p className="mt-1 text-[13px] text-text-secondary">
                  Lower Uncertainty vs. Best Alternative
                </p>
              </div>
              <div>
                <div className="text-[36px] md:text-[48px] font-extrabold tracking-tighter">
                  <CountUp to={8} suffix=" px" />
                </div>
                <p className="mt-1 text-[13px] text-text-secondary">
                  Min. Reliable Edge Separation
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-xl">
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

      <section className="relative overflow-hidden py-2xl md:py-3xl theme-light">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>WHY IT MATTERS</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              Where Others Fail, It Holds.
            </h2>
          </Reveal>

          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.08}>
                <div className="tech-sheen card-hover border border-border rounded-lg p-lg h-full bg-bg-elevated">
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

      <section className="relative overflow-hidden py-2xl md:py-3xl">
        <AmbientBackground variant="dark" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>THE FIGURES</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              The Benchmark, Visualized.
            </h2>
          </Reveal>

          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
            <Reveal delay={0.05}>
              <div className="tech-sheen img-zoom border border-border rounded-lg overflow-hidden bg-white p-md">
                <Image
                  src="/images/awm/bias_variance_summary.png"
                  alt="Bias-variance Pareto position"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-sm text-[13px] text-text-secondary">
                Antrix AWM&apos;s position on the accuracy/stability frontier
                against eight established detectors.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="tech-sheen img-zoom border border-border rounded-lg overflow-hidden bg-white p-md">
                <Image
                  src="/images/awm/two_edge_breakdown.png"
                  alt="Two-edge breakdown"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-sm text-[13px] text-text-secondary">
                Measurement safety as edges move closer together, Antrix AWM
                stays reliable at gaps where classical methods fail.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="tech-sheen img-zoom border border-border rounded-lg overflow-hidden bg-white p-md">
                <Image
                  src="/images/awm/recommendation_by_scenario.png"
                  alt="Recommended detector by scenario"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-sm text-[13px] text-text-secondary">
                Where Antrix AWM is the top pick across real-world
                measurement scenarios.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="tech-sheen img-zoom border border-border rounded-lg overflow-hidden bg-white p-md">
                <Image
                  src="/images/awm/detector_radius_accuracy.png"
                  alt="Detector accuracy by edge radius"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-sm text-[13px] text-text-secondary">
                Accuracy holds steady across edge curvature, from tight
                corners to near-straight edges.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-2xl md:py-3xl theme-light">
        <AmbientBackground variant="light" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl">
          <Reveal>
            <Eyebrow>WHERE IT FITS</Eyebrow>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
              Built Into Every Antrix Measurement.
            </h2>
            <p className="mt-md max-w-[720px] text-[16px] leading-[1.7] text-text-secondary">
              Caliper-jaw and gauge-style dimensional measurement, bore and
              hole diameter inspection, PCB trace width and spacing
              verification, and any machine-vision application where
              sub-pixel precision on a live camera feed, not a lab
              microscope, needs to be trustworthy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-2xl md:py-3xl">
        <AmbientBackground variant="dark" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl text-center">
          <Reveal>
            <Eyebrow className="!text-[15px] md:!text-[18px]">
              SPECIAL THANKS
            </Eyebrow>
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-display leading-[1.2] max-w-[720px] mx-auto">
              With Gratitude to Our Mentor.
            </h2>
            <p className="mt-md max-w-[720px] mx-auto text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              Antrix AWM would not exist without the guidance, patience, and
              technical direction of Dr. Ajay M. Patel at G.H. Patel College
              of Engineering and Technology.
            </p>
          </Reveal>

          <div className="mt-xl flex flex-wrap justify-center gap-2xl md:gap-3xl">
            {mentors.map((mentor, i) => (
              <Reveal key={mentor.name} delay={0.1 + i * 0.1}>
                <div className="flex flex-col items-center text-center gap-md w-[220px]">
                  <div className="tech-sheen img-zoom w-32 h-32 md:w-40 md:h-40 rounded-full border border-border">
                    <Image
                      src={mentor.photo}
                      alt={mentor.name}
                      width={160}
                      height={160}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold tracking-display">
                      {mentor.name}
                    </h3>
                    <p className="mt-1 text-[14px] text-text-secondary">
                      {mentor.title}
                    </p>
                    <p className="text-[14px] text-text-secondary">
                      {mentor.college}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-2xl md:py-3xl border-y border-border">
        <AmbientBackground variant="dark" />
        <div className="relative z-10 max-w-content mx-auto px-md md:px-xl text-center">
          <Reveal>
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1] max-w-[640px] mx-auto">
              Put Antrix AWM to the Test.
            </h2>
            <p className="mt-lg max-w-[520px] mx-auto text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
              Talk to us about integrating Antrix AWM into your inspection
              pipeline or licensing the measurement engine directly.
            </p>
            <div className="mt-xl flex justify-center">
              <Button href="/#contact" arrow>
                Talk to Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
