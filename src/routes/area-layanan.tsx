import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { AreaCoverageSection } from "@/components/AreaCoverageSection";
import { CTASection } from "@/components/CTASection";
import { SITE } from "@/lib/site";

const TITLE = "Area Layanan Jasa Las | Bara Baja Las Karawang";
const DESC = "Bara Baja Las melayani jasa las Karawang, Cikampek, Purwakarta, Bekasi, dan Subang. Survey lokasi gratis untuk semua area.";

export const Route = createFileRoute("/area-layanan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/area-layanan" },
    ],
    links: [{ rel: "canonical", href: "/area-layanan" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Cakupan Area</SectionEyebrow>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Melayani <span className="text-gradient-industrial">Karawang & sekitarnya</span>
          </h1>
        </Reveal>
        <div className="mt-12">
          <AreaCoverageSection />
        </div>
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SITE.areas.map((a) => (
            <div key={a} className="rounded-2xl border border-white/10 bg-[color:var(--surface)] p-5 text-center">
              <p className="font-display text-xl font-bold">{a}</p>
              <p className="mt-1 text-xs text-muted-foreground">Survey gratis & garansi</p>
            </div>
          ))}
        </div>
        <div className="mt-20">
          <CTASection />
        </div>
      </section>
    </SiteLayout>
  );
}