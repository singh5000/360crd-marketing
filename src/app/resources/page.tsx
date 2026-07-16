import type { Metadata } from "next";
import Nav from "@/components/marketing/nav";
import ResourcesHero from "@/components/marketing/resources-hero";
import ResourcesPopularPosts from "@/components/marketing/resources-popular-posts";
import ResourcesPromoStrip from "@/components/marketing/resources-promo-strip";
import ResourcesWatchNow from "@/components/marketing/resources-watch-now";
import ResourcesLatestGrid from "@/components/marketing/resources-latest-grid";
import ResourcesSubscribeBanner from "@/components/marketing/resources-subscribe-banner";
import Footer from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Resources & Blog — 360crd",
  description:
    "Field-tested guidance on incident management, compliance, training and site operations — from the team building 360crd.",
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main>
        <ResourcesHero />
        <ResourcesPopularPosts />
        <ResourcesPromoStrip />
        <ResourcesWatchNow />
        <ResourcesLatestGrid />
        <ResourcesSubscribeBanner />
      </main>
      <Footer />
    </>
  );
}
