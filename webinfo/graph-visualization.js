// Настройки визуализации
const config = {
    nodeColors: {
        person: '#FF6B6B',
        company: '#4ECDC4',
        investor: '#FFA07A',
        skill: '#98D8C8',
        project: '#BB8FCE',
        education: '#F7DC6F',
        event: '#F1948A'
    },
    linkColors: {
        works_at: '#4ECDC4',
        worked_at: '#4ECDC4',
        co_founded: '#FF6B6B',
        funded_by: '#FFA07A',
        acquired_by: '#FF6B6B',
        has_skill: '#98D8C8',
        specializes_in: '#98D8C8',
        created: '#BB8FCE',
        founded: '#BB8FCE',
        collaborated: '#BB8FCE',
        connected: '#BB8FCE',
        partner: '#FFA07A'
    },
    nodeSize: {
        person: 12,
        company: 10,
        investor: 10,
        skill: 6,
        project: 8,
        education: 6,
        event: 8
    }
};

// Глобальные переменные
let simulation;
let svg, g;
let link, node, linkLabel, nodeLabel;
let currentZoom = 1;
let selectedNode = null;
let filteredNodes = new Set();
let filteredLinks = new Set();

// Инициализация
function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Создание SVG
    svg = d3.select('#graph')
        .attr('width', width)
        .attr('height', height);

    // Добавление градиентов для связей
    const defs = svg.append('defs');
    
    // Создание градиентов для каждого типа связи
    Object.keys(config.linkColors).forEach(type => {
        const gradient = defs.append('linearGradient')
            .attr('id', `gradient-${type}`)
            .attr('gradientUnits', 'userSpaceOnUse');
        
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', config.linkColors[type])
            .attr('stop-opacity', 0.3);
        
        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', config.linkColors[type])
            .attr('stop-opacity', 0.8);
    });

    // Создание группы для масштабирования
    g = svg.append('g');

    // Создание симуляции
    simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => getNodeRadius(d) + 5));

    // Zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
            currentZoom = event.transform.k;
        });

    svg.call(zoom);

    // Инициализация данных
    updateGraph();
    
    // Обновление статистики
    updateStats();

    // Обработчики событий
    setupEventHandlers();
}

// Получение радиуса узла
function getNodeRadius(d) {
    return config.nodeSize[d.type] || 8;
}

// Обновление графа
function updateGraph() {
    // Фильтрация данных
    const filteredData = filterData();
    
    // Обновление связей
    link = g.selectAll('.link')
        .data(filteredData.links, d => `${d.source.id || d.source}-${d.target.id || d.target}`);
    
    link.exit().remove();
    
    const linkEnter = link.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', d => config.linkColors[d.type] || '#666')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-dasharray', d => d.type === 'collaborated' || d.type === 'connected' ? '5,5' : null);
    
    link = linkEnter.merge(link);

    // Обновление меток связей
    linkLabel = g.selectAll('.link-label')
        .data(filteredData.links.filter(d => d.label), d => `${d.source.id || d.source}-${d.target.id || d.target}`);
    
    linkLabel.exit().remove();
    
    const linkLabelEnter = linkLabel.enter()
        .append('text')
        .attr('class', 'link-label')
        .text(d => d.label);
    
    linkLabel = linkLabelEnter.merge(linkLabel);

    // Обновление узлов
    node = g.selectAll('.node')
        .data(filteredData.nodes, d => d.id);
    
    node.exit().remove();
    
    const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));
    
    // Добавление кругов для узлов
    nodeEnter.append('circle')
        .attr('r', d => getNodeRadius(d))
        .attr('fill', d => config.nodeColors[d.type] || '#999')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 0 3px rgba(0,0,0,0.5))');
    
    // Добавление иконок для типов узлов
    nodeEnter.append('text')
        .attr('class', 'node-icon')
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('font-size', '10px')
        .attr('fill', 'white')
        .text(d => getNodeIcon(d));
    
    node = nodeEnter.merge(node);

    // Обновление меток узлов
    nodeLabel = g.selectAll('.node-label')
        .data(filteredData.nodes, d => d.id);
    
    nodeLabel.exit().remove();
    
    const nodeLabelEnter = nodeLabel.enter()
        .append('text')
        .attr('class', 'node-label')
        .attr('dy', -15)
        .text(d => d.label);
    
    nodeLabel = nodeLabelEnter.merge(nodeLabel);

    // Обработчики событий для узлов
    node
        .on('click', handleNodeClick)
        .on('mouseover', handleNodeHover)
        .on('mouseout', handleNodeOut);

    // Обновление симуляции
    simulation.nodes(filteredData.nodes);
    simulation.force('link').links(filteredData.links);
    simulation.alpha(0.3).restart();

    // Обновление позиций при симуляции
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        linkLabel
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2);
        
        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
        
        nodeLabel
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
}

// Получение иконки для типа узла
function getNodeIcon(d) {
    const icons = {
        person: '👤',
        company: '🏢',
        investor: '💰',
        skill: '⚡',
        project: '📁',
        education: '🎓',
        event: '📅'
    };
    return icons[d.type] || '•';
}

// Фильтрация данных
function filterData() {
    const nodeTypeFilters = {
        person: document.getElementById('filter-person').checked,
        company: document.getElementById('filter-company').checked,
        investor: document.getElementById('filter-investor').checked,
        skill: document.getElementById('filter-skill').checked,
        project: document.getElementById('filter-project').checked
    };

    const linkTypeFilters = {
        works: document.getElementById('filter-works').checked,
        funding: document.getElementById('filter-funding').checked,
        skills: document.getElementById('filter-skills').checked,
        collab: document.getElementById('filter-collab').checked
    };

    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

    // Фильтрация узлов
    const filteredNodes = graphData.nodes.filter(node => {
        // Фильтр по типу
        if (!nodeTypeFilters[node.type]) return false;
        
        // Фильтр по поиску
        if (searchTerm && !node.label.toLowerCase().includes(searchTerm)) {
            // Проверка деталей
            if (node.details) {
                const detailsStr = JSON.stringify(node.details).toLowerCase();
                if (!detailsStr.includes(searchTerm)) return false;
            } else {
                return false;
            }
        }
        
        return true;
    });

    const nodeIds = new Set(filteredNodes.map(n => n.id));

    // Фильтрация связей
    const filteredLinks = graphData.links.filter(link => {
        // Проверка наличия узлов
        const sourceId = link.source.id || link.source;
        const targetId = link.target.id || link.target;
        
        if (!nodeIds.has(sourceId) || !nodeIds.has(targetId)) return false;
        
        // Фильтр по типу связи
        const linkCategory = getLinkCategory(link.type);
        if (!linkTypeFilters[linkCategory]) return false;
        
        return true;
    });

    return {
        nodes: filteredNodes,
        links: filteredLinks
    };
}

// Получение категории связи
function getLinkCategory(type) {
    const categories = {
        works_at: 'works',
        worked_at: 'works',
        co_founded: 'works',
        funded_by: 'funding',
        acquired_by: 'funding',
        partner: 'funding',
        has_skill: 'skills',
        specializes_in: 'skills',
        created: 'collab',
        founded: 'collab',
        collaborated: 'collab',
        connected: 'collab'
    };
    return categories[type] || 'collab';
}

// Обработчики drag
function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Обработчик клика по узлу
function handleNodeClick(event, d) {
    event.stopPropagation();
    selectedNode = d;
    showInfoPanel(d);
    highlightConnections(d);
}

// Подсветка связей узла
function highlightConnections(node) {
    // Сброс подсветки
    g.selectAll('.node').classed('highlighted', false);
    g.selectAll('.link').style('stroke-opacity', 0.1);
    
    // Подсветка выбранного узла
    g.selectAll('.node')
        .filter(d => d.id === node.id)
        .classed('highlighted', true);
    
    // Подсветка связанных узлов и связей
    const connectedNodes = new Set();
    
    g.selectAll('.link')
        .style('stroke-opacity', d => {
            const sourceId = d.source.id || d.source;
            const targetId = d.target.id || d.target;
            
            if (sourceId === node.id || targetId === node.id) {
                connectedNodes.add(sourceId);
                connectedNodes.add(targetId);
                return 0.8;
            }
            return 0.1;
        })
        .style('stroke-width', d => {
            const sourceId = d.source.id || d.source;
            const targetId = d.target.id || d.target;
            
            if (sourceId === node.id || targetId === node.id) {
                return 3;
            }
            return 1.5;
        });
    
    g.selectAll('.node')
        .style('opacity', d => connectedNodes.has(d.id) ? 1 : 0.3);
}

// Обработчик наведения на узел
function handleNodeHover(event, d) {
    const tooltip = document.getElementById('tooltip');
    
    let content = `<strong>${d.label}</strong><br/>`;
    content += `<span style="color: #aaa">Тип: ${getNodeTypeName(d.type)}</span>`;
    
    if (d.details) {
        Object.keys(d.details).forEach(key => {
            content += `<br/><span style="color: #4ECDC4">${key}:</span> ${d.details[key]}`;
        });
    }
    
    tooltip.innerHTML = content;
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY + 10) + 'px';
    tooltip.classList.add('show');
}

