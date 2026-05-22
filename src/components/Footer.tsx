import { Link } from "@tanstack/react-router";
import { Flame, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[color:var(--surface)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-industrial opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-industrial">
              <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
            </span>
            <span className="font-display text-xl font-extrabold">
              Bara Baja <span className="text-gradient-industrial">Las</span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Jasa las profesional Karawang & sekitarnya. Pagar, kanopi, railing, tralis, konstruksi
            baja, hingga welding custom — hasil rapi, kuat, dan terpercaya.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/90">
            Halaman
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/layanan" className="hover:text-primary">
                Layanan
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-primary">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/area-layanan" className="hover:text-primary">
                Area Layanan
              </Link>
            </li>
            <li>
              <Link to="/testimoni" className="hover:text-primary">
                Testimoni
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/kontak" className="hover:text-primary">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/90">
            Hubungi
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {SITE.address}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <a
                href={waLink("Halo, saya ingin konsultasi.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <span>{SITE.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Semua hak dilindungi.
          </p>
          <p>Workshop Karawang — Melayani Jawa Barat</p>
        </div>
      </div>
    </footer>
  );
}
