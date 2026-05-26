import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { GlowButton } from "@/components/GlowButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { CTASection } from "@/components/CTASection";
import { SERVICES } from "@/lib/data";
import { SITE, waLink } from "@/lib/site";
import { getServiceDesigns, type ServiceDesign } from "@/lib/service-designs";

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

function DesignCard({ design, serviceName }: { design: ServiceDesign; serviceName: string }) {
  const waMessage = waLink(
    `Halo ${SITE.name}, saya tertarik dengan desain *${design.name}* untuk layanan ${serviceName}. Boleh info lebih lanjut?`,
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--surface)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/40">
      <div className="relative overflow-hidden">
        <img
          src={design.image_url}
          alt={`${design.name} — ${serviceName} oleh Bara Baja Las`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-semibold text-foreground">{design.name}</h3>
        {design.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{design.description}</p>
        )}

        <a
          href={waMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Tanya harga desain ini
        </a>
      </div>
    </div>
  );
}

function Page() {
  const { service } = Route.useLoaderData();
  const { slug } = Route.useParams();

  const { data: designs = [], isLoading } = useQuery({
    queryKey: ["service-designs", slug],
    queryFn: () => getServiceDesigns({ data: { slug } }),
    retry: false,
    throwOnError: false,
  });

  return (
    <SiteLayout>
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <Link
          to="/layanan"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Semua Layanan
        </Link>

        {/* Hero section */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-elegant">
            <img
              src={service.image}
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

        {/* Galeri desain */}
        {(isLoading || designs.length > 0) && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Referensi <span className="text-gradient-industrial">desain</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pilih desain yang sesuai dan langsung tanya harga via WhatsApp.
            </p>

            {isLoading ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {designs.map((design) => (
                  <DesignCard key={design.id} design={design} serviceName={service.title} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA custom desain */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-base font-semibold">
              Tidak menemukan desain yang cocok?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Konsultasikan desain custom kamu langsung dengan tim kami.
            </p>
          </div>
          <a
            href={waLink(
              `Halo ${SITE.name}, saya ingin konsultasi desain custom untuk layanan ${service.title}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi gratis
          </a>
        </div>

        <div className="mt-20">
          <CTASection />
        </div>
      </article>
    </SiteLayout>
  );
}
