import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { SERVICES } from "@/lib/data";

const TITLE = "Layanan Jasa Las & Konstruksi | Bara Baja Las Karawang";
const DESC = "Daftar lengkap layanan jasa las Karawang: pagar besi, kanopi, railing, balkon, tralis, baja ringan, pintu besi, las panggilan, konstruksi baja.";

export const Route = createFileRoute("/layanan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/layanan" },
    ],
    links: [{ rel: "canonical", href: "/layanan" }],
  }),
  component: LayoutComponent,
});

function LayoutComponent() {
  return <Outlet />;
}

export function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Layanan Lengkap</SectionEyebrow>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Semua kebutuhan <span className="text-gradient-industrial">las dan konstruksi besi</span> Anda
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Dari pagar rumah, kanopi carport, sampai konstruksi gudang — tim Bara Baja Las siap mengerjakan dengan standar profesional.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <ServiceCard service={s} />
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