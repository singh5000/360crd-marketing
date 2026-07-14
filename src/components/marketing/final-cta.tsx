"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

/**
 * Section 11 — closing full-bleed CTA banner. Background photo is a real,
 * openly-licensed image (CC BY 4.0, Daniel Mekis via Wikimedia Commons —
 * see the credit line at the bottom of the section, required by the
 * license), not a coded placeholder. Swap /public/images/cta-construction-
 * site.jpg for real CRD360 site photography when available and this
 * component needs no other changes.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

export default function FinalCTA() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="get-started"
      aria-labelledby="final-cta-heading"
      className="relative flex min-h-[560px] snap-start items-center overflow-hidden sm:min-h-[640px]"
    >
      <Image
        src="/images/cta-construction-site.jpg"
        alt="Construction workers reviewing safety plans on an active job site"
        fill
        priority={false}
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/92"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent"
      />

      <div className="section-shell relative z-10 w-full">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(reduced)}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-sky" aria-hidden="true" />
            Ready when you are
          </span>

          <h2
            id="final-cta-heading"
            className="mt-6 text-[32px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[44px]"
          >
            Ready to run your sites like software?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Book a 20-minute walkthrough and see CRD360 running on a site
            like yours — incidents, waste, training and audits, all in one
            place.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-violet px-7 py-3.5 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_32px_-8px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Required by the CC BY 4.0 license on the background photo. */}
      <a
        href="https://commons.wikimedia.org/wiki/File:Construction_Photography_of_Workers_on_Site_by_Construction_Photographer_Daniel_Mekis.jpg"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-4 z-10 text-[10px] text-white/45 transition-colors hover:text-white/70"
      >
        Photo: Daniel Mekis / Wikimedia Commons, CC BY 4.0
      </a>
    </section>
  );
}
