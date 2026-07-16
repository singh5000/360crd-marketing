"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  ClipboardList,
  FileWarning,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Resources (blog) index — Section 2, "Popular Posts": one large featured
 * post (illustrated graphic + a 5-step cycle diagram, echoing the reference
 * layout's poster-style hero card without reusing its literal MVP-wheel
 * content), two stacked smaller posts beside it, and one wide post below.
 * No CMS yet — thumbnails are coded gradient/icon compositions, same
 * approach as the homepage's BlogPreview, not real photography.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const CYCLE_STEPS: { label: string; icon: LucideIcon; angle: number }[] = [
  { label: "Report", icon: Camera, angle: -90 },
  { label: "Triage", icon: FileWarning, angle: -18 },
  { label: "Escalate", icon: ShieldAlert, angle: 54 },
  { label: "Close", icon: CheckCircle2, angle: 126 },
  { label: "Evidence", icon: ClipboardList, angle: 198 },
];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function CycleDiagram() {
  const radius = 62;
  return (
    <div className="relative h-40 w-40 shrink-0 sm:h-44 sm:w-44" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/25" />
      <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white text-center shadow-lg">
        <span className="text-sm font-extrabold leading-tight text-slate-900">
          Audit
          <br />
          Cycle
        </span>
      </div>
      {CYCLE_STEPS.map((step) => {
        const rad = (step.angle * Math.PI) / 180;
        const x = 50 + (radius / 1.76) * Math.cos(rad);
        const y = 50 + (radius / 1.76) * Math.sin(rad);
        return (
          <span
            key={step.label}
            className="absolute flex flex-col items-center gap-1 text-[10px] font-semibold text-white"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <step.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            {step.label}
          </span>
        );
      })}
    </div>
  );
}

function FeaturedPost({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp(reduced, 0)}
      className="h-full"
    >
      <Link
        href="/resources/10-step-checklist-safety-audit"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_26px_52px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-slate-800 dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)]"
      >
        <div className="relative flex items-center justify-between gap-4 overflow-hidden bg-gradient-to-br from-violet to-blue-800 p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <h3 className="relative max-w-[13ch] text-2xl font-extrabold leading-[1.15] text-white sm:text-[28px]">
            Checklist to Pass a{" "}
            <span className="rounded-md bg-amber-500 px-2 py-0.5 text-slate-900">Safety Audit</span>
          </h3>
          <CycleDiagram />
        </div>

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <span className="w-fit rounded-full bg-sky/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky/15 dark:text-sky-300">
            Compliance &amp; Audits
          </span>
          <h4 className="mt-4 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
            10-Step Checklist to Pass Your Next Safety Audit
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Most audit failures aren&apos;t about unsafe sites — they&apos;re
            about missing paperwork. This checklist walks EHS teams through
            preparing evidence, closing open corrective actions, and
            walking in ready, not scrambling the night before.
          </p>
          <div className="mt-auto flex items-center gap-3 pt-6 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              PN
            </span>
            <span>by Priya Nair</span>
            <span aria-hidden="true">&middot;</span>
            <span>Jul 14, 2026</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

type SidePost = {
  slug: string;
  category: string;
  color: string;
  icon: LucideIcon;
  title: string;
  author: string;
  date: string;
};

const SIDE_POSTS: SidePost[] = [
  {
    slug: "on-demand-safety-teams",
    category: "Industry News",
    color: "#7c3aed",
    icon: ShieldAlert,
    title: "On-Demand Safety Teams: Scale Compliance Without Hiring",
    author: "Daniel Osei",
    date: "Jul 9, 2026",
  },
  {
    slug: "top-site-safety-technology-trends-2026",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: ClipboardList,
    title: "Top Site Safety Technology Trends in 2026",
    author: "Marcus Webb",
    date: "Jul 9, 2026",
  },
];

function SidePostCard({ post, reduced, delay }: { post: SidePost; reduced: boolean; delay: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp(reduced, delay)}>
      <Link
        href={`/resources/${post.slug}`}
        className="group flex items-center gap-4 rounded-2xl border border-rule bg-white p-4 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_26px_52px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-slate-800 dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)]"
      >
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
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
          <h4 className="mt-2 truncate text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
            {post.title}
          </h4>
          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            by {post.author} &middot; {post.date}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function WidePost({ reduced }: { reduced: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp(reduced, 0.2)}>
      <Link
        href="/resources/multi-site-contractor-cuts-response-time-40-percent"
        className="group flex flex-col overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_26px_52px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-slate-800 dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)] sm:flex-row"
      >
        <div
          aria-hidden="true"
          className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500/20 to-violet/30 sm:h-auto sm:w-72"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm dark:bg-white/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center p-7 sm:p-8">
          <span className="w-fit rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
            Incident Management
          </span>
          <h4 className="mt-3 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet dark:text-white dark:group-hover:text-sky">
            How a Multi-Site Contractor Cut Incident Response Time by 40%
          </h4>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Twelve sites, one paper trail that never quite kept up. Here&apos;s
            how a mid-size contractor moved every crew onto digital
            reporting — and cut the time between an incident and its
            resolution almost in half.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              DO
            </span>
            <span>by Daniel Osei</span>
            <span aria-hidden="true">&middot;</span>
            <span>Jun 30, 2026</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ResourcesPopularPosts() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-labelledby="popular-posts-heading" className="relative bg-white py-4 dark:bg-slate-950">
      <div className="section-shell">
        <div className="flex items-center gap-2.5">
          <span className={cn("h-2 w-2 shrink-0 rounded-full bg-amber-500")} aria-hidden="true" />
          <h2 id="popular-posts-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            Popular Posts
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FeaturedPost reduced={reduced} />
          <div className="grid grid-cols-1 gap-6">
            {SIDE_POSTS.map((post, i) => (
              <SidePostCard key={post.slug} post={post} reduced={reduced} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <WidePost reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
