"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";

/**
 * Light, top-accented testimonial cards — visually distinct from the dark
 * glass-panel TestimonialCarousel used across /features/*.
 *
 * TODO: replace with real customer testimonials. Every quote, name, and
 * title below is a placeholder — the component is fully built and
 * launch-ready, only the copy needs swapping once real customers exist.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    color: "#2563eb",
    role: "Safety & EHS Director",
    quote:
      "[PLACEHOLDER] I used to get a compliance snapshot once a quarter. Now I see every site's trend line, live, whenever I need it.",
    name: "[Customer Name]",
    title: "[Title], [Company]",
  },
  {
    color: "#0891b2",
    role: "Site & Operations Manager",
    quote:
      "[PLACEHOLDER] One dashboard replaced five spreadsheets and a group chat. My mornings look completely different now.",
    name: "[Customer Name]",
    title: "[Title], [Company]",
  },
  {
    color: "#059669",
    role: "Field Supervisor",
    quote:
      "[PLACEHOLDER] My crew reports an incident in under a minute from their own phones. No app to install, no paperwork to chase.",
    name: "[Customer Name]",
    title: "[Title], [Company]",
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

export default function SolutionsTestimonials() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="What teams say" className="relative bg-white py-20 dark:bg-slate-950 sm:py-24">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
            What Teams Say
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Three roles. Three reasons it clicks.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.role}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp(reduced, i * 0.1)}
              className="relative overflow-hidden rounded-2xl border border-rule bg-white p-7 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.25)] dark:bg-slate-900"
            >
              <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: t.color }} />
              <Quote className="h-7 w-7" style={{ color: t.color }} aria-hidden="true" />
              <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">{t.quote}</p>
              <div className="mt-6 border-t border-rule pt-5">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.title}</p>
                <span
                  className="mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ backgroundColor: `${t.color}1a`, color: t.color }}
                >
                  {t.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
