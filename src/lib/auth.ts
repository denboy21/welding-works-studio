import { createServerFn } from "@tanstack/react-start";

export const verifyAdminPassword = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { password: string } }) => {
    const { env } = await import("cloudflare:workers");
    const adminPassword = (env as any).ADMIN_PASSWORD as string;

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD belum di-set");
    }

    if (data.password !== adminPassword) {
      throw new Error("Password salah");
    }

    return { success: true };
  },
);
