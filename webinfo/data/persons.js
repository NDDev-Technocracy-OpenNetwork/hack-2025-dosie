// Полная информация о всех 14 членах жюри (включая возможный дубликат)
// Маппинг MD файлов к персонам
const mdFilesMapping = {
  "person_samat": "compass_artifact_wf-02ea4a6f-2843-4dd2-977f-7472f48d4fd4_text_markdown.md",
  "person_ilya": "compass_artifact_wf-199e83d7-38b1-4daa-8a2c-0efcdea7811a_text_markdown.md",
  "person_denis_p": "compass_artifact_wf-1cc4d559-e013-41d3-a6e2-da833500c6ab_text_markdown.md",
  "person_anastasia": "compass_artifact_wf-22aa6d95-a5ef-4b9c-a64f-070c61093ef5_text_markdown.md",
  "person_anna_p": "compass_artifact_wf-242344b5-7d25-4a9e-aa23-6783c578224f_text_markdown.md",
  "person_evgeny": "compass_artifact_wf-2fdee498-862c-4121-b206-b781a46fa2f6_text_markdown.md",
  "person_egor": "compass_artifact_wf-551e28a8-ff3a-40f0-816f-69d67ef3cf08_text_markdown.md",
  "person_valeria": "compass_artifact_wf-694497af-c1ce-4593-b701-3ed25ce6a384_text_markdown.md",
  "person_anna_b": "compass_artifact_wf-85f61d81-7864-41a8-ba4f-3bf35930b02a_text_markdown.md",
  "person_denis_s": "compass_artifact_wf-9e2355e6-5dcd-4ac7-a37d-e8b4e3a6bbb8_text_markdown.md",
  "person_konstantin": "compass_artifact_wf-b8a35f51-2dd8-4e88-9cac-e8bb90a12752_text_markdown.md",
  "person_natalia": "compass_artifact_wf-b9adc4e4-125a-4a48-8290-c45ef6ecf32e_text_markdown.md",
  "person_ivan": "compass_artifact_wf-f0a11794-2bd1-44d0-8340-995cfdc9b4bf_text_markdown.md",
  "person_anna_p_duplicate": "compass_artifact_wf-9c505c62-1f38-431b-b5cf-dc7b82d10c4f_text_markdown.md" // Дубликат Анны Подображных
};