// Обработчик ухода с узла
function handleNodeOut() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Получение названия типа узла
function getNodeTypeName(type) {
    const names = {
        person: 'Человек',
        company: 'Компания',
        investor: 'Инвестор',
        skill: 'Навык',
        project: 'Проект',
        education: 'Образование',
        event: 'Событие'
    };
    return names[type] || type;
}

// Показ информационной панели
function showInfoPanel(node) {
    const panel = document.getElementById('infoPanel');
    const content = document.getElementById('infoContent');
    
    let html = `
        <h2>${node.label}</h2>
        <span class="type-badge">${getNodeTypeName(node.type)}</span>
    `;
    
    if (node.details) {
        html += '<div class="details">';
        Object.keys(node.details).forEach(key => {
            html += `<p><strong>${key}:</strong> ${node.details[key]}</p>`;
        });
        html += '</div>';
    }
    
    // Поиск связей
    const connections = findNodeConnections(node);
    
    if (connections.length > 0) {
        html += '<div class="connections">';
        html += '<h3>Связи</h3>';
        
        connections.forEach(conn => {
            html += `
                <div class="connection-item" onclick="focusNode('${conn.node.id}')">
                    <strong>${conn.node.label}</strong><br/>
                    <span style="color: #aaa">${conn.relationship}</span>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    content.innerHTML = html;
    panel.classList.add('show');
}

// Поиск связей узла
function findNodeConnections(node) {
    const connections = [];
    
    graphData.links.forEach(link => {
        const sourceId = link.source.id || link.source;
        const targetId = link.target.id || link.target;
        
        if (sourceId === node.id) {
            const targetNode = graphData.nodes.find(n => n.id === targetId);
            if (targetNode) {
                connections.push({
                    node: targetNode,
                    relationship: link.label || link.type
                });
            }
        } else if (targetId === node.id) {
            const sourceNode = graphData.nodes.find(n => n.id === sourceId);
            if (sourceNode) {
                connections.push({
                    node: sourceNode,
                    relationship: link.label || link.type
                });
            }
        }
    });
    
    return connections;
}

// Фокус на узле
function focusNode(nodeId) {
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (node) {
        handleNodeClick({stopPropagation: () => {}}, node);
        
        // Центрирование на узле
        const transform = d3.zoomIdentity
            .translate(window.innerWidth / 2 - node.x * currentZoom, window.innerHeight / 2 - node.y * currentZoom)
            .scale(currentZoom);
        
        svg.transition()
            .duration(750)
            .call(d3.zoom().transform, transform);
    }
}

// Закрытие информационной панели
function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    panel.classList.remove('show');
    
    // Сброс подсветки
    g.selectAll('.node').classed('highlighted', false).style('opacity', 1);
    g.selectAll('.link').style('stroke-opacity', 0.6).style('stroke-width', 1.5);
}

// Обновление статистики
function updateStats() {
    const filteredData = filterData();
    
    document.getElementById('nodeCount').textContent = filteredData.nodes.length;
    document.getElementById('linkCount').textContent = filteredData.links.length;
    document.getElementById('companyCount').textContent = filteredData.nodes.filter(n => n.type === 'company').length;
    document.getElementById('personCount').textContent = filteredData.nodes.filter(n => n.type === 'person').length;
}

// Настройка обработчиков событий
function setupEventHandlers() {
    // Фильтры типов узлов
    document.querySelectorAll('#nodeTypeFilters input').forEach(input => {
        input.addEventListener('change', () => {
            updateGraph();
            updateStats();
        });
    });
    
    // Фильтры типов связей
    document.querySelectorAll('#linkTypeFilters input').forEach(input => {
        input.addEventListener('change', () => {
            updateGraph();
            updateStats();
        });
    });
    
    // Поиск
    document.getElementById('searchBox').addEventListener('input', () => {
        updateGraph();
        updateStats();
    });
    
    // Клик по пустому месту
    svg.on('click', () => {
        closeInfoPanel();
    });
}

// Функции управления масштабом
function zoomIn() {
    svg.transition().call(
        d3.zoom().scaleBy,
        1.3
    );
}

function zoomOut() {
    svg.transition().call(
        d3.zoom().scaleBy,
        0.7
    );
}

function resetZoom() {
    svg.transition()
        .duration(750)
        .call(
            d3.zoom().transform,
            d3.zoomIdentity
        );
}

// Адаптивность
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    svg.attr('width', width).attr('height', height);
    simulation.force('center', d3.forceCenter(width / 2, height / 2));
    simulation.alpha(0.3).restart();
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', init);