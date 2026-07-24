"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  GraduationCap,
  HardHat,
  Shield,
  ShieldCheck,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Solutions Hub hero — deliberately NOT the shared FeatureHero used across
 * /features/*. The right side is a layered collage of three "app window"
 * cards (role picker behind, a sites table in front, a small stat widget
 * peeking out the corner) rather than one literal screenshot — closer to
 * how competitor hero sections layer several product views at once. The
 * collage container has no max-width cap and isn't centered within its
 * grid column (previously `mx-auto max-w-sm`), because capping+centering
 * a narrow visual inside a much wider column is exactly what read as "a
 * big empty gap in the middle of the screen" — the text column filled its
 * track, the visual didn't fill its own, leaving dead space between them
 * that no `gap-*` value could fix.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const SITES_ROWS = [
  { name: "Riverside Tower", status: "Active", tone: "#10b981" },
  { name: "Harbor Yard", status: "Active", tone: "#10b981" },
  { name: "Elm Street Site", status: "Provisioning", tone: "#0ea5e9" },
];

const ROLE_ROWS = [
  { icon: ShieldCheck, label: "Safety & EHS Director", selected: true },
  { icon: Building2, label: "Site & Operations Manager", selected: false },
  { icon: HardHat, label: "Field Supervisor & Crew", selected: false },
];

type FloatingChip = { icon: LucideIcon; color: string; top: string; left: string; size: number; duration: number };

const FLOATING_CHIPS: FloatingChip[] = [
  { icon: AlertTriangle, color: "#f43f5e", top: "4%", left: "38%", size: 44, duration: 5.5 },
  { icon: ClipboardCheck, color: "#f59e0b", top: "8%", left: "88%", size: 40, duration: 6.5 },
  { icon: GraduationCap, color: "#7e14ff", top: "58%", left: "92%", size: 44, duration: 6 },
  { icon: Shield, color: "#6366f1", top: "88%", left: "62%", size: 40, duration: 5 },
  { icon: Trash2, color: "#0ea5e9", top: "72%", left: "0%", size: 40, duration: 7 },
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
  };
}

export default function SolutionsHero() {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label="Solutions overview"
      className="relative overflow-hidden bg-white pb-16 pt-[150px] dark:bg-slate-950 sm:pb-24 sm:pt-[160px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
          color: "var(--foreground)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[960px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet/25 to-sky/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-sky/20 blur-[120px]"
      />

      <div className="section-shell relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-6">
        <div className="text-center lg:text-left">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp(reduced, 0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-rule bg-slate-900/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet backdrop-blur-sm dark:bg-white/5 dark:text-sky"
          >
            Solutions
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp(reduced, 0.08)}
            className="mx-auto max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-[3.4rem] lg:mx-0"
          >
            One platform.{" "}
            <span className="bg-gradient-to-r from-violet to-sky bg-clip-text text-transparent">
              Three ways to run it.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp(reduced, 0.16)}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0"
          >
            Whether you set the safety strategy, run the sites day to day, or
            work the crew — 360crd gives you the exact view your job needs,
            instead of four disconnected tools and a spreadsheet holding it
            all together.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp(reduced, 0.24)}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-violet px-6 py-3.5 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_32px_-8px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#audience"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-rule bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Find Your Solution
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp(reduced, 0.32)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 lg:justify-start"
          >
            {["Safety & EHS Directors", "Site & Operations Managers", "Field Supervisors & Crews"].map(
              (label) => (
                <a key={label} href="#audience" className="underline-offset-4 hover:text-violet hover:underline dark:hover:text-sky">
                  {label}
                </a>
              )
            )}
          </motion.div>
        </div>

        <div className="relative h-[380px] w-full sm:h-[440px] lg:h-[480px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet/20 via-sky/15 to-transparent blur-3xl"
          />

          {!reduced &&
            FLOATING_CHIPS.map((chip, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute z-0 flex items-center justify-center rounded-full bg-white shadow-[0_16px_32px_-16px_rgba(15,23,42,0.3)] ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10"
                style={{ top: chip.top, left: chip.left, width: chip.size, height: chip.size, color: chip.color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: [0, -12, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 + i * 0.08 },
                  y: { duration: chip.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                }}
              >
                <chip.icon className="h-1/2 w-1/2" aria-hidden="true" />
              </motion.span>
            ))}

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -5, transition: { duration: 0.6, delay: 0.3, ease: EASE } }}
            className="absolute left-0 top-2 z-10 w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.5)] sm:w-64 lg:left-[2%]"
          >
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-violet to-sky px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="ml-1 text-xs font-semibold text-white">Pick your role</span>
            </div>
            <div className="space-y-2 p-4">
              {ROLE_ROWS.map((role) => (
                <div
                  key={role.label}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium",
                    role.selected ? "bg-white/10 text-white" : "text-slate-400"
                  )}
                >
                  <role.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{role.label}</span>
                  {role.selected && <Check className="h-3.5 w-3.5 shrink-0 text-sky" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.42, ease: EASE } }}
            className="absolute right-0 top-16 z-20 w-[19rem] overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_50px_100px_-30px_rgba(15,23,42,0.4)] dark:bg-slate-900 sm:w-80 lg:right-[4%] lg:top-20 lg:w-[22rem]"
          >
            <div className="flex items-center gap-2 border-b border-rule px-5 py-3.5 dark:border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Sites Overview</span>
            </div>
            <div className="space-y-2.5 p-5">
              {SITES_ROWS.map((site) => (
                <div key={site.name} className="flex items-center justify-between gap-3 rounded-lg border border-rule px-3 py-2.5 dark:border-white/10">
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{site.name}</span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{ backgroundColor: `${site.tone}1f`, color: site.tone }}
                  >
                    {site.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.58, ease: EASE } }}
            className="absolute bottom-2 left-8 z-30 w-48 rounded-2xl border border-rule bg-white p-4 shadow-[0_30px_60px_-20px_rgba(37,99,235,0.35)] dark:bg-slate-900 sm:left-16 lg:left-[10%]"
          >
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Compliance Score</p>
            <p className="mt-1 text-3xl font-extrabold leading-none text-slate-900 dark:text-white">92%</p>
            <div className="mt-3 flex items-end gap-1">
              {[60, 80, 55, 90, 70, 95].map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-sm bg-gradient-to-t from-violet to-sky"
                  style={{ height: `${h * 0.28}px` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