const personsData = [
  {
    id: "person_samat",
    name: "Самат Галимов",
    fullName: "Самат Галимов",
    category: "технологии",
    position: "CTO и сооснователь",
    company: "FANS-development",
    location: "Россия",
    experience: "15+ лет",
    description: "Опытный технический лидер с 15-летним стажем создания и масштабирования технологических продуктов от MVP до миллионов пользователей. Создатель популярного подкаста 'Запуск завтра' с аудиторией более 27 000 подписчиков.",
    expertise: ["MVP разработка", "Масштабирование", "Техническое лидерство", "FreeBSD", "PostgreSQL", "Микросервисы"],
    achievements: [
      "Построил крупнейшую игровую базу данных RAWG (300 000+ игр) с привлечением $2.09M",
      "Масштабировал Meduza до 18 млн уникальных пользователей в месяц",
      "Помог 30+ стартапам в росте и масштабировании через FANS-development",
      "Создал подкаст 'Запуск завтра' с 27K+ подписчиков"
    ],
    career: [
      {company: "FANS-development", role: "CTO & Co-founder", period: "2019-настоящее время", type: "current"},
      {company: "RAWG", role: "CTO", period: "2018-2019", type: "past"},
      {company: "Meduza", role: "CTO", period: "2014-2018", type: "past"},
      {company: "Bookmate", role: "CTO", period: "2012-2014", type: "past"}
    ],
    investments: [],
    media: {
      podcast: "Запуск завтра",
      subscribers: "27K+",
      telegram: "@zapuskzavtra"
    },
    mdFile: "compass_artifact_wf-02ea4a6f-2843-4dd2-977f-7472f48d4fd4_text_markdown.md"
  },
  {
    id: "person_ilya",
    name: "Илья Красинский",
    fullName: "Илья Красинский",
    category: "продуктовая стратегия",
    position: "CEO & Founder",
    company: "rick.ai, Heroes.camp",
    location: "Россия",
    experience: "10+ лет",
    description: "Признанный 'мастер спорта по юнит-экономике' в российском стартап-сообществе, методолог ФРИИ, который помог более 1000 компаний оптимизировать метрики.",
    expertise: ["Юнит-экономика", "Product Management", "Growth", "Метрики", "EdTech", "E-commerce аналитика"],
    achievements: [
      "Со-основатель SkyEng, которая привлекла $15.3M+ и имеет 3266+ сотрудников",
      "6 лет работы методологом в ФРИИ, разработка методологий для 500+ стартапов",
      "Обучил 1000+ продакт-менеджеров через курс Product Heroes",
      "Создал трекшн-карту совместно с командой ФРИИ"
    ],
    career: [
      {company: "rick.ai", role: "CEO & Founder", period: "2020-настоящее время", type: "current"},
      {company: "Heroes.camp", role: "CEO & Founder", period: "2020-настоящее время", type: "current"},
      {company: "Unicorn.me", role: "Co-founder", period: "2020-настоящее время", type: "current"},
      {company: "ФРИИ", role: "Старший эксперт и методолог", period: "2013-2019", type: "past"},
      {company: "LinguaLeo", role: "Руководитель разработки", period: "2011-2013", type: "past"},
      {company: "SkyEng", role: "Co-founder", period: "2010-2012", type: "past"}
    ],
    investments: [],
    media: {
      medium: "@ikrasinsky",
      linkedin: "@ikrasinsky"
    },
    mdFile: "compass_artifact_wf-199e83d7-38b1-4daa-8a2c-0efcdea7811a_text_markdown.md"
  },
  {
    id: "person_denis_p",
    name: "Денис Пушкин",
    fullName: "Денис Пушкин",
    category: "продуктовое лидерство",
    position: "Chief Product Officer",
    company: "Social Links",
    location: "Россия",
    experience: "10+ лет",
    description: "Опытный продуктовый лидер с опытом масштабирования команд, известный амбициозными целями и систематическим подходом к росту.",
    expertise: ["Product Strategy", "Team Scaling", "Growth", "OSINT", "EdTech", "B2B SaaS"],
    achievements: [
      "В Skyeng поставил и реализовал цель в 1 млрд рублей выручки, поддерживая 3x годовой рост",
      "Вывод компании на лидерство с 45% рынка онлайн-языкового обучения",
      "Возглавляет продукт в Social Links - OSINT-платформе для S&P 500 и 80+ стран",
      "Масштабировал продуктовую команду с 5 до 30+ человек"
    ],
    career: [
      {company: "Social Links", role: "CPO", period: "2020-настоящее время", type: "current"},
      {company: "Skyeng", role: "CPO", period: "2017-2020", type: "past"}
    ],
    investments: [],
    media: {},
    mdFile: "compass_artifact_wf-1cc4d559-e013-41d3-a6e2-da833500c6ab_text_markdown.md"
  },
  {
    id: "person_anastasia",
    name: "Анастасия Карпова",
    fullName: "Анастасия Карпова",
    category: "медиа и венчурные инвестиции",
    position: "Главный редактор, Венчурный партнёр",
    company: "Harvard Business Review Russia, t16e",
    location: "Россия",
    experience: "8+ лет",
    description: "Медиа-лидер и венчурный партнёр с уникальной комбинацией медийного влияния и венчурной экспертизы, создатель рейтинга Forbes 30 Under 30 в России.",
    expertise: ["Media", "Venture Capital", "Journalism", "Content Strategy", "Community Building"],
    achievements: [
      "Создала advisory board Forbes Under30 из 50+ предпринимателей и VC",
      "Написала 9 обложечных историй Forbes за 2.5 года",
      "Венчурный партнёр фонда t16e с $3B+ AUM",
      "Главный редактор Harvard Business Review Russia"
    ],
    career: [
      {company: "Harvard Business Review Russia", role: "Главный редактор", period: "2020-настоящее время", type: "current"},
      {company: "t16e", role: "Venture Partner", period: "2021-настоящее время", type: "current"},
      {company: "Forbes Russia", role: "Deputy Editor", period: "2017-2020", type: "past"}
    ],
    investments: [
      {fund: "t16e", aum: "$3B+", focus: "Tech ventures"}
    ],
    media: {
      publications: ["Forbes", "HBR Russia"],
      articles: "9 обложечных историй Forbes"
    },
    mdFile: "compass_artifact_wf-22aa6d95-a5ef-4b9c-a64f-070c61093ef5_text_markdown.md"
  },
  {
    id: "person_anna_p",
    name: "Анна Подображных",
    fullName: "Анна (Аня) Подображных",
    category: "AI и финтех",
    position: "AI Product Lead",
    company: "T-Bank",
    location: "Россия",
    experience: "8+ лет",
    description: "AI Product Lead в Т-Банке, признанный эксперт в области продуктового менеджмента, входящая в топ-5 узнаваемых продакт-менеджеров России.",
    expertise: ["AI/ML", "FinTech", "Product Management", "Growth", "Real Estate Tech", "Conference Organization"],
    achievements: [
      "В Авито удвоила конверсию карточного поиска недвижимости",
      "Сократила time-to-market с 30 до 5 дней",
      "Создала Telegram-канал @product_weekdays с 18,000+ подписчиков",
      "Организовала конференцию T-Bank 'Продукты 24' с 9000+ участников"
    ],
    career: [
      {company: "T-Bank", role: "AI Product Lead", period: "2023-настоящее время", type: "current"},
      {company: "Avito", role: "Senior PM", period: "2021-2023", type: "past"},
      {company: "Mobile Dimension", role: "Product Manager", period: "2019-2021", type: "past"}
    ],
    investments: [],
    media: {
      telegram: "@product_weekdays",
      subscribers: "18K+",
      course: "Продукт и точка"
    },
    mdFile: "compass_artifact_wf-242344b5-7d25-4a9e-aa23-6783c578224f_text_markdown.md"
  },
  {
    id: "person_evgeny",
    name: "Евгений Сергеев",
    fullName: "Евгений Сергеев",
    category: "технологическое лидерство",
    position: "Director of Engineering",
    company: "Flo Health Inc.",
    location: "Россия",
    experience: "10+ лет",
    description: "Технический лидер с глубокой экспертизой в области серверно-управляемой архитектуры и платформенного инжиниринга.",
    expertise: ["Server-driven UI", "Platform Engineering", "AI/ML", "Mobile Development", "Team Leadership"],
    achievements: [
      "Достиг роста ARPU на 13.5% и увеличения конверсии онбординга на 20%",
      "Ускорил эксперименты на 170% и обеспечил запуск 87% экспериментов без инженеров",
      "Возглавляет разработку AI Content Studio с удвоенной медицинской точностью",
      "Управляет командой в компании с оценкой $1 млрд и 380M пользователей"
    ],
    career: [
      {company: "Flo Health", role: "Director of Engineering", period: "2021-настоящее время", type: "current"}
    ],
    investments: [],
    media: {},
    mdFile: "compass_artifact_wf-2fdee498-862c-4121-b206-b781a46fa2f6_text_markdown.md"
  },
  {
    id: "person_egor",
    name: "Егор Коробейников",
    fullName: "Егор Коробейников",
    category: "венчурный капитал",
    position: "Со-основатель, генеральный партнер",
    company: "Superabundance",
    location: "Россия",
    experience: "10+ лет",
    description: "Венчурный предприниматель и эксперт по продуктовой стратегии с уникальным опытом масштабирования технологических компаний.",
    expertise: ["Venture Capital", "Product Strategy", "Rebranding", "Growth", "AI-enabled solutions"],
    achievements: [
      "Руководил ребрендингом RealtimeBoard в Miro за 3 месяца, рост с 2.5 до 25+ млн пользователей",
      "Участвовал в приобретении Sidekick Browser компанией Perplexity AI (оценка $18B)",
      "Основал венчурную студию Superabundance, фокус на AI-enabled решениях",
      "Venture Partner в AltaIR Capital"
    ],
    career: [
      {company: "Superabundance", role: "Co-founder & GP", period: "2022-настоящее время", type: "current"},
      {company: "Miro", role: "Rebrand Lead", period: "2019", type: "past"},
      {company: "AltaIR Capital", role: "Venture Partner", period: "2020-настоящее время", type: "current"}
    ],
    investments: [
      {fund: "Superabundance", focus: "AI-enabled professional services"},
      {fund: "AltaIR Capital", role: "Venture Partner"}
    ],
    media: {},
    mdFile: "compass_artifact_wf-551e28a8-ff3a-40f0-816f-69d67ef3cf08_text_markdown.md"
  },
  {
    id: "person_valeria",
    name: "Валерия Розова",
    fullName: "Валерия Розова",
    category: "корпоративное лидерство",
    position: "CEO",
    company: "Emex Group",
    location: "Россия",
    experience: "10+ лет",
    description: "Серийный предприниматель и CEO с глубоким бэкграундом в продуктовом менеджменте, возглавляющая международный холдинг.",
    expertise: ["Corporate Leadership", "International Business", "E-commerce", "Education Business", "Product Management"],
    achievements: [
      "Управляет международным холдингом Emex Group с GMV $500+ млн в 40 странах",
      "Построила образовательный бизнес Wannabe с базой 40,000+ пользователей и 2x ростом выручки",
      "Создала платформу TYPICAL, обслужившую 200+ топ-руководителей",
      "38 стран присутствия бизнеса"
    ],
    career: [
      {company: "Emex Group", role: "CEO", period: "2020-настоящее время", type: "current"},
      {company: "Wannabe", role: "Founder", period: "2018-2020", type: "past"},
      {company: "TYPICAL", role: "Founder", period: "2019-2021", type: "past"}
    ],
    investments: [],
    media: {},
    mdFile: "compass_artifact_wf-694497af-c1ce-4593-b701-3ed25ce6a384_text_markdown.md"
  },
  {
    id: "person_anna_b",
    name: "Анна Булдакова",
    fullName: "Анна Булдакова",
    category: "AI и карьерное развитие",
    position: "CEO и сооснователь",
    company: "Meander",
    location: "США",
    experience: "8+ лет",
    description: "Предприниматель в области AI с опытом работы в Meta и Intercom, основатель платформы менторства и карьерного развития.",
    expertise: ["AI/ML", "Career Development", "Mentorship", "Product Management", "B2B SaaS"],
    achievements: [
      "Привлекла $5.75M за 2 раунда от Cherry Ventures и Mosaic Ventures для Meander",
      "Работала Product Lead в Meta/Facebook в команде Workplace AI",
      "Создала популярный Telegram-канал @proproduct с 38,851 подписчиков",
      "Опыт работы в крупнейших tech-компаниях (Meta, Intercom)"
    ],
    career: [
      {company: "Meander", role: "CEO & Co-founder", period: "2022-настоящее время", type: "current"},
      {company: "Meta", role: "Product Lead", period: "2019-2021", type: "past"},
      {company: "Intercom", role: "Product Manager", period: "2017-2019", type: "past"}
    ],
    investments: [
      {round: "Seed", amount: "$2M", investors: ["Cherry Ventures"]},
      {round: "Series A", amount: "$3.75M", investors: ["Mosaic Ventures"]}
    ],
    media: {
      telegram: "@proproduct",
      subscribers: "38.8K+"
    },
    mdFile: "compass_artifact_wf-85f61d81-7864-41a8-ba4f-3bf35930b02a_text_markdown.md"
  },
  {
    id: "person_denis_s",
    name: "Денис Ширяев",
    fullName: "Денис Ширяев",
    category: "AI и компьютерное зрение",
    position: "Group Product Manager, CEO",
    company: "JetBrains, neural.love",
    location: "Украина",
    experience: "10+ лет",
    description: "Украинский предприниматель в области GenAI, получил международную известность после вирусного восстановления исторических фильмов.",
    expertise: ["Computer Vision", "GenAI", "Neural Networks", "Video Processing", "Product Management"],
    achievements: [
      "Создал вирусную реставрацию фильма братьев Люмьер 1896 года в 4K/60fps (100M+ просмотров)",
      "Разработал технологию ускорения обработки видео на 6,667% с GPU NVIDIA RTX 6000",
      "Управляет Telegram-каналом @denissexy с 110K+ подписчиков",
      "Group Product Manager в JetBrains"
    ],
    career: [
      {company: "JetBrains", role: "Group Product Manager", period: "2020-настоящее время", type: "current"},
      {company: "neural.love", role: "CEO", period: "2020-настоящее время", type: "current"}
    ],
    investments: [],
    media: {
      telegram: "@denissexy",
      subscribers: "110K+",
      youtube: "Denis Shiryaev"
    },
    mdFile: "compass_artifact_wf-9e2355e6-5dcd-4ac7-a37d-e8b4e3a6bbb8_text_markdown.md"
  },
  {
    id: "person_konstantin",
    name: "Константин Горский",
    fullName: "Константин Горский",
    category: "HR-технологии",
    position: "Co-founder & CEO",
    company: "HireHire",
    location: "Ирландия",
    experience: "15+ лет",
    description: "Серийный предприниматель и продуктовый лидер с 15-летним опытом построения команд в Яндексе и Intercom.",
    expertise: ["HR Tech", "AI Recruiting", "Design Leadership", "Typography", "Team Building"],
    achievements: [
      "Создал фирменный шрифт Яндекс Sans в сотрудничестве с мировыми типографами",
      "Построил международную дизайн-команду в Intercom (оценка $1.275B)",
      "Победил в конкурсе 'Most Investable Startup' на New Frontiers Showcase в марте 2025",
      "15 лет опыта построения команд"
    ],
    career: [
      {company: "HireHire", role: "CEO & Co-founder", period: "2019-настоящее время", type: "current"},
      {company: "Intercom", role: "Design Manager", period: "2016-2019", type: "past"},
      {company: "Яндекс", role: "Design Lead", period: "2009-2016", type: "past"}
    ],
    investments: [],
    media: {},
    mdFile: "compass_artifact_wf-b8a35f51-2dd8-4e88-9cac-e8bb90a12752_text_markdown.md"
  },
  {
    id: "person_natalia",
    name: "Наталия Шагарина",
    fullName: "Наталия Шагарина",
    category: "AI и венчурные инвестиции",
    position: "CEO, Venture Partner",
    company: "Aurora AI Assistant, RTP Global",
    location: "США",
    experience: "10+ лет",
    description: "Серийный предприниматель с успешным экзитом, специализируется на создании AI-решений для массового потребителя.",
    expertise: ["AI/ML", "Venture Capital", "Consumer Products", "Growth", "Mobile Apps"],
    achievements: [
      "Масштабировала Edadil до 12 млн пользователей и продала Яндексу за 233 млн рублей",
      "Venture Partner в RTP Global с доступом к фонду $3 млрд и портфелю из 197 компаний",
      "Основала Aurora AI - персонального ассистента для семей",
      "Успешный экзит в 2021 году"
    ],
    career: [
      {company: "Aurora AI", role: "CEO & Founder", period: "2022-настоящее время", type: "current"},
      {company: "RTP Global", role: "Venture Partner", period: "2021-настоящее время", type: "current"},
      {company: "Edadil", role: "Founder & CEO", period: "2017-2021", type: "past", exit: "Яндекс, 233M руб"}
    ],
    investments: [
      {fund: "RTP Global", aum: "$3B", portfolio: "197 companies", role: "Venture Partner"}
    ],
    media: {},
    mdFile: "compass_artifact_wf-b9adc4e4-125a-4a48-8290-c45ef6ecf32e_text_markdown.md"
  },
  {
    id: "person_ivan",
    name: "Иван Замесин",
    fullName: "Иван Замесин",
    category: "образование и продуктовый менеджмент",
    position: "Основатель",
    company: "Focus Calendar, Как делать продукт",
    location: "Россия",
    experience: "10+ лет",
    description: "Ведущий российский эксперт по продуктовому менеджменту и создатель методологии Advanced JTBD.",
    expertise: ["Product Management", "JTBD", "Education", "Growth", "Mobile Apps", "SaaS"],
    achievements: [
      "Обучил 9,000+ продакт-менеджеров через курс 'Как делать продукт' с рейтингом 9.2/10",
      "Продал стартап Meta (сервис подбора психотерапевтов) за 8 млн рублей",
      "Удвоил engagement метрики Яндекс.Картинок за 2015 год (30M MAU, 7M DAU)",
      "Создал методологию Advanced JTBD"
    ],
    career: [
      {company: "Focus Calendar", role: "Founder", period: "2020-настоящее время", type: "current"},
      {company: "Как делать продукт", role: "Founder", period: "2018-настоящее время", type: "current"},
      {company: "Meta (стартап)", role: "Founder", period: "2017-2019", type: "past", exit: "8M руб"},
      {company: "Яндекс", role: "Product Manager", period: "2014-2016", type: "past"}
    ],
    investments: [],
    media: {
      course: "Как делать продукт",
      students: "9000+",
      rating: "9.2/10"
    },
    mdFile: "compass_artifact_wf-f0a11794-2bd1-44d0-8340-995cfdc9b4bf_text_markdown.md"
  },
  // Добавляем 14-го члена жюри (технически это дубликат Анны Подображных с другой информацией)
  {
    id: "person_anna_p_duplicate",
    name: "Анна Подображных",
    fullName: "Анна (Аня) Подображных",
    category: "AI и финтех",
    position: "AI Product Lead",
    company: "T-Bank",
    location: "Россия",
    experience: "8+ лет",
    description: "AI Product Lead в Т-Банке с 2023 года, признанный эксперт в области продуктового менеджмента с 8-летним опытом в IT-индустрии, входящая в топ-5 узнаваемых продакт-менеджеров России. Это расширенная версия досье с дополнительной информацией.",
    expertise: ["AI/ML", "FinTech", "Product Management", "Growth", "Real Estate Tech", "Conference Organization", "Community Building"],
    achievements: [
      "В Авито удвоила конверсию карточного поиска недвижимости и сократила time-to-market с 30 до 5 дней",
      "Создала Telegram-канал @product_weekdays с 18,000+ подписчиков",
      "Организовала конференцию T-Bank 'Продукты 24' с 9000+ участников",
      "Входит в топ-5 узнаваемых продакт-менеджеров России",
      "Запустила успешный образовательный курс 'Продукт и точка'"
    ],
    career: [
      {company: "T-Bank", role: "AI Product Lead", period: "2023-настоящее время", type: "current"},
      {company: "Avito", role: "Senior PM (GEO-сервисы)", period: "2021-2023", type: "past"},
      {company: "Mobile Dimension", role: "Product Manager", period: "2019-2021", type: "past"},
      {company: "Previous experience", role: "Various PM roles", period: "2016-2019", type: "past"}
    ],
    investments: [],
    media: {
      telegram: "@product_weekdays",
      subscribers: "18K+",
      course: "Продукт и точка",
      conference: "Продукты 24 (9000+ участников)"
    },
    mdFile: "compass_artifact_wf-9c505c62-1f38-431b-b5cf-dc7b82d10c4f_text_markdown.md"
  }
];