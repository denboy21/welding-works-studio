import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { BLOG_POSTS } from "@/lib/data";

const TITLE = "Blog & Tips | Bara Baja Las Karawang";
const DESC =
  "Tips memilih pagar, kanopi, railing, perawatan besi, dan inspirasi konstruksi dari workshop Bara Baja Las Karawang.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Blog & Tips</SectionEyebrow>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tips dan inspirasi <span className="text-gradient-industrial">las & konstruksi</span>
          </h1>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="metallic-sheen group flex h-full flex-col rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />{" "}
                    {new Date(p.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {p.readMin} mnt
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Baca artikel{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
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
