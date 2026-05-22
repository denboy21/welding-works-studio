import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { TESTIMONIALS } from "@/lib/data";

const TITLE = "Testimoni Pelanggan | Bara Baja Las Karawang";
const DESC = "Review jujur pelanggan jasa las Karawang Bara Baja Las dari proyek pagar, kanopi, railing, dan konstruksi.";

export const Route = createFileRoute("/testimoni")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/testimoni" },
    ],
    links: [{ rel: "canonical", href: "/testimoni" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Testimoni</SectionEyebrow>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Suara pelanggan yang <span className="text-gradient-industrial">puas</span>
          </h1>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6">
                <div className="flex gap-0.5 text-primary-glow">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-industrial font-display text-sm font-bold text-primary-foreground">
                    {t.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <CTASection />
        </div>
      </section>
    </SiteLayout>
  );
}