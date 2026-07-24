"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function fadeUp(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

export default function SolutionsCta() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Book a demo" className="relative overflow-hidden bg-gradient-to-br from-violet to-sky py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />

      <div className="section-shell relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0)}
          className="max-w-xl"
        >
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
            Ready to see your role&apos;s view?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            Book a 20-minute walkthrough and see the exact dashboard your
            team would get — director, manager, or crew.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0.1)}
          className="flex shrink-0 flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet"
          >
            Talk to Sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
