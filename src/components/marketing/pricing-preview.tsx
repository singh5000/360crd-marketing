"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Check, ClipboardCheck, HardHat, Headset, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 9 — pricing preview (Starter / Professional / Enterprise), mapped
 * to the real Company.plan enum and its maxUsers/maxSites caps. This is a
 * scannable preview, not the full comparison table — that lives at /pricing.
 *
 * ⚠️ PRICING IS PLACEHOLDER. monthlyPrice values below and
 * ANNUAL_DISCOUNT_PERCENT are not real figures — no pricing decision has
 * been made yet. A human must replace these before launch; nothing here
 * should be treated as final.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type BillingCycle = "monthly" | "annual";

type Plan = {
  key: string;
  name: string;
  tagline: string;
  scopeLine: string;
  /** null renders "Custom" instead of a dollar figure (Enterprise). */
  monthlyPrice: number | null;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "outline";
  popular?: boolean;
};

// TODO(pricing): placeholder only — replace with the real monthly discount
// once a pricing decision is made. Currently unverified/fabricated.
const ANNUAL_DISCOUNT_PERCENT = 20;

// Compact capability preview shown only on the Professional card — the real
// modules newly unlocked at this tier, giving it more "product glimpse"
// weight than a plain feature list.
const PROFESSIONAL_HIGHLIGHTS: { label: string; icon: typeof ClipboardCheck }[] = [
  { label: "Audits", icon: ClipboardCheck },
  { label: "PPE & Assets", icon: HardHat },
  { label: "Custom Roles", icon: UserCog },
  { label: "Priority Support", icon: Headset },
];

// TODO(pricing): flat monthly figures below are still placeholders, not a
// finalized business decision — but they're now anchored to real 2026
// market research for construction/EHS safety SaaS (mid-market platforms
// run ~$15-50/user/month; entry tiers commonly land $250-500/mo flat for
// ~20-25 seats, mid tiers $700-1500/mo flat for ~100-150 seats), rather than
// arbitrary numbers. Still needs sign-off before launch.
const PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    tagline: "For single-site teams getting off spreadsheets",
    scopeLine: "Up to 3 sites · Up to 25 users",
    monthlyPrice: 299, // TODO(pricing): placeholder, not a final figure
    features: [
      "Incident Reporting & Investigation",
      "Severity Levels: Low, Medium, High, Critical",
      "Photo & Video Evidence Capture",
      "Incident Status Timeline",
      "QR-Tagged Waste Reporting",
      "Waste Type & Hazard-Level Tagging",
      "Role-Based Training Assignment",
      "Instant Training Certificates",
      "Site Induction Checklists",
      "Induction Document Uploads",
      "Basic Compliance Dashboard",
      "Email Support",
    ],
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
    ctaVariant: "outline",
  },
  {
    key: "professional",
    name: "Professional",
    tagline: "For growing contractors running multiple sites",
    scopeLine: "Up to 15 sites · Up to 150 users",
    monthlyPrice: 799, // TODO(pricing): placeholder, not a final figure
    features: [
      "Incident Reporting & Investigation",
      "Severity Levels: Low, Medium, High, Critical",
      "Photo & Video Evidence Capture",
      "Full Incident Status Timeline",
      "QR-Tagged Waste Reporting",
      "Multi-Stage Waste Approval Workflow",
      "Role-Based Training Assignment",
      "Instant Training Certificates",
      "Site Induction Checklists",
      "Manager Review & Sign-Off",
      "Audit Templates (ISO 45001, ISO 14001, OSHA)",
      "Recurring Audit Scheduling",
      "Threshold Scoring & Review",
      "PPE Issue & Return Tracking",
      "Asset & Equipment Registry",
      "Custom Roles & Permissions",
      "Per-Module Access Control",
      "Priority Support",
    ],
    ctaLabel: "Book a Demo",
    ctaHref: "/demo",
    ctaVariant: "primary",
    popular: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "For multi-company portfolios and regulated operations",
    scopeLine: "Unlimited sites · Unlimited users",
    monthlyPrice: null,
    features: [
      "Incident Reporting & Investigation",
      "Severity Levels: Low, Medium, High, Critical",
      "Photo & Video Evidence Capture",
      "Full Incident Status Timeline",
      "QR-Tagged Waste Reporting",
      "Multi-Stage Waste Approval Workflow",
      "Role-Based Training Assignment",
      "Instant Training Certificates",
      "Site Induction Checklists",
      "Manager Review & Sign-Off",
      "Audit Templates (ISO 45001, ISO 14001, OSHA)",
      "Recurring Audit Scheduling",
      "Threshold Scoring & Review",
      "PPE Issue & Return Tracking",
      "Asset & Equipment Registry",
      "Custom Roles & Permissions",
      "Multi-Company Management",
      "Dedicated Onboarding",
      "SLA-Backed Support",
      "Custom Contract Terms",
    ],
    ctaLabel: "Talk to Sales",
    ctaHref: "/contact",
    ctaVariant: "outline",
  },
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

