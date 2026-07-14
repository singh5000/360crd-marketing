"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  ChartColumn,
  CircleCheckBig,
  Clock,
  Eye,
  FileClock,
  FileText,
  Lock,
  Mail,
  Paperclip,
  Shield,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserCheck,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 3 — "old way vs. with 360crd" comparison. Centered two-line
 * heading, tabbed panels (messy collage + pain list on the left, the real
 * incident pipeline with timestamps, feature strip and outcome stats on the
 * right), and a full-width closing banner.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type PipelineStage = {
  label: string;
  icon: LucideIcon;
  color: string;
  timestamp: string;
};

// Real 360crd incident pipeline — the stage-by-stage color progression is
// the point: violet -> amber -> rose -> sky (active) -> emerald-light ->
// emerald-solid.
const PIPELINE_STAGES: PipelineStage[] = [
  { label: "Submitted", icon: FileText, color: "#2563eb", timestamp: "04 Dec, 10:15 AM" },
  { label: "Under Manager Review", icon: Eye, color: "#f59e0b", timestamp: "04 Dec, 11:20 AM" },
  { label: "Escalated", icon: TriangleAlert, color: "#e11d48", timestamp: "04 Dec, 01:10 PM" },
  { label: "Action In Progress", icon: Wrench, color: "#38bdf8", timestamp: "04 Dec, 02:45 PM" },
  { label: "Action Completed", icon: CircleCheckBig, color: "#34d399", timestamp: "Pending" },
  { label: "Closed", icon: Lock, color: "#059669", timestamp: "Pending" },
];

const ACTIVE_INDEX = 3; // "Action In Progress"
const NODE_STAGGER = 0.06;

const OLD_WAY_PAINS = [
  "Scattered communication across chats and emails",
  "Unclear ownership and no visibility",
  "Manual follow-ups and lost updates",
  "Delayed resolution and higher risk",
  "No audit trail or accountability",
];

const CRD_FEATURES: { label: string; icon: LucideIcon }[] = [
  { label: "End-to-end visibility", icon: Shield },
  { label: "Clear ownership at every step", icon: UserCheck },
  { label: "Real-time updates & notifications", icon: Clock },
  { label: "Complete audit trail", icon: FileClock },
  { label: "Faster resolution, lower risk", icon: ChartColumn },
];

const STATS = [
  { value: "65%", label: "Faster Resolution" },
  { value: "90%", label: "Improved Visibility" },
  { value: "100%", label: "Accountability" },
];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function collageVariants(index: number, rotate: number, reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0, rotate }, show: { opacity: 1, y: 0, rotate } };
  }
  return {
    hidden: { opacity: 0, y: 14, rotate: 0, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      rotate,
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.06, ease: EASE },
    },
  };
}

function nodeVariants(index: number, reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * NODE_STAGGER, ease: EASE },
    },
  };
}

function NodeCircle({ stage, isActive }: { stage: PipelineStage; isActive: boolean }) {
  const Icon = stage.icon;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        isActive ? "h-16 w-16" : "h-12 w-12"
      )}
      style={{
        backgroundColor: isActive ? stage.color : `${stage.color}16`,
        color: isActive ? "#ffffff" : stage.color,
        boxShadow: isActive
          ? `0 0 0 8px ${stage.color}1f, 0 0 28px -4px ${stage.color}`
          : undefined,
      }}
    >
      <Icon className={isActive ? "h-7 w-7" : "h-5 w-5"} strokeWidth={2.25} aria-hidden="true" />
    </span>
  );
}

function ActiveChip() {
  return (
    <span className="mt-2 flex w-fit flex-col items-start gap-1 rounded-lg border border-sky/30 bg-sky/10 px-3 py-2 text-left text-xs font-medium text-slate-700 dark:border-sky/40 dark:bg-sky/15 dark:text-slate-100">
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="h-1 w-1 shrink-0 rounded-full bg-sky" aria-hidden="true" />
        3 photos attached
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="h-1 w-1 shrink-0 rounded-full bg-sky" aria-hidden="true" />
        Updated 2h ago
      </span>
    </span>
  );
}

