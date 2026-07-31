"use client";

import { useRef, type ReactNode } from "react";
import { MouseGlow } from "@/components/ui/MouseGlow";

export function GlowSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
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
      className={`precision-grid relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MouseGlow ref={glowRef} />
      {children}
    </section>
  );
}
