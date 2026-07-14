"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Bell,
  Building2,
  ChevronDown,
  CircleCheck,
  ClipboardCheck,
  Database,
  EllipsisVertical,
  GraduationCap,
  History,
  LayoutDashboard,
  Lock,
  MapPin,
  Recycle,
  Search,
  Settings,
  ShieldCheck,
  TriangleAlert,
  UserCog,
  UserPlus,
  Users,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 4 — "One platform, four views". Interactive role switcher: tabs
 * swap the left checklist + the dashboard mock's welcome/stats to show what
 * each role actually sees. Full-width via section-shell like Section 3.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type RoleStat = { label: string; value: string; delta: string; positive: boolean };

type Role = {
  key: string;
  label: string;
  heading: string;
  checks: string[];
  welcome: string;
  subtitle: string;
  initials: string;
  stats: RoleStat[];
};

const ROLES: Role[] = [
  {
    key: "superadmin",
    label: "Superadmin",
    heading: "Full visibility across every company, site and crew.",
    checks: [
      "Multi-company management",
      "Global RBAC permission editor",
      "Platform-wide compliance rollup",
    ],
    welcome: "Welcome back, Superadmin",
    subtitle: "Here's what's happening across your entire portfolio.",
    initials: "SA",
    stats: [
      { label: "Total Companies", value: "24", delta: "+2 this month", positive: true },
      { label: "Total Sites", value: "156", delta: "+8 this month", positive: true },
      { label: "Active Incidents", value: "37", delta: "−6 this week", positive: true },
      { label: "Compliance Score", value: "92%", delta: "+5% this month", positive: true },
    ],
  },
  {
    key: "manager",
    label: "Manager",
    heading: "Your sites, your crews, your open actions — nothing else.",
    checks: [
      "Site-level incident queue",
      "Crew training & inductions",
      "Waste report approvals",
    ],
    welcome: "Welcome back, Manager",
    subtitle: "Here's what's happening across your sites.",
    initials: "MG",
    stats: [
      { label: "My Sites", value: "8", delta: "+1 this month", positive: true },
      { label: "Open Incidents", value: "5", delta: "−2 this week", positive: true },
      { label: "Crew On Site", value: "46", delta: "+4 today", positive: true },
      { label: "Training Due", value: "12", delta: "this month", positive: false },
    ],
  },
  {
    key: "staff",
    label: "Staff",
    heading: "Your day's tasks, checks and logs in one queue.",
    checks: [
      "Assigned actions & follow-ups",
      "Toolbox talks & training",
      "PPE issue & return log",
    ],
    welcome: "Welcome back, Staff",
    subtitle: "Here's your queue for today.",
    initials: "ST",
    stats: [
      { label: "Open Tasks", value: "7", delta: "−3 today", positive: true },
      { label: "Inspections Due", value: "3", delta: "this week", positive: false },
      { label: "Training Progress", value: "82%", delta: "+6% this month", positive: true },
      { label: "PPE Assigned", value: "5", delta: "all verified", positive: true },
    ],
  },
  {
    key: "user",
    label: "User",
    heading: "Report an incident in five taps — photos first.",
    checks: [
      "Photo-first incident reporting",
      "QR-code waste logging",
      "Works offline on site",
    ],
    welcome: "Welcome back, Crew",
    subtitle: "Log something from the field.",
    initials: "FC",
    stats: [
      { label: "My Reports", value: "14", delta: "+2 this week", positive: true },
      { label: "Open Actions", value: "2", delta: "−1 today", positive: true },
      { label: "QR Scans", value: "31", delta: "this month", positive: true },
      { label: "Training Badges", value: "6", delta: "up to date", positive: true },
    ],
  },
];

const SIDEBAR_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Companies", icon: Building2 },
  { label: "Sites", icon: MapPin },
  { label: "Incidents", icon: TriangleAlert },
  { label: "Audits", icon: ClipboardCheck },
  { label: "Waste", icon: Recycle },
  { label: "Training", icon: GraduationCap },
  { label: "Users", icon: Users },
  { label: "Roles & Permissions", icon: UserCog },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
];

const DONUT_SEGMENTS = [
  { label: "Hazard", pct: 35, color: "#7e14ff" },
  { label: "Environment", pct: 28, color: "#47bfff" },
  { label: "Near Miss", pct: 20, color: "#34d399" },
  { label: "Injury", pct: 17, color: "#f59e0b" },
];

const COMPLIANCE_BARS = [
  { label: "ISO 45001", pct: 92 },
  { label: "ISO 14001", pct: 88 },
  { label: "OSHA", pct: 94 },
  { label: "Internal Audits", pct: 90 },
];

