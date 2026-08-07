"use client";

import { useRef, type ReactNode } from "react";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export function GlowSection({
  children,
  className = "",
  variant = "dark",
}: {
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
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
      className={`precision-grid relative overflow-hidden ${
        variant === "light" ? "theme-light" : ""
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AmbientBackground variant={variant} />
      <MouseGlow ref={glowRef} />
      {children}
    </section>
  );
}
