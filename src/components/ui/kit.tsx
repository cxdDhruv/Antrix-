"use client";

// Shared building blocks for the Apple-style pages.
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export const ease = [0.22, 1, 0.36, 1] as const;

type Tone = "dark" | "light";

export function Section({
  tone = "dark",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`py-2xl md:py-3xl scroll-mt-[56px] ${
        tone === "light" ? "bg-[#f5f5f7] text-black" : "bg-black text-white"
      } ${className}`}
    >
      <div className="max-w-content mx-auto px-md md:px-xl">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  muted,
  tone = "dark",
  center = false,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  muted?: ReactNode;
  tone?: Tone;
  center?: boolean;
  children?: ReactNode;
}) {
  const dim = tone === "light" ? "text-black/40" : "text-white/40";
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`text-[15px] md:text-[17px] font-semibold ${
            tone === "light" ? "text-black/50" : "text-text-secondary"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="mt-xs text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1]">
        {title}
        {muted && (
          <>
            <br />
            <span className={dim}>{muted}</span>
          </>
        )}
      </h2>
      {children && (
        <div
          className={`mt-lg max-w-[680px] text-[17px] md:text-[19px] leading-[1.6] ${
            tone === "light" ? "text-black/60" : "text-text-secondary"
          } ${center ? "mx-auto" : ""}`}
        >
          {children}
        </div>
      )}
    </Reveal>
  );
}

export function PillLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-[26px] py-[12px] text-[15px] md:text-[17px] font-medium transition-transform duration-300 hover:scale-[1.04] ${
        tone === "light" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[15px] md:text-[17px] font-medium"
    >
      {children}
      <ChevronRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

/** Centered page hero with masked line reveal and an optional media stage that grows on scroll. */
export function PageHero({
  eyebrow,
  lines,
  sub,
  ctas,
  media,
  mediaClass = "bg-[#eceeec]",
}: {
  eyebrow: string;
  lines: string[];
  sub: ReactNode;
  ctas?: ReactNode;
  media?: ReactNode;
  mediaClass?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [56, 28]);

  return (
    <section
      className={`relative overflow-hidden bg-black pt-[140px] md:pt-[180px] ${
        media ? "pb-2xl" : "pb-2xl md:pb-3xl"
      }`}
    >
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
          {eyebrow}
        </motion.p>
        <h1 className="mt-sm text-[48px] md:text-[96px] lg:text-[120px] font-semibold leading-[0.95] tracking-tightest">
          {lines.map((line, i) => (
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="mt-lg mx-auto max-w-[680px] text-[17px] md:text-[21px] leading-[1.5] text-text-secondary"
        >
          {sub}
        </motion.div>
        {ctas && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            className="mt-lg flex flex-wrap items-center justify-center gap-x-lg gap-y-md"
          >
            {ctas}
          </motion.div>
        )}
      </div>

      {media && (
        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease }}
          className="relative mt-2xl max-w-content mx-auto px-md md:px-xl"
        >
          <motion.div
            style={{ scale, borderRadius: radius }}
            className={`relative overflow-hidden aspect-[4/3] md:aspect-[16/8] ${mediaClass}`}
          >
            {media}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </motion.span>
  );
}

/** Big paragraph whose words light up as it scrolls through the viewport. */
export function ScrollWords({ text, eyebrow }: { text: string; eyebrow?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  return (
    <div className="max-w-[1100px]">
      {eyebrow && (
        <p className="text-[15px] md:text-[17px] font-semibold text-text-secondary mb-md">
          {eyebrow}
        </p>
      )}
      <p
        ref={ref}
        className="flex flex-wrap text-[30px] md:text-[56px] font-semibold leading-[1.15] tracking-tighter"
      >
        {words.map((w, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {w}
          </Word>
        ))}
      </p>
    </div>
  );
}

export type Stat = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export function StatGrid({ items }: { items: Stat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-xl gap-x-md">
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="text-center">
          <div className="text-[44px] md:text-[72px] font-semibold tracking-tighter leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            <CountUp
              to={s.to}
              decimals={s.decimals ?? 0}
              prefix={s.prefix}
              suffix={s.suffix}
              duration={1.6}
            />
          </div>
          <div className="mt-sm text-[14px] md:text-[15px] text-text-secondary">
            {s.label}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.05, ease }}
          className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 py-md"
        >
          <span className="text-[15px] md:text-[17px] text-text-secondary">{r.label}</span>
          <span className="text-[19px] md:text-[24px] font-semibold tracking-tighter">
            {r.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** Bento card. `wide` spans two columns in a 3-column grid. */
export function Tile({
  title,
  body,
  tone = "dark",
  wide = false,
  icon,
  delay = 0,
}: {
  title: string;
  body: string;
  tone?: Tone;
  wide?: boolean;
  icon?: ReactNode;
  delay?: number;
}) {
  const light = tone === "light";
  return (
    <Reveal delay={delay} className={`h-full ${wide ? "md:col-span-2" : ""}`}>
      <div
        className={`group relative h-full min-h-[260px] overflow-hidden rounded-[28px] p-lg md:p-xl flex flex-col justify-end transition-all duration-500 ${
          light
            ? "bg-white hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
            : "border border-white/10 bg-[#0d0d0d] hover:border-white/30"
        }`}
      >
        {!light && (
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {icon && (
          <div
            className={`absolute top-lg left-lg md:top-xl md:left-xl flex h-14 w-14 items-center justify-center rounded-2xl ${
              light ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {icon}
          </div>
        )}
        <h3
          className={`relative text-[24px] md:text-[32px] font-semibold tracking-tighter leading-[1.15] ${
            icon ? "mt-[96px]" : ""
          }`}
        >
          {title}
        </h3>
        <p
          className={`relative mt-sm max-w-[520px] text-[16px] leading-[1.6] ${
            light ? "text-black/60" : "text-text-secondary"
          }`}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

export function Mentors({
  title,
  body,
  people,
}: {
  title: string;
  body: string;
  people: { photo: string; name: string; title: string; college: string }[];
}) {
  return (
    <Section tone="light">
      <Heading eyebrow="Special thanks" title={title} tone="light" center>
        {body}
      </Heading>
      <div className="mt-xl flex flex-wrap justify-center gap-md">
        {people.map((m, i) => (
          <Reveal key={m.name} delay={0.1 + i * 0.1}>
            <div className="group w-[300px] rounded-[28px] bg-white p-lg text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-md text-[20px] font-semibold tracking-tighter">{m.name}</h3>
              <p className="mt-1 text-[14px] text-black/60">{m.title}</p>
              <p className="text-[14px] text-black/60">{m.college}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
