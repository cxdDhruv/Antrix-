"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { TypingText } from "@/components/ui/TypingText";

export function Hero() {
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
      className="precision-grid relative min-h-screen flex items-center pt-[72px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MouseGlow ref={glowRef} />
      <div className="relative z-10 max-w-content mx-auto px-md md:px-xl py-2xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-text-muted mb-md"
        >
          MACHINE VISION + MECHATRONICS
        </motion.p>

        <h1 className="text-[40px] md:text-[72px] lg:text-[96px] font-extrabold leading-[1.05] md:leading-[0.98] tracking-tighter text-white">
          <TypingText text={"Built for\nWhat's Next."} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-lg max-w-[560px] text-[16px] md:text-[18px] leading-[1.7] text-text-secondary"
        >
          Antrix builds precision machine vision and mechatronics systems for
          industries that cannot afford to be wrong. Products. Custom
          Solutions. Real-world results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-xl flex flex-wrap items-center gap-md"
        >
          <Button href="/#contact" arrow>
            Request a Demo
          </Button>
          <Button href="/antrix-measure" variant="ghost">
            Explore Antrix Measure
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-2xl text-[13px] text-text-muted"
        >
          Trusted by manufacturers and processors across India and
          international markets.
        </motion.p>
      </div>
    </section>
  );
}
