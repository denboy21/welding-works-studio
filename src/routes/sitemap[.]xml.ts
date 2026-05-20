import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, BLOG_POSTS } from "@/lib/data";

// TODO: replace with your project URL once a custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/layanan", priority: "0.9", changefreq: "monthly" as const },
          { path: "/portfolio", priority: "0.9", changefreq: "monthly" as const },
          { path: "/area-layanan", priority: "0.8", changefreq: "monthly" as const },
          { path: "/tentang", priority: "0.6", changefreq: "yearly" as const },
          { path: "/testimoni", priority: "0.6", changefreq: "monthly" as const },
          { path: "/faq", priority: "0.6", changefreq: "monthly" as const },
          { path: "/blog", priority: "0.7", changefreq: "weekly" as const },
          { path: "/kontak", priority: "0.8", changefreq: "yearly" as const },
        ];
        const servicePaths = SERVICES.map((s) => ({
          path: `/layanan/${s.slug}`,
          priority: "0.8",
          changefreq: "monthly" as const,
        }));
        const blogPaths = BLOG_POSTS.map((p) => ({
          path: `/blog/${p.slug}`,
          priority: "0.6",
          changefreq: "monthly" as const,
          lastmod: p.date,
        }));
        const entries = [...staticPaths, ...servicePaths, ...blogPaths];

        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});