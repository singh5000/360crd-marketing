import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  ListFilter,
  Search,
  type LucideIcon,
} from "lucide-react";
import { AppShellFrame, AppSidebar, AppTopBar } from "./app-shell-chrome";

/**
 * Literal recreation of the real 360crd Incidents Overview page, used as
 * FeatureHero's screenshot slot for the Incident Management feature page —
 * same app-shell chrome as the Hero dashboard mock, flat (no tilt) per the
 * inner-page template spec. Populated with representative sample incidents
 * rather than an empty state, so the table reads as a real product view.
 */

const STAT_PILLS: { label: string; value: string; icon: LucideIcon; tone: string }[] = [
  { label: "Total", value: "6", icon: AlertTriangle, tone: "#64748b" },
  { label: "Action Required", value: "3", icon: Clock, tone: "#f59e0b" },
  { label: "Closed", value: "3", icon: CheckCircle2, tone: "#10b981" },
];

type Status = "Open" | "Under Review" | "Action Required" | "Resolved" | "Closed";
type Severity = "Critical" | "High" | "Medium" | "Low";

const STATUS_STYLES: Record<Status, string> = {
  Open: "bg-rose-50 text-rose-600",
  "Under Review": "bg-amber-50 text-amber-600",
  "Action Required": "bg-orange-50 text-orange-600",
  Resolved: "bg-sky-50 text-sky-600",
  Closed: "bg-emerald-50 text-emerald-600",
};

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-rose-600 text-white",
  High: "bg-amber-500 text-white",
  Medium: "bg-sky-500 text-white",
  Low: "bg-slate-400 text-white",
};

type Incident = {
  title: string;
  status: Status;
  severity: Severity;
  category: string;
  site: string;
  date: string;
};

const INCIDENTS: Incident[] = [
  {
    title: "Scaffolding collapse risk — Block C",
    status: "Open",
    severity: "Critical",
    category: "Structural",
    site: "Riverside Tower",
    date: "12 Jul 2026",
  },
  {
    title: "Missing PPE at welding bay",
    status: "Under Review",
    severity: "High",
    category: "PPE Compliance",
    site: "Harbor Yard",
    date: "10 Jul 2026",
  },
  {
    title: "Electrical exposure near panel B",
    status: "Action Required",
    severity: "High",
    category: "Electrical",
    site: "Elm Street Site",
    date: "09 Jul 2026",
  },
  {
    title: "Slip hazard on stairwell B",
    status: "Resolved",
    severity: "Medium",
    category: "Housekeeping",
    site: "North Depot",
    date: "05 Jul 2026",
  },
  {
    title: "Unsecured load on crane lift",
    status: "Closed",
    severity: "Medium",
    category: "Equipment",
    site: "Riverside Tower",
    date: "02 Jul 2026",
  },
  {
    title: "Near-miss at forklift blind corner",
    status: "Closed",
    severity: "Low",
    category: "Vehicle Safety",
    site: "Harbor Yard",
    date: "28 Jun 2026",
  },
];

const TABLE_COLUMNS = ["Title", "Status", "Severity", "Category", "Site", "Date", "Actions"];

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${SEVERITY_STYLES[severity]}`}
    >
      {severity}
    </span>
  );
}

export default function IncidentPreview() {
  return (
    <AppShellFrame>
      <div className="flex flex-col">
        <AppTopBar />
        <div className="flex">
          <AppSidebar activeLabel="Incidents" />
          <div className="min-w-0 flex-1 bg-white p-3.5 @sm:p-6">
            <h3 className="text-base font-extrabold text-slate-900 @sm:text-2xl">
              Incident Overview
            </h3>
            <p className="mt-1 text-[11px] text-slate-500 @sm:text-sm">
              Global visibility of all incidents across all sites.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 @sm:mt-5 @sm:gap-3">
              {STAT_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 @sm:text-xs"
                >
                  <pill.icon
                    className="h-3.5 w-3.5"
                    style={{ color: pill.tone }}
                    aria-hidden="true"
                  />
                  {pill.label}
                  <span className="font-semibold text-slate-900">{pill.value}</span>
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 @sm:mt-5">
              <ListFilter className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="truncate text-[11px] text-slate-400 @sm:text-xs">
                Search incidents by title, category, or site...
              </span>
              <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 @sm:flex">
                Status: All
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 @sm:mt-5">
              {/* Desktop-width table */}
              <div className="hidden @lg:block">
                <div className="grid grid-cols-7 gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {TABLE_COLUMNS.map((col) => (
                    <span key={col} className={col === "Actions" ? "text-right" : undefined}>
                      {col}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-slate-100">
                  {INCIDENTS.map((incident) => (
                    <div
                      key={incident.title}
                      className="grid grid-cols-7 items-center gap-2 px-3 py-2.5 text-xs text-slate-700"
                    >
                      <span className="truncate pr-2 font-medium text-slate-900">
                        {incident.title}
                      </span>
                      <StatusBadge status={incident.status} />
                      <SeverityBadge severity={incident.severity} />
                      <span className="truncate text-slate-500">{incident.category}</span>
                      <span className="truncate text-slate-500">{incident.site}</span>
                      <span className="truncate text-slate-500">{incident.date}</span>
                      <span className="flex justify-end">
                        <Eye className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Narrow-container fallback: stacked cards */}
              <div className="divide-y divide-slate-100 @lg:hidden">
                {INCIDENTS.map((incident) => (
                  <div key={incident.title} className="flex flex-col gap-1.5 px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-slate-900">
                        {incident.title}
                      </span>
                      <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={incident.status} />
                      <SeverityBadge severity={incident.severity} />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {incident.category} · {incident.site} · {incident.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 @sm:text-xs">
              <span>Showing 1 to 6 of 6 incidents</span>
              <span className="flex items-center gap-1">
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShellFrame>
  );
}
