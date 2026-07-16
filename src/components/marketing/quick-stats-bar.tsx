"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Section 2 of the reusable inner-page template — a small stat strip right
 * after the Hero that proves the module with 4 crisp facts. Deliberately
 * plain (no cards, no icons, no borders around each stat): a horizontal
 * divider off the Hero, then big centered numbers in a row, matching the
 * clean/quiet register of a proof-point strip rather than a feature-grid.
 * Fully prop-driven — a new module page passes its own 4 stats, never a
 * fork of this file.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type QuickStat = { value: string; label: string; description: string };

export interface QuickStatsBarProps {
  stats: QuickStat[];
}

function fadeUp(reduced: boolean, delaySeconds: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: delaySeconds, ease: EASE } },
  };
}

export default function QuickStatsBar({ stats }: QuickStatsBarProps) {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label="Quick stats"
      className="relative snap-start border-t border-rule bg-white py-14 dark:bg-slate-950 sm:py-16"
    >
      <div className="section-shell">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, i * 0.08)}
              className="text-center"
            >
              <p className="text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-base font-semibold text-slate-800 dark:text-slate-100">
                {stat.label}
              </p>
              <p className="mx-auto mt-1.5 max-w-[22ch] text-sm leading-snug text-slate-500 dark:text-slate-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
