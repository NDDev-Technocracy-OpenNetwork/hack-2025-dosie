// Данные о компаниях
const companiesData = [
  // Текущие компании членов жюри
  {id: "company_fans", name: "FANS-development", type: "agency", founded: "2019", 
   details: {employees: "10+", focus: "MVP для венчурных стартапов", clients: ["Russian Forbes", "Snob.ru", "Vkusvill", "TV Rain", "igooods"]}},
  
  {id: "company_rickai", name: "rick.ai", type: "startup", founded: "2020",
   details: {focus: "Сквозная аналитика для e-commerce", integrations: ["Shopify", "Google Analytics", "Facebook Ads"]}},
  
  {id: "company_heroescamp", name: "Heroes.camp", type: "education", founded: "2020",
   details: {focus: "Образовательная платформа по продакт-менеджменту", course: "Product Heroes", students: "1000+"}},
  
  {id: "company_sociallinks", name: "Social Links", type: "b2b", 
   details: {focus: "OSINT-платформа", clients: "S&P 500", countries: "80+", specialization: "Intelligence gathering"}},
  
  {id: "company_hbr", name: "Harvard Business Review Russia", type: "media",
   details: {type: "Business publication", focus: "Management insights", reach: "National"}},
  
  {id: "company_tbank", name: "T-Bank", type: "fintech",
   details: {valuation: "$1B+", focus: "Digital banking", ai_projects: "AI assistants", ecosystem: "Financial services"}},
  
  {id: "company_flo", name: "Flo Health Inc.", type: "healthtech", 
   details: {valuation: "$1B", users: "380M", focus: "Women's health", product: "Period tracker & health insights"}},
  
  {id: "company_superabundance", name: "Superabundance", type: "venture_studio",
   details: {founded: "2022", focus: "AI-enabled professional services", stage: "Early-stage ventures"}},
  
  {id: "company_emex", name: "Emex Group", type: "holding",
   details: {gmv: "$500M+", countries: "40", focus: "International e-commerce", employees: "1000+"}},
  
  {id: "company_meander", name: "Meander", type: "startup",
   details: {funding: "$5.75M", focus: "AI mentorship platform", investors: ["Cherry Ventures", "Mosaic Ventures"]}},
  
  {id: "company_jetbrains", name: "JetBrains", type: "software",
   details: {products: "30+", users: "15M+", focus: "Developer tools", headquarters: "Czech Republic"}},
  
  {id: "company_neural", name: "neural.love", type: "startup",
   details: {focus: "GenAI for consumers", specialization: "Image and video enhancement", founder: "Denis Shiryaev"}},
  
  {id: "company_hirehire", name: "HireHire", type: "hr_tech",
   details: {focus: "AI-powered recruiting", feature: "Context-aware interview transcription", award: "Most Investable Startup 2025"}},
  
  {id: "company_aurora", name: "Aurora AI Assistant", type: "startup",
   details: {focus: "AI assistant for families", founder: "Natalia Shagarina", investor: "RTP Global"}},
  
  {id: "company_focus", name: "Focus Calendar", type: "productivity",
   details: {focus: "Time management app", founder: "Ivan Zamesin", platform: "iOS/Android"}},
  
  // Прошлые компании и экзиты
  {id: "company_skyeng", name: "Skyeng", type: "edtech",
   details: {valuation: "$100M+", employees: "3266+", market_share: "45%", revenue: "1B руб", growth: "3x annual"}},
  
  {id: "company_meduza", name: "Meduza", type: "media",
   details: {mau: "18M", founded: "2014", type: "Independent media", challenge: "Censorship resistance"}},
  
  {id: "company_rawg", name: "RAWG", type: "gaming",
   details: {games: "300K+", screenshots: "2M", ratings: "425K", funding: "$2.09M", investors: ["AltaIR Capital", "Wargaming"]}},
  
  {id: "company_bookmate", name: "Bookmate", type: "digital_content",
   details: {users: "10M", funding: "$6.5M", model: "Spotify for books", markets: ["Scandinavia", "Latin America", "CIS"]}},
  
  {id: "company_forbes", name: "Forbes Russia", type: "media",
   details: {type: "Business magazine", program: "30 Under 30", reach: "National", focus: "Entrepreneurship"}},
  
  {id: "company_avito", name: "Avito", type: "marketplace",
   details: {mau: "50M+", type: "Classifieds", market: "Russia #1", categories: ["Real estate", "Jobs", "Services"]}},
  
  {id: "company_miro", name: "Miro", type: "saas",
   details: {users: "25M+", valuation: "$17.5B", growth: "10x in 3 months", rebrand: "From RealtimeBoard"}},
  
  {id: "company_edadil", name: "Edadil", type: "consumer",
   details: {exit: "233M руб to Яндекс", users: "12M", founder: "Natalia Shagarina", year_exit: "2021"}},
  
  {id: "company_yandex", name: "Яндекс", type: "tech_giant",
   details: {market_cap: "$20B+", employees: "30K+", services: ["Search", "Maps", "Taxi", "Food", "Market"]}},
  
  {id: "company_meta", name: "Meta/Facebook", type: "tech_giant",
   details: {market_cap: "$1T+", employees: "100K+", products: ["Facebook", "Instagram", "WhatsApp", "Workplace"]}},
  
  {id: "company_intercom", name: "Intercom", type: "saas",
   details: {valuation: "$1.275B", focus: "Customer messaging", market: "B2B SaaS", customers: "25K+"}},
  
  {id: "company_linguaLeo", name: "LinguaLeo", type: "edtech",
   details: {users: "20M+", focus: "Language learning", markets: ["Russia", "Brazil", "Turkey"]}},
  
  {id: "company_wannabe", name: "Wannabe", type: "education",
   details: {users: "40K+", growth: "2x revenue", founder: "Valeria Rozova", focus: "Professional development"}},
  
  {id: "company_typical", name: "TYPICAL", type: "executive_platform",
   details: {clients: "200+ executives", founder: "Valeria Rozova", focus: "Leadership development"}},
  
  {id: "company_unicorn", name: "Unicorn.me", type: "venture",
   details: {co_founder: "Ilya Krasinsky", focus: "Venture building", status: "Active"}},
  
  {id: "company_mobile_dimension", name: "Mobile Dimension", type: "mobile",
   details: {mau: "750K", focus: "Mobile apps", period: "2019-2021"}}
];