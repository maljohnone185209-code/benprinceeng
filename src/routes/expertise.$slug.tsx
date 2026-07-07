import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { expertiseBySlug, expertiseItems, WHATSAPP_URL } from "@/lib/expertise-data";

export const Route = createFileRoute("/expertise/$slug")({
  loader: ({ params }) => {
    const item = expertiseBySlug[params.slug];
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Expertise — Ben-Prince Engineering Construction Ltd" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item } = loaderData;
    const title = `${item.title} — Ben-Prince Engineering Construction Ltd`;
    return {
      meta: [
        { title },
        { name: "description", content: item.scope },
        { property: "og:title", content: title },
        { property: "og:description", content: item.scope },
        { property: "og:image", content: item.image },
        { name: "twitter:image", content: item.image },
      ],
    };
  },
  component: ExpertiseDetail,
  notFoundComponent: () => (
    <main className="min-h-screen bg-white">
      <Nav />
      <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Not Found</div>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-[color:var(--brand-navy-deep)] sm:text-4xl">
          This expertise page doesn't exist
        </h1>
        <Link to="/" className="btn-pill btn-pill--primary mt-8">Back to Home</Link>
      </section>
      <Footer />
    </main>
  ),
});

function ExpertiseDetail() {
  const { item } = Route.useLoaderData();
  const related = expertiseItems.filter((e) => e.slug !== item.slug).slice(0, 6);

  return (
    <main className="min-h-screen bg-white text-[color:var(--brand-navy-deep)]">
      <Nav />

      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] w-full items-center overflow-hidden bg-[color:var(--brand-navy-deep)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(120deg, rgba(6,24,58,0.82) 0%, rgba(11,45,92,0.62) 45%, rgba(6,24,58,0.7) 100%)",
          }}
        />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Expertise
          </Link>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
            Project Expertise
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Premium engineering delivery by Ben-Prince Engineering Construction Ltd — executed with quality,
            precision, safety and integrity.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--primary group">
              <MessageCircle size={18} />
              Discuss This Project on WhatsApp
            </a>
            <Link to="/" hash="projects" className="btn-pill btn-pill--ghost">
              View All Expertise
            </Link>
          </div>
        </div>
      </section>

      {/* Scope of Work */}
      <section className="relative bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Scope of Work</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-[color:var(--brand-navy-deep)] sm:text-4xl">
              What we deliver on {item.title.toLowerCase()} projects
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">{item.scope}</p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Quality assurance at every stage",
                "Certified engineers and professionals",
                "Modern equipment and methodology",
                "Strict safety and HSE compliance",
                "Transparent project management",
                "On-time, on-budget delivery",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[color:var(--brand-red)]" />
                  <span className="text-sm font-medium text-slate-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(6,24,58,0.35)]">
              <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[color:var(--brand-navy-deep)] py-24 text-white sm:py-28">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 40%, transparent), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">Ready to Discuss a Similar Project?</div>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Let's build your next <span className="text-[color:var(--brand-red)]">{item.title.toLowerCase()}</span> project together
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Whether you're planning a similar project or need expert engineering advice, Ben-Prince
            Engineering Construction Ltd is ready to help.
          </p>
          <div className="mt-9 flex justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--primary">
              <MessageCircle size={18} />
              Discuss This Project on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Related expertise */}
      <section className="bg-[color:var(--brand-navy-deep)]/[0.03] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-red)]">Related</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-[color:var(--brand-navy-deep)] sm:text-3xl">
                Other areas of expertise
              </h3>
            </div>
            <Link to="/" hash="projects" className="text-sm font-semibold text-[color:var(--brand-navy-deep)] hover:text-[color:var(--brand-red)]">
              View all →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/expertise/$slug"
                params={{ slug: r.slug }}
                className="rounded-full bg-[color:var(--brand-navy-deep)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-14px_rgba(6,24,58,0.6)] transition-all duration-500 hover:-translate-y-1 hover:bg-[color:var(--brand-red)] hover:shadow-[0_18px_35px_-14px_rgba(214,40,40,0.6)]"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
