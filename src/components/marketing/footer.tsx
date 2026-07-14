"use client";

import { useEffect, useState, type SVGProps } from "react";
import Link from "next/link";
import { ArrowUp, Mail, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Site-wide mega footer — every real route this build links to (features,
 * solutions, pricing, blog, demo/sales, legal) organized into columns, plus
 * a brand block, newsletter signup and a back-to-top button. Deliberately
 * omits a physical-office-locations row (unlike the reference layout) since
 * no real CRD360 office addresses exist to put there — inventing specific
 * street addresses would be worse than leaving it out.
 *
 * lucide-react has no brand/social logos (by design, to avoid trademark
 * issues), so the 3 social icons below are small hand-authored SVGs, not a
 * violation of the site's "icons: lucide-react only" rule for general UI.
 */

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.6l-5.2-6.8L5.3 22H2l8.1-9.3L1 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.6v1.7h.05c.5-.95 1.75-1.95 3.6-1.95 3.85 0 4.55 2.5 4.55 5.85V21h-4v-5.4c0-1.3-.02-3-1.85-3-1.85 0-2.15 1.4-2.15 2.9V21h-4V9Z" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
    </svg>
  );
}

// TODO: point these at CRD360's real social profiles once they exist.
const SOCIALS: { label: string; icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element }[] = [
  { label: "LinkedIn", icon: LinkedInIcon },
  { label: "X", icon: XIcon },
  { label: "YouTube", icon: YouTubeIcon },
];

type FooterLink = { label: string; href: string };
type FooterGroup = { heading?: string; links: FooterLink[] };
type FooterColumn = { title: string; groups: FooterGroup[] };

// Full site IA as specced — every column/link below maps to a real planned
// route (features/solutions/industries/trust/company/resources), not a
// guessed one. "Start Free Trial" is included per spec even though it's
// flagged as pending a GTM decision — remove if that decision goes the
// other way.
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Get Started",
    groups: [
      {
        links: [
          { label: "Platform Overview", href: "/platform" },
          { label: "Pricing", href: "/pricing" },
          { label: "Book a Demo", href: "/demo" },
          { label: "Start Free Trial", href: "/trial" },
        ],
      },
    ],
  },
  {
    title: "Platform",
    groups: [
      {
        links: [
          { label: "Features Hub", href: "/features" },
          { label: "Incident Management", href: "/features/incidents" },
          { label: "Waste Management & QR Tracking", href: "/features/waste-management" },
          { label: "Training & Certification", href: "/features/training" },
          { label: "Site Inductions", href: "/features/inductions" },
          { label: "Audits & Compliance", href: "/features/audits" },
          { label: "PPE Tracking", href: "/features/ppe" },
          { label: "Asset & Equipment Tracking", href: "/features/assets" },
          { label: "Multi-Site & Company Management", href: "/features/multi-site" },
          { label: "Roles & Permissions", href: "/features/roles-permissions" },
        ],
      },
    ],
  },
  {
    title: "Solutions",
    groups: [
      {
        links: [
          { label: "Solutions Hub", href: "/solutions" },
          { label: "For Safety & EHS Directors", href: "/solutions/safety-directors" },
          { label: "For Site & Operations Managers", href: "/solutions/site-managers" },
          { label: "For Field Supervisors & Crews", href: "/solutions/field-teams" },
        ],
      },
      {
        heading: "By Industry",
        links: [
          { label: "Construction & Renovation", href: "/industries/construction-renovation" },
          { label: "Manufacturing", href: "/industries/manufacturing" },
          { label: "Warehousing", href: "/industries/warehousing" },
          { label: "Mining", href: "/industries/mining" },
        ],
      },
    ],
  },
  {
    title: "Trust",
    groups: [
      {
        links: [
          { label: "Security", href: "/security" },
          { label: "Compliance Standards", href: "/compliance" },
          { label: "Customer Stories", href: "/customers" },
        ],
      },
    ],
  },
  {
    title: "Company",
    groups: [
      {
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/careers" },
        ],
      },
    ],
  },
  {
    title: "Resources",
    groups: [
      {
        links: [
          { label: "Resources / Blog", href: "/resources" },
          { label: "Glossary", href: "/resources/glossary" },
          { label: "Templates & Checklists", href: "/resources/templates" },
        ],
      },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
];

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="relative snap-start bg-slate-950 pt-16 sm:pt-20">
        <div className="section-shell">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="max-w-sm">
              <Link
                href="/"
                className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                aria-label="CRD360 home"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-sky">
                  <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="text-lg font-extrabold tracking-tight text-white">CRD360</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                One connected platform for incidents, waste, training,
                inductions and audits — built for construction and
                renovation teams running real sites, not spreadsheets.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-400 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full max-w-sm">
              <p className="text-sm font-semibold text-white">Get product updates</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                New modules, compliance templates and release notes — no
                spam.
              </p>
              {/* Not wired to a real subscription endpoint yet. */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex flex-col gap-2.5 sm:flex-row"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="relative min-w-0 flex-1">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-violet px-5 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_24px_-6px_var(--sky)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 items-start gap-x-6 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-bold text-white">{column.title}</p>
                {column.groups.map((group, gi) => (
                  <div key={group.heading ?? gi} className={gi > 0 ? "mt-5" : "mt-4"}>
                    {group.heading && (
                      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {group.heading}
                      </p>
                    )}
                    <ul className="space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="rounded-sm text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
            <p className="text-xs text-slate-500">
              Copyright © {year} CRD360. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-sm text-xs text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <BackToTopButton />
    </>
  );
}
