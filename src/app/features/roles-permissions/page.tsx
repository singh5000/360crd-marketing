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
  History,
  KeyRound,
  Lock,
  Send,
  ShieldCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Nav from "@/components/marketing/nav";
import FeatureHero from "@/components/marketing/feature-hero";
import QuickStatsBar from "@/components/marketing/quick-stats-bar";
import IncidentIntro from "@/components/marketing/incident-intro";
import RolesPreview from "@/components/marketing/roles-preview";
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
  title: "Roles & Permissions — 360crd",
  description:
    "Superadmin, Manager, Staff, and Field Worker — every account is scoped to exactly what their role and site assignment allow, enforced on every request.",
};

export default function RolesPermissionsPage() {
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
          breadcrumb={["Platform", "Features", "Roles & Permissions"]}
          accentTheme="cyan"
          icon={<KeyRound className="h-3.5 w-3.5" aria-hidden="true" />}
          eyebrow="ROLES & PERMISSIONS"
          title="Four roles. Exactly the access each one needs — nothing more."
          description="Superadmin, Manager, Staff, and Field Worker — every account is scoped to exactly what their role and site assignment allow, enforced on every request, not just hidden in the UI."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "See All Features", href: "/features" }}
          stats={[
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              value: "4",
              label: "Built-In Roles",
              trendLabel: "No custom config needed",
              tint: "#0891b2",
              sparkline: "M0,30 L28,26 L57,28 L85,20 L114,22 L142,14 L171,16 L200,8",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              value: "100%",
              label: "Server-Enforced Access",
              trendLabel: "Every request",
              tint: "#10b981",
              sparkline: "M0,36 L28,30 L57,32 L85,22 L114,24 L142,14 L171,16 L200,8",
            },
            {
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
              value: "0",
              label: "Cross-Site Leaks",
              trendLabel: "By design",
              tint: "#7e14ff",
              sparkline: "M0,10 L28,10 L57,10 L85,10 L114,10 L142,10 L171,10 L200,10",
            },
          ]}
          screenshotNode={<RolesPreview />}
        />
        <QuickStatsBar
          stats={[
            {
              value: "4",
              label: "Built-In Roles",
              description: "Superadmin, Manager, Staff, Field Worker — scoped from day one.",
            },
            {
              value: "100%",
              label: "Server-Enforced",
              description: "Every permission check happens on the backend, not just hidden in the UI.",
            },
            {
              value: "Per-Site",
              label: "Access Scoping",
              description: "A role's access is bound to the sites they're assigned to.",
            },
            {
              value: "Real-Time",
              label: "Access Changes",
              description: "Revoke or reassign a role and it takes effect immediately.",
            },
          ]}
        />
        <IncidentIntro
          eyebrow="ONE PERMISSION MODEL"
          heading="Every account, scoped to exactly what it needs."
          body="Assign one of four roles to every account — Superadmin, Manager, Staff, or Field Worker — and access is scoped automatically from there. A Manager only sees the sites they're assigned to. A Field Worker only sees their own submissions. None of this is a UI setting that can be bypassed — it's enforced on the server for every request, the same way for every module on the platform. Change someone's role or site assignment and their access updates immediately, no re-login or manual cache clear required."
          ctaLabel="Book a Demo"
          ctaHref="/demo"
          imageSrc="/images/roles-intro.jpg"
          imageAlt="A team of three reviewing project plans together around a table"
          topCard={{
            icon: <KeyRound className="h-4 w-4" aria-hidden="true" />,
            title: "Access Record",
            subtitle: "Live status of your newest account",
            rows: [
              { label: "User", value: "T. Nguyen" },
              { label: "Role", value: "Field Worker" },
              { label: "Status", value: "Invited", tone: "sky" },
            ],
            cta: { label: "View Permissions", href: "/demo" },
          }}
          bottomCard={{
            icon: <Users className="h-4 w-4" aria-hidden="true" />,
            title: "Team Stats",
            subtitle: "This month",
            rows: [
              { label: "Total Users", value: "6" },
              { label: "Active", value: "4", tone: "emerald" },
              { label: "Pending Invites", value: "2" },
            ],
          }}
          featureBlocks={[
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              title: "Four Built-In Roles",
              description: "Superadmin, Manager, Staff, Field Worker — no custom config to get wrong.",
            },
            {
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
              title: "Server-Enforced Access",
              description: "Every permission check happens on the backend, not just hidden in a menu.",
            },
            {
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
              title: "Site-Scoped Assignment",
              description: "A role's access is bound to the sites and companies they're assigned to.",
            },
            {
              icon: <Clock className="h-5 w-5" aria-hidden="true" />,
              title: "Instant Access Changes",
              description: "Reassign a role or revoke access and it takes effect immediately.",
            },
          ]}
        />
        <CapabilityWalkthrough
          eyebrow="THE WORKFLOW"
          heading="Three steps. Zero guesswork."
          subhead="From invite to scoped access — see exactly how it moves."
          accentTheme="cyan"
          steps={[
            {
              label: "STEP 1",
              title: "Invite and assign a role",
              body: "A Superadmin or Manager invites a new user and assigns one of four roles — access is scoped from the first login.",
              screenshotSrc: "/images/step1-field-log.jpg",
              screenshotAlt: "Two people discussing a new team member's role assignment",
            },
            {
              label: "STEP 2",
              title: "Access is scoped automatically",
              body: "Their role and site assignment determine exactly what they can see and do — enforced on the server, not just hidden in the interface.",
              screenshotSrc: "/images/step2-manager-review.jpg",
              screenshotAlt: "A manager reviewing a team member's access on a laptop",
            },
            {
              label: "STEP 3",
              title: "Change it, and it applies instantly",
              body: "Reassign a role, add a site, or revoke access entirely — the change takes effect on their very next request.",
              screenshotSrc: "/images/step3-audit-timeline.jpg",
              screenshotAlt: "A hand confirming an access change on a checklist",
            },
          ]}
        />
        <StatusPipeline
          eyebrow="THE FULL PICTURE"
          heading="Six stages. One line to close."
          subhead="From the first invite to active access — see exactly where every account stands."
          accentTheme="cyan"
          stages={[
            {
              label: "Invited",
              description: "Invite sent with a proposed role",
              owner: "Manager",
              color: "#94a3b8",
              icon: <Send className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Account Created",
              description: "User accepts and sets up their login",
              owner: "Field Worker",
              color: "#0ea5e9",
              icon: <UserCircle className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Role Assigned",
              description: "Superadmin or Manager assigns one of four roles",
              owner: "Manager",
              color: "#f59e0b",
              icon: <KeyRound className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Site Assigned",
              description: "Access scoped to one or more sites",
              owner: "Manager",
              color: "#7e14ff",
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Active",
              description: "Full access to everything their role and sites allow",
              owner: "Manager",
              color: "#059669",
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
            },
            {
              label: "Revoked",
              description: "Access removed immediately, account deactivated",
              owner: "Superadmin",
              color: "#64748b",
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
            },
          ]}
        />
        <CapabilityHub
          eyebrow="INSIDE ROLES & PERMISSIONS"
          heading="Six capabilities. One connected module."
          subhead="Every account runs through the same core engine — from invite to access change log."
          hubIcon={<KeyRound aria-hidden="true" />}
          capabilities={[
            {
              icon: <KeyRound className="h-5 w-5" aria-hidden="true" />,
              color: "#0891b2",
              title: "Four Built-In Roles",
              description: "Superadmin, Manager, Staff, Field Worker — scoped from day one, no custom config.",
            },
            {
              icon: <Lock className="h-5 w-5" aria-hidden="true" />,
              color: "#7e14ff",
              title: "Server-Enforced Permissions",
              description: "Every check happens on the backend — never just a hidden menu item.",
            },
            {
              icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
              color: "#f59e0b",
              title: "Site-Scoped Access",
              description: "A role's visibility is bound to the sites and companies they're assigned to.",
            },
            {
              icon: <Users className="h-5 w-5" aria-hidden="true" />,
              color: "#0ea5e9",
              title: "Team & Invite Management",
              description: "Invite a new user, assign a role, and they're scoped from first login.",
            },
            {
              icon: <History className="h-5 w-5" aria-hidden="true" />,
              color: "#10b981",
              title: "Access Change Log",
              description: "Every role change and permission update, timestamped and attributable.",
            },
            {
              icon: <ArrowUpCircle className="h-5 w-5" aria-hidden="true" />,
              color: "#f43f5e",
              title: "Instant Revocation",
              description: "Remove access immediately — no waiting on a cache to clear or a re-login.",
            },
          ]}
        />
        <RoleCards
          eyebrow="WHO USES THIS"
          heading="Roles & Permissions, scoped to every role."
          subhead="The same module, four different jobs to do."
          roleCards={[
            {
              pill: "FOR SUPERADMINS",
              icon: <ShieldCheck aria-hidden="true" />,
              title: "Full Control Over Every Role",
              bullets: [
                "Assign or change any user's role",
                "Grant or revoke site access",
                "See a full access change history",
              ],
              linkHref: "/solutions/safety-directors",
            },
            {
              pill: "FOR MANAGERS",
              icon: <Users aria-hidden="true" />,
              title: "Manage Your Site's Team",
              bullets: [
                "Invite new users to assigned sites",
                "Assign Staff or Field Worker roles",
                "Revoke access for their own sites",
              ],
              linkHref: "/solutions/site-managers",
            },
            {
              pill: "FOR STAFF",
              icon: <KeyRound aria-hidden="true" />,
              title: "Scoped to What You Need",
              bullets: [
                "Access limited to assigned sites",
                "See only the modules your role allows",
                "No visibility into admin settings",
              ],
              linkHref: "/solutions/field-teams",
            },
            {
              pill: "FOR FIELD WORKERS",
              icon: <UserCircle aria-hidden="true" />,
              title: "Simple, Focused Access",
              bullets: [
                "See only your own submissions",
                "Access limited to your current site",
                "Nothing extra to navigate around",
              ],
              linkHref: "/solutions/field-teams",
            },
          ]}
        />
        <FinalCTA
          badgeLabel="Ready when you are"
          heading="Ready to know exactly who can see what?"
          description="Book a 20-minute walkthrough and see 360crd's role and permission system running on a team like yours — four built-in roles, server-enforced access, and instant changes, all in one place."
          primaryCta={{ label: "Book a Demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to Sales", href: "/contact" }}
        />
        <ConnectedModules
          eyebrow="ONE PLATFORM, CONNECTED"
          heading="A role isn't just a label. It's what every other module checks first."
          subhead="Every action across the platform is gated by the role and site defined here."
          connections={[
            {
              sourceIcon: <KeyRound aria-hidden="true" />,
              sourceColor: "#0891b2",
              targetIcon: <Building2 aria-hidden="true" />,
              targetColor: "#c026d3",
              title: "Works With Multi-Site",
              body: "A role's access is bound to specific companies and sites — the two systems define scope together, not separately.",
            },
            {
              sourceIcon: <KeyRound aria-hidden="true" />,
              sourceColor: "#0891b2",
              targetIcon: <AlertTriangle aria-hidden="true" />,
              targetColor: "#f43f5e",
              title: "Gates Incident Escalation",
              body: "Only Manager and Superadmin roles receive incident escalations — Field Worker accounts see just their own reports.",
            },
            {
              sourceIcon: <KeyRound aria-hidden="true" />,
              sourceColor: "#0891b2",
              targetIcon: <ClipboardCheck aria-hidden="true" />,
              targetColor: "#f59e0b",
              title: "Gates Audit Access",
              body: "Scoring and reviewing audits is scoped by role — Staff score checklists, Managers review and close them.",
            },
            {
              sourceIcon: <KeyRound aria-hidden="true" />,
              sourceColor: "#0891b2",
              targetIcon: <Box aria-hidden="true" />,
              targetColor: "#0d9488",
              title: "Gates Asset Actions",
              body: "Logging maintenance, assigning equipment, and retiring an asset are each gated to the roles that should perform them.",
            },
          ]}
        />
        <ComplianceSecurityTieIn
          eyebrow="COMPLIANCE & SECURITY"
          heading="Every access decision, enforced and logged."
          body="Permissions here aren't a UI convenience — they're enforced on every request at the server, and every change is attributable. Map that directly to your ISO 45001 audit trail, and know access is isolated to your company alone."
          imageUrl="https://images.pexels.com/photos/8293680/pexels-photo-8293680.jpeg?cs=srgb&dl=pexels-rdne-8293680.jpg&fm=jpg"
          imageAlt="A safety inspector reviewing a compliance checklist on site"
          linkLabel="See our full security approach"
          linkHref="/security"
          facts={[
            {
              icon: <FileCheck aria-hidden="true" />,
              color: "#f59e0b",
              label: "ISO 45001-Ready Access Logs",
              description: "Every role change and permission update, timestamped and attributed to who made it.",
            },
            {
              icon: <Lock aria-hidden="true" />,
              color: "#7e14ff",
              label: "Company-Isolated Accounts",
              description: "Every user belongs to exactly one company, enforced at the database level.",
            },
            {
              icon: <ShieldCheck aria-hidden="true" />,
              color: "#7e14ff",
              label: "Server-Enforced, Not UI-Hidden",
              description: "Every permission check happens on the backend — a hidden menu item was never the only thing stopping access.",
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
                "[PLACEHOLDER] I finally know exactly who can see what, without asking someone to double check a spreadsheet of permissions.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Site Manager)
              quote:
                "[PLACEHOLDER] Onboarding a new hire used to mean guessing which menu items to hide. Now their role does that for me.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
            {
              // TODO: replace with real customer testimonial (Field Supervisor)
              quote:
                "[PLACEHOLDER] My crew only sees their own stuff. No confusion about whose report is whose.",
              // TODO: replace with real customer name
              name: "[Customer Name]",
              // TODO: replace with real title/company
              title: "[Title], [Company]",
            },
          ]}
        />
        <LatestInsights
          eyebrow="FROM THE BLOG"
          heading="Latest insights on roles & permissions."
          subhead="Field-tested guidance on access control, onboarding, and staying scoped by design — written from what actually happens on site."
          viewAllHref="/resources"
          viewAllLabel="View all articles"
          posts={latestPosts}
        />
        <FaqSection
          eyebrow="FAQ"
          heading="Questions worth asking about Roles & Permissions."
          subhead="Straight answers, before your team commits to anything."
          footerText="Still have questions?"
          footerLinkLabel="Talk to our team"
          footerLinkHref="/contact"
          faqs={[
            {
              question: "What are the four built-in roles?",
              answer:
                "Superadmin, Manager, Staff, and Field Worker — each with a different scope of visibility and action, built in from day one.",
            },
            {
              question: "Can we create custom roles beyond the four?",
              answer:
                "Not currently — the four roles cover the access patterns real construction teams need. Each one's scope is defined by role plus site assignment, which covers most structures without custom configuration.",
            },
            {
              question: "Is permission enforcement just hidden UI, or is it enforced on the backend?",
              answer:
                "Enforced on the backend. Every request checks the user's role and site assignment on the server — a hidden button was never the only thing standing between a user and a restricted action.",
            },
            {
              question: "Can a user hold different roles on different sites?",
              answer:
                "A user has one role, but it can apply across multiple site assignments — a Manager, for example, can be assigned to several sites and holds the same Manager-level access on each one.",
            },
            {
              question: "What happens to a user's access immediately after their role changes?",
              answer:
                "It applies immediately, on their next request — no re-login or manual cache clear needed.",
            },
            {
              question: "Can a Manager see data from sites they're not assigned to?",
              answer:
                "No — a Manager only sees data for the sites they're explicitly assigned to, enforced the same way as every other role boundary.",
            },
            {
              question: "Is there a log of who changed someone's role or access?",
              answer:
                "Yes — every role and site assignment change is timestamped and attributed to who made it, visible to Superadmins.",
            },
            {
              question: "Does the permission system apply the same way across every module?",
              answer:
                "Yes — the same role and site scoping applies uniformly across incidents, audits, training, assets, and every other module. There's no module-specific exception to learn.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
