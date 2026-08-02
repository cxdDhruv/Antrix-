"use client";

import { useEffect, useState } from "react";

export function TypingText({
  text,
  speed = 45,
  startDelay = 200,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  const shown = text.slice(0, count);
  const lines = shown.split("\n");

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
      <span
        className="cursor-blink inline-block w-[0.5ch] -mb-[0.05em] bg-white"
        style={{ height: "0.85em" }}
        aria-hidden
      />
    </span>
  );
}
