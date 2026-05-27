export const SITE = {
  name: "Bara Baja Las",
  url: "https://barabajalas.id",
  tagline: "Jasa Las & Konstruksi Karawang",
  description:
    "Jasa las profesional Karawang melayani pembuatan pagar, kanopi, railing, tralis, balkon, pintu besi, konstruksi baja ringan, dan welding custom. Hasil rapi, kuat, dan terpercaya.",
  phone: "+62 821-2517-1716",
  whatsappRaw: "6282125171716",
  email: "halo@barabajalas.id",
  address: "Kp. Kadongdong, Desa Bengle, Karawang, Jawa Barat",
  addressDetail: {
    street: "Kp. Kadongdong, Desa Bengle",
    city: "Karawang",
    region: "Jawa Barat",
    country: "ID",
    postalCode: "41371",
  },
  hours: "Senin – Sabtu, 08.00 – 17.00 WIB",
  mapsUrl: "https://maps.app.goo.gl/X38xLYV96M7VYD487",
  mapsEmbed: "https://www.google.com/maps?q=Kp.+Kadongdong+Desa+Bengle+Karawang&output=embed",
  areas: ["Karawang", "Cikampek", "Purwakarta", "Bekasi", "Subang"],
  social: {
    instagram: "https://instagram.com/barabajalas",
    facebook: "https://facebook.com/barabajalas",
    tiktok: "https://tiktok.com/@barabajalas",
  },
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
