import { useEffect, useRef, useState } from "react";
import { Users, Cog, BadgeCheck, ShieldCheck, Clock, HeartHandshake, ArrowRight } from "lucide-react";
import team from "@/assets/bp-why-team.jpg.asset.json";
import equip from "@/assets/bp-why-equip.jpg.asset.json";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ end, suffix = "", duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

const cards = [
  { icon: Users, title: "Experienced Engineers", desc: "A multidisciplinary team of qualified professional engineers with decades of combined expertise." },
  { icon: Cog, title: "Modern Equipment", desc: "Investment in modern machinery and tools that accelerate delivery without compromising quality." },
  { icon: BadgeCheck, title: "Quality Assurance", desc: "Rigorous QA/QC processes embedded across design, procurement and construction." },
  { icon: ShieldCheck, title: "Safety First", desc: "HSE culture ingrained in every activity — zero-harm mindset on every site." },
  { icon: Clock, title: "Timely Project Delivery", desc: "Disciplined planning and execution that consistently hits milestones and handover dates." },
  { icon: HeartHandshake, title: "Client Satisfaction", desc: "Transparent communication and partnership approach that keeps clients returning." },
];

function Card({ c, i }: { c: (typeof cards)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Icon = c.icon;
  return (
    <div
      ref={ref}
      className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_10px_30px_-16px_rgba(6,24,58,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--brand-red)]/30 hover:shadow-[0_30px_60px_-24px_rgba(214,40,40,0.35)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease ${i * 90}ms, transform 700ms cubic-bezier(.22,1,.36,1) ${i * 90}ms, box-shadow 500ms ease, border-color 500ms ease`,
      }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-navy-deep)] text-white transition-colors duration-500 group-hover:bg-[color:var(--brand-red)]">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h4 className="mt-5 font-display text-lg font-bold text-[color:var(--brand-navy-deep)]">{c.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-[24px] shadow-[0_30px_80px_-30px_rgba(6,24,58,0.35)]">
                <img src={team.url} alt="Engineering team" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] hover:scale-105" />
              </div>
              <div className="mt-8 overflow-hidden rounded-[24px] shadow-[0_30px_80px_-30px_rgba(6,24,58,0.35)]">
                <img src={equip.url} alt="Modern equipment" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] hover:scale-105" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Why Choose Us</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
              Engineering Excellence <span className="text-[color:var(--brand-red)]">You Can Trust</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Ben-Prince Engineering Construction Ltd combines technical expertise, innovation, modern equipment
              and an experienced workforce to consistently deliver projects safely, efficiently and to the highest
              standards.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Card key={c.title} c={c} i={i} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 rounded-[28px] bg-[color:var(--brand-navy-deep)] p-8 text-white shadow-[0_40px_90px_-40px_rgba(6,24,58,0.5)] sm:p-12 lg:grid-cols-4">
          {[
            { end: 100, suffix: "+", label: "Projects Completed" },
            { end: 50, suffix: "+", label: "Engineering Solutions" },
            { end: 100, suffix: "+", label: "Professional Workforce" },
            { end: 100, suffix: "%", label: "Client Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[28px] bg-[color:var(--brand-navy-deep)] p-10 text-white shadow-[0_40px_90px_-40px_rgba(6,24,58,0.5)] sm:p-14">
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 45%, transparent), transparent 70%)" }}
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="max-w-2xl font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
              Building Stronger Communities Through Engineering Excellence
            </h3>
            <a href="#contact" className="btn-pill btn-pill--primary group shrink-0">
              Let's Talk About Your Project
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
