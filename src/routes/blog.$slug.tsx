import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { BLOG_POSTS } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const title = p ? `${p.title} | Bara Baja Las` : "Blog";
    return {
      meta: [
        { title },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: p.title,
                datePublished: p.date,
                author: { "@type": "Organization", name: "Bara Baja Las" },
                publisher: { "@type": "Organization", name: "Bara Baja Las" },
              }),
            },
          ]
        : [],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Artikel tidak ditemukan</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary">← Kembali ke blog</Link>
      </div>
    </SiteLayout>
  ),
});

function Page() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Semua artikel
        </Link>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMin} mnt baca</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="prose prose-invert mt-8 max-w-none space-y-5 text-base leading-relaxed text-foreground/85">
          <p>
            Artikel ini akan segera diperbarui dengan konten lengkap. Sementara itu, hubungi tim Bara Baja Las untuk konsultasi langsung mengenai topik ini.
          </p>
          <p>
            Kami workshop jasa las profesional Karawang yang melayani pembuatan pagar, kanopi, railing, balkon, tralis, hingga konstruksi baja untuk area Karawang, Cikampek, Purwakarta, Bekasi, dan Subang.
          </p>
        </div>
        <div className="mt-16">
          <CTASection />
        </div>
      </article>
    </SiteLayout>
  );
}