import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const tiles = [
  {
    tag: "Flagship product",
    name: "Antrix Measure",
    line: "Automated diamond measurement. ±0.01mm. Zero human error.",
    href: "/antrix-measure",
    img: "/images/measure-product.png",
    light: true,
  },
  {
    tag: "Measurement engine",
    name: "Antrix AWM",
    line: "Sub-pixel edge localization. Accurate where others fail.",
    href: "/antrix-awm",
    img: "/images/awm/logo.png",
    light: false,
  },
];

export function Products() {
  return (
    <section id="products" className="bg-black py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal className="text-center">
          <h2 className="text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1]">
            Precision, packaged.
          </h2>
        </Reveal>

        <div className="mt-xl grid grid-cols-1 lg:grid-cols-2 gap-md">
          {tiles.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className={`group relative overflow-hidden rounded-[32px] min-h-[600px] md:min-h-[720px] flex flex-col items-center pt-xl px-md text-center ${
                  t.light
                    ? "bg-[#eceeec] text-black"
                    : "bg-[#0d0d0d] text-white border border-white/10"
                }`}
              >
                <p
                  className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${
                    t.light ? "text-black/50" : "text-white/50"
                  }`}
                >
                  {t.tag}
                </p>
                <h3 className="mt-xs text-[36px] md:text-[52px] font-semibold tracking-tighter">
                  {t.name}
                </h3>
                <p
                  className={`mt-xs max-w-[420px] text-[17px] md:text-[19px] leading-[1.45] ${
                    t.light ? "text-black/70" : "text-white/70"
                  }`}
                >
                  {t.line}
                </p>
                <div className="mt-md flex items-center gap-lg">
                  <Link
                    href={t.href}
                    className={`rounded-full px-[22px] py-[10px] text-[15px] font-medium transition-transform duration-300 hover:scale-[1.04] ${
                      t.light ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    Learn more
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1 text-[15px] font-medium"
                  >
                    Request demo <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="relative mt-lg w-full flex-1 min-h-[300px]">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className={`object-contain object-bottom transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
                      t.light ? "" : "p-xl"
                    }`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
