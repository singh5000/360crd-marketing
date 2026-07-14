import Nav from "@/components/marketing/nav";
import Hero from "@/components/marketing/hero";
import ComplianceStrip from "@/components/marketing/compliance-strip";
import ProblemSolution from "@/components/marketing/problem-solution";
import RoleViews from "@/components/marketing/role-views";
import FeatureGrid from "@/components/marketing/feature-grid";
import SecurityCore from "@/components/marketing/security-core";
import IndustrySolutions from "@/components/marketing/industry-solutions";
import PricingPreview from "@/components/marketing/pricing-preview";
import BlogPreview from "@/components/marketing/blog-preview";
import FinalCTA from "@/components/marketing/final-cta";
import FaqSection from "@/components/marketing/faq-section";
import Footer from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ComplianceStrip />
        <ProblemSolution />
        <RoleViews />
        <FeatureGrid />
        <SecurityCore />
        <IndustrySolutions />
        <PricingPreview />
        <BlogPreview />
        <FinalCTA />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
