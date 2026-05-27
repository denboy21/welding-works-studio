import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  MapPin,
  ReceiptText,
  HardHat,
  MessageCircle as MC2,
  Hammer,
  Users,
  CalendarCheck,
  MapPinned,
} from "lucide-react";
import heroImg from "@/assets/hero-welder.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { GlowButton } from "@/components/GlowButton";
import { SparkParticles } from "@/components/SparkParticles";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AreaCoverageSection } from "@/components/AreaCoverageSection";
import { CTASection } from "@/components/CTASection";
import { SERVICES, ADVANTAGES } from "@/lib/data";
import { SITE, waLink } from "@/lib/site";

const TITLE = "Jasa Las Karawang Profesional — Bara Baja Las";
const DESC =
  "Bara Baja Las: jasa las panggilan & konstruksi besi Karawang. Pagar, kanopi, railing, tralis, balkon, baja ringan, pintu besi. Survey gratis, hasil rapi & garansi.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const ADV_ICONS = {
  Sparkles,
  ShieldCheck,
  MapPin,
  ReceiptText,
  HardHat,
  MessageCircle: MC2,
} as const;

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <PortfolioPreview />
      <Advantages />
      <Area />
      <Testimoni />
      <Faq />
      <FinalCta />
    </SiteLayout>
  );
}

function Hero() {
  const words = "Jasa Las Profesional Karawang & Sekitarnya".split(" ");
  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-gradient-hero pt-24">
      <img
        src={heroImg}
        alt="Tukang las profesional Bara Baja Las sedang mengelas besi di workshop Karawang"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0">
        <SparkParticles />
      </div>
      <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionEyebrow>Workshop Karawang · Sejak 2019</SectionEyebrow>
        </Reveal>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="mr-3 inline-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: "easeOut" }}
            >
              {w === "Karawang" || w === "Profesional" ? (
                <span className="text-gradient-industrial">{w}</span>
              ) : (
                w
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Melayani pembuatan pagar, kanopi, railing, konstruksi besi, dan berbagai kebutuhan las
          dengan hasil rapi, kuat, dan terpercaya.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlowButton
            as="a"
            href={waLink(`Halo ${SITE.name}, saya ingin konsultasi gratis.`)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <MessageCircle className="h-5 w-5" /> Chat WhatsApp
          </GlowButton>
          <GlowButton as="a" href={`tel:${SITE.whatsappRaw}`} variant="outline" size="lg">
            <Phone className="h-5 w-5" /> Konsultasi Gratis
          </GlowButton>
          <Link
            to="/portfolio"
            className="inline-flex h-14 items-center justify-center gap-1.5 px-2 text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            Lihat Portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Hammer, value: 500, suffix: "+", label: "Proyek Selesai" },
    { icon: CalendarCheck, value: 6, suffix: "+", label: "Tahun Pengalaman" },
    { icon: MapPinned, value: 5, suffix: "", label: "Kota Layanan" },
    { icon: Users, value: 100, suffix: "%", label: "Pelanggan Puas" },
  ];
  return (
    <section className="border-y border-white/10 bg-[color:var(--surface)]/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
              <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary sm:mb-0">
                <it.icon className="h-6 w-6" />
              </span>
              <div>
                <AnimatedCounter to={it.value} suffix={it.suffix} />
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                  {it.label}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionEyebrow>Layanan Kami</SectionEyebrow>
        <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          Solusi <span className="text-gradient-industrial">las & konstruksi besi</span> untuk rumah
          hingga proyek
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Dari pagar minimalis sampai konstruksi gudang — semua dikerjakan tim welder berpengalaman
          dengan material berkualitas.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.04}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PortfolioPreview() {
  return (
    <section className="bg-[color:var(--surface)]/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Portfolio Proyek</SectionEyebrow>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Hasil pengerjaan <span className="text-gradient-industrial">nyata</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:border-primary/50"
            >
              Lihat semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10">
          <PortfolioGallery limit={6} />
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionEyebrow>Kenapa Pilih Kami</SectionEyebrow>
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Profesionalisme yang <span className="text-gradient-industrial">terbukti</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ADVANTAGES.map((a, i) => {
          const Icon = ADV_ICONS[a.icon as keyof typeof ADV_ICONS] ?? Sparkles;
          return (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="metallic-sheen group h-full rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6 transition-colors hover:border-primary/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-industrial text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Area() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionEyebrow>Area Layanan</SectionEyebrow>
        <h2 className="max-w-3xl font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Melayani <span className="text-gradient-industrial">Karawang & sekitarnya</span>
        </h2>
      </Reveal>
      <div className="mt-10">
        <AreaCoverageSection />
      </div>
    </section>
  );
}

function Testimoni() {
  return (
    <section className="bg-[color:var(--surface)]/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionEyebrow>Testimoni Pelanggan</SectionEyebrow>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Suara <span className="text-gradient-industrial">pelanggan</span> kami
          </h2>
        </Reveal>
        <div className="mt-10">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionEyebrow>Pertanyaan Umum</SectionEyebrow>
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Yang sering <span className="text-gradient-industrial">ditanyakan</span>
        </h2>
      </Reveal>
      <div className="mt-10">
        <FAQAccordion />
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <CTASection />
    </section>
  );
}
