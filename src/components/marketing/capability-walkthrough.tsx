"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { AppShellFrame } from "./app-shell-chrome";
import type { AccentTheme } from "./feature-hero";

/**
 * Section 4 of the reusable inner-page template — a connected, linear
 * walkthrough of the module's real lifecycle (report -> review -> close),
 * distinct from Section 3's card-heavy hero: slower pacing, one continuous
 * vertical line running through every step instead of a grid. Designed for
 * a short sequence (~3 steps read cleanly with the alternating layout); a
 * module needing more steps should reach for a different pattern rather
 * than stretching this one. Fully prop-driven like every other section
 * here — a new module page passes its own steps and accent, never a fork.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const ACCENT_STYLES: Record<
  AccentTheme,
  { badge: string; number: string; lineDefault: string; lineFilled: string; text: string }
> = {
  rose: {
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
    number: "bg-rose-600",
    lineDefault: "bg-rose-200 dark:bg-rose-900/50",
    lineFilled: "bg-rose-600",
    text: "text-rose-600 dark:text-rose-400",
  },
  sky: {
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
    number: "bg-sky-600",
    lineDefault: "bg-sky-200 dark:bg-sky-900/50",
    lineFilled: "bg-sky-600",
    text: "text-sky-600 dark:text-sky-400",
  },
  violet: {
    badge: "bg-violet/10 text-violet dark:bg-white/5",
    number: "bg-violet",
    lineDefault: "bg-violet/20",
    lineFilled: "bg-violet",
    text: "text-violet",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    number: "bg-emerald-600",
    lineDefault: "bg-emerald-200 dark:bg-emerald-900/50",
    lineFilled: "bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    number: "bg-amber-600",
    lineDefault: "bg-amber-200 dark:bg-amber-900/50",
    lineFilled: "bg-amber-600",
    text: "text-amber-600 dark:text-amber-400",
  },
  indigo: {
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    number: "bg-indigo-600",
    lineDefault: "bg-indigo-200 dark:bg-indigo-900/50",
    lineFilled: "bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  teal: {
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
    number: "bg-teal-600",
    lineDefault: "bg-teal-200 dark:bg-teal-900/50",
    lineFilled: "bg-teal-600",
    text: "text-teal-600 dark:text-teal-400",
  },
  fuchsia: {
    badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
    number: "bg-fuchsia-600",
    lineDefault: "bg-fuchsia-200 dark:bg-fuchsia-900/50",
    lineFilled: "bg-fuchsia-600",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
  },
  cyan: {
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
    number: "bg-cyan-600",
    lineDefault: "bg-cyan-200 dark:bg-cyan-900/50",
    lineFilled: "bg-cyan-600",
    text: "text-cyan-600 dark:text-cyan-400",
  },
};

export type CapabilityStep = {
  /** Small numbered eyebrow, e.g. "STEP 1". */
  label: string;
  title: string;
  body: string;
  /** Real product screenshot. Step renders a placeholder frame when omitted. */
  screenshotSrc?: string;
  screenshotAlt?: string;
};

export interface CapabilityWalkthroughProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  accentTheme: AccentTheme;
  steps: CapabilityStep[];
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

function fadeSide(reduced: boolean, fromLeft: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } };
  }
  return {
    hidden: { opacity: 0, x: fromLeft ? -28 : 28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };
}

function StepScreenshot({ step }: { step: CapabilityStep }) {
  return (
    <AppShellFrame>
      {step.screenshotSrc ? (
        <img src={step.screenshotSrc} alt={step.screenshotAlt ?? ""} className="h-auto w-full object-cover" />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-slate-50 text-sm text-slate-400 dark:bg-slate-900 dark:text-slate-500">
          Screenshot coming soon
        </div>
      )}
    </AppShellFrame>
  );
}

function StepRow({
  step,
  index,
  isLast,
  reduced,
  tone,
}: {
  step: CapabilityStep;
  index: number;
  isLast: boolean;
  reduced: boolean;
  tone: (typeof ACCENT_STYLES)[AccentTheme];
}) {
  const imageFirst = index % 2 === 0;

  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-5 py-8 sm:grid-cols-[48px_1fr] sm:gap-x-6 sm:py-10 lg:grid-cols-[1fr_48px_1fr] lg:items-start lg:gap-x-10 lg:py-16">
      {/* Rail: numbered circle + line segment down to the next step. Always
          stretches to the full row height (even on the `contents` desktop
          path below) so the line reaches the next step's circle. */}
      <div className="relative flex flex-col items-center self-stretch lg:order-2">
        <span
          className={cn(
            "z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-10 sm:w-10",
            tone.number
          )}
        >
          {index + 1}
        </span>
        {!isLast && (
          <div className="relative mt-1 w-0.5 flex-1 sm:w-[3px]">
            <div className={cn("absolute inset-0", tone.lineDefault)} />
            <motion.div
              className={cn("absolute inset-x-0 top-0 origin-top", tone.lineFilled)}
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={reduced ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      {/* Content: one stacked column on mobile/tablet (image above text, per
          spec); on desktop this wrapper becomes `display:contents` so its
          two children re-join the outer grid as independent columns that
          flank the rail, ordered by `imageFirst` for the alternation. */}
      <div className="flex flex-col gap-6 lg:contents">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeSide(reduced, imageFirst)}
          className={imageFirst ? "lg:order-1" : "lg:order-3"}
        >
          <StepScreenshot step={step} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeSide(reduced, !imageFirst)}
          className={imageFirst ? "lg:order-3" : "lg:order-1"}
        >
          <p className={cn("text-xs font-semibold uppercase tracking-[0.1em]", tone.text)}>{step.label}</p>
          <h3 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 dark:text-white">
            {step.title}
          </h3>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">{step.body}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function CapabilityWalkthrough({
  eyebrow,
  heading,
  subhead,
  accentTheme,
  steps,
}: CapabilityWalkthroughProps) {
  const reduced = !!useReducedMotion();
  const tone = ACCENT_STYLES[accentTheme];

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
          <span className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]", tone.badge)}>
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subhead}</p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          {steps.map((step, i) => (
            <StepRow
              key={step.title}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              reduced={reduced}
              tone={tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
