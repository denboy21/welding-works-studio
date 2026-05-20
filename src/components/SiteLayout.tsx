import type { ReactNode } from "react";
import { IndustrialNavbar } from "@/components/IndustrialNavbar";
import { Footer } from "@/components/Footer";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IndustrialNavbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <WhatsAppCTA />
    </>
  );
}