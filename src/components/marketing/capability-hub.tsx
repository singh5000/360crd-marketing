"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Section 6 of the reusable inner-page template — a radial hub-and-spoke
 * diagram for 6 genuinely independent/parallel capabilities (unlike
 * Section 5's StatusPipeline, where order matters). Desktop only by
 * design: the connector geometry (each line bends once from a card's
 * inner edge to the hub's edge) assumes a wide two-column layout, so
 * tablet/mobile fall back to a plain card grid with the hub shown once,
 * small, as a section marker rather than forcing the radial geometry
 * into a width it doesn't fit. Fully prop-driven like every other
 * section here — `capabilities` must be exactly 6 entries: [0..2] render
 * top-to-bottom on the left, [3..5] top-to-bottom on the right.
 *
 * Connector lines are plain CSS (dashed border on absolutely-positioned
 * divs, scaleX/scaleY draw-in) rather than SVG paths. An SVG version was
 * tried first — `preserveAspectRatio="none"` keeps axis-aligned paths
 * lined up with the CSS-grid-positioned cards regardless of container
 * width, but framer-motion's `pathLength` (stroke-dasharray/dashoffset
 * under the hood) computes length in the SVG's own user-unit space, which
 * doesn't track visual length under that same non-uniform scaling —
 * multi-segment bent paths (the top/bottom rows) reliably stopped short
 * of their real endpoint while the straight middle-row path rendered
 * fine. CSS borders don't have that failure mode, so every dot and line
 * segment here is a real DOM element positioned in undistorted percent
 * coordinates.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const HUB_DURATION = 0.4;
const LINE_DURATION = 0.25;
const STAGGER_STEP = 0.06;
const BASE_LINE_DELAY = 0.3;

// Interleaved left/right, top-to-bottom draw order for the connector lines.
const STAGGER_ORDER: Array<["left" | "right", number]> = [
  ["left", 0],
  ["right", 0],
  ["left", 1],
  ["right", 1],
  ["left", 2],
  ["right", 2],
];

// Row centers (percent) for a 3-row stack. Each connector reaches the same
// x (BEND_X) regardless of row, then meets the hub ring at a distinct y
// (HUB_FAN_Y) — a true right-angle bend (horizontal, then vertical) rather
// than a diagonal, and the 3 lines per side land on 3 different points of
// the ring instead of funneling into one spot.
const ROW_Y = [16.667, 50, 83.333];
const HUB_FAN_Y = [32, 50, 68];
const BEND_X = 85;

function connectorDelay(side: "left" | "right", row: number) {
  const index = STAGGER_ORDER.findIndex(([s, r]) => s === side && r === row);
  return BASE_LINE_DELAY + index * STAGGER_STEP;
}

export type Capability = {
  icon: ReactNode;
  /** Hex color, e.g. "#f59e0b" — one of 6 distinct hues, fixed per card. */
  color: string;
  title: string;
  description: string;
};

export interface CapabilityHubProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  hubIcon: ReactNode;
  /** Exactly 6 entries: [0..2] = left column top-to-bottom, [3..5] = right column top-to-bottom. */
  capabilities: Capability[];
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

function hubVariants(reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } };
  }
  return {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: HUB_DURATION, ease: EASE } },
  };
}

function scaleXVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { scaleX: 1 }, show: { scaleX: 1 } };
  }
  return {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: LINE_DURATION, delay, ease: "easeOut" } },
  };
}

function scaleYVariants(reduced: boolean, delay: number): Variants {
  if (reduced) {
    return { hidden: { scaleY: 1 }, show: { scaleY: 1 } };
  }
  return {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: LINE_DURATION * 0.7, delay, ease: "easeOut" } },
  };
}

function cardVariants(reduced: boolean, delay: number, fromLeft: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } };
  }
  return {
    hidden: { opacity: 0, x: fromLeft ? -20 : 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, delay, ease: EASE } },
  };
}

function Hub({ icon, reduced }: { icon: ReactNode; reduced: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={hubVariants(reduced)}
      className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet/15 lg:h-28 lg:w-28"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet to-sky text-white shadow-[0_16px_36px_-12px_rgba(126,20,255,0.55)] [&_svg]:h-8 [&_svg]:w-8 lg:h-20 lg:w-20">
        {icon}
      </span>
    </motion.div>
  );
}

function CapabilityCard({
  cap,
  reduced,
  delay,
  fromLeft,
  className,
}: {
  cap: Capability;
  reduced: boolean;
  delay: number;
  fromLeft: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants(reduced, delay, fromLeft)}
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]",
        className
      )}
      style={{ borderColor: `${cap.color}30` }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl [&_svg]:h-5 [&_svg]:w-5"
        style={{ backgroundColor: `${cap.color}1f`, color: cap.color }}
      >
        {cap.icon}
      </span>
      <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 dark:text-white">{cap.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{cap.description}</p>
    </motion.div>
  );
}

