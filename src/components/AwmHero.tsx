"use client";

import { useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export function AwmHero() {
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
      className="precision-grid relative overflow-hidden pt-[72px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AmbientBackground variant="dark" />
      <MouseGlow ref={glowRef} />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl pt-lg pb-2xl grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-xl items-center">
        <div>
          <Eyebrow>ANTRIX AWM · MEASUREMENT ENGINE</Eyebrow>
          <h1 className="text-[40px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter">
            Sub-Pixel Accuracy,
            <br />
            Proven.
          </h1>
          <p className="mt-lg max-w-[520px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary">
            Antrix AWM (Adaptive Window Moments) is our proprietary sub-pixel
            edge localization engine, benchmarked against eight established
            detection methods and built to stay accurate where classical
            methods fail.
          </p>
          <div className="mt-xl flex flex-wrap gap-md">
            <Button href="/#contact" arrow>
              Talk to Us
            </Button>
            <Button href="#specifications" variant="ghost">
              View the Numbers
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end lg:-mr-xl">
          <Image
            src="/images/awm/logo.png"
            alt="Antrix AWM logo"
            width={480}
            height={480}
            priority
            className="w-full h-auto max-w-[400px] lg:max-w-[540px]"
          />
        </div>
      </div>
    </section>
  );
}
