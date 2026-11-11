import Link from "next/link";
import WatchlistButton from "@/components/ui/WatchlistButton";
import type { CompanyPageData } from "@/lib/company-next/apple";
import CompanyHero from "./CompanyHero";
import CompanySummary from "./CompanySummary";
import ScoreReasons from "./ScoreReasons";
import Spotlight, { type SpotlightData } from "./Spotlight";
import WhatChanged from "./WhatChanged";
import SignalsToWatch from "./SignalsToWatch";
import WhereMoneyComes from "./WhereMoneyComes";
import FinancialHighlights from "./FinancialHighlights";
import Valuation from "./Valuation";
import ProfitHistory from "./ProfitHistory";
import CashAndReturns from "./CashAndReturns";
import StrengthsRisks from "./StrengthsRisks";
import MoatEcosystem from "./MoatEcosystem";
import Competitors from "./Competitors";
import SourcesMethod from "./SourcesMethod";
import BottomLine from "./BottomLine";
import ClosingPanel from "./ClosingPanel";

// Spotlight is optional for now: only companies that have one show the section.
// Once every company has a Spotlight, move this field into CompanyPageData.
type CompanyNextViewData = CompanyPageData & { spotlight?: SpotlightData };

export default function CompanyNextView({
  data,
  slug,
  backLink,
}: {
  data: CompanyNextViewData;
  slug: string;
  backLink: { href: string; label: string };
}) {
  return (
    <main>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pt-8 sm:px-10">
        <Link
          href={backLink.href}
          className="interactive-link inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200"
        >
          ← {backLink.label}
        </Link>
        <WatchlistButton slug={slug} />
      </div>

      <CompanyHero data={data.hero} />
      <CompanySummary data={data.summary} />
      <ScoreReasons data={data.scoreReasons} />
      {data.spotlight ? <Spotlight data={data.spotlight} /> : null}
      <WhatChanged data={data.whatChanged} />
      <WhereMoneyComes data={data.whereMoneyComes} />
      <FinancialHighlights data={data.financialHighlights} />
      <ProfitHistory data={data.profitHistory} />
      <CashAndReturns data={data.cashAndReturns} />
      <Valuation data={data.valuation} />
      <StrengthsRisks data={data.strengthsRisks} />
      <SignalsToWatch data={data.signalsToWatch} />
      <MoatEcosystem data={data.moatEcosystem} />
      <Competitors data={data.competitors} />
      <BottomLine data={data.bottomLine} />
      <SourcesMethod data={data.sourcesMethod} />
      <ClosingPanel data={data.closing} />
    </main>
  );
}