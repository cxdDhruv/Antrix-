"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/#products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b bg-bg-primary/80 backdrop-blur transition-shadow duration-300 ${
        scrolled
          ? "border-border shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          : "border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto flex items-center justify-between px-md md:px-xl h-[72px]">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="Antrix" width={44} height={44} className="w-10 h-10 md:w-11 md:h-11" />
          <span className="text-[17px] md:text-[18px] font-semibold tracking-tighter">
            ANTRIX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[14px] text-text-secondary hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/#contact" arrow>
            Request a Demo
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-2 -mr-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg-primary px-md py-lg">
          <nav className="flex flex-col gap-md">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[16px] text-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-lg" onClick={() => setOpen(false)}>
            <Button href="/#contact" arrow>
              Request a Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
