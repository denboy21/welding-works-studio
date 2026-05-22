import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { Reveal } from "@/components/Reveal";
import { GlowButton } from "@/components/GlowButton";
import { SITE, waLink } from "@/lib/site";

const TITLE = "Kontak | Bara Baja Las Karawang";
const DESC = "Hubungi Bara Baja Las Karawang via WhatsApp, telepon, atau kunjungi workshop kami untuk konsultasi gratis jasa las dan konstruksi.";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/kontak" },
    ],
    links: [{ rel: "canonical", href: "/kontak" }],
  }),
  component: Page,
});

function Page() {
  const [form, setForm] = useState({ nama: "", wa: "", layanan: "", pesan: "" });

  function submit(e: FormEvent) {
    e.preventDefault();
    const text = `Halo ${SITE.name}, saya ${form.nama} (WA: ${form.wa}). Saya tertarik dengan layanan ${form.layanan || "—"}.\n\n${form.pesan}`;
    window.open(waLink(text), "_blank");
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionEyebrow>Hubungi Kami</SectionEyebrow>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Konsultasi <span className="text-gradient-industrial">gratis</span>, respon cepat
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Cara tercepat menghubungi kami adalah via WhatsApp. Atau isi form di bawah, kami arahkan langsung ke chat.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {[
              { Icon: Phone, label: "WhatsApp & Telepon", value: SITE.phone, href: waLink("Halo, saya ingin konsultasi.") },
              { Icon: MapPin, label: "Workshop", value: SITE.address, href: SITE.mapsUrl },
              { Icon: Clock, label: "Jam Operasional", value: SITE.hours },
              { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href ?? "#"}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[color:var(--surface)] p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-industrial text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono-caps text-[10px] text-primary">{label}</p>
                  <p className="mt-1 font-display text-base font-semibold">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-xl font-bold">Kirim Pesan</h2>
            <p className="mt-1 text-sm text-muted-foreground">Form akan diarahkan ke WhatsApp kami.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Nama" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} required />
              <Field label="No. WhatsApp" value={form.wa} onChange={(v) => setForm({ ...form, wa: v })} required type="tel" />
              <div className="sm:col-span-2">
                <Field label="Layanan yang dibutuhkan" value={form.layanan} onChange={(v) => setForm({ ...form, layanan: v })} placeholder="Pagar, kanopi, railing, dll." />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-mono-caps text-muted-foreground">Pesan</label>
                <textarea
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-background/60 px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="Ceritakan kebutuhan Anda…"
                />
              </div>
            </div>
            <GlowButton type="submit" size="lg" className="mt-6 w-full">
              <MessageCircle className="h-5 w-5" /> Kirim via WhatsApp
            </GlowButton>
          </form>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 shadow-elegant">
          <iframe
            title="Workshop Bara Baja Las Karawang"
            src={SITE.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[16/7] w-full"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label, value, onChange, required, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-mono-caps text-muted-foreground">{label}{required && " *"}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-background/60 px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}