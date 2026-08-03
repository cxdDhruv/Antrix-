import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Products",
    links: [{ label: "Antrix Measure", href: "/antrix-measure" }],
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
    <footer className="relative z-10 border-t border-border bg-bg-primary py-2xl">
      <div className="max-w-content mx-auto px-md md:px-xl">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Antrix" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14" />
          <span className="text-[20px] md:text-[22px] font-semibold tracking-tighter">
            ANTRIX
          </span>
        </div>
        <p className="mt-xs text-[15px] text-text-secondary">
          Built for What&apos;s Next.
        </p>

        <div className="mt-xl grid grid-cols-2 md:grid-cols-4 gap-lg max-w-[760px]">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold text-white mb-sm">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-text-secondary hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[13px] font-semibold text-white mb-sm">
              Founder
            </h4>
            <p className="text-[14px] text-text-secondary">Dhruv Jasani</p>
            <a
              href="mailto:info@antrix.solutions"
              className="block mt-2 text-[14px] text-text-secondary hover:text-white transition-colors"
            >
              info@antrix.solutions
            </a>
          </div>
        </div>

        <div className="mt-2xl pt-lg border-t border-border text-[13px] text-text-muted">
          © 2025 Antrix. All rights reserved.
          <br />
          Surat, Gujarat, India.
        </div>
      </div>
    </footer>
  );
}
