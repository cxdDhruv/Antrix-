import Link from "next/link";
import { Eye, Cpu, Wrench, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    icon: Eye,
    title: "Machine Vision Systems",
    body: "Computer vision pipelines that detect, measure, classify and inspect in real time, at industrial scale.",
  },
  {
    icon: Cpu,
    title: "Mechatronics Engineering",
    body: "Mechanical design, electronics, embedded firmware and control logic, engineered as one precise unit.",
  },
  {
    icon: Wrench,
    title: "Custom Solutions",
    body: "From first concept to full deployment, we build what standard tools can't solve.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-[#f5f5f7] text-black py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <p className="text-[15px] md:text-[17px] font-semibold text-black/50">
            What we do
          </p>
          <h2 className="mt-xs text-[40px] md:text-[80px] font-semibold tracking-tightest leading-[1]">
            Vision. Mechanics.
            <br />
            <span className="text-black/40">Intelligence.</span>
          </h2>
        </Reveal>

        <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-[28px] bg-white p-lg md:p-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                  <c.icon size={26} />
                </div>
                <h3 className="mt-xl text-[24px] md:text-[28px] font-semibold tracking-tighter leading-[1.15]">
                  {c.title}
                </h3>
                <p className="mt-sm text-[16px] leading-[1.6] text-black/60">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-xl">
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-1 text-[17px] font-medium"
          >
            See all solutions
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
