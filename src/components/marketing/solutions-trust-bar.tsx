"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Building2, Globe2, ShieldCheck, Users } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { icon: Users, value: "4", label: "Role-based views, one login" },
  { icon: Building2, value: "9", label: "Connected modules" },
  { icon: ShieldCheck, value: "100%", label: "Company & site data isolation" },
  { icon: Globe2, value: "ISO · OSHA", label: "45001, 14001 & OSHA-ready" },
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: EASE } },
  };
}

export default function SolutionsTrustBar() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Platform at a glance" className="relative border-y border-rule bg-slate-50 py-10 dark:bg-slate-900">
      <div className="section-shell grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp(reduced, i * 0.06)}
            className="flex flex-col items-center gap-2 text-center sm:border-l sm:border-rule sm:first:border-l-0"
          >
            <stat.icon className="h-5 w-5 text-violet dark:text-sky" aria-hidden="true" />
            <p className="text-2xl font-extrabold leading-none text-slate-900 dark:text-white">{stat.value}</p>
            <p className="max-w-[160px] text-xs leading-snug text-slate-500 dark:text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
