import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  KeyRound,
  Lock,
  Send,
  Shield,
  ShieldCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import PpePreview from "@/components/marketing/ppe-preview";
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
  title: "PPE Tracking — 360crd",
  description:
    "Issue PPE to a worker, track inspection cycles, and know the moment something's expiring — every assignment and inspection timestamped and audit-ready.",
};

export default function PpeTrackingPage() {
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
          breadcrumb={["Platform", "Features", "PPE Tracking"]}
          accentTheme="indigo"
          icon={<Shield className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="PPE TRACKING"
          title="Every piece of PPE, assigned, inspected, and accounted for."
          description="Issue PPE to a worker, track inspection cycles, and know the moment something's expiring — before it becomes a compliance gap on-site."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <Shield className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "PPE Assignment Coverage",
              trendLabel: "Always on",
              tint: "#6366f1",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
              value: "94%",
              label: "Inspection Compliance",
              trendLabel: "+5% QoQ",
              tint: "#10b981",
              sparkline: "M0,40 L28,36 L57,30 L85,32 L114,22 L142,24 L171,14 L200,10",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "30 Days",
              label: "Expiry Alert Window",
              trendLabel: "Auto-flagged",
              tint: "#f59e0b",
              sparkline: "M0,14 L28,20 L57,18 L85,26 L114,24 L142,32 L171,30 L200,38",
            },
          ]}
          screenshotNode={<PpePreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "6",
              label: "PPE Categories",
              description: "Head, eye, respiratory, hand, foot, and fall protection — tracked by type.",
            },
            {
              value: "5",
              label: "Status Stages",
              description: "Requested through Expiring Soon, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Inspection Photos",
              description: "Attach evidence to any inspection record, no separate upload tool.",
            },
            {
              value: "Real-Time",
              label: "Expiry Alerts",
              description: "Items nearing expiry surface instantly on the Manager dashboard.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE PPE WORKFLOW"
          heading="From issued to inspected — never lose track of a single item."
          body="Assign PPE to a worker the moment they're inducted, and it's tracked from there — inspection cycles, expiry dates, and condition, all in one record. When an item is nearing expiry or due for inspection, it surfaces automatically instead of waiting for someone to notice a cracked harness or an expired respirator cartridge. Every assignment and inspection is timestamped, so when an auditor asks who was wearing what and when, you have the answer in seconds."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/ppe-intro.jpg"
          imageAlt="An engineer wearing a hard hat, high-visibility vest, and gloves inspecting industrial machinery in a factory"
          topCard={{
            icon: <Shield className="h-4 w-4" aria-hidden="true" />,
            title: "PPE Record",
            subtitle: "Live status of your latest assignment",
            rows: [
              { label: "Item", value: "Safety Harness" },
              { label: "Status", value: "Inspection Due", tone: "amber" },
              { label: "Site", value: "North Depot" },
            ],
            cta: { label: "View History", href: "/demo" },
          }}
          bottomCard={{
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
            title: "Compliance Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Inspection Time", value: "4 min" },
              { label: "Total Items", value: "6" },
              { label: "Compliant", value: "2", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <Shield className="h-5 w-5" aria-hidden="true" />,
              title: "Issue PPE in Seconds",
              description: "Assign an item to a worker the moment they're inducted, tracked from day one.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              title: "Automatic Expiry Alerts",
              description: "Items nearing expiry surface on the dashboard before they become a gap.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              title: "Photo-Backed Inspections",
              description: "Attach evidence to every inspection, right where the record lives.",
            },
            {
              icon: <FileCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Full Assignment History",
              description: "Every issue, inspection, and retirement — timestamped and ready for audit.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Three steps. Zero guesswork."
          subhead="From issued to retired — see exactly how it moves."
          accentTheme="indigo"
          steps={[
            {
              label: "STEP 1",
              title: "Issue to a worker",
              body: "Assign a PPE item to a worker in seconds — type, size, and issue date captured automatically. No spreadsheet to update by hand.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "A manager assigning a PPE item to a worker",
            },
            {
              label: "STEP 2",
              title: "Inspect on schedule",
              body: "Inspection cycles are tracked automatically. Log condition and photo evidence from a phone, right where the item's record lives.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Workers on-site inspecting safety equipment and logging the result",
            },
            {
              label: "STEP 3",
              title: "Replace before it expires",
              body: "Items nearing expiry or failing inspection surface on the dashboard automatically — replaced before they become a compliance gap.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "A manager reviewing an expiring PPE alert on a checklist",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to close."
          subhead="From the first request to the final retirement — see exactly where every item stands."
          accentTheme="indigo"
          stages={[
            {
              label: "Requested",
              description: "Worker requests or is flagged for new PPE",
              owner: "Field Worker",
              color: "#94a3b8",
              icon: <Send className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Approved",
              description: "Manager approves the request",
              owner: "Manager",
              color: "#0ea5e9",
              icon: <Eye className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Issued",
              description: "Item issued and assigned to the worker",
              owner: "Manager",
              color: "#f59e0b",
              icon: <Shield className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Inspection Due",
              description: "Scheduled inspection cycle triggered",
              owner: "Staff",
              color: "#7e14ff",
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Expiring Soon",
              description: "Nearing expiry, replacement flagged",
              owner: "Manager",
              color: "#f43f5e",
              icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Retired",
              description: "Item retired and removed from active inventory",
              owner: "Manager",
              color: "#059669",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE PPE TRACKING"
          heading="Six capabilities. One connected module."
          subhead="Every item runs through the same core engine — from issuance to compliance trend analysis."
          hubIcon={<Shield aria-hidden="true" />}
          capabilities={[
            {
              icon: <Shield className="h-5 w-5" aria-hidden="true" />,
              color: "#6366f1",
              title: "PPE Assignment",
              description: "Issue any item to a worker in seconds, tracked from day one.",
            },
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Inspection Scheduling",
              description: "Inspection cycles tracked automatically, by item type.",
            },
            {
              icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Expiry Alerts",
              description: "Items nearing expiry surface before they become a gap.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Photo-Backed Records",
              description: "Attach evidence to every inspection, right where it belongs.",
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
              title: "Compliance Trends",
              description: "See PPE compliance trend across sites and categories.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="PPE Tracking, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide PPE Oversight",
              bullets: [
                "All PPE records, every company & site",
                "Full inventory control, any stage",
                "Cross-site compliance trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Issue, Inspect, Replace",
              bullets: [
                "Issue PPE to workers on assigned sites",
                "Review inspection results",
                "Approve replacements before expiry",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <ClipboardCheck aria-hidden="true" />,
              title: "Run Inspections On-Site",
              bullets: [
                "Inspect assigned PPE from any device",
                "Attach photo evidence per item",
                "Flag items that fail inspection",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Track Your Own Gear",
              bullets: [
                "See PPE issued to you",
                "View expiry and inspection dates",
                "Request a replacement in seconds",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to know exactly where every piece of PPE stands?"
          description="Book a 20-minute walkthrough and see 360crd's PPE tracking running on a site like yours — instant issuance, automatic expiry alerts, and a full compliance trail, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="Every gap in PPE compliance connects somewhere else."
          subhead="PPE records aren't the end of the story — they inform, and draw from, the rest of the platform."
          connections={[
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <Shield aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Flagged by Incidents",
              body: "Equipment-related incidents surface straight to the PPE record — a gap gets seen, not repeated.",
            },
            {
              sourceIcon: <Shield aria-hidden="true" />,
              sourceColor: "#6366f1",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Feeds Audits",
              body: "PPE compliance status feeds directly into the audit checklist — no separate report to chase down before a walkthrough.",
            },
            {
              sourceIcon: <Shield aria-hidden="true" />,
              sourceColor: "#6366f1",
              targetIcon: <GraduationCap aria-hidden="true" />,
              targetColor: "#7e14ff",
              title: "Feeds Training",
              body: "Repeated PPE non-conformances can trigger role-based retraining — before the same gap happens twice.",
            },
            {
              sourceIcon: <FileText aria-hidden="true" />,
              sourceColor: "#10b981",
              targetIcon: <Shield aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Confirmed by Inductions",
              body: "Induction sign-off confirms a worker received and understood their assigned PPE before stepping on site.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every PPE record, audit-ready and locked down."
          body="PPE data doesn't just sit in an inventory list — it's structured compliance evidence. Map it straight to your ISO 45001 audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Evidence",
              description: "Assignment, inspection, and expiry records — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every PPE record belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Role-Gated Access",
              description: "Only the roles permitted to see a record, see it — enforced on every request.",
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
                "[PLACEHOLDER] We used to find out a harness was overdue for inspection when someone was already wearing it. Now it's flagged a week ahead.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] Issuing PPE to a new hire used to mean a paper form and a filing cabinet. Now it's assigned before they've left orientation.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] My crew can see exactly what's issued to them and when it expires. No more guessing whose gloves are overdue.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on PPE tracking."
          subhead="Field-tested guidance on issuance, inspection, and staying ahead of expiry — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about PPE Tracking."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "What kinds of PPE can be tracked?",
              answer:
                "Any category — head, eye, respiratory, hand, foot, and fall protection ship as defaults, and you can add custom item types specific to your sites.",
            },
            {
              question: "How do we know when an item needs inspection or replacement?",
              answer:
                "Inspection cycles and expiry dates are tracked automatically per item type. Anything nearing its window surfaces on the Manager dashboard before it becomes a gap.",
            },
            {
              question: "Can a worker see what's currently issued to them?",
              answer:
                "Yes — Field Worker accounts can see every item assigned to them, along with expiry and inspection dates, and request a replacement in seconds.",
            },
            {
              question: "Does every issue, inspection, and retirement get logged with a timestamp?",
              answer:
                "Yes — Requested, Approved, Issued, Inspection Due, Expiring Soon, and Retired are all timestamped automatically as an item moves, not reconstructed after the fact.",
            },
            {
              question: "Can we attach photo evidence to an inspection?",
              answer:
                "Yes, directly to the inspection record at the time it's logged — no separate upload tool or shared drive needed.",
            },
            {
              question: "Is PPE data isolated between different companies on 360crd?",
              answer:
                "Yes. Every PPE record belongs to exactly one company, enforced at the database level — the same multi-tenant isolation used across the whole platform.",
            },
            {
              question: "Can Field Worker accounts see other workers' PPE records?",
              answer:
                "No — Field Worker accounts only see their own assigned items. Managers see everything for their assigned sites; Superadmins see across the whole company.",
            },
            {
              question: "Does PPE data connect to incidents, audits, or training automatically?",
              answer:
                "It connects both ways — equipment-related incidents flag straight to the PPE record, while PPE compliance status feeds the audit checklist and can trigger retraining. Nothing happens without a person acting on it.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
