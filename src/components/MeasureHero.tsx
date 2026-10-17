"use client";

import Image from "next/image";
import { ArrowLink, PageHero, PillLink } from "@/components/ui/kit";

export function MeasureHero() {
  return (
    <PageHero
      eyebrow="Antrix Measure"
      lines={["Precision has", "a new name."]}
      sub="Automated dimensional measurement for cut diamonds. ±0.01mm accuracy across 9 cut types."
      ctas={
        <>
          <PillLink href="/#contact">Request a demo</PillLink>
          <ArrowLink href="#specifications">View specifications</ArrowLink>
        </>
      }
      media={
        <div className="absolute inset-x-[8%] inset-y-[7%]">
          <Image
            src="/images/measure-product.png"
            alt="Antrix Measure device"
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-contain"
          />
        </div>
      }
    />
  );
}
