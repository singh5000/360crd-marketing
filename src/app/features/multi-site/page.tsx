import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
  Box,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileCheck,
  KeyRound,
  Lock,
  MapPin,
  Send,
  ShieldCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import MultiSitePreview from "@/components/marketing/multi-site-preview";
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
  title: "Multi-Site & Company Management — 360crd",
  description:
    "Structure your organization the way it actually runs — companies, then sites within them. Spin up a new site in minutes, and see every company and site from one dashboard.",
};

export default function MultiSitePage() {
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
          breadcrumb={["Platform", "Features", "Multi-Site & Company Management"]}
          accentTheme="fuchsia"
          icon={<Building2 className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="MULTI-SITE & COMPANY MANAGEMENT"
          title="Every company, every site, one connected view."
          description="Structure your organization the way it actually runs — companies, then sites within them. Spin up a new site in minutes, scope every role and record automatically, and see the whole structure from a single dashboard."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
              value: "Unlimited",
              label: "Sites per Company",
              trendLabel: "Scales with you",
              tint: "#c026d3",
              sparkline: "M0,36 L28,30 L57,32 L85,22 L114,24 L142,14 L171,16 L200,8",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Data Isolation",
              trendLabel: "Always on",
              tint: "#10b981",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              value: "<5 Min",
              label: "New Site Setup",
              trendLabel: "Provisioned instantly",
              tint: "#0ea5e9",
              sparkline: "M0,14 L28,20 L57,18 L85,26 L114,24 L142,32 L171,30 L200,38",
            },
          ]}
          screenshotNode={<MultiSitePreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "Unlimited",
              label: "Sites per Company",
              description: "Add a new site in minutes — no separate contract, no waiting on setup.",
            },
            {
              value: "6",
              label: "Status Stages",
              description: "Requested through Archived, every site tracked.",
            },
            {
              value: "100%",
              label: "Site-Scoped Data",
              description: "Every record — incident, audit, asset — tied to exactly one site.",
            },
            {
              value: "Real-Time",
              label: "Cross-Site Visibility",
              description: "Superadmins see every company and site's status from a single dashboard.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE STRUCTURE, EVERY SITE"
          heading="Add a site in minutes. See them all from one dashboard."
          body="Structure your organization the way it actually runs — one or more companies, each with its own sites underneath. Add a new company or site with a name and a manager, and it's live in minutes, no separate contract or setup call required. Every record created anywhere on the platform — an incident, an audit, a PPE assignment — is automatically scoped to the company and site it happened on, so data never leaks across boundaries. Superadmins get a single dashboard showing every company and site's health at a glance; Managers see only what's assigned to them."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/multi-site-intro.jpg"
          imageAlt="A site manager reviewing site data on a tablet at an active construction site"
          topCard={{
            icon: <Building2 className="h-4 w-4" aria-hidden="true" />,
            title: "Site Record",
            subtitle: "Live status of your newest site",
            rows: [
              { label: "Site", value: "Elm Street Site" },
              { label: "Status", value: "Provisioning", tone: "sky" },
              { label: "Manager", value: "T. Nguyen" },
            ],
            cta: { label: "View Site", href: "/demo" },
          }}
          bottomCard={{
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
            title: "Company Stats",
            subtitle: "This month",
            rows: [
              { label: "Total Sites", value: "6" },
              { label: "Active", value: "3", tone: "emerald" },
              { label: "Total Workers", value: "94" },
            ],
          }}
          featureBlocks={[
            {
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
              title: "Add a Site in Minutes",
              description: "Name it, assign a manager, and it's ready to assign workers to.",
            },
            {
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
              title: "Automatic Data Isolation",
              description: "Every record scoped to its company and site, enforced at the database level.",
            },
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              title: "Site-Scoped Roles",
              description: "A Manager's access is limited to the sites they're assigned to — no cross-site exposure.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              title: "Cross-Site Dashboard",
              description: "See every company and site's status, worker count, and health, in one view.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Three steps. Zero guesswork."
          subhead="From a new site request to a fully active location — see exactly how it moves."
          accentTheme="fuchsia"
          steps={[
            {
              label: "STEP 1",
              title: "Request a new site",
              body: "An admin names the site, sets its region, and assigns a manager — the request is logged and provisioning starts immediately.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Two people discussing plans for a new site location",
            },
            {
              label: "STEP 2",
              title: "Provision and assign roles",
              body: "The site is configured with its own data boundary, and a manager is assigned to start onboarding workers and inducting them.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "A manager setting up a new site's roles and permissions on a laptop",
            },
            {
              label: "STEP 3",
              title: "Go active, fully isolated",
              body: "The site goes active and every record created there — incidents, audits, assets — is automatically scoped to it, isolated from every other site.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "A hand confirming the final setup step for a new site",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to close."
          subhead="From the first request to a fully active site — see exactly where every site stands."
          accentTheme="fuchsia"
          stages={[
            {
              label: "Requested",
              description: "Admin submits a new site request",
              owner: "Superadmin",
              color: "#94a3b8",
              icon: <Send className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Approved",
              description: "Request approved, region and manager assigned",
              owner: "Superadmin",
              color: "#0ea5e9",
              icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Provisioning",
              description: "Site's data boundary and defaults configured",
              owner: "Manager",
              color: "#f59e0b",
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Configured",
              description: "Roles, workers, and site settings finalized",
              owner: "Manager",
              color: "#7e14ff",
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Active",
              description: "Live and scoped, ready for daily operations",
              owner: "Manager",
              color: "#059669",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Archived",
              description: "Site closed out, records retained and locked",
              owner: "Superadmin",
              color: "#64748b",
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE MULTI-SITE & COMPANY MANAGEMENT"
          heading="Six capabilities. One connected module."
          subhead="Every company and site runs through the same core engine — from provisioning to cross-site trends."
          hubIcon={<Building2 aria-hidden="true" />}
          capabilities={[
            {
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
              color: "#c026d3",
              title: "Company & Site Hierarchy",
              description: "Structure your organization the way it runs — companies, then sites within them.",
            },
            {
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Automatic Data Isolation",
              description: "Every record scoped to its company and site, enforced at the database level.",
            },
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Site-Scoped Roles",
              description: "Managers and staff see only the companies and sites they're assigned to.",
            },
            {
              icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Multi-Region Support",
              description: "Sites across cities, states, or countries, tracked from one dashboard.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Cross-Site Dashboard",
              description: "See every company and site's status, headcount, and health, in one view.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Company-Wide Escalation",
              description: "Cross-site trends and issues surface to Superadmins automatically.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Multi-Site & Company Management, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Platform-Wide Company Oversight",
              bullets: [
                "Every company and site, one view",
                "Provision or archive any site",
                "Cross-site trends and health",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Run Your Assigned Sites",
              bullets: [
                "Full visibility into assigned sites",
                "Onboard workers and assign roles",
                "Site-level reporting and trends",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <Building2 aria-hidden="true" />,
              title: "Work Within Your Site",
              bullets: [
                "See records for your assigned site",
                "Switch between sites you're staffed on",
                "No visibility outside your scope",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "One Site at a Time",
              bullets: [
                "Access scoped to your current site",
                "No cross-site data exposure",
                "A simple, focused view of your work",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to run every site from one dashboard?"
          description="Book a 20-minute walkthrough and see 360crd's multi-site management running across sites like yours — instant provisioning, automatic data isolation, and a single company-wide view, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="Company and site structure isn't just an org chart. It's the boundary everything else respects."
          subhead="Every record created anywhere on the platform inherits the structure defined here."
          connections={[
            {
              sourceIcon: <Building2 aria-hidden="true" />,
              sourceColor: "#c026d3",
              targetIcon: <AlertTriangle aria-hidden="true" />,
              targetColor: "#f43f5e",
              title: "Scopes Incidents",
              body: "Every incident is tied to exactly one site — a Manager only ever sees what happened on theirs.",
            },
            {
              sourceIcon: <Building2 aria-hidden="true" />,
              sourceColor: "#c026d3",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Scopes Audits",
              body: "Audit schedules and templates apply per site, so a company with different compliance needs per region stays accurate.",
            },
            {
              sourceIcon: <Building2 aria-hidden="true" />,
              sourceColor: "#c026d3",
              targetIcon: <Box aria-hidden="true" />,
              targetColor: "#0d9488",
              title: "Scopes Assets",
              body: "Equipment is assigned and tracked per site — no accidental cross-site mixups on a shared list.",
            },
            {
              sourceIcon: <Building2 aria-hidden="true" />,
              sourceColor: "#c026d3",
              targetIcon: <KeyRound aria-hidden="true" />,
              targetColor: "#6366f1",
              title: "Defines Roles & Permissions",
              body: "A worker's role and access are set per site assignment — move them to a new site, and their access moves with them.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every company and site, isolated and locked down."
          body="Multi-tenant isolation isn't a setting here — it's the foundation. Every record is scoped to its company and site at the database level, so cross-company and cross-site data leaks aren't possible by design."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Structure",
              description: "Company and site boundaries map directly to how auditors expect responsibility to be scoped.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Records",
              description: "Every record belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Site-Scoped Access",
              description: "Roles are bound to specific sites — no accidental visibility into another location's data.",
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
                "[PLACEHOLDER] We went from a spreadsheet tracking which site had which manager to a single dashboard showing all twelve, live.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] Adding a new site used to mean a support ticket and a week of waiting. Now it's live before the kickoff call ends.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] I only see my site's data, which is exactly what I need — no digging through six other locations to find mine.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on multi-site & company management."
          subhead="Field-tested guidance on structuring your organization, scaling across sites, and staying isolated by design — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Multi-Site & Company Management."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "How long does it take to add a new site or company?",
              answer:
                "Minutes. A Superadmin names the site, sets its region, and assigns a manager — it's live and ready to assign workers to right away, no separate contract or setup call required.",
            },
            {
              question: "Is data really isolated between sites and companies, or just filtered in the UI?",
              answer:
                "It's enforced at the database level, not just hidden in the interface. A record belongs to exactly one company and site from the moment it's created — there's no code path that can accidentally show it elsewhere.",
            },
            {
              question: "Can a manager be assigned to more than one site?",
              answer:
                "Yes. A Manager account can be assigned to as many sites as needed, and sees full visibility into each one — access is defined per assignment, not fixed to a single site.",
            },
            {
              question: "What happens to a site's data if it's archived?",
              answer:
                "It's retained and locked, not deleted. Archived sites stay available for historical reporting and audits, just no longer open for new activity.",
            },
            {
              question: "Can a Superadmin see across every company in our organization?",
              answer:
                "Yes — Superadmin accounts see every company and site under your organization's account, structured however you've set it up. This is your own organization's full structure, not visibility into other 360crd customers.",
            },
            {
              question: "Does adding a new site require a new contract?",
              answer:
                "No — new sites can be added directly from the dashboard by a Superadmin, no separate contract or sales call required.",
            },
            {
              question: "Can Staff or Field Worker accounts see sites they're not assigned to?",
              answer:
                "No — their access is limited to the site or sites they're actively assigned to. Cross-site visibility is reserved for Manager and Superadmin roles.",
            },
            {
              question: "Does multi-site data connect to incidents, audits, or assets automatically?",
              answer:
                "Yes — every record created in any other module is automatically scoped to the company and site it belongs to. Nothing needs to be manually tagged.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
