"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  Recycle,
  ShieldCheck,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/hooks/use-scroll-lock";

/**
 * Section 8 — "Industry solutions" numbered auto-advancing accordion. Real
 * CRD360 capabilities contextualized per Site.type, not industry-exclusive
 * features. Desktop gets the full scroll-lock + autoplay + progress-bar
 * treatment; tablet keeps autoplay but never locks scroll (scroll-jacking is
 * unreliable at that width); mobile is a deliberately plain tap accordion —
 * see the MobileAccordion component below.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const ITEM_DURATION_MS = 4500;

const INDUSTRIES: { title: string; capabilities: [string, string, string, string] }[] = [
  {
    title: "Construction & Renovation",
    capabilities: [
      "Incident Reporting for Active Job Sites",
      "QR-Tagged Waste Tracking per Site",
      "Multi-Crew Site Inductions",
      "ISO 45001-Mapped Safety Audits",
    ],
  },
  {
    title: "Manufacturing",
    capabilities: [
      "Machinery & Equipment Asset Tracking",
      "PPE Compliance by Work Zone",
      "Recurring Safety Audit Scheduling",
      "Incident Root-Cause Investigation",
    ],
  },
  {
    title: "Commercial & Office Fit-Outs",
    capabilities: [
      "Contractor Site Inductions",
      "Fire Safety & Equipment Audits",
      "Asset & Tool Inventory per Site",
      "Multi-Site Manager Rollups",
    ],
  },
  {
    title: "Warehousing",
    capabilities: [
      "Hazardous Waste Classification",
      "Forklift & Vehicle Inspection Audits",
      "PPE Tracking Across Shifts",
      "Incident Timeline & Evidence Capture",
    ],
  },
  {
    title: "Mining",
    capabilities: [
      "Critical-Hazard Incident Escalation",
      "Environmental Compliance (ISO 14001)",
      "Site-Specific Induction Requirements",
      "Asset & Machinery Safety Checks",
    ],
  },
  // The 5 below extend the same pattern as the site-type set above — real
  // CRD360 modules (incidents, PPE, inductions, audits, assets,
  // environmental compliance) contextualized to more site types, not new
  // invented capabilities.
  {
    title: "Healthcare & Facilities",
    capabilities: [
      "Infection-Control Incident Reporting",
      "Clinical-Zone PPE Compliance",
      "Contractor & Vendor Inductions",
      "Recurring Facility Safety Audits",
    ],
  },
  {
    title: "Retail & Hospitality",
    capabilities: [
      "Customer-Area Incident Reporting",
      "Fire Safety & Equipment Audits",
      "Vendor & Contractor Site Inductions",
      "Asset Tracking for Store Equipment",
    ],
  },
  {
    title: "Energy & Utilities",
    capabilities: [
      "High-Voltage Work Incident Escalation",
      "Environmental Compliance (ISO 14001)",
      "Permit-to-Work Site Inductions",
      "Asset & Equipment Safety Checks",
    ],
  },
  {
    title: "Logistics & Transportation",
    capabilities: [
      "Fleet & Vehicle Inspection Audits",
      "Driver & Yard Crew Inductions",
      "Incident Timeline for Transit Accidents",
      "PPE Tracking Across Depots",
    ],
  },
  {
    title: "Education & Campus Facilities",
    capabilities: [
      "Visitor & Contractor Inductions",
      "Campus-Wide Incident Reporting",
      "Fire & Emergency Equipment Audits",
      "Multi-Building Asset Tracking",
    ],
  },
  {
    title: "Oil & Gas",
    capabilities: [
      "Permit-to-Work Incident Escalation",
      "Environmental & Spill Compliance Audits",
      "High-Risk Site Inductions",
      "Critical Asset Integrity Checks",
    ],
  },
  {
    title: "Agriculture & Farming",
    capabilities: [
      "Machinery & Equipment Safety Checks",
      "Seasonal Worker Inductions",
      "Chemical & Waste Handling Audits",
      "Incident Reporting Across Remote Sites",
    ],
  },
  {
    title: "Telecommunications & Infrastructure",
    capabilities: [
      "Tower & Site Access Inductions",
      "Working-at-Height Incident Reporting",
      "Recurring Infrastructure Audits",
      "Field Crew Asset Tracking",
    ],
  },
  {
    title: "Government & Public Works",
    capabilities: [
      "Multi-Agency Contractor Inductions",
      "Public Works Incident Reporting",
      "Compliance Audits (ISO 45001 / OSHA)",
      "Asset Tracking Across Departments",
    ],
  },
  {
    title: "Data Centers & Critical Facilities",
    capabilities: [
      "Restricted-Access Site Inductions",
      "Environmental & Uptime Compliance Audits",
      "Critical Incident Escalation",
      "Facility Asset & Equipment Tracking",
    ],
  },
];

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  // Defaults to "desktop" for the SSR/first-paint render, matching this
  // codebase's existing pattern (e.g. Nav's theme detection) of resolving
  // the real value client-side rather than blocking on it.
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setBp("desktop");
      else if (window.innerWidth >= 768) setBp("tablet");
      else setBp("mobile");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

/**
 * Drives the active item + its progress (0-1) on a single persistent rAF
 * loop, reading mutable state through refs so the effect itself only
 * restarts when `enabled` changes — not on every tick or index change.
 */
