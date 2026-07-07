import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import office from "@/assets/bp-office.jpg.asset.json";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/expertise-data";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("success");
    e.currentTarget.reset();
  };

  const inputCls =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[color:var(--brand-red)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-red)_15%,transparent)]";

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Contact</div>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
            Let's <span className="text-[color:var(--brand-red)]">Build Together</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you're planning your next engineering or construction project, our team is ready to help.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[28px] shadow-[0_30px_80px_-40px_rgba(6,24,58,0.35)]">
              <img src={office.url} alt="Ben-Prince office" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>

            <div className="mt-8 space-y-5">
              <InfoRow icon={MapPin} title="Address">
                Plot 30 Ahoada East–West Road, Beside NDPR, Rumuodara, Port Harcourt, Rivers State, Nigeria.
              </InfoRow>
              <InfoRow icon={Phone} title="Phone">
                <a href="tel:+2348063691299" className="hover:text-[color:var(--brand-red)]">08063691299</a>
              </InfoRow>
              <InfoRow icon={Mail} title="Email">
                <a href="mailto:benprinceengineeringservices@gmail.com" className="break-all hover:text-[color:var(--brand-red)]">
                  benprinceengineeringservices@gmail.com
                </a>
              </InfoRow>
              <InfoRow icon={Clock} title="Business Hours">
                <div className="space-y-0.5">
                  <div>Monday — Friday · 8:00 AM — 5:00 PM</div>
                  <div>Saturday · 8:00 AM — 2:00 PM</div>
                  <div>Sunday · Closed</div>
                </div>
              </InfoRow>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(6,24,58,0.35)] sm:p-10">
              <h3 className="font-display text-2xl font-extrabold text-[color:var(--brand-navy-deep)] sm:text-3xl">Request a Consultation</h3>
              <p className="mt-2 text-sm text-slate-600">Tell us about your project and we'll get back to you within one business day.</p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" error={errors.name}>
                  <input name="name" required maxLength={100} className={inputCls} placeholder="Your full name" />
                </Field>
                <Field label="Company" error={errors.company}>
                  <input name="company" maxLength={120} className={inputCls} placeholder="Company (optional)" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input name="email" type="email" required maxLength={255} className={inputCls} placeholder="you@company.com" />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <input name="phone" maxLength={40} className={inputCls} placeholder="+234 ..." />
                </Field>
                <Field label="Project Type" error={errors.projectType} className="sm:col-span-2">
                  <select name="projectType" className={inputCls} defaultValue="">
                    <option value="" disabled>Select a project type</option>
                    <option>Residential Construction</option>
                    <option>Commercial Construction</option>
                    <option>Industrial Construction</option>
                    <option>Civil Engineering</option>
                    <option>Oil &amp; Gas</option>
                    <option>Fabrication</option>
                    <option>Surveying</option>
                    <option>Facility Maintenance</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Message" error={errors.message} className="sm:col-span-2">
                  <textarea name="message" required maxLength={2000} rows={5} className={`${inputCls} resize-none`} placeholder="Tell us about your project..." />
                </Field>
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">We respect your privacy — your details are never shared.</p>
                <button type="submit" className="btn-pill btn-pill--primary group">
                  Request Consultation
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {status === "success" && (
                <div className="mt-5 rounded-2xl bg-[color:var(--brand-navy-deep)]/5 px-4 py-3 text-sm text-[color:var(--brand-navy-deep)]">
                  Thank you — we've received your request and will be in touch shortly.
                </div>
              )}
              {status === "error" && Object.keys(errors).length > 0 && (
                <div className="mt-5 rounded-2xl bg-[color:var(--brand-red)]/10 px-4 py-3 text-sm text-[color:var(--brand-red)]">
                  Please review the highlighted fields and try again.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[28px] border border-slate-100 shadow-[0_30px_80px_-40px_rgba(6,24,58,0.35)]">
          <iframe
            title="Ben-Prince Engineering Construction Ltd — Location"
            src="https://www.google.com/maps?q=Plot+30+Ahoada+East-West+Road,+Rumuodara,+Port+Harcourt,+Rivers+State,+Nigeria&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[color:var(--brand-navy-deep)] text-white">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--brand-red)]">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-slate-700">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-navy-deep)]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--brand-red)]">{error}</span>}
    </label>
  );
}
