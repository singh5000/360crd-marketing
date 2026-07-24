"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Building2, HardHat, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type AudienceCard = {
  icon: typeof ShieldCheck;
  color: string;
  title: string;
  description: string;
  bullets: string[];
  bestFor: string;
  href: string;
};

const AUDIENCES: AudienceCard[] = [
  {
    icon: ShieldCheck,
    color: "#2563eb",
    title: "Safety & EHS Directors",
    description: "Platform-wide compliance oversight, audit trails, and cross-site risk trends — without chasing every site manager for a status update.",
    bullets: [
      "Company-wide compliance rollup",
      "ISO 45001 / ISO 14001 / OSHA-ready audit trail",
      "Cross-site incident & risk trends",
    ],
    bestFor: "Directors accountable for compliance across every site.",
    href: "/solutions/safety-directors",
  },
  {
    icon: Building2,
    color: "#0891b2",
    title: "Site & Operations Managers",
    description: "Run your sites day to day — crews, schedules, and approvals — from one dashboard instead of five disconnected tools.",
    bullets: [
      "Site-level incident & audit queue",
      "Crew training & induction tracking",
      "Approvals for waste, PPE & assets",
    ],
    bestFor: "Managers responsible for one or more active sites.",
    href: "/solutions/site-managers",
  },
  {
    icon: HardHat,
    color: "#059669",
    title: "Field Supervisors & Crews",
    description: "Report, log, and stay compliant straight from the field — no paperwork, no separate app to install.",
    bullets: [
      "Five-tap incident reporting",
      "QR-code waste & asset logging",
      "Works from any phone, on site",
    ],
    bestFor: "Supervisors and crews working the job day to day.",
    href: "/solutions/field-teams",
  },
];

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

export default function SolutionsAudienceCards() {
  const reduced = !!useReducedMotion();

  return (
    <section id="audience" aria-label="Solutions by role" className="relative bg-white py-20 dark:bg-slate-950 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            Solutions Hub
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Pick the view built for your job.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Same platform, same data — scoped to what each role actually
            needs to see and do.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {AUDIENCES.map((audience, i) => (
            <motion.div
              key={audience.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(reduced, i * 0.1)}
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-7 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] dark:bg-slate-900 dark:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]"
              )}
              style={{ borderColor: `${audience.color}30` }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${audience.color}1f`, color: audience.color }}
              >
                <audience.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900 dark:text-white">
                {audience.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {audience.description}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-rule pt-5">
                {audience.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: audience.color }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Best for: </span>
                {audience.bestFor}
              </p>

              <Link
                href={audience.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet transition-colors hover:text-violet/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:text-sky dark:hover:text-sky/80"
              >
                Explore this solution
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
