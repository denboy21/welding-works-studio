import { useState } from "react";
import { X } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";

export function PortfolioGallery({ limit }: { limit?: number }) {
  const items = limit ? PORTFOLIO.slice(0, limit) : PORTFOLIO;
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {items.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className="mb-4 block w-full overflow-hidden rounded-xl border border-white/10 bg-[color:var(--surface)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div className="group relative overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} — proyek ${p.category} oleh Bara Baja Las`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/85 to-transparent p-4 text-left">
                <span className="font-mono-caps text-[10px] text-primary">{p.category}</span>
                <span className="font-display text-sm font-semibold text-foreground">
                  {p.title}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Tutup"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-foreground hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].image}
              alt={items[active].title}
              className="max-h-[80vh] w-auto rounded-lg shadow-elegant"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              <span className="text-primary">{items[active].category}</span> · {items[active].title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
