import type { Metadata } from "next";
import {
  ArrowUpCircle,
  Award,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileCheck,
  GraduationCap,
  KeyRound,
  Lock,
  ShieldCheck,
  TriangleAlert,
  UserCircle,
  Users,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import TrainingPreview from "@/components/marketing/training-preview";
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
  title: "Training & Certification — 360crd",
  description:
    "Assign, complete, and certify — training that tracks itself, with renewal reminders before anything lapses and a complete record for every worker.",
};

export default function TrainingPage() {
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
          breadcrumb={["Platform", "Features", "Training & Certification"]}
          accentTheme="violet"
          icon={<GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="TRAINING & CERTIFICATION"
          title="Assign, complete, and certify — training that tracks itself."
          description="Assign a module to a role, track completion as it happens, and issue a certificate the moment it's earned — with renewal reminders before anything lapses."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <GraduationCap className="h-5 w-5" aria-hidden="true" />,
              value: "18",
              label: "Active Trainings",
              trendLabel: "+6 this quarter",
              tint: "#7e14ff",
              sparkline: "M0,44 L28,38 L57,40 L85,28 L114,30 L142,18 L171,20 L200,10",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Certification Trail Coverage",
              trendLabel: "Always on",
              tint: "#10b981",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "Auto",
              label: "Renewal Reminders",
              trendLabel: "Before it lapses",
              tint: "#f59e0b",
              sparkline: "M0,40 L28,34 L57,36 L85,26 L114,28 L142,16 L171,18 L200,10",
            },
          ]}
          screenshotNode={<TrainingPreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "4",
              label: "Certification Types",
              description: "Fall Protection, Confined Space, First Aid, PPE — plus any custom module you add.",
            },
            {
              value: "6",
              label: "Workflow Stages",
              description: "Assigned through Certified, every step timestamped.",
            },
            {
              value: "Unlimited",
              label: "Custom Training Modules",
              description: "Build your own, alongside the standard library.",
            },
            {
              value: "Real-Time",
              label: "Expiry Alerts",
              description: "Renewal reminders reach the worker and manager automatically.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE TRAINING WORKFLOW"
          heading="From assigned to certified, automatically tracked."
          body="Assign a training module to a role or a worker — they complete it, take the assessment, and a certificate is issued the moment they pass. Every completion is timestamped, every score is logged, and renewal reminders go out before a certification lapses. When compliance asks who's current on Fall Protection, you already know — not a spreadsheet three months out of date."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/training-intro.jpg"
          imageAlt="Two workers in hard hats and safety glasses going over a training briefing together"
          topCard={{
            icon: <GraduationCap className="h-4 w-4" aria-hidden="true" />,
            title: "Certification Record",
            subtitle: "Live status of your latest assignment",
            rows: [
              { label: "Training", value: "Fall Protection" },
              { label: "Status", value: "Certified", tone: "emerald" },
              { label: "Expires", value: "14 Mar 2027" },
            ],
            cta: { label: "View Certificate", href: "/demo" },
          }}
          bottomCard={{
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
            title: "Completion Stats",
            subtitle: "This month",
            rows: [
              { label: "Avg. Completion Time", value: "2.4 hrs" },
              { label: "Assigned", value: "18" },
              { label: "Certified", value: "11", tone: "emerald" },
            ],
          }}
          featureBlocks={[
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              title: "Role-Based Assignment",
              description: "Assign a module to a role, and it applies to everyone in it — including new hires.",
            },
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Built-In Assessment",
              description: "A quiz or practical check-off before a certificate is issued, not just a completion checkbox.",
            },
            {
              icon: <Award className="h-5 w-5" aria-hidden="true" />,
              title: "Digital Certificates",
              description: "Issued automatically the moment a worker passes, logged to their record.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              title: "Renewal Reminders",
              description: "Workers and managers are flagged before a certification lapses, not after.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Assign. Complete. Certify."
          subhead="From the first assignment to a logged certificate — see exactly how it moves."
          accentTheme="violet"
          steps={[
            {
              label: "STEP 1",
              title: "Assign training to a role or worker",
              body: "Pick a module and assign it to a role — every worker in that role gets it, including anyone added later. No manual re-assignment needed.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Two workers on-site discussing an assigned training requirement",
            },
            {
              label: "STEP 2",
              title: "Worker completes modules and assessment",
              body: "The worker finishes the required content and takes the assessment from their own device — in the field, on a break, wherever they are.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "Worker completing a training assessment on a laptop",
            },
            {
              label: "STEP 3",
              title: "Certificate issued and tracked to expiry",
              body: "A certificate is issued the moment they pass, logged to their record, and tracked toward its renewal date automatically.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "Digital certificate with an expiry date tracked on a worker's record",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to certified."
          subhead="From the first assignment to renewal — see exactly where every worker stands."
          accentTheme="violet"
          stages={[
            {
              label: "Assigned",
              description: "Training assigned to a role or worker",
              owner: "Manager",
              color: "#94a3b8",
              icon: <ClipboardList className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "In Progress",
              description: "Worker has started the required modules",
              owner: "Field Crew",
              color: "#0ea5e9",
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Completed",
              description: "All required content finished",
              owner: "Field Crew",
              color: "#f59e0b",
              icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Assessed",
              description: "Quiz or practical assessment scored",
              owner: "Manager",
              color: "#7e14ff",
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Certified",
              description: "Certificate issued and logged to the record",
              owner: "Manager",
              color: "#34d399",
              icon: <Award className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Renewal Due",
              description: "Certification nearing expiry, flagged for renewal",
              owner: "Manager",
              color: "#e11d48",
              icon: <TriangleAlert className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE TRAINING & CERTIFICATION"
          heading="Six capabilities. One connected module."
          subhead="Every certification runs through the same core engine — from first assignment to renewal."
          hubIcon={<GraduationCap aria-hidden="true" />}
          capabilities={[
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Role-Based Assignment",
              description: "Assign a module to a role and every worker in it is covered automatically.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              color: "#14b8a6",
              title: "Progress Tracking",
              description: "Every stage timestamped, from Assigned to Certified.",
            },
            {
              icon: <ClipboardCheck className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Assessment & Scoring",
              description: "A quiz or practical check-off before a certificate is ever issued.",
            },
            {
              icon: <Award className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Certificate Generation",
              description: "Issued automatically the moment a worker passes, logged to their record.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Overdue Escalation",
              description: "Training that's overdue routes straight to the assigned manager.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Certification Trends",
              description: "See coverage across sites — who's current, and who's about to lapse.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Training & Certification, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Training Oversight",
              bullets: [
                "All trainings, every company & site",
                "Full certification control, any stage",
                "Cross-site coverage trends",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Assign, Track, Certify",
              bullets: [
                "Assign training by role or worker",
                "Track completion for assigned sites",
                "Verify assessments and issue certificates",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <ClipboardCheck aria-hidden="true" />,
              title: "Coordinate Site Training",
              bullets: [
                "Monitor crew certification status",
                "Flag overdue and expiring trainings",
                "Coordinate makeup sessions",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Learn and Certify from Any Device",
              bullets: [
                "Complete modules from a phone browser",
                "Take assessments in the field",
                "Track your own certificates and expiry",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to stop tracking certifications in a spreadsheet?"
          description="Book a 20-minute walkthrough and see 360crd's training and certification running on a site like yours — role-based assignment, built-in assessment, and renewal reminders, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="Training doesn't happen in isolation. Neither does the data."
          subhead="Every certification quietly feeds the modules built to keep sites compliant."
          connections={[
            {
              sourceIcon: <GraduationCap aria-hidden="true" />,
              sourceColor: "#7e14ff",
              targetIcon: <ClipboardList aria-hidden="true" />,
              targetColor: "#0ea5e9",
              title: "Feeds Inductions",
              body: "Completed training pre-fills what's required at site induction — nothing gets asked twice.",
            },
            {
              sourceIcon: <GraduationCap aria-hidden="true" />,
              sourceColor: "#7e14ff",
              targetIcon: <FileCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Feeds Audits",
              body: "Certification coverage feeds directly into audit scheduling — expired certs surface before an inspector asks.",
            },
            {
              sourceIcon: <GraduationCap aria-hidden="true" />,
              sourceColor: "#7e14ff",
              targetIcon: <TriangleAlert aria-hidden="true" />,
              targetColor: "#f43f5e",
              title: "Flags Incident Risk",
              body: "Sites with lapsed certifications are flagged before a preventable incident happens, not after.",
            },
            {
              sourceIcon: <GraduationCap aria-hidden="true" />,
              sourceColor: "#7e14ff",
              targetIcon: <KeyRound aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Links to Roles & Permissions",
              body: "What a worker's certified for shapes what they're permitted to do in the system.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every certification record, audit-ready and locked down."
          body="Training data doesn't just sit in a spreadsheet — it's structured evidence. Map it straight to your ISO 45001 audit trail, and know it's isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Evidence",
              description: "Completion dates, scores, and certificates — structured the way an auditor expects to see them.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every training record belongs to exactly one company, enforced at the database level.",
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
                "[PLACEHOLDER] We used to track certifications in a spreadsheet that was always out of date. Now expiry alerts happen automatically, before anyone's caught unqualified.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] Assigning training used to mean chasing people down. Now it's on their phone, and I can see who's actually finished.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] My crew can finish a module and get certified from their phone during a break — no classroom, no waiting.",
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
          subhead="Field-tested guidance on training, compliance, and closing the loop — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Training & Certification."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "How does a worker actually complete a training module?",
              answer:
                "From a phone browser — modules, an assessment, and a certificate, no classroom or separate app required.",
            },
            {
              question: "What happens when a certification is about to expire?",
              answer:
                "The worker and their manager both get flagged automatically before the renewal window closes — no more expired certs going unnoticed.",
            },
            {
              question: "Can we assign training by role instead of person-by-person?",
              answer:
                "Yes. Assign a module to a role — like all Field Crew at a site — and it applies to everyone in that role automatically, including new hires.",
            },
            {
              question: "Does every completion get logged with a timestamp?",
              answer:
                "Yes — Assigned, In Progress, Completed, Assessed, Certified, and Renewal Due are all timestamped automatically.",
            },
            {
              question: "Can Field Crew see other people's training records?",
              answer:
                "No — Field Crew accounts only see their own training and certificates. Managers see everything for their assigned sites.",
            },
            {
              question: "Is training data isolated between different companies on 360crd?",
              answer:
                "Yes. Every training record belongs to exactly one company, enforced at the database level — the same multi-tenant isolation used across the whole platform.",
            },
            {
              question: "Can we track assessment scores, not just completion?",
              answer:
                "Yes, directly on the record alongside the completion date and certificate — not a separate spreadsheet.",
            },
            {
              question: "Does training data feed into audits automatically?",
              answer:
                "It feeds them, not triggers them automatically — certification coverage informs audit scheduling. Nothing happens without a person acting on it.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
