"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Database,
  FileCheck,
  Info,
  KeyRound,
  Lock,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section 7 — "Security & Data Protection". Deliberately dark in both themes:
 * a hub-and-spoke diagram — 6 defense layers feed one glowing Security Core,
 * which fans out to per-company isolated data columns. Connector lines are
 * computed from real measured DOM positions (not guessed percentages) so
 * they always attach exactly to the card edges regardless of content height.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const DEFENSE_LAYERS: { title: string; sub: string; icon: LucideIcon }[] = [
  { title: "JWT Authentication", sub: "Session security", icon: Lock },
  { title: "bcrypt Hashing", sub: "Password security", icon: KeyRound },
  { title: "Role-Based Access", sub: "Permission engine", icon: ShieldCheck },
  { title: "Helmet + CORS", sub: "Request hardening", icon: Settings },
  { title: "Prisma ORM", sub: "Injection-safe queries", icon: Database },
  { title: "Upload Validation", sub: "File security", icon: FileCheck },
];

const ALSO_ENFORCED = ["Company Isolation", "Environment Secrets"];

const CORE_FEATURES: { label: string; icon: LucideIcon }[] = [
  { label: "RBAC", icon: ShieldCheck },
  { label: "Encryption", icon: Lock },
  { label: "Isolation", icon: Users },
];

const COMPANIES: {
  name: string;
  records: string;
  accent: string;
  highlight?: string;
}[] = [
  { name: "Company A", records: "142 records", accent: "#e2e8f0" },
  { name: "Company B", records: "218 records", accent: "#7e14ff", highlight: "Users" },
  { name: "Company C", records: "87 records", accent: "#47bfff" },
];

const COMPANY_MODULES = ["Incidents", "Users", "Audits", "Waste Reports"];

type Point = { x: number; y: number };
type LineDef = { from: Point; to: Point };

function bezierPath({ from, to }: LineDef) {
  const midX = (from.x + to.x) / 2;
  return `M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`;
}

/**
 * Measures real element positions and derives connector line endpoints from
 * them, instead of guessing percentages against a tall/short mismatched pair
 * of columns. Re-measures on resize so the diagram never drifts.
 */
function useConnectorLines() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [leftLines, setLeftLines] = useState<LineDef[]>([]);
  const [rightLines, setRightLines] = useState<LineDef[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      const core = coreRef.current;
      if (!container || !core) return;

      const containerRect = container.getBoundingClientRect();
      const coreRect = core.getBoundingClientRect();
      if (containerRect.width === 0) return;

      const coreLeft = coreRect.left - containerRect.left;
      const coreRight = coreRect.right - containerRect.left;
      const coreTop = coreRect.top - containerRect.top;
      const coreHeight = coreRect.height;

      const nextLeft: LineDef[] = leftRefs.current.flatMap((el, i) => {
        if (!el) return [];
        const r = el.getBoundingClientRect();
        const from: Point = {
          x: r.right - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
        const to: Point = {
          x: coreLeft,
          y: coreTop + (coreHeight * (i + 0.5)) / leftRefs.current.length,
        };
        return [{ from, to }];
      });

      const nextRight: LineDef[] = rightRefs.current.flatMap((el, i) => {
        if (!el) return [];
        const r = el.getBoundingClientRect();
        const to: Point = {
          x: r.left - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
        const from: Point = {
          x: coreRight,
          y: coreTop + (coreHeight * (i + 0.5)) / rightRefs.current.length,
        };
        return [{ from, to }];
      });

      setLeftLines(nextLeft);
      setRightLines(nextRight);
      setSize({ width: containerRect.width, height: containerRect.height });
    }

    measure();

    // The measured cards run their own whileInView slide-in animation
    // (translateX via Framer Motion). getBoundingClientRect reflects that
    // transform, so a single measure-on-mount can capture a card mid-slide
    // and lock the connector onto an offset position. Re-measure on every
    // frame for a short settle window to catch the final resting position,
    // whenever that animation actually finishes.
    let rafId = 0;
    const settleUntil = performance.now() + 1600;
    function settleLoop(now: number) {
      measure();
      if (now < settleUntil) {
        rafId = requestAnimationFrame(settleLoop);
      }
    }
    rafId = requestAnimationFrame(settleLoop);

    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { containerRef, coreRef, leftRefs, rightRefs, leftLines, rightLines, size };
}

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function slideIn(reduced: boolean, delay: number, fromX: number): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } };
  }
  return {
    hidden: { opacity: 0, x: fromX },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, delay, ease: EASE } },
  };
}

function ConnectorLines({
  lines,
  reduced,
  pulseIndexes,
}: {
  lines: LineDef[];
  reduced: boolean;
  pulseIndexes: number[];
}) {
  return (
    <>
      {lines.map((line, i) => (
        <motion.path
          key={`line-${i}`}
          d={bezierPath(line)}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1.5}
          initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduced ? { duration: 0 } : { duration: 0.7, delay: 0.35 + i * 0.08, ease: "easeOut" }
          }
        />
      ))}
      {!reduced &&
        pulseIndexes.map((lineIndex, i) => {
          const line = lines[lineIndex];
          if (!line) return null;
          return (
            <motion.path
              key={`pulse-${lineIndex}`}
              d={bezierPath(line)}
              fill="none"
              stroke="#47bfff"
              strokeWidth={2.5}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="7 93"
              initial={{ strokeDashoffset: 100, opacity: 0 }}
              whileInView={{ strokeDashoffset: [100, 0], opacity: [0, 1, 1, 0.6] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                strokeDashoffset: {
                  duration: 2.6 + i * 0.5,
                  delay: 1.3 + i * 0.9,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: { duration: 1, delay: 1.3 + i * 0.9 },
              }}
            />
          );
        })}
      {lines.map((line, i) => (
        <g key={`dots-${i}`}>
          <circle cx={line.from.x} cy={line.from.y} r={2.5} fill="rgba(255,255,255,0.7)" />
          <circle cx={line.to.x} cy={line.to.y} r={2.5} fill="rgba(255,255,255,0.7)" />
        </g>
      ))}
    </>
  );
}

