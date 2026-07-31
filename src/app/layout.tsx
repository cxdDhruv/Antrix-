import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://antrix.solution"),
  title: "Antrix",
  description:
    "Antrix builds precision machine vision and mechatronics systems for industries that cannot afford to be wrong. Products and custom solutions. India and global markets.",
  keywords: [
    "machine vision",
    "mechatronics",
    "precision measurement",
    "computer vision systems",
    "industrial automation",
    "Antrix Measure",
  ],
  openGraph: {
    title: "Antrix — Machine Vision & Mechatronics | Built for What's Next",
    description:
      "Antrix builds precision machine vision and mechatronics systems for industries that cannot afford to be wrong.",
    images: ["/images/logo.png"],
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-primary text-text-primary font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
