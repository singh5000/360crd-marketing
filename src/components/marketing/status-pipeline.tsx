"use client";

import { Fragment, type ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AccentTheme } from "./feature-hero";

/**
 * Section 5 of the reusable inner-page template — a single wide reference
 * diagram of the module's complete status pipeline, distinct from Section
 * 4's narrative walkthrough: every stage shown at once, equal visual
 * weight, no "you are here" marker. Sequence is the entire point, so
 * cards are always connected by directional arrows — never a bare grid.
 * Cards are sized generously (icon, label, description, and an `owner`
 * tag) rather than kept compact, so the breakpoint for "all 6 in one row"
 * is pushed to xl — at lg a 3-per-row x 2-row grid gives the bigger cards
 * room to breathe. Below md: a vertical stack with down-arrows. Fully
 * prop-driven like every other section here, so a module with a different
 * pipeline (e.g. Waste Management's Reported -> Verified -> Collected ->
 * Approved -> Disposed -> Closed) reuses this component with its own
 * `stages`.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const EYEBROW_BADGE_STYLES: Record<AccentTheme, string> = {
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
  violet: "bg-violet/10 text-violet dark:bg-white/5",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
  fuchsia: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
};

export type StatusStage = {
  label: string;
  description: string;
  /** Who typically acts at this stage, e.g. "Field Crew", "Manager" — a
   * real role from the platform's role system, never a fabricated metric
   * like an average duration. */
  owner: string;
  /** Hex color, e.g. "#f59e0b" — fixed per stage, independent of accentTheme. */
  color: string;
  icon: ReactNode;
};

export interface StatusPipelineProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  accentTheme: AccentTheme;
  stages: StatusStage[];
}

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function cardVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0, scale: 1 }, show: { opacity: 1, y: 0, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, delay, ease: EASE } },
  };
}

function arrowVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } };
  }
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3, delay, ease: EASE } },
  };
}

function StageCard({
  stage,
  index,
  reduced,
  delay,
  className,
}: {
  stage: StatusStage;
  index: number;
  reduced: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants(reduced, delay)}
      className={cn(
        "relative flex min-w-0 flex-1 flex-col items-center rounded-2xl border border-rule bg-white px-6 py-8 text-center shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <span
        className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900"
        aria-hidden="true"
      >
        {index + 1}
      </span>

      <span
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl [&_svg]:h-7 [&_svg]:w-7"
        style={{ backgroundColor: `${stage.color}18`, color: stage.color }}
      >
        {stage.icon}
      </span>
      <p className="mt-4 text-base font-bold leading-snug text-slate-900 dark:text-white">{stage.label}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{stage.description}</p>
      <span
        className="mt-4 w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
        style={{ backgroundColor: `${stage.color}14`, color: stage.color }}
      >
        {stage.owner}
      </span>
    </motion.div>
  );
}

function ArrowConnector({
  direction,
  reduced,
  delay,
}: {
  direction: "right" | "down";
  reduced: boolean;
  delay: number;
}) {
  const Icon = direction === "right" ? ArrowRight : ArrowDown;
  const isRight = direction === "right";
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={arrowVariants(reduced, delay)}
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center gap-1.5",
        isRight ? "flex-row px-1" : "flex-col py-1"
      )}
    >
      <span className={cn("shrink-0 bg-rule", isRight ? "h-px w-5" : "h-5 w-px")} />
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet dark:bg-white/10 dark:text-sky">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <span className={cn("shrink-0 bg-rule", isRight ? "h-px w-5" : "h-5 w-px")} />
    </motion.div>
  );
}

/**
 * Bridges the wrap point in the 3-per-row x 2-row desktop/tablet grid — a
 * dedicated connector from the last card of row 1 (right side) down and
 * across to the first card of row 2 (left side), so the sequence reads as
 * one continuous track instead of two disconnected trios.
 */
function RowBridge({ reduced, delay }: { reduced: boolean; delay: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={arrowVariants(reduced, delay)}
      aria-hidden="true"
      className="relative col-span-full h-16"
    >
      {/* origin dot, right where the line leaves card 3 */}
      <span
        className="absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet dark:bg-sky"
        style={{ left: "85%" }}
      />
      {/* vertical drop */}
      <span className="absolute top-0 h-1/2 w-[3px] -translate-x-1/2 bg-violet dark:bg-sky" style={{ left: "85%" }} />
      {/* top bend joint */}
      <span
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet dark:bg-sky"
        style={{ left: "85%" }}
      />
      {/* horizontal crossing */}
      <span
        className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-violet dark:bg-sky"
        style={{ left: "15%", right: "15%" }}
      />
      {/* bottom bend joint */}
      <span
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet dark:bg-sky"
        style={{ left: "15%" }}
      />
      {/* vertical rise into card 4 */}
      <span className="absolute bottom-0 h-1/2 w-[3px] -translate-x-1/2 bg-violet dark:bg-sky" style={{ left: "15%" }} />
      {/* arrowhead landing on card 4 */}
      <span
        className="absolute bottom-0 z-10 flex h-8 w-8 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-violet text-white shadow-[0_6px_16px_-4px_rgba(126,20,255,0.6)] dark:bg-sky dark:text-slate-900"
        style={{ left: "15%" }}
      >
        <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </motion.div>
  );
}

export default function StatusPipeline({ eyebrow, heading, subhead, accentTheme, stages }: StatusPipelineProps) {
  const reduced = !!useReducedMotion();
  const rows = [stages.slice(0, 3), stages.slice(3, 6)];

  return (
    <section aria-label={eyebrow} className="relative snap-start overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-24">
      <div className="section-shell relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-[640px] text-center"
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]",
              EYEBROW_BADGE_STYLES[accentTheme]
            )}
          >
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subhead}</p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-[1400px]">
          {/* Desktop (md+): 3 cards per row, 2 rows — the standard layout
              at every desktop width, not just a mid-range breakpoint.
              Arrows only within each row's trio, never across the wrap. */}
          <div className="hidden grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-x-2 md:grid">
            {rows.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <StageCard stage={row[0]} index={rowIndex * 3} reduced={reduced} delay={rowIndex * 0.15} />
                <ArrowConnector direction="right" reduced={reduced} delay={rowIndex * 0.15 + 0.05} />
                <StageCard stage={row[1]} index={rowIndex * 3 + 1} reduced={reduced} delay={rowIndex * 0.15 + 0.1} />
                <ArrowConnector direction="right" reduced={reduced} delay={rowIndex * 0.15 + 0.15} />
                <StageCard stage={row[2]} index={rowIndex * 3 + 2} reduced={reduced} delay={rowIndex * 0.15 + 0.2} />
                {rowIndex < rows.length - 1 && <RowBridge reduced={reduced} delay={rowIndex * 0.15 + 0.25} />}
              </Fragment>
            ))}
          </div>

          {/* Mobile: vertical stack with down-arrows */}
          <div className="flex flex-col items-stretch gap-2 md:hidden">
            {stages.map((stage, i) => (
              <Fragment key={stage.label}>
                <StageCard stage={stage} index={i} reduced={reduced} delay={i * 0.08} className="max-w-none" />
                {i < stages.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowConnector direction="down" reduced={reduced} delay={i * 0.08 + 0.04} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
