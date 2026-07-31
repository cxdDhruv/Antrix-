import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { Capabilities } from "@/components/Capabilities";
import { Industries } from "@/components/Industries";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyAntrix } from "@/components/WhyAntrix";
import { CtaBanner } from "@/components/CtaBanner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Products />
      <Capabilities />
      <Industries />
      <HowItWorks />
      <WhyAntrix />
      <CtaBanner />
      <Contact />
      <Footer />
    </main>
  );
}
