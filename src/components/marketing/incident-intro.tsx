"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Section 3 of the reusable inner-page template — a two-column soft-wash
 * intro (badge, heading, body, CTA left; a plain module image right, when
 * provided) followed by a full-width feature-block row. Fully prop-driven
 * like every other section here — a new module page passes its own copy,
 * image and feature blocks, never a fork of this file.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type IncidentIntroFeatureBlock = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type IntroCardTone = "amber" | "rose" | "emerald" | "sky" | "orange";

const TONE_STYLES: Record<IntroCardTone, string> = {
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  emerald: "bg-emerald-100 text-emerald-700",
  sky: "bg-sky-100 text-sky-700",
  orange: "bg-orange-100 text-orange-700",
};

export type IntroCardRow = { label: string; value: string; tone?: IntroCardTone };

/** One of the two small data-filled cards floating on the image's corners. */
export type IntroCard = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  rows: IntroCardRow[];
  cta?: { label: string; href: string };
};

export interface IncidentIntroProps {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Real image path/URL for the right column. Column is omitted entirely
   * when not provided (heading/body then center on their own). */
  imageSrc?: string;
  imageAlt?: string;
  /** Floating card over the image's top-right corner. */
  topCard?: IntroCard;
  /** Floating card over the image's bottom-left corner. */
  bottomCard?: IntroCard;
  featureBlocks: IncidentIntroFeatureBlock[];
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

function IntroDataCard({ card, className }: { card: IntroCard; className?: string }) {
  return (
    <div
      className={cn(
        "w-64 rounded-2xl bg-white p-4 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 dark:bg-slate-800",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
          {card.icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{card.title}</p>
          {card.subtitle && (
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{card.subtitle}</p>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {card.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 dark:bg-slate-900/50"
          >
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{row.label}</span>
            {row.tone ? (
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", TONE_STYLES[row.tone])}>
                {row.value}
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-slate-900 dark:text-white">{row.value}</span>
            )}
          </div>
        ))}
      </div>

      {card.cta && (
        <Link
          href={card.cta.href}
          className="mt-3 flex w-full items-center justify-center rounded-full bg-violet px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-shadow hover:shadow-[0_0_24px_-8px_var(--sky)]"
        >
          {card.cta.label}
        </Link>
      )}
    </div>
  );
}

export default function IncidentIntro({
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  topCard,
  bottomCard,
  featureBlocks,
}: IncidentIntroProps) {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label={eyebrow}
      className="relative snap-start overflow-hidden bg-slate-50 py-20 dark:bg-slate-900 sm:py-24"
    >
      <div className="section-shell relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-16",
            imageSrc && "lg:grid-cols-2 lg:gap-12"
          )}
        >
          {/* Left column */}
          <div className={cn("text-center", imageSrc ? "lg:text-left" : "mx-auto max-w-3xl")}>
            <motion.span
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0)}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-rose-700 backdrop-blur-sm dark:bg-white/5 dark:text-rose-300"
            >
              {eyebrow}
            </motion.span>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0.1)}
              className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            >
              {heading}
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0.2)}
              className={cn(
                "mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300",
                imageSrc ? "mx-auto max-w-xl lg:mx-0 lg:max-w-none" : "mx-auto max-w-2xl"
              )}
            >
              {body}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0.3)}
              className={cn(
                "mt-8 h-px w-full max-w-sm bg-slate-900/10 dark:bg-white/10",
                imageSrc ? "mx-auto lg:mx-0" : "mx-auto"
              )}
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0.38)}
              className="mt-8"
            >
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                {ctaLabel}
              </Link>
            </motion.div>
          </div>

          {imageSrc && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp(reduced, 0.2)}
              className="relative mx-auto w-full max-w-sm py-6 lg:mx-0 lg:max-w-[790px]"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-900">
                <img src={imageSrc} alt={imageAlt ?? ""} className="h-auto w-full object-cover" />
              </div>

              {topCard && (
                <IntroDataCard
                  card={topCard}
                  className="absolute -top-2 -right-16 z-20 hidden lg:block"
                />
              )}
              {bottomCard && (
                <IntroDataCard
                  card={bottomCard}
                  className="absolute -bottom-2 -left-16 z-20 hidden lg:block"
                />
              )}

              {/* Mobile + tablet fallback: cards stack under the image instead
                  of floating — the image itself doesn't widen past max-w-sm
                  until lg:, so floating cards offset -16 past its edge would
                  overflow the viewport at any narrower width. */}
              {(topCard || bottomCard) && (
                <div className="mt-4 flex flex-col items-center gap-3 lg:hidden">
                  {topCard && <IntroDataCard card={topCard} className="w-full max-w-xs" />}
                  {bottomCard && <IntroDataCard card={bottomCard} className="w-full max-w-xs" />}
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {featureBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, 0.1 + i * 0.1)}
              className="rounded-2xl bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                  {block.icon}
                </span>
                <p className="text-[16px] font-bold leading-snug text-slate-900 dark:text-white">
                  {block.title}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {block.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
