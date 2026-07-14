"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 2 — calm "certifications & standards" plaque band directly below
 * the hero. Deliberately quieter than Section 1: no gradient mesh, no cards
 * with shadows at rest — hairline dividers only, muted-to-brand-color on
 * hover/in-view, natural content height (no 100vh).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const STANDARDS = [
  { name: "ISO 45001", descriptor: "Occupational health & safety management", color: "#2563eb" },
  { name: "ISO 14001", descriptor: "Environmental management systems", color: "#34d399" },
  { name: "OSHA", descriptor: "U.S. workplace safety compliance", color: "#f59e0b" },
  { name: "Factory Compliance", descriptor: "Facility & factory safety inspection", color: "#38bdf8" },
  { name: "Internal Safety Policy", descriptor: "Your own custom safety standards", color: "#1e40af" },
];

function dividerClass(index: number) {
  const md = index % 3 !== 0;
  const lg = index !== 0;
  return cn(
    "border-rule",
    md ? "md:border-l" : "md:border-l-0",
    lg ? "lg:border-l" : "lg:border-l-0"
  );
}

function tileVariants(index: number, reduced: boolean): Variants {
  return reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: index * 0.06, ease: EASE },
        },
      };
}

function GridTile({
  standard,
  index,
}: {
  standard: (typeof STANDARDS)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={tileVariants(index, !!reduced)}
      className={cn(
        "group flex flex-col items-center gap-3 px-4 py-6 text-center transition-all duration-150",
        "hover:-translate-y-0.5 hover:rounded-xl hover:bg-white hover:shadow-[0_16px_40px_-20px_rgba(37,99,235,0.35)]",
        "dark:hover:bg-slate-900 dark:hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)]",
        "lg:px-6",
        dividerClass(index)
      )}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-150 group-hover:scale-110"
        style={{ backgroundColor: `${standard.color}18`, color: standard.color }}
      >
        <BadgeCheck className="h-6 w-6" />
      </span>
      <p className="text-lg font-semibold text-slate-700 transition-colors duration-150 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white">
        {standard.name}
      </p>
      <p className="text-base text-slate-400 dark:text-slate-500">{standard.descriptor}</p>
    </motion.div>
  );
}

function MobileTile({
  standard,
  index,
  active,
}: {
  standard: (typeof STANDARDS)[number];
  index: number;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={tileVariants(index, !!reduced)}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl px-4 py-7 text-center transition-all duration-150",
        active &&
          "-translate-y-0.5 bg-white shadow-[0_16px_40px_-20px_rgba(37,99,235,0.35)] dark:bg-slate-900 dark:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)]"
      )}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-150"
        style={{
          backgroundColor: `${standard.color}${active ? "26" : "18"}`,
          color: standard.color,
          transform: active ? "scale(1.1)" : undefined,
        }}
      >
        <BadgeCheck className="h-6 w-6" />
      </span>
      <p
        className={cn(
          "text-lg font-semibold transition-colors duration-150",
          active ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-200"
        )}
      >
        {standard.name}
      </p>
      <p className="text-base text-slate-400 dark:text-slate-500">{standard.descriptor}</p>
    </motion.div>
  );
}

export default function ComplianceStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf = 0;
    const updateActive = () => {
      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const rect = child as HTMLElement;
        const center = rect.offsetLeft + rect.offsetWidth / 2;
        const distance = Math.abs(center - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      aria-labelledby="compliance-heading"
      className="relative snap-start overflow-hidden border-y border-rule bg-gradient-to-b from-blue-50/60 via-white to-white py-16 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-64 w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet/10 to-sky/10 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-base font-semibold uppercase tracking-[0.14em] text-violet dark:text-sky">
          Built around the standards you&apos;re audited on
        </p>
        <h2
          id="compliance-heading"
          className="mt-3 text-[28px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-[34px]"
        >
          Every audit template maps to a real standard.
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-10 hidden max-w-6xl px-4 sm:px-6 md:grid md:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {STANDARDS.map((standard, i) => (
          <GridTile key={standard.name} standard={standard} index={i} />
        ))}
      </div>

      <div className="relative z-10 mt-10 md:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-[10%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STANDARDS.map((standard, i) => (
            <div key={standard.name} className="w-[80%] shrink-0 snap-center">
              <MobileTile standard={standard} index={i} active={i === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
