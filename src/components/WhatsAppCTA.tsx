import { MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function WhatsAppCTA() {
  return (
    <a
      href={waLink(`Halo ${SITE.name}, saya ingin konsultasi.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Bara Baja Las"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant transition-transform hover:scale-110 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />
      <MessageCircle className="relative h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.2} />
    </a>
  );
}