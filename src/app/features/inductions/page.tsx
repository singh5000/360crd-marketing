import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  GraduationCap,
  KeyRound,
  Lock,
  PenTool,
  ShieldCheck,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import InductionPreview from "@/components/marketing/induction-preview";
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
  title: "Site Inductions — 360crd",
  description:
    "Brief, sign off, and clear workers, visitors, and contractors for site access — a site-specific safety briefing with a complete, timestamped sign-off trail.",
};

export default function InductionsPage() {
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
          breadcrumb={["Platform", "Features", "Site Inductions"]}
          accentTheme="emerald"
          icon={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="SITE INDUCTIONS"
          title="Brief, sign off, and clear workers for site access — before they arrive."
          description="Send a site-specific safety briefing to any worker, visitor, or contractor — they review it, acknowledge the hazards, and are cleared for access the moment they sign off."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <FileText className="h-5 w-5" aria-hidden="true" />,
              value: "9",
              label: "Active Site Briefings",
              trendLabel: "+3 this quarter",
              tint: "#10b981",
              sparkline: "M0,44 L28,38 L57,40 L85,28 L114,30 L142,18 L171,20 L200,10",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Sign-Off Trail Coverage",
              trendLabel: "Always on",
              tint: "#7e14ff",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "Minutes",
              label: "Time to Cleared Access",
              trendLabel: "Not hours",
              tint: "#f59e0b",
              sparkline: "M0,40 L28,34 L57,36 L85,26 L114,28 L142,16 L171,18 L200,10",
            },
          ]}
          screenshotNode={<InductionPreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "4",
              label: "Induction Types",
              description: "New Hire, Contractor, Visitor, Re-Induction — each with its own briefing.",
            },
            {
              value: "6",
              label: "Workflow Stages",
              description: "Scheduled through Access Granted, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Site-Specific Briefings",
              description: "Build your own per site — no generic one-size-fits-all form.",
            },
            {
              value: "Real-Time",
              label: "Expiry Alerts",
              description: "Re-induction reminders reach the worker and manager automatically.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE INDUCTION WORKFLOW"
          heading="From briefing sent to cleared for access."
          body="Send a site-specific safety briefing to any worker, visitor, or contractor before they arrive — they review the hazards and site rules, acknowledge them digitally, and are cleared for access the moment they sign off. Every induction is timestamped and tracked toward its expiry, so a re-induction is never overdue without anyone noticing. When a visitor shows up at the gate, you already know whether they're cleared — not guessing from a clipboard sign-in sheet."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/induction-intro.jpg"
          imageAlt="A site supervisor reviewing a site induction checklist with a worker on a clipboard"
          topCard={{
            icon: <FileText className="h-4 w-4" aria-hidden="true" />,
            title: "Induction Record",
            subtitle: "Live status of your latest sign-off",
            rows: [
              { label: "Worker", value: "J. Reyes" },
              { label: "Status", value: "Access Granted", tone: "emerald" },
              { label: "Site", value: "Harbor Yard" },
            ],
            cta: { label: "View Sign-Off", href: "/demo" },
          }}
          bottomCard={{
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
            title: "Clearance Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Time to Cleared", value: "6 min" },
              { label: "Inducted", value: "9" },
              { label: "Access Granted", value: "7", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <FileText className="h-5 w-5" aria-hidden="true" />,
              title: "Site-Specific Briefings",
              description: "Hazards, rules, and emergency procedures built per site, not a generic form.",
            },
            {
              icon: <PenTool className="h-5 w-5" aria-hidden="true" />,
              title: "Digital Sign-Off",
              description: "Acknowledge and sign the briefing from any device — no paper form to lose.",
            },
            {
              icon: <UserCircle className="h-5 w-5" aria-hidden="true" />,
              title: "Visitor & Contractor Access",
              description: "Induct anyone stepping on site, not just employees on payroll.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              title: "Re-Induction Reminders",
              description: "Workers and managers are flagged before an induction lapses, not after.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Brief. Sign off. Cleared."
          subhead="From the first briefing to site access — see exactly how it moves."
          accentTheme="emerald"
          steps={[
            {
              label: "STEP 1",
              title: "Send the briefing before they arrive",
              body: "A manager schedules and sends the site-specific safety briefing to an incoming worker, contractor, or visitor.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Two workers on-site going over a safety briefing together",
            },
            {
              label: "STEP 2",
              title: "Worker reviews and acknowledges on-site",
              body: "They review the site's hazards, rules, and emergency procedures, then acknowledge and sign off digitally — from any device.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "Worker acknowledging a site safety briefing on a laptop",
            },
            {
              label: "STEP 3",
              title: "Access granted, tracked to expiry",
              body: "They're cleared to work the moment they sign off, with the induction's validity tracked automatically toward its expiry.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "Access granted confirmation with an induction expiry date tracked",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to cleared."
          subhead="From the first briefing to re-induction — see exactly where every worker stands."
          accentTheme="emerald"
          stages={[
            {
              label: "Scheduled",
              description: "Induction scheduled for an incoming worker or visitor",
              owner: "Manager",
              color: "#94a3b8",
              icon: <FileText className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Briefing Sent",
              description: "Site safety briefing sent to complete before arrival",
              owner: "Manager",
              color: "#0ea5e9",
              icon: <FileCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Briefing Completed",
              description: "Worker has reviewed the site-specific safety briefing",
              owner: "Field Crew",
              color: "#f59e0b",
              icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Acknowledged",
              description: "Hazards and site rules acknowledged and signed off",
              owner: "Field Crew",
              color: "#7e14ff",
              icon: <PenTool className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Access Granted",
              description: "Cleared to work, badge or access issued",
              owner: "Manager",
              color: "#34d399",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Expiring Soon",
              description: "Induction nearing its validity window, re-induction due",
              owner: "Manager",
              color: "#e11d48",
              icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE SITE INDUCTIONS"
          heading="Six capabilities. One connected module."
          subhead="Every induction runs through the same core engine — from first briefing to cleared access."
          hubIcon={<FileText aria-hidden="true" />}
          capabilities={[
            {
              icon: <FileText className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Site-Specific Briefings",
              description: "Hazards, rules, and emergency procedures, built per site.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              color: "#14b8a6",
              title: "Status Timeline",
              description: "Every stage timestamped, from Scheduled to Access Granted.",
            },
            {
              icon: <PenTool className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Digital Sign-Off",
              description: "Acknowledge and sign a briefing from any device — no paper form.",
            },
            {
              icon: <UserCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Visitor & Contractor Access",
              description: "Induct anyone stepping on site, not just employees on payroll.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Manager Escalation",
              description: "Overdue inductions route straight to the assigned manager.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Induction Trends",
              description: "See coverage across sites — who's cleared, and who's about to lapse.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Site Inductions, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Induction Oversight",
              bullets: [
                "All inductions, every company & site",
                "Full status control, any stage",
                "Cross-site compliance trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Send, Verify, Approve",
              bullets: [
                "Send briefings to incoming workers",
                "Verify sign-offs for assigned sites",
                "Approve access the moment they're cleared",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <FileText aria-hidden="true" />,
              title: "Coordinate Site Access",
              bullets: [
                "Track who's cleared per site",
                "Flag overdue re-inductions",
                "Manage visitor and contractor schedules",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Get Cleared in Minutes",
              bullets: [
                "Complete the briefing from any device",
                "Sign off digitally, no paper form",
                "Track your own induction status",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to clear workers for site access in minutes?"
          description="Book a 20-minute walkthrough and see 360crd's site inductions running on a site like yours — site-specific briefings, digital sign-off, and a complete clearance trail, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="Inductions don't happen in isolation. Neither does the data."
          subhead="Every sign-off quietly feeds the modules built to keep sites compliant."
          connections={[
            {
              sourceIcon: <FileText aria-hidden="true" />,
              sourceColor: "#10b981",
              targetIcon: <AlertTriangle aria-hidden="true" />,
              targetColor: "#f43f5e",
              title: "Feeds Incidents",
              body: "An induction record confirms a worker was briefed on a site's hazards before they ever file a report there.",
            },
            {
              sourceIcon: <FileText aria-hidden="true" />,
              sourceColor: "#10b981",
              targetIcon: <FileCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Feeds Audits",
              body: "Induction completion rates feed directly into audit scheduling — uninducted crews are visible before an inspector asks.",
            },
            {
              sourceIcon: <FileText aria-hidden="true" />,
              sourceColor: "#10b981",
              targetIcon: <GraduationCap aria-hidden="true" />,
              targetColor: "#7e14ff",
              title: "Draws From Training",
              body: "A worker's completed trainings pre-fill what's already covered — the induction only asks what's still needed.",
            },
            {
              sourceIcon: <FileText aria-hidden="true" />,
              sourceColor: "#10b981",
              targetIcon: <Wrench aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Links to Assets",
              body: "Equipment access at a site is enabled only after site induction is confirmed.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every induction record, audit-ready and locked down."
          body="Induction data doesn't just sit in a signed PDF — it's structured evidence. Map it straight to your ISO 45001 audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Evidence",
              description: "Briefing completion, acknowledgment, and sign-off — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every induction record belongs to exactly one company, enforced at the database level.",
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
                "[PLACEHOLDER] We used to induct visitors with a paper form nobody could find later. Now every sign-off is timestamped and searchable.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] A new contractor can be briefed and cleared before they even step on site — not standing around waiting for someone with a clipboard.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] My crew completes the site briefing on their phone during the drive in. By the time they arrive, they're cleared.",
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
          subhead="Field-tested guidance on inductions, compliance, and closing the loop — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Site Inductions."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "How fast can a visitor or contractor actually get inducted?",
              answer:
                "Send the site-specific briefing before they arrive — they review it, sign off, and are cleared to work in minutes, not a paperwork queue.",
            },
            {
              question: "What happens when an induction is about to expire?",
              answer:
                "The worker and their manager are both flagged automatically before the validity window closes — no one shows up on-site with a lapsed induction unnoticed.",
            },
            {
              question: "Can we send different briefings for different sites?",
              answer:
                "Yes. Each site has its own induction content — hazards, rules, and emergency procedures specific to that location, not a generic one-size-fits-all form.",
            },
            {
              question: "Does every sign-off get logged with a timestamp?",
              answer:
                "Yes — Scheduled, Briefing Sent, Briefing Completed, Acknowledged, Access Granted, and Expiring Soon are all timestamped automatically.",
            },
            {
              question: "Can Field Crew see other people's induction records?",
              answer:
                "No — Field Crew accounts only see their own induction status. Managers see everything for their assigned sites.",
            },
            {
              question: "Is induction data isolated between different companies on 360crd?",
              answer:
                "Yes. Every induction record belongs to exactly one company, enforced at the database level.",
            },
            {
              question: "Can visitors and contractors be inducted, not just employees?",
              answer:
                "Yes — the induction workflow works the same for any visitor, contractor, or new hire who needs site-specific clearance.",
            },
            {
              question: "Does induction data feed into audits automatically?",
              answer:
                "It feeds them, not triggers them automatically — completion rates inform audit scheduling. Nothing happens without a person acting on it.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
