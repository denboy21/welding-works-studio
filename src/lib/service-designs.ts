import { createServerFn } from "@tanstack/react-start";

export interface ServiceDesign {
  id: number;
  service_slug: string;
  name: string;
  description: string | null;
  image_url: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceDesignCreateInput {
  service_slug: string;
  name: string;
  description?: string;
  image_url: string;
  sort_order?: number;
  is_active?: number;
}

export const getServiceDesigns = createServerFn({ method: "GET" }).handler(
  async ({ data }: { data: { slug: string } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    if (!db) throw new Error("D1 DB binding tidak ditemukan");
    const result = await db
      .prepare(
        "SELECT * FROM service_designs WHERE service_slug = ? AND is_active = 1 ORDER BY sort_order ASC"
      )
      .bind(data.slug)
      .all<ServiceDesign>();
    return result.results;
  }
);

export const getAllServiceDesigns = createServerFn({ method: "GET" }).handler(
  async () => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    if (!db) throw new Error("D1 DB binding tidak ditemukan");
    const result = await db
      .prepare("SELECT * FROM service_designs ORDER BY service_slug ASC, sort_order ASC")
      .all<ServiceDesign>();
    return result.results;
  }
);

export const createServiceDesign = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: ServiceDesignCreateInput }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    await db
      .prepare(
        `INSERT INTO service_designs (service_slug, name, description, image_url, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(
        data.service_slug,
        data.name,
        data.description ?? null,
        data.image_url,
        data.sort_order ?? 0,
        data.is_active ?? 1
      )
      .run();
    return { success: true };
  }
);

export const updateServiceDesign = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: ServiceDesignCreateInput & { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    const { id, ...fields } = data;
    const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, v]) => v);
    await db
      .prepare(
        `UPDATE service_designs SET ${setClause}, updated_at = datetime('now') WHERE id = ?`
      )
      .bind(...values, id)
      .run();
    return { success: true };
  }
);

export const deleteServiceDesign = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { id: number } }) => {
    const { env } = await import("cloudflare:workers");
    const db = (env as any).DB as D1Database;
    await db
      .prepare("DELETE FROM service_designs WHERE id = ?")
      .bind(data.id)
      .run();
    return { success: true };
  }
);