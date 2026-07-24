import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  ListFilter,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AppShellFrame, AppSidebar, AppTopBar } from "./app-shell-chrome";

/**
 * Literal recreation of the real 360crd Users Overview page, used as
 * FeatureHero's screenshot slot for the Roles & Permissions feature page —
 * same app-shell chrome as the other feature-page mocks, flat (no tilt)
 * per the inner-page template spec. Populated with representative sample
 * records rather than an empty state, same convention as the others.
 */

const STAT_PILLS: { label: string; value: string; icon: LucideIcon; tone: string }[] = [
  { label: "Total", value: "6", icon: Users, tone: "#64748b" },
  { label: "Invited", value: "2", icon: Clock, tone: "#f59e0b" },
  { label: "Active", value: "4", icon: CheckCircle2, tone: "#10b981" },
];

type Role = "Superadmin" | "Manager" | "Staff" | "Field Worker";

const ROLE_STYLES: Record<Role, string> = {
  Superadmin: "bg-violet-100 text-violet",
  Manager: "bg-sky-50 text-sky-600",
  Staff: "bg-amber-50 text-amber-600",
  "Field Worker": "bg-emerald-50 text-emerald-600",
};

type Status = "Active" | "Invited";

const STATUS_STYLES: Record<Status, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Invited: "bg-slate-100 text-slate-600",
};

type UserRecord = {
  user: string;
  role: Role;
  sites: string;
  status: Status;
};

const RECORDS: UserRecord[] = [
  { user: "A. Sharma", role: "Superadmin", sites: "All Sites", status: "Active" },
  { user: "J. Alvarez", role: "Manager", sites: "Riverside Tower", status: "Active" },
  { user: "M. Okafor", role: "Staff", sites: "Harbor Yard", status: "Active" },
  { user: "T. Nguyen", role: "Field Worker", sites: "Elm Street Site", status: "Invited" },
  { user: "R. Singh", role: "Staff", sites: "North Depot", status: "Active" },
  { user: "D. Osei", role: "Field Worker", sites: "Harbor Yard", status: "Invited" },
];

const TABLE_COLUMNS = ["User", "Role", "Site(s)", "Status", "Actions"];

function RoleBadge({ role }: { role: Role }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${ROLE_STYLES[role]}`}>
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

export default function RolesPreview() {
  return (
    <AppShellFrame>
      <div className="flex flex-col">
        <AppTopBar />
        <div className="flex">
          <AppSidebar activeLabel="Users" />
          <div className="min-w-0 flex-1 bg-white p-3.5 @sm:p-6">
            <h3 className="text-base font-extrabold text-slate-900 @sm:text-2xl">Users Overview</h3>
            <p className="mt-1 text-[11px] text-slate-500 @sm:text-sm">
              Every account, scoped by role and site.
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
                Search users by name, role, or site...
              </span>
              <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 @sm:flex">
                Role: All
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
                    <div key={record.user} className="grid grid-cols-5 items-center gap-2 px-3 py-2.5 text-xs text-slate-700">
                      <span className="truncate pr-2 font-medium text-slate-900">{record.user}</span>
                      <RoleBadge role={record.role} />
                      <span className="truncate text-slate-500">{record.sites}</span>
                      <StatusBadge status={record.status} />
                      <span className="flex justify-end">
                        <Eye className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-100 @lg:hidden">
                {RECORDS.map((record) => (
                  <div key={record.user} className="flex flex-col gap-1.5 px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-slate-900">{record.user}</span>
                      <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <RoleBadge role={record.role} />
                      <StatusBadge status={record.status} />
                    </div>
                    <p className="text-[10px] text-slate-400">{record.sites}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 @sm:text-xs">
              <span>Showing 1 to 6 of 6 users</span>
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
