"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  Recycle,
  GraduationCap,
  Check,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Coded placeholder for the real Superadmin dashboard screenshot. Deliberately
 * NOT a literal screenshot-in-a-browser-frame — instead six small, independently
 * floating "premium bento" cards pulled from real product data (safety score,
 * incident/waste/training trends, a multi-site heatmap, compliance badges).
 * Swap for real product data / a real export once available; keep the
 * role="img" aria-label below as the accessible description.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const SITE_STATUS: Record<"healthy" | "attention" | "audit", string> = {
  healthy: "#34d399",
  attention: "#f59e0b",
  audit: "#2563eb",
};

const SITES: Array<keyof typeof SITE_STATUS> = [
  "healthy", "healthy", "healthy", "attention", "healthy", "healthy",
  "audit", "healthy", "healthy", "attention", "healthy", "healthy",
  "healthy", "healthy", "attention", "healthy", "audit", "healthy",
  "healthy", "healthy", "healthy", "attention", "healthy", "healthy",
];

const SITE_COUNTS = { healthy: 18, attention: 4, audit: 2 };

const STATS = [
  {
    id: "incidents",
    label: "Open incidents",
    value: "12",
    icon: AlertTriangle,
    color: "#f59e0b",
    deltaLabel: "8% fewer vs last month",
    deltaDown: true,
    line: "M0,18 L28,26 L57,22 L85,36 L114,30 L142,44 L171,38 L200,50",
  },
  {
    id: "waste",
    label: "Waste logged (QR)",
    value: "1,204",
    icon: Recycle,
    color: "#38bdf8",
    deltaLabel: "14% more vs last month",
    deltaDown: false,
    line: "M0,50 L28,42 L57,46 L85,32 L114,36 L142,20 L171,24 L200,8",
  },
  {
    id: "training",
    label: "Training compliance",
    value: "94%",
    icon: GraduationCap,
    color: "#34d399",
    deltaLabel: "3 pts up vs last month",
    deltaDown: false,
    line: "M0,44 L28,38 L57,40 L85,28 L114,30 L142,18 L171,20 L200,10",
  },
];

const COMPLIANCE_BADGES = [
  { label: "ISO 45001", meta: "Certified · valid" },
  { label: "ISO 14001", meta: "Certified · valid" },
  { label: "OSHA-aligned", meta: "Audit-ready" },
];

const CARD_CLASS =
  "rounded-2xl border border-rule bg-white/90 backdrop-blur-xl shadow-[0_20px_45px_-20px_rgba(15,23,42,0.25)] dark:bg-slate-900/80 dark:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]";

function areaPath(line: string, height = 56) {
  return `${line} L200,${height} L0,${height} Z`;
}

