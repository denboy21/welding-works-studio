-- Tabel portfolio
CREATE TABLE IF NOT EXISTS portfolio (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  location    TEXT NOT NULL,
  description TEXT,
  image_url   TEXT NOT NULL,
  is_featured INTEGER DEFAULT 0,
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Seed data awal (dari data.ts yang sudah ada)
INSERT INTO portfolio (title, category, location, image_url, is_featured, sort_order) VALUES
  ('Pagar Minimalis', 'Pagar', 'Karawang Barat', '/assets/service-pagar-BaAqJBw5.jpg', 1, 1),
  ('Kanopi Carport', 'Kanopi', 'Cikampek', '/assets/service-kanopi-DTjVd0H_.jpg', 1, 2),
  ('Railing Tangga Stainless', 'Railing', 'Purwakarta', '/assets/service-railing-CMoCZpq_.jpg', 1, 3),
  ('Railing Balkon', 'Balkon', 'Karawang Timur', '/assets/service-balkon-Dgd6jsTG.jpg', 1, 4),
  ('Tralis Jendela Minimalis', 'Tralis', 'Bekasi', '/assets/service-tralis-BKYb2Ygj.jpg', 1, 5),
  ('Rangka Baja Ringan Workshop', 'Baja Ringan', 'Karawang', '/assets/service-baja-ringan-C0aIs8pK.jpg', 1, 6);