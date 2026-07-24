import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
  Calendar,
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
  TrendingUp,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import AuditPreview from "@/components/marketing/audit-preview";
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
  title: "Audits & Compliance — 360crd",
  description:
    "Run ISO and OSHA-mapped audits from any device, score against a template, and route non-conformances straight to a corrective action — every record timestamped and audit-ready.",
};

export default function AuditsPage() {
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
          breadcrumb={["Platform", "Features", "Audits & Compliance"]}
          accentTheme="amber"
          icon={<ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="AUDITS & COMPLIANCE"
          title="ISO and OSHA-mapped audits — scored on-site, tracked to closed."
          description="Run a structured audit from any device, score it against your template, and route non-conformances straight to a corrective action — every record timestamped and ready before an inspector asks."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
              value: "92%",
              label: "Average Audit Score",
              trendLabel: "+6% QoQ",
              tint: "#f59e0b",
              sparkline: "M0,40 L28,36 L57,30 L85,32 L114,22 L142,24 L171,14 L200,10",
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
              value: "48 hrs",
              label: "Avg. Corrective Action Time",
              trendLabel: "-14% QoQ",
              tint: "#0ea5e9",
              sparkline: "M0,14 L28,20 L57,18 L85,26 L114,24 L142,32 L171,30 L200,38",
            },
          ]}
          screenshotNode={<AuditPreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "5",
              label: "Audit Templates",
              description: "ISO 45001, OSHA, PPE, Environmental, and custom — pick one and go.",
            },
            {
              value: "6",
              label: "Status Stages",
              description: "Scheduled through Closed, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Photo Evidence",
              description: "Attach evidence to any checklist item, no separate upload tool.",
            },
            {
              value: "Real-Time",
              label: "Non-Conformance Routing",
              description: "Failed items route straight to a corrective action, instantly.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE AUDIT WORKFLOW"
          heading="From scheduled walkthrough to closed audit."
          body="Schedule an audit against a template — ISO 45001, OSHA, or one you've built yourself — and score it from a phone or tablet on-site. Failed items become corrective actions automatically, assigned and tracked until they're verified closed. Every score, photo, and sign-off is timestamped, so when an inspector asks for evidence, you hand over a structured record instead of a stack of paper checklists."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/audit-intro.jpg"
          imageAlt="A construction inspector in a hard hat and safety vest holding a clipboard while reviewing an inspection checklist"
          topCard={{
            icon: <ClipboardCheck className="h-4 w-4" aria-hidden="true" />,
            title: "Audit Record",
            subtitle: "Live status of your latest audit",
            rows: [
              { label: "Template", value: "ISO 45001" },
              { label: "Status", value: "Corrective Actions", tone: "amber" },
              { label: "Site", value: "Harbor Yard" },
            ],
            cta: { label: "View Checklist", href: "/demo" },
          }}
          bottomCard={{
            icon: <BarChart3 className="h-4 w-4" aria-hidden="true" />,
            title: "Audit Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Score", value: "92%" },
              { label: "Total Audits", value: "6" },
              { label: "Closed", value: "2", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Template-Driven Scoring",
              description: "Score against ISO 45001, OSHA, or a template you've built — consistent every time.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              title: "Photo Evidence Per Item",
              description: "Attach evidence to any checklist item, right where the score lives.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              title: "Automatic Non-Conformance Routing",
              description: "A failed item becomes a corrective action instantly — no separate step.",
            },
            {
              icon: <FileCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Full Audit Trail",
              description: "Every score, photo, and sign-off, timestamped — ready the moment an inspector asks.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Three steps. Zero guesswork."
          subhead="From scheduled walkthrough to closed audit — see exactly how it moves."
          accentTheme="amber"
          steps={[
            {
              label: "STEP 1",
              title: "Schedule against a template",
              body: "Pick a site, a date, and a template — ISO 45001, OSHA, or one you've built. The checklist is ready before the auditor arrives.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "A manager scheduling an audit on a laptop",
            },
            {
              label: "STEP 2",
              title: "Score the checklist on-site",
              body: "Walk the site with the checklist on a phone or tablet — score each item, attach photo evidence, and flag anything that fails.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "An inspector scoring a checklist item on-site",
            },
            {
              label: "STEP 3",
              title: "Close out corrective actions",
              body: "Failed items become corrective actions automatically — assigned, tracked, and verified before the audit is marked closed.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "A hand checking off the final corrective action on a digital checklist",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to close."
          subhead="From the first scheduled audit to the final sign-off — see exactly where every audit stands."
          accentTheme="amber"
          stages={[
            {
              label: "Scheduled",
              description: "Booked against a site and template",
              owner: "Manager",
              color: "#94a3b8",
              icon: <Calendar className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "In Progress",
              description: "Checklist being scored on-site",
              owner: "Staff",
              color: "#0ea5e9",
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Submitted",
              description: "Completed checklist submitted for review",
              owner: "Staff",
              color: "#f59e0b",
              icon: <Send className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Reviewed",
              description: "Manager reviews the score and flagged items",
              owner: "Manager",
              color: "#7e14ff",
              icon: <Eye className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Corrective Actions Assigned",
              description: "Failed items assigned and tracked to fix",
              owner: "Manager",
              color: "#f43f5e",
              icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Closed",
              description: "All corrective actions verified, fully audit-ready",
              owner: "Manager",
              color: "#059669",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE AUDITS & COMPLIANCE"
          heading="Six capabilities. One connected module."
          subhead="Every audit runs through the same core engine — from template to trend analysis."
          hubIcon={<ClipboardCheck aria-hidden="true" />}
          capabilities={[
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Template Library",
              description: "ISO 45001, OSHA, PPE, Environmental — or build your own from scratch.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Checklist Scoring",
              description: "Score every item on-site, with photo evidence attached where it matters.",
            },
            {
              icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Non-Conformance Tracking",
              description: "A failed item is flagged and routed the moment it's scored.",
            },
            {
              icon: <Camera className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Photo Evidence",
              description: "Attach evidence directly to the checklist item, no separate upload tool.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Manager Escalation",
              description: "Failed items route straight to the assigned manager for corrective action.",
            },
            {
              icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
              color: "#14b8a6",
              title: "Compliance Trends",
              description: "See scores trend across sites — where risk is building, and where it's improving.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Audits & Compliance, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Compliance Oversight",
              bullets: [
                "All audits, every company & site",
                "Full template control, any stage",
                "Cross-site compliance trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Schedule, Review, Close",
              bullets: [
                "Schedule audits for assigned sites",
                "Review scores and flagged items",
                "Assign and verify corrective actions",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <ClipboardCheck aria-hidden="true" />,
              title: "Score Checklists On-Site",
              bullets: [
                "Score assigned audits from any device",
                "Attach photo evidence per item",
                "Flag non-conformances as they're found",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Complete Corrective Actions",
              bullets: [
                "See corrective actions assigned to you",
                "Mark fixes complete with evidence",
                "Track your own action history",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to run audits that close themselves out?"
          description="Book a 20-minute walkthrough and see 360crd's audit module running on a site like yours — template-driven scoring, automatic corrective actions, and a full audit trail, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="An audit isn't a snapshot. It's everything that led up to it."
          subhead="Every checklist quietly draws on the modules already tracking what's happening on-site."
          connections={[
            {
              sourceIcon: <AlertTriangle aria-hidden="true" />,
              sourceColor: "#f43f5e",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Draws From Incidents",
              body: "Incident trends and site history flag where additional audit coverage matters most — before a scheduled walkthrough even starts.",
            },
            {
              sourceIcon: <GraduationCap aria-hidden="true" />,
              sourceColor: "#7e14ff",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Draws From Training",
              body: "Certification status and overdue trainings surface directly on the checklist — a live cross-check, not a separate report to pull.",
            },
            {
              sourceIcon: <FileText aria-hidden="true" />,
              sourceColor: "#10b981",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Draws From Site Inductions",
              body: "Access and briefing records confirm exactly who was cleared on-site — built into the evidence, not requested after the fact.",
            },
            {
              sourceIcon: <Shield aria-hidden="true" />,
              sourceColor: "#0ea5e9",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Draws From PPE Tracking",
              body: "Equipment compliance status feeds the checklist automatically — no separate PPE report to chase down before an audit.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every audit record is the evidence — structured, timestamped, and locked down."
          body="An audit here isn't a report about compliance — the record itself is the evidence. Map it straight to your ISO 45001 or OSHA audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001 & OSHA-Ready Evidence",
              description: "Scores, photo evidence, and corrective actions — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every audit belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Role-Gated Access",
              description: "Only the roles permitted to see an audit, see it — enforced on every request.",
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
                "[PLACEHOLDER] Our ISO audits used to live in a binder. Now every score, photo, and corrective action is in one place, ready before the auditor even asks.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] A failed checklist item used to sit in someone's notebook for a week. Now it's a corrective action on my dashboard the second it's scored.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] I score the whole site walkthrough from my phone now. No more re-typing a paper checklist back at the office.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on audits & compliance."
          subhead="Field-tested guidance on scoring, corrective actions, and staying audit-ready — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Audits & Compliance."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "Which audit templates come built in?",
              answer:
                "ISO 45001, OSHA compliance, PPE walkthroughs, and environmental audits ship as ready-to-use templates. You can also build a custom template from scratch for anything specific to your sites.",
            },
            {
              question: "Can an audit be scored entirely from a phone or tablet?",
              answer:
                "Yes — the full checklist, scoring, and photo evidence capture work from any device on-site. Nothing needs to be re-typed back at an office later.",
            },
            {
              question: "What happens when a checklist item fails?",
              answer:
                "It's flagged as a non-conformance immediately and becomes a corrective action — assigned to an owner and tracked until it's verified and the audit can close.",
            },
            {
              question: "Does every score and status change get logged with a timestamp?",
              answer:
                "Yes — Scheduled, In Progress, Submitted, Reviewed, Corrective Actions Assigned, and Closed are all timestamped automatically as an audit moves, not reconstructed after the fact.",
            },
            {
              question: "Can field workers see every audit, or just their own corrective actions?",
              answer:
                "Field Worker accounts only see the corrective actions assigned to them. Staff accounts see the audits they're scoring; Managers see everything for their assigned sites; Superadmins see across the whole company.",
            },
            {
              question: "Is audit data isolated between different companies on 360crd?",
              answer:
                "Yes. Every audit belongs to exactly one company, enforced at the database level — the same multi-tenant isolation used across the whole platform.",
            },
            {
              question: "Can we attach photo evidence to individual checklist items?",
              answer:
                "Yes, directly to each item as it's scored — no separate upload tool or shared drive needed to keep evidence tied to the right line item.",
            },
            {
              question: "Does audit data connect to incidents, training, or inductions automatically?",
              answer:
                "It draws from them, not the other way around — incident trends, certification status, and induction records all surface on the checklist to give an auditor the full picture in one place.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
