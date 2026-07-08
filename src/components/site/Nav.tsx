import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
const bpLogoAsset = { url: "/images/bp-logo.png" };
import { WHATSAPP_URL } from "@/lib/expertise-data";
const bpLogo = bpLogoAsset.url;

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out will-change-transform ${
        scrolled
          ? "bg-[color:var(--brand-navy-deep)]/85 backdrop-blur-xl shadow-[var(--shadow-nav)] border-b border-white/10"
          : "bg-transparent"
      }`}
      style={{ transform: "translateY(0)", animation: "slideDown 700ms cubic-bezier(.22,1,.36,1) both" }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-2" aria-label="Ben-Prince home">
          <img
            src={bpLogo}
            alt="Ben-Prince Engineering Construction Ltd"
            width={160}
            height={160}
            className="h-10 w-10 rounded-full bg-white/95 object-contain p-1 shadow-md sm:h-12 sm:w-12"
          />
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.18em] text-white sm:inline">
            Ben-Prince
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-white/85 transition hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--brand-red)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--primary">
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden bg-[color:var(--brand-navy-deep)]/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-full px-5 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-pill btn-pill--primary w-full justify-center">
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
