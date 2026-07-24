import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  ListFilter,
  Recycle,
  Search,
  type LucideIcon,
} from "lucide-react";
import { AppShellFrame, AppSidebar, AppTopBar } from "./app-shell-chrome";

/**
 * Literal recreation of the real 360crd Waste Overview page, used as
 * FeatureHero's screenshot slot for the Waste Management feature page —
 * same app-shell chrome as the Incidents mock, flat (no tilt) per the
 * inner-page template spec. Populated with representative sample reports
 * rather than an empty state, same convention as IncidentPreview.
 */

const STAT_PILLS: { label: string; value: string; icon: LucideIcon; tone: string }[] = [
  { label: "Total", value: "6", icon: Recycle, tone: "#64748b" },
  { label: "Pending Collection", value: "2", icon: Clock, tone: "#f59e0b" },
  { label: "Disposed", value: "2", icon: CheckCircle2, tone: "#10b981" },
];

type Status = "Reported" | "Verified" | "Collected" | "Disposed";
type Hazard = "General" | "Recyclable" | "Hazardous" | "E-Waste";

const STATUS_STYLES: Record<Status, string> = {
  Reported: "bg-rose-50 text-rose-600",
  Verified: "bg-amber-50 text-amber-600",
  Collected: "bg-sky-50 text-sky-600",
  Disposed: "bg-emerald-50 text-emerald-600",
};

const HAZARD_STYLES: Record<Hazard, string> = {
  General: "bg-slate-400 text-white",
  Recyclable: "bg-emerald-500 text-white",
  Hazardous: "bg-rose-600 text-white",
  "E-Waste": "bg-violet text-white",
};

type WasteReport = {
  title: string;
  status: Status;
  hazard: Hazard;
  site: string;
  date: string;
};

const REPORTS: WasteReport[] = [
  { title: "Concrete debris — Block C", status: "Collected", hazard: "General", site: "Riverside Tower", date: "12 Jul 2026" },
  { title: "Used paint cans", status: "Verified", hazard: "Hazardous", site: "Harbor Yard", date: "10 Jul 2026" },
  { title: "Scrap metal offcuts", status: "Disposed", hazard: "Recyclable", site: "Elm Street Site", date: "09 Jul 2026" },
  { title: "Old wiring & cable spools", status: "Reported", hazard: "E-Waste", site: "North Depot", date: "05 Jul 2026" },
  { title: "Packaging & cardboard", status: "Disposed", hazard: "Recyclable", site: "Riverside Tower", date: "02 Jul 2026" },
  { title: "Asbestos sheeting fragments", status: "Verified", hazard: "Hazardous", site: "Harbor Yard", date: "28 Jun 2026" },
];

const TABLE_COLUMNS = ["Report", "Status", "Hazard Level", "Site", "Date", "Actions"];

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function HazardBadge({ hazard }: { hazard: Hazard }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${HAZARD_STYLES[hazard]}`}>
      {hazard}
    </span>
  );
}

export default function WastePreview() {
  return (
    <AppShellFrame>
      <div className="flex flex-col">
        <AppTopBar />
        <div className="flex">
          <AppSidebar activeLabel="Waste" />
          <div className="min-w-0 flex-1 bg-white p-3.5 @sm:p-6">
            <h3 className="text-base font-extrabold text-slate-900 @sm:text-2xl">Waste Overview</h3>
            <p className="mt-1 text-[11px] text-slate-500 @sm:text-sm">
              QR-tagged waste reports across all sites, report to disposal.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 @sm:mt-5 @sm:gap-3">
              {STAT_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 @sm:text-xs"
                >
                  <pill.icon className="h-3.5 w-3.5" style={{ color: pill.tone }} aria-hidden="true" />
                  {pill.label}
                  <span className="font-semibold text-slate-900">{pill.value}</span>
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 @sm:mt-5">
              <ListFilter className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="truncate text-[11px] text-slate-400 @sm:text-xs">
                Search waste reports by type, site, or hazard level...
              </span>
              <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 @sm:flex">
                Status: All
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 @sm:mt-5">
              <div className="hidden @lg:block">
                <div className="grid grid-cols-6 gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {TABLE_COLUMNS.map((col) => (
                    <span key={col} className={col === "Actions" ? "text-right" : undefined}>
                      {col}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-slate-100">
                  {REPORTS.map((report) => (
                    <div key={report.title} className="grid grid-cols-6 items-center gap-2 px-3 py-2.5 text-xs text-slate-700">
                      <span className="truncate pr-2 font-medium text-slate-900">{report.title}</span>
                      <StatusBadge status={report.status} />
                      <HazardBadge hazard={report.hazard} />
                      <span className="truncate text-slate-500">{report.site}</span>
                      <span className="truncate text-slate-500">{report.date}</span>
                      <span className="flex justify-end">
                        <Eye className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-100 @lg:hidden">
                {REPORTS.map((report) => (
                  <div key={report.title} className="flex flex-col gap-1.5 px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-slate-900">{report.title}</span>
                      <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={report.status} />
                      <HazardBadge hazard={report.hazard} />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {report.site} · {report.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 @sm:text-xs">
              <span>Showing 1 to 6 of 6 reports</span>
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