const ACTIVITIES = [
  { icon: ClipboardCheck, tone: "#34d399", text: "Site audit completed — Brisbane Airport", time: "2m ago" },
  { icon: TriangleAlert, tone: "#e11d48", text: "Incident escalated — Dubai Site", time: "12m ago" },
  { icon: UserPlus, tone: "#47bfff", text: "New user added — Site Manager", time: "45m ago" },
  { icon: Recycle, tone: "#f59e0b", text: "Waste approval — Sydney Project", time: "1h ago" },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "One Secure Login",
    desc: "Role-based access ensures users only see what they need.",
  },
  {
    icon: Database,
    title: "One Shared Data Layer",
    desc: "Every action updates the same live data in real time.",
  },
  {
    icon: Users,
    title: "Four Role Views",
    desc: "Tailored dashboards built for how each role actually works.",
  },
  {
    icon: History,
    title: "Real-time Everywhere",
    desc: "Changes made in the field reflect instantly across the platform.",
  },
];

const CHART_X_LABELS = ["May 14", "May 21", "May 28", "Jun 04", "Jun 11"];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function donutGradient() {
  let acc = 0;
  const stops = DONUT_SEGMENTS.map((s) => {
    const from = acc;
    acc += s.pct;
    return `${s.color} ${from}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function DashboardMock({ role, reduced }: { role: Role; reduced: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] dark:bg-slate-900 dark:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-rule bg-slate-50/80 px-4 py-2.5 dark:bg-white/[0.03]">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex flex-1 items-center justify-center" aria-hidden="true">
          <span className="flex items-center gap-1.5 rounded-md border border-rule bg-white px-4 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <Lock className="h-3 w-3" />
            app.crd360.com/dashboard
          </span>
        </div>
        <EllipsisVertical className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </div>

      <div aria-hidden="true" className="flex">
        {/* Sidebar */}
        <div className="hidden w-44 shrink-0 flex-col bg-slate-950 py-4 dark:bg-black/50 sm:flex">
          <p className="px-4 pb-4 text-sm font-extrabold tracking-tight text-white">
            CRD<span className="text-violet">360</span>
          </p>
          <div className="flex flex-col gap-0.5 px-2.5">
            {SIDEBAR_ITEMS.map((item, i) => (
              <span
                key={item.label}
                className={cn(
                  "flex items-center gap-2 truncate rounded-md px-2.5 py-[7px] text-[11px] font-medium",
                  i === 0 ? "bg-violet text-white" : "text-slate-400"
                )}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1 bg-slate-50/60 p-4 dark:bg-transparent sm:p-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={role.key}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {role.welcome}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {role.subtitle}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <Search className="h-4 w-4 text-slate-400" />
                  <span className="relative">
                    <Bell className="h-4 w-4 text-slate-400" />
                    <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-violet" />
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet to-sky text-[9px] font-bold text-white">
                    {role.initials}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {role.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-rule bg-white p-3 dark:bg-slate-800/60"
                  >
                    <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-xl font-extrabold leading-none text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 truncate text-[10px] font-medium",
                        stat.positive ? "text-emerald-500" : "text-amber-500"
                      )}
                    >
                      {stat.delta}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Charts row (static illustration) */}
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-lg border border-rule bg-white p-3.5 dark:bg-slate-800/60">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  Incident Overview
                </p>
                <span className="flex items-center gap-1 rounded-md border border-rule px-2 py-1 text-[9px] text-slate-500 dark:text-slate-400">
                  This Month
                  <ChevronDown className="h-2.5 w-2.5" />
                </span>
              </div>
              <svg viewBox="0 0 320 90" className="mt-2 h-24 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rv-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7e14ff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#7e14ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,60 C20,48 30,42 50,50 C70,58 80,68 100,62 C120,56 130,40 150,46 C170,52 180,64 200,58 C215,53 225,30 245,24 C265,18 275,34 295,42 L320,38 L320,90 L0,90 Z"
                  fill="url(#rv-area)"
                />
                <path
                  d="M0,60 C20,48 30,42 50,50 C70,58 80,68 100,62 C120,56 130,40 150,46 C170,52 180,64 200,58 C215,53 225,30 245,24 C265,18 275,34 295,42 L320,38"
                  fill="none"
                  stroke="#7e14ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-1.5 flex justify-between text-[9px] text-slate-400">
                {CHART_X_LABELS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-rule bg-white p-3.5 dark:bg-slate-800/60">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                Top Incident Categories
              </p>
              <div className="mt-3 flex items-center gap-4">
                <div
                  className="relative h-20 w-20 shrink-0 rounded-full"
                  style={{ background: donutGradient() }}
                >
                  <div className="absolute inset-[22%] rounded-full bg-white dark:bg-slate-800" />
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  {DONUT_SEGMENTS.map((seg) => (
                    <div key={seg.label} className="flex items-center justify-between gap-2 text-[10px]">
                      <span className="flex min-w-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: seg.color }}
                        />
                        <span className="truncate">{seg.label}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-slate-700 dark:text-slate-200">
                        {seg.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row (static illustration) */}
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            <div className="rounded-lg border border-rule bg-white p-3.5 dark:bg-slate-800/60">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                Compliance Overview
              </p>
              <div className="mt-3 space-y-2.5">
                {COMPLIANCE_BARS.map((bar) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 truncate text-[10px] text-slate-500 dark:text-slate-400">
                      {bar.label}
                    </span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet to-sky"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </span>
                    <span className="w-8 shrink-0 text-right text-[10px] font-semibold text-slate-700 dark:text-slate-200">
                      {bar.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-rule bg-white p-3.5 dark:bg-slate-800/60">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                Recent Activities
              </p>
              <div className="mt-3 space-y-2">
                {ACTIVITIES.map((activity) => (
                  <div key={activity.text} className="flex items-center gap-2.5 text-[10px]">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: `${activity.tone}1a`, color: activity.tone }}
                    >
                      <activity.icon className="h-3 w-3" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-slate-600 dark:text-slate-300">
                      {activity.text}
                    </span>
                    <span className="shrink-0 text-slate-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoleViews() {
  const reduced = !!useReducedMotion();
  const [activeKey, setActiveKey] = useState(ROLES[0].key);
  const activeRole = ROLES.find((r) => r.key === activeKey) ?? ROLES[0];

  return (
    <section
      id="platform"
      aria-labelledby="role-views-heading"
      className="relative snap-start overflow-hidden bg-slate-50 py-20 dark:bg-slate-950 sm:py-24"
    >
      {/* Decorative corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-16 h-40 w-40 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(126,20,255,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10">
        <div className="flex h-80 w-80 items-center justify-center rounded-full border border-slate-200/70 dark:border-white/5">
          <div className="h-56 w-56 rounded-full border border-slate-200/70 dark:border-white/5" />
        </div>
      </div>

      <div className="section-shell relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced)}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-base font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            One Platform, Four Views
          </p>
          <h2
            id="role-views-heading"
            className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]"
          >
            One login. The exact view each role actually needs.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Superadmins see the whole portfolio. Managers see their sites.
            Field crews see a five-tap incident form. Same data, same
            platform, permission-filtered in real time.
          </p>
        </motion.div>

        {/* Role tabs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.1)}
          className="mx-auto mt-10 w-full max-w-2xl"
        >
          <div className="flex rounded-full border border-rule bg-white p-1.5 shadow-sm dark:bg-slate-900">
            {ROLES.map((role) => (
              <button
                key={role.key}
                type="button"
                onClick={() => setActiveKey(role.key)}
                aria-pressed={role.key === activeKey}
                className={cn(
                  "flex-1 whitespace-nowrap rounded-full px-2.5 py-2.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky sm:px-4 sm:text-base",
                  role.key === activeKey
                    ? "bg-violet text-white shadow-[0_8px_20px_-8px_rgba(126,20,255,0.6)]"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                {role.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Role content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp(reduced, 0.15)}
          className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:gap-14"
        >
          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeRole.key}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
              >
                <h3 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
                  {activeRole.heading}
                </h3>
                <div className="mt-7 space-y-4">
                  {activeRole.checks.map((check) => (
                    <div
                      key={check}
                      className="flex items-center gap-3.5 rounded-xl border border-rule bg-white px-5 py-4 dark:bg-slate-900"
                    >
                      <CircleCheck className="h-5 w-5 shrink-0 text-violet" aria-hidden="true" />
                      <span className="text-base font-medium text-slate-700 dark:text-slate-200">
                        {check}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <DashboardMock role={activeRole} reduced={reduced} />
        </motion.div>

        {/* Feature strip */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.1)}
          className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-rule bg-white dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                "flex flex-col items-center gap-3 px-6 py-8 text-center",
                i >= 1 && "border-t border-rule sm:border-t-0",
                i % 2 === 1 && "sm:border-l sm:border-rule",
                i >= 2 && "sm:border-t sm:border-rule lg:border-t-0",
                i > 0 && "lg:border-l lg:border-rule"
              )}
            >
              <feature.icon className="h-8 w-8 text-violet" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </p>
              <p className="max-w-[260px] text-base leading-relaxed text-slate-500 dark:text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.15)}
          className="mt-14 flex items-center gap-5"
        >
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10 dark:bg-violet/20">
              <Lock className="h-4.5 w-4.5 text-violet" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold text-violet sm:text-lg">
              One platform. One truth. Every role in sync.
            </span>
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
