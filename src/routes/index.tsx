import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Expertise } from "@/components/site/Expertise";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Careers } from "@/components/site/Careers";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-white text-[color:var(--brand-navy-deep)]">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Expertise />
      <WhyChooseUs />
      <Careers />
      <Contact />
      <Footer />
    </main>
  );
}
