"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "65%", label: "Faster incident resolution", featured: true },
  { value: "100%", label: "Audit trail coverage, every module" },
  { value: "<5 min", label: "To provision a new site" },
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

export default function SolutionsStats() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Results at a glance" className="relative bg-slate-50 py-16 dark:bg-slate-900 sm:py-20">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(reduced, i * 0.1)}
              className={cn(
                "rounded-2xl p-8",
                stat.featured
                  ? "bg-slate-950 text-white shadow-[0_24px_54px_-20px_rgba(15,23,42,0.5)]"
                  : "border border-rule bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
              )}
            >
              <p className="text-4xl font-extrabold leading-none tracking-tight">{stat.value}</p>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  stat.featured ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
                )}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
