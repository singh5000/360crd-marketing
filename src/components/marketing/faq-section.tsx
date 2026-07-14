"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 12 — FAQ. Laid out as a 2-column grid (not the single stacked
 * list a numbered-accordion FAQ usually uses) per explicit request — each
 * question is its own bordered card rather than a hairline-divided row,
 * since a full-bleed divider doesn't read cleanly across two columns.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type FaqItem = { question: string; answer: string };

const FAQS: FaqItem[] = [
  {
    question: "How is 360crd priced?",
    answer:
      "360crd has three plans — Starter, Professional, and Enterprise — priced by how many sites and team members you're running, not by which modules you use. Every plan includes the full incident, waste, training, induction and audit toolkit. See the full breakdown on our pricing page.",
  },
  {
    question: "Can I control exactly what each role can see and edit?",
    answer:
      "Yes. 360crd's permission engine controls view, add, edit and delete access per module, per role. Superadmins see the whole portfolio, Managers see their sites, and Staff and Field Crews only see what their role needs — right down to what shows in their sidebar.",
  },
  {
    question: "Is our company's data isolated from other companies on 360crd?",
    answer:
      "Yes. 360crd is multi-tenant by design — every request is scoped to your company's data through the same isolation layer, so incidents, users, audits and waste reports never cross between companies, even on the same shared platform.",
  },
  {
    question: "What compliance standards does 360crd support?",
    answer:
      "Audit templates map to ISO 45001, ISO 14001 and OSHA out of the box, with support for your own internal safety policies alongside them. Templates support text, Yes/No and rating questions, with configurable frequency and threshold scoring.",
  },
  {
    question: "How does QR-linked waste tracking work?",
    answer:
      "Each site gets a QR code your crew scans to log a waste report — type, hazard level and photos included. From there it moves through a Verified → Collected → Disposed approval workflow, so there's a timestamped record from report to disposal.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "360crd is fully responsive and built mobile-first for field use — crews can scan QR codes, log incidents with photos, and complete inductions directly from a phone browser, no separate app install required.",
  },
  {
    question: "Can Managers add their own team members?",
    answer:
      "Yes, within the limits of your plan's user cap. Managers can invite Staff and Field Crew to their assigned sites, while Superadmins retain control over company-wide users, roles and permissions.",
  },
  {
    question: "What's the difference between Manager, Staff, and User roles?",
    answer:
      "Managers oversee their assigned sites — incidents, training, waste and audits for that scope. Staff handle day-to-day tasks like inspections and training. Field Crew (User) get a simplified, photo-first view built for reporting from the ground, not managing anything.",
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

function cardVariants(index: number, reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: Math.min(index, 3) * 0.06, ease: EASE },
    },
  };
}

function FaqCard({
  item,
  index,
  isOpen,
  onToggle,
  reduced,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants(index, reduced)}
      className={cn(
        "rounded-2xl border bg-white transition-colors dark:bg-slate-800",
        isOpen ? "border-violet/30" : "border-rule"
      )}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-trigger-${index}`}
          className="flex w-full items-start justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 sm:p-7"
        >
          <span className="flex min-w-0 items-baseline gap-3.5">
            <span className="shrink-0 font-mono text-sm font-semibold text-violet dark:text-sky">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
              {item.question}
            </span>
          </span>
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
              isOpen
                ? "border-violet bg-violet text-white"
                : "border-violet/40 text-violet dark:border-sky/40 dark:text-sky"
            )}
          >
            {isOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pl-[3.35rem] text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:px-7 sm:pb-7 sm:pl-[3.85rem]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const reduced = !!useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative snap-start bg-slate-50 py-20 dark:bg-slate-900 sm:py-24"
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
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]"
          >
            Questions worth asking before you sign up.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Straight answers, before your team commits to anything.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {FAQS.map((item, i) => (
            <FaqCard
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
              reduced={reduced}
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.15)}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 text-base"
        >
          <span className="text-slate-500 dark:text-slate-400">Still have questions?</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-semibold text-violet transition-colors hover:text-violet/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:text-sky dark:hover:text-sky/80"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
