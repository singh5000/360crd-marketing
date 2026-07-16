"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Bot,
  Calendar,
  ClipboardCheck,
  RefreshCw,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Resources (blog) index — Section 5, "Latest": a 2-column grid of recent
 * posts plus a pagination row. No CMS yet, so LATEST_POSTS is placeholder
 * editorial content in 360crd's own subject matter, not a real archive —
 * the "52" page count below is a stand-in for a mature archive, matching
 * the reference layout's shape rather than a real count.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type LatestPost = {
  slug: string;
  category: string;
  color: string;
  icon: LucideIcon;
  title: string;
  author: string;
  date: string;
};

const LATEST_POSTS: LatestPost[] = [
  {
    slug: "field-app-vs-paper-forms",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: Smartphone,
    title: "Field App vs. Paper Forms: Which Actually Closes Incidents Faster?",
    author: "Priya Nair",
    date: "Jul 14, 2026",
  },
  {
    slug: "build-digitize-or-extend-safety-process",
    category: "Industry News",
    color: "#7c3aed",
    icon: Users,
    title: "Should You Build, Digitize, or Extend Your Safety Process? A Decision Framework for Ops Leaders",
    author: "Marcus Webb",
    date: "Jul 8, 2026",
  },
  {
    slug: "what-makes-a-safety-vendor-reliable",
    category: "Industry News",
    color: "#7c3aed",
    icon: Users,
    title: "What Makes a Safety Vendor Actually Reliable Beyond a Sales Demo?",
    author: "Daniel Osei",
    date: "Jun 5, 2026",
  },
  {
    slug: "why-digital-rollouts-fail-before-they-start",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: RefreshCw,
    title: "Why Do Digital Rollouts Fail Before They Start?",
    author: "Priya Nair",
    date: "May 26, 2026",
  },
  {
    slug: "audit-readiness-checklist-2026",
    category: "Compliance & Audits",
    color: "#f59e0b",
    icon: ClipboardCheck,
    title: "Audit Readiness Checklist for Multi-Site Teams in 2026",
    author: "Daniel Osei",
    date: "May 12, 2026",
  },
  {
    slug: "rag-chatbots-or-workflow-automation",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: Bot,
    title: "RAG, Chatbots, or Workflow Automation? Choosing the Right Approach for Site Safety",
    author: "Marcus Webb",
    date: "Apr 15, 2026",
  },
];

const PAGES = ["1", "2", "3", "...", "52"];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: EASE } },
  };
}

function LatestCard({ post, reduced, delay }: { post: LatestPost; reduced: boolean; delay: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp(reduced, delay)}>
      <Link
        href={`/resources/${post.slug}`}
        className="group flex items-start gap-4 rounded-xl border-b border-rule pb-6 transition-colors last:border-b-0 hover:bg-slate-50/60 dark:hover:bg-white/[0.03]"
      >
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl sm:h-20 sm:w-20"
          style={{ backgroundColor: `${post.color}18` }}
        >
          <post.icon className="h-7 w-7" style={{ color: post.color }} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <span
            className="w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: `${post.color}18`, color: post.color }}
          >
            {post.category}
          </span>
          <h3 className="mt-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
            {post.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[9px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <span>by {post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {post.date}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ResourcesLatestGrid() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-labelledby="latest-heading" className="relative bg-white py-10 dark:bg-slate-950 sm:py-14">
      <div className="section-shell">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
          <h2 id="latest-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Latest
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {LATEST_POSTS.map((post, i) => (
            <LatestCard key={post.slug} post={post} reduced={reduced} delay={(i % 2) * 0.05 + Math.floor(i / 2) * 0.06} />
          ))}
        </div>

        <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-center gap-2">
          {PAGES.map((page) =>
            page === "..." ? (
              <span key={page} className="px-2 text-sm text-slate-400 dark:text-slate-500">
                {page}
              </span>
            ) : (
              <Link
                key={page}
                href="/resources"
                aria-current={page === "1" ? "page" : undefined}
                className={
                  page === "1"
                    ? "flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 text-sm font-semibold text-slate-900"
                    : "flex h-9 w-9 items-center justify-center rounded-md border border-rule text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                }
              >
                {page}
              </Link>
            )
          )}
          <Link
            href="/resources"
            className="ml-1 flex h-9 items-center rounded-md border border-rule px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Next
          </Link>
        </nav>
      </div>
    </section>
  );
}
