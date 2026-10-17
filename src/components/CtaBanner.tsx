import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner({
  lines = ["Ready to see", "the difference?"],
  sub = "One 30-minute conversation is all it takes to know if we're the right fit.",
  primary = { href: "/#contact", label: "Request a demo" },
  secondary = { href: "/solutions", label: "Explore solutions" },
}: {
  lines?: [string, string];
  sub?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-2xl md:py-3xl">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)]"
      />
      <Reveal className="relative max-w-content mx-auto px-md md:px-xl text-center">
        <h2 className="text-[48px] md:text-[112px] font-semibold tracking-tightest leading-[0.95] bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">
          {lines[0]}
          <br />
          {lines[1]}
        </h2>
        <p className="mt-lg mx-auto max-w-[560px] text-[17px] md:text-[21px] leading-[1.5] text-text-secondary">
          {sub}
        </p>
        <div className="mt-xl flex flex-wrap items-center justify-center gap-x-lg gap-y-md">
          <Link
            href={primary.href}
            className="rounded-full bg-white px-[30px] py-[14px] text-[17px] font-medium text-black transition-transform duration-300 hover:scale-[1.04]"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="group inline-flex items-center gap-1 text-[17px] font-medium text-white"
            >
              {secondary.label}
              <ChevronRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
