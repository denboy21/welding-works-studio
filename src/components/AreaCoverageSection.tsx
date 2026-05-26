import { MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

export function AreaCoverageSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <div className="flex flex-wrap gap-2.5">
          {SITE.areas.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <MapPin className="h-3.5 w-3.5" /> {a}
            </span>
          ))}
        </div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Workshop kami berlokasi di <span className="text-foreground">{SITE.address}</span>. Kami
          melayani area Karawang & sekitarnya dengan survey lokasi gratis dan estimasi harga
          transparan.
        </p>
        <div className="mt-6 rounded-xl border border-white/10 bg-[color:var(--surface)] p-5">
          <p className="font-mono-caps text-xs text-primary">JAM OPERASIONAL</p>
          <p className="mt-1 font-display text-base font-semibold">{SITE.hours}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 shadow-elegant">
        <iframe
          title="Lokasi Workshop Bara Baja Las"
          src={SITE.mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[4/3] w-full"
        />
      </div>
    </div>
  );
}
