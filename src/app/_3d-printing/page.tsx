// Hidden until launch: the leading _ keeps Next.js from routing this folder.
// To go live, rename _3d-printing -> 3d-printing and api/_print-order, api/_print-upload -> api/print-order, api/print-upload,
// then add the 3D Printing link back to Nav.tsx and Footer.tsx.
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { PrintQuote } from "@/components/print/PrintQuote";
import {
  ArrowLink,
  Heading,
  PageHero,
  PillLink,
  Section,
  Tile,
} from "@/components/ui/kit";
import { PRICING, formatINR } from "@/lib/printPricing";

export const metadata: Metadata = {
  title: "3D Printing Service | Instant Online Quote | Antrix",
  description:
    "Upload your STL, OBJ or 3MF file, get an instant 3D printing price in PLA, PETG, ABS or TPU, and place your order online. Printed in Surat, shipped across India.",
  keywords: [
    "3D printing service",
    "online 3D printing quote",
    "STL printing India",
    "3D printing Surat",
    "PLA PETG ABS TPU printing",
  ],
};

const steps = [
  { num: "01", title: "Upload", body: "Drop your STL, OBJ or 3MF file. See it in 3D instantly." },
  { num: "02", title: "Configure", body: "Pick material, quality, infill, colour and quantity." },
  { num: "03", title: "Order", body: "Place your order. We review the file and confirm the price." },
  { num: "04", title: "Delivered", body: "Printed, inspected and shipped to your door." },
];

const faqs = [
  {
    title: "Which files can I upload?",
    body: `STL, OBJ and 3MF up to 100MB. Models should be in millimetres and closed (watertight).`,
  },
  {
    title: "How is the price calculated?",
    body: "From your model's real volume and surface area: material used, print time and a small setup fee.",
  },
  {
    title: "When do I pay?",
    body: "After we review your file and confirm the final price. No payment is taken when you order.",
  },
  {
    title: "What's the largest part?",
    body: `Up to ${PRICING.buildVolumeMm.join(" × ")} mm in one piece. Bigger? We'll split and join it.`,
  },
];

export default function PrintingPage() {
  return (
    <main>
      <Nav />

      <PageHero
        eyebrow="Antrix 3D Printing"
        lines={["Upload. Quote.", "Print."]}
        sub={`Upload your 3D model, get an instant price and order in under a minute. Precision prints from ${formatINR(PRICING.minimumOrder)}.`}
        ctas={
          <>
            <PillLink href="#quote">Get instant quote</PillLink>
            <ArrowLink href="#materials">Explore materials</ArrowLink>
          </>
        }
      />

      <Section id="quote" className="!pt-0">
        <PrintQuote />
      </Section>

      <HowItWorks steps={steps} title="From file to" muted="finished part." />

      <Section id="materials">
        <Heading eyebrow="Materials" title="The right plastic." muted="For every part." />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          {Object.values(PRICING.materials).map((m, i) => (
            <Tile key={m.label} title={m.label} body={m.note} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      <Section tone="light">
        <Heading eyebrow="Questions" title="Good to know." tone="light" />
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          {faqs.map((f, i) => (
            <Tile key={f.title} {...f} tone="light" delay={i * 0.06} />
          ))}
        </div>
      </Section>

      <CtaBanner
        lines={["Need it engineered,", "not just printed?"]}
        sub="Custom fixtures, enclosures and mechatronic parts, designed and built by Antrix."
        primary={{ href: "#quote", label: "Get instant quote" }}
        secondary={{ href: "/solutions", label: "Custom solutions" }}
      />
      <Footer />
    </main>
  );
}
