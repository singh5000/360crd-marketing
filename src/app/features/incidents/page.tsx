import type { Metadata } from "next";
import { AlertTriangle, Clock, FileCheck, ShieldCheck, Users, Zap } from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import IncidentPreview from "@/components/marketing/incident-preview";
import CapabilityWalkthrough from "@/components/marketing/capability-walkthrough";
import Footer from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Incident Management — 360crd",
  description:
    "Report, investigate, and close incidents with a complete audit trail — evidence attached, severity tracked, nothing lost in a chat thread.",
};

export default function IncidentManagementPage() {
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
              screenshotAlt: "Field incident-report form with a severity picker and photo upload",
            },
            {
              label: "STEP 2",
              title: "Manager reviews and escalates",
              body: "The report lands on the assigned Manager's dashboard instantly. They review the evidence, request more information if needed, or escalate High and Critical incidents for immediate action.",
              screenshotAlt: "Manager's incident review screen with status change and escalation action",
            },
            {
              label: "STEP 3",
              title: "Closed with a full audit trail",
              body: "Every status change — Submitted, Under Review, Escalated, Action In Progress, Closed — is timestamped. When an auditor asks for proof, it's already there.",
              screenshotAlt: "Incident detail timeline showing the full status history",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
