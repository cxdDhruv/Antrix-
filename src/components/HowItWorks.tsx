"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

type Step = { num: string; title: string; body: string };

const defaultSteps: Step[] = [
  {
    num: "01",
    title: "Understand",
    body: "Your process, your tolerances, and exactly where precision is breaking down.",
  },
  {
    num: "02",
    title: "Engineer",
    body: "Vision pipeline, mechanics and software, built for your environment.",
  },
  {
    num: "03",
    title: "Deploy",
    body: "Installed, calibrated and validated on-site. Working from day one.",
  },
  {
    num: "04",
    title: "Support",
    body: "We don't disappear after delivery. Antrix stands behind every system.",
  },
];

export function HowItWorks({
  steps = defaultSteps,
  eyebrow = "The process",
  title = "From problem to",
  muted = "precision system.",
}: {
  steps?: Step[];
  eyebrow?: string;
  title?: string;
  muted?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cols = steps.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4";

  return (
    <section className="bg-[#f5f5f7] text-black py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <p className="text-[15px] md:text-[17px] font-semibold text-black/50">
            {eyebrow}
          </p>
          <h2 className="mt-xs text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1]">
            {title}
            <br />
            <span className="text-black/40">{muted}</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-2xl">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-black/10" />
          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-black"
          />
          <div className={`grid grid-cols-1 ${cols} gap-xl pt-lg`}>
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.12}>
                <span className="text-[64px] md:text-[80px] font-semibold tracking-tightest leading-none text-black/15">
                  {s.num}
                </span>
                <h3 className="mt-sm text-[24px] md:text-[28px] font-semibold tracking-tighter">
                  {s.title}
                </h3>
                <p className="mt-xs text-[16px] leading-[1.6] text-black/60">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
