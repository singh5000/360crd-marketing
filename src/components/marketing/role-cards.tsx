"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Section 7 of the reusable inner-page template — a static 4-up grid, one
 * card per role, showing how the same module scopes differently by who's
 * using it. Deliberately simple compared to the homepage's role switcher:
 * no tabs, no active state, just four always-visible cards. Each whole
 * card is a Link (not just the "Explore More" text) for a larger,
 * more forgiving click target — the card's own hover lift already reads
 * as "this is clickable," so restricting the hit area to the trailing
 * text link would undersell that affordance. Fully prop-driven like every
 * other section here, so a different module page reuses this with its
 * own role copy.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type RoleCard = {
  pill: string;
  icon: ReactNode;
  title: string;
  bullets: string[];
  linkHref: string;
};

export interface RoleCardsProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  roleCards: RoleCard[];
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
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease: EASE } },
  };
}

function RoleCardItem({ card, reduced, delay }: { card: RoleCard; reduced: boolean; delay: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants(reduced, delay)}
    >
      <Link
        href={card.linkHref}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 dark:border-white/10 dark:bg-slate-800 dark:shadow-[0_12px_32px_-24px_rgba(0,0,0,0.5)]"
      >
        <span className="w-fit rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet dark:bg-violet/15 dark:text-sky">
          {card.pill}
        </span>

        <span className="mt-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet dark:bg-violet/15 dark:text-sky [&_svg]:h-5 [&_svg]:w-5">
          {card.icon}
        </span>

        <h3 className="mt-4 text-[1.15rem] font-bold leading-snug text-slate-900 dark:text-white">
          {card.title}
        </h3>

        <div className="mt-4 border-t border-slate-200 dark:border-white/10" />

        <ul className="mt-4 space-y-2.5">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet dark:bg-sky" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>

        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-bold text-violet dark:text-sky">
          Explore More
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function RoleCards({ eyebrow, heading, subhead, roleCards }: RoleCardsProps) {
  const reduced = !!useReducedMotion();

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
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet dark:bg-violet/15 dark:text-sky">
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subhead}</p>
        </motion.div>

        <div className="mx-auto mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roleCards.map((card, i) => (
            <RoleCardItem key={card.title} card={card} reduced={reduced} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