function SafetyScoreCard() {
  return (
    <div className={cn(CARD_CLASS, "p-5 sm:p-6")}>
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Portfolio Safety Score
        </p>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-sky opacity-30 blur-lg" />
          <div
            className="relative h-20 w-20 rounded-full p-[3px] sm:h-24 sm:w-24"
            style={{
              background:
                "conic-gradient(from -90deg, #2563eb 0deg, #38bdf8 345deg, rgba(15,23,42,0.08) 345deg 360deg)",
            }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
              <span className="text-2xl font-extrabold leading-none text-slate-900 dark:text-white">
                96
              </span>
              <span className="text-[8px] text-slate-400">/ 100</span>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-emerald-500">+4 pts</p>
          <p className="text-[10px] text-slate-400">this quarter</p>
        </div>
      </div>

      <svg viewBox="0 0 200 44" className="mt-4 h-11 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="safety-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="safety-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path
          d={areaPath("M0,34 L28,30 L57,32 L85,20 L114,22 L142,12 L171,14 L200,4", 44)}
          fill="url(#safety-area)"
          stroke="none"
        />
        <path
          d="M0,34 L28,30 L57,32 L85,20 L114,22 L142,12 L171,14 L200,4"
          fill="none"
          stroke="url(#safety-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-400 dark:border-white/5">
        <span>Incidents −8%</span>
        <span>Training +3%</span>
        <span>PPE 100%</span>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const TrendIcon = stat.deltaDown ? TrendingDown : TrendingUp;
  return (
    <div className={cn(CARD_CLASS, "p-5 sm:p-6")}>
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
        >
          <stat.icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
      </div>

      <p className="mt-4 text-2xl font-bold leading-none text-slate-900 dark:text-white sm:text-[28px]">
        {stat.value}
      </p>
      <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">{stat.label}</p>

      <svg viewBox="0 0 200 56" className="mt-3 h-14 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stat.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stat.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath(stat.line)} fill={`url(#grad-${stat.id})`} stroke="none" />
        <path
          d={stat.line}
          fill="none"
          stroke={stat.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-3 text-[10px] font-medium dark:border-white/5"
        style={{ color: stat.deltaDown ? "#10b981" : stat.color }}
      >
        <TrendIcon className="h-3 w-3" />
        {stat.deltaLabel}
      </div>
    </div>
  );
}

function SiteStatusCard() {
  return (
    <div className={cn(CARD_CLASS, "p-5 sm:p-6")}>
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          24 active sites
        </p>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
      </div>

      <div className="mt-4 grid grid-cols-8 gap-1.5">
        {SITES.map((status, i) => (
          <span
            key={i}
            className="aspect-square rounded-[4px]"
            style={{ backgroundColor: SITE_STATUS[status] }}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-slate-100 pt-3 text-[10px] text-slate-500 dark:border-white/5 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-[2px] bg-emerald-400" />
          {SITE_COUNTS.healthy} healthy
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-[2px] bg-amber-400" />
          {SITE_COUNTS.attention} attention
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-[2px] bg-violet" />
          {SITE_COUNTS.audit} audit due
        </span>
      </div>
    </div>
  );
}

function ComplianceCard() {
  return (
    <div className={cn(CARD_CLASS, "p-5 sm:p-6")}>
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Audit-ready
        </p>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
      </div>

      <div className="mt-4 flex flex-col divide-y divide-slate-100 dark:divide-white/5">
        {COMPLIANCE_BADGES.map((badge) => (
          <div key={badge.label} className="flex items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <Check className="h-3 w-3 text-emerald-500" />
              </span>
              {badge.label}
            </span>
            <span className="shrink-0 text-[10px] text-slate-400">{badge.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const prefersReducedMotion = useReducedMotion();

  const columns = [
    {
      offsetClass: "sm:pt-0",
      cards: [<SafetyScoreCard key="safety" />, <StatCard key="training" stat={STATS[2]} />],
    },
    {
      offsetClass: "sm:pt-10",
      cards: [<StatCard key="incidents" stat={STATS[0]} />, <SiteStatusCard key="sites" />],
    },
    {
      offsetClass: "sm:pt-4",
      cards: [<StatCard key="waste" stat={STATS[1]} />, <ComplianceCard key="compliance" />],
    },
  ];

  let cardIndex = 0;

  const entranceVariants = (i: number): Variants =>
    prefersReducedMotion
      ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
      : {
          hidden: { opacity: 0, y: 20, scale: 0.94 },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE },
          },
        };

  return (
    <div
      role="img"
      aria-label="360crd Superadmin dashboard shown as six floating cards: portfolio safety score, open incidents, waste logged, training compliance, a multi-site status heatmap, and ISO/OSHA compliance readiness"
      className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-7"
    >
      {columns.map((col, colI) => (
        <div key={colI} className={cn("flex flex-col gap-5 sm:gap-7", col.offsetClass)}>
          {col.cards.map((card) => {
            const i = cardIndex++;
            const floatDuration = 4.2 + i * 0.5;
            const floatDelay = i * 0.35;
            return (
              <motion.div
                key={i}
                aria-hidden="true"
                initial="hidden"
                animate="show"
                variants={entranceVariants(i)}
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { y: [0, -10, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: floatDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: floatDelay,
                        }
                  }
                >
                  {card}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
