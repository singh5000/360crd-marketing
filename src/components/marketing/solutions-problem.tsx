"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CircleCheck } from "lucide-react";

/**
 * Dark, checklist-driven "why this works" section — the Solutions Hub
 * equivalent of a product page's benefits block. Deliberately dark
 * (bg-slate-950) to break up the otherwise light page, with a real photo
 * panel + two floating data cards standing in for a literal screenshot.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const BENEFITS = [
  "Safety Directors see compliance trends across every site, live",
  "Site Managers get one dashboard instead of five spreadsheets",
  "Field crews report an incident in five taps, not a phone call",
  "Every role's actions roll up into the same audit-ready record",
  "No re-keying data between tools that don't talk to each other",
  "Access is scoped automatically — nobody sees more than their role allows",
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

function fadeSide(reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } };
  }
  return {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  };
}

export default function SolutionsProblem() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Why one platform works" className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-violet/20 blur-[150px]"
      />

      <div className="section-shell relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0)}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">Why It Works</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
            One shared source of truth. Three tailored ways to use it.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Every role reports into the same data layer, so nothing gets lost
            translating between a director's spreadsheet, a manager's group
            chat, and a crew's paper form.
          </p>

          <div className="mt-8 space-y-4">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp(reduced, 0.06 * i)}
                className="flex items-start gap-3"
              >
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
                <span className="text-base leading-relaxed text-slate-200">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeSide(reduced)}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
            <Image
              src="/images/roles-intro.jpg"
              alt="A team reviewing project plans together around a table"
              width={900}
              height={700}
              className="h-[360px] w-full object-cover sm:h-[420px]"
            />
          </div>

          <div className="absolute -left-4 top-6 w-56 rounded-2xl bg-white p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] sm:-left-8">
            <p className="text-xs font-semibold text-slate-500">Open Incidents by Site</p>
            <div className="mt-2.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Riverside Tower</span>
                <span className="font-semibold text-slate-900">2</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Harbor Yard</span>
                <span className="font-semibold text-slate-900">1</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">North Depot</span>
                <span className="font-semibold text-emerald-600">0</span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 right-2 w-48 rounded-2xl bg-violet p-4 text-white shadow-[0_24px_48px_-16px_rgba(37,99,235,0.55)] sm:-right-6">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">Sites Live</p>
            <p className="mt-1 text-2xl font-extrabold leading-none">6</p>
            <p className="mt-1 text-[11px] text-white/70">Across 3 regions</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
