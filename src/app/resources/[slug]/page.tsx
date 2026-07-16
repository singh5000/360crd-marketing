import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, CheckCircle2, ChevronRight, Clock, Home, ListChecks } from "lucide-react";
import Nav from "@/components/marketing/nav";
import Footer from "@/components/marketing/footer";
import BlogPostSidebar from "@/components/marketing/blog-post-sidebar";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function KeyTakeaways({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-2xl border-l-4 border-violet bg-violet/5 p-6 dark:bg-white/5">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-violet dark:text-sky">
        <ListChecks className="h-4 w-4" aria-hidden="true" />
        Key Takeaways
      </p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet dark:text-sky" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return { title: "Post not found — 360crd" };
  }
  return {
    title: `${post.title} — 360crd`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3).map((related) => ({
    slug: related.slug,
    title: related.title,
    category: related.category,
    date: related.date,
  }));

  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <Nav />
      <main className="bg-white pt-[126px] dark:bg-slate-950 md:pt-[130px]">
        <div className="section-shell py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              aria-label="Home"
              className="text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            >
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" aria-hidden="true" />
            <Link
              href="/resources"
              className="text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Resources
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" aria-hidden="true" />
            <span aria-current="page" className="truncate font-semibold text-slate-700 dark:text-slate-200">
              {post.category}
            </span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <span
              className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${post.color}18`, color: post.color }}
            >
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.6rem]">
              {post.title}
            </h1>

            <div className="mt-5 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {initials}
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{post.author}</span>
              <span aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {post.date}
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-8 flex h-56 items-center justify-center overflow-hidden rounded-2xl sm:h-72"
            style={{ backgroundImage: `linear-gradient(135deg, ${post.color}30, var(--violet) 140%)` }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <span
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: `${post.color}30` }}
            >
              <post.icon className="h-10 w-10" style={{ color: post.color }} strokeWidth={1.75} />
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,66fr)_minmax(0,34fr)] lg:items-start">
            <article>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{post.excerpt}</p>

              <div className="mt-6">
                <KeyTakeaways items={post.keyTakeaways} />
              </div>

              <div className="blog-prose mt-8">
                {post.body.map((block, i) =>
                  block.trim().startsWith("<") ? (
                    <div key={i} dangerouslySetInnerHTML={{ __html: block }} />
                  ) : (
                    <p key={i}>{block}</p>
                  )
                )}
              </div>

              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-rule bg-slate-50 p-5 dark:bg-white/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Written by {post.author}</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    Contributor at 360crd, writing on {post.category.toLowerCase()}.
                  </p>
                </div>
              </div>
            </article>

            <aside>
              <BlogPostSidebar relatedPosts={relatedPosts} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
