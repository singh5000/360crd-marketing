"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search } from "lucide-react";

/**
 * Resources (blog) index — Section 1. Category pills + big heading + a
 * search field, modeled on a standard industry blog-index hero pattern.
 * The reference this was built from showed a row of real third-party press
 * logos ("Featured In") — 360crd has no press mentions yet, so that slot
 * is filled with the standards this platform is actually built around
 * (same names as the homepage's ComplianceStrip) instead of fabricated
 * or borrowed logos.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export const RESOURCE_CATEGORIES = [
  "Incident Management",
  "Compliance & Audits",
  "Training",
  "Waste Management",
  "PPE & Assets",
  "Industry News",
  "Product Updates",
];

const STANDARDS = ["ISO 45001", "ISO 14001", "OSHA", "Factory Compliance", "Internal Safety Policy"];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function SquiggleDoodle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 46"
      className="hidden h-11 w-14 shrink-0 text-amber-500 sm:block"
      fill="none"
    >
      <path
        d="M4 4c10 0 10 8 0 8s-2 10 10 10c14 0 8 12-4 12M46 12c-6 6 2 10 8 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ResourcesHero() {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label="Resources"
      className="relative snap-start overflow-hidden bg-white pt-[126px] dark:bg-slate-950 md:pt-[130px]"
    >
      <div className="section-shell relative py-10 lg:py-14">
        {/* Category pills */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp(reduced, 0)}
          className="flex flex-wrap gap-2.5"
        >
          {RESOURCE_CATEGORIES.map((category) => (
            <span
              key={category}
              className="rounded-full border border-rule bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              {category}
            </span>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.div initial="hidden" animate="show" variants={fadeUp(reduced, 0.08)} className="flex items-start gap-3">
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Site Safety Insights Start Here
              </h1>
              <SquiggleDoodle />
            </motion.div>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp(reduced, 0.16)}
              className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Tap into field-tested guidance from safety and compliance
              experts. Get practical insights to help you run safer,
              audit-ready sites in today&apos;s tightening regulatory
              landscape.
            </motion.p>
          </div>

          <motion.form
            initial="hidden"
            animate="show"
            variants={fadeUp(reduced, 0.24)}
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md shrink-0 items-center gap-2.5"
          >
            <label htmlFor="resources-search" className="sr-only">
              Search the blog
            </label>
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="resources-search"
                type="search"
                placeholder="Search the blog..."
                className="w-full rounded-md border border-rule bg-white py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:bg-white/5 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Search
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.form>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp(reduced, 0.3)}
          className="mt-12 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:gap-8"
        >
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            Built around the standards you&apos;re audited on
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {STANDARDS.map((standard) => (
              <span
                key={standard}
                className="text-base font-bold tracking-tight text-slate-400 dark:text-slate-600"
              >
                {standard}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
