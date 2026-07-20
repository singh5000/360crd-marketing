"use client";

import { Quote, User } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Section 11 of the reusable inner-page template — 3 testimonial cards
 * shown at once (not a rotating single-quote carousel — an earlier pass
 * tried that per the original spec's "avoid a plain 3-card grid"
 * instruction, but direct feedback asked for all 3 visible at the same
 * time instead). Kept the dark gradient-mesh background from that
 * earlier version since it's still the right "signature dark moment"
 * register for this page — only the card-vs-carousel decision changed.
 *
 * PLACEHOLDER CONTENT: every quote/name/title passed in from
 * incidents/page.tsx is marked with its own TODO — no real customers
 * yet. The component itself is fully functional and launch-ready; only
 * the copy needs swapping once real testimonials exist.
 *
 * Avatar shows a plain silhouette icon rather than fabricated initials —
 * a placeholder name like "[Customer Name]" has no real initials to
 * derive, and inventing a plausible-looking pair (e.g. "JD") would
 * undercut the "obviously not real yet" intent.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export interface TestimonialCarouselProps {
  eyebrow: string;
  testimonials: Testimonial[];
}

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function cardVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function TestimonialCard({
  testimonial,
  reduced,
  delay,
}: {
  testimonial: Testimonial;
  reduced: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants(reduced, delay)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-white/20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]"
      />

      <Quote className="relative h-8 w-8 text-violet/40" aria-hidden="true" strokeWidth={1.5} />

      <blockquote className="relative mt-4 flex-1 text-[1.05rem] font-medium leading-relaxed text-white">
        {testimonial.quote}
      </blockquote>

      <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-sky shadow-[0_8px_20px_-6px_rgba(126,20,255,0.6)]"
        >
          <User className="h-5 w-5 text-white" strokeWidth={1.75} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold text-white">{testimonial.name}</span>
          <span className="block truncate text-xs text-slate-400">{testimonial.title}</span>
        </span>
      </figcaption>
    </motion.div>
  );
}

export default function TestimonialCarousel({ eyebrow, testimonials }: TestimonialCarouselProps) {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label={eyebrow}
      className="relative snap-start overflow-hidden bg-slate-950 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 50% 30%, black, transparent 70%)",
          color: "#ffffff",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet/25 to-sky/20 blur-[140px]"
        animate={reduced ? undefined : { x: ["-50%", "-46%", "-54%", "-50%"] }}
        transition={reduced ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-shell relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0)}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {eyebrow}
          </span>
        </motion.div>

        <div className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name + i} testimonial={testimonial} reduced={reduced} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
