"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A "latest from the blog" strip for inner module pages — 3 cards, always
 * the most recent posts (see `getLatestPosts` in lib/blog-posts.ts), not
 * hand-picked per page. Distinct component from the homepage's
 * BlogPreview rather than a reused/parameterized version of it: that one
 * is tuned to the homepage's specific 3 hand-picked posts and register,
 * and this one is meant to feel like a deliberately more premium card
 * treatment (thumbnail zoom on hover, floating read-time badge, glowing
 * hover border) without risking a visual regression on the homepage.
 *
 * `icon` per post must already be a rendered element (not a raw
 * LucideIcon reference) — the page composing this passes server-rendered
 * JSX in, since a bare component reference can't cross the Server ->
 * Client boundary as a prop.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type LatestPost = {
  slug: string;
  category: string;
  color: string;
  icon: ReactNode;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
};

export interface LatestInsightsProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  posts: LatestPost[];
  viewAllHref: string;
  viewAllLabel: string;
}

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function cardVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: EASE } },
  };
}

function PostThumbnail({ post }: { post: LatestPost }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-48 items-center justify-center overflow-hidden"
      style={{ backgroundImage: `linear-gradient(135deg, ${post.color}2a, var(--violet) 150%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] transition-transform duration-500 ease-out group-hover:scale-110"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ backgroundColor: post.color, opacity: 0.4 }}
      />
      <span
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110"
        style={{ backgroundColor: `${post.color}30` }}
      >
        <span style={{ color: post.color }} className="[&_svg]:h-8 [&_svg]:w-8">
          {post.icon}
        </span>
      </span>

      <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-950/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {post.readTime}
      </span>
    </div>
  );
}

function PostCard({ post, reduced, delay }: { post: LatestPost; reduced: boolean; delay: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={cardVariants(reduced, delay)}>
      <Link
        href={`/resources/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_12px_32px_-22px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/40 hover:shadow-[0_28px_56px_-24px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-slate-800 dark:shadow-[0_12px_32px_-22px_rgba(0,0,0,0.55)]"
        style={{ "--accent": post.color } as CSSProperties}
      >
        <PostThumbnail post={post} />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <span
            className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${post.color}18`, color: post.color }}
          >
            {post.category}
          </span>

          <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: post.color }}
                aria-hidden="true"
              >
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="min-w-0 truncate text-xs text-slate-500 dark:text-slate-400">{post.author}</span>
              <span className="hidden shrink-0 items-center gap-1 text-xs text-slate-400 dark:text-slate-500 sm:flex">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {post.date}
              </span>
            </div>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 text-[var(--accent)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white"
            >
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function LatestInsights({ eyebrow, heading, subhead, posts, viewAllHref, viewAllLabel }: LatestInsightsProps) {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label={eyebrow} className="relative snap-start overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-24">
      <div className="section-shell relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(reduced, 0)}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              {eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subhead}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(reduced, 0.1)}
          >
            <Link
              href={viewAllHref}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-md border border-rule bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2",
                "dark:bg-slate-800 dark:text-white dark:hover:bg-white/5"
              )}
            >
              {viewAllLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} reduced={reduced} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
