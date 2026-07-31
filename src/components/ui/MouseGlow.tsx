"use client";

import { forwardRef } from "react";

export const MouseGlow = forwardRef<HTMLDivElement>(function MouseGlow(_, ref) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 z-[1] pointer-events-none transition-[background] duration-150 ease-out"
    />
  );
});
