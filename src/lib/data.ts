import pagar from "@/assets/service-pagar.jpg";
import kanopi from "@/assets/service-kanopi.jpg";
import railing from "@/assets/service-railing.jpg";
import balkon from "@/assets/service-balkon.jpg";
import tralis from "@/assets/service-tralis.jpg";
import bajaRingan from "@/assets/service-baja-ringan.jpg";
import lasPanggilan from "@/assets/service-las-panggilan.jpg";
import konstruksi from "@/assets/service-konstruksi.jpg";
import pintu from "@/assets/service-pintu.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
};

export const SERVICES_STORAGE_KEY = "bbj.admin.services";

function normalizeService(service: Service): Service {
  return {
    ...service,
    gallery: service.gallery ?? [service.image],
    image: service.image || service.gallery?.[0] || "",
  };
}

export function getPersistedServices(): Service[] {
  if (typeof window === "undefined") return SERVICES;

  try {
    const stored = window.localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!stored) return SERVICES;

    const parsed = JSON.parse(stored) as Service[];
    return parsed.map((service) => {
      const defaultService = SERVICES.find((s) => s.slug === service.slug);
      return normalizeService({
        ...(defaultService ?? service),
        ...service,
      });
    });
  } catch {
    return SERVICES;
  }
}

export function savePersistedServices(services: Service[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
}

export function resetPersistedServices() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SERVICES_STORAGE_KEY);
}

export const SERVICES: Service[] = [
  {
    slug: "pagar-besi",
    title: "Pagar Besi",
    short: "Pagar minimalis, klasik, hingga custom desain.",
    description:
      "Pembuatan pagar besi untuk rumah, ruko, gudang, dan kantor. Material besi hollow / besi tempa, finishing cat duco atau powder coating tahan karat.",
    image: pagar,
    features: ["Material anti karat", "Desain custom", "Survey gratis", "Garansi pengerjaan"],
  },
  {
    slug: "kanopi",
    title: "Kanopi",
    short: "Kanopi minimalis carport, teras, dan area servis.",
    description:
      "Kanopi rangka baja dengan atap polycarbonate, alderon, spandek, atau kaca. Konstruksi kuat anti goyang dan tahan cuaca Karawang.",
    image: kanopi,
    features: ["Atap polycarbonate / alderon", "Rangka kokoh", "Anti bocor", "Garansi konstruksi"],
  },
  {
    slug: "railing-tangga",
    title: "Railing Tangga",
    short: "Railing besi tempa hingga stainless modern.",
    description:
      "Railing tangga indoor & outdoor — besi tempa klasik, minimalis hollow, hingga stainless steel premium dengan finishing rapi.",
    image: railing,
    features: ["Besi / stainless", "Finishing halus", "Desain custom", "Pemasangan rapi"],
  },
  {
    slug: "balkon",
    title: "Balkon",
    short: "Railing balkon kuat dan estetik.",
    description:
      "Railing balkon lantai 2 dengan desain modern geometris, klasik, atau motif custom sesuai fasad rumah Anda.",
    image: balkon,
    features: ["Desain modern", "Konstruksi aman", "Anti karat", "Tinggi standar"],
  },
  {
    slug: "tralis-jendela",
    title: "Tralis Jendela",
    short: "Pengaman jendela elegan tanpa kesan penjara.",
    description:
      "Tralis jendela dan pintu dengan desain minimalis modern. Memberi rasa aman tanpa mengurangi estetika rumah Anda.",
    image: tralis,
    features: ["Minimalis modern", "Pengaman optimal", "Finishing rapi", "Custom ukuran"],
  },
  {
    slug: "baja-ringan",
    title: "Konstruksi Baja Ringan",
    short: "Rangka atap & kanopi baja ringan.",
    description:
      "Rangka atap baja ringan untuk rumah, ruko, gudang, dan workshop. SNI, anti rayap, anti karat, pengerjaan cepat.",
    image: bajaRingan,
    features: ["Material SNI", "Anti karat & rayap", "Hitungan presisi", "Garansi struktur"],
  },
  {
    slug: "las-panggilan",
    title: "Las Panggilan",
    short: "Tukang las datang ke lokasi Anda.",
    description:
      "Layanan las panggilan 24 jam area Karawang & sekitarnya. Perbaikan pagar, kanopi, kanopi bocor, las pipa, hingga proyek mendadak.",
    image: lasPanggilan,
    features: ["Datang ke lokasi", "Respon cepat", "Peralatan lengkap", "Harga transparan"],
  },
  {
    slug: "konstruksi-baja",
    title: "Konstruksi Baja",
    short: "Konstruksi gudang, workshop, dan struktur besi.",
    description:
      "Konstruksi baja WF, H-Beam, dan IWF untuk gudang, workshop, mezzanine, dan bangunan industri. Hitungan struktur oleh tim berpengalaman.",
    image: konstruksi,
    features: ["Struktur WF / H-Beam", "Hitungan teknis", "Welding sertifikasi", "Skala proyek"],
  },
  {
    slug: "pintu-besi",
    title: "Pintu Besi",
    short: "Pintu pagar, pintu gudang, dan rolling door.",
    description:
      "Pintu besi swing, sliding, hingga folding gate. Cocok untuk rumah, ruko, dan gudang dengan engsel berkualitas tahan beban berat.",
    image: pintu,
    features: [
      "Swing / sliding / folding",
      "Engsel heavy duty",
      "Custom desain",
      "Pengerjaan presisi",
    ],
  },
];

