import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GlowButton } from "@/components/GlowButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import {
  getPersistedServices,
  resetPersistedServices,
  savePersistedServices,
  Service,
  SERVICES,
} from "@/lib/data";

const TITLE = "Admin Layanan | Bara Baja Las";
const DESC = "Halaman admin untuk mengelola judul, deskripsi, dan galeri layanan hingga 10 foto.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/admin" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: Page,
});

function Page() {
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [selectedSlug, setSelectedSlug] = useState<string>(SERVICES[0]?.slug ?? "");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const persisted = getPersistedServices();
    setServices(persisted);
    if (!persisted.find((service) => service.slug === selectedSlug) && persisted.length) {
      setSelectedSlug(persisted[0].slug);
    }
  }, []);

  const selectedService = services.find((service) => service.slug === selectedSlug) ?? services[0];

  const updateSelectedService = (updates: Partial<Service>) => {
    if (!selectedService) return;
    setServices((current) =>
      current.map((service) =>
        service.slug === selectedService.slug
          ? {
              ...service,
              ...updates,
              image: updates.gallery ? updates.gallery[0] ?? service.image : service.image,
            }
          : service,
      ),
    );
  };

  const onFieldChange = (field: keyof Pick<Service, "title" | "short" | "description">, value: string) => {
    updateSelectedService({ [field]: value } as Pick<Service, "title" | "short" | "description">);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || !selectedService) return;

    const currentGallery = selectedService.gallery ?? [selectedService.image].filter(Boolean);
    const availableSlots = 10 - currentGallery.length;
    if (availableSlots <= 0) {
      setStatusMessage("Galeri sudah mencapai batas 10 foto.");
      return;
    }

    const selectedFiles = Array.from(files).slice(0, availableSlots);
    const fileUrls = await Promise.all(
      selectedFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          }),
      ),
    );

    updateSelectedService({ gallery: [...currentGallery, ...fileUrls] });
    setStatusMessage(`${selectedFiles.length} foto berhasil ditambahkan.`);
  };

  const removeImage = (index: number) => {
    if (!selectedService) return;

    const currentGallery = selectedService.gallery ?? [selectedService.image].filter(Boolean);
    const nextGallery = currentGallery.filter((_, idx) => idx !== index);
    updateSelectedService({ gallery: nextGallery, image: nextGallery[0] ?? selectedService.image });
  };

  const saveChanges = () => {
    setSaving(true);
    savePersistedServices(services);
    setSaving(false);
    setStatusMessage("Perubahan tersimpan di browser.");
    window.setTimeout(() => setStatusMessage(null), 3000);
  };

  const resetChanges = () => {
    resetPersistedServices();
    const defaultServices = getPersistedServices();
    setServices(defaultServices);
    setSelectedSlug(defaultServices[0]?.slug ?? "");
    setStatusMessage("Data layanan berhasil di-reset ke awal.");
    window.setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionEyebrow>Admin Layanan</SectionEyebrow>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Kelola Layanan
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Edit judul, deskripsi, dan galeri foto layanan. Perubahan disimpan di browser menggunakan
              localStorage.
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton onClick={saveChanges} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </GlowButton>
            <GlowButton variant="outline" onClick={resetChanges}>
              Reset Data
            </GlowButton>
          </div>
        </div>

        {statusMessage ? (
          <div className="mb-6 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white shadow-sm ring-1 ring-white/10">
            {statusMessage}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Pilih Layanan
            </h2>
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => setSelectedSlug(service.slug)}
                  className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${
                    service.slug === selectedSlug
                      ? "border-primary bg-primary/10 text-white"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
                  }`}
                >
                  <strong className="block text-sm font-semibold">{service.title}</strong>
                  <span className="text-xs text-muted-foreground">{service.slug}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-white">Judul Layanan</span>
                <input
                  value={selectedService?.title ?? ""}
                  onChange={(event) => onFieldChange("title", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-primary/30 transition focus:ring"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-white">Deskripsi Singkat</span>
                <input
                  value={selectedService?.short ?? ""}
                  onChange={(event) => onFieldChange("short", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-primary/30 transition focus:ring"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-white">Deskripsi Detail</span>
              <textarea
                value={selectedService?.description ?? ""}
                onChange={(event) => onFieldChange("description", event.target.value)}
                rows={6}
                className="w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-primary/30 transition focus:ring"
              />
            </label>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-white">Galeri Foto</h2>
                  <p className="text-sm text-muted-foreground">
                    Tambahkan sampai 10 foto untuk layanan ini.
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {selectedService?.gallery?.length ?? 0}/10
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
                className="block w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(selectedService?.gallery ?? [selectedService?.image]).map((image, index) => (
                  <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
                    <img src={image} alt={`${selectedService?.title} photo ${index + 1}`} className="h-40 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white opacity-80 transition hover:opacity-100"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
