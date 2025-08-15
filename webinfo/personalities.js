// Глобальные переменные
let selectedPerson = null;
let activeFilters = new Set();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    renderPersonList();
});

// Инициализация фильтров по категориям
function initializeFilters() {
    const categories = [...new Set(personsData.map(p => p.category))];
    const filtersContainer = document.getElementById('categoryFilters');
    
    // Кнопка "Все"
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Все';
    allBtn.onclick = () => {
        activeFilters.clear();
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        renderPersonList();
    };
    filtersContainer.appendChild(allBtn);
    
    // Кнопки категорий
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = category;
        btn.onclick = () => {
            if (activeFilters.has(category)) {
                activeFilters.delete(category);
                btn.classList.remove('active');
            } else {
                activeFilters.add(category);
                btn.classList.add('active');
            }
            
            // Обновление кнопки "Все"
            if (activeFilters.size === 0) {
                allBtn.classList.add('active');
            } else {
                allBtn.classList.remove('active');
            }
            
            renderPersonList();
        };
        filtersContainer.appendChild(btn);
    });
}

// Отрисовка списка персон
function renderPersonList() {
    const container = document.getElementById('personList');
    container.innerHTML = '';
    
    const filteredPersons = activeFilters.size > 0 
        ? personsData.filter(p => activeFilters.has(p.category))
        : personsData;
    
    filteredPersons.forEach(person => {
        const card = document.createElement('div');
        card.className = 'person-card';
        if (selectedPerson && selectedPerson.id === person.id) {
            card.classList.add('active');
        }
        
        card.innerHTML = `
            <div class="name">${person.name}</div>
            <div class="position">${person.position}</div>
            <div class="company">${person.company}</div>
            <span class="category-badge">${person.category}</span>
        `;
        
        card.onclick = () => selectPerson(person);
        container.appendChild(card);
    });
}

