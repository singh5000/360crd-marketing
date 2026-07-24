import {
  Box,
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
 * Literal recreation of the real 360crd Asset Overview page, used as
 * FeatureHero's screenshot slot for the Asset & Equipment Tracking feature
 * page — same app-shell chrome as the other feature-page mocks, flat (no
 * tilt) per the inner-page template spec. Populated with representative
 * sample records rather than an empty state, same convention as the
 * others.
 */

const STAT_PILLS: { label: string; value: string; icon: LucideIcon; tone: string }[] = [
  { label: "Total", value: "6", icon: Box, tone: "#64748b" },
  { label: "In Maintenance", value: "2", icon: Clock, tone: "#0ea5e9" },
  { label: "Active", value: "2", icon: CheckCircle2, tone: "#10b981" },
];

type Status = "Active" | "Assigned" | "Maintenance Due" | "In Maintenance" | "Retired";

const STATUS_STYLES: Record<Status, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Assigned: "bg-sky-50 text-sky-600",
  "Maintenance Due": "bg-amber-50 text-amber-600",
  "In Maintenance": "bg-violet-50 text-violet",
  Retired: "bg-slate-100 text-slate-600",
};

type AssetRecord = {
  asset: string;
  status: Status;
  site: string;
  lastService: string;
};

const RECORDS: AssetRecord[] = [
  { asset: "Excavator CAT 320", status: "Maintenance Due", site: "North Depot", lastService: "22 Apr 2026" },
  { asset: "Generator 20kW", status: "Active", site: "Riverside Tower", lastService: "10 Jun 2026" },
  { asset: "Concrete Mixer", status: "In Maintenance", site: "Harbor Yard", lastService: "—" },
  { asset: "Scissor Lift", status: "Assigned", site: "Elm Street Site", lastService: "30 May 2026" },
  { asset: "Air Compressor", status: "Active", site: "Riverside Tower", lastService: "14 Jun 2026" },
  { asset: "Pallet Jack", status: "Retired", site: "North Depot", lastService: "02 Jan 2026" },
];

const TABLE_COLUMNS = ["Asset", "Status", "Site", "Last Service", "Actions"];

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

export default function AssetPreview() {
  return (
    <AppShellFrame>
      <div className="flex flex-col">
        <AppTopBar />
        <div className="flex">
          <AppSidebar activeLabel="Assets" />
          <div className="min-w-0 flex-1 bg-white p-3.5 @sm:p-6">
            <h3 className="text-base font-extrabold text-slate-900 @sm:text-2xl">Asset Overview</h3>
            <p className="mt-1 text-[11px] text-slate-500 @sm:text-sm">
              Every machine, tool, and vehicle tracked across all sites.
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
                Search assets by name, tag, or site...
              </span>
              <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 @sm:flex">
                Status: All
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 @sm:mt-5">
              <div className="hidden @lg:block">
                <div className="grid grid-cols-5 gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {TABLE_COLUMNS.map((col) => (
                    <span key={col} className={col === "Actions" ? "text-right" : undefined}>
                      {col}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-slate-100">
                  {RECORDS.map((record) => (
                    <div key={record.asset} className="grid grid-cols-5 items-center gap-2 px-3 py-2.5 text-xs text-slate-700">
                      <span className="truncate pr-2 font-medium text-slate-900">{record.asset}</span>
                      <StatusBadge status={record.status} />
                      <span className="truncate text-slate-500">{record.site}</span>
                      <span className="truncate text-slate-500">{record.lastService}</span>
                      <span className="flex justify-end">
                        <Eye className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-100 @lg:hidden">
                {RECORDS.map((record) => (
                  <div key={record.asset} className="flex flex-col gap-1.5 px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-slate-900">{record.asset}</span>
                      <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge status={record.status} />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {record.site} · {record.lastService}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 @sm:text-xs">
              <span>Showing 1 to 6 of 6 assets</span>
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
