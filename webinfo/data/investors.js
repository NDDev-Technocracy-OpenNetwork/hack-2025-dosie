// Данные об инвесторах и фондах
const investorsData = [
  {
    id: "investor_altair",
    name: "AltaIR Capital",
    type: "vc_fund",
    aum: "$200M+",
    portfolio_size: "100+",
    focus: ["Early-stage", "Tech", "Gaming", "SaaS"],
    notable_investments: ["RAWG", "Multiple Russian startups"],
    geography: ["Russia", "CIS", "Europe"],
    stage: ["Seed", "Series A"]
  },
  {
    id: "investor_wargaming",
    name: "Wargaming",
    type: "strategic_investor",
    focus: ["Gaming", "Entertainment"],
    investments: ["RAWG"],
    headquarters: "Cyprus",
    business: "Game developer and publisher"
  },
  {
    id: "investor_ulmart",
    name: "Ulmart",
    type: "strategic_investor",
    focus: ["E-commerce", "Digital content"],
    investments: ["Bookmate"],
    amount_invested: "$6.5M in Bookmate",
    status: "Inactive"
  },
  {
    id: "investor_essedel",
    name: "Essedel Capital",
    type: "vc_fund",
    focus: ["Growth stage", "Digital media"],
    investments: ["Bookmate"],
    stage: ["Series A", "Series B"],
    geography: ["Europe"]
  },
  {
    id: "investor_t16e",
    name: "t16e",
    type: "vc_fund",
    aum: "$3B+",
    focus: ["Tech ventures", "Growth stage"],
    team: ["Anastasia Karpova - Venture Partner"],
    geography: ["Global"],
    stage: ["Series B+"]
  },
  {
    id: "investor_rtp",
    name: "RTP Global",
    type: "vc_fund",
    aum: "$3B",
    portfolio_size: "197",
    focus: ["Global tech", "Consumer", "B2B SaaS"],
    team: ["Natalia Shagarina - Venture Partner"],
    notable_investments: ["Aurora AI", "Datadog", "Delivery Hero"],
    geography: ["Global"],
    stage: ["Seed to Growth"]
  },
  {
    id: "investor_cherry",
    name: "Cherry Ventures",
    type: "vc_fund",
    focus: ["B2B SaaS", "Developer tools", "Marketplaces"],
    investments: ["Meander"],
    amount_invested: "$2M seed in Meander",
    stage: ["Seed", "Series A"],
    geography: ["Europe", "US"]
  },
  {
    id: "investor_mosaic",
    name: "Mosaic Ventures",
    type: "vc_fund",
    focus: ["Enterprise", "B2B SaaS", "Deep tech"],
    investments: ["Meander"],
    amount_invested: "$3.75M Series A in Meander",
    stage: ["Series A", "Series B"],
    geography: ["Europe", "US"]
  },
  {
    id: "investor_frii",
    name: "ФРИИ (Internet Initiatives Development Fund)",
    type: "accelerator_fund",
    portfolio_size: "500+",
    focus: ["Russian startups", "Early-stage tech"],
    team: ["Ilya Krasinsky - Методолог (2013-2019)"],
    programs: ["Accelerator", "Pre-seed funding"],
    geography: ["Russia", "CIS"]
  },
  {
    id: "investor_superabundance",
    name: "Superabundance",
    type: "venture_studio",
    founded: "2022",
    focus: ["AI-enabled professional services", "B2B SaaS"],
    team: ["Egor Korobeynikov - Co-founder & GP"],
    model: "Build and scale ventures",
    stage: ["Pre-seed", "Seed"]
  },
  {
    id: "investor_yandex_ventures",
    name: "Яндекс (Strategic Acquisitions)",
    type: "strategic_investor",
    notable_deals: [
      {company: "Edadil", amount: "233M руб", year: "2021", seller: "Natalia Shagarina"}
    ],
    focus: ["Consumer services", "Tech", "E-commerce"],
    strategy: "Acquire and integrate"
  },
  {
    id: "investor_perplexity",
    name: "Perplexity AI",
    type: "strategic_acquirer",
    valuation: "$18B",
    acquisition: ["Sidekick Browser"],
    connection: "Egor Korobeynikov participated in deal"
  }
];

// Инвестиционные раунды и сделки
const investmentDealsData = [
  {
    id: "deal_rawg",
    company: "RAWG",
    amount: "$2.09M",
    year: "2018",
    investors: ["AltaIR Capital", "Wargaming"],
    stage: "Seed",
    lead: "Samat Galimov"
  },
  {
    id: "deal_bookmate",
    company: "Bookmate",
    amount: "$6.5M",
    year: "2013",
    investors: ["Ulmart", "Essedel Capital"],
    stage: "Series A",
    lead: "Samat Galimov"
  },
  {
    id: "deal_skyeng",
    company: "SkyEng",
    amount: "$15.3M+",
    rounds: "Multiple",
    valuation: "$100M+",
    co_founder: "Ilya Krasinsky"
  },
  {
    id: "deal_meander_seed",
    company: "Meander",
    amount: "$2M",
    year: "2023",
    investors: ["Cherry Ventures"],
    stage: "Seed",
    founder: "Anna Buldakova"
  },
  {
    id: "deal_meander_a",
    company: "Meander",
    amount: "$3.75M",
    year: "2024",
    investors: ["Mosaic Ventures"],
    stage: "Series A",
    founder: "Anna Buldakova"
  },
  {
    id: "deal_edadil_exit",
    company: "Edadil",
    amount: "233M руб",
    year: "2021",
    type: "Exit",
    buyer: "Яндекс",
    seller: "Natalia Shagarina"
  },
  {
    id: "deal_meta_startup",
    company: "Meta (психотерапия)",
    amount: "8M руб",
    year: "2019",
    type: "Exit",
    seller: "Ivan Zamesin"
  },
  {
    id: "deal_aurora",
    company: "Aurora AI",
    investors: ["RTP Global"],
    stage: "Seed",
    founder: "Natalia Shagarina"
  },
  {
    id: "deal_flo",
    company: "Flo Health",
    valuation: "$1B",
    status: "Unicorn",
    investors: "Multiple international VCs"
  },
  {
    id: "deal_miro",
    company: "Miro",
    valuation: "$17.5B",
    growth: "10x users post-rebrand",
    rebrand_lead: "Egor Korobeynikov"
  }
];