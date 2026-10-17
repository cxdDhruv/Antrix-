import { ArrowLink, ScrollWords } from "@/components/ui/kit";

export function About() {
  return (
    <section id="about" className="bg-black py-2xl md:py-3xl">
      <div className="max-w-[1100px] mx-auto px-md md:px-xl">
        <ScrollWords
          eyebrow="Who we are"
          text="We build systems that see, measure, and act with total precision. From flagship products to fully custom builds, Antrix solves problems that demand more than human eyes can deliver."
        />
        <div className="mt-xl">
          <ArrowLink href="/about">More about us</ArrowLink>
        </div>
      </div>
    </section>
  );
}
