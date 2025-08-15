// Связи между всеми сущностями
const connectionsData = {
  // Рабочие связи
  work_connections: [
    {from: "person_samat", to: "company_fans", type: "works_at", role: "CTO & Co-founder", current: true, description: "CTO и сооснователь FANS-development, специализируется на построении надёжных технических решений для венчурных стартапов с 15-летним опытом создания и масштабирования технологических продуктов"},
    {from: "person_samat", to: "company_meduza", type: "worked_at", role: "CTO", period: "2014-2018", description: "CTO медиаресурса Meduza, ответственный за техническую архитектуру и масштабирование платформы в условиях высокой нагрузки"},
    {from: "person_samat", to: "company_rawg", type: "worked_at", role: "CTO", period: "2018-2019", description: "Технический директор в RAWG - крупнейшей игровой базе данных, которая привлекла $2.09M инвестиций от Altair Capital"},
    {from: "person_samat", to: "company_bookmate", type: "worked_at", role: "CTO", period: "2012-2014", description: "CTO в Bookmate - платформе для чтения электронных книг, привлёкшей $6.5M от инвесторов включая Ulmart"},
    
    {from: "person_ilya", to: "company_rickai", type: "works_at", role: "CEO & Founder", current: true, description: "CEO и основатель rick.ai - сервиса сквозной аналитики для e-commerce, признанный 'мастер спорта по юнит-экономике' в российском стартап-сообществе"},
    {from: "person_ilya", to: "company_heroescamp", type: "works_at", role: "CEO & Founder", current: true, description: "Основатель Heroes.camp - образовательной платформы по продакт-менеджменту с более чем 1000 выпускников курса Product Heroes"},
    {from: "person_ilya", to: "company_unicorn", type: "works_at", role: "Co-founder", current: true, description: "Сооснователь платформы Unicorn для аналитики бизнес-метрик"},
    {from: "person_ilya", to: "company_skyeng", type: "co_founded", role: "Co-founder", period: "2010-2012", description: "Сооснователь Skyeng - крупнейшей российской онлайн-школы английского языка"},
    {from: "person_ilya", to: "investor_frii", type: "worked_at", role: "Методолог", period: "2013-2019", description: "Методолог ФРИИ в течение 6 лет, помогал более 1000 компаниям оптимизировать метрики и найти точки экспоненциального роста"},
    {from: "person_ilya", to: "company_linguaLeo", type: "worked_at", role: "Head of Development", period: "2011-2013", description: "Руководитель разработки в LinguaLeo - популярной платформе изучения английского языка"},
    
    {from: "person_denis_p", to: "company_sociallinks", type: "works_at", role: "CPO", current: true, description: "Chief Product Officer в Social Links с 2023 года, опытный продуктовый лидер с редким сочетанием навыков масштабирования команд и достижения амбициозных бизнес-целей"},
    {from: "person_denis_p", to: "company_skyeng", type: "worked_at", role: "CPO", period: "2017-2020", description: "Поставил и реализовал цель заработать миллиард рублей для Skyeng, поддерживая 3x годовой рост в течение трёх лет, масштабировал команду с 5 до 30+ человек"},
    
    {from: "person_anastasia", to: "company_hbr", type: "works_at", role: "Главный редактор", current: true, description: "Главный редактор Harvard Business Review Russia, обладает уникальной комбинацией медийного влияния и венчурной экспертизы"},
    {from: "person_anastasia", to: "investor_t16e", type: "partner", role: "Venture Partner", current: true, description: "Венчурный партнёр фонда t16e (The Garage Syndicate), создала экосистему из 50+ предпринимателей и VC"},
    {from: "person_anastasia", to: "company_forbes", type: "worked_at", role: "Deputy Editor", period: "2017-2020", description: "Запустила Forbes 30 Under 30 в России, заместитель главного редактора Forbes Russia"},
    
    {from: "person_anna_p", to: "company_tbank", type: "works_at", role: "AI Product Lead", current: true, description: "AI Product Lead в Т-Банке с 2023 года, признанный эксперт в области продуктового менеджмента, входящая в топ-5 узнаваемых продакт-менеджеров России, управляет разработкой AI-ассистентов для внутренних и внешних use-кейсов"},
    {from: "person_anna_p", to: "company_avito", type: "worked_at", role: "Senior PM", period: "2021-2023", description: "Senior Product Manager в Avito, лидировала продуктовую стратегию в сфере недвижимости, успешно внедряла AI/ML решения для улучшения пользовательского опыта"},
    {from: "person_anna_p", to: "company_mobile_dimension", type: "worked_at", role: "Product Manager", period: "2019-2021", description: "Product Manager в Mobile Dimension, развивала продуктовые решения в сфере мобильных технологий с фокусом на пользовательский опыт"},
    
    {from: "person_evgeny", to: "company_flo", type: "works_at", role: "Director of Engineering", current: true, description: "Director of Engineering в Flo Health Inc. с 2020 года, технический лидер с глубокой экспертизой в области серверно-управляемой архитектуры (Server-Driven UI) и платформенного инжиниринга, возглавляет разработку AI Content Studio"},
    
    {from: "person_egor", to: "company_superabundance", type: "works_at", role: "Co-founder & GP", current: true, description: "Со-основатель и генеральный партнер венчурного фонда Superabundance (2024), венчурный предприниматель и эксперт по продуктовой стратегии с уникальным опытом масштабирования технологических компаний"},
    {from: "person_egor", to: "investor_altair", type: "partner", role: "Venture Partner", current: true, description: "Венчурный партнёр Altair Capital, один из ведущих российских венчурных фондов, специализирующийся на инвестициях в технологические стартапы"},
    {from: "person_egor", to: "company_miro", type: "worked_at", role: "Rebrand Lead", period: "2019", description: "Ключевая фигура ребрендинга RealtimeBoard в Miro, обеспечив рост с 2.5 до 25+ млн пользователей за 2 года, что стало одним из самых успешных ребрендингов в истории B2B SaaS"},
    
    {from: "person_valeria", to: "company_emex", type: "works_at", role: "CEO", current: true, description: "CEO Emex Group - международного лидера в сфере поставок автозапчастей, работающего в 40+ странах, с оборотом 18 млрд рублей и штатом 1000+ сотрудников"},
    {from: "person_valeria", to: "company_wannabe", type: "founded", role: "Founder", period: "2018-2020", description: "Основатель образовательной онлайн-платформы Wannabe для fashion-индустрии, которая привлекла более 10,000 студентов из 50+ стран"},
    {from: "person_valeria", to: "company_typical", type: "founded", role: "Founder", period: "2019-2021", description: "Основатель бренда Typical - sustainable fashion проекта, который получил признание в международном модном сообществе"},
    
    {from: "person_anna_b", to: "company_meander", type: "works_at", role: "CEO & Co-founder", current: true},
    {from: "person_anna_b", to: "company_meta", type: "worked_at", role: "Product Lead", period: "2019-2021"},
    {from: "person_anna_b", to: "company_intercom", type: "worked_at", role: "Product Manager", period: "2017-2019"},
    
    {from: "person_denis_s", to: "company_jetbrains", type: "works_at", role: "Group PM", current: true},
    {from: "person_denis_s", to: "company_neural", type: "works_at", role: "CEO", current: true},
    
    {from: "person_konstantin", to: "company_hirehire", type: "works_at", role: "CEO & Co-founder", current: true},
    {from: "person_konstantin", to: "company_yandex", type: "worked_at", role: "Design Lead", period: "2009-2016"},
    {from: "person_konstantin", to: "company_intercom", type: "worked_at", role: "Design Manager", period: "2016-2019"},
    
    {from: "person_natalia", to: "company_aurora", type: "works_at", role: "CEO & Founder", current: true},
    {from: "person_natalia", to: "investor_rtp", type: "partner", role: "Venture Partner", current: true},
    {from: "person_natalia", to: "company_edadil", type: "founded", role: "Founder & CEO", period: "2017-2021"},
    
    {from: "person_ivan", to: "company_focus", type: "works_at", role: "Founder", current: true},
    {from: "person_ivan", to: "company_yandex", type: "worked_at", role: "Product Manager", period: "2014-2016"}
  ],
  
  // Инвестиционные связи
  investment_connections: [
    {from: "company_rawg", to: "investor_altair", type: "funded_by", amount: "$2.09M", year: "2018"},
    {from: "company_rawg", to: "investor_wargaming", type: "funded_by", amount: "Co-investor", year: "2018"},
    {from: "company_bookmate", to: "investor_ulmart", type: "funded_by", amount: "$6.5M", year: "2013"},
    {from: "company_bookmate", to: "investor_essedel", type: "funded_by", amount: "Co-investor", year: "2013"},
    {from: "company_meander", to: "investor_cherry", type: "funded_by", amount: "$2M", year: "2023"},
    {from: "company_meander", to: "investor_mosaic", type: "funded_by", amount: "$3.75M", year: "2024"},
    {from: "company_aurora", to: "investor_rtp", type: "funded_by", amount: "Seed", year: "2022"},
    {from: "company_edadil", to: "company_yandex", type: "acquired_by", amount: "233M руб", year: "2021"},
    {from: "person_anastasia", to: "investor_t16e", type: "venture_partner", role: "Venture Partner"},
    {from: "person_natalia", to: "investor_rtp", type: "venture_partner", role: "Venture Partner"},
    {from: "person_egor", to: "investor_altair", type: "venture_partner", role: "Venture Partner"},
    {from: "person_egor", to: "investor_superabundance", type: "general_partner", role: "Co-founder & GP"}
  ],
  
  // Образовательные и медиа связи
  media_education_connections: [
    {from: "person_samat", to: "project_zapusk", type: "created", details: "Подкаст 'Запуск завтра', 27K+ подписчиков"},
    {from: "person_ilya", to: "project_product_heroes", type: "created", details: "Курс Product Heroes, 1000+ выпускников"},
    {from: "person_anastasia", to: "project_forbes30", type: "created", details: "Forbes 30 Under 30 Russia"},
    {from: "person_anna_p", to: "project_product_weekdays", type: "created", details: "Telegram-канал, 18K+ подписчиков"},
    {from: "person_anna_p", to: "project_products24", type: "organized", details: "Конференция 'Продукты 24', 9000+ участников"},
    {from: "person_anna_b", to: "project_proproduct", type: "created", details: "Telegram-канал, 38K+ подписчиков"},
    {from: "person_denis_s", to: "project_denissexy", type: "created", details: "Telegram-канал, 110K+ подписчиков"},
    {from: "person_denis_s", to: "project_lumieres", type: "created", details: "Вирусная реставрация фильма, 100M+ просмотров"},
    {from: "person_ivan", to: "project_kak_delat", type: "created", details: "Курс 'Как делать продукт', 9000+ студентов"}
  ],
  
  // Профессиональные связи между людьми
  people_connections: [
    {from: "person_ilya", to: "person_denis_p", type: "collaborated", context: "Skyeng", period: "2017-2020"},
    {from: "person_anna_b", to: "person_konstantin", type: "collaborated", context: "Intercom", period: "2017-2019"},
    {from: "person_konstantin", to: "person_ivan", type: "collaborated", context: "Яндекс", period: "2014-2016"},
    {from: "person_anastasia", to: "person_natalia", type: "professional", context: "Venture ecosystem"},
    {from: "person_egor", to: "person_natalia", type: "professional", context: "VC partners"},
    {from: "person_ilya", to: "investor_frii", type: "methodology", context: "Методолог ФРИИ 6 лет"}
  ],
  
  // Навыки и специализации
  skill_connections: [
    {from: "person_samat", skills: ["Engineering Leadership", "Scaling", "MVP Development", "FreeBSD", "PostgreSQL"]},
    {from: "person_ilya", skills: ["Unit Economics", "Product Management", "Growth", "EdTech", "Metrics"]},
    {from: "person_denis_p", skills: ["Product Strategy", "Team Scaling", "Growth", "OSINT", "B2B SaaS"]},
    {from: "person_anastasia", skills: ["Media", "Venture Capital", "Content Strategy", "Community Building"]},
    {from: "person_anna_p", skills: ["AI/ML", "FinTech", "Product Management", "Growth", "Real Estate Tech"]},
    {from: "person_evgeny", skills: ["Server-driven UI", "Platform Engineering", "AI/ML", "Mobile", "Team Leadership"]},
    {from: "person_egor", skills: ["Venture Capital", "Product Strategy", "Rebranding", "Growth", "AI solutions"]},
    {from: "person_valeria", skills: ["Corporate Leadership", "International Business", "E-commerce", "Education"]},
    {from: "person_anna_b", skills: ["AI/ML", "Career Development", "Mentorship", "B2B SaaS"]},
    {from: "person_denis_s", skills: ["Computer Vision", "GenAI", "Neural Networks", "Video Processing"]},
    {from: "person_konstantin", skills: ["HR Tech", "AI Recruiting", "Design Leadership", "Typography"]},
    {from: "person_natalia", skills: ["AI/ML", "Venture Capital", "Consumer Products", "Growth"]},
    {from: "person_ivan", skills: ["Product Management", "JTBD", "Education", "Growth", "SaaS"]}
  ],
  
  // Географические связи
  location_connections: [
    {person: "person_anna_b", location: "США", context: "CEO Meander"},
    {person: "person_natalia", location: "США", context: "CEO Aurora AI, VP RTP Global"},
    {person: "person_konstantin", location: "Ирландия", context: "CEO HireHire"},
    {person: "person_denis_s", location: "Украина", context: "JetBrains, neural.love"},
    {company: "company_jetbrains", location: "Czech Republic", type: "headquarters"},
    {company: "company_flo", location: "Global", users: "380M in 190 countries"},
    {company: "company_emex", location: "40 countries", type: "operations"}
  ]
};