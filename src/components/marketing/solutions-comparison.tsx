"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckCircle2, MessageSquare, Sheet, StickyNote, X } from "lucide-react";
import { AppShellFrame, AppTopBar } from "./app-shell-chrome";

/**
 * Third attempt at this section. The first two both defaulted to the same
 * failure mode: small-text lists that read identically on both sides no
 * matter how the cards were styled. This version leans on an actual
 * visual contrast instead — a deliberately messy, tilted collage of
 * disconnected tools (spreadsheet / group chat / sticky note) against the
 * same clean AppShellFrame dashboard mock used everywhere else on the
 * site — plus a much larger type scale throughout, since small body text
 * was a repeated, explicit complaint.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const WITHOUT = [
  "Compliance status buried in a spreadsheet nobody opens twice",
  "Incidents reported over a phone call or a group chat",
  "The same status report, rebuilt by hand, every single week",
];

const WITH = [
  "Compliance trends visible live, across every site",
  "Incidents reported in five taps, evidence attached",
  "One dashboard, always current — nothing to rebuild",
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
  };
}

function MessyCollage({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-64 w-full sm:h-72">
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, rotate: -8, y: 10 }}
        whileInView={{ opacity: 1, rotate: -6, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-2 top-2 w-48 rounded-xl border border-slate-300 bg-white p-3 shadow-md grayscale sm:w-56"
      >
        <div className="flex items-center gap-1.5 text-slate-400">
          <Sheet className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Q3 Compliance.xlsx</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={`h-4 rounded-[2px] ${i === 3 || i === 7 ? "bg-amber-200" : "bg-slate-100"}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, rotate: 8, y: 10 }}
        whileInView={{ opacity: 1, rotate: 5, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="absolute right-1 top-14 w-44 rounded-xl border border-slate-300 bg-white p-3 shadow-md grayscale sm:right-4 sm:w-52"
      >
        <div className="flex items-center gap-1.5 text-slate-400">
          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Site Crew Chat</span>
        </div>
        <div className="mt-2 space-y-1.5">
          <span className="block h-2.5 w-4/5 rounded-full bg-slate-100" />
          <span className="block h-2.5 w-full rounded-full bg-slate-100" />
          <span className="block h-2.5 w-2/3 rounded-full bg-slate-100" />
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, rotate: -4, y: 10 }}
        whileInView={{ opacity: 1, rotate: -3, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="absolute bottom-2 left-10 w-40 rounded-xl border border-amber-200 bg-amber-50 p-3 shadow-md grayscale sm:left-16 sm:w-44"
      >
        <div className="flex items-center gap-1.5 text-amber-700">
          <StickyNote className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Don&apos;t forget!!</span>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-amber-800">
          Audit prep due Friday — ask Raj for last month&apos;s photos
        </p>
      </motion.div>
    </div>
  );
}

export default function SolutionsComparison() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Before and after 360crd" className="relative bg-slate-50 py-20 dark:bg-slate-900 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            Before &amp; After
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Spreadsheets and group chats weren&apos;t the plan. They just happened.
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(reduced, 0)}
            className="flex flex-col rounded-3xl border border-dashed border-slate-300 bg-slate-100/70 p-7 dark:border-slate-700 dark:bg-slate-800/50 sm:p-9"
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Without 360crd
            </p>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-slate-600 dark:text-slate-300 sm:text-[1.75rem]">
              A pile of tools that don&apos;t talk to each other.
            </h3>

            <MessyCollage reduced={reduced} />

            <div className="mt-6 space-y-4">
              {WITHOUT.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <X className="mt-1 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                  <span className="text-lg leading-snug text-slate-500 dark:text-slate-400">{line}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp(reduced, 0.12)}
            className="flex flex-col rounded-3xl border border-violet/15 bg-white p-7 shadow-[0_40px_90px_-40px_rgba(37,99,235,0.4)] dark:border-sky/15 dark:bg-slate-900 sm:p-9"
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet dark:text-sky">
              With 360crd
            </p>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-[1.75rem]">
              One platform your whole team actually uses.
            </h3>

            <div className="mt-6">
              <AppShellFrame>
                <AppTopBar />
                <div className="grid grid-cols-2 gap-3 bg-slate-50/60 p-5">
                  {[
                    { label: "Compliance Score", value: "92%", tone: "#10b981" },
                    { label: "Open Incidents", value: "5", tone: "#f59e0b" },
                    { label: "Sites Live", value: "6", tone: "#2563eb" },
                    { label: "Audits Due", value: "2", tone: "#f43f5e" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-3.5">
                      <p className="truncate text-xs font-medium text-slate-500">{stat.label}</p>
                      <p className="mt-1.5 text-2xl font-extrabold leading-none" style={{ color: stat.tone }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </AppShellFrame>
            </div>

            <div className="mt-6 space-y-4">
              {WITH.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-violet dark:text-sky" aria-hidden="true" />
                  <span className="text-lg font-medium leading-snug text-slate-800 dark:text-white">{line}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
