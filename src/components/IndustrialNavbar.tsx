import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Flame, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { GlowButton } from "@/components/GlowButton";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/layanan", label: "Layanan" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/area-layanan", label: "Area" },
  { to: "/tentang", label: "Tentang" },
  { to: "/blog", label: "Blog" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function IndustrialNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "glass border-b border-white/10" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-gradient-industrial shadow-glow">
            <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-extrabold leading-none">
            Bara Baja <span className="text-gradient-industrial">Las</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <GlowButton
            as="a"
            href={waLink(`Halo ${SITE.name}, saya ingin konsultasi.`)}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </GlowButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-white/10 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary bg-white/5" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
            <GlowButton
              as="a"
              href={waLink(`Halo ${SITE.name}, saya ingin konsultasi.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <MessageCircle className="h-4 w-4" /> Chat WhatsApp
            </GlowButton>
          </nav>
        </div>
      )}
    </header>
  );
}
