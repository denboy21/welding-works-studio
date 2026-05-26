-- Tabel desain layanan
CREATE TABLE IF NOT EXISTS service_designs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  service_slug TEXT NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  image_url   TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  is_active   INTEGER DEFAULT 1,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Seed data contoh
INSERT INTO service_designs (service_slug, name, description, image_url, sort_order) VALUES
  ('pagar-besi', 'Pagar Minimalis Hollow', 'Besi hollow 4x4, finishing cat duco, anti karat. Cocok untuk rumah modern minimalis.', 'https://i.ibb.co/placeholder.jpg', 1),
  ('pagar-besi', 'Pagar Klasik Tempa', 'Besi tempa motif klasik, powder coating hitam, tahan cuaca dan karat.', 'https://i.ibb.co/placeholder.jpg', 2),
  ('kanopi', 'Kanopi Minimalis Polycarbonate', 'Rangka besi hollow, atap polycarbonate bening, ringan dan anti bocor.', 'https://i.ibb.co/placeholder.jpg', 1),
  ('railing-tangga', 'Railing Stainless Modern', 'Stainless steel 304, finishing mirror polish, elegan dan mudah dibersihkan.', 'https://i.ibb.co/placeholder.jpg', 1);