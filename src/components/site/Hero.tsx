import { useEffect, useRef } from "react";
import { ArrowRight, BadgeCheck, HardHat, ShieldCheck, Sparkles } from "lucide-react";
import bpLogoAsset from "@/assets/bp-logo.png.asset.json";
const bpLogo = bpLogoAsset.url;
import heroAsset from "@/assets/bp-hero.jpg.asset.json";

const trust = [
  { icon: BadgeCheck, label: "Registered Company" },
  { icon: HardHat, label: "Professional Engineers" },
  { icon: Sparkles, label: "Quality Assurance" },
  { icon: ShieldCheck, label: "Safety First" },
];

export function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[color:var(--brand-navy-deep)] text-white"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 -z-20 will-change-transform animate-[heroFade_1200ms_ease-out_both]"
        style={{
          backgroundImage: `url(${heroAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Navy overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(6,24,58,0.78) 0%, rgba(11,45,92,0.55) 45%, rgba(6,24,58,0.55) 100%)",
        }}
      />

      {/* Watermark BP logo */}
      <img
        src={bpLogo}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -z-10 select-none animate-[watermark_1600ms_ease-out_both]"
        style={{
          right: "-8%",
          bottom: "-14%",
          width: "min(78vh, 780px)",
          opacity: 0.1,
          filter: "brightness(0) invert(1)",
        }}
      />

      {/* Bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(6,24,58,0.85))",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-7 xl:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur-md animate-[fadeUp_700ms_ease-out_200ms_both]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
            Engineering · Construction · Fabrication
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem] animate-[slideInLeft_900ms_cubic-bezier(.22,1,.36,1)_300ms_both]">
            Building Nigeria's{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Future</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full"
                style={{ background: "color-mix(in oklab, var(--brand-red) 80%, transparent)" }}
              />
            </span>{" "}
            Through Engineering Excellence
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-[fadeUp_700ms_ease-out_650ms_both]">
            Ben-Prince Engineering Construction Ltd delivers innovative engineering, building
            construction, civil engineering, fabrication, oil &amp; gas, facility maintenance,
            and project management solutions with quality, precision, safety, and integrity
            across Nigeria.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#quote"
              className="btn-pill btn-pill--primary animate-[fadeUp_600ms_ease-out_900ms_both]"
            >
              Request a Quote
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="btn-pill btn-pill--ghost animate-[fadeUp_600ms_ease-out_1050ms_both]"
            >
              Explore Projects
            </a>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {trust.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.06] px-3.5 py-3 backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.09]"
                style={{
                  animation: `riseIn 700ms cubic-bezier(.22,1,.36,1) ${1200 + i * 120}ms both`,
                }}
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--brand-red) 90%, black), #ff5a5a)",
                  }}
                >
                  <Icon size={16} className="text-white" strokeWidth={2.4} />
                </span>
                <span className="text-xs font-semibold leading-tight text-white/90 sm:text-sm">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column intentionally left open so the house remains visible */}
        <div aria-hidden className="hidden lg:col-span-5 lg:block xl:col-span-6" />
      </div>

      {/* Local keyframes + button system */}
      <style>{`
        @keyframes heroFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes watermark { from { opacity: 0; transform: translateY(30px) scale(.96) } to { opacity: .1; transform: translateY(0) scale(1) } }
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </section>
  );
}
