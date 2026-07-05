import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-navy-deep)] text-white">
      <Nav />
      <Hero />
      {/* Spacer so scroll-triggered nav state is testable */}
      <div className="h-[120vh]" aria-hidden />
    </main>
  );
}
