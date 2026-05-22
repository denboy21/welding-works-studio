import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { GlowButton } from "@/components/GlowButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { CTASection } from "@/components/CTASection";
import { getPersistedServices, Service, SERVICES } from "@/lib/data";
import { SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/layanan/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} Karawang | Bara Baja Las` : "Layanan";
    const desc = s
      ? `${s.description} Layanan ${s.title.toLowerCase()} area Karawang, Cikampek, Purwakarta, Bekasi.`
      : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/layanan/${params.slug}` },
        { property: "og:image", content: s?.image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/layanan/${params.slug}` }],
      scripts: s
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: s.title,
                name: `${s.title} Karawang`,
                description: s.description,
                provider: { "@type": "LocalBusiness", name: "Bara Baja Las" },
                areaServed: ["Karawang", "Cikampek", "Purwakarta", "Bekasi", "Subang"],
              }),
            },
          ]
        : [],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Layanan tidak ditemukan</h1>
        <Link to="/layanan" className="mt-4 inline-block text-primary">
          ← Kembali ke daftar layanan
        </Link>
      </div>
    </SiteLayout>
  ),
});

function Page() {
  const { service: initialService } = Route.useLoaderData();
  const [service, setService] = useState<Service>(initialService);

  useEffect(() => {
    const persisted = getPersistedServices().find((s) => s.slug === initialService.slug);
    if (persisted) {
      setService(persisted);
    }
  }, [initialService.slug]);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <Link
          to="/layanan"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Semua Layanan
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-elegant">
            <img
              src={service.gallery?.[0] ?? service.image}
              alt={`${service.title} oleh Bara Baja Las Karawang`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <SectionEyebrow>Layanan</SectionEyebrow>
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {service.title} <span className="text-gradient-industrial">Karawang</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <ul className="mt-6 space-y-2.5">
              {service.features.map((f: string) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton
                as="a"
                href={waLink(
                  `Halo ${SITE.name}, saya tertarik dengan layanan ${service.title}. Mohon info lebih lanjut.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                <MessageCircle className="h-5 w-5" /> Tanya via WhatsApp
              </GlowButton>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <CTASection />
        </div>
      </article>
    </SiteLayout>
  );
}