export const PORTFOLIO = [
  {
    id: 1,
    image: pagar,
    title: "Pagar Minimalis — Karawang Barat",
    category: "Pagar",
    span: "tall",
  },
  { id: 2, image: kanopi, title: "Kanopi Carport — Cikampek", category: "Kanopi", span: "wide" },
  {
    id: 3,
    image: railing,
    title: "Railing Tangga Stainless — Purwakarta",
    category: "Railing",
    span: "",
  },
  { id: 4, image: balkon, title: "Railing Balkon — Karawang Timur", category: "Balkon", span: "" },
  {
    id: 5,
    image: tralis,
    title: "Tralis Jendela Minimalis — Bekasi",
    category: "Tralis",
    span: "tall",
  },
  {
    id: 6,
    image: bajaRingan,
    title: "Rangka Baja Ringan Workshop — Karawang",
    category: "Baja Ringan",
    span: "wide",
  },
  { id: 7, image: pintu, title: "Pintu Pagar Custom — Cikampek", category: "Pintu", span: "" },
  {
    id: 8,
    image: konstruksi,
    title: "Konstruksi Gudang — Karawang",
    category: "Konstruksi",
    span: "",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Pak Ahmad",
    location: "Karawang Barat",
    rating: 5,
    text: "Pengerjaan pagar rumah sangat rapi dan tepat waktu. Tim Bara Baja Las profesional, hasilnya melebihi ekspektasi.",
  },
  {
    name: "Bu Ratna",
    location: "Cikampek",
    rating: 5,
    text: "Kanopi carport selesai 3 hari, kuat dan tidak bocor saat hujan deras. Recommended buat warga sekitar.",
  },
  {
    name: "Pak Joko",
    location: "Purwakarta",
    rating: 5,
    text: "Survey lokasi gratis, harga transparan, kualitas las premium. Konstruksi gudang saya kokoh sekali.",
  },
  {
    name: "Bu Sinta",
    location: "Karawang Timur",
    rating: 5,
    text: "Railing tangga stainless terlihat mewah. Pengerjaan halus, finishing sempurna. Terima kasih Bara Baja Las.",
  },
  {
    name: "Pak Dedi",
    location: "Bekasi",
    rating: 5,
    text: "Las panggilan respon cepat, datang sore langsung dikerjakan. Harga sesuai kualitas, mantap!",
  },
] as const;