function ConnectorSide({
  side,
  capabilities,
  reduced,
}: {
  side: "left" | "right";
  capabilities: Capability[];
  reduced: boolean;
}) {
  // Every position below is expressed as `left` (percent from the left
  // edge of this cell) — never `right` — so left and right sides run
  // through identical math with only cardX/bendX flipped. Mixing left-
  // and right-anchored boxes for the same shape is what caused the right
  // side's zero-width bordered bars to land slightly off from their dots.
  const isLeftSide = side === "left";
  const cardX = isLeftSide ? 0 : 100;
  const bendX = isLeftSide ? BEND_X : 100 - BEND_X;
  const barLeft = Math.min(cardX, bendX);
  const barWidth = Math.abs(bendX - cardX);

  return (
    <>
      {capabilities.map((cap, i) => {
        const cardY = ROW_Y[i];
        const hubY = HUB_FAN_Y[i];
        const delay = connectorDelay(side, i);
        const bends = cardY !== hubY;

        return (
          <div key={cap.title}>
            {/* horizontal run from the card edge to the bend point */}
            <motion.span
              aria-hidden="true"
              className="absolute h-0 border-t-2 border-dashed"
              style={{
                left: `${barLeft}%`,
                top: `${cardY}%`,
                width: `${barWidth}%`,
                borderColor: cap.color,
                transformOrigin: isLeftSide ? "left" : "right",
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={scaleXVariants(reduced, delay)}
            />
            {/* vertical run from the bend point to the hub-facing dot, only
                when this row doesn't already line up with the hub's fan-out y */}
            {bends && (
              <motion.span
                aria-hidden="true"
                className="absolute w-0 border-l-2 border-dashed"
                style={{
                  left: `${bendX}%`,
                  top: `${Math.min(cardY, hubY)}%`,
                  height: `${Math.abs(hubY - cardY)}%`,
                  borderColor: cap.color,
                  transformOrigin: cardY < hubY ? "top" : "bottom",
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={scaleYVariants(reduced, delay + LINE_DURATION * 0.8)}
              />
            )}
          </div>
        );
      })}

      {capabilities.map((cap, i) => (
        <span
          key={cap.title}
          aria-hidden="true"
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${cardX}%`, top: `${ROW_Y[i]}%`, backgroundColor: cap.color }}
        />
      ))}
      {capabilities.map((cap, i) => (
        <span
          key={`${cap.title}-hub`}
          aria-hidden="true"
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-300 bg-white dark:border-violet/50 dark:bg-slate-900"
          style={{ left: `${bendX}%`, top: `${HUB_FAN_Y[i]}%` }}
        />
      ))}
    </>
  );
}

function SimpleCard({ cap }: { cap: Capability }) {
  return (
    <div
      className="rounded-2xl border bg-white p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.2)] dark:bg-slate-800 dark:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.5)]"
      style={{ borderColor: `${cap.color}30` }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl [&_svg]:h-5 [&_svg]:w-5"
        style={{ backgroundColor: `${cap.color}1f`, color: cap.color }}
      >
        {cap.icon}
      </span>
      <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 dark:text-white">{cap.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{cap.description}</p>
    </div>
  );
}

export default function CapabilityHub({ eyebrow, heading, subhead, hubIcon, capabilities }: CapabilityHubProps) {
  const reduced = !!useReducedMotion();
  const left = capabilities.slice(0, 3);
  const right = capabilities.slice(3, 6);

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
          <span className="inline-flex items-center gap-2 rounded-full bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet dark:bg-white/5 dark:text-sky">
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subhead}</p>
        </motion.div>

        {/* Desktop: full radial hub-and-spoke */}
        <div className="mx-auto mt-16 hidden max-w-[1400px] lg:grid lg:grid-cols-[1fr_100px_auto_100px_1fr] lg:grid-rows-3 lg:items-stretch">
          {left.map((cap, i) => (
            <div key={cap.title} style={{ gridColumn: 1, gridRow: i + 1 }} className="py-4">
              <CapabilityCard cap={cap} reduced={reduced} delay={connectorDelay("left", i) + LINE_DURATION} fromLeft />
            </div>
          ))}

          <div style={{ gridColumn: 2, gridRow: "1 / -1" }} className="relative">
            <ConnectorSide side="left" capabilities={left} reduced={reduced} />
          </div>

          <div style={{ gridColumn: 3, gridRow: "1 / -1" }} className="flex items-center justify-center">
            <Hub icon={hubIcon} reduced={reduced} />
          </div>

          <div style={{ gridColumn: 4, gridRow: "1 / -1" }} className="relative">
            <ConnectorSide side="right" capabilities={right} reduced={reduced} />
          </div>

          {right.map((cap, i) => (
            <div key={cap.title} style={{ gridColumn: 5, gridRow: i + 1 }} className="py-4">
              <CapabilityCard
                cap={cap}
                reduced={reduced}
                delay={connectorDelay("right", i) + LINE_DURATION}
                fromLeft={false}
              />
            </div>
          ))}
        </div>

        {/* Tablet + mobile: hub as a small marker, plain card grid — the
            radial connector geometry doesn't translate to narrower widths. */}
        <div className="mt-12 lg:hidden">
          <div className="mb-8 flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet to-sky text-white shadow-[0_12px_28px_-10px_rgba(126,20,255,0.55)] [&_svg]:h-6 [&_svg]:w-6">
              {hubIcon}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {capabilities.map((cap) => (
              <SimpleCard key={cap.title} cap={cap} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
