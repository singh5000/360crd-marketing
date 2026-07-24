"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Building2,
  Check,
  ClipboardCheck,
  FileText,
  GraduationCap,
  KeyRound,
  Shield,
  Trash2,
  type LucideIcon,
} from "lucide-react";

/**
 * Ecosystem section — restructured to match the two-column "text + orbit"
 * composition of the Workstatus "Built to Fit Your Existing Stack"
 * reference (checklist + CTA on one side, a circular diagram with a
 * floating stat card and scattered particle dots on the other), with our
 * own brand colors and real module content instead of their integrations
 * list and fabricated review-platform ratings. Orbit math is still plain
 * trigonometry (percent-based left/top), not SVG.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Module = { icon: LucideIcon; label: string; color: string; href: string };

const MODULES: Module[] = [
  { icon: AlertTriangle, label: "Incidents", color: "#f43f5e", href: "/features/incidents" },
  { icon: ClipboardCheck, label: "Audits", color: "#f59e0b", href: "/features/audits" },
  { icon: GraduationCap, label: "Training", color: "#7e14ff", href: "/features/training" },
  { icon: FileText, label: "Inductions", color: "#10b981", href: "/features/inductions" },
  { icon: Shield, label: "PPE", color: "#6366f1", href: "/features/ppe" },
  { icon: Box, label: "Assets", color: "#0d9488", href: "/features/assets" },
  { icon: Trash2, label: "Waste", color: "#0ea5e9", href: "/features/waste-management" },
  { icon: Building2, label: "Multi-Site", color: "#c026d3", href: "/features/multi-site" },
  { icon: KeyRound, label: "Roles", color: "#0891b2", href: "/features/roles-permissions" },
];

const PARTICLES = [
  { top: "6%", left: "20%" },
  { top: "14%", left: "94%" },
  { top: "62%", left: "2%" },
  { top: "88%", left: "88%" },
  { top: "40%", left: "98%" },
];

const RADIUS = 40;

function orbitPosition(index: number, total: number) {
  const rad = (-90 + (360 / total) * index) * (Math.PI / 180);
  return {
    left: `${50 + RADIUS * Math.cos(rad)}%`,
    top: `${50 + RADIUS * Math.sin(rad)}%`,
  };
}

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function badgeVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay, ease: EASE } },
  };
}

export default function SolutionsEcosystem() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Connected platform ecosystem" className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900 sm:py-24">
      <div className="section-shell">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(reduced, 0)}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
              One Connected Ecosystem
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Nine modules. One login. Zero re-keying.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Every module already talks to every other one — an incident can
              flag a PPE gap, an audit can draw on training records, without
              anyone copying data between tools.
            </p>

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.25)] dark:bg-slate-800">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                {MODULES.map((mod) => (
                  <div key={mod.label} className="flex items-center gap-2.5">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${mod.color}1f`, color: mod.color }}
                    >
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{mod.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/features"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-violet px-6 py-3.5 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_32px_-8px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Explore All Modules
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Desktop: circular orbit with scattered particles, stretched to
              the FULL width of its grid column (no max-width cap, no
              centering wrapper) — a capped, centered orbit inside a wider
              column leaves equal dead space on both of ITS sides, which
              reads as "empty on the right" once you add the section's own
              right-edge padding on top of that. Filling the column outright
              is what actually gives left and right the same margin from
              the screen edge. */}
          <div className="hidden lg:block">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(reduced, 0.1)}
              className="relative ml-auto aspect-square w-3/4"
            >
              <div
                aria-hidden="true"
                className="absolute inset-[10%] rounded-full bg-gradient-to-br from-violet/10 via-sky/10 to-transparent blur-3xl"
              />

              {!reduced && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[26%] rounded-full bg-gradient-to-br from-violet/25 to-sky/25 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.15, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="absolute h-2 w-2 rounded-full bg-violet/40 dark:bg-sky/40"
                  style={{ top: p.top, left: p.left }}
                  animate={reduced ? undefined : { opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
                  transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />
              ))}

              <motion.div
                aria-hidden="true"
                className="absolute inset-[6%] rounded-full border border-dashed border-violet/20 dark:border-sky/15"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-[16%] rounded-full border border-dashed border-violet/15 dark:border-sky/10"
                animate={reduced ? undefined : { rotate: -360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              />

              <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet to-sky text-white shadow-[0_30px_64px_-16px_rgba(37,99,235,0.55)] xl:h-40 xl:w-40">
                <span className="text-2xl font-extrabold tracking-tight xl:text-3xl">360°</span>
              </div>

              {MODULES.map((mod, i) => {
                const pos = orbitPosition(i, MODULES.length);
                return (
                  <motion.div
                    key={mod.label}
                    variants={badgeVariants(reduced, 0.15 + i * 0.05)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={pos}
                  >
                    <motion.div
                      animate={reduced ? undefined : { y: [0, -9, 0] }}
                      transition={{
                        duration: 3.5 + (i % 3) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.25,
                      }}
                    >
                      <Link href={mod.href} className="group flex flex-col items-center gap-2 focus-visible:outline-none">
                        <span
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_16px_32px_-14px_rgba(15,23,42,0.3)] ring-1 ring-slate-900/5 transition-transform duration-200 group-hover:scale-110 dark:bg-slate-800 dark:ring-white/10 xl:h-20 xl:w-20"
                          style={{ color: mod.color }}
                        >
                          <mod.icon className="h-7 w-7 xl:h-8 xl:w-8" aria-hidden="true" />
                        </span>
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-600 backdrop-blur-sm dark:bg-slate-900/80 dark:text-slate-300 xl:text-sm">
                          {mod.label}
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Tablet + mobile: simple icon grid, orbit geometry doesn't translate */}
        <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 lg:hidden">
          {MODULES.map((mod) => (
            <Link
              key={mod.label}
              href={mod.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-rule bg-white p-4 dark:bg-slate-800"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${mod.color}1f`, color: mod.color }}
              >
                <mod.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{mod.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
