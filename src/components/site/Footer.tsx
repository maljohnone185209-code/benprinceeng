import { useEffect, useState } from "react";
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowUp, MessageCircle } from "lucide-react";
import bpLogoAsset from "@/assets/bp-logo.png.asset.json";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/expertise-data";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Project Expertise", href: "#projects" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Engineering Construction",
  "Building Construction",
  "Civil Engineering",
  "Oil & Gas",
  "Fabrication",
  "Surveying",
  "Facility Maintenance",
  "Architectural Design",
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[color:var(--brand-navy-deep)] text-white">
      <div
        aria-hidden
        className="absolute -left-24 top-10 h-72 w-72 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 40%, transparent), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={bpLogoAsset.url} alt="Ben-Prince Engineering Construction Ltd" width={48} height={48} className="h-12 w-12 rounded-full bg-white/95 object-contain p-1" />
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Ben-Prince</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Ben-Prince Engineering Construction Ltd delivers innovative engineering, civil engineering,
              construction, fabrication and infrastructure solutions with quality, professionalism and integrity.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
                { icon: TikTokIcon, href: "https://tiktok.com/", label: "TikTok" },
                { icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/90 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--brand-red)] hover:bg-[color:var(--brand-red)] hover:shadow-[0_18px_35px_-14px_color-mix(in_oklab,var(--brand-red)_60%,transparent)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">Services</h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-white/70 transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[color:var(--brand-red)]" />
                <span>Plot 30 Ahoada East–West Road, Beside NDPR, Rumuodara, Port Harcourt, Rivers State.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-[color:var(--brand-red)]" />
                <a href="tel:+2348063691299" className="hover:text-white">08063691299</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[color:var(--brand-red)]" />
                <a href="mailto:benprinceengineeringservices@gmail.com" className="break-all hover:text-white">
                  benprinceengineeringservices@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">© 2026 Ben-Prince Engineering Construction Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/60">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--brand-red)] text-white shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--brand-red)_60%,transparent)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-12px_color-mix(in_oklab,var(--brand-red)_75%,transparent)] ${
          showTop ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
