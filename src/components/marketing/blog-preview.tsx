"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  FileCheck,
  Recycle,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 10 — "From the blog" preview strip, 3 latest posts. No CMS is
 * wired up yet, so POSTS below is realistic placeholder editorial content
 * (real 360crd subject matter — incidents, compliance, waste — not generic
 * filler) and thumbnails are coded gradient/icon compositions rather than
 * real photography. Swap POSTS for a real data fetch (and the thumbnail
 * markup for next/image) once the blog/CMS exists.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Post = {
  slug: string;
  category: string;
  color: string;
  icon: LucideIcon;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
};

const POSTS: Post[] = [
  {
    slug: "cost-of-a-delayed-incident-report",
    category: "Incident Management",
    color: "#e11d48",
    icon: TriangleAlert,
    title: "The Real Cost of a Delayed Incident Report",
    excerpt:
      "Every hour between an incident and its report is evidence you can't get back. Here's what that delay actually costs a multi-site contractor.",
    author: "Priya Nair",
    date: "Jul 2, 2026",
    readTime: "6 min read",
  },
  {
    slug: "iso-45001-vs-osha-multi-site",
    category: "Compliance",
    color: "#f59e0b",
    icon: FileCheck,
    title: "ISO 45001 vs. OSHA: What Multi-Site Contractors Actually Need",
    excerpt:
      "You don't have to choose one standard. Here's how growing contractors map both into a single audit workflow without doubling their paperwork.",
    author: "Daniel Osei",
    date: "Jun 24, 2026",
    readTime: "8 min read",
  },
  {
    slug: "qr-tagged-waste-tracking-90-day-case-study",
    category: "Waste Management",
    color: "#38bdf8",
    icon: Recycle,
    title: "QR-Tagged Waste Tracking: A 90-Day Case Study",

    excerpt:
      "One contractor moved from paper waste logs to QR-tagged tracking across 12 sites. Here's what changed in disposal times, and what didn't.",
    author: "Priya Nair",
    date: "Jun 11, 2026",
    readTime: "5 min read",
  },
];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function cardVariants(index: number, reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: index * 0.08, ease: EASE },
    },
  };
}

function PostThumbnail({ post }: { post: Post }) {
  const Icon = post.icon;
  return (
    <div
      aria-hidden="true"
      className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-2xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${post.color}26, var(--violet) 140%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-2xl"
        style={{ backgroundColor: post.color, opacity: 0.35 }}
      />
      <span
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-sm"
        style={{ backgroundColor: `${post.color}30` }}
      >
        <Icon className="h-8 w-8" style={{ color: post.color }} strokeWidth={1.75} />
      </span>
    </div>
  );
}

function PostCard({ post, index, reduced }: { post: Post; index: number; reduced: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants(index, reduced)}
    >
      <Link
        href={`/resources/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_26px_52px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-slate-800 dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_26px_52px_-24px_rgba(0,0,0,0.65)]"
      >
        <PostThumbnail post={post} />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <span
            className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${post.color}18`, color: post.color }}
          >
            {post.category}
          </span>

          <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
            {post.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-violet dark:text-slate-600 dark:group-hover:text-sky"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPreview() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="blog"
      aria-labelledby="blog-preview-heading"
      className="relative snap-start bg-slate-50 py-20 dark:bg-slate-900 sm:py-24"
    >
      <div className="section-shell">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(reduced)}
            className="max-w-2xl"
          >
            <p className="text-base font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
              From the Blog
            </p>
            <h2
              id="blog-preview-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]"
            >
              Field-tested insights for safety teams.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Practical guidance on incidents, compliance and site
              operations — written from what actually happens on
              multi-site jobs, not theory.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(reduced)}
          >
            <Link
              href="/resources"
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-md border border-rule bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2",
                "dark:bg-slate-800 dark:text-white dark:hover:bg-white/5"
              )}
            >
              View all articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* 3 posts don't divide evenly into 2 columns, so skip the sm: 2-col
            stage (which would strand the 3rd card alone in its own row) —
            go straight from a 1-col mobile/tablet stack to 3-col at lg. */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {POSTS.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
