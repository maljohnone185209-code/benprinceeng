import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Wrench,
  Building2,
  HardHat,
  Truck,
  Compass,
  Waves,
  Map,
  Ruler,
  Sun,
  ShoppingBag,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import svcEngAsset from "@/assets/bp-svc-engineering.jpg.asset.json";
import svcBuildAsset from "@/assets/bp-svc-building.jpg.asset.json";
import svcCivilAsset from "@/assets/bp-svc-civil.jpg.asset.json";

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Feature = {
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
};

const features: Feature[] = [
  {
    eyebrow: "01 — Featured Service",
    title: "Engineering & Construction",
    desc: "End-to-end engineering delivery — from concept design and procurement to construction, commissioning and long-term operational support across every sector we serve.",
    bullets: [
      "Engineering Construction",
      "Oil & Gas Services",
      "Infrastructure Development",
      "Project Management",
    ],
    image: svcEngAsset.url,
  },
  {
    eyebrow: "02 — Featured Service",
    title: "Building Construction",
    desc: "We design and build residential, commercial and industrial structures with meticulous craftsmanship, modern methods and uncompromising attention to safety and finish.",
    bullets: [
      "Residential Construction",
      "Commercial Construction",
      "Industrial Construction",
      "Swimming Pool Construction",
    ],
    image: svcBuildAsset.url,
    reverse: true,
  },
  {
    eyebrow: "03 — Featured Service",
    title: "Civil Engineering",
    desc: "Robust civil works engineered for Nigeria's climate and terrain — roads, drainage, site development and structural systems built to endure and perform.",
    bullets: [
      "Civil Engineering",
      "Roads",
      "Drainage",
      "Site Development",
      "Structural Works",
    ],
    image: svcCivilAsset.url,
  },
];

const grid = [
  { icon: Wrench, title: "Oil & Gas Services", desc: "Pipeline works, facility construction and maintenance for the energy sector." },
  { icon: HardHat, title: "Fabrication", desc: "Structural and metal fabrication engineered to international standards." },
  { icon: Building2, title: "Facility Maintenance", desc: "Preventive and reactive maintenance for commercial and industrial assets." },
  { icon: Truck, title: "Transport & Logistics", desc: "Reliable movement of equipment, materials and personnel to any site." },
  { icon: Compass, title: "Geotechnical Investigation", desc: "Soil and subsurface studies that de-risk every foundation decision." },
  { icon: Waves, title: "Geophysical & Marine Surveys", desc: "Coastal, offshore and hydrographic surveys with modern instrumentation." },
  { icon: Map, title: "Geospatial & Land Surveys", desc: "Precision cadastral, topographic and control surveys nationwide." },
  { icon: Ruler, title: "Architectural Design", desc: "Contextual, functional and beautifully detailed architecture." },
  { icon: Sun, title: "Solar Light Installation", desc: "Renewable street and facility lighting engineered for uptime." },
  { icon: ShoppingBag, title: "Procurement of Building Materials", desc: "Vetted supply chain for quality-assured project materials." },
  { icon: ShieldCheck, title: "Quality Control & Inspection", desc: "Independent QA/QC ensuring every specification is met." },
  { icon: Cpu, title: "Engineering Consultancy", desc: "Advisory across feasibility, design review and value engineering." },
];

function FeatureBlock({ f, index }: { f: Feature; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
        f.reverse ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div
        className={`lg:col-span-6 lg:[direction:ltr] transition-all duration-[900ms] ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="group relative overflow-hidden rounded-[24px] shadow-[0_30px_80px_-30px_rgba(6,24,58,0.35)]">
          <img
            src={f.image}
            alt={f.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[color:var(--brand-navy-deep)]/25 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--brand-navy-deep)] backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div
        className={`lg:col-span-6 lg:[direction:ltr] transition-all duration-[900ms] ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: inView ? "150ms" : "0ms" }}
      >
        <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">
          {f.eyebrow}
        </div>
        <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-[2.75rem]">
          {f.title}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{f.desc}</p>
        <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {f.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[15px] text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-red)]" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a href="#contact" className="btn-pill btn-pill--dark group">
            Learn More
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

function GridCard({ icon: Icon, title, desc, i }: { icon: typeof Wrench; title: string; desc: string; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_10px_30px_-16px_rgba(6,24,58,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--brand-red)]/30 hover:shadow-[0_30px_60px_-24px_rgba(214,40,40,0.35)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease ${i * 60}ms, transform 700ms cubic-bezier(.22,1,.36,1) ${i * 60}ms, box-shadow 500ms ease, border-color 500ms ease`,
      }}
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--brand-navy-deep)] text-white transition-colors duration-500 group-hover:bg-[color:var(--brand-red)]">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h4 className="mt-5 font-display text-lg font-bold text-[color:var(--brand-navy-deep)]">{title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{desc}</p>
      <a
        href="#contact"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-navy-deep)] transition-colors group-hover:text-[color:var(--brand-red)]"
      >
        Learn More
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-navy-deep)]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-navy-deep)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
            Our Services
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
            Engineering Solutions Built on{" "}
            <span className="text-[color:var(--brand-red)]">Quality, Innovation &amp; Reliability</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Ben-Prince Engineering Construction Ltd delivers comprehensive engineering, construction, civil
            engineering, fabrication, oil &amp; gas, surveying, infrastructure development, maintenance,
            procurement and project management solutions with professionalism, quality and safety.
          </p>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-28">
          {features.map((f, i) => (
            <FeatureBlock key={f.title} f={f} index={i} />
          ))}
        </div>

        <div className="mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">
              Additional Capabilities
            </div>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-[color:var(--brand-navy-deep)] sm:text-3xl lg:text-4xl">
              Professional Services Across the Full Project Lifecycle
            </h3>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {grid.map((s, i) => (
              <GridCard key={s.title} {...s} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
