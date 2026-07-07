import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PhoneCall } from "lucide-react";
import { expertiseItems, WHATSAPP_URL } from "@/lib/expertise-data";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export function Expertise() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <>
      <section id="projects" className="relative bg-[color:var(--brand-navy-deep)]/[0.03] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-navy-deep)] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
              Our Project Expertise
            </div>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
              Delivering Engineering Excellence Across{" "}
              <span className="text-[color:var(--brand-red)]">Multiple Industries</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Our multidisciplinary expertise enables us to successfully execute projects across residential,
              commercial, industrial, infrastructure and energy sectors while maintaining the highest standards
              of safety, quality and professionalism.
            </p>
          </div>

          <div ref={ref} className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-3.5">
            {expertiseItems.map((p, i) => (
              <Link
                key={p.slug}
                to="/expertise/$slug"
                params={{ slug: p.slug }}
                className="rounded-full bg-[color:var(--brand-navy-deep)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-14px_rgba(6,24,58,0.6)] transition-all duration-500 hover:-translate-y-1 hover:bg-[color:var(--brand-red)] hover:shadow-[0_18px_35px_-14px_rgba(214,40,40,0.6)]"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                  transitionDelay: inView ? `${i * 40}ms` : "0ms",
                }}
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="relative overflow-hidden bg-[color:var(--brand-navy-deep)] py-24 text-white sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px, 60px 60px",
          }}
        />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 40%, transparent), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">Let's Collaborate</div>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Let's Build Something Exceptional Together
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Whether you're planning a residential, commercial, industrial or infrastructure project,
            Ben-Prince Engineering Construction Ltd is ready to deliver engineering excellence with
            quality, innovation and professionalism.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--primary group">
              Request a Quote
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-pill btn-pill--ghost">
              <PhoneCall size={16} />
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
