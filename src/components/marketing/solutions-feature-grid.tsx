"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Building2, ClipboardCheck, History, ShieldCheck, Users, Zap } from "lucide-react";

/**
 * Flat, minimal feature grid — no card borders or shadows, just generous
 * whitespace and underlined titles, distinct from the bordered-card grids
 * used across /features/*.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "One Secure Login",
    description: "Role-based access means everyone only sees what their job requires — enforced on every request.",
  },
  {
    icon: History,
    title: "One Shared Data Layer",
    description: "Every report, audit, and approval updates the same live record, in real time.",
  },
  {
    icon: Users,
    title: "Four Role-Based Views",
    description: "Superadmin, Manager, Staff, and Field Worker — tailored dashboards, not one-size-fits-all.",
  },
  {
    icon: Building2,
    title: "Multi-Site & Company Structure",
    description: "Add a company or site in minutes, scoped and isolated automatically from day one.",
  },
  {
    icon: ClipboardCheck,
    title: "ISO / OSHA-Ready Audit Trail",
    description: "Every action timestamped and structured the way an auditor expects to see it.",
  },
  {
    icon: Zap,
    title: "Real-Time Everywhere",
    description: "Changes made in the field reflect instantly across every dashboard, no refresh needed.",
  },
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: EASE } },
  };
}

export default function SolutionsFeatureGrid() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Platform capabilities" className="relative bg-slate-50 py-20 dark:bg-slate-900 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            One Platform
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything every role needs, already connected.
          </h2>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp(reduced, (i % 3) * 0.08)}
            >
              <feature.icon className="h-7 w-7 text-violet dark:text-sky" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 underline decoration-violet/30 decoration-2 underline-offset-4 dark:text-white dark:decoration-sky/40">
                {feature.title}
              </h3>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
