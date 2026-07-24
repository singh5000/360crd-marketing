import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
  Box,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  FileCheck,
  GraduationCap,
  KeyRound,
  Lock,
  Send,
  ShieldCheck,
  Trash2,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import AssetPreview from "@/components/marketing/asset-preview";
import CapabilityWalkthrough from "@/components/marketing/capability-walkthrough";
import StatusPipeline from "@/components/marketing/status-pipeline";
import CapabilityHub from "@/components/marketing/capability-hub";
import RoleCards from "@/components/marketing/role-cards";
import FinalCTA from "@/components/marketing/final-cta";
import ConnectedModules from "@/components/marketing/connected-modules";
import ComplianceSecurityTieIn from "@/components/marketing/compliance-security-tiein";
import TestimonialCarousel from "@/components/marketing/testimonial-carousel";
import LatestInsights from "@/components/marketing/latest-insights";
import FaqSection from "@/components/marketing/faq-section";
import Footer from "@/components/marketing/footer";
import { getLatestPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Asset & Equipment Tracking — 360crd",
  description:
    "Track equipment from a barcode scan — location, maintenance history, and service due dates in one record. Every asset accounted for, no phone call required.",
};

export default function AssetsPage() {
  const latestPosts = getLatestPosts(3).map((post) => ({
    slug: post.slug,
    category: post.category,
    color: post.color,
    icon: <post.icon aria-hidden="true" />,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
  }));

  return (
    <>
      <Nav />
      <main>
        <FeatureHero
          breadcrumb={["Platform", "Features", "Asset & Equipment Tracking"]}
          accentTheme="teal"
          icon={<Box className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="ASSET & EQUIPMENT TRACKING"
          title="Every asset, located, maintained, and accounted for."
          description="Track equipment from a barcode scan — location, maintenance history, and service due dates in one record. Know exactly where a machine is and when it's due for service, without a phone call."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <Box className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Asset Visibility",
              trendLabel: "Always on",
              tint: "#0d9488",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
              value: "96%",
              label: "On-Time Maintenance",
              trendLabel: "+4% QoQ",
              tint: "#0ea5e9",
              sparkline: "M0,40 L28,36 L57,30 L85,32 L114,22 L142,24 L171,14 L200,10",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "14 Days",
              label: "Service Alert Window",
              trendLabel: "Auto-flagged",
              tint: "#f59e0b",
              sparkline: "M0,14 L28,20 L57,18 L85,26 L114,24 L142,32 L171,30 L200,38",
            },
          ]}
          screenshotNode={<AssetPreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "6",
              label: "Asset Categories",
              description: "Heavy machinery, power tools, vehicles, and generators — tracked by type.",
            },
            {
              value: "5",
              label: "Status Stages",
              description: "Active through Returned to Service, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Maintenance Photos",
              description: "Attach evidence to any service record, no separate upload tool.",
            },
            {
              value: "Real-Time",
              label: "Service Alerts",
              description: "Assets due for maintenance surface instantly on the Manager dashboard.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE ASSET WORKFLOW"
          heading="From barcode scan to service record — every asset accounted for."
          body="Scan an asset's tag to pull up its full record — location, assigned site, and maintenance history, all in one place. When a service interval comes due, it surfaces automatically instead of waiting for someone to check a logbook. Every maintenance record and location change is timestamped, so when you need to know where a machine is or when it was last serviced, you don't have to make a phone call to find out."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/asset-intro.jpg"
          imageAlt="A yellow backhoe loader moving material at an active construction site"
          topCard={{
            icon: <Box className="h-4 w-4" aria-hidden="true" />,
            title: "Asset Record",
            subtitle: "Live status of your latest scan",
            rows: [
              { label: "Asset", value: "Excavator CAT 320" },
              { label: "Status", value: "Maintenance Due", tone: "amber" },
              { label: "Site", value: "North Depot" },
            ],
            cta: { label: "View History", href: "/demo" },
          }}
          bottomCard={{
            icon: <Wrench className="h-4 w-4" aria-hidden="true" />,
            title: "Maintenance Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Service Time", value: "52 min" },
              { label: "Total Assets", value: "6" },
              { label: "Active", value: "2", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <Box className="h-5 w-5" aria-hidden="true" />,
              title: "Scan-to-Record Lookup",
              description: "Pull up an asset's full history from a barcode scan, right from the field.",
            },
            {
              icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
              title: "Maintenance Scheduling",
              description: "Service intervals tracked automatically, by asset type.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              title: "Photo-Backed Service Logs",
              description: "Attach evidence to every maintenance record, right where it belongs.",
            },
            {
              icon: <FileCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Full Asset History",
              description: "Every location change and service record, timestamped and ready for audit.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Three steps. Zero guesswork."
          subhead="From scan to service record — see exactly how it moves."
          accentTheme="teal"
          steps={[
            {
              label: "STEP 1",
              title: "Scan and locate",
              body: "Scan an asset's tag to see its current site, condition, and full history — no logbook to flip through.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Workers on-site scanning and logging an asset tag",
            },
            {
              label: "STEP 2",
              title: "Log maintenance on-site",
              body: "Record a service visit from a phone — parts used, condition, and photo evidence, right where the asset lives.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "A technician logging a maintenance record",
            },
            {
              label: "STEP 3",
              title: "Stay ahead of the next service",
              body: "The next service interval is calculated automatically and surfaces on the dashboard before it's overdue.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "A manager reviewing an upcoming maintenance schedule on a checklist",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to close."
          subhead="From active service to the next inspection — see exactly where every asset stands."
          accentTheme="teal"
          stages={[
            {
              label: "Active",
              description: "In service and available for assignment",
              owner: "Manager",
              color: "#94a3b8",
              icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Assigned",
              description: "Checked out to a site or crew",
              owner: "Staff",
              color: "#0ea5e9",
              icon: <Send className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Maintenance Due",
              description: "Scheduled service interval reached",
              owner: "Manager",
              color: "#f59e0b",
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "In Maintenance",
              description: "Being serviced, temporarily unavailable",
              owner: "Staff",
              color: "#7e14ff",
              icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Inspected",
              description: "Service verified, condition confirmed",
              owner: "Manager",
              color: "#0d9488",
              icon: <Eye className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Returned to Service",
              description: "Back in active rotation",
              owner: "Manager",
              color: "#059669",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE ASSET & EQUIPMENT TRACKING"
          heading="Six capabilities. One connected module."
          subhead="Every asset runs through the same core engine — from registry to utilization trends."
          hubIcon={<Box aria-hidden="true" />}
          capabilities={[
            {
              icon: <Box className="h-5 w-5" aria-hidden="true" />,
              color: "#0d9488",
              title: "Asset Registry",
              description: "Every machine, tool, and vehicle — tagged and tracked in one place.",
            },
            {
              icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Maintenance Scheduling",
              description: "Service intervals tracked automatically, by asset type.",
            },
            {
              icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Overdue Service Alerts",
              description: "Assets past their service window are flagged the moment they're due.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Photo-Backed Service Logs",
              description: "Attach evidence to every maintenance record, no separate upload tool.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Manager Escalation",
              description: "Failed inspections route straight to the assigned manager.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#14b8a6",
              title: "Utilization Trends",
              description: "See which assets are working hardest — and which are sitting idle.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Asset & Equipment Tracking, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Asset Oversight",
              bullets: [
                "All assets, every company & site",
                "Full registry control, any stage",
                "Cross-site utilization trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Assign, Schedule, Verify",
              bullets: [
                "Assign assets to sites and crews",
                "Schedule and review maintenance",
                "Approve return to active service",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <Wrench aria-hidden="true" />,
              title: "Log Maintenance On-Site",
              bullets: [
                "Service assigned assets from any device",
                "Attach photo evidence per record",
                "Flag assets needing attention",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Scan and Report",
              bullets: [
                "Scan an asset tag for its full history",
                "Report a fault in seconds",
                "See what's assigned to your crew",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to know exactly where every asset stands?"
          description="Book a 20-minute walkthrough and see 360crd's asset tracking running on a site like yours — scan-to-record lookup, automatic service alerts, and a full maintenance trail, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="An asset's record doesn't end at the maintenance log."
          subhead="Every scan connects to the modules already tracking what happens around it."
          connections={[
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <Box aria-hidden="true" />,
              targetColor: "#0d9488",
              title: "Linked from Incidents",
              body: "Machinery-related incidents connect straight to the asset record — the full history in one place, not a separate ticket to track down.",
            },
            {
              sourceIcon: <Box aria-hidden="true" />,
              sourceColor: "#0d9488",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Feeds Audits",
              body: "Asset condition and service history feed directly into the audit checklist — no separate equipment report to pull.",
            },
            {
              sourceIcon: <Box aria-hidden="true" />,
              sourceColor: "#0d9488",
              targetIcon: <GraduationCap aria-hidden="true" />,
              targetColor: "#7e14ff",
              title: "Requires Training",
              body: "Operating certain equipment can require a certification on file before an asset can be assigned to a worker.",
            },
            {
              sourceIcon: <Box aria-hidden="true" />,
              sourceColor: "#0d9488",
              targetIcon: <Trash2 aria-hidden="true" />,
              targetColor: "#0ea5e9",
              title: "Powers Waste Management",
              body: "Collection vehicles and containers are tracked as assets — the same maintenance record, one less system to check.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every asset record, audit-ready and locked down."
          body="Asset data doesn't just sit in a spreadsheet — it's structured maintenance evidence. Map it straight to your ISO 45001 audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Evidence",
              description: "Service history, condition, and inspection records — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every asset belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Role-Gated Access",
              description: "Only the roles permitted to see an asset, see it — enforced on every request.",
            },
            {
              icon: <KeyRound aria-hidden="true" />,
              color: "#7e14ff",
              label: "Secure by Default",
              description: "JWT authentication and bcrypt password hashing protect every login.",
            },
          ]}
        />
        {/*
          TODO: replace with real customer testimonials. Every quote,
          name, and title below is a placeholder — the component is
          fully built and launch-ready, only the copy needs swapping
          once real customers exist.
        */}
        <TestimonialCarousel
          eyebrow="WHAT TEAMS SAY"
          testimonials={[
            {
              // TODO: replace with real customer testimonial (Safety Director)
              quote:
                "[PLACEHOLDER] We used to find out equipment was overdue for service when it broke down mid-job. Now it's flagged two weeks out.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] A scan tells me exactly where a machine is and when it was last serviced. No more calling three sites to track one excavator down.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] Logging a service visit takes a minute from my phone now, evidence attached. No more paper logbook in the truck.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on asset & equipment tracking."
          subhead="Field-tested guidance on maintenance, scheduling, and staying ahead of downtime — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Asset & Equipment Tracking."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "What kinds of assets can be tracked?",
              answer:
                "Any category — heavy machinery, power tools, vehicles, and generators ship as defaults, and you can add custom asset types specific to your sites.",
            },
            {
              question: "How do we know when an asset is due for maintenance?",
              answer:
                "Service intervals are tracked automatically per asset type. Anything nearing its window surfaces on the Manager dashboard before it becomes downtime.",
            },
            {
              question: "Can a worker look up an asset's full history from the field?",
              answer:
                "Yes — scan the asset's tag from a phone and its current site, condition, and complete maintenance history come up instantly, no logbook needed.",
            },
            {
              question: "Does every location change and service record get logged with a timestamp?",
              answer:
                "Yes — Active, Assigned, Maintenance Due, In Maintenance, Inspected, and Returned to Service are all timestamped automatically as an asset moves, not reconstructed after the fact.",
            },
            {
              question: "Can we attach photo evidence to a maintenance record?",
              answer:
                "Yes, directly to the service record at the time it's logged — no separate upload tool or shared drive needed.",
            },
            {
              question: "Is asset data isolated between different companies on 360crd?",
              answer:
                "Yes. Every asset belongs to exactly one company, enforced at the database level — the same multi-tenant isolation used across the whole platform.",
            },
            {
              question: "Can Field Worker accounts see every asset, or just what's assigned to their crew?",
              answer:
                "Field Worker accounts see what's assigned to their crew and can report a fault on any asset. Managers see everything for their assigned sites; Superadmins see across the whole company.",
            },
            {
              question: "Does asset data connect to incidents, audits, or training automatically?",
              answer:
                "It connects both ways — machinery-related incidents link straight to the asset record, while asset condition feeds the audit checklist and certain equipment can require a training record before assignment. Nothing happens without a person acting on it.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
