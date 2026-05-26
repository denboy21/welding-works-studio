import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFaqs, type FaqItem } from "@/lib/faqs";
import { FAQS } from "@/lib/data";

const FALLBACK: FaqItem[] = FAQS.map((f, i) => ({
  id: i,
  question: f.q,
  answer: f.a,
  sort_order: i,
  is_active: 1,
  created_at: "",
  updated_at: "",
}));

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  const { data: dbItems } = useQuery({
    queryKey: ["faqs-public"],
    queryFn: () => getFaqs(),
    retry: false,
    throwOnError: false,
  });

  const items: FaqItem[] =
    !dbItems || dbItems.length === 0 ? FALLBACK : dbItems.filter((f) => f.is_active === 1);

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[color:var(--surface)]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.id ?? i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03]"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                {f.question}
              </span>
              <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-industrial text-primary-foreground">
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
