import { useEffect, useRef, useState } from "react";
import { GraduationCap, Sprout, Briefcase, FileSignature, ArrowRight } from "lucide-react";
import careers from "@/assets/bp-careers.jpg.asset.json";

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

const opps = [
  { icon: GraduationCap, title: "Graduate Programme", desc: "Structured entry-level pathway for high-potential graduates in engineering and construction." },
  { icon: Sprout, title: "Internships", desc: "Hands-on site and office experience for students building a career in the built environment." },
  { icon: Briefcase, title: "Experienced Professionals", desc: "Senior roles across engineering, project management, QA/QC, HSE and operations." },
  { icon: FileSignature, title: "Contract Opportunities", desc: "Project-based engagements for specialists, consultants and skilled subcontractors." },
];

export function Careers() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="careers" className="relative bg-[color:var(--brand-navy-deep)]/[0.03] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[28px] shadow-[0_40px_90px_-40px_rgba(6,24,58,0.45)]">
              <img src={careers.url} alt="Ben-Prince team on site" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] hover:scale-[1.04]" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Careers</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
              Join Our <span className="text-[color:var(--brand-red)]">Professional Team</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We're always looking for talented engineers, project managers, technicians and skilled
              professionals who are passionate about delivering engineering excellence.
            </p>

            <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {opps.map((o, i) => {
                const Icon = o.icon;
                return (
                  <div
                    key={o.title}
                    className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(6,24,58,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--brand-red)]/30 hover:shadow-[0_30px_60px_-24px_rgba(214,40,40,0.35)]"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(24px)",
                      transition: `opacity 700ms ease ${i * 110}ms, transform 700ms cubic-bezier(.22,1,.36,1) ${i * 110}ms, box-shadow 500ms ease, border-color 500ms ease`,
                    }}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--brand-navy-deep)] text-white transition-colors duration-500 group-hover:bg-[color:var(--brand-red)]">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h4 className="mt-4 font-display text-lg font-bold text-[color:var(--brand-navy-deep)]">{o.title}</h4>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{o.desc}</p>
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-navy-deep)] transition-colors group-hover:text-[color:var(--brand-red)]"
                    >
                      Apply Now
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 rounded-[28px] bg-white p-10 text-center shadow-[0_30px_80px_-40px_rgba(6,24,58,0.35)] sm:flex-row sm:justify-between sm:p-12 sm:text-left">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Grow With Us</div>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[color:var(--brand-navy-deep)] sm:text-3xl">
              Ready To Build Your Career?
            </h3>
          </div>
          <a href="#contact" className="btn-pill btn-pill--primary group">
            Apply Today
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
