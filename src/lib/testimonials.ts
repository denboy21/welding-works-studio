import { createServerFn } from "@tanstack/react-start";

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar_url: string | null;
  is_active: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialCreateInput {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar_url?: string;
  is_active?: number;
  sort_order?: number;
}

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { env } = await import("cloudflare:workers");
  const db = (env as any).DB as D1Database;
  if (!db) throw new Error("D1 DB binding tidak ditemukan");
  const result = await db
    .prepare("SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC")
    .all<TestimonialItem>();
  return result.results;
});

export const createTestimonial = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: TestimonialCreateInput }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    await db
      .prepare(
        `INSERT INTO testimonials (name, location, rating, text, avatar_url, is_active, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        data.name,
        data.location,
        data.rating,
        data.text,
        data.avatar_url ?? null,
        data.is_active ?? 1,
        data.sort_order ?? 0
      )
      .run();
    return { success: true };
  }
);

export const updateTestimonial = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: TestimonialCreateInput & { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    const { id, ...fields } = data;
    const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, v]) => v);
    await db
      .prepare(`UPDATE testimonials SET ${setClause}, updated_at = datetime('now') WHERE id = ?`)
      .bind(...values, id)
      .run();
    return { success: true };
  }
);

export const deleteTestimonial = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    await db.prepare("DELETE FROM testimonials WHERE id = ?").bind(data.id).run();
    return { success: true };
  }
);