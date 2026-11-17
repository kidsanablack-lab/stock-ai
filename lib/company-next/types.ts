// Shape of one company page. Put this file next to apple.ts, microsoft.ts and the other company data files.
// Every company file is typed with CompanyPageData from here, so no company file depends on another company's file.
import type { CompanyHeroData } from "@/components/company-next/CompanyHero";
import type { CompanySummaryData } from "@/components/company-next/CompanySummary";
import type { ScoreReasonsData } from "@/components/company-next/ScoreReasons";
import type { WhatChangedData } from "@/components/company-next/WhatChanged";
import type { SignalsToWatchData } from "@/components/company-next/SignalsToWatch";
import type { WhereMoneyComesData } from "@/components/company-next/WhereMoneyComes";
import type { FinancialHighlightsData } from "@/components/company-next/FinancialHighlights";
import type { ValuationData } from "@/components/company-next/Valuation";
import type { ProfitHistoryData } from "@/components/company-next/ProfitHistory";
import type { CashAndReturnsData } from "@/components/company-next/CashAndReturns";
import type { StrengthsRisksData } from "@/components/company-next/StrengthsRisks";
import type { MoatEcosystemData } from "@/components/company-next/MoatEcosystem";
import type { CompetitorsData } from "@/components/company-next/Competitors";
import type { SourcesMethodData } from "@/components/company-next/SourcesMethod";
import type { BottomLineData } from "@/components/company-next/BottomLine";
import type { ClosingPanelData } from "@/components/company-next/ClosingPanel";
import type { SpotlightData } from "@/components/company-next/Spotlight";

export type CompanyPageData = {
  hero: CompanyHeroData;
  summary: CompanySummaryData;
  scoreReasons: ScoreReasonsData;
  /** Optional: only a company with one story that decides it has a spotlight (Alphabet has none yet). */
  spotlight?: SpotlightData;
  whatChanged: WhatChangedData;
  signalsToWatch: SignalsToWatchData;
  whereMoneyComes: WhereMoneyComesData;
  financialHighlights: FinancialHighlightsData;
  valuation: ValuationData;
  profitHistory: ProfitHistoryData;
  cashAndReturns: CashAndReturnsData;
  strengthsRisks: StrengthsRisksData;
  moatEcosystem: MoatEcosystemData;
  competitors: CompetitorsData;
  sourcesMethod: SourcesMethodData;
  bottomLine: BottomLineData;
  closing: ClosingPanelData;
};