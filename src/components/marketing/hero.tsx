"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import DashboardPreview from "./dashboard-preview";

const EASE = [0.16, 1, 0.3, 1] as const;

function useEntranceScrollLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      body.style.overflow = previousOverflow;
    }, 700);
    return () => {
      window.clearTimeout(timer);
      body.style.overflow = previousOverflow;
    };
  }, [enabled]);
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  useEntranceScrollLock(!prefersReducedMotion);

  const fadeUp = (delaySeconds: number): Variants =>
    prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.3, delay: 0 } },
        }
      : {
          hidden: { opacity: 0, y: 12 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: delaySeconds, ease: EASE },
          },
        };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen snap-start flex-col bg-white pt-[126px] pb-10 dark:bg-slate-950 md:pt-[130px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          color: "var(--foreground)",
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[6%] h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-violet/15 blur-[130px] dark:bg-violet/25"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: ["-50%", "-46%", "-54%", "-50%"] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-[-6%] right-[8%] h-[380px] w-[380px] rounded-full bg-sky/15 blur-[110px] dark:bg-sky/20"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, -10, 10, 0], y: [0, 10, -10, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] flex-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,36fr)_minmax(0,64fr)] lg:gap-8 lg:px-10 xl:gap-10 xl:px-16 min-[1400px]:max-w-none min-[1400px]:px-[150px]!">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp(0)}
            className="mb-5 inline-flex items-center gap-2 self-center rounded-full border border-rule bg-slate-900/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet backdrop-blur-sm dark:bg-white/5 dark:text-sky lg:self-start"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Construction &amp; Renovation Safety Platform
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp(0.08)}
            className="mb-5 max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-6xl"
          >
            Run{" "}
            <span className="bg-gradient-to-r from-violet to-sky bg-clip-text text-transparent">
              site safety
            </span>{" "}
            like software - not paperwork.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp(0.16)}
            className="mb-8 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            360crd gives Superadmins, Managers, Staff and Field Crews one
            connected platform - incidents, waste, training, inductions,
            PPE, assets and ISO 45001 / ISO 14001 / OSHA-ready audits -
            instead of four disconnected tools.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp(0.24)}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-violet px-6 py-3.5 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_32px_-8px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#platform"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-rule bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Explore the Platform
            </Link>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp(0.24)}
            className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm lg:justify-start"
          >
            ISO 45001 · ISO 14001 · OSHA-aligned audits built in
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center justify-center pb-6 sm:pb-8 lg:justify-end lg:pb-0">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