function useAutoplayAccordion(itemCount: number, enabled: boolean, onComplete: () => void) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeIndexRef = useRef(activeIndex);
  const pausedRef = useRef(false);
  const doneRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep refs in sync with the latest render's values from inside effects
  // (never during render itself) so the tick loop below can read current
  // state without needing to restart on every change.
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const goToIndex = useCallback((index: number) => {
    elapsedRef.current = 0;
    lastTsRef.current = null;
    doneRef.current = false;
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const setPaused = useCallback((value: boolean) => {
    pausedRef.current = value;
    if (!value) lastTsRef.current = null; // resume cleanly without a time jump
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function tick(ts: number) {
      if (!doneRef.current && !pausedRef.current) {
        if (lastTsRef.current !== null) {
          elapsedRef.current += ts - lastTsRef.current;
        }
        lastTsRef.current = ts;
        const pct = Math.min(1, elapsedRef.current / ITEM_DURATION_MS);
        setProgress(pct);
        if (pct >= 1) {
          if (activeIndexRef.current >= itemCount - 1) {
            doneRef.current = true;
            onCompleteRef.current();
          } else {
            elapsedRef.current = 0;
            lastTsRef.current = null;
            setActiveIndex((i) => i + 1);
            setProgress(0);
          }
        }
      } else {
        lastTsRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [enabled, itemCount]);

  return { activeIndex, progress, goToIndex, setPaused };
}

const CTA_MODULES: { label: string; icon: LucideIcon }[] = [
  { label: "Incidents", icon: TriangleAlert },
  { label: "Waste", icon: Recycle },
  { label: "Training", icon: GraduationCap },
  { label: "Audits", icon: ClipboardCheck },
];

const CTA_STATS: { label: string; value: string }[] = [
  { label: "Compliance Score", value: "92%" },
  { label: "Companies", value: "24" },
  { label: "Active Incidents", value: "37" },
];

function DemoCTACard() {
  return (
    <div className="relative mt-10 min-h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet to-sky">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative flex h-full flex-col p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <ShieldCheck className="h-5.5 w-5.5 text-white" aria-hidden="true" />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            Live on 156 sites
          </span>
        </div>

        {/* A glimpse of the real product's module rail */}
        <div className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
          {CTA_MODULES.map((m) => (
            <span
              key={m.label}
              className="flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm"
            >
              <m.icon className="h-3.5 w-3.5" />
              {m.label}
            </span>
          ))}
        </div>

        {/* Live stat strip, matching the numbers shown in the Superadmin view above */}
        <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
          {CTA_STATS.map((s) => (
            <div key={s.label} className="rounded-lg bg-white/10 px-3 py-2.5">
              <p className="text-lg font-extrabold leading-none text-white">{s.value}</p>
              <p className="mt-1.5 truncate text-[11px] text-white/70">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <p className="text-2xl font-bold leading-snug text-white">
            See CRD360 running on a site like yours.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Book a 20-minute walkthrough built around your own site type and
            workflows.
          </p>
          <Link
            href="/demo"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-violet transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CapabilityGrid({ capabilities }: { capabilities: readonly string[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 pb-7 pt-1 sm:grid-cols-2">
      {capabilities.map((cap, i) => (
        <motion.div
          key={cap}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-700 dark:bg-slate-800/60"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
            aria-hidden="true"
          />
          <span className="text-[15px] leading-snug text-slate-700 dark:text-slate-200">
            {cap}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** Desktop (two-column, sticky heading, scroll-lock) and tablet (stacked,
 * no scroll-lock) share this one interactive, autoplaying accordion — they
 * only differ in layout (responsive classes) and whether scroll-lock runs. */
function InteractiveAccordion({
  breakpoint,
  reduced,
}: {
  breakpoint: Breakpoint;
  reduced: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const [locked, setLocked] = useState(false);

  const autoplayEnabled = !reduced;
  const handleCycleComplete = useCallback(() => setLocked(false), []);
  const { activeIndex, progress, goToIndex, setPaused } = useAutoplayAccordion(
    INDUSTRIES.length,
    autoplayEnabled,
    handleCycleComplete
  );

  const scrollLockEnabled = breakpoint === "desktop" && !reduced;
  useScrollLock(locked && scrollLockEnabled);

  // Trigger once: when the section's top edge reaches the viewport's top
  // edge (a squished rootMargin turns the observer into a line at the top).
  useEffect(() => {
    if (!scrollLockEnabled) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setLocked(true);
        }
      },
      { rootMargin: "0px 0px -100% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollLockEnabled]);

  // Escape hatch: never hard-trap. Two scroll/touch attempts while locked
  // releases immediately, regardless of which item is playing.
  useEffect(() => {
    if (!locked) return;
    let attempts = 0;
    const release = () => {
      attempts += 1;
      if (attempts >= 2) setLocked(false);
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    return () => {
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
    };
  }, [locked]);

  const showProgressUI = breakpoint !== "mobile";

  return (
    <section
      ref={sectionRef}
      id="industry-solutions"
      aria-labelledby="industry-solutions-heading"
      className="relative snap-start bg-white py-20 dark:bg-slate-900 sm:py-24"
    >
      <div className="section-shell">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <h2
              id="industry-solutions-heading"
              className="text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]"
            >
              Safety solutions built around your site&apos;s reality.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Construction, manufacturing, warehousing, mining — every site
              type carries different risks. CRD360&apos;s core modules adapt
              to what your team actually deals with, without needing a
              different tool for each one.
            </p>
            <DemoCTACard />
          </div>

          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {INDUSTRIES.map((industry, i) => {
                const isActive = i === activeIndex;
                return (
                  <div key={industry.title}>
                    <h3 className="m-0">
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={`industry-panel-${i}`}
                        id={`industry-trigger-${i}`}
                        onClick={() => goToIndex(i)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                      >
                        <span className="flex min-w-0 items-center gap-4">
                          <span className="font-mono text-sm text-slate-400 dark:text-slate-500">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "truncate text-lg transition-colors",
                              isActive
                                ? "font-bold text-slate-950 dark:text-white"
                                : "font-medium text-slate-600 dark:text-slate-300"
                            )}
                          >
                            {industry.title}
                          </span>
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                            isActive && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    {showProgressUI && (
                      <div
                        aria-hidden="true"
                        className="relative -mt-px h-[2px] overflow-hidden bg-slate-200 dark:bg-slate-700"
                      >
                        {isActive &&
                          (reduced ? (
                            <div className="h-full w-full bg-violet" />
                          ) : (
                            <div
                              className="h-full bg-violet"
                              style={{ width: `${progress * 100}%` }}
                            />
                          ))}
                      </div>
                    )}

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`industry-panel-${i}`}
                          role="region"
                          aria-labelledby={`industry-trigger-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <CapabilityGrid capabilities={industry.capabilities} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {showProgressUI && (
              <div className="mt-7 flex items-center justify-center gap-2.5">
                {INDUSTRIES.map((industry, i) => (
                  <span
                    key={industry.title}
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2 rounded-full border transition-colors duration-200",
                      i < activeIndex && "border-violet bg-violet",
                      i === activeIndex && "border-violet bg-violet ring-2 ring-violet/25",
                      i > activeIndex && "border-slate-300 bg-transparent dark:border-slate-600"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mobile: deliberately simplified — plain tap accordion, no autoplay, no
 * progress bar, no scroll lock. Tap the open item to close it entirely. */
function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="industry-solutions"
      aria-labelledby="industry-solutions-heading-mobile"
      className="relative snap-start bg-white py-20 dark:bg-slate-900"
    >
      <div className="section-shell">
        <h2
          id="industry-solutions-heading-mobile"
          className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white"
        >
          Safety solutions built around your site&apos;s reality.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Construction, manufacturing, warehousing, mining — every site type
          carries different risks. CRD360&apos;s core modules adapt to what
          your team actually deals with, without needing a different tool for
          each one.
        </p>
        <DemoCTACard />

        <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-700">
          {INDUSTRIES.map((industry, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={industry.title}>
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`industry-panel-mobile-${i}`}
                    id={`industry-trigger-mobile-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="font-mono text-sm text-slate-400 dark:text-slate-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "truncate text-base",
                          isOpen
                            ? "font-bold text-slate-950 dark:text-white"
                            : "font-medium text-slate-600 dark:text-slate-300"
                        )}
                      >
                        {industry.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`industry-panel-mobile-${i}`}
                      role="region"
                      aria-labelledby={`industry-trigger-mobile-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <CapabilityGrid capabilities={industry.capabilities} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function IndustrySolutions() {
  const reduced = !!useReducedMotion();
  const breakpoint = useBreakpoint();

  if (breakpoint === "mobile") {
    return <MobileAccordion />;
  }
  return <InteractiveAccordion breakpoint={breakpoint} reduced={reduced} />;
}
