"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";

/**
 * Resources (blog) index — Section 3: a two-up promo strip between the
 * popular-posts block and the "Watch Now" section — a product CTA on the
 * left, a newsletter opt-in on the right. Not wired to a real subscription
 * endpoint yet, same placeholder status as the Footer's newsletter form.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

export default function ResourcesPromoStrip() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Get started with 360crd" className="relative bg-white py-10 dark:bg-slate-950 sm:py-14">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(reduced, 0)}
            className="flex flex-col justify-center gap-5 rounded-2xl bg-amber-500 p-8"
          >
            <p className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              Manage every site from one dashboard with 360crd.
            </p>
            <Link
              href="/trial"
              className="inline-flex w-fit items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-500"
            >
              Start Free Trial
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(reduced, 0.1)}
            className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-slate-900 p-8 text-center dark:bg-slate-900"
          >
            <div>
              <p className="text-2xl font-bold text-white">Subscribe to our blog</p>
              <p className="mt-2 text-sm text-slate-400">
                Be part of a growing community of safety and compliance
                professionals.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="promo-strip-email" className="sr-only">
                Email address
              </label>
              <div className="relative min-w-0 flex-1">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="promo-strip-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-md bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Join Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