// Выбор персоны
function selectPerson(person) {
    selectedPerson = person;
    
    // Обновление активной карточки
    document.querySelectorAll('.person-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Отображение деталей
    renderPersonDetails(person);
}

// Отрисовка детальной информации
function renderPersonDetails(person) {
    const container = document.getElementById('detailContent');
    
    // Получение связей персоны
    const connections = getPersonConnections(person);
    const stats = calculatePersonStats(person, connections);
    
    container.innerHTML = `
        <div class="detail-header">
            <h1>${person.fullName}</h1>
            <div class="subtitle">${person.position}</div>
            <div class="company-info">${person.company}</div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="number">${person.experience}</div>
                <div class="label">Опыт</div>
            </div>
            <div class="stat-card">
                <div class="number">${stats.companies}</div>
                <div class="label">Компаний</div>
            </div>
            <div class="stat-card">
                <div class="number">${stats.achievements}</div>
                <div class="label">Достижений</div>
            </div>
            <div class="stat-card">
                <div class="number">${stats.connections}</div>
                <div class="label">Связей</div>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="label">Категория</div>
                <div class="value">${person.category}</div>
            </div>
            <div class="info-item">
                <div class="label">Локация</div>
                <div class="value">${person.location}</div>
            </div>
        </div>
        
        <div class="section">
            <h2><span class="section-icon">📝</span> Описание</h2>
            <p>${person.description}</p>
        </div>
        
        <div class="section">
            <h2><span class="section-icon">🎯</span> Ключевые достижения</h2>
            <div class="achievement-list">
                ${person.achievements.map(a => `
                    <div class="achievement-item">${a}</div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2><span class="section-icon">💼</span> Карьерный путь</h2>
            <div class="career-timeline">
                ${person.career.map(c => `
                    <div class="career-item ${c.type === 'current' ? 'current' : ''}">
                        <div class="period">${c.period}</div>
                        <div class="role">${c.role}</div>
                        <div class="company-name">${c.company}</div>
                        ${c.exit ? `<div style="color: #4CAF50; font-size: 12px; margin-top: 5px;">Exit: ${c.exit}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2><span class="section-icon">⚡</span> Навыки и экспертиза</h2>
            <div class="skills-container">
                ${person.expertise.map(skill => `
                    <span class="skill-tag">${skill}</span>
                `).join('')}
            </div>
        </div>
        
        ${renderMediaSection(person)}
        ${renderInvestmentSection(person)}
        
        <div class="section">
            <h2><span class="section-icon">🔗</span> Граф связей</h2>
            <div class="connections-graph">
                <svg id="personalGraph"></svg>
            </div>
        </div>
        
        <div class="section">
            <h2><span class="section-icon">🔬</span> Summary Анализ</h2>
            <div class="summary-container">
                ${getSummaryForPerson(person.id)}
            </div>
        </div>
        
        <div class="section">
            <h2><span class="section-icon">📄</span> Полное досье</h2>
            <button class="view-dossier-btn" onclick="openDossier('${person.mdFile}')">
                <span class="btn-icon">🔬</span>
                Сборка-досье
            </button>
        </div>
    `;
    
    // Отрисовка графа связей
    renderPersonGraph(person, connections);
}

// Отрисовка медиа секции
function renderMediaSection(person) {
    if (!person.media || Object.keys(person.media).length === 0) return '';
    
    return `
        <div class="section">
            <h2><span class="section-icon">📱</span> Медиа и образование</h2>
            <div class="media-section">
                ${Object.entries(person.media).map(([key, value]) => {
                    let icon = '📢';
                    let platform = key;
                    
                    if (key === 'telegram') { icon = '📱'; platform = 'Telegram'; }
                    else if (key === 'podcast') { icon = '🎙️'; platform = 'Подкаст'; }
                    else if (key === 'course') { icon = '🎓'; platform = 'Курс'; }
                    else if (key === 'youtube') { icon = '📺'; platform = 'YouTube'; }
                    else if (key === 'subscribers') return '';
                    else if (key === 'students') return '';
                    else if (key === 'rating') return '';
                    
                    let displayValue = value;
                    if (person.media.subscribers && (key === 'telegram' || key === 'podcast')) {
                        displayValue += ` (${person.media.subscribers})`;
                    }
                    if (person.media.students && key === 'course') {
                        displayValue += ` (${person.media.students} студентов)`;
                    }
                    if (person.media.rating && key === 'course') {
                        displayValue += ` - Рейтинг: ${person.media.rating}`;
                    }
                    
                    return `
                        <div class="media-card">
                            <div class="icon">${icon}</div>
                            <div class="platform">${platform}</div>
                            <div class="value">${displayValue}</div>
                        </div>
                    `;
                }).filter(html => html !== '').join('')}
            </div>
        </div>
    `;
}

// Отрисовка инвестиционной секции
function renderInvestmentSection(person) {
    if (!person.investments || person.investments.length === 0) return '';
    
    return `
        <div class="section">
            <h2><span class="section-icon">💰</span> Инвестиционная деятельность</h2>
            <div class="achievement-list">
                ${person.investments.map(inv => {
                    if (inv.fund) {
                        return `
                            <div class="achievement-item">
                                <strong>${inv.fund}</strong>
                                ${inv.aum ? ` - AUM: ${inv.aum}` : ''}
                                ${inv.role ? ` - ${inv.role}` : ''}
                                ${inv.focus ? ` - Фокус: ${inv.focus}` : ''}
                                ${inv.portfolio ? ` - Портфель: ${inv.portfolio}` : ''}
                            </div>
                        `;
                    } else if (inv.round) {
                        return `
                            <div class="achievement-item">
                                <strong>${inv.round}</strong>: ${inv.amount}
                                ${inv.investors ? ` от ${inv.investors.join(', ')}` : ''}
                            </div>
                        `;
                    }
                    return '';
                }).join('')}
            </div>
        </div>
    `;
}

// Получение связей персоны
function getPersonConnections(person) {
    const connections = {
        companies: [],
        investors: [],
        people: [],
        projects: []
    };
    
    // Рабочие связи
    connectionsData.work_connections.forEach(conn => {
        if (conn.from === person.id) {
            const company = companiesData.find(c => c.id === conn.to);
            if (company) {
                connections.companies.push({
                    ...company,
                    relationship: conn.role,
                    period: conn.period,
                    current: conn.current
                });
            }
        }
    });
    
    // Инвестиционные связи
    connectionsData.investment_connections.forEach(conn => {
        if (conn.from === person.id) {
            const investor = investorsData.find(i => i.id === conn.to);
            if (investor) {
                connections.investors.push({
                    ...investor,
                    relationship: conn.role
                });
            }
        }
    });
    
    // Связи с людьми
    connectionsData.people_connections.forEach(conn => {
        if (conn.from === person.id || conn.to === person.id) {
            const otherId = conn.from === person.id ? conn.to : conn.from;
            const otherPerson = personsData.find(p => p.id === otherId);
            if (otherPerson) {
                connections.people.push({
                    ...otherPerson,
                    relationship: conn.context,
                    period: conn.period
                });
            }
        }
    });
    
    return connections;
}

// Расчет статистики персоны
function calculatePersonStats(person, connections) {
    return {
        companies: person.career.length,
        achievements: person.achievements.length,
        connections: connections.companies.length + connections.investors.length + connections.people.length
    };
}

// Отрисовка персонального графа
function renderPersonGraph(person, connections) {
    const width = document.getElementById('personalGraph').clientWidth;
    const height = 400;
    
    // Подготовка данных для графа
    const nodes = [
        {id: person.id, label: person.name, type: 'person', group: 'center'}
    ];
    
    const links = [];
    
    // Добавление компаний
    connections.companies.forEach(company => {
        nodes.push({
            id: company.id,
            label: company.name,
            type: 'company',
            group: 'companies'
        });
        links.push({
            source: person.id,
            target: company.id,
            label: company.relationship,
            current: company.current
        });
    });
    
    // Добавление инвесторов
    connections.investors.forEach(investor => {
        nodes.push({
            id: investor.id,
            label: investor.name,
            type: 'investor',
            group: 'investors'
        });
        links.push({
            source: person.id,
            target: investor.id,
            label: investor.relationship
        });
    });
    
    // Добавление людей
    connections.people.forEach(otherPerson => {
        nodes.push({
            id: otherPerson.id,
            label: otherPerson.name,
            type: 'person',
            group: 'people'
        });
        links.push({
            source: person.id,
            target: otherPerson.id,
            label: otherPerson.relationship
        });
    });
    
    // Создание SVG
    const svg = d3.select('#personalGraph')
        .attr('width', width)
        .attr('height', height);
    
    svg.selectAll('*').remove();
    
    // Создание симуляции
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(30));
    
    // Создание связей
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', d => d.current ? '#4CAF50' : '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => d.current ? 3 : 2);
    
    // Создание узлов
    const node = svg.append('g')
        .selectAll('g')
        .data(nodes)
        .enter().append('g')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));
    
    // Добавление кругов
    node.append('circle')
        .attr('r', d => d.group === 'center' ? 20 : 15)
        .attr('fill', d => {
            if (d.type === 'person') return '#FF6B6B';
            if (d.type === 'company') return '#4ECDC4';
            if (d.type === 'investor') return '#FFA07A';
            return '#999';
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    
    // Добавление меток
    node.append('text')
        .text(d => d.label)
        .attr('x', 0)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#333');
    
    // Обновление позиций
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
    
    // Функции перетаскивания
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// Функция для открытия досье
function openDossier(mdFile) {
    // Используем только встроенный контент из md-content.js
    if (typeof mdContent !== 'undefined' && mdContent[mdFile]) {
        showDossierModal(mdContent[mdFile], mdFile);
    } else {
        console.error('Файл не найден во встроенном контенте:', mdFile);
        alert('Досье недоступно. Контент не загружен.');
    }
}

// Показать модальное окно с досье
function showDossierModal(content, filename) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'dossier-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 26, 0.95);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'dossier-modal-content';
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 100%);
        border: 1px solid #00d4ff;
        border-radius: 12px;
        width: 90%;
        max-width: 800px;
        max-height: 90%;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
    `;
    
    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s;
    `;
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = 'rgba(0, 212, 255, 0.2)';
    });
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = 'none';
    });
    
    // Контент досье
    const dossierContent = document.createElement('div');
    dossierContent.style.cssText = `
        padding: 40px 30px 30px 30px;
        color: #e8e8e8;
        line-height: 1.6;
    `;
    
    // Рендерим markdown
    if (typeof marked !== 'undefined') {
        dossierContent.innerHTML = marked.parse(content);
    } else {
        // Простая обработка markdown если marked.js недоступен
        const htmlContent = content
            .replace(/^# (.*$)/gim, '<h1 style="color: #00d4ff; font-size: 28px; margin-bottom: 20px;">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 style="color: #4fd3ff; font-size: 22px; margin: 25px 0 15px 0;">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 style="color: #7ee8ff; font-size: 18px; margin: 20px 0 10px 0;">$1</h3>')
            .replace(/^\* (.*$)/gim, '<li style="margin: 8px 0;">$1</li>')
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #00d4ff;">$1</strong>')
            .replace(/\n\n/g, '</p><p style="margin: 15px 0;">')
            .replace(/^(.)/gm, '<p style="margin: 15px 0;">$1');
        dossierContent.innerHTML = htmlContent;
    }
    
    // Стилизация содержимого
    const style = document.createElement('style');
    style.textContent = `
        .dossier-modal-content h1 { color: #00d4ff !important; }
        .dossier-modal-content h2 { color: #4fd3ff !important; }
        .dossier-modal-content h3 { color: #7ee8ff !important; }
        .dossier-modal-content strong { color: #00d4ff !important; }
        .dossier-modal-content ul { margin: 15px 0; padding-left: 20px; }
        .dossier-modal-content li { margin: 8px 0; }
        .dossier-modal-content p { margin: 15px 0; }
    `;
    document.head.appendChild(style);
    
    // Закрытие модального окна
    const closeModal = () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    };
    
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    
    // Escape key
    document.addEventListener('keydown', function escKeyHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escKeyHandler);
        }
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(dossierContent);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Получить summary анализ для персоны
function getSummaryForPerson(personId) {
    const summaries = {
        "person_samat": `
            <div class="summary-card">
                <h4>🚀 Ключевые достижения</h4>
                <p>15+ лет создания технологических продуктов от MVP до миллионов пользователей. CTO в ключевых российских проектах: Meduza, RAWG ($2.09M инвестиций), Bookmate ($6.5M инвестиций).</p>
                
                <h4>💡 Уникальная экспертиза</h4>
                <p>Специализация на построении надёжных технических решений для венчурных стартапов. Глубокое понимание архитектуры высоконагруженных систем (FreeBSD, PostgreSQL).</p>
                
                <h4>🎯 Медийное влияние</h4>
                <p>Создатель самого популярного русскоязычного подкаста о технологиях "Запуск завтра" с аудиторией 27K+ подписчиков. Влиятельная фигура в российском стартап-сообществе.</p>
            </div>
        `,
        
        "person_ilya": `
            <div class="summary-card">
                <h4>📊 "Мастер спорта по юнит-экономике"</h4>
                <p>Признанный эксперт по метрикам и росту. За 10+ лет помог более 1000 компаний оптимизировать показатели и найти точки экспоненциального роста.</p>
                
                <h4>🏗️ Портфель компаний</h4>
                <p>CEO rick.ai (сквозная аналитика для e-commerce), Heroes.camp (1000+ выпускников курса Product Heroes), сооснователь Skyeng - крупнейшей российской онлайн-школы английского.</p>
                
                <h4>🎓 Образовательное влияние</h4>
                <p>6 лет методолог ФРИИ, создатель образовательной платформы по продакт-менеджменту. Уникальное сочетание практического опыта и теоретических знаний в области роста продуктов.</p>
            </div>
        `,
        
        "person_denis_p": `
            <div class="summary-card">
                <h4>🎯 Достижение амбициозных целей</h4>
                <p>Поставил и реализовал цель заработать миллиард рублей для Skyeng, поддерживая 3x годовой рост в течение трёх лет. Масштабировал команды с 5 до 30+ человек.</p>
                
                <h4>🔍 OSINT и безопасность</h4>
                <p>CPO в Social Links с 2023 года - компании, специализирующейся на решениях для расследований и анализа данных. Редкое сочетание продуктовых навыков и экспертизы в области безопасности.</p>
                
                <h4>⚡ Лидерские качества</h4>
                <p>Опытный продуктовый лидер с уникальной способностью масштабировать команды и достигать амбициозных бизнес-целей. Эксперт по B2B SaaS продуктам.</p>
            </div>
        `,
        
        "person_anastasia": `
            <div class="summary-card">
                <h4>📰 Медийное влияние</h4>
                <p>Главный редактор Harvard Business Review Russia. Запустила Forbes 30 Under 30 в России, создав экосистему из 50+ предпринимателей и VC, включая миллиардеров.</p>
                
                <h4>💰 Венчурная экспертиза</h4>
                <p>Венчурный партнёр фонда t16e (The Garage Syndicate). Уникальная комбинация медийного влияния и венчурной экспертизы - редкое сочетание в российской экосистеме.</p>
                
                <h4>🌐 Экосистемное мышление</h4>
                <p>Обладает способностью выявлять и объединять ключевых игроков индустрии. Создатель влиятельных сообществ предпринимателей и инвесторов.</p>
            </div>
        `,
        
        "person_anna_p": `
            <div class="summary-card">
                <h4>🤖 AI Product Leadership</h4>
                <p>AI Product Lead в Т-Банке с 2023 года. Входит в топ-5 узнаваемых продакт-менеджеров России. Специализируется на внедрении машинного обучения в финтех-экосистемы.</p>
                
                <h4>📱 Медийная активность</h4>
                <p>Telegram-канал "Продуктовые будни" с 18K+ подписчиков. Организатор конференции "Продукты 24" с 9000+ участников. Влиятельный голос в продуктовом сообществе.</p>
                
                <h4>🏢 Карьерный путь</h4>
                <p>Прошла путь от Product Manager в Mobile Dimension до Senior PM в Avito и AI Product Lead в Т-Банке. Эксперт по внедрению AI в крупные продукты.</p>
            </div>
        `,
        
        "person_evgeny": `
            <div class="summary-card">
                <h4>🏗️ Server-Driven UI эксперт</h4>
                <p>Director of Engineering в Flo Health Inc. с 2020 года. Глубокая экспертиза в области серверно-управляемой архитектуры и платформенного инжиниринга.</p>
                
                <h4>🤖 AI Content Studio</h4>
                <p>Возглавляет разработку AI Content Studio - продукта, создающего персонализированный health content с удвоенной медицинской точностью по сравнению со стандартными LLM.</p>
                
                <h4>📱 Мобильные технологии</h4>
                <p>Эксперт по мобильной разработке и архитектуре высоконагруженных систем. Уникальное сочетание технического лидерства и понимания продуктовых задач в healthtech.</p>
            </div>
        `,
        
        "person_egor": `
            <div class="summary-card">
                <h4>🚀 Ребрендинг Miro</h4>
                <p>Ключевая фигура ребрендинга RealtimeBoard в Miro, обеспечив рост с 2.5 до 25+ млн пользователей за 2 года. Один из самых успешных ребрендингов в истории B2B SaaS.</p>
                
                <h4>💼 Венчурное партнёрство</h4>
                <p>Соосновитель и генеральный партнер Superabundance (2024), венчурный партнёр Altair Capital. Уникальный опыт масштабирования технологических компаний.</p>
                
                <h4>🎯 Продуктовая стратегия</h4>
                <p>Эксперт по продуктовой стратегии с фокусом на AI решения. Сочетает операционный опыт в крупных компаниях с венчурной экспертизой.</p>
            </div>
        `,
        
        "person_valeria": `
            <div class="summary-card">
                <h4>🌍 Международный масштаб</h4>
                <p>CEO Emex Group - международного лидера в сфере поставок автозапчастей, работающего в 40+ странах с оборотом 18 млрд рублей и штатом 1000+ сотрудников.</p>
                
                <h4>📚 Образовательные проекты</h4>
                <p>Основатель Wannabe (10,000+ студентов из 50+ стран) и Typical (sustainable fashion). Уникальное сочетание корпоративного лидерства и предпринимательского опыта.</p>
                
                <h4>💡 Международная экспертиза</h4>
                <p>Редкий опыт управления международным бизнесом в сфере e-commerce и образования. Понимание как корпоративных процессов, так и стартап-экосистемы.</p>
            </div>
        `,
        
        "person_anna_b": `
            <div class="summary-card">
                <h4>🤖 AI/ML в карьерном развитии</h4>
                <p>CEO и сооснователь Meander (привлёк $5.75M инвестиций). Уникальная специализация на применении AI в сфере карьерного развития и mentorship.</p>
                
                <h4>📱 Медийное влияние</h4>
                <p>Telegram-канал ProProduct с 38K+ подписчиков - один из крупнейших русскоязычных каналов о продуктовом менеджменте. Влиятельный голос в продуктовом сообществе.</p>
                
                <h4>🏢 Международный опыт</h4>
                <p>Работала Product Lead в Meta, Product Manager в Intercom. Сочетает опыт работы в крупных технологических компаниях с предпринимательским опытом.</p>
            </div>
        `,
        
        "person_denis_s": `
            <div class="summary-card">
                <h4>🎬 Вирусные проекты</h4>
                <p>Создатель вирусной реставрации фильма "Люмьер" с 100M+ просмотров. Group PM в JetBrains и CEO neural.love - уникальное сочетание массовых и B2B продуктов.</p>
                
                <h4>📱 Медийная активность</h4>
                <p>Telegram-канал @denissexy с 110K+ подписчиков - один из крупнейших каналов о технологиях и продуктах. Влиятельная фигура в tech-сообществе.</p>
                
                <h4>🔬 Computer Vision + GenAI</h4>
                <p>Глубокая экспертиза в области компьютерного зрения, нейронных сетей и генеративного AI. Редкое сочетание технической экспертизы и продуктового мышления.</p>
            </div>
        `,
        
        "person_konstantin": `
            <div class="summary-card">
                <h4>🤖 AI в рекрутинге</h4>
                <p>CEO и сооснователь HireHire - AI-платформы для рекрутинга. Уникальная экспертиза на стыке HR Tech, AI и дизайна. Международный опыт работы (Ирландия).</p>
                
                <h4>🎨 Дизайн-лидерство</h4>
                <p>Design Lead в Яндексе (2009-2016), Design Manager в Intercom. Редкое сочетание дизайнерских навыков и предпринимательского опыта в AI.</p>
                
                <h4>✍️ Типографическая экспертиза</h4>
                <p>Эксперт в области типографики и пользовательского опыта. Способность создавать продукты с исключительным UX на основе AI технологий.</p>
            </div>
        `,
        
        "person_natalia": `
            <div class="summary-card">
                <h4>💰 Венчурный и операционный опыт</h4>
                <p>CEO Aurora AI и Venture Partner RTP Global. Успешный exit: продажа Edadil Яндексу за 233M рублей. Уникальное сочетание венчурной и операционной экспертизы.</p>
                
                <h4>🛒 Consumer AI products</h4>
                <p>Специализация на потребительских AI продуктах. Опыт создания массовых продуктов (Edadil) и внедрения AI решений в consumer segment.</p>
                
                <h4>🌍 Международная перспектива</h4>
                <p>Работает из США, Venture Partner в RTP Global - международном фонде. Понимание как российского, так и международного рынков AI и венчурных инвестиций.</p>
            </div>
        `,
        
        "person_ivan": `
            <div class="summary-card">
                <h4>📚 JTBD методология</h4>
                <p>Основатель Focus и курса "Как делать продукт" (9000+ студентов). Продвинутый эксперт по Jobs To Be Done методологии - редкая глубокая экспертиза в России.</p>
                
                <h4>🎓 Образовательное влияние</h4>
                <p>Один из ведущих российских экспертов по продуктовому менеджменту в сфере образования. Сочетает теоретические знания с практическим опытом в Яндексе.</p>
                
                <h4>🚀 SaaS и рост</h4>
                <p>Эксперт по развитию SaaS продуктов и образовательных платформ. Глубокое понимание пользовательских потребностей и методологий их исследования.</p>
            </div>
        `,
        
        "person_anna_p_duplicate": `
            <div class="summary-card">
                <h4>🤖 Расширенная AI экспертиза</h4>
                <p>Дополнительная информация о работе с AI-ассистентами в Т-Банке. Управляет разработкой AI решений для внутренних и внешних use-кейсов банка.</p>
                
                <h4>📈 Продуктовые метрики</h4>
                <p>Глубокая экспертиза в области продуктовых метрик и аналитики. Успешное внедрение AI/ML решений для улучшения пользовательского опыта в финтехе.</p>
                
                <h4>🎯 Стратегическое мышление</h4>
                <p>Способность видеть долгосрочную перспективу развития AI продуктов в финансовой сфере. Лидер мнений в области AI Product Management.</p>
            </div>
        `
    };
    
    return summaries[personId] || `
        <div class="summary-card">
            <p>Summary анализ для данного члена жюри находится в разработке.</p>
        </div>
    `;
}