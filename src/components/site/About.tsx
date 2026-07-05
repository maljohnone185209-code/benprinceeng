import { useEffect, useRef, useState } from "react";
import {
  Target,
  Compass,
  ShieldCheck,
  Award,
  HardHat,
  Lightbulb,
  Handshake,
  Smile,
  CheckCircle2,
} from "lucide-react";
import about1Asset from "@/assets/bp-about-1.jpg.asset.json";
import about2Asset from "@/assets/bp-about-2.jpg.asset.json";

const coreValues = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honest, transparent, and accountable in every engagement we deliver." },
  { icon: Award, title: "Excellence", desc: "Uncompromising standards in engineering, workmanship, and finish." },
  { icon: HardHat, title: "Safety", desc: "A safety-first culture on every site — for our people and yours." },
  { icon: Lightbulb, title: "Innovation", desc: "Modern methods, smart tools, and forward-thinking design." },
  { icon: Handshake, title: "Professionalism", desc: "Reliable teams, clear communication, and disciplined delivery." },
  { icon: Smile, title: "Client Satisfaction", desc: "Long-term relationships built on trust and consistent results." },
];

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 25, suffix: "+", label: "Professional Engineers" },
  { value: 100, suffix: "%", label: "Safety-First Approach" },
  { value: 15, suffix: "+", label: "Years of Combined Expertise" },
];

function useInView<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

function CountUp({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  const imgs = useInView<HTMLDivElement>();
  const copy = useInView<HTMLDivElement>();
  const mv = useInView<HTMLDivElement>();
  const cv = useInView<HTMLDivElement>();

  return (
    <>
      <section id="about" className="relative isolate bg-white py-24 sm:py-28 lg:py-32">
        {/* decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
          style={{
            background:
              "radial-gradient(1000px 300px at 20% 0%, color-mix(in oklab, var(--brand-navy) 8%, transparent), transparent 60%)",
          }}
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          {/* Left column — images */}
          <div ref={imgs.ref} className="relative lg:col-span-6">
            <div
              className={`relative overflow-hidden rounded-[24px] shadow-[0_30px_80px_-30px_rgba(6,24,58,0.35)] transition-all duration-1000 ease-out ${
                imgs.inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <img
                src={about1Asset.url}
                alt="Ben-Prince Engineering construction skyline with cranes at dusk"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              {/* red corner accent */}
              <div
                aria-hidden
                className="absolute left-0 top-0 h-1.5 w-24 rounded-br-full"
                style={{ background: "var(--brand-red)" }}
              />
            </div>

            {/* overlapping smaller card */}
            <div
              className={`absolute -bottom-10 right-0 hidden w-[62%] overflow-hidden rounded-[24px] border-8 border-white shadow-[0_30px_60px_-20px_rgba(6,24,58,0.45)] transition-all duration-1000 ease-out sm:block ${
                imgs.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: imgs.inView ? "250ms" : "0ms" }}
            >
              <img
                src={about2Asset.url}
                alt="Ben-Prince Engineering road construction and civil works"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* floating experience chip */}
            <div
              className={`absolute -left-4 bottom-6 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgba(6,24,58,0.35)] transition-all duration-1000 ease-out md:flex ${
                imgs.inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: imgs.inView ? "500ms" : "0ms" }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: "linear-gradient(135deg, var(--brand-red), #ef3b3b)" }}
              >
                <Award size={20} strokeWidth={2.4} />
              </span>
              <div>
                <div className="font-display text-lg font-extrabold leading-none text-[color:var(--brand-navy-deep)]">
                  Trusted
                </div>
                <div className="text-xs font-medium text-slate-500">Engineering Partner</div>
              </div>
            </div>
          </div>

          {/* Right column — copy */}
          <div ref={copy.ref} className="lg:col-span-6">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-navy)]/15 bg-[color:var(--brand-navy)]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-navy)] transition-all duration-700 ${
                copy.inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
              About Us
            </div>

            <h2
              className={`mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-[2.75rem] transition-all duration-700 ${
                copy.inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: copy.inView ? "120ms" : "0ms" }}
            >
              Engineering Excellence Built on{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Quality, Innovation</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 -z-0 h-2.5 rounded-full"
                  style={{ background: "color-mix(in oklab, var(--brand-red) 25%, transparent)" }}
                />
              </span>{" "}
              &amp; Integrity
            </h2>

            <p
              className={`mt-6 text-base leading-relaxed text-slate-600 sm:text-[1.05rem] transition-all duration-700 ${
                copy.inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: copy.inView ? "240ms" : "0ms" }}
            >
              Ben-Prince Engineering Construction Ltd is a Nigerian multidisciplinary engineering and construction
              company delivering end-to-end solutions across building construction, civil engineering, structural
              fabrication, oil &amp; gas services, land surveying, facility maintenance, infrastructure development,
              and project management. We combine seasoned professionals, modern methods, and rigorous safety standards
              to deliver projects that stand the test of time.
            </p>

            <p
              className={`mt-4 text-base leading-relaxed text-slate-600 sm:text-[1.05rem] transition-all duration-700 ${
                copy.inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: copy.inView ? "340ms" : "0ms" }}
            >
              From concept to commissioning, we partner with private clients, developers, and public institutions to
              deliver work defined by quality, precision, and integrity — engineered for Nigeria's next chapter.
            </p>

            {/* Mission / Vision */}
            <div ref={mv.ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Target,
                  label: "Our Mission",
                  text:
                    "Deliver safe, innovative, and high-quality engineering and construction solutions that exceed client expectations while maintaining professionalism, integrity, and sustainability.",
                },
                {
                  icon: Compass,
                  label: "Our Vision",
                  text:
                    "To become one of Nigeria's most respected engineering and construction companies through innovation, quality workmanship, and long-term client relationships.",
                },
              ].map(({ icon: Icon, label, text }, i) => (
                <article
                  key={label}
                  className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_-30px_rgba(6,24,58,0.35)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_70px_-25px_rgba(6,24,58,0.45)] ${
                    mv.inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
                    transitionDelay: mv.inView ? `${i * 150}ms` : "0ms",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                    style={{ background: "color-mix(in oklab, var(--brand-red) 22%, transparent)" }}
                  />
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-navy-deep), var(--brand-navy))",
                    }}
                  >
                    <Icon size={22} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[color:var(--brand-navy-deep)]">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="mx-auto mt-24 max-w-7xl px-5 sm:mt-28 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-navy)]/15 bg-[color:var(--brand-navy)]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-navy)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
              Core Values
            </div>
            <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl">
              The principles behind every project we deliver
            </h3>
          </div>

          <div ref={cv.ref} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map(({ icon: Icon, title, desc }, i) => (
              <article
                key={title}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(6,24,58,0.25)] transition-all duration-700 hover:-translate-y-1.5 hover:border-[color:var(--brand-red)]/25 hover:shadow-[0_25px_60px_-20px_rgba(6,24,58,0.35)] ${
                  cv.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: cv.inView ? `${i * 110}ms` : "0ms" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "linear-gradient(90deg, var(--brand-navy), var(--brand-red))" }}
                />
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl text-[color:var(--brand-navy-deep)] transition-colors group-hover:text-white"
                  style={{ background: "color-mix(in oklab, var(--brand-navy) 8%, white)" }}
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <div className="mt-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[color:var(--brand-red)]" />
                  <h4 className="font-display text-lg font-bold text-[color:var(--brand-navy-deep)]">
                    {title}
                  </h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience banner */}
      <section
        aria-label="Experience by the numbers"
        className="relative isolate overflow-hidden bg-[color:var(--brand-navy-deep)] py-16 text-white sm:py-20"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(214,40,40,0.55), transparent 45%), radial-gradient(circle at 80% 70%, rgba(11,45,92,0.9), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{ animation: `fadeUp 700ms cubic-bezier(.22,1,.36,1) ${i * 120}ms both` }}
            >
              <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div
                aria-hidden
                className="mx-auto mt-3 h-[3px] w-10 rounded-full"
                style={{ background: "var(--brand-red)" }}
              />
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
