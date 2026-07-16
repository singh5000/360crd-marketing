"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Shield,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AppShellFrame, AppSidebar, AppTopBar } from "./app-shell-chrome";

/**
 * Literal recreation of the real 360crd Superadmin dashboard (top bar,
 * sidebar nav, stat cards, quick actions, detail cards) rather than a
 * stylized bento mock — matched 1:1 to the live app's light theme so the
 * Hero graphic doubles as an honest product screenshot. Deliberately
 * light-only (no dark: variants): it's a fixed product screenshot, not a
 * themed site element, so it doesn't flip with the site's theme toggle.
 * Shares its top bar/sidebar chrome with every other app-shell preview via
 * app-shell-chrome.tsx.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const STAT_CARDS: { label: string; value: string; icon: LucideIcon; tint: string }[] = [
  { label: "Total Users", value: "0", icon: Users, tint: "#2563eb" },
  { label: "Sites", value: "4", icon: MapPin, tint: "#10b981" },
  { label: "Companies", value: "0", icon: Building2, tint: "#7c3aed" },
  { label: "Active Trainings", value: "0", icon: GraduationCap, tint: "#2563eb" },
];

const QUICK_ACTIONS: { title: string; sub: string; icon: LucideIcon; tint: string }[] = [
  { title: "Manage Users", sub: "Create, assign roles and permissions", icon: Users, tint: "#2563eb" },
  { title: "View Trainings", sub: "Monitor staff progress", icon: GraduationCap, tint: "#0ea5e9" },
  { title: "Companies", sub: "Manage customer organizations", icon: Building2, tint: "#2563eb" },
  { title: "Incidents Overview", sub: "Platform-wide incident visibility", icon: Shield, tint: "#2563eb" },
  { title: "Audit Overview", sub: "Platform-wide audit status", icon: ClipboardCheck, tint: "#2563eb" },
  { title: "Waste Reports", sub: "Track environmental reports", icon: Trash2, tint: "#2563eb" },
];

const DETAIL_CARDS: { title: string; rows: { label: string; value: string; tone?: string }[] }[] = [
  {
    title: "Audit Compliance",
    rows: [
      { label: "Total Templates", value: "0" },
      { label: "Active Templates", value: "0", tone: "#10b981" },
      { label: "Drafts", value: "0" },
    ],
  },
  {
    title: "Training Progress",
    rows: [
      { label: "Total Trainings", value: "0" },
      { label: "Active", value: "0", tone: "#2563eb" },
      { label: "Completions", value: "0" },
    ],
  },
  {
    title: "Outstanding Actions",
    rows: [
      { label: "Open Incidents", value: "0", tone: "#e11d48" },
      { label: "Open Waste Reports", value: "0", tone: "#f59e0b" },
      { label: "Active Inductions", value: "0" },
    ],
  },
];

function StatCard({ stat }: { stat: (typeof STAT_CARDS)[number] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm @sm:p-4">
      <div className="flex items-start justify-between">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${stat.tint}18`, color: stat.tint }}
        >
          <stat.icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
      </div>
      <p className="mt-3 text-xl font-extrabold leading-none text-slate-900 @sm:text-2xl">
        {stat.value}
      </p>
      <p className="mt-1.5 truncate text-[10px] text-slate-500 @sm:text-[11px]">{stat.label}</p>
    </div>
  );
}

function QuickActionCard({ action }: { action: (typeof QUICK_ACTIONS)[number] }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm @sm:p-4">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${action.tint}18`, color: action.tint }}
      >
        <action.icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-slate-900">{action.title}</p>
        <p className="truncate text-[10px] text-slate-500">{action.sub}</p>
      </div>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />
    </div>
  );
}

function DetailCard({ card }: { card: (typeof DETAIL_CARDS)[number] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm @sm:p-4">
      <p className="text-xs font-semibold text-slate-900">{card.title}</p>
      <div className="mt-2.5 divide-y divide-slate-100">
        {card.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-1.5 text-[11px] first:pt-0 last:pb-0"
          >
            <span className="text-slate-500">{row.label}</span>
            <span className="font-semibold" style={{ color: row.tone ?? "#0f172a" }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const prefersReducedMotion = useReducedMotion();

  const panelVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.15, ease: EASE } },
      };

  return (
    <motion.div
      role="img"
      aria-label="360crd Superadmin dashboard: sidebar navigation, platform overview stat cards for total users, sites, companies and active trainings, quick actions, and audit, training and outstanding-action summaries"
      initial="hidden"
      animate="show"
      variants={panelVariants}
      className="mx-auto w-full max-w-5xl lg:mx-0 lg:max-w-none"
    >
      <AppShellFrame tilt>
        <div className="flex flex-col">
          <AppTopBar />
          <div className="flex">
            <AppSidebar activeLabel="Dashboard" />
            <div className="min-w-0 flex-1 bg-slate-50 p-3.5 @sm:p-6">
              <p className="text-[11px] font-medium text-slate-500 @sm:text-xs">
                Welcome back, johnsmith
              </p>
              <h3 className="mt-0.5 text-base font-extrabold text-slate-900 @sm:text-2xl">
                Platform Overview
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 @sm:text-sm">
                Enterprise-wide visibility across all sites and operations.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5 @lg:mt-6 @lg:grid-cols-4 @lg:gap-4">
                {STAT_CARDS.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>

              <div className="mt-2.5 grid grid-cols-1 gap-2.5 @lg:mt-4 @lg:grid-cols-3 @lg:gap-4">
                {QUICK_ACTIONS.map((action) => (
                  <QuickActionCard key={action.title} action={action} />
                ))}
              </div>

              <div className="mt-2.5 grid grid-cols-1 gap-2.5 @lg:mt-4 @lg:grid-cols-3 @lg:gap-4">
                {DETAIL_CARDS.map((card) => (
                  <DetailCard key={card.title} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppShellFrame>
    </motion.div>
  );
}
