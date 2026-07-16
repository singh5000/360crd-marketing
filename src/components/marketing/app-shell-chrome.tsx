import {
  Bell,
  Box,
  Building2,
  ChevronDown,
  ChevronLeft,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HardHat,
  LayoutDashboard,
  LogOut,
  MapPin,
  Moon,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared top bar + sidebar chrome for every literal 360crd product-preview
 * mock (Hero's dashboard graphic, and every /features/* page's screenshot
 * slot). One source of truth for the nav structure so a real nav change
 * only needs updating here, not in every page mock.
 */

type SidebarItem = { label: string; icon: LucideIcon };
type SidebarGroup = { heading: string; items: SidebarItem[] };

const SIDEBAR_GROUPS: SidebarGroup[] = [
  { heading: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard }] },
  { heading: "Super Admin", items: [{ label: "Companies", icon: Building2 }] },
  {
    heading: "Platform",
    items: [
      { label: "Sites", icon: MapPin },
      { label: "Users", icon: Users },
    ],
  },
  {
    heading: "Operations View",
    items: [
      { label: "Incidents", icon: ShieldAlert },
      { label: "Audits", icon: ClipboardCheck },
      { label: "Training", icon: GraduationCap },
      { label: "Inductions", icon: FileText },
      { label: "PPE", icon: HardHat },
      { label: "Assets", icon: Box },
      { label: "Waste", icon: Trash2 },
    ],
  },
  { heading: "System", items: [{ label: "Settings", icon: Settings }] },
];

export function AppTopBar() {
  return (
    <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-slate-200 bg-white px-3 @sm:h-14 @sm:px-5">
      <ChevronLeft className="hidden h-4 w-4 shrink-0 text-slate-300 @sm:block" aria-hidden="true" />
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 @sm:h-7 @sm:w-7">
        <ShieldCheck className="h-3.5 w-3.5 text-white @sm:h-4 @sm:w-4" strokeWidth={2.25} />
      </span>
      <span className="shrink-0 text-xs font-extrabold tracking-tight text-slate-900 @sm:text-sm">
        360CRD
      </span>

      <div className="ml-2 hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-400 @lg:flex @lg:max-w-xs">
        <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate text-xs">Search modules...</span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2 @sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 @lg:flex">
          Urban Spark Media
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </span>
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full text-slate-400">
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
          JO
        </span>
      </div>
    </div>
  );
}

export function AppSidebar({ activeLabel }: { activeLabel: string }) {
  return (
    <div className="hidden w-44 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-3 @lg:flex @2xl:w-52">
      <div>
        {SIDEBAR_GROUPS.map((group) => (
          <div key={group.heading} className="mt-4 first:mt-0">
            <p className="mb-1.5 px-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 @2xl:text-[10px]">
              {group.heading}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.label === activeLabel;
                return (
                  <div key={item.label} className="relative">
                    {active && (
                      <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-600" />
                    )}
                    <div
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium @2xl:text-xs",
                        active ? "bg-blue-50 text-blue-600" : "text-slate-500"
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.label}</span>
                      {item.label === "Settings" && (
                        <ChevronDown className="ml-auto h-3 w-3 shrink-0" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-3">
        <div className="flex items-center gap-2 px-1">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
            J
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">johnsmith</p>
            <p className="truncate text-[9px] text-slate-400">john@gmail.com</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 rounded-full bg-slate-100 p-1 text-[9px] font-medium text-slate-500">
          <span className="flex flex-1 items-center justify-center gap-1 rounded-full bg-white py-1 text-slate-900 shadow-sm">
            <Sun className="h-2.5 w-2.5" aria-hidden="true" />
            Light
          </span>
          <span className="flex flex-1 items-center justify-center gap-1 rounded-full py-1">
            <Moon className="h-2.5 w-2.5" aria-hidden="true" />
            Dark
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 px-1 text-[11px] text-slate-400">
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign out
        </div>
      </div>
    </div>
  );
}

/**
 * The rounded/bordered/shadowed frame every app-shell mock sits inside.
 * `tilt` adds the Hero's subtle perspective lean; feature-page previews
 * render flat (tilt={false}) per spec.
 */
export function AppShellFrame({
  tilt = false,
  className,
  children,
}: {
  tilt?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("@container w-full", tilt && "[perspective:2600px]")}
    >
      <div className={tilt ? "lg:[transform:rotateY(-6deg)_rotateX(2deg)]" : undefined}>
        <div
          aria-hidden="true"
          className={cn(
            "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)]",
            tilt && "lg:shadow-[0_70px_140px_-40px_rgba(15,23,42,0.5)]",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
