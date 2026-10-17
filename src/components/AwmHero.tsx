"use client";

import { motion } from "framer-motion";
import { ArrowLink, PageHero, PillLink, ease } from "@/components/ui/kit";

// Synthetic camera patch: a slanted, blurred edge sampled on a pixel grid.
const COLS = 16;
const ROWS = 10;
const CELL = 44;
const GX = 70;
const GY = 90;
const edgeX = (y: number) => GX + 6.4 * CELL + 0.32 * (y - GY);
const sigmoid = (t: number) => 1 / (1 + Math.exp(-t));

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  const cx = GX + c * CELL + CELL / 2;
  const cy = GY + r * CELL + CELL / 2;
  const v = Math.round(20 + 225 * sigmoid((cx - edgeX(cy)) / 22));
  return { c, r, v };
});

// Intensity profile across the edge (graph on the right).
const PX = 860;
const PW = 640;
const PY = 150;
const PH = 460;
const SUBPIXEL = 0.4137; // where the fitted edge crosses 50%
const profile = Array.from({ length: 81 }, (_, i) => {
  const t = i / 80;
  const y = PY + PH - PH * sigmoid((t - SUBPIXEL) * 14);
  return `${i ? "L" : "M"}${PX + t * PW} ${y}`;
}).join(" ");
const samples = Array.from({ length: 11 }, (_, i) => {
  const t = i / 10;
  return { x: PX + t * PW, y: PY + PH - PH * sigmoid((t - SUBPIXEL) * 14) };
});

function EdgeViz() {
  const yTop = GY;
  const yBot = GY + ROWS * CELL;
  return (
    <svg viewBox="0 0 1600 800" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      {cells.map(({ c, r, v }) => (
        <motion.rect
          key={`${c}-${r}`}
          x={GX + c * CELL}
          y={GY + r * CELL}
          width={CELL - 2}
          height={CELL - 2}
          rx={4}
          fill={`rgb(${v},${v},${v})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + c * 0.04 + r * 0.02 }}
        />
      ))}
      <motion.line
        x1={edgeX(yTop)}
        y1={yTop}
        x2={edgeX(yBot)}
        y2={yBot}
        stroke="white"
        strokeWidth={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease }}
      />
      <motion.g
        initial={{ x: edgeX(yTop), y: yTop, opacity: 0 }}
        animate={{
          x: [edgeX(yTop), edgeX(yBot), edgeX(yTop)],
          y: [yTop, yBot, yTop],
          opacity: 1,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
      >
        <circle r={20} fill="none" stroke="white" strokeWidth={2} />
        <path d="M-32 0 H-10 M10 0 H32 M0 -32 V-10 M0 10 V32" stroke="white" strokeWidth={2} />
      </motion.g>

      {/* profile graph */}
      <path d={`M${PX} ${PY} V${PY + PH} H${PX + PW}`} fill="none" stroke="white" strokeOpacity={0.25} />
      <motion.path
        d={profile}
        fill="none"
        stroke="white"
        strokeWidth={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 1.2, ease }}
      />
      {samples.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={6}
          fill="black"
          stroke="white"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 + i * 0.06 }}
        />
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        <line
          x1={PX + SUBPIXEL * PW}
          x2={PX + SUBPIXEL * PW}
          y1={PY - 20}
          y2={PY + PH}
          stroke="white"
          strokeDasharray="6 8"
        />
        <text x={PX + SUBPIXEL * PW + 16} y={PY} fill="white" fontSize={26} fontWeight={600}>
          edge @ 41.37 px
        </text>
        <text x={PX + SUBPIXEL * PW + 16} y={PY + 34} fill="white" fillOpacity={0.55} fontSize={20}>
          uncertainty ±0.26 px
        </text>
        <text x={PX} y={PY + PH + 44} fill="white" fillOpacity={0.45} fontSize={18}>
          INTENSITY PROFILE ACROSS EDGE
        </text>
        <text x={GX} y={GY + ROWS * CELL + 44} fill="white" fillOpacity={0.45} fontSize={18}>
          CAMERA PIXELS
        </text>
      </motion.g>
    </svg>
  );
}

export function AwmHero() {
  return (
    <PageHero
      eyebrow="Antrix AWM"
      lines={["Sub-pixel accuracy.", "Proven."]}
      sub="Our proprietary edge localization engine, benchmarked against eight established methods and built to stay accurate where classical methods fail."
      ctas={
        <>
          <PillLink href="/#contact">Talk to us</PillLink>
          <ArrowLink href="#specifications">View the numbers</ArrowLink>
        </>
      }
      mediaClass="bg-[#0b0b0b] border border-white/10"
      media={<EdgeViz />}
    />
  );
}
