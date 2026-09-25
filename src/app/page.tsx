import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { StatementSplit } from "@/components/site/StatementSplit";
import { FreshToday } from "@/components/site/FreshToday";
import { PatioBlock } from "@/components/site/PatioBlock";
import { MenuBoards } from "@/components/site/MenuBoards";
import { FacebookFeed } from "@/components/site/FacebookFeed";
import { ReviewsRiver } from "@/components/brand/ReviewsRiver";
import { Beans } from "@/components/site/Beans";
import { Story } from "@/components/site/Story";
import { AppPromo } from "@/components/site/AppPromo";
import { Visit } from "@/components/site/Visit";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StandaloneRedirect } from "@/components/site/StandaloneRedirect";

export default function HomePage() {
  return (
    <main className="bg-ember">
      <StandaloneRedirect />
      <SiteNav />
      <Hero />
      <StatementSplit />
      <FreshToday />
      <PatioBlock />
      <MenuBoards />
      <FacebookFeed />
      <ReviewsRiver />
      <Beans />
      <Story />
      <AppPromo />
      <Visit />
      <SiteFooter />
    </main>
  );
}
