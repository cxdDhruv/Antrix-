"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// All cut outlines drawn in a 100x100 box centred on (50,50).
const CUTS: { name: string; d: string }[] = [
  { name: "Round", d: "M50 8 A42 42 0 1 1 49.99 8Z" },
  { name: "Oval", d: "M50 6 A30 44 0 1 1 49.99 6Z" },
  {
    name: "Pear",
    d: "M50 6 C70 30 82 52 82 66 C82 84 68 94 50 94 C32 94 18 84 18 66 C18 52 30 30 50 6Z",
  },
  { name: "Marquise", d: "M50 4 C76 28 76 72 50 96 C24 72 24 28 50 4Z" },
  { name: "Princess", d: "M12 12 H88 V88 H12Z" },
  { name: "Emerald", d: "M34 6 H66 L78 18 V82 L66 94 H34 L22 82 V18Z" },
  { name: "Cushion", d: "M30 12 H70 Q88 12 88 30 V70 Q88 88 70 88 H30 Q12 88 12 70 V30 Q12 12 30 12Z" },
  {
    name: "Heart",
    d: "M50 90 C20 68 6 52 6 33 C6 19 17 10 30 10 C39 10 46 15 50 23 C54 15 61 10 70 10 C83 10 94 19 94 33 C94 52 80 68 50 90Z",
  },
  { name: "Radiant", d: "M26 8 H74 L86 20 V80 L74 92 H26 L14 80 V20Z" },
];

const stroke = {
  fill: "none",
  stroke: "white",
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke" as const,
  strokeLinejoin: "round" as const,
};

function Draw({ d, delay = 0, opacity = 1 }: { d: string; delay?: number; opacity?: number }) {
  return (
    <motion.path
      d={d}
      {...stroke}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity }}
      transition={{ duration: 1.4, delay, ease }}
    />
  );
}

function Cut({ d, x, y, s, delay = 0 }: { d: string; x: number; y: number; s: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Draw d={d} delay={delay} />
      <g transform="translate(50 50) scale(0.55) translate(-50 -50)">
        <Draw d={d} delay={delay + 0.3} opacity={0.35} />
      </g>
    </g>
  );
}

function FadeText(props: React.SVGProps<SVGTextElement> & { delay?: number }) {
  const { delay = 0, children, ...rest } = props;
  return (
    <motion.text
      {...(rest as object)}
      fill="white"
      fontFamily="var(--font-inter), sans-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.text>
  );
}

// Scene 1: round brilliant, top view, with dimension callouts.
function AccuracyScene() {
  const cx = 210;
  const cy = 190;
  const R = 120;
  const r = 52;
  const pt = (rad: number, a: number) =>
    `${cx + rad * Math.cos(a)} ${cy + rad * Math.sin(a)}`;
  const facets: string[] = [];
  let table = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const b = a + Math.PI / 8;
    table += `${i ? "L" : "M"}${pt(r, a)} `;
    facets.push(`M${pt(r, a)} L${pt(R, b)} L${pt(r, a + Math.PI / 4)}`);
    facets.push(`M${pt(r, a)} L${pt(R, a)}`);
  }
  table += "Z";

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <path d={`M${cx - 150} ${cy} H${cx + 150} M${cx} ${cy - 150} V${cy + 150}`} stroke="white" strokeOpacity={0.12} strokeDasharray="3 6" />
      <Draw d={`M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R}Z`} />
      <Draw d={table} delay={0.3} />
      {facets.map((d, i) => (
        <Draw key={i} d={d} delay={0.5 + i * 0.03} opacity={0.4} />
      ))}
      {/* width callout */}
      <Draw d={`M${cx - R} 335 V355 M${cx + R} 335 V355 M${cx - R} 345 H${cx + R}`} delay={1} opacity={0.7} />
      <FadeText x={cx} y={375} textAnchor="middle" fontSize={15} fontWeight={600} delay={1.4}>
        6.52 mm
      </FadeText>
      {/* height callout */}
      <Draw d={`M35 ${cy - R} H55 M35 ${cy + R} H55 M45 ${cy - R} V${cy + R}`} delay={1.1} opacity={0.7} />
      <FadeText x={22} y={cy} textAnchor="middle" fontSize={15} fontWeight={600} delay={1.5} transform={`rotate(-90 22 ${cy})`}>
        6.49 mm
      </FadeText>
      <FadeText x={380} y={40} textAnchor="end" fontSize={13} fillOpacity={0.6} delay={1.6}>
        TOLERANCE
      </FadeText>
      <FadeText x={380} y={66} textAnchor="end" fontSize={24} fontWeight={600} delay={1.7}>
        ±0.01 mm
      </FadeText>
    </svg>
  );
}

// Scene 2: all nine supported cuts.
function CutsScene() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      {CUTS.map((c, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 30 + col * 125;
        const y = 22 + row * 128;
        return (
          <g key={c.name}>
            <Cut d={c.d} x={x + 12} y={y} s={0.8} delay={i * 0.12} />
            <FadeText x={x + 52} y={y + 100} textAnchor="middle" fontSize={12} fillOpacity={0.6} delay={0.6 + i * 0.12}>
              {c.name.toUpperCase()}
            </FadeText>
          </g>
        );
      })}
    </svg>
  );
}

