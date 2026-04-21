import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ScenarioStack } from "@/components/sections/ScenarioStack";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { Bilingual } from "@/components/sections/Bilingual";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTAFooter } from "@/components/sections/CTAFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <ScenarioStack />
      <Features />
      <Stats />
      <Bilingual />
      <Testimonials />
      <CTAFooter />
    </>
  );
}
