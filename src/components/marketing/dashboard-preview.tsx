"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  Box,
  Building2,
  ChevronDown,
  ChevronLeft,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HardHat,
  LayoutDashboard,
  LogOut,
  MapPin,
  Moon,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Literal recreation of the real 360crd Superadmin dashboard (top bar,
 * sidebar nav, stat cards, quick actions, detail cards) rather than a
 * stylized bento mock — matched 1:1 to the live app's light theme so the
 * Hero graphic doubles as an honest product screenshot. Deliberately
 * light-only (no dark: variants): it's a fixed product screenshot, not a
 * themed site element, so it doesn't flip with the site's theme toggle.
 * Sidebar collapses on mobile, matching how the real app behaves at that
 * width.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type SidebarItem = { label: string; icon: LucideIcon; active?: boolean };
type SidebarGroup = { heading: string; items: SidebarItem[] };

const SIDEBAR_GROUPS: SidebarGroup[] = [
  { heading: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, active: true }] },
  { heading: "Super Admin", items: [{ label: "Companies", icon: Building2 }] },
  {
    heading: "Platform",
    items: [
      { label: "Sites", icon: MapPin },
      { label: "Users", icon: Users },
    ],
  },
  {
    heading: "Operations View",
    items: [
      { label: "Incidents", icon: ShieldAlert },
      { label: "Audits", icon: ClipboardCheck },
      { label: "Training", icon: GraduationCap },
      { label: "Inductions", icon: FileText },
      { label: "PPE", icon: HardHat },
      { label: "Assets", icon: Box },
      { label: "Waste", icon: Trash2 },
    ],
  },
  { heading: "System", items: [{ label: "Settings", icon: Settings }] },
];

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

function TopBar() {
  return (
    <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-slate-200 bg-white px-3 @sm:h-14 @sm:px-5">
      <ChevronLeft className="hidden h-4 w-4 shrink-0 text-slate-300 @sm:block" aria-hidden="true" />
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 @sm:h-7 @sm:w-7">
        <ShieldCheck className="h-3.5 w-3.5 text-white @sm:h-4 @sm:w-4" strokeWidth={2.25} />
      </span>
      <span className="shrink-0 text-xs font-extrabold tracking-tight text-slate-900 @sm:text-sm">
        360CRD
      </span>

      <div className="ml-2 hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-400 @lg:flex @lg:max-w-xs">
        <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate text-xs">Search modules...</span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2 @sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 @lg:flex">
          Urban Spark Media
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </span>
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full text-slate-400">
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
          JO
        </span>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="hidden w-44 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-3 @lg:flex @2xl:w-52">
      <div>
        {SIDEBAR_GROUPS.map((group) => (
          <div key={group.heading} className="mt-4 first:mt-0">
            <p className="mb-1.5 px-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 @2xl:text-[10px]">
              {group.heading}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <div key={item.label} className="relative">
                  {item.active && (
                    <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-600" />
                  )}
                  <div
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium @2xl:text-xs",
                      item.active ? "bg-blue-50 text-blue-600" : "text-slate-500"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                    {item.label === "Settings" && (
                      <ChevronDown className="ml-auto h-3 w-3 shrink-0" aria-hidden="true" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-3">
        <div className="flex items-center gap-2 px-1">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
            J
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">johnsmith</p>
            <p className="truncate text-[9px] text-slate-400">john@gmail.com</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 rounded-full bg-slate-100 p-1 text-[9px] font-medium text-slate-500">
          <span className="flex flex-1 items-center justify-center gap-1 rounded-full bg-white py-1 text-slate-900 shadow-sm">
            <Sun className="h-2.5 w-2.5" aria-hidden="true" />
            Light
          </span>
          <span className="flex flex-1 items-center justify-center gap-1 rounded-full py-1">
            <Moon className="h-2.5 w-2.5" aria-hidden="true" />
            Dark
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 px-1 text-[11px] text-slate-400">
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign out
        </div>
      </div>
    </div>
  );
}

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
    <div className="@container mx-auto w-full max-w-5xl [perspective:1800px]">
      <div className="lg:[transform:rotateY(-11deg)_rotateX(5deg)]">
        <motion.div
          role="img"
          aria-label="360crd Superadmin dashboard: sidebar navigation, platform overview stat cards for total users, sites, companies and active trainings, quick actions, and audit, training and outstanding-action summaries"
          initial="hidden"
          animate="show"
          variants={panelVariants}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35)] lg:shadow-[0_70px_140px_-40px_rgba(15,23,42,0.5)]"
        >
          <div aria-hidden="true" className="flex flex-col">
            <TopBar />
            <div className="flex">
              <Sidebar />
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
        </motion.div>
      </div>
    </div>
  );
}
