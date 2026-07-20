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
  GraduationCap,
  History,
  KeyRound,
  Lock,
  Send,
  Shield,
  ShieldCheck,
  UserCircle,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import IncidentPreview from "@/components/marketing/incident-preview";
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
  title: "Incident Management — 360crd",
  description:
    "Report, investigate, and close incidents with a complete audit trail — evidence attached, severity tracked, nothing lost in a chat thread.",
};

export default function IncidentManagementPage() {
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
          breadcrumb={["Platform", "Features", "Incident Management"]}
          accentTheme="rose"
          icon={<AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="INCIDENT MANAGEMENT"
          title="Report, investigate, and close incidents — with a complete audit trail."
          description="From a five-tap field report to a manager sign-off, every incident moves through one connected workflow — evidence attached, severity tracked, nothing lost in a chat thread."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <Zap className="h-5 w-5" aria-hidden="true" />,
              value: "65%",
              label: "Faster Resolution",
              trendLabel: "+22% QoQ",
              tint: "#2563eb",
              sparkline: "M0,44 L28,38 L57,40 L85,28 L114,30 L142,18 L171,20 L200,10",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Audit Trail Coverage",
              trendLabel: "Always on",
              tint: "#10b981",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "24/7",
              label: "Field Reporting",
              trendLabel: "5-tap capture",
              tint: "#f59e0b",
              sparkline: "M0,40 L28,34 L57,36 L85,26 L114,28 L142,16 L171,18 L200,10",
            },
          ]}
          screenshotNode={<IncidentPreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "4",
              label: "Severity Levels",
              description: "Low, Medium, High, Critical — triaged from the first report.",
            },
            {
              value: "6",
              label: "Status Stages",
              description: "Submitted through Closed, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Evidence Photos & Videos",
              description: "Attached directly to the report, no separate upload tool.",
            },
            {
              value: "Real-Time",
              label: "Manager Escalation",
              description: "High and Critical incidents surface instantly on the Manager dashboard.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE INCIDENT WORKFLOW"
          heading="From five-tap report to closed incident."
          body="Report an incident from the field in under a minute — photo evidence, severity, and site attached automatically. Managers see it instantly, investigate it, and close it out with a full audit trail behind every step. High and Critical reports escalate the moment they're submitted, so nothing waits on someone noticing a message in a group chat. Every status change is timestamped and every corrective action logged, so when an auditor asks for proof six months later, you hand over a complete record instead of scrolling through old photos."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/incident-intro.jpg"
          imageAlt="A field responder photographing evidence at an incident site while a rescue crew works in the background"
          topCard={{
            icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
            title: "Incident Report",
            subtitle: "Live status of your latest report",
            rows: [
              { label: "Severity", value: "High", tone: "amber" },
              { label: "Status", value: "Action Required", tone: "orange" },
              { label: "Site", value: "Site 4 — East Block" },
            ],
            cta: { label: "View Timeline", href: "/demo" },
          }}
          bottomCard={{
            icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
            title: "Response Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Resolution", value: "18 hrs" },
              { label: "Total Incidents", value: "6" },
              { label: "Closed", value: "3", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <Zap className="h-5 w-5" aria-hidden="true" />,
              title: "Five-Tap Field Reporting",
              description: "Report an incident from any device in under a minute, evidence attached.",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Severity-Based Triage",
              description: "Low to Critical — every report is classified the moment it's submitted.",
            },
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              title: "Instant Manager Escalation",
              description: "High and Critical incidents surface on the Manager dashboard immediately.",
            },
            {
              icon: <FileCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Full Audit Trail",
              description: "Every status change, timestamped — ready the moment an auditor asks.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Three steps. Zero guesswork."
          subhead="From first report to closed incident — see exactly how it moves."
          accentTheme="rose"
          steps={[
            {
              label: "STEP 1",
              title: "Report from the field",
              body: "A worker opens the form, picks a severity, attaches photo evidence, and submits — the site and reporter are captured automatically. No paperwork, no separate app.",
              screenshotSrc: "/images/step1-field-report.jpg",
              screenshotAlt: "A worker on-site in a hard hat filling out a report on a tablet",
            },
            {
              label: "STEP 2",
              title: "Manager reviews and escalates",
              body: "The report lands on the assigned Manager's dashboard instantly. They review the evidence, request more information if needed, or escalate High and Critical incidents for immediate action.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "A manager reviewing a report on a laptop in the office",
            },
            {
              label: "STEP 3",
              title: "Closed with a full audit trail",
              body: "Every status change — Submitted, Under Review, Escalated, Action In Progress, Closed — is timestamped. When an auditor asks for proof, it's already there.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "A hand checking off the final item on a digital closure checklist",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to close."
          subhead="From the first report to the final sign-off — see exactly where every incident stands."
          accentTheme="rose"
          stages={[
            {
              label: "Submitted",
              description: "Filed from the field, evidence attached",
              owner: "Field Crew",
              color: "#94a3b8",
              icon: <Send className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Under Manager Review",
              description: "Assigned manager reviews severity and evidence",
              owner: "Manager",
              color: "#f59e0b",
              icon: <Eye className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Escalated",
              description: "High/Critical incidents routed for immediate action",
              owner: "Manager",
              color: "#f43f5e",
              icon: <Zap className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Action In Progress",
              description: "Corrective action assigned and underway",
              owner: "Assigned Owner",
              color: "#0ea5e9",
              icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Action Completed",
              description: "Fix verified, pending final sign-off",
              owner: "Manager",
              color: "#34d399",
              icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
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
          eyebrow="INSIDE INCIDENT MANAGEMENT"
          heading="Six capabilities. One connected module."
          subhead="Every incident report runs through the same core engine — from first triage to final trend analysis."
          hubIcon={<AlertTriangle aria-hidden="true" />}
          capabilities={[
            {
              icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Severity Classification",
              description: "Every report is triaged Low to Critical the moment it's submitted.",
            },
            {
              icon: <History className="h-5 w-5" aria-hidden="true" />,
              color: "#14b8a6",
              title: "Status Timeline",
              description: "Every stage timestamped, from Submitted to Closed.",
            },
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Corrective Actions",
              description: "Assign, track, and verify the fix before an incident closes.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Photo & Video Evidence",
              description: "Attach evidence directly to the report — no separate upload tool.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Manager Escalation",
              description: "High and Critical incidents route straight to the assigned manager.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Incident Reporting & Trends",
              description: "See patterns across sites — where incidents cluster, and why.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Incident Management, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Incident Oversight",
              bullets: [
                "All incidents, every company & site",
                "Full status control, any stage",
                "Cross-site severity trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Review, Escalate, Resolve",
              bullets: [
                "Incidents from assigned sites",
                "Escalate High/Critical instantly",
                "Assign corrective actions",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <ClipboardCheck aria-hidden="true" />,
              title: "Field Investigation Tools",
              bullets: [
                "Submit investigation findings",
                "Log corrective action steps",
                "Track assigned incidents",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Report in Under a Minute",
              bullets: [
                "Five-tap incident submission",
                "Photo evidence capture",
                "Track your own reports",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to close incidents in one connected workflow?"
          description="Book a 20-minute walkthrough and see 360crd's incident management running on a site like yours — five-tap field reports, manager escalation, and a full audit trail, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="Incidents don't happen in isolation. Neither does the data."
          subhead="Every report quietly feeds the modules built to prevent the next one."
          connections={[
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <GraduationCap aria-hidden="true" />,
              targetColor: "#7e14ff",
              title: "Feeds Training",
              body: "Repeated incidents can trigger role-based retraining — before the same mistake happens twice.",
            },
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <FileCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Feeds Audits",
              body: "Site incident trends feed directly into audit scheduling — more eyes where the risk actually is.",
            },
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <Shield aria-hidden="true" />,
              targetColor: "#10b981",
              title: "Flags PPE Gaps",
              body: "Equipment-related incidents surface straight to the PPE inventory — a gap gets seen, not repeated.",
            },
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <Wrench aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Links to Assets",
              body: "Machinery-related incidents connect straight to the asset record — the full history in one place.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every incident record, audit-ready and locked down."
          body="Incident data doesn't just sit in a report — it's structured evidence. Map it straight to your ISO 45001 audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Evidence",
              description: "Severity, timeline, and corrective actions — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every incident belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Role-Gated Access",
              description: "Only the roles permitted to see an incident, see it — enforced on every request.",
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
                "[PLACEHOLDER] We went from a WhatsApp group full of incident photos to knowing exactly where every report stands, every day.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] Escalating a critical incident used to mean chasing five people. Now it just shows up on my dashboard.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] Reporting takes under a minute now. My crew actually files incidents instead of skipping them.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on incident management."
          subhead="Field-tested guidance on reporting, escalation, and closing the loop — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Incident Management."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "How fast can a worker actually submit an incident report?",
              answer:
                "Five taps from a phone browser — severity, a photo, and a short note. Site and reporter are captured automatically, no separate app to install.",
            },
            {
              question: "What happens when I mark an incident as High or Critical?",
              answer:
                "It escalates straight to the assigned manager's dashboard the moment it's submitted — no forwarding, no waiting for someone to notice a message.",
            },
            {
              question: "Can we track corrective actions to make sure they actually get done?",
              answer:
                "Yes. Every incident can have one or more corrective actions assigned, tracked to completion, and verified before the incident is marked closed.",
            },
            {
              question: "Does every status change get logged with a timestamp?",
              answer:
                "Yes — Submitted, Under Manager Review, Escalated, Action In Progress, Action Completed, and Closed are all timestamped automatically as incidents move, not reconstructed after the fact.",
            },
            {
              question: "Can Field Crew see other people's incident reports?",
              answer:
                "No — Field Crew accounts only see the reports they've submitted themselves. Managers see everything for their assigned sites; Superadmins see across the whole company.",
            },
            {
              question: "Is incident data isolated between different companies on 360crd?",
              answer:
                "Yes. Every incident belongs to exactly one company, enforced at the database level — the same multi-tenant isolation used across the whole platform.",
            },
            {
              question: "Can we attach photos and videos as evidence?",
              answer:
                "Yes, directly to the report at submission or added later during investigation — no separate upload tool or shared drive needed.",
            },
            {
              question: "Does incident data feed into audits or training automatically?",
              answer:
                "It feeds them, not triggers them automatically — incident trends inform audit scheduling, and repeated incidents can flag a team for retraining. Nothing happens without a person acting on it.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
