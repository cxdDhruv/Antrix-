import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Antrix Measure", href: "/antrix-measure" },
      { label: "Antrix AWM", href: "/antrix-awm" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Computer Vision", href: "/solutions" },
      { label: "Mechatronics", href: "/solutions" },
      { label: "Robotics", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0a] border-t border-white/10 pt-2xl pb-lg">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-lg">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Antrix" width={36} height={36} className="w-9 h-9" />
              <span className="text-[16px] font-semibold tracking-[0.2em]">ANTRIX</span>
            </div>
            <p className="mt-md max-w-[320px] text-[14px] leading-[1.6] text-white/50">
              Precision machine vision and mechatronics. Built for what&apos;s
              next.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold text-white mb-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-2xl pt-md border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-xs text-[12px] text-white/40">
          <span>Copyright © 2026 Antrix. All rights reserved.</span>
          <span>
            Surat, Gujarat, India ·{" "}
            <a href="mailto:info@antrix.solutions" className="hover:text-white">
              info@antrix.solutions
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
