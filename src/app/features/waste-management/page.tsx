import type { Metadata } from "next";
import {
  ArrowUpCircle,
  BarChart3,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  FileCheck,
  GraduationCap,
  KeyRound,
  Lock,
  QrCode,
  Recycle,
  ShieldCheck,
  Trash2,
  Truck,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import WastePreview from "@/components/marketing/waste-preview";
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
  title: "Waste Management — 360crd",
  description:
    "QR-tagged waste tracking with a complete disposal trail — hazard level classified, evidence attached, nothing lost between the skip and the record.",
};

export default function WasteManagementPage() {
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
          breadcrumb={["Platform", "Features", "Waste Management"]}
          accentTheme="sky"
          icon={<Recycle className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="WASTE MANAGEMENT"
          title="QR-tagged waste tracking — from report to final disposal."
          description="Scan a QR code at the skip, log the type and hazard level, attach a photo — every report moves through one workflow until it's verified, collected, and disposed, with proof at every step."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <Recycle className="h-5 w-5" aria-hidden="true" />,
              value: "12",
              label: "Sites Tracked",
              trendLabel: "+4 this quarter",
              tint: "#0ea5e9",
              sparkline: "M0,44 L28,38 L57,40 L85,28 L114,30 L142,18 L171,20 L200,10",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Disposal Trail Coverage",
              trendLabel: "Always on",
              tint: "#10b981",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "Instant",
              label: "QR Report Capture",
              trendLabel: "Scan and go",
              tint: "#f59e0b",
              sparkline: "M0,40 L28,34 L57,36 L85,26 L114,28 L142,16 L171,18 L200,10",
            },
          ]}
          screenshotNode={<WastePreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "4",
              label: "Waste Categories",
              description: "General, Recyclable, Hazardous, E-Waste — classified from the first scan.",
            },
            {
              value: "6",
              label: "Workflow Stages",
              description: "Reported through Closed, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Photo Evidence",
              description: "Attached directly to the report, no separate upload tool.",
            },
            {
              value: "Real-Time",
              label: "Hazard Alerts",
              description: "Hazardous waste reports surface instantly to the site manager.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE WASTE WORKFLOW"
          heading="From a QR scan to verified disposal."
          body="Scan a QR code at the skip, log the waste type, hazard level, and a photo — the site and reporter are captured automatically. From there it moves through verification, collection, and disposal, with a timestamped record at every step. High-hazard reports route straight to the site manager, so nothing sits in a bin longer than it should. When a compliance officer asks where a load actually went, you already have the answer — not a guess."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/waste-intro.jpg"
          imageAlt="A worker in coveralls holding two bagged waste loads"
          topCard={{
            icon: <Recycle className="h-4 w-4" aria-hidden="true" />,
            title: "Waste Report",
            subtitle: "Live status of your latest report",
            rows: [
              { label: "Hazard Level", value: "Hazardous", tone: "rose" },
              { label: "Status", value: "Verified", tone: "amber" },
              { label: "Site", value: "Harbor Yard" },
            ],
            cta: { label: "View Chain of Custody", href: "/demo" },
          }}
          bottomCard={{
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
            title: "Collection Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Collection Time", value: "14 hrs" },
              { label: "Total Reports", value: "6" },
              { label: "Disposed", value: "2", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <QrCode className="h-5 w-5" aria-hidden="true" />,
              title: "QR-Tagged Reporting",
              description: "Scan the code at the skip and log type, hazard level, and photo in seconds.",
            },
            {
              icon: <Recycle className="h-5 w-5" aria-hidden="true" />,
              title: "Hazard Classification",
              description: "General, Recyclable, Hazardous, or E-Waste — classified the moment it's reported.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              title: "Photo Evidence",
              description: "Attach evidence directly to the report — no separate upload tool.",
            },
            {
              icon: <FileCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Full Chain of Custody",
              description: "Every stage timestamped, from report to final disposal.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Scan. Verify. Dispose."
          subhead="From the first QR scan to final disposal — see exactly how it moves."
          accentTheme="sky"
          steps={[
            {
              label: "STEP 1",
              title: "Scan and report from the site",
              body: "A worker scans the skip's QR code, picks a hazard level, attaches a photo, and submits — the site and reporter are captured automatically. No paperwork, no separate app.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Two workers on-site with a clipboard, reporting a waste pickup",
            },
            {
              label: "STEP 2",
              title: "Manager verifies and schedules collection",
              body: "The report lands on the assigned Manager's dashboard instantly. They verify the hazard classification and schedule collection — Hazardous reports are flagged for immediate action.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "Manager reviewing a waste report and scheduling collection",
            },
            {
              label: "STEP 3",
              title: "Collected and disposed, with proof",
              body: "Every stage — Reported, Verified, Collected, Disposed — is timestamped. When compliance asks where a load went, the record's already there.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "Digital record showing a waste report's full disposal timeline",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to disposal."
          subhead="From the first scan to final disposal — see exactly where every report stands."
          accentTheme="sky"
          stages={[
            {
              label: "Reported",
              description: "Filed from the site, QR-scanned and photographed",
              owner: "Field Crew",
              color: "#94a3b8",
              icon: <QrCode className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Verified",
              description: "Manager confirms hazard level and evidence",
              owner: "Manager",
              color: "#f59e0b",
              icon: <Eye className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Collected",
              description: "Picked up and logged for transport",
              owner: "Assigned Owner",
              color: "#0ea5e9",
              icon: <Truck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Approved",
              description: "Disposal method confirmed against hazard class",
              owner: "Manager",
              color: "#7e14ff",
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Disposed",
              description: "Confirmed disposed, evidence attached",
              owner: "Manager",
              color: "#34d399",
              icon: <Trash2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Closed",
              description: "Fully resolved, timestamped and audit-ready",
              owner: "Manager",
              color: "#059669",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE WASTE MANAGEMENT"
          heading="Six capabilities. One connected module."
          subhead="Every waste report runs through the same core engine — from first scan to final disposal record."
          hubIcon={<Recycle aria-hidden="true" />}
          capabilities={[
            {
              icon: <Recycle className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Hazard Classification",
              description: "Every report is classified General to Hazardous the moment it's scanned.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              color: "#14b8a6",
              title: "Status Timeline",
              description: "Every stage timestamped, from Reported to Closed.",
            },
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Disposal Verification",
              description: "Confirm and record the disposal method before a report closes.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Photo Evidence",
              description: "Attach evidence directly to the report — no separate upload tool.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Manager Escalation",
              description: "Hazardous waste reports route straight to the assigned manager.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Waste Reporting & Trends",
              description: "See patterns across sites — where waste clusters, and why.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Waste Management, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Waste Oversight",
              bullets: [
                "All waste reports, every company & site",
                "Full status control, any stage",
                "Cross-site hazard trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Verify, Schedule, Dispose",
              bullets: [
                "Reports from assigned sites",
                "Verify hazard classification instantly",
                "Schedule and confirm collection",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <ClipboardCheck aria-hidden="true" />,
              title: "Site Waste Coordination",
              bullets: [
                "Log collection and disposal records",
                "Track hazard compliance per site",
                "Coordinate with haulers",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Scan and Report in Seconds",
              bullets: [
                "QR-scan reporting at the skip",
                "Photo evidence capture",
                "Track your own reports",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to track waste from report to disposal?"
          description="Book a 20-minute walkthrough and see 360crd's waste management running on a site like yours — QR-tagged reporting, hazard classification, and a full disposal trail, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="Waste doesn't happen in isolation. Neither does the data."
          subhead="Every report quietly feeds the modules built to keep sites compliant."
          connections={[
            {
              sourceIcon: <Recycle aria-hidden="true" />,
              sourceColor: "#0ea5e9",
              targetIcon: <FileCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Feeds Audits",
              body: "Site waste trends feed directly into audit scheduling — more eyes where the risk actually is.",
            },
            {
              sourceIcon: <Recycle aria-hidden="true" />,
              sourceColor: "#0ea5e9",
              targetIcon: <ShieldCheck aria-hidden="true" />,
              targetColor: "#f43f5e",
              title: "Flags Compliance Gaps",
              body: "Repeated hazardous-waste reports surface straight to the compliance record.",
            },
            {
              sourceIcon: <Recycle aria-hidden="true" />,
              sourceColor: "#0ea5e9",
              targetIcon: <GraduationCap aria-hidden="true" />,
              targetColor: "#7e14ff",
              title: "Feeds Training",
              body: "Repeated mishandling can trigger role-based retraining — before the same mistake happens twice.",
            },
            {
              sourceIcon: <Recycle aria-hidden="true" />,
              sourceColor: "#0ea5e9",
              targetIcon: <Wrench aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Links to Assets",
              body: "Equipment used in collection connects straight to the asset record — the full history in one place.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every waste record, audit-ready and locked down."
          body="Waste data doesn't just sit in a report — it's structured evidence. Map it straight to your ISO 14001 environmental audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 14001-Ready Evidence",
              description: "Hazard level, timeline, and disposal proof — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every waste report belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Role-Gated Access",
              description: "Only the roles permitted to see a report, see it — enforced on every request.",
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
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] We used to lose track of where a skip's contents actually ended up. Now every load has a timestamped record from scan to disposal.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Safety Director)
              quote:
                "[PLACEHOLDER] Hazardous waste reports used to sit in an inbox for days. Now they're on my dashboard the moment they're scanned.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] Scanning a skip takes ten seconds. My crew actually logs waste now instead of skipping it.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on site operations."
          subhead="Field-tested guidance on waste, compliance, and closing the loop — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Waste Management."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "How fast can a worker actually report a waste item?",
              answer:
                "Scan the skip's QR code, pick a hazard level, attach a photo — under a minute, from a phone browser.",
            },
            {
              question: "What happens when a report is flagged Hazardous?",
              answer:
                "It routes straight to the assigned manager's dashboard the moment it's submitted, for immediate verification.",
            },
            {
              question: "Can we confirm exactly where a load was disposed?",
              answer:
                "Yes. Every report tracks through Collected, Approved, and Disposed, with a timestamped record and evidence at each stage.",
            },
            {
              question: "Does every status change get logged with a timestamp?",
              answer:
                "Yes — Reported, Verified, Collected, Approved, Disposed, and Closed are all timestamped automatically as reports move.",
            },
            {
              question: "Can Field Crew see other people's waste reports?",
              answer:
                "No — Field Crew accounts only see the reports they've submitted themselves. Managers see everything for their assigned sites.",
            },
            {
              question: "Is waste data isolated between different companies on 360crd?",
              answer:
                "Yes. Every report belongs to exactly one company, enforced at the database level — the same multi-tenant isolation used across the whole platform.",
            },
            {
              question: "Can we attach photos as evidence for a waste report?",
              answer:
                "Yes, directly to the report at submission or added later during verification.",
            },
            {
              question: "Does waste data feed into audits automatically?",
              answer:
                "It feeds them, not triggers them automatically — waste trends inform audit scheduling. Nothing happens without a person acting on it.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
