"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { AlertTriangle, ArrowDown, FolderX, HelpCircle, type LucideIcon } from "lucide-react";

/**
 * Section 3 of the reusable inner-page template — the module-specific pain
 * point, deeper than the homepage's general Problem/Solution section. Sets
 * up why the feature exists before Section 4 shows how it works. Fully
 * prop-driven: a new module page passes its own eyebrow/heading/body/
 * painPoints/bridgeLine, never a fork of this file.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// Fixed per-position icons for the 3 pain points — the shape of the
// problem stays consistent across every module (an inconsistency, scattered
// evidence, an unproven end-state), so a positional icon map generalizes
// cleanly without needing an icon prop on every painPoints[] entry.
const PAIN_POINT_ICONS: LucideIcon[] = [AlertTriangle, FolderX, HelpCircle];

export type PainPoint = { title: string; description: string };

export interface ProblemContextProps {
  eyebrow: string;
  heading: string;
  body: string;
  painPoints: PainPoint[];
  bridgeLine: string;
}

function fadeUp(reduced: boolean, delaySeconds: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: delaySeconds, ease: EASE } },
  };
}

export default function ProblemContext({
  eyebrow,
  heading,
  body,
  painPoints,
  bridgeLine,
}: ProblemContextProps) {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label={eyebrow}
      className="relative snap-start overflow-hidden bg-slate-50 py-20 dark:bg-slate-900 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-rose-500/[0.06] blur-[130px]"
      />

      <div className="section-shell relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.5rem]">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {painPoints.map((point, i) => {
            const Icon = PAIN_POINT_ICONS[i % PAIN_POINT_ICONS.length];
            return (
              <motion.div
                key={point.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp(reduced, 0.15 + i * 0.12)}
                className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <p className="text-[16px] font-bold leading-snug text-slate-900 dark:text-white">
                    {point.title}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0.55)}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {bridgeLine}
          </p>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-violet dark:text-sky" aria-hidden="true" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
