-- Tabel testimoni
CREATE TABLE IF NOT EXISTS testimonials (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  location    TEXT NOT NULL,
  rating      INTEGER DEFAULT 5,
  text        TEXT NOT NULL,
  avatar_url  TEXT,
  is_active   INTEGER DEFAULT 1,
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Seed data testimoni
INSERT INTO testimonials (name, location, rating, text, avatar_url, sort_order) VALUES
  ('Pak Ahmad', 'Karawang Barat', 5, 'Pengerjaan pagar rumah sangat rapi dan tepat waktu. Tim Bara Baja Las profesional, hasilnya melebihi ekspektasi.', null, 1),
  ('Bu Ratna', 'Cikampek', 5, 'Kanopi carport selesai 3 hari, kuat dan tidak bocor saat hujan deras. Recommended buat warga sekitar.', null, 2),
  ('Pak Joko', 'Purwakarta', 5, 'Survey lokasi gratis, harga transparan, kualitas las premium. Konstruksi gudang saya kokoh sekali.', null, 3),
  ('Bu Sinta', 'Karawang Timur', 5, 'Railing tangga stainless terlihat mewah. Pengerjaan halus, finishing sempurna. Terima kasih Bara Baja Las.', null, 4),
  ('Pak Dedi', 'Bekasi', 5, 'Las panggilan respon cepat, datang sore langsung dikerjakan. Harga sesuai kualitas, mantap!', null, 5);

-- Tabel FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  is_active   INTEGER DEFAULT 1,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Seed data FAQ
INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Apakah bisa survey lokasi gratis?', 'Bisa. Kami melayani survey lokasi gratis untuk area Karawang, Cikampek, Purwakarta, Bekasi, dan Subang.', 1),
  ('Berapa lama pengerjaan proyek?', 'Tergantung jenis dan ukuran. Pagar rumah standar 3–7 hari, kanopi 2–5 hari, konstruksi gudang 2–4 minggu.', 2),
  ('Apakah bisa custom desain?', 'Tentu. Kami menerima desain custom sesuai keinginan Anda — kirim referensi gambar atau konsultasikan langsung.', 3),
  ('Apakah melayani luar kota Karawang?', 'Ya. Kami melayani area Karawang, Cikampek, Purwakarta, Bekasi, dan Subang.', 4),
  ('Apakah konsultasi gratis?', 'Gratis. Konsultasi via WhatsApp atau survey lokasi tidak dikenakan biaya.', 5),
  ('Bagaimana sistem pembayaran?', 'DP 50% di awal setelah deal harga, pelunasan 50% saat pekerjaan selesai dan disetujui pelanggan.', 6);