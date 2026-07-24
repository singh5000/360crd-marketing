"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS: {
  icon: LucideIcon;
  value: string;
  label: string;
  caption: string;
  color: string;
  featured?: boolean;
}[] = [
  {
    icon: TrendingUp,
    value: "65%",
    label: "Faster incident resolution",
    caption: "vs. phone calls and group chats",
    color: "#38bdf8",
    featured: true,
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Audit trail coverage",
    caption: "Every module, no exceptions",
    color: "#10b981",
  },
  {
    icon: Zap,
    value: "<5 min",
    label: "To provision a new site",
    caption: "From request to fully live",
    color: "#f59e0b",
  },
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

export default function SolutionsStats() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Results at a glance" className="relative bg-slate-50 py-20 dark:bg-slate-900 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            By The Numbers
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Results that show up in the first month.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, i * 0.1)}
              className={cn(
                "relative overflow-hidden rounded-3xl p-8",
                stat.featured
                  ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_40px_80px_-28px_rgba(37,99,235,0.5)]"
                  : "border border-rule bg-white text-slate-900 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-slate-800 dark:text-white"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
                style={{ backgroundColor: `${stat.color}33` }}
              />

              <span
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: stat.featured ? `${stat.color}26` : `${stat.color}1a`, color: stat.color }}
              >
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </span>

              <p className="relative mt-6 text-5xl font-extrabold leading-none tracking-tight">{stat.value}</p>
              <p
                className={cn(
                  "relative mt-3 text-base font-semibold leading-snug",
                  stat.featured ? "text-white" : "text-slate-800 dark:text-white"
                )}
              >
                {stat.label}
              </p>
              <p
                className={cn(
                  "relative mt-1.5 text-sm leading-relaxed",
                  stat.featured ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                )}
              >
                {stat.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
