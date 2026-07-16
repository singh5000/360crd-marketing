"use client";

import Link from "next/link";
import { Building2, Mail, User } from "lucide-react";
import { RESOURCE_CATEGORIES } from "./resources-hero";

/**
 * Sticky right rail for the single blog-post template
 * (/resources/[slug]) — a real (if unwired) demo-request form, a
 * category-browse card, and a related-posts card. Not wired to a real
 * lead-capture endpoint yet, same placeholder status as every other form
 * on the site (Footer newsletter, resources search, etc).
 */

export type RelatedPost = { slug: string; title: string; category: string; date: string };

function DemoFormCard() {
  return (
    <div className="rounded-2xl border border-rule bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]">
      <p className="text-lg font-bold text-slate-900 dark:text-white">Book a Demo</p>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        See 360crd running on sites like yours — 20 minutes, no pressure.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex flex-col gap-3">
        <div className="relative">
          <User
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <label htmlFor="sidebar-name" className="sr-only">
            Full name
          </label>
          <input
            id="sidebar-name"
            type="text"
            required
            placeholder="Full name"
            className="w-full rounded-md border border-rule bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:bg-white/5 dark:text-white"
          />
        </div>

        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <label htmlFor="sidebar-email" className="sr-only">
            Work email
          </label>
          <input
            id="sidebar-email"
            type="email"
            required
            placeholder="Work email"
            className="w-full rounded-md border border-rule bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:bg-white/5 dark:text-white"
          />
        </div>

        <div className="relative">
          <Building2
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <label htmlFor="sidebar-company" className="sr-only">
            Company
          </label>
          <input
            id="sidebar-company"
            type="text"
            placeholder="Company"
            className="w-full rounded-md border border-rule bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:bg-white/5 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-md bg-violet px-5 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_24px_-6px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
        >
          Book a Demo
        </button>
      </form>
    </div>
  );
}

function CategoriesCard() {
  return (
    <div className="rounded-2xl border border-rule bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]">
      <p className="text-sm font-bold text-slate-900 dark:text-white">Browse by category</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {RESOURCE_CATEGORIES.map((category) => (
          <Link
            key={category}
            href="/resources"
            className="rounded-full border border-rule bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}

function RelatedPostsCard({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-rule bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]">
      <p className="text-sm font-bold text-slate-900 dark:text-white">Related posts</p>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-rule pb-4 last:border-b-0 last:pb-0">
            <Link href={`/resources/${post.slug}`} className="group block">
              <span className="text-xs font-semibold text-violet dark:text-sky">{post.category}</span>
              <p className="mt-1 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
                {post.title}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BlogPostSidebar({ relatedPosts }: { relatedPosts: RelatedPost[] }) {
  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      <DemoFormCard />
      <CategoriesCard />
      <RelatedPostsCard posts={relatedPosts} />
    </div>
  );
}
