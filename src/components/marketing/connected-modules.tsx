"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Section 9 of the reusable inner-page template — 4 cards showing how
 * this module's data quietly feeds other CRD360 modules, reinforcing the
 * "one platform" story at the individual feature-page level. Cards are
 * purely informational (no link/href in the `connections` shape) —
 * unlike Section 7's RoleCards, there's nowhere for these to send someone,
 * so they stay static divs with a hover response rather than links.
 *
 * The connector line is real SVG with `strokeDashoffset` for the flow
 * animation, safe here in a way the Section 6 hub's bent connectors
 * weren't: this is a single straight horizontal line, so the non-uniform
 * viewBox scaling that broke multi-segment paths there doesn't apply —
 * a horizontal line stays a horizontal line regardless of x/y scale.
 *
 * Copy is deliberately phrased as data relationships ("feeds", "flags",
 * "links to"), never "automatically creates" — these describe how data
 * connects across modules, not a triggered automation that may not exist.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const DASH_CYCLE = 14; // matches strokeDasharray "8 6" (8 + 6)

export type ModuleConnection = {
  sourceIcon: ReactNode;
  sourceColor: string;
  targetIcon: ReactNode;
  targetColor: string;
  title: string;
  body: string;
};

export interface ConnectedModulesProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  connections: ModuleConnection[];
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
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease: EASE } },
  };
}

function IconCircle({ color, icon }: { color: string; icon: ReactNode }) {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full [&_svg]:h-5 [&_svg]:w-5"
      style={{ backgroundColor: `${color}1f`, color }}
    >
      {icon}
    </span>
  );
}

function Connector({
  targetColor,
  reduced,
  revealDelay,
}: {
  targetColor: string;
  reduced: boolean;
  revealDelay: number;
}) {
  const lineVariants: Variants = reduced
    ? { hidden: { strokeDashoffset: 0 }, show: { strokeDashoffset: 0 } }
    : {
        hidden: { strokeDashoffset: 0 },
        show: {
          strokeDashoffset: -DASH_CYCLE,
          transition: { duration: 0.7, delay: revealDelay, ease: "easeInOut" },
        },
      };

  const hoverAnimation = reduced
    ? { stroke: targetColor, transition: { duration: 0.2 } }
    : {
        strokeDashoffset: -DASH_CYCLE,
        transition: { strokeDashoffset: { duration: 0.7, repeat: Infinity, ease: "linear" } },
      };

  return (
    <div className="relative mx-1 h-4 flex-1">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,10 L100,10"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={2}
          strokeDasharray="8 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial="hidden"
          whileInView="show"
          whileHover={hoverAnimation}
          viewport={{ once: true, amount: 0.5 }}
          variants={lineVariants}
        />
      </svg>
    </div>
  );
}

function ConnectionCard({
  connection,
  reduced,
  delay,
}: {
  connection: ModuleConnection;
  reduced: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants(reduced, delay)}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-slate-800 dark:shadow-[0_12px_32px_-24px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center">
        <IconCircle color={connection.sourceColor} icon={connection.sourceIcon} />
        <Connector targetColor={connection.targetColor} reduced={reduced} revealDelay={delay + 0.35} />
        <ChevronRight
          className="h-4 w-4 shrink-0"
          style={{ color: connection.targetColor }}
          aria-hidden="true"
        />
        <span className="ml-1">
          <IconCircle color={connection.targetColor} icon={connection.targetIcon} />
        </span>
      </div>

      <h3 className="mt-5 text-[1.1rem] font-bold leading-snug text-slate-900 dark:text-white">
        {connection.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{connection.body}</p>
    </motion.div>
  );
}

export default function ConnectedModules({ eyebrow, heading, subhead, connections }: ConnectedModulesProps) {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label={eyebrow} className="relative snap-start overflow-hidden bg-slate-50 py-20 dark:bg-slate-900 sm:py-24">
      <div className="section-shell relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp(reduced, 0)}
          className="mx-auto max-w-[640px] text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subhead}</p>
        </motion.div>

        <div className="mx-auto mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {connections.map((connection, i) => (
            <ConnectionCard key={connection.title} connection={connection} reduced={reduced} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