function priceForCycle(plan: Plan, billing: BillingCycle) {
  if (plan.monthlyPrice === null) return null;
  if (billing === "monthly") return plan.monthlyPrice;
  return Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT_PERCENT / 100));
}

function PriceDisplay({ price, reduced }: { price: number | null; reduced: boolean }) {
  if (price === null) {
    return (
      <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Custom
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="text-xl font-bold text-slate-900 dark:text-white">$</span>
      <span className="relative inline-block h-10 w-20 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={price}
            initial={reduced ? { opacity: 0 } : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: -14, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-0 text-4xl font-extrabold leading-[40px] tracking-tight text-slate-900 dark:text-white"
          >
            {price}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-base font-medium text-slate-500 dark:text-slate-400">/mo</span>
    </span>
  );
}

function PlanCard({
  plan,
  billing,
  index,
  reduced,
}: {
  plan: Plan;
  billing: BillingCycle;
  index: number;
  reduced: boolean;
}) {
  const price = priceForCycle(plan, billing);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp(reduced, index * 0.08)}
      className={cn(
        "relative flex h-full flex-col rounded-2xl p-7 sm:p-8",
        // Mobile/tablet: Professional leads so the recommended plan isn't
        // buried by scroll position. Desktop: natural Starter→Pro→Enterprise
        // order (see the grid's own comment for the column-span choice).
        plan.popular ? "order-first sm:col-span-2 lg:order-none lg:col-span-1" : "",
        plan.popular
          ? "border-2 border-violet bg-white shadow-[0_30px_60px_-24px_rgba(126,20,255,0.35)] dark:bg-slate-800 lg:scale-[1.03]"
          : "border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60"
      )}
    >
      {plan.popular && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[20px] bg-gradient-to-br from-violet/30 to-sky/30 blur-2xl"
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: [1, 1.02, 1] }}
            viewport={{ once: true, amount: 0.15 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.4, delay: 0.7 },
                    scale: { duration: 0.4, delay: 0.7, times: [0, 0.5, 1] },
                  }
            }
          />
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-violet px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            Most Popular
          </span>
        </>
      )}

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{plan.tagline}</p>

      <div className="mt-6">
        <PriceDisplay price={price} reduced={reduced} />
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{plan.scopeLine}</p>

      {plan.popular && (
        <div className="mt-5 grid grid-cols-4 gap-2" aria-hidden="true">
          {PROFESSIONAL_HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="flex flex-col items-center gap-1.5 rounded-lg bg-violet/[0.06] py-2.5 dark:bg-violet/15"
              title={h.label}
            >
              <h.icon className="h-4 w-4 text-violet" aria-hidden="true" />
              <span className="text-center text-[9px] font-medium leading-tight text-slate-600 dark:text-slate-300">
                {h.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
        <ul className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 dark:bg-emerald-500/20">
                <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <Link
          href={plan.ctaHref}
          className={cn(
            "flex w-full items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800",
            plan.ctaVariant === "primary"
              ? "bg-violet text-white hover:shadow-[0_0_28px_-8px_var(--sky)]"
              : "border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-white/5"
          )}
        >
          {plan.ctaLabel}
        </Link>
      </div>
    </motion.div>
  );
}

export default function PricingPreview() {
  const reduced = !!useReducedMotion();
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative snap-start bg-white py-20 dark:bg-slate-900 sm:py-24"
    >
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-base font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]"
          >
            Plans that scale with your sites, not your headaches.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Every plan includes the full incident, waste, training,
            induction and audit toolkit — the only thing that changes is
            scale.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.1)}
          className="mt-9 flex justify-center"
        >
          <div
            role="group"
            aria-label="Billing cycle"
            className="inline-flex rounded-full border border-rule bg-slate-100 p-1 dark:bg-white/5"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky",
                billing === "monthly"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky",
                billing === "annual"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              Annual
              {/* TODO(pricing): placeholder discount %, not a real figure */}
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                Save {ANNUAL_DISCOUNT_PERCENT}%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Tablet gets Professional spanning both columns above Starter and
            Enterprise (rather than a full 3-way stack) so it keeps reading
            as "one row, clearly elevated" instead of just another item in a
            list — see Plan Card's order-first/col-span-2 classes. */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.key} plan={plan} billing={billing} index={i} reduced={reduced} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.2)}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet transition-colors hover:text-violet/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:text-sky dark:hover:text-sky/80"
          >
            See the full plan comparison
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
