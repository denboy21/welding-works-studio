import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, Hammer, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-welder.jpg";

const TITLE = "Tentang Kami | Bara Baja Las Karawang";
const DESC =
  "Bara Baja Las adalah workshop jasa las & konstruksi besi di Karawang dengan pengalaman puluhan proyek pagar, kanopi, dan konstruksi baja.";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/tentang" },
    ],
    links: [{ rel: "canonical", href: "/tentang" }],
  }),
  component: Page,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Kualitas Tanpa Kompromi",
    desc: "Material besi SNI, las penetrasi penuh, finishing presisi.",
  },
  {
    icon: Award,
    title: "Garansi Pengerjaan",
    desc: "Semua proyek bergaransi struktur & finishing sesuai kesepakatan.",
  },
  {
    icon: Hammer,
    title: "Tim Welder Berpengalaman",
    desc: "Tukang berpengalaman dengan sertifikasi internal workshop.",
  },
  {
    icon: Users,
    title: "Pelanggan Adalah Prioritas",
    desc: "Konsultasi terbuka, harga transparan, komunikasi responsif.",
  },
];

function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Tentang Bara Baja Las</SectionEyebrow>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Workshop besi & konstruksi di{" "}
            <span className="text-gradient-industrial">jantung Karawang</span>
          </h1>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-elegant">
              <img
                src={heroImg}
                alt="Workshop Bara Baja Las Karawang"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                <span className="text-foreground">{SITE.name}</span> adalah workshop jasa las dan
                konstruksi besi yang berbasis di {SITE.address}. Kami melayani pemilik rumah, UMKM,
                toko, ruko, proyek bangunan, hingga perumahan di Karawang, Cikampek, Purwakarta,
                Bekasi, dan Subang.
              </p>
              <p>
                Berawal dari workshop kecil, kami berkembang menjadi penyedia jasa las terpercaya
                berkat satu prinsip sederhana —{" "}
                <span className="text-foreground">
                  kerjakan rapi, kerjakan jujur, kerjakan tepat waktu
                </span>
                .
              </p>
              <p>
                Tim welder kami berpengalaman menangani proyek skala rumahan hingga konstruksi baja
                berat. Setiap proyek dimulai dari survey lokasi, perhitungan material yang presisi,
                hingga finishing yang halus.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionEyebrow>Nilai Kami</SectionEyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold sm:text-4xl">
            Standar kerja yang <span className="text-gradient-industrial">tidak bisa ditawar</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="metallic-sheen h-full rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-industrial text-primary-foreground shadow-glow">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTASection />
      </section>
    </SiteLayout>
  );
}
