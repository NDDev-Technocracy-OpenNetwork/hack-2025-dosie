<!-- nddev-public-hackathon -->
# hack-2025-dosie

Dosie 2025 hackathon demo: investor-network visualization and jury profiles with interactive D3.js graphs.

[NDDev OpenNetwork](https://github.com/NDDev-Technocracy-OpenNetwork) · [Repository](https://github.com/NDDev-Technocracy-OpenNetwork/hack-2025-dosie)

This repository is a hackathon prototype or supporting tool. Follow the project-specific setup below; cloud integrations require your own configuration and credentials.

---

## 🏆 Dosie Hackathon - Investor Network Visualization



Интерактивная платформа для анализа и визуализации инвестиционных связей жюри хакатона. Проект создан для демонстрации венчурных сетей, профессиональных достижений и стратегических возможностей участников.

## 🎯 Описание проекта

Этот проект представляет собой comprehensive analysis platform, содержащую детальные досье на 14 участников жюри с их:
- Профессиональными достижениями и метриками
- Венчурными связями (3-уровневая иерархия)
- Топ-5 инвестиционных возможностей с scoring
- Стратегическими рекомендациями
- Competitive advantages и market positioning

## 🚀 Функциональность

### 📊 Визуализация данных
- **Graph View**: Интерактивная сетевая визуализация связей между участниками
- **Personalities Grid**: Карточный интерфейс с фотографиями и ключевой информацией
- **Detailed Profiles**: Comprehensive анализы каждого участника

### 🔍 Аналитические компоненты
- **Investment Network Mapping**: Трехуровневая система связей (фонды → индивидуальные инвесторы → экосистема)
- **Priority Scoring**: Математические модели для оценки инвестиционных возможностей
- **Strategic Recommendations**: Actionable insights для approach strategies

### 📱 Интерфейс
- **Responsive Design**: Адаптивный дизайн для всех устройств
- **Interactive Navigation**: Smooth переходы между разделами
- **Rich Content Display**: Markdown рендеринг с эмодзи и форматированием

## 📁 Структура проекта

```
dosie_hackathon/
├── webinfo/                          # Основная веб-платформа
│   ├── index.html                     # Главная страница
│   ├── graph.html                     # Сетевая визуализация
│   ├── personalities.html             # Карточки участников
│   ├── md-viewer.html                 # Детальные профили
│   ├── app.js                         # Основная логика приложения
│   ├── personalities.js               # Логика карточек
│   ├── graph-visualization.js         # D3.js визуализация
│   ├── md-content.js                  # Встроенные MD данные
│   └── data/                          # Структурированные данные
│       ├── persons.js                 # Данные участников
│       ├── companies.js               # Информация о компаниях
│       ├── investors.js               # База инвесторов
│       └── connections.js             # Связи между участниками
├── md_info/                           # Исходные MD файлы
│   └── compass_artifact_*.md          # Детальные досье участников
├── *.pdf                              # Исходная документация
├── comprehensive_knowledge_graph.json # Граф знаний
├── CLAUDE.md                          # Инструкции для Claude
└── README.md                          # Этот файл
```

## 🛠️ Технологический стек

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Visualization**: D3.js для интерактивных графов
- **Data Processing**: JavaScript для обработки JSON/MD данных
- **Styling**: Custom CSS с responsive design
- **Content**: Markdown для rich text formatting

## 🚀 Запуск проекта

### Локальный запуск
1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd dosie_hackathon
```

2. Откройте `webinfo/index.html` в браузере или запустите локальный сервер:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

3. Перейдите на `http://localhost:8000/webinfo/`

### Структура навигации
- **Главная** (`index.html`) - обзор проекта и навигация
- **Граф связей** (`graph.html`) - интерактивная сетевая визуализация
- **Участники** (`personalities.html`) - карточки всех участников жюри
- **Детальные профили** (`md-viewer.html`) - comprehensive анализы

## 📈 Ключевые особенности данных

### Участники жюри (14 человек)
1. **Самат Галимов** - CTO FANS-development, подкастер "Запуск завтра"
2. **Илья Красинский** - Эксперт по юнит-экономике, автор Unit Guide
3. **Денис Пушкин** - Managing Partner Starta Ventures
4. **Анастасия Карпова** - Медиа-лидер и Venture Partner
5. **Анна Подображных** - AI Product Lead T-Bank
6. **Евгений Сергеев** - Основатель Kupibilet, Angel Investor
7. **Егор Коробейников** - Venture Partner RTP Global
8. **Валерия Розова** - CEO Emex Group
9. **Анна Булдакова** - CEO Meander, экс-Meta Product Lead
10. **Денис Ширяев** - JetBrains AI + neural.love CEO
11. **Константин Горский** - HireHire CEO, экс-Intercom/Yandex
12. **Наталия Шагарина** - RTP Global VP, Aurora AI CEO
13. **Иван Замесин** - Advanced JTBD creator, продуктовый эксперт

### Типы данных
- **Professional Background**: Карьерные достижения с метриками
- **Venture Networks**: 3-уровневая система связей
- **Investment Opportunities**: Scored recommendations
- **Strategic Intelligence**: Market positioning и competitive advantages

## 🎨 Дизайн-система

### Цветовая схема
- **Primary**: #2c3e50 (темно-синий)
- **Secondary**: #3498db (голубой)
- **Accent**: #e74c3c (красный)
- **Success**: #27ae60 (зеленый)
- **Background**: #ecf0f1 (светло-серый)

### Типографика
- **Headers**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Body**: Georgia, 'Times New Roman', serif для читаемости
- **Code**: 'Courier New', monospace

## 📊 Аналитические модели

### Priority Scoring Formula
```
Priority = 0.45×investor_fit + 0.35×connection_warmth + 0.10×recency + 0.10×accessibility
```

### Connection Strength Levels
- **Level 1**: Фонды/VC/Акселераторы (прямые связи)
- **Level 2**: Индивидуальные инвесторы (персональные контакты)  
- **Level 3**: Экосистемные связи (знакомые/коллеги)

### Evidence Grading
- **A**: Официальные источники, прямые цитаты
- **B**: Множественные подтверждения, надежные базы данных
- **C**: Единичные упоминания в авторитетных источниках
- **D**: Косвенные связи, слабые упоминания

## 🔄 Обновление данных

### Добавление нового участника
1. Создайте MD файл в `md_info/`
2. Добавьте запись в `webinfo/data/persons.js`
3. Обновите `webinfo/md-content.js`
4. При необходимости добавьте связи в `connections.js`

### Обновление существующих профилей
1. Отредактируйте соответствующий MD файл
2. Обновите встроенный контент в `md-content.js`
3. Проверьте консистентность данных в data/ папке

## 🤝 Contributing

Для внесения изменений:
1. Форкните репозиторий
2. Создайте feature branch
3. Внесите изменения с подробными commit messages
4. Создайте pull request с описанием изменений

### Code Style
- JavaScript: ES6+ синтаксис
- HTML: Семантическая разметка
- CSS: Mobile-first подход
- Comments: На русском языке для бизнес-логики

## 📝 Источники данных

Все данные собраны из публичных источников:
- LinkedIn профили
- Официальные сайты компаний
- Публичные интервью и статьи
- Корпоративные базы данных (Crunchbase, AngelList)
- Конференционные биографии
- Медиа публикации

## 📄 Лицензия

Проект создан для образовательных и демонстрационных целей. Все персональные данные получены из открытых источников и используются в соответствии с принципами публичной информации.

## 📞 Контакты

Проект создан в рамках Dosie Hackathon для демонстрации возможностей анализа венчурных экосистем и профессиональных сетей.

---

**Статус проекта**: ✅ Активная разработка  
**Последнее обновление**: Январь 2025  
**Версия**: 1.0.0
## Publication data note

The 2025 research snapshots and graph are historical hackathon material, including machine-assisted biographical summaries. They are not verified current biographies, investment advice or a basis for evaluating individuals. Source references, where recorded, are retained. Run the static demo with `python3 -m http.server 8080 --directory webinfo` and open `http://localhost:8080`. No backend or private API credentials are needed.
