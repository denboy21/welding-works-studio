import { MessageCircle, Phone } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SITE, waLink } from "@/lib/site";

export function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[color:var(--surface-2)] via-[color:var(--surface)] to-[color:var(--background)] px-6 py-14 text-center shadow-elegant sm:px-12 sm:py-20">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          Butuh Jasa Las{" "}
          <span className="text-gradient-industrial">Profesional & Terpercaya?</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Tim {SITE.name} siap survey lokasi gratis di Karawang, Cikampek, Purwakarta, Bekasi & Subang.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GlowButton as="a" href={waLink(`Halo ${SITE.name}, saya ingin konsultasi dan minta penawaran.`)} target="_blank" rel="noopener noreferrer" size="lg">
            <MessageCircle className="h-5 w-5" /> Chat WhatsApp
          </GlowButton>
          <GlowButton as="a" href={`tel:${SITE.whatsappRaw}`} variant="outline" size="lg">
            <Phone className="h-5 w-5" /> {SITE.phone}
          </GlowButton>
        </div>
      </div>
    </section>
  );
}