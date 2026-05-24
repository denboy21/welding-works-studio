// src/lib/server/db.ts
// D1 di-akses via context yang di-pass dari server function handler

export function getDB(env: Record<string, unknown>): D1Database {
  const db = env["DB"] as D1Database | undefined;
  if (!db) {
    throw new Error(
      "D1 DB binding tidak ditemukan. Pastikan wrangler.jsonc sudah ada d1_databases binding = 'DB'."
    );
  }
  return db;
}