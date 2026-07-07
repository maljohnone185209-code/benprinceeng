import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/expertise-data";

export function WhatsAppConnect() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[color:var(--brand-navy-deep)] p-10 text-white shadow-[0_40px_100px_-40px_rgba(6,24,58,0.55)] sm:p-14">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 45%, transparent), transparent 70%)" }}
          />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">Stay Connected</div>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Stay Connected With <span className="text-[color:var(--brand-red)]">Ben-Prince Engineering</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
                Have questions about your next engineering or construction project? Connect with us directly
                on WhatsApp for quick responses, consultations, and project enquiries.
              </p>
            </div>
            <div className="flex lg:col-span-4 lg:justify-end">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill--primary group"
              >
                <MessageCircle size={18} />
                Chat With Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
