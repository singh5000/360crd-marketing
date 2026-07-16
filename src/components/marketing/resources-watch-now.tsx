"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

/**
 * Resources (blog) index — Section 4, "Watch Now": 3 video cards. No real
 * video assets exist yet, so thumbnails are coded gradient compositions
 * with a headline overlay (same non-CMS placeholder approach as the rest
 * of this page) rather than real video stills.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Video = { headline: string; caption: string; gradient: string };

const VIDEOS: Video[] = [
  {
    headline: "Stop Incidents Before They Hit Your Timeline",
    caption: "Incident Reporting: Report From Any Site, Instantly",
    gradient: "from-slate-900 via-blue-950 to-slate-900",
  },
  {
    headline: "Why Multi-Site Contractors Are Going Digital",
    caption: "How Contractors Replace Paper Logs With Digital Records",
    gradient: "from-violet to-blue-900",
  },
  {
    headline: "Streamline Your Site Operations",
    caption: "Modernize & Scale Safety Operations with 360crd",
    gradient: "from-rose-600 to-slate-900",
  },
];

function fadeUp(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  };
}

function VideoCard({ video, reduced, delay }: { video: Video; reduced: boolean; delay: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp(reduced, delay)}>
      <Link href="/resources" className="group block focus-visible:outline-none">
        <div
          className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.3)] transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-sky ${video.gradient}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <p className="relative max-w-[16ch] text-xl font-extrabold leading-tight text-white sm:text-2xl">
            {video.headline}
          </p>
          <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-slate-900 text-slate-900" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-700 transition-colors group-hover:text-violet dark:text-slate-300 dark:group-hover:text-sky">
          {video.caption}
        </p>
      </Link>
    </motion.div>
  );
}

export default function ResourcesWatchNow() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-labelledby="watch-now-heading" className="relative bg-white py-10 dark:bg-slate-950 sm:py-14">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
            <h2 id="watch-now-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              Watch Now
            </h2>
          </div>
          <Link
            href="/resources"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-500 dark:text-amber-400"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.headline} video={video} reduced={reduced} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
