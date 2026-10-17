"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.84, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [56, 28]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section className="relative overflow-hidden bg-black pt-[140px] md:pt-[180px] pb-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-200px] -translate-x-1/2 w-[1400px] h-[900px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.13),transparent)]"
      />

      <div className="relative max-w-content mx-auto px-md md:px-xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-[15px] md:text-[19px] font-semibold text-text-secondary"
        >
          Machine Vision + Mechatronics
        </motion.p>

        <h1 className="mt-sm text-[52px] md:text-[104px] lg:text-[136px] font-semibold leading-[0.95] tracking-tightest">
          {["Built for", "what's next."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="mt-lg mx-auto max-w-[620px] text-[17px] md:text-[21px] leading-[1.5] text-text-secondary"
        >
          Precision machine vision and mechatronics systems for industries
          that cannot afford to be wrong.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="mt-lg flex flex-wrap items-center justify-center gap-x-lg gap-y-md"
        >
          <Link
            href="/#contact"
            className="rounded-full bg-white px-[26px] py-[12px] text-[15px] md:text-[17px] font-medium text-black transition-transform duration-300 hover:scale-[1.04]"
          >
            Request a demo
          </Link>
          <Link
            href="/antrix-measure"
            className="group inline-flex items-center gap-1 text-[15px] md:text-[17px] font-medium text-white"
          >
            Explore Antrix Measure
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      <motion.div
        ref={stageRef}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease }}
        className="relative mt-2xl max-w-content mx-auto px-md md:px-xl"
      >
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative overflow-hidden bg-[#eceeec] aspect-[4/3] md:aspect-[16/8]"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-x-[8%] inset-y-[7%]">
            <Image
              src="/images/measure-product.png"
              alt="Antrix Measure"
              fill
              priority
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
