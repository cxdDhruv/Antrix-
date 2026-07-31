import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="py-2xl md:py-3xl border-y border-border">
      <div className="max-w-content mx-auto px-md md:px-xl text-center">
        <Reveal>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1] max-w-[720px] mx-auto">
            Ready to See the Difference?
          </h2>
          <p className="mt-lg max-w-[560px] mx-auto text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Whether you need Antrix Measure or a custom-engineered solution
            for your process — let&apos;s talk. A 30-minute conversation is
            all it takes to know if we&apos;re the right fit.
          </p>
          <div className="mt-xl flex justify-center">
            <Button href="/#contact" arrow>
              Request a Demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
