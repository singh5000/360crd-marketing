"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  TriangleAlert,
  Recycle,
  GraduationCap,
  ClipboardCheck,
  FileCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 6 — "Platform capabilities" 6-card feature grid. Structural
 * pattern: tinted icon square → title → description → dashed divider →
 * 3 schema-backed bullets. Each card carries its module's sitewide accent
 * color (incidents=rose, waste=sky, training=violet, inductions=emerald,
 * audits=amber, permissions=indigo) and links to its /features/* page.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Feature = {
  title: string;
  href: string;
  icon: LucideIcon;
  color: string;
  description: string;
  bullets: [string, string, string];
};

const FEATURES: Feature[] = [
  {
    title: "Incident Management",
    href: "/features/incidents",
    icon: TriangleAlert,
    color: "#e11d48",
    description:
      "Report, investigate, and close out safety incidents with a complete audit trail.",
    bullets: [
      "Severity levels: Low, Medium, High, Critical",
      "Photo & video evidence capture",
      "Full status timeline, Submitted to Closed",
    ],
  },
  {
    title: "Waste Management",
    href: "/features/waste-management",
    icon: Recycle,
    color: "#38bdf8",
    description:
      "Track waste from report to disposal with QR-linked site tagging.",
    bullets: [
      "QR-code site tagging for field crews",
      "8 waste types, 4 hazard levels",
      "Multi-stage approval: Verified → Collected → Disposed",
    ],
  },
  {
    title: "Training & Certification",
    href: "/features/training",
    icon: GraduationCap,
    color: "#2563eb",
    description:
      "Assign role-based training and generate certificates the moment it's completed.",
    bullets: [
      "Role-based course assignment",
      "Upload materials & learning objectives",
      "Instant printable certificates",
    ],
  },
  {
    title: "Site Inductions",
    href: "/features/inductions",
    icon: ClipboardCheck,
    color: "#10b981",
    description:
      "Onboard every worker to every site with document-backed inductions.",
    bullets: [
      "Custom document requirements per site",
      "File upload & preview for submissions",
      "Manager review & sign-off",
    ],
  },
  {
    title: "Audits & Compliance",
    href: "/features/audits",
    icon: FileCheck,
    color: "#f59e0b",
    description:
      "Build audit templates mapped to ISO 45001, ISO 14001, and OSHA.",
    bullets: [
      "Text, Yes/No, and Rating question types",
      "6 frequency settings, Daily to Annual",
      "Threshold scoring & review workflow",
    ],
  },
  {
    title: "Roles & Permissions",
    href: "/features/roles-permissions",
    icon: ShieldCheck,
    color: "#1e40af",
    description:
      "One granular permission engine — Superadmin, Manager, Staff and User, each with their own view.",
    bullets: [
      "Per-module view/add/edit/delete control",
      "Dynamic sidebar visibility per role",
      "Multi-site, multi-company data isolation",
    ],
  },
];

function cardVariants(index: number, reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: index * 0.05, ease: EASE },
    },
  };
}

function fadeUp(reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };
}

export default function FeatureGrid() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="feature-grid-heading"
      className="relative snap-start bg-white py-20 dark:bg-slate-950 sm:py-24"
    >
      <div className="section-shell">
        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(reduced)}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-base font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
              Platform Capabilities
            </p>
            <h2
              id="feature-grid-heading"
              className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]"
            >
              One system, six ways it keeps your sites compliant.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Report incidents, track waste, run training, manage inductions,
              and stay audit-ready — from one connected safety platform.
            </p>
          </motion.div>

          {/* Explore-all CTA: top-right on desktop, centered below header on mobile */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(reduced)}
            className="mt-8 flex justify-center lg:absolute lg:right-0 lg:top-1 lg:mt-0 lg:justify-end"
          >
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-md border border-violet/25 bg-violet/[0.04] px-5 py-2.5 text-sm font-semibold text-violet transition-colors hover:bg-violet/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:border-sky/30 dark:bg-sky/10 dark:text-sky dark:hover:bg-sky/15"
            >
              Explore All Features
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants(i, reduced)}
            >
              <Link
                href={feature.href}
                style={{ "--card-accent-border": `${feature.color}55` } as React.CSSProperties}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border border-rule bg-white p-7 sm:p-8",
                  "shadow-[0_12px_32px_-20px_rgba(15,23,42,0.18)] dark:bg-slate-800 dark:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)]",
                  "transition-all duration-200 hover:-translate-y-1 hover:border-[var(--card-accent-border)] hover:shadow-[0_26px_52px_-24px_rgba(15,23,42,0.28)] dark:hover:shadow-[0_26px_52px_-24px_rgba(0,0,0,0.65)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
                )}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: `${feature.color}1f`, color: feature.color }}
                >
                  <feature.icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-[21px] font-bold tracking-tight text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>

                {/* mt-auto pins divider + bullets to a shared baseline across the row */}
                <div className="mt-auto pt-6">
                  <div className="border-t border-dashed border-slate-200 dark:border-slate-600" />
                  <ul className="mt-5 space-y-2.5">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-600 dark:text-slate-300"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: feature.color }}
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
