import { createServerFn } from "@tanstack/react-start";

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string | null;
  image_url: string;
  is_featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioCreateInput {
  title: string;
  category: string;
  location: string;
  description?: string;
  image_url: string;
  is_featured?: number;
  sort_order?: number;
}

// GET ALL
export const getPortfolioItems = createServerFn({ method: "GET" }).handler(
  async () => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    if (!db) throw new Error("D1 DB binding tidak ditemukan");
    const result = await db
      .prepare("SELECT * FROM portfolio ORDER BY sort_order ASC, created_at DESC")
      .all<PortfolioItem>();
    return result.results;
  }
);

export const createPortfolioItem = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: PortfolioCreateInput }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    if (!db) throw new Error("D1 DB binding tidak ditemukan");
    const result = await db
      .prepare(
        `INSERT INTO portfolio (title, category, location, description, image_url, is_featured, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        data.title,
        data.category,
        data.location,
        data.description ?? null,
        data.image_url,
        data.is_featured ?? 0,
        data.sort_order ?? 0
      )
      .run();
    return { success: true, id: result.meta.last_row_id };
  }
);

export const updatePortfolioItem = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: PortfolioCreateInput & { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    if (!db) throw new Error("D1 DB binding tidak ditemukan");
    const { id, ...fields } = data;
    const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
    if (entries.length === 0) throw new Error("Tidak ada field yang diupdate");
    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, v]) => v);
    await db
      .prepare(`UPDATE portfolio SET ${setClause}, updated_at = datetime('now') WHERE id = ?`)
      .bind(...values, id)
      .run();
    return { success: true };
  }
);

export const deletePortfolioItem = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    if (!db) throw new Error("D1 DB binding tidak ditemukan");
    await db.prepare("DELETE FROM portfolio WHERE id = ?").bind(data.id).run();
    return { success: true };
  }
);