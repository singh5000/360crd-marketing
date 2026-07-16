"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronRight, Home, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 1 of the reusable inner-page template — used across every
 * /features/*, /solutions/* and /industries/* page. Fully prop-driven: a
 * new module page means new props passed in, never new markup or a fork
 * of this file. Site nav is rendered by the page above this component,
 * not rebuilt here. White page background with the site's own brand
 * gradient (--violet -> --sky) used only as accents (eyebrow, primary CTA,
 * soft background glow) — never a per-module accent color and never a
 * full-bleed colored banner.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type AccentTheme = "rose" | "sky" | "violet" | "emerald" | "amber" | "indigo";

// `breadcrumb` is display labels only (no href pairs per the prop schema),
// so non-final segments link out via this best-effort lookup; unmapped
// labels render as inert text rather than a guessed URL.
const BREADCRUMB_HREFS: Record<string, string> = {
  Platform: "/platform",
  Features: "/features",
  Solutions: "/solutions",
  Industries: "/industries",
};

export type CtaLink = { label: string; href: string };

export interface FeatureHeroProps {
  breadcrumb: string[];
  accentTheme: AccentTheme;
  /**
   * Rendered icon element, e.g. `<AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />`.
   * Takes JSX rather than a component reference — a raw component type
   * (lucide's `LucideIcon`) is a function and can't cross the Server ->
   * Client Component boundary when the page passing it stays a Server
   * Component (needed for its `metadata` export).
   */
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  /** Real product screenshot path — the spec'd, ACF-friendly default. */
  screenshotSrc?: string;
  screenshotAlt?: string;
  /** Coded app-shell mock to render instead of screenshotSrc when no real
   * screenshot asset exists yet — takes precedence over screenshotSrc. */
  screenshotNode?: ReactNode;
  /** Optional row of proof-point stat cards below the CTAs, styled like the
   * product dashboard's own stat widgets (icon, value, sparkline, trend). */
  stats?: FeatureHeroStat[];
}

export type FeatureHeroStat = {
  icon: ReactNode;
  value: string;
  label: string;
  trendLabel: string;
  /** Icon badge / sparkline / trend-text color, e.g. "#2563eb". */
  tint: string;
  /** SVG polyline points, viewBox "0 0 200 56" — same format as the
   * homepage dashboard mock's sparklines, e.g. "M0,44 L28,38 L57,40 ...". */
  sparkline: string;
};

function fadeUp(reduced: boolean, delaySeconds: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: delaySeconds, ease: EASE } },
  };
}

function fadeOnly(reduced: boolean, delaySeconds: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } };
  }
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, delay: delaySeconds, ease: EASE } },
  };
}

function Breadcrumb({ segments }: { segments: string[] }) {
  return (
    <header aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </li>
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          // Truncate to "immediate parent + current page" on mobile.
          const hideOnMobile = i < segments.length - 2;
          return (
            <li
              key={segment}
              className={cn("flex items-center gap-1.5", hideOnMobile && "hidden sm:flex")}
            >
              <ChevronRight
                className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600"
                aria-hidden="true"
              />
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-slate-700 dark:text-slate-200"
                >
                  {segment}
                </span>
              ) : (
                <Link
                  href={BREADCRUMB_HREFS[segment] ?? "#"}
                  className="text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </header>
  );
}

function statAreaPath(sparkline: string, height = 56) {
  return `${sparkline} L200,${height} L0,${height} Z`;
}

// Icon + value + label share one inline row (not stacked), a trend pill
// sits below them, and an animated sparkline fills the rest of the card.
function StatCard({
  stat,
  index,
  reduced,
}: {
  stat: FeatureHeroStat;
  index: number;
  reduced: boolean;
}) {
  const lineVariants: Variants = reduced
    ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        show: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.1, delay: 0.7 + index * 0.15, ease: EASE },
        },
      };
  const areaVariants: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.5, delay: 1.3 + index * 0.15 } },
      };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp(reduced, 0.3 + index * 0.1)}
      className="rounded-2xl border border-rule bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(15,23,42,0.22)] dark:bg-slate-900 dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${stat.tint}18`, color: stat.tint }}
        >
          {stat.icon}
        </span>
        <div className="min-w-0">
          <p className="text-xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            {stat.value}
          </p>
          <p className="mt-1.5 truncate text-[12px] font-medium text-slate-500 dark:text-slate-400">
            {stat.label}
          </p>
        </div>
      </div>

      <span
        className="mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
        style={{ backgroundColor: `${stat.tint}14`, color: stat.tint }}
      >
        <TrendingUp className="h-3 w-3" aria-hidden="true" />
        {stat.trendLabel}
      </span>

      <svg viewBox="0 0 200 64" className="mt-4 h-16 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`fh-stat-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stat.tint} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stat.tint} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={statAreaPath(stat.sparkline, 64)}
          fill={`url(#fh-stat-grad-${index})`}
          stroke="none"
          initial="hidden"
          animate="show"
          variants={areaVariants}
        />
        <motion.path
          d={stat.sparkline}
          fill="none"
          stroke={stat.tint}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="show"
          variants={lineVariants}
        />
      </svg>
    </motion.div>
  );
}

function LiveBadge() {
  return (
    <span className="absolute -top-4 right-6 z-20 hidden items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 sm:flex">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Live on 156 sites
    </span>
  );
}

export default function FeatureHero({
  breadcrumb,
  icon,
  eyebrow,
  title,
  description,
  primaryCta = { label: "Book a Demo", href: "/demo" },
  secondaryCta = { label: "See All Features", href: "/features" },
  screenshotSrc,
  screenshotAlt,
  screenshotNode,
  stats,
}: FeatureHeroProps) {
  const reduced = !!useReducedMotion();
  const screenshotVariants: Variants = reduced
    ? { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.98 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2, ease: EASE } },
      };

  return (
    <section
      aria-label={eyebrow}
      className="relative snap-start overflow-hidden bg-white pt-[126px] dark:bg-slate-950 md:pt-[130px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet/10 to-sky/10 blur-[140px]"
      />

      <div className="section-shell relative py-10 lg:py-16">
        <motion.div initial="hidden" animate="show" variants={fadeOnly(reduced, 0)}>
          <Breadcrumb segments={breadcrumb} />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:mt-10 lg:items-start lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span
              initial="hidden"
              animate="show"
              variants={fadeUp(reduced, 0.06)}
              className="inline-flex items-center gap-2 rounded-full bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet dark:bg-white/5 dark:text-sky"
            >
              {icon}
              {eyebrow}
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp(reduced, 0.12)}
              className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[2.85rem]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp(reduced, 0.18)}
              className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {description}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp(reduced, 0.24)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_28px_-8px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-rule bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            </motion.div>

            {stats && stats.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} index={i} reduced={reduced} />
                ))}
              </div>
            )}
          </div>

          {(screenshotNode || screenshotSrc) && (
            <div className="relative">
              <LiveBadge />
              {screenshotNode ? (
                <motion.div initial="hidden" animate="show" variants={screenshotVariants}>
                  {screenshotNode}
                </motion.div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={screenshotVariants}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-900"
                >
                  <Image
                    src={screenshotSrc as string}
                    alt={screenshotAlt ?? ""}
                    width={1280}
                    height={800}
                    className="h-auto w-full object-cover"
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
