import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CTASection } from "@/components/CTASection";

const TITLE = "Portfolio Proyek Las & Konstruksi | Bara Baja Las";
const DESC =
  "Galeri hasil pengerjaan jasa las Karawang: pagar, kanopi, railing, balkon, konstruksi besi, dan banyak proyek nyata.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Portfolio Pengerjaan</SectionEyebrow>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Hasil pengerjaan <span className="text-gradient-industrial">nyata</span> tim kami
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Setiap proyek di galeri ini dikerjakan langsung oleh tim Bara Baja Las dengan standar
            finishing rapi dan struktur kuat.
          </p>
        </Reveal>
        <div className="mt-12">
          <PortfolioGallery />
        </div>
        <div className="mt-20">
          <CTASection />
        </div>
      </section>
    </SiteLayout>
  );
}
