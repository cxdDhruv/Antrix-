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
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SectionDivider from="black" to="white" />
      <About />
      <SectionDivider from="white" to="black" />
      <Products />
      <SectionDivider from="black" to="white" />
      <Capabilities />
      <SectionDivider from="white" to="black" />
      <Industries />
      <SectionDivider from="black" to="white" />
      <HowItWorks />
      <SectionDivider from="white" to="black" />
      <WhyAntrix />
      <SectionDivider from="black" to="white" />
      <CtaBanner />
      <SectionDivider from="white" to="black" />
      <Contact />
      <Footer />
    </main>
  );
}
