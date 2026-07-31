import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Button({
  href,
  children,
  variant = "solid",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  arrow?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 px-[28px] py-[14px] rounded-md text-[14px] md:text-[15px] font-semibold tracking-button transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-white text-black hover:bg-white/85"
      : "border border-white/70 text-white hover:bg-white hover:text-black";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
      {arrow && <ArrowRight size={16} />}
    </Link>
  );
}