function StageDetails({ stage, isActive }: { stage: PipelineStage; isActive: boolean }) {
  const isPending = stage.timestamp === "Pending";
  return (
    <>
      <span
        className={cn(
          "text-sm font-semibold leading-snug sm:text-[15px]",
          isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-200"
        )}
      >
        {stage.label}
      </span>
      <span
        className={cn(
          "whitespace-nowrap text-xs",
          isActive
            ? "font-semibold text-sky"
            : isPending
              ? "text-slate-400 dark:text-slate-500"
              : "text-slate-500 dark:text-slate-400"
        )}
      >
        {stage.timestamp}
      </span>
    </>
  );
}

function HorizontalStepper({
  stages,
  startIndex,
  reduced,
  compact = false,
}: {
  stages: PipelineStage[];
  startIndex: number;
  reduced: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex w-full items-start">
      {stages.map((stage, i) => {
        const globalIndex = startIndex + i;
        const isActive = globalIndex === ACTIVE_INDEX;
        return (
          <Fragment key={stage.label}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={nodeVariants(globalIndex, reduced)}
              className={cn(
                "flex flex-col items-center gap-1.5 text-center",
                compact ? "w-[120px]" : "w-32 sm:w-36"
              )}
            >
              <div className="mb-1 flex h-16 items-center">
                <NodeCircle stage={stage} isActive={isActive} />
              </div>
              <StageDetails stage={stage} isActive={isActive} />
              {isActive && <ActiveChip />}
            </motion.div>
            {i < stages.length - 1 && (
              <div className="mt-8 h-px min-w-[8px] flex-1 bg-slate-200 dark:bg-slate-700" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function VerticalStepper({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col">
      {PIPELINE_STAGES.map((stage, i) => {
        const isActive = i === ACTIVE_INDEX;
        return (
          <div key={stage.label}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={nodeVariants(i, reduced)}
              className="flex items-start gap-4"
            >
              <div className="flex w-16 shrink-0 justify-center">
                <NodeCircle stage={stage} isActive={isActive} />
              </div>
              <div className="flex min-w-0 flex-col items-start pt-1.5 text-left">
                <StageDetails stage={stage} isActive={isActive} />
                {isActive && <ActiveChip />}
              </div>
            </motion.div>
            {i < PIPELINE_STAGES.length - 1 && (
              <div className="ml-8 h-7 w-px bg-slate-200 dark:bg-slate-700" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TheOldWay({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <span className="inline-flex w-fit items-center rounded-t-xl bg-slate-200/70 px-5 py-2.5 text-sm font-bold tracking-[0.1em] text-slate-600 dark:bg-white/10 dark:text-slate-300">
        THE OLD WAY
      </span>
      <div className="flex flex-1 flex-col rounded-2xl rounded-tl-none bg-slate-100/80 p-5 dark:bg-white/[0.04] sm:p-6">
        <div className="relative min-h-[320px] flex-1 sm:min-h-[360px]">
          {/* Cluttered spreadsheet row snippet with a red "?" cell */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={collageVariants(2, 0, reduced)}
            className="absolute right-0 top-0 w-[48%] max-w-[250px] overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-white/10"
          >
            <div className="grid grid-cols-4 text-[10px] sm:text-[11px]">
              {["Site", "Date", "Owner", "Status"].map((h, i) => (
                <div
                  key={h}
                  className={cn(
                    "truncate border-b border-slate-200 bg-slate-50 px-2 py-1.5 font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300",
                    i < 3 && "border-r"
                  )}
                >
                  {h}
                </div>
              ))}
              <div className="truncate border-r border-slate-100 px-2 py-1.5 text-slate-500 dark:border-white/5 dark:text-slate-400">
                Site 4
              </div>
              <div className="truncate border-r border-slate-100 px-2 py-1.5 text-slate-500 dark:border-white/5 dark:text-slate-400">
                04/12
              </div>
              <div className="truncate border-r border-slate-100 px-2 py-1.5 text-slate-500 dark:border-white/5 dark:text-slate-400">
                —
              </div>
              <div className="truncate bg-red-50 px-2 py-1.5 text-center font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                ?
              </div>
            </div>
          </motion.div>

          {/* WhatsApp-style chat bubble with a blurry photo thumbnail */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={collageVariants(0, -2, reduced)}
            className="absolute left-0 top-[6%] z-10 w-[62%] max-w-[290px] rounded-2xl rounded-tl-sm bg-white p-3.5 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-white/10 sm:p-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                <UserRound className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Site Crew Chat
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">6:42 PM</p>
              </div>
            </div>
            <div className="mt-3 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
              {/* 1 of the 2-3 real images requested homepage-wide; remaining 1-2 fit later sections (team/site photo, testimonial photo). */}
              <Image
                src="/images/ms.png"
                alt="Jobsite incident photo shared in a chat thread"
                width={500}
                height={333}
                className="h-32 w-full object-cover sm:h-36"
              />
            </div>
            <p className="mt-2.5 text-xs text-slate-400 dark:text-slate-500">Sent 2 days ago</p>
          </motion.div>

          {/* Forwarded-email snippet */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={collageVariants(4, 2, reduced)}
            className="absolute right-[3%] top-[26%] w-[46%] max-w-[240px] rounded-lg bg-white p-3.5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-white/10"
          >
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                FW: FW: incident pics??
              </p>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-slate-400 dark:text-slate-500">
              &quot;attaching again — the old thread had page 1 somewhere...&quot;
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
              <Paperclip className="h-3 w-3 shrink-0" aria-hidden="true" />
              2 attachments · 1 missing
            </div>
          </motion.div>

          {/* Sticky-note tag */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={collageVariants(3, -5, reduced)}
            className="absolute right-[10%] top-[58%] w-[36%] max-w-[165px] bg-amber-200 p-3.5 shadow-sm dark:bg-amber-300"
          >
            <p className="text-sm font-semibold leading-snug text-slate-800">Who has this?</p>
          </motion.div>

          {/* Torn / photocopy-textured paper form snippet */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={collageVariants(1, -3, reduced)}
            className="absolute bottom-0 left-[2%] w-[58%] max-w-[280px] bg-[#f4f1e8] p-4 shadow-sm"
            style={{
              clipPath:
                "polygon(0% 5%, 8% 0%, 16% 4%, 24% 0%, 32% 4%, 40% 0%, 48% 4%, 56% 0%, 64% 4%, 72% 0%, 80% 4%, 88% 0%, 96% 4%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
              }}
            />
            <p className="relative flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <FileText className="h-3 w-3 shrink-0" aria-hidden="true" />
              Incident Form — Page 2
            </p>
            <div className="relative mt-3 space-y-2.5">
              <span className="block h-[3px] w-[88%] rounded-full bg-slate-500/60" />
              <span className="block h-[3px] w-[70%] rounded-full bg-slate-500/45" />
              <span className="block h-[3px] w-[80%] rounded-full bg-slate-500/60" />
              <span className="block h-[3px] w-[55%] rounded-full bg-slate-500/45" />
            </div>
          </motion.div>
        </div>

        {/* Pain points + cost-of-chaos stat card */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <ul className="min-w-0 flex-1 space-y-3">
            {OLD_WAY_PAINS.map((pain, i) => (
              <motion.li
                key={pain}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp(reduced, 0.2 + i * 0.05)}
                className="flex items-start gap-3 text-[15px] leading-snug text-slate-600 dark:text-slate-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/15">
                  <X className="h-3 w-3 text-red-500 dark:text-red-400" strokeWidth={3} aria-hidden="true" />
                </span>
                {pain}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(reduced, 0.4)}
            className="w-full shrink-0 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 p-5 text-white shadow-[0_18px_44px_-18px_rgba(225,29,72,0.55)] sm:w-[230px]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <Clock className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-3xl font-extrabold leading-none">12 days</p>
            <p className="mt-1.5 text-sm leading-snug text-white/85">
              average to close a single incident
            </p>
            <div className="mt-3.5 border-t border-white/25 pt-3">
              <p className="text-sm font-semibold leading-snug">
                43% are never formally closed
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function With360crd({ reduced }: { reduced: boolean }) {
  const rowOne = PIPELINE_STAGES.slice(0, 3);
  const rowTwo = PIPELINE_STAGES.slice(3, 6);

  return (
    <div className="flex h-full flex-col">
      <span className="inline-flex w-fit items-center gap-2 rounded-t-xl bg-violet px-5 py-2.5 text-sm font-bold tracking-[0.1em] text-white">
        WITH 360CRD
        <BadgeCheck className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col rounded-2xl rounded-tl-none border border-violet/15 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(37,99,235,0.25)] dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6 lg:p-7">
        {/* Pipeline stepper — vertically centered inside the card's flexible
            space so equal-height stretching distributes extra room evenly
            around it instead of pooling into one blank gap. */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="md:hidden">
            <VerticalStepper reduced={reduced} />
          </div>
          <div className="hidden flex-col gap-10 md:flex xl:hidden">
            <HorizontalStepper stages={rowOne} startIndex={0} reduced={reduced} />
            <HorizontalStepper stages={rowTwo} startIndex={3} reduced={reduced} />
          </div>
          <div className="hidden xl:block">
            <HorizontalStepper stages={PIPELINE_STAGES} startIndex={0} reduced={reduced} compact />
          </div>
        </div>

        <div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.25)}
          className="mt-9 grid grid-cols-2 overflow-hidden rounded-xl border border-rule bg-slate-50/80 dark:bg-white/[0.03] md:grid-cols-5"
        >
          {CRD_FEATURES.map((feature, i) => (
            <div
              key={feature.label}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 px-3 py-5 text-center",
                i % 2 === 1 && "border-l border-rule md:border-l-0",
                i >= 2 && "border-t border-rule md:border-t-0",
                i > 0 && "md:border-l md:border-rule",
                i === 4 && "col-span-2 md:col-span-1"
              )}
            >
              <feature.icon
                className="h-6 w-6 text-slate-600 dark:text-slate-300"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-sm leading-snug text-slate-600 dark:text-slate-300">
                {feature.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Outcome stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.35)}
          className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-rule bg-slate-50/80 dark:bg-white/[0.03] md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-6 text-center",
                i === 1 && "border-l border-rule",
                i === 2 && "border-t border-rule md:border-t-0 md:border-l md:border-rule"
              )}
            >
              <span className="text-3xl font-extrabold tracking-tight text-violet">
                {stat.value}
              </span>
              <span className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                {stat.label}
              </span>
            </div>
          ))}
          <div className="flex items-stretch border-l border-t border-rule p-3 md:border-t-0">
            <div className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg bg-violet/[0.08] px-3 py-4 text-center dark:bg-violet/15">
              <ShieldCheck className="h-6 w-6 text-violet" aria-hidden="true" />
              <span className="text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">
                Stronger Compliance
              </span>
              <span className="text-sm leading-snug text-slate-600 dark:text-slate-300">
                Lower Risk
              </span>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="the-problem"
      aria-labelledby="problem-solution-heading"
      className="relative snap-start bg-white py-20 dark:bg-slate-950 sm:py-24"
    >
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced)}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="problem-solution-heading"
            className="text-[30px] font-extrabold leading-[1.2] tracking-tight sm:text-4xl lg:text-[40px]"
          >
            <span className="block text-slate-900 dark:text-white">
              From Manual. Messy. Delayed.
            </span>
            <span className="block text-violet">
              To Structured. Transparent. Accountable.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            See the difference 360crd brings to every incident.
          </p>
        </motion.div>

        <div className="relative mt-12 sm:mt-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-10">
            <TheOldWay reduced={reduced} />

            {/* Mobile/tablet connector between stacked panels */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp(reduced, 0.3)}
              className="flex justify-center lg:hidden"
              aria-hidden="true"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet shadow-[0_12px_30px_-10px_rgba(37,99,235,0.6)]">
                <ArrowDown className="h-5 w-5 text-white" />
              </span>
            </motion.div>

            <With360crd reduced={reduced} />
          </div>

          {/* Desktop connector floating at the seam */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(reduced, 0.45)}
            className="pointer-events-none absolute left-[40%] top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet shadow-[0_16px_36px_-12px_rgba(37,99,235,0.65)]">
              <ArrowRight className="h-6 w-6 text-white" />
            </span>
          </motion.div>
        </div>

        {/* Closing banner */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.15)}
          className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-violet/[0.06] px-6 py-6 text-center dark:bg-violet/15 sm:flex-row sm:text-left"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet text-white">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-base font-medium text-slate-800 dark:text-slate-100 sm:text-lg">
            360crd turns chaos into clarity — so your team can focus on what
            matters most: workplace safety.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
