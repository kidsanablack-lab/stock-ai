/* =====================================================================
   Portfolio Lab — Learn and Explore: content (Phase 6B).

   Plain-language explanations for beginners. Rules for every sentence here:
   • Describe what something IS and what CAN affect it.
   • Use "can", "may", "often". Never say what an asset WILL do.
   • No buy/sell language, no "best", no "safe", no recommendations.
   • Never imply that every ETF is diversified. It depends on what it holds.

   learn.test.ts scans this file's text for words that break those rules.
   ===================================================================== */

/** In-page sections a topic may point to. Each id exists in Portfolio Lab. */
export const LEARN_ANCHORS = {
  builder: { href: "#portfolio-builder", label: "Portfolio Builder" },
  templates: { href: "#portfolio-templates", label: "example portfolios" },
  risk: { href: "#risk-diversification", label: "concentration notes" },
  dca: { href: "#dca-planner", label: "DCA Planner" },
  calculator: { href: "#investment-calculator", label: "Investment Calculator" },
  whatIf: { href: "#what-if-simulator", label: "What-if Simulator" },
  rebalancing: { href: "#rebalancing-tool", label: "Rebalancing Tool" },
} as const;

export type LearnAnchorKey = keyof typeof LEARN_ANCHORS;

export type LearnGroupId = "big-ideas" | "holdings" | "growth-and-change";

export const LEARN_GROUPS: { id: LearnGroupId; title: string; text: string }[] = [
  {
    id: "big-ideas",
    title: "The big ideas",
    text: "How the pieces of a portfolio fit together.",
  },
  {
    id: "holdings",
    title: "What a portfolio can hold",
    text: "The main kinds of assets, and what can affect each one.",
  },
  {
    id: "growth-and-change",
    title: "How a portfolio grows and changes",
    text: "Ideas about time, regular investing, and keeping a mix in shape.",
  },
];

export type LearnTopic = {
  id: string;
  group: LearnGroupId;
  title: string;
  /** One sentence, shown while the topic is closed. */
  summary: string;
  paragraphs: string[];
  /** A short caution or limit worth remembering. */
  keepInMind: string;
  /** Optional link to a tool on this page. */
  tryIt?: { anchor: LearnAnchorKey; text: string };
};

export const LEARN_TOPICS: LearnTopic[] = [
  /* ---------- The big ideas ---------- */
  {
    id: "asset-allocation",
    group: "big-ideas",
    title: "Asset allocation",
    summary:
      "How a portfolio is split between different kinds of assets, such as stocks, bonds, and cash.",
    paragraphs: [
      "Asset allocation describes the share of a portfolio held in each kind of asset. A portfolio that is 60% stocks and 40% bonds has a different mix of risks than one that is 100% stocks, even if each holding looks reasonable on its own.",
      "Because different kinds of assets can react differently to the same events, the split between them often matters as much as the choice of any single holding. Which mix suits a person depends on their goals, their time frame, and how much change in value they can live with.",
    ],
    keepInMind:
      "A mix that suits one person can be a poor fit for another. Portfolio Lab shows how a mix is distributed. It cannot say which mix is right for you.",
    tryIt: { anchor: "builder", text: "Put a mix together in the Portfolio Builder" },
  },
  {
    id: "diversification",
    group: "big-ideas",
    title: "Diversification",
    summary:
      "Spreading money across holdings that do not all depend on the same things.",
    paragraphs: [
      "Diversification means not letting one company, industry, or asset type decide the whole result. Holdings that react to different events can partly offset each other, which may make a portfolio's value change less sharply than any one holding would.",
      "Owning many holdings is not the same as being diversified. Ten stocks in the same industry can still rise and fall together, and in a sharp market fall, assets that usually move differently can fall at the same time.",
    ],
    keepInMind:
      "Diversification may reduce some kinds of risk. It does not remove risk, and it does not protect against losses.",
    tryIt: { anchor: "risk", text: "See the concentration notes for your portfolio" },
  },
  {
    id: "concentration-risk",
    group: "big-ideas",
    title: "Concentration risk",
    summary:
      "When a large part of a portfolio depends on one holding, one industry, or one kind of asset.",
    paragraphs: [
      "If one holding is a large share of a portfolio, a problem that is specific to that holding can move the whole portfolio's value by a lot. The same can happen with one industry, one country, or one asset type.",
      "Concentration is not automatically a mistake, and some people hold large positions on purpose. It means the result depends on fewer things, so the range of possible outcomes is wider in both directions.",
    ],
    keepInMind:
      "A company with a strong business can still see its share price fall. Whether a company is strong and whether a portfolio is well spread are two different questions.",
    tryIt: { anchor: "whatIf", text: "Try an assumed fall in one category in the What-if Simulator" },
  },
  {
    id: "investment-horizon",
    group: "big-ideas",
    title: "Investment horizon",
    summary: "How long money is meant to stay invested before it is needed.",
    paragraphs: [
      "The investment horizon is the time between now and when the money is needed. Money needed in a year faces different risks from money that may not be needed for twenty years.",
      "Over a short horizon, a fall in value may not have time to recover before the money is needed. Over a long horizon there is more time for ups and downs to work through, but a fall may or may not recover.",
    ],
    keepInMind:
      "More time does not make an outcome certain. It only changes which risks matter most.",
    tryIt: { anchor: "calculator", text: "Compare different time lengths in the Investment Calculator" },
  },

  /* ---------- What a portfolio can hold ---------- */
  {
    id: "stocks-vs-etfs",
    group: "holdings",
    title: "Individual stocks vs ETFs",
    summary:
      "A stock is a share in one company. An ETF is a fund that holds many investments.",
    paragraphs: [
      "An individual stock is a small piece of ownership in one company, so its value depends heavily on how that company does. An exchange-traded fund (ETF) holds a collection of investments and trades during the day like a stock.",
      "An ETF can hold hundreds of companies or only a handful. What it holds, how it picks them, and what it costs to own differ from fund to fund, so the word ETF does not by itself say how spread out the holdings are.",
    ],
    keepInMind:
      "Not every ETF is diversified. An ETF that follows one industry, one theme, or a small number of companies can be quite concentrated.",
    tryIt: { anchor: "builder", text: "Add a stock and an ETF in the Portfolio Builder" },
  },
  {
    id: "equity-vs-bond-etfs",
    group: "holdings",
    title: "Equity ETFs vs bond ETFs",
    summary:
      "Equity ETFs hold stocks and bond ETFs hold bonds, and they can react to different things.",
    paragraphs: [
      "An equity ETF holds shares of companies, so it generally moves with the stock market and with the companies inside it. A bond ETF holds bonds, so it is more affected by interest rates and by whether the borrowers repay.",
      "Because they respond to different things, the two can behave differently at different times. That is not the case in every period, and in some periods both have fallen together.",
    ],
    keepInMind:
      "What a fund holds matters more than its label: which companies or bonds, how long the bonds last, and who issued them.",
    tryIt: { anchor: "templates", text: "See how the example portfolios mix them" },
  },
  {
    id: "bonds",
    group: "holdings",
    title: "Bonds and fixed income",
    summary:
      "Loans to a government or company that usually pay interest and are repaid at a set date.",
    paragraphs: [
      "Holding a bond means lending money. The borrower normally pays interest and agrees to repay the original amount on a set date. This steady interest is why bonds are often called fixed income.",
      "Bond prices can still change. When interest rates rise, existing bonds that pay less interest can lose value, and a borrower in trouble may pay late or not at all. Bonds that last longer are generally more affected by changes in interest rates.",
    ],
    keepInMind: "Fixed income does not mean a fixed value, and it does not mean no risk.",
    tryIt: { anchor: "whatIf", text: "Try an assumed bond price fall in the What-if Simulator" },
  },
  {
    id: "cash",
    group: "holdings",
    title: "Cash and equivalents",
    summary: "Money held in cash or very short-term, low-risk accounts.",
    paragraphs: [
      "Cash and cash equivalents, such as savings accounts and short-term deposits, usually change little in value from day to day. Many people keep some for expenses or as a cushion.",
      "Cash can still lose purchasing power. If prices rise faster than the interest earned, the money covers less over time. Interest rates on cash vary and can be low.",
    ],
    keepInMind:
      "Little day-to-day movement is not the same as no risk. Protection for bank deposits depends on the country and the institution.",
  },
  {
    id: "bitcoin-crypto",
    group: "holdings",
    title: "Bitcoin and cryptocurrency",
    summary: "Digital assets whose prices can change sharply.",
    paragraphs: [
      "Bitcoin is a digital asset that is not issued by any government or central bank. Many other cryptocurrencies were created by projects or companies. Prices of these assets have, at times, moved very sharply in both directions over short periods.",
      "Many other cryptocurrencies are less established than Bitcoin, and some projects have lost almost all of their value or stopped existing. Rules and protections differ widely between countries, and holding crypto can bring extra risks such as lost access or theft.",
    ],
    keepInMind:
      "Because possible falls can be large, people who include these assets often keep them to a small share of a portfolio. Portfolio Lab cannot judge any specific coin.",
    tryIt: { anchor: "whatIf", text: "Try an assumed 50% fall in Bitcoin in the What-if Simulator" },
  },
  {
    id: "gold",
    group: "holdings",
    title: "Gold",
    summary: "A precious metal that pays no interest, held directly or through a fund.",
    paragraphs: [
      "Gold is a physical commodity. Unlike a stock or a bond, it does not pay dividends or interest, so any gain or loss comes from changes in its price.",
      "Some people hold gold because its price has sometimes moved differently from stocks, and others see it as a store of value. It can also go for long periods without rising. Holding it through a fund adds fund costs, and holding it directly can mean storage and insurance costs.",
    ],
    keepInMind: "Its price can rise and fall, and patterns from the past may not repeat.",
  },
  {
    id: "real-estate-reits",
    group: "holdings",
    title: "Real estate and REITs",
    summary:
      "Property, owned directly or through companies called REITs that own and run it.",
    paragraphs: [
      "Real estate can be owned directly, such as a rented home, or through a REIT (real estate investment trust), a company that owns property and trades like a stock.",
      "Property values and rents depend on interest rates, local conditions, and the economy. Owning property directly can be hard to divide up or to turn into cash quickly. Listed REITs are easy to trade, but their prices can move up and down with the stock market.",
    ],
    keepInMind:
      "A REIT may be concentrated in one kind of property, such as offices or shopping centres, or in one region.",
  },

  /* ---------- How a portfolio grows and changes ---------- */
  {
    id: "dollar-cost-averaging",
    group: "growth-and-change",
    title: "Dollar-cost averaging (DCA)",
    summary: "Investing a fixed amount at regular intervals instead of all at once.",
    paragraphs: [
      "With dollar-cost averaging, a person invests the same amount on a regular schedule, for example every month. When prices are lower the same amount gets more units, and when prices are higher it gets fewer, so the price paid is spread out over time.",
      "It can make it easier to keep going without trying to pick a moment, and it spreads out the risk of putting everything in just before a fall. It can also mean part of the money waits while prices rise. Which approach ends up better depends on how prices move, which is not known in advance.",
    ],
    keepInMind:
      "DCA does not prevent losses. If prices keep falling, each new amount can lose value too.",
    tryIt: { anchor: "dca", text: "Explore regular investing in the DCA Planner" },
  },
  {
    id: "compounding",
    group: "growth-and-change",
    title: "Compounding",
    summary:
      "Growth that earns further growth, because earlier gains are included in later ones.",
    paragraphs: [
      "With compounding, returns are earned not only on the original amount but also on the returns already earned. Over long periods this can make a large difference to the end result.",
      "It works in both directions. After a fall, a larger rise is needed to get back to the starting value: a 50% fall needs a 100% rise to recover. In Portfolio Lab's calculators a steady yearly rate is assumed for illustration, but real returns vary from year to year, can be negative, and are reduced by fees, taxes, and inflation.",
    ],
    keepInMind:
      "The projections are examples built from rates you type. They are not forecasts.",
    tryIt: { anchor: "calculator", text: "See compounding in the Investment Calculator" },
  },
  {
    id: "rebalancing",
    group: "growth-and-change",
    title: "Rebalancing",
    summary:
      "Bringing a portfolio's mix back toward the mix that was originally intended.",
    paragraphs: [
      "Over time, holdings grow or shrink by different amounts, so the mix drifts away from the plan. A portfolio planned as 60% stocks and 40% bonds might drift to 70% and 30% after a strong run in stocks.",
      "Rebalancing means moving back toward the target, either by adding new money to the parts that have fallen behind or by shifting some money away from the parts that have grown. Each approach has costs: shifting money can bring taxes and fees, and doing it often can add up.",
    ],
    keepInMind:
      "Rebalancing can keep a portfolio closer to the risk level its owner chose, but it does not improve returns by itself.",
    tryIt: { anchor: "rebalancing", text: "Compare a portfolio with a target in the Rebalancing Tool" },
  },
  {
    id: "currency-risk",
    group: "growth-and-change",
    title: "Currency risk",
    summary:
      "Changes in exchange rates can change the value of assets held in another currency.",
    paragraphs: [
      "If a portfolio holds assets priced in a foreign currency, their value in the home currency depends on both the asset's price and the exchange rate. An asset can stay flat in its own currency and still change in value when the exchange rate moves.",
      "This can work in either direction, and conversion costs add to it. Portfolio Lab shows your amounts in the currency you pick and does not convert between currencies.",
    ],
    keepInMind:
      "A portfolio held in one currency can look very different to someone who spends in another.",
  },
];

/* ---------- Connecting to the rest of Scope ---------- */

/**
 * Pages on Scope that the journeys link to. They must exist in the real
 * site. Check them with the commands given with this phase before shipping.
 */
export const SCOPE_PAGES = {
  nvidia: { href: "/company/nvidia", label: "Open the NVIDIA page" },
  sevenPowers: { href: "/7-powers", label: "Open 7 Powers of Business" },
} as const;

export type JourneyAction =
  | { kind: "topic"; topicId: string; label: string }
  | { kind: "anchor"; anchor: LearnAnchorKey; label: string }
  | { kind: "page"; page: keyof typeof SCOPE_PAGES };

export type JourneyStep = { text: string; action: JourneyAction };

export type Journey = {
  id: string;
  title: string;
  intro: string;
  steps: JourneyStep[];
};

export const JOURNEYS: Journey[] = [
  {
    id: "company-to-portfolio",
    title: "From one company to a whole portfolio",
    intro:
      "An example path through Scope. The company is only an example of a single company page.",
    steps: [
      {
        text: "Read how a company makes money. NVIDIA is used here as an example.",
        action: { kind: "page", page: "nvidia" },
      },
      {
        text: "Learn why one company can make up too much of a portfolio.",
        action: { kind: "topic", topicId: "concentration-risk", label: "Read about concentration risk" },
      },
      {
        text: "Compare a single stock with an equity ETF, a fund that holds many stocks.",
        action: { kind: "topic", topicId: "stocks-vs-etfs", label: "Read about stocks vs ETFs" },
      },
      {
        text: "Put a hypothetical mix together.",
        action: { kind: "anchor", anchor: "builder", label: "Go to the Portfolio Builder" },
      },
      {
        text: "Test what an assumed fall in one category would do.",
        action: { kind: "anchor", anchor: "whatIf", label: "Go to the What-if Simulator" },
      },
    ],
  },
  {
    id: "advantage-to-risk",
    title: "From competitive advantage to portfolio risk",
    intro:
      "A path for people who start from how businesses compete and want to see how that connects to a portfolio.",
    steps: [
      {
        text: "Read how lasting competitive advantages work.",
        action: { kind: "page", page: "sevenPowers" },
      },
      {
        text: "A strong competitive advantage does not remove investment risk. See why spreading holdings still matters.",
        action: { kind: "topic", topicId: "diversification", label: "Read about diversification" },
      },
      {
        text: "See how a single company would fit inside a portfolio.",
        action: { kind: "anchor", anchor: "builder", label: "Go to the Portfolio Builder" },
      },
      {
        text: "Check how much of the portfolio depends on one holding.",
        action: { kind: "anchor", anchor: "risk", label: "Go to the concentration notes" },
      },
    ],
  },
];

/* ---------- Helpers ---------- */

export function getTopic(id: string): LearnTopic | undefined {
  return LEARN_TOPICS.find((topic) => topic.id === id);
}

export function topicsInGroup(group: LearnGroupId): LearnTopic[] {
  return LEARN_TOPICS.filter((topic) => topic.group === group);
}
