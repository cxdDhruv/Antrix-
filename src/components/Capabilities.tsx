import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eye, Cpu, Wrench } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "Machine Vision Systems",
    body: "We build computer vision pipelines that detect, measure, classify, and inspect — in real time, at industrial scale. Our systems see what human eyes and standard cameras miss.",
  },
  {
    icon: Cpu,
    title: "Mechatronics Engineering",
    body: "Hardware and software, designed together. We engineer complete systems — mechanical design, electronics, embedded firmware, and control logic — that work as one precise unit.",
  },
  {
    icon: Wrench,
    title: "Custom Solutions",
    body: "Every industry has a problem that standard tools can't solve. We work with clients to design and build custom machine vision and mechatronics solutions — from concept to deployment.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <Reveal>
          <Eyebrow>WHAT WE DO</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
            Vision. Mechanics.
            <br />
            Intelligence.
          </h2>
        </Reveal>

        <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="h-full border border-border rounded-lg bg-bg-secondary p-lg hover:bg-bg-elevated transition-colors">
                <card.icon size={28} className="text-white" />
                <h3 className="mt-md text-[20px] font-semibold">
                  {card.title}
                </h3>
                <p className="mt-sm text-[15px] leading-[1.7] text-text-secondary">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-xl">
          <Button href="/solutions" variant="ghost" arrow>
            See All Solutions
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
