"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";

/**
 * Resources (blog) index — closing section: a full-bleed newsletter banner,
 * distinct from the Footer's own newsletter block (that one's a compact
 * form in a 3-column layout; this is the page's dedicated closing CTA,
 * same pattern as the homepage's FinalCTA sitting just above the Footer).
 * Not wired to a real subscription endpoint yet.
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

export default function ResourcesSubscribeBanner() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Subscribe to the 360crd blog" className="relative snap-start overflow-hidden bg-slate-950 py-16 sm:py-20">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="subscribe-swirl" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M0 60c20-30 40-30 60 0s40 30 60 0"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subscribe-swirl)" />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[130px]"
      />

      <div className="section-shell relative z-10">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:text-left">
          <div className="text-center lg:text-left">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0)}
              className="text-3xl font-extrabold text-white sm:text-4xl"
            >
              Subscribe to our blog
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0.08)}
              className="mt-3 text-base text-slate-400"
            >
              Be a part of a thriving community of 10,000+ safety and
              compliance professionals.
            </motion.p>
          </div>

          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp(reduced, 0.16)}
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md shrink-0 flex-col gap-2.5 sm:flex-row"
          >
            <label htmlFor="subscribe-banner-email" className="sr-only">
              Email address
            </label>
            <div className="relative min-w-0 flex-1">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="subscribe-banner-email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-md border border-white/15 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Join Now
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
