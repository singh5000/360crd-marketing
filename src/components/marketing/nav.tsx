"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Moon, Sun, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

type Theme = "light" | "dark";

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleTheme = useCallback(() => {
    const next: Theme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("crd360-theme", next);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[76px] border-b md:h-20",
        "transition-colors duration-200 ease-out",
        scrolled
          ? "border-rule bg-white/75 backdrop-blur-xl dark:bg-slate-950/75"
          : "border-transparent bg-transparent backdrop-blur-0"
      )}
    >
      <nav
        aria-label="Primary"
        className="flex h-full w-full items-center justify-between px-4 sm:px-8 lg:px-12 min-[1400px]:px-[30px]!"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
          aria-label="CRD360 home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-sky shadow-[0_0_20px_-6px_var(--sky)]">
            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            CRD360
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-sm text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>

          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-300 dark:hover:text-white"
          >
            Log in
          </Link>

          <Link
            href="/demo"
            className="rounded-md bg-violet px-4 py-2 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_28px_-6px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
          >
            Book a Demo
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/demo"
            className="rounded-md bg-violet px-3 py-1.5 text-sm font-semibold text-white"
          >
            Book a Demo
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full border-b border-rule bg-white/95 backdrop-blur-xl dark:bg-slate-950/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 flex items-center justify-between gap-2 border-t border-rule pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block flex-1 rounded-md px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-200 dark:hover:bg-white/5"
                >
                  Log in
                </Link>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {theme === "dark" ? (
                    <Sun className="h-[18px] w-[18px]" />
                  ) : (
                    <Moon className="h-[18px] w-[18px]" />
                  )}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
