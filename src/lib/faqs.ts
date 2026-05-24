import { createServerFn } from "@tanstack/react-start";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface FaqCreateInput {
  question: string;
  answer: string;
  sort_order?: number;
  is_active?: number;
}

export const getFaqs = createServerFn({ method: "GET" }).handler(async () => {
  const { env } = await import("cloudflare:workers");
  const db = (env as any).DB as D1Database;
  if (!db) throw new Error("D1 DB binding tidak ditemukan");
  const result = await db
    .prepare("SELECT * FROM faqs ORDER BY sort_order ASC")
    .all<FaqItem>();
  return result.results;
});

export const createFaq = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: FaqCreateInput }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    await db
      .prepare(
        `INSERT INTO faqs (question, answer, sort_order, is_active)
         VALUES (?, ?, ?, ?)`
      )
      .bind(data.question, data.answer, data.sort_order ?? 0, data.is_active ?? 1)
      .run();
    return { success: true };
  }
);

export const updateFaq = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: FaqCreateInput & { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    const { id, ...fields } = data;
    const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, v]) => v);
    await db
      .prepare(`UPDATE faqs SET ${setClause}, updated_at = datetime('now') WHERE id = ?`)
      .bind(...values, id)
      .run();
    return { success: true };
  }
);

export const deleteFaq = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    await db.prepare("DELETE FROM faqs WHERE id = ?").bind(data.id).run();
    return { success: true };
  }
);