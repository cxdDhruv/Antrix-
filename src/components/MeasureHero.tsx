"use client";

import { useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MouseGlow } from "@/components/ui/MouseGlow";

export function MeasureHero() {
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,255,255,0.14), transparent 70%)`;
    }
  }

  function handleMouseLeave() {
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }

  return (
    <section
      className="precision-grid relative pt-[72px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MouseGlow ref={glowRef} />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl py-2xl grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-xl items-center">
        <div>
          <Eyebrow>ANTRIX MEASURE — FLAGSHIP PRODUCT</Eyebrow>
          <h1 className="text-[40px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter">
            Measurement
            <br />
            Without Compromise.
          </h1>
          <p className="mt-lg max-w-[520px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Automated dimensional measurement for cut diamonds. ±0.02mm
            accuracy across 9 cut types. Built for diamond processors who
            demand the exact truth.
          </p>
          <div className="mt-xl flex flex-wrap gap-md">
            <Button href="/#contact" arrow>
              Request a Demo
            </Button>
            <Button href="#specifications" variant="ghost">
              View Specifications
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end lg:-mr-xl">
          <Image
            src="/images/measure-product.png"
            alt="Antrix Measure device"
            width={1075}
            height={910}
            priority
            className="w-full h-auto max-w-[560px] lg:max-w-[760px]"
          />
        </div>
      </div>
    </section>
  );
}