// Scene 3: a tray of mixed stones being scanned, LED bins below.
function MultiStoneScene() {
  const stones = [0, 2, 4, 1, 6, 3, 8, 5];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <Draw d="M50 40 H350 Q362 40 362 52 V258 Q362 270 350 270 H50 Q38 270 38 258 V52 Q38 40 50 40Z" opacity={0.5} />
      {stones.map((s, i) => (
        <Cut
          key={i}
          d={CUTS[s].d}
          x={62 + (i % 4) * 74}
          y={62 + Math.floor(i / 4) * 102}
          s={0.5}
          delay={0.3 + i * 0.08}
        />
      ))}
      <motion.line
        x1={44}
        x2={356}
        stroke="white"
        strokeWidth={2}
        initial={{ y1: 50, y2: 50, opacity: 0 }}
        animate={{ y1: [50, 260, 50], y2: [50, 260, 50], opacity: 0.8 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {[0, 1, 2, 3, 4].map((b) => (
        <g key={b}>
          <rect x={48 + b * 62} y={305} width={52} height={36} rx={8} {...stroke} strokeOpacity={0.5} />
          <motion.rect
            x={48 + b * 62}
            y={305}
            width={52}
            height={36}
            rx={8}
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 4.8, delay: 1.2 + b * 1.2 }}
          />
        </g>
      ))}
      <FadeText x={200} y={375} textAnchor="middle" fontSize={12} fillOpacity={0.6} delay={1}>
        LED-GUIDED BIN PLACEMENT
      </FadeText>
    </svg>
  );
}

// Scene 4: a measurement report, every reading verified.
function ReportScene() {
  const rows = [
    ["Shape", "Pear"],
    ["Length", "8.04 mm"],
    ["Width", "5.37 mm"],
    ["L/W ratio", "1.50"],
    ["Bin", "B-03"],
  ];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <Cut d={CUTS[2].d} x={30} y={110} s={1.5} />
      {rows.map(([k, v], i) => (
        <motion.g
          key={k}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease }}
        >
          <text x={220} y={110 + i * 46} fill="white" fillOpacity={0.55} fontSize={13}>
            {k.toUpperCase()}
          </text>
          <text x={220} y={130 + i * 46} fill="white" fontSize={18} fontWeight={600}>
            {v}
          </text>
          <path d={`M362 ${118 + i * 46} l5 5 l10 -11`} {...stroke} strokeWidth={2} />
        </motion.g>
      ))}
      <FadeText x={200} y={375} textAnchor="middle" fontSize={12} fillOpacity={0.6} delay={1.4}>
        ZERO MANUAL ENTRY · ZERO HUMAN ERROR
      </FadeText>
    </svg>
  );
}

const features = [
  {
    k: "±0.01mm",
    t: "Accuracy you can certify.",
    b: "High-precision optical calibration measures every stone to a hundredth of a millimetre, every single time.",
    Scene: AccuracyScene,
  },
  {
    k: "9 cuts",
    t: "Round, and every fancy shape.",
    b: "Round, Oval, Pear, Marquise, Princess, Emerald, Cushion, Heart and Radiant. Classified automatically.",
    Scene: CutsScene,
  },
  {
    k: "Multi-stone",
    t: "One stone or a full tray.",
    b: "Single and multi-stone measurement in one pass, with LED-guided bin placement for sorting.",
    Scene: MultiStoneScene,
  },
  {
    k: "Zero error",
    t: "Data you can trust completely.",
    b: "Built for processors, sorters and quality labs that can't afford a single wrong reading.",
    Scene: ReportScene,
  },
];

function Stage({ index }: { index: number }) {
  const { Scene } = features[index];
  return (
    <div className="relative aspect-square overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_65%)]"
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease }}
          className="absolute inset-0 p-md md:p-lg"
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Showcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-black py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <p className="text-[15px] md:text-[17px] font-semibold text-text-secondary">
          Antrix Measure
        </p>
        <h2 className="mt-xs text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1] max-w-[900px]">
          Every facet. Every millimetre.
        </h2>

        <div className="mt-2xl grid lg:grid-cols-2 gap-xl lg:gap-2xl">
          <div className="hidden lg:block lg:sticky lg:top-[120px] h-fit">
            <Stage index={active} />
          </div>

          <div className="space-y-2xl lg:space-y-[28vh] lg:py-[18vh]">
            {features.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0.15, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-35% 0px -35% 0px" }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="lg:hidden mb-lg">
                  <Stage index={i} />
                </div>
                <div className="text-[56px] md:text-[88px] font-semibold tracking-tightest leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  {f.k}
                </div>
                <h3 className="mt-md text-[24px] md:text-[32px] font-semibold tracking-tighter">
                  {f.t}
                </h3>
                <p className="mt-sm max-w-[460px] text-[17px] leading-[1.6] text-text-secondary">
                  {f.b}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
