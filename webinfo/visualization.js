// Категории и их цвета
const categoryColors = {
    "технологии": "#FF6B6B",
    "продуктовая стратегия": "#4ECDC4",
    "продуктовое лидерство": "#45B7D1",
    "медиа и венчурные инвестиции": "#FFA07A",
    "AI и финтех": "#98D8C8",
    "технологическое лидерство": "#F7DC6F",
    "венчурный капитал": "#BB8FCE",
    "корпоративное лидерство": "#85C1E2",
    "AI и карьерное развитие": "#F8B739",
    "AI и компьютерное зрение": "#52C7B8",
    "HR-технологии": "#F1948A",
    "AI и венчурные инвестиции": "#82E0AA",
    "образование и продуктовый менеджмент": "#D7BDE2"
};

// Инициализация переменных
let currentFilter = 'all';
let searchTerm = '';
let simulation;
let nodes = [];
let filteredData = juryData;

// Получение уникальных категорий
const categories = [...new Set(juryData.map(d => d.category))];

// Создание кнопок фильтров
function createFilters() {
    const filtersContainer = document.getElementById('filters');
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-category', category);
        btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        btn.onclick = () => filterByCategory(category);
        filtersContainer.appendChild(btn);
    });
}

// Фильтрация по категории
function filterByCategory(category) {
    currentFilter = category;
    
    // Обновление активной кнопки
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    updateVisualization();
}

// Поиск
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase();
    updateVisualization();
});

// Обновление визуализации
function updateVisualization() {
    // Фильтрация данных
    filteredData = juryData.filter(d => {
        const matchesCategory = currentFilter === 'all' || d.category === currentFilter;
        const matchesSearch = searchTerm === '' || 
            d.name.toLowerCase().includes(searchTerm) ||
            d.company.toLowerCase().includes(searchTerm) ||
            d.position.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    // Перерисовка визуализации
    drawVisualization();
}

// Основная функция визуализации
function drawVisualization() {
    const svg = d3.select('#visualization');
    svg.selectAll('*').remove();
    
    const width = svg.node().getBoundingClientRect().width;
    const height = 600;
    
    // Создание контейнера
    const g = svg.append('g');
    
    // Создание симуляции
    simulation = d3.forceSimulation(filteredData)
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => getNodeSize(d) + 10));
    
    // Создание узлов
    const nodeGroups = g.selectAll('.node')
        .data(filteredData)
        .enter().append('g')
        .attr('class', 'node')
        .style('cursor', 'pointer')
        .on('click', showDetail)
        .on('mouseover', showTooltip)
        .on('mouseout', hideTooltip)
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));
    
    // Добавление кругов
    nodeGroups.append('circle')
        .attr('r', d => getNodeSize(d))
        .attr('fill', d => categoryColors[d.category] || '#999')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .style('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.16))');
    
    // Добавление текста (имя)
    nodeGroups.append('text')
        .attr('class', 'node-label')
        .attr('dy', 0)
        .text(d => {
            const names = d.name.split(' ');
            return names[0];
        })
        .style('font-size', '14px')
        .style('font-weight', 'bold');
    
    // Добавление текста (фамилия)
    nodeGroups.append('text')
        .attr('class', 'node-label')
        .attr('dy', 15)
        .text(d => {
            const names = d.name.split(' ');
            return names.slice(1).join(' ');
        })
        .style('font-size', '12px');
    
    // Обновление позиций при симуляции
    simulation.on('tick', () => {
        nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
    });
    
    // Zoom functionality
    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });
    
    svg.call(zoom);
}

// Определение размера узла на основе достижений
function getNodeSize(d) {
    const baseSize = 40;
    const achievementBonus = d.key_achievements.length * 5;
    return baseSize + achievementBonus;
}

// Функции drag
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

// Показать подсказку
function showTooltip(event, d) {
    const tooltip = document.getElementById('tooltip');
    
    const achievementsList = d.key_achievements.map(a => `<li>${a}</li>`).join('');
    
    tooltip.innerHTML = `
        <h3>${d.name}</h3>
        <div class="position">${d.position}</div>
        <div class="company">${d.company}</div>
        <div class="description">${d.brief_description}</div>
        <div class="achievements">
            <h4>Ключевые достижения:</h4>
            <ul>${achievementsList}</ul>
        </div>
    `;
    
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
    tooltip.classList.add('show');
}

// Скрыть подсказку
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Показать детальную панель
function showDetail(event, d) {
    event.stopPropagation();
    
    const panel = document.getElementById('detailPanel');
    const content = document.getElementById('detailContent');
    
    const achievementsList = d.key_achievements.map(a => `<li>${a}</li>`).join('');
    
    content.innerHTML = `
        <h2>${d.name}</h2>
        <div class="detail-position">${d.position}</div>
        <div class="detail-company">${d.company}</div>
        <div class="detail-category">${d.category}</div>
        <div class="detail-description">${d.brief_description}</div>
        <div class="detail-achievements">
            <h3>Ключевые достижения</h3>
            <ul>${achievementsList}</ul>
        </div>
    `;
    
    panel.classList.add('show');
}

// Закрыть детальную панель
function closeDetailPanel() {
    const panel = document.getElementById('detailPanel');
    panel.classList.remove('show');
}

// Закрытие панели при клике вне её
document.addEventListener('click', (e) => {
    if (!e.target.closest('.detail-panel') && !e.target.closest('.node')) {
        closeDetailPanel();
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createFilters();
    drawVisualization();
});

// Адаптивность при изменении размера окна
window.addEventListener('resize', () => {
    drawVisualization();
});