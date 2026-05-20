import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialSlider() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="min-w-0 flex-[0_0_92%] rounded-2xl border border-white/10 bg-[color:var(--surface)] p-6 sm:flex-[0_0_60%] lg:flex-[0_0_calc(33.333%-14px)]"
            >
              <div className="flex gap-0.5 text-primary-glow">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">“{t.text}”</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-industrial font-display text-sm font-bold text-primary-foreground">
                  {t.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => embla?.scrollPrev()}
          aria-label="Sebelumnya"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => embla?.scrollNext()}
          aria-label="Berikutnya"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}