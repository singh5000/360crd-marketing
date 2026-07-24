import type { Metadata } from "next";
import Nav from "@/components/marketing/nav";
import SolutionsHero from "@/components/marketing/solutions-hero";
import SolutionsTrustBar from "@/components/marketing/solutions-trust-bar";
import SolutionsProblem from "@/components/marketing/solutions-problem";
import SolutionsAudienceCards from "@/components/marketing/solutions-audience-cards";
import SolutionsFeatureGrid from "@/components/marketing/solutions-feature-grid";
import SolutionsHowItWorks from "@/components/marketing/solutions-how-it-works";
import SolutionsEcosystem from "@/components/marketing/solutions-ecosystem";
import SolutionsTestimonials from "@/components/marketing/solutions-testimonials";
import SolutionsStats from "@/components/marketing/solutions-stats";
import SolutionsComparison from "@/components/marketing/solutions-comparison";
import SolutionsCta from "@/components/marketing/solutions-cta";
import FaqSection from "@/components/marketing/faq-section";
import Footer from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Construction Safety Solutions by Role — Directors, Managers & Crews | 360crd",
  description:
    "Explore 360crd solutions for Safety & EHS Directors, Site & Operations Managers, and Field Supervisors & Crews — one platform, role-based views, ISO 45001/14001 & OSHA-ready.",
};

export default function SolutionsHubPage() {
  return (
    <>
      <Nav />
      <main>
        <SolutionsHero />
        <SolutionsTrustBar />
        <SolutionsProblem />
        <SolutionsAudienceCards />
        <SolutionsFeatureGrid />
        <SolutionsHowItWorks />
        <SolutionsEcosystem />
        <SolutionsTestimonials />
        <SolutionsStats />
        <SolutionsComparison />
        <SolutionsCta />
        <FaqSection
          heading="Questions worth asking before you pick a solution."
          faqs={[
            {
              question: "Which solution page is right for me?",
              answer:
                "Start with the role closest to your day-to-day: Safety & EHS Directors for company-wide compliance oversight, Site & Operations Managers for running one or more active sites, or Field Supervisors & Crews for reporting and logging from the ground. Most teams end up using all three views — just under different logins.",
            },
            {
              question: "Are these three different products, or one platform?",
              answer:
                "One platform. Every role signs into the same 360crd account and the same underlying data — the dashboard, menus, and actions available just change based on the role assigned to that login.",
            },
            {
              question: "Can a Safety Director see what field crews submit?",
              answer:
                "Yes — Superadmin and Manager-level roles see everything within their scope, including every incident, audit, and report submitted by Field Worker accounts on their sites.",
            },
            {
              question: "Do we need to buy each role's solution separately?",
              answer:
                "No. 360crd is priced by sites and team members, not by which of these views your team uses — every plan includes all four role-based views and every module.",
            },
            {
              question: "Can one person hold more than one role?",
              answer:
                "A person has one role per account, but a Manager can be assigned across multiple sites, and a Superadmin can hold that top-level role while still seeing everything a Manager or Staff account would.",
            },
            {
              question: "Is data isolated between sites and companies for every role?",
              answer:
                "Yes — enforced at the database level, not just hidden in the interface. A Manager only ever sees the sites they're assigned to, regardless of which solution page brought them here.",
            },
            {
              question: "How is this different from spreadsheets and a group chat?",
              answer:
                "Spreadsheets and chat threads don't enforce who can see or edit what, don't timestamp changes automatically, and don't roll up into one audit-ready record. 360crd does all three by default.",
            },
            {
              question: "What's the fastest way to see my role's view in action?",
              answer:
                "Book a 20-minute demo — we'll walk through the exact dashboard your team would get, using a scenario close to how your sites actually run.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
