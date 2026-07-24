"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Building2,
  Camera,
  Check,
  Eye,
  HardHat,
  LayoutDashboard,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShellFrame, AppTopBar } from "./app-shell-chrome";

/**
 * "How it works" as a stacking-cards scroll effect — the page's one
 * lock-and-scroll moment, and a deliberate departure from the earlier
 * "text scrolls past a pinned side panel" version. Each step is its own
 * full-width card, `position: sticky` at the SAME `top` offset, with an
 * increasing z-index down the list. As the user scrolls, card 2 reaches
 * that sticky offset and — because it's later in the DOM and painted on
 * top — slides up over card 1 and pins there; card 3 then covers card 2,
 * and so on. This needs no scroll-jacking JS, no swapped/AnimatePresence
 * content to keep in sync, and no fixed-height panel to accidentally
 * leave empty: the natural document height of four ~520px sticky cards
 * IS the scroll distance the effect plays out over.
 *
 * IMPORTANT: nothing between these sticky cards and the viewport may have
 * non-visible `overflow` — that silently breaks `position: sticky`
 * (documented the hard way earlier in this file's history).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const ROLES_MOCK = [
  { icon: ShieldCheck, label: "Safety & EHS Director", selected: true },
  { icon: Building2, label: "Site & Operations Manager", selected: false },
  { icon: HardHat, label: "Field Supervisor & Crew", selected: false },
];

const DASHBOARD_MOCK = [
  { label: "Compliance Score", value: "92%", tone: "#10b981" },
  { label: "Open Incidents", value: "5", tone: "#f59e0b" },
  { label: "Sites Live", value: "6", tone: "#2563eb" },
  { label: "Audits Due", value: "2", tone: "#f43f5e" },
];

const TIMELINE_MOCK = [
  { label: "Submitted", done: true },
  { label: "Reviewed", done: true },
  { label: "Action Taken", done: true },
  { label: "Closed", done: false },
];

function RolePickerMock() {
  return (
    <div className="w-full space-y-2">
      {ROLES_MOCK.map((role) => (
        <div
          key={role.label}
          className={cn(
            "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-xs font-medium",
            role.selected ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500"
          )}
        >
          <role.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">{role.label}</span>
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
              role.selected ? "border-blue-600 bg-blue-600" : "border-slate-300"
            )}
          >
            {role.selected && <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />}
          </span>
        </div>
      ))}
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="grid w-full grid-cols-2 gap-2.5">
      {DASHBOARD_MOCK.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-slate-200 p-3.5">
          <p className="truncate text-[10px] font-medium text-slate-500">{stat.label}</p>
          <p className="mt-1.5 text-xl font-extrabold leading-none" style={{ color: stat.tone }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ReportFormMock() {
  return (
    <div className="w-full rounded-lg border border-slate-200 p-4">
      <p className="text-xs font-semibold text-slate-700">New Incident Report</p>
      <div className="mt-3 flex gap-1.5">
        {["Low", "Med", "High", "Critical"].map((level) => (
          <span
            key={level}
            className={cn(
              "flex-1 rounded-md px-1.5 py-1.5 text-center text-[10px] font-semibold",
              level === "High" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"
            )}
          >
            {level}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-slate-300 px-2.5 py-2 text-[10px] text-slate-500">
        <Camera className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        1 photo attached
      </div>
      <div className="mt-3 rounded-md bg-blue-600 py-2 text-center text-[11px] font-semibold text-white">
        Submit Report
      </div>
    </div>
  );
}

function TimelineMock() {
  return (
    <div className="w-full">
      {TIMELINE_MOCK.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center self-stretch">
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                stage.done ? "bg-emerald-500 text-white" : "border-2 border-slate-200 bg-white"
              )}
            >
              {stage.done && <Check className="h-3 w-3" aria-hidden="true" />}
            </span>
            {i < TIMELINE_MOCK.length - 1 && (
              <span
                className={cn("w-0.5 flex-1", stage.done ? "bg-emerald-400" : "bg-slate-200")}
                style={{ minHeight: 18 }}
              />
            )}
          </div>
          <span className={cn("pb-5 text-xs font-medium", stage.done ? "text-slate-700" : "text-slate-400")}>
            {stage.label}
          </span>
        </div>
      ))}
    </div>
  );
}

type Step = {
  icon: LucideIcon;
  ordinal: string;
  accent: string;
  accentSoft: string;
  label: string;
  title: string;
  body: string;
  mock: () => React.ReactNode;
};

const STEPS: Step[] = [
  {
    icon: Users,
    ordinal: "01",
    accent: "#2563eb",
    accentSoft: "#eff6ff",
    label: "STEP 1",
    title: "Pick your role",
    body: "Start from the Solutions Hub and choose the view built for what you actually do — director, manager, or crew.",
    mock: () => <RolePickerMock />,
  },
  {
    icon: LayoutDashboard,
    ordinal: "02",
    accent: "#0891b2",
    accentSoft: "#ecfeff",
    label: "STEP 2",
    title: "See your tailored view",
    body: "Your dashboard shows exactly what your role needs — compliance trends, a site queue, or a five-tap report form.",
    mock: () => <DashboardMock />,
  },
  {
    icon: Eye,
    ordinal: "03",
    accent: "#7e14ff",
    accentSoft: "#f5f3ff",
    label: "STEP 3",
    title: "Act from the field or the office",
    body: "Log an incident, approve a waste report, or review an audit — from a phone on-site or a laptop at a desk.",
    mock: () => <ReportFormMock />,
  },
  {
    icon: ShieldCheck,
    ordinal: "04",
    accent: "#059669",
    accentSoft: "#ecfdf5",
    label: "STEP 4",
    title: "Everything rolls up to one record",
    body: "Every action — whoever did it, wherever it happened — lands in the same audit-ready trail, timestamped automatically.",
    mock: () => <TimelineMock />,
  },
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

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <div className="sticky top-20 pt-6" style={{ zIndex: 10 + index }}>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative overflow-hidden p-8 sm:p-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-10 select-none text-[10rem] font-black leading-none text-white/[0.04] sm:text-[13rem]"
            >
              {step.ordinal}
            </span>

            <div className="relative">
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${step.accent}26`, color: step.accent }}
              >
                <step.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: step.accent }}>
                {step.label} OF 4
              </p>
              <h3 className="mt-3 max-w-sm text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-400">{step.body}</p>
            </div>
          </div>

          <div
            className="flex items-center justify-center p-8 sm:p-12"
            style={{ background: `linear-gradient(135deg, ${step.accent}14, transparent)` }}
          >
            <div className="w-full max-w-xs">
              <AppShellFrame>
                <AppTopBar />
                <div className="bg-slate-50/60 p-5">{step.mock()}</div>
              </AppShellFrame>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionsHowItWorks() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="How it works" className="relative bg-slate-950 py-20 sm:py-28">
      <div className="section-shell relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">How It Works</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
            From picking a role to an audit-ready record.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            Keep scrolling — each step stacks on the last, the same way the
            record itself builds up.
          </p>
        </motion.div>

        <div className="relative mt-16 pb-[10vh]">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
