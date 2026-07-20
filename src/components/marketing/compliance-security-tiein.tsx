"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Section 10 of the reusable inner-page template — ties this module's
 * data to ISO 45001 audit-readiness and the platform's real security
 * architecture (same facts as the homepage's Security Core section,
 * scoped to incident records specifically). Deliberately a real
 * photograph rather than another coded product screenshot/diagram — the
 * point is a visual break from the rest of the page. Only claims what's
 * actually built (JWT auth, bcrypt hashing, RBAC, per-company data
 * isolation) — no SOC 2 / ISO 27001 / GDPR certification claims, since
 * none of that is evidenced in the codebase.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type ComplianceFact = {
  icon: ReactNode;
  color: string;
  label: string;
  description: string;
};

export interface ComplianceSecurityTieInProps {
  eyebrow: string;
  heading: string;
  body: string;
  facts: ComplianceFact[];
  imageUrl: string;
  imageAlt: string;
  linkLabel: string;
  linkHref: string;
}

function sideVariants(reduced: boolean, fromLeft: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } };
  }
  return {
    hidden: { opacity: 0, x: fromLeft ? -24 : 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function factVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, delay, ease: EASE } },
  };
}

export default function ComplianceSecurityTieIn({
  eyebrow,
  heading,
  body,
  facts,
  imageUrl,
  imageAlt,
  linkLabel,
  linkHref,
}: ComplianceSecurityTieInProps) {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label={eyebrow} className="relative snap-start overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-24">
      <div className="section-shell relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={sideVariants(reduced, true)}
            className="relative aspect-[4/5] max-h-[280px] overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] lg:max-h-none"
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={sideVariants(reduced, false)}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              {eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>

            <div className="mt-8 space-y-5">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={factVariants(reduced, 0.3 + i * 0.06)}
                  className="flex items-start gap-4"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl [&_svg]:h-5 [&_svg]:w-5"
                    style={{ backgroundColor: `${fact.color}1f`, color: fact.color }}
                  >
                    {fact.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-slate-900 dark:text-white">{fact.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {fact.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href={linkHref}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-violet transition-colors hover:text-sky dark:text-sky"
            >
              {linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