export const FAQS = [
  {
    q: "Apakah bisa survey lokasi gratis?",
    a: "Bisa. Kami melayani survey lokasi gratis untuk area Karawang, Cikampek, Purwakarta, Bekasi, dan Subang. Cukup hubungi WhatsApp untuk jadwalkan kunjungan.",
  },
  {
    q: "Berapa lama pengerjaan proyek?",
    a: "Tergantung jenis dan ukuran. Pagar rumah standar 3–7 hari, kanopi 2–5 hari, konstruksi gudang 2–4 minggu. Timeline pasti diberikan setelah survey.",
  },
  {
    q: "Apakah bisa custom desain?",
    a: "Tentu. Kami menerima desain custom sesuai keinginan Anda — kirim referensi gambar, ukuran, atau konsultasikan langsung dengan tim desain kami.",
  },
  {
    q: "Apakah melayani luar kota Karawang?",
    a: "Ya. Kami melayani area Karawang, Cikampek, Purwakarta, Bekasi, dan Subang. Untuk area di luar itu, silakan tanyakan via WhatsApp.",
  },
  {
    q: "Apakah konsultasi gratis?",
    a: "Gratis. Konsultasi via WhatsApp atau survey lokasi tidak dikenakan biaya. Kami beri rekomendasi material dan harga transparan tanpa kewajiban order.",
  },
  {
    q: "Bagaimana sistem pembayaran?",
    a: "DP 50% di awal setelah deal harga, pelunasan 50% saat pekerjaan selesai dan disetujui pelanggan. Pembayaran via transfer bank atau tunai.",
  },
];

export const ADVANTAGES = [
  {
    title: "Pengerjaan Rapi",
    desc: "Finishing halus, las bersih, sambungan presisi.",
    icon: "Sparkles",
  },
  {
    title: "Material Berkualitas",
    desc: "Besi SNI, anti karat, sesuai spesifikasi proyek.",
    icon: "ShieldCheck",
  },
  {
    title: "Survey Lokasi Gratis",
    desc: "Tim datang langsung untuk ukur dan konsultasi.",
    icon: "MapPin",
  },
  {
    title: "Harga Transparan",
    desc: "RAB jelas, tidak ada biaya tersembunyi.",
    icon: "ReceiptText",
  },
  {
    title: "Tukang Berpengalaman",
    desc: "Tim welder bersertifikat dengan jam terbang tinggi.",
    icon: "HardHat",
  },
  {
    title: "Konsultasi Gratis",
    desc: "Diskusi desain dan material tanpa biaya.",
    icon: "MessageCircle",
  },
];

export const BLOG_POSTS = [
  {
    slug: "tips-memilih-pagar-besi",
    title: "Tips Memilih Pagar Besi untuk Rumah Modern",
    excerpt:
      "Panduan lengkap memilih material, desain, dan finishing pagar besi yang awet untuk iklim Karawang.",
    date: "2025-04-12",
    readMin: 5,
  },
  {
    slug: "model-kanopi-modern-2025",
    title: "10 Model Kanopi Modern 2025 yang Sedang Tren",
    excerpt:
      "Inspirasi desain kanopi minimalis hingga industrial untuk rumah dan ruko di Karawang & sekitarnya.",
    date: "2025-04-02",
    readMin: 6,
  },
  {
    slug: "cara-merawat-railing-tangga",
    title: "Cara Merawat Railing Tangga Besi & Stainless",
    excerpt:
      "Tips perawatan rutin agar railing tetap mengkilap dan bebas karat selama bertahun-tahun.",
    date: "2025-03-20",
    readMin: 4,
  },
  {
    slug: "harga-jasa-las-karawang",
    title: "Harga Jasa Las Karawang 2025: Rincian & Estimasi",
    excerpt:
      "Rincian estimasi biaya jasa las pagar, kanopi, railing, dan konstruksi area Karawang.",
    date: "2025-03-08",
    readMin: 7,
  },
  {
    slug: "inspirasi-pagar-minimalis",
    title: "Inspirasi Pagar Minimalis untuk Rumah Tropis",
    excerpt:
      "Kumpulan desain pagar minimalis yang cocok dengan arsitektur tropis modern Indonesia.",
    date: "2025-02-22",
    readMin: 5,
  },
];