export default function SecurityCore() {
  const reduced = !!useReducedMotion();
  const { containerRef, coreRef, leftRefs, rightRefs, leftLines, rightLines, size } =
    useConnectorLines();

  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="relative snap-start overflow-hidden bg-[#070b15] py-20 sm:py-24"
    >
      {/* Ambient center glow behind the diagram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[150px]"
      />

      <div className="section-shell relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced)}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
            <Lock className="h-4 w-4 text-sky" aria-hidden="true" />
            Security &amp; Data Protection
          </span>
          <h2
            id="security-heading"
            className="mt-6 text-[30px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[44px]"
          >
            Every defense layer. One isolated core.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            No shared credentials, no cross-company leaks, no unvalidated
            uploads. Every request passes through the same hardened core
            before it ever touches your data.
          </p>
        </motion.div>

        {/* Diagram */}
        <div
          ref={containerRef}
          className="relative mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,30fr)_minmax(0,32fr)_minmax(0,38fr)] lg:items-center lg:gap-0"
        >
          {/* Connector overlay — real measured coordinates, so lines always
              touch the card edges exactly, regardless of column height. */}
          {size.width > 0 && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
              width={size.width}
              height={size.height}
              viewBox={`0 0 ${size.width} ${size.height}`}
            >
              <ConnectorLines lines={leftLines} reduced={reduced} pulseIndexes={[0, 2, 4]} />
              <ConnectorLines lines={rightLines} reduced={reduced} pulseIndexes={[1, 3]} />
            </svg>
          )}

          {/* Left — defense layers */}
          <div className="relative z-10 lg:pr-10">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp(reduced)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              6 Defense Layers
            </motion.p>
            <div className="mt-5 space-y-4">
              {DEFENSE_LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.title}
                  ref={(el) => {
                    leftRefs.current[i] = el;
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={slideIn(reduced, i * 0.06, -14)}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
                    <layer.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-base font-semibold text-white">
                      {layer.title}
                    </span>
                    <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {layer.sub}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp(reduced, 0.35)}
              className="mt-7"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Also Enforced
              </p>
              <div className="mt-3.5 flex flex-wrap gap-3">
                {ALSO_ENFORCED.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center — security core */}
          <div className="relative z-10 flex items-center justify-center py-6 lg:py-0">
            <motion.div
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 0.25, ease: EASE }}
              className="relative mx-auto w-full max-w-[320px]"
            >
              {/* Breathing glow */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-8 rounded-[36px] bg-gradient-to-br from-violet to-sky opacity-50 blur-3xl"
                animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
                transition={
                  reduced ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <div
                ref={coreRef}
                className="relative rounded-2xl bg-gradient-to-br from-violet to-sky p-6 shadow-[0_0_70px_-12px_rgba(126,20,255,0.7)] sm:p-7"
              >
                <p className="text-center text-xs font-bold uppercase tracking-[0.26em] text-white/75">
                  CRD360
                </p>
                <p className="mt-1.5 text-center text-[26px] font-extrabold tracking-tight text-white">
                  Security Core
                </p>
                <div className="mt-5 border-t border-white/25 pt-5">
                  <div className="grid grid-cols-3 gap-2">
                    {CORE_FEATURES.map((feature) => (
                      <span key={feature.label} className="flex flex-col items-center gap-2">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-white">{feature.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — isolated company data */}
          <div className="relative z-10 lg:pl-10">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp(reduced)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 lg:text-right"
            >
              Data Protected · By Company
            </motion.p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {COMPANIES.map((company, ci) => (
                <motion.div
                  key={company.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={slideIn(reduced, 0.3 + ci * 0.1, 14)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-center gap-2 px-1 pt-1">
                    <Lock
                      className="h-4 w-4 shrink-0"
                      style={{ color: company.accent }}
                      aria-hidden="true"
                    />
                    <p className="truncate text-base font-semibold text-white">{company.name}</p>
                  </div>
                  <span
                    className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${company.accent}1f`, color: company.accent }}
                  >
                    {company.records}
                  </span>
                  <div className="mt-4 space-y-2.5">
                    {COMPANY_MODULES.map((module, mi) => {
                      const isHighlight = company.highlight === module;
                      return (
                        <div
                          key={module}
                          ref={
                            ci === 0
                              ? (el) => {
                                  rightRefs.current[mi] = el;
                                }
                              : undefined
                          }
                          className={cn(
                            "relative flex items-center gap-2.5 rounded-lg border px-3 py-2.5",
                            isHighlight
                              ? "border-violet bg-violet/10"
                              : "border-white/10 bg-white/[0.04]"
                          )}
                        >
                          {isHighlight && (
                            <motion.span
                              aria-hidden="true"
                              className="absolute -inset-px rounded-lg ring-2 ring-violet/60"
                              animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                              transition={
                                reduced
                                  ? undefined
                                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                              }
                            />
                          )}
                          <Lock
                            className={cn(
                              "h-3.5 w-3.5 shrink-0",
                              isHighlight ? "text-sky" : "text-slate-400"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={cn(
                              "truncate text-sm font-medium",
                              isHighlight ? "text-white" : "text-slate-300"
                            )}
                          >
                            {module}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(reduced, 0.2)}
          className="mt-12 flex justify-center"
        >
          <p className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-400">
            <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
            Illustrative isolation. Company names and record counts are
            anonymized placeholders.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
