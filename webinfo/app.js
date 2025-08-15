// Hi-Tech Visualization App
// Color scheme - улучшенные яркие цвета
const colors = {
    node: {
        person: '#ff4757',      // Яркий красный
        company: '#00d2d3',     // Яркий циан
        investor: '#5352ed',    // Яркий синий
        skill: '#ff6348',       // Оранжевый
        project: '#7bed9f',     // Зеленый
        education: '#ffa502',   // Янтарный
        event: '#ff7675'        // Розовый
    },
    link: {
        works_at: '#00d2d3',
        worked_at: '#0984e3',
        funded_by: '#6c5ce7',
        has_skill: '#fd79a8',
        created: '#00b894',
        collaborated: '#fdcb6e'
    }
};

// Global variables
let activeTab = 'graph';
let graphSimulation = null;
let selectedPerson = null;
let svg, g;
let currentZoom = d3.zoomIdentity;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeGraph();
    initializePersonalities();
    updateStats();
});

// Tab switching
function switchTab(tab) {
    activeTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tab === 'graph') {
        document.getElementById('graph-view').classList.add('active');
        if (!graphSimulation) {
            initializeGraph();
        }
    } else if (tab === 'personalities') {
        document.getElementById('personalities-view').classList.add('active');
        renderPersonList();
    }
}

// Graph Initialization
function initializeGraph() {
    const width = window.innerWidth;
    const height = window.innerHeight - 70;
    
    svg = d3.select('#graph-svg')
        .attr('width', width)
        .attr('height', height);
    
    // Clear existing
    svg.selectAll('*').remove();
    
    // Add gradients
    const defs = svg.append('defs');
    
    // Glow filter
    const filter = defs.append('filter')
        .attr('id', 'glow');
    
    filter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
        .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic');
    
    // Main group
    g = svg.append('g');
    
    // Zoom
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
            currentZoom = event.transform;
        });
    
    svg.call(zoom);
    
    // Клик по фону для сброса выделения
    svg.on('click', () => {
        if (g) {
            g.selectAll('.node circle')
                .style('opacity', 1)
                .style('filter', 'url(#glow)')
                .style('stroke', '#0a0e1a')
                .style('stroke-width', 2);
            
            g.selectAll('.link')
                .style('stroke-opacity', 0.6)
                .style('stroke-width', 1.5)
                .style('stroke', d => colors.link[d.type] || '#2a3244');
        }
    });
    
    // Create simulation
    graphSimulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(80))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(30));
    
    // Load and render data
    renderGraph();
    
    // Setup filters
    setupGraphFilters();
}

// Render graph
function renderGraph() {
    const filteredData = filterGraphData();
    
    // Links
    const linkSelection = g.selectAll('.link')
        .data(filteredData.links, d => `${d.source.id || d.source}-${d.target.id || d.target}`);
    
    linkSelection.exit().remove();
    
    const linkEnter = linkSelection.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', d => colors.link[d.type] || '#2a3244')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.6);
    
    // Nodes
    const nodeSelection = g.selectAll('.node')
        .data(filteredData.nodes, d => d.id);
    
    nodeSelection.exit().remove();
    
    const nodeEnter = nodeSelection.enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));
    
    // Node circles
    nodeEnter.append('circle')
        .attr('r', d => d.type === 'person' ? 15 : 10)
        .attr('fill', d => colors.node[d.type] || '#64748b')
        .attr('stroke', '#0a0e1a')
        .attr('stroke-width', 2)
        .style('filter', 'url(#glow)')
        .style('cursor', 'pointer');
    
    // Node labels
    nodeEnter.append('text')
        .attr('dy', -20)
        .attr('text-anchor', 'middle')
        .style('fill', '#a8b2d1')
        .style('font-size', '11px')
        .style('pointer-events', 'none')
        .text(d => d.label);
    
    // Events
    nodeEnter
        .on('click', handleNodeClick)
        .on('mouseover', handleNodeHover)
        .on('mouseout', handleNodeOut);
    
    // Обновление ссылок на узлы
    const allNodes = nodeEnter.merge(nodeSelection);
    
    // Update simulation
    graphSimulation.nodes(filteredData.nodes);
    graphSimulation.force('link').links(filteredData.links);
    graphSimulation.alpha(0.3).restart();
    
    // Tick
    graphSimulation.on('tick', () => {
        linkEnter
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        allNodes
            .attr('transform', d => `translate(${d.x},${d.y})`);
    });
    
    updateStats();
}

// Filter graph data
function filterGraphData() {
    const filters = {
        person: document.getElementById('filter-person').checked,
        company: document.getElementById('filter-company').checked,
        investor: document.getElementById('filter-investor').checked,
        skill: document.getElementById('filter-skill').checked
    };
    
    const searchTerm = document.getElementById('graphSearch').value.toLowerCase();
    
    const filteredNodes = graphData.nodes.filter(node => {
        if (!filters[node.type]) return false;
        if (searchTerm && !node.label.toLowerCase().includes(searchTerm)) return false;
        return true;
    });
    
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    
    const filteredLinks = graphData.links.filter(link => {
        const sourceId = link.source.id || link.source;
        const targetId = link.target.id || link.target;
        return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });
    
    return { nodes: filteredNodes, links: filteredLinks };
}

// Setup graph filters
function setupGraphFilters() {
    document.querySelectorAll('#graph-view input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', renderGraph);
    });
    
    document.getElementById('graphSearch').addEventListener('input', renderGraph);
}

// Node interactions
function handleNodeClick(event, d) {
    event.stopPropagation();
    
    // Скрыть левую панель и показать только правую
    const leftPanel = document.getElementById('infoPanel');
    if (leftPanel) {
        leftPanel.classList.remove('show');
    }
    
    highlightConnections(d);
    
    // Показать детальную информацию о связях справа
    showDetailedConnections(d);
}

// Подсветка связей узла
function highlightConnections(node) {
    // Сброс подсветки
    g.selectAll('.node circle')
        .style('opacity', 0.3)
        .style('filter', null);
    
    g.selectAll('.link')
        .style('stroke-opacity', 0.1)
        .style('stroke-width', 1.5);
    
    // Подсветка выбранного узла
    g.selectAll('.node')
        .filter(n => n.id === node.id)
        .select('circle')
        .style('opacity', 1)
        .style('filter', 'url(#glow)')
        .style('stroke', '#00d4ff')
        .style('stroke-width', 3);
    
    // Подсветка связанных узлов и связей
    const connectedNodes = new Set();
    
    g.selectAll('.link')
        .style('stroke-opacity', function(d) {
            const sourceId = d.source.id || d.source;
            const targetId = d.target.id || d.target;
            
            if (sourceId === node.id || targetId === node.id) {
                connectedNodes.add(sourceId);
                connectedNodes.add(targetId);
                return 0.8;
            }
            return 0.1;
        })
        .style('stroke-width', function(d) {
            const sourceId = d.source.id || d.source;
            const targetId = d.target.id || d.target;
            
            if (sourceId === node.id || targetId === node.id) {
                return 3;
            }
            return 1.5;
        })
        .style('stroke', function(d) {
            const sourceId = d.source.id || d.source;
            const targetId = d.target.id || d.target;
            
            if (sourceId === node.id || targetId === node.id) {
                return '#00d4ff';
            }
            return colors.link[d.type] || '#2a3244';
        });
    
    g.selectAll('.node')
        .filter(n => connectedNodes.has(n.id))
        .select('circle')
        .style('opacity', 1)
        .style('filter', 'url(#glow)');
}

function handleNodeHover(event, d) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `<strong>${d.label}</strong><br>Type: ${d.type}`;
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY + 10) + 'px';
    tooltip.classList.add('show');
}

function handleNodeOut() {
    document.getElementById('tooltip').classList.remove('show');
}

// Drag functions
function dragStarted(event, d) {
    if (!event.active) graphSimulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (!event.active) graphSimulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Info panel
function showInfoPanel(node) {
    const panel = document.getElementById('infoPanel');
    const title = document.getElementById('infoPanelTitle');
    const content = document.getElementById('infoPanelContent');
    
    title.innerHTML = `<h2 style="color: #00d4ff; margin: 0;">${node.label}</h2>`;
    
    let html = `<div style="color: #a8b2d1;">`;
    html += `<p><strong>Type:</strong> ${node.type}</p>`;
    
    if (node.details) {
        Object.entries(node.details).forEach(([key, value]) => {
            html += `<p><strong>${key}:</strong> ${value}</p>`;
        });
    }
    
    html += `</div>`;
    content.innerHTML = html;
    
    panel.classList.add('show');
}

// Показать детальную информацию о связях
function showDetailedConnections(node) {
    const rightPanel = document.getElementById('rightPanel') || createRightPanel();
    
    // Найти все связи с выбранным узлом
    const connectedLinks = graphData.links.filter(link => {
        const sourceId = link.source.id || link.source;
        const targetId = link.target.id || link.target;
        return sourceId === node.id || targetId === node.id;
    });
    
    // Группировать связи по типам
    const connectionsByType = {};
    connectedLinks.forEach(link => {
        const type = link.type || 'unknown';
        if (!connectionsByType[type]) {
            connectionsByType[type] = [];
        }
        
        const sourceId = link.source.id || link.source;
        const targetId = link.target.id || link.target;
        const connectedNodeId = sourceId === node.id ? targetId : sourceId;
        const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
        
        if (connectedNode) {
            connectionsByType[type].push({
                node: connectedNode,
                link: link,
                direction: sourceId === node.id ? 'outgoing' : 'incoming'
            });
        }
    });
    
    // Создать HTML для отображения основной информации узла и связей
    let html = `
        <div style="padding: 20px; color: #e8e8e8;">
            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 212, 255, 0.3);">
                <h2 style="color: #00d4ff; margin: 0 0 10px 0;">${node.label}</h2>
                <p style="color: #a8b2d1; margin: 0;"><strong>Type:</strong> ${node.type}</p>
    `;
    
    // Добавить детали узла если есть
    if (node.details) {
        Object.entries(node.details).forEach(([key, value]) => {
            html += `<p style="color: #a8b2d1; margin: 5px 0;"><strong>${key}:</strong> ${value}</p>`;
        });
    }
    
    html += `</div>`;
    
    // Добавить связи
    if (Object.keys(connectionsByType).length === 0) {
        html += `<p style="color: #a8b2d1;">Нет связей для отображения</p>`;
    } else {
        html += `<h3 style="color: #00d4ff; margin-bottom: 20px;">Связи узла</h3>`;
        
        Object.entries(connectionsByType).forEach(([type, connections]) => {
            const typeColor = colors.link[type] || '#a8b2d1';
            
            html += `
                <div style="margin-bottom: 25px;">
                    <h4 style="color: ${typeColor}; margin-bottom: 12px; font-size: 16px;">
                        ${type.replace(/_/g, ' ').toUpperCase()} (${connections.length})
                    </h4>
                    <div style="margin-left: 15px;">
            `;
            
            connections.forEach(conn => {
                const nodeColor = colors.node[conn.node.type] || '#a8b2d1';
                const direction = conn.direction === 'outgoing' ? '→' : '←';
                
                html += `
                    <div style="
                        margin-bottom: 12px; 
                        padding: 12px; 
                        background: rgba(255,255,255,0.05); 
                        border-radius: 8px;
                        border-left: 3px solid ${nodeColor};
                        cursor: pointer;
                    " onclick="focusOnNode('${conn.node.id}')">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="color: ${typeColor}; font-size: 14px;">${direction}</span>
                            <span style="color: ${nodeColor}; font-weight: bold;">${conn.node.label}</span>
                        </div>
                        <div style="font-size: 12px; color: #a8b2d1; margin-top: 4px;">
                            ${conn.node.type} • ${conn.link.strength || 'standard'} связь
                        </div>
                        ${conn.link.description ? `
                            <div style="font-size: 11px; color: #8892b0; margin-top: 6px; line-height: 1.4;">
                                ${conn.link.description}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            
            html += `</div></div>`;
        });
    }
    
    html += `</div>`;
    
    // Обновить контент, но сохранить кнопку закрытия
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = html;
    
    // Очистить панель, но оставить кнопку закрытия
    const closeBtn = rightPanel.querySelector('button');
    rightPanel.innerHTML = '';
    if (closeBtn) {
        rightPanel.appendChild(closeBtn);
    }
    rightPanel.appendChild(contentDiv);
    
    rightPanel.style.display = 'block';
}

// Создать правую панель если её нет
function createRightPanel() {
    let rightPanel = document.getElementById('rightPanel');
    if (!rightPanel) {
        rightPanel = document.createElement('div');
        rightPanel.id = 'rightPanel';
        rightPanel.style.cssText = `
            position: fixed;
            top: 70px;
            right: 0;
            width: 350px;
            height: calc(100vh - 70px);
            background: linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 100%);
            border-left: 1px solid #00d4ff;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            box-shadow: -5px 0 20px rgba(0, 212, 255, 0.2);
        `;
        
        // Добавить кнопку закрытия
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #00d4ff;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s;
        `;
        closeBtn.addEventListener('click', () => {
            rightPanel.style.display = 'none';
        });
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = 'rgba(0, 212, 255, 0.2)';
        });
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = 'none';
        });
        
        rightPanel.appendChild(closeBtn);
        document.body.appendChild(rightPanel);
    }
    return rightPanel;
}

// Фокус на узле
function focusOnNode(nodeId) {
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (node && graphSimulation) {
        // Центрировать камеру на узле
        const transform = d3.zoomIdentity
            .translate(window.innerWidth / 2, (window.innerHeight - 70) / 2)
            .scale(1.5)
            .translate(-node.x, -node.y);
        
        svg.transition()
            .duration(750)
            .call(d3.zoom().transform, transform);
        
        // Подсветить узел
        setTimeout(() => {
            handleNodeClick({ stopPropagation: () => {} }, node);
        }, 800);
    }
}

function closeInfoPanel() {
    const leftPanel = document.getElementById('infoPanel');
    if (leftPanel) {
        leftPanel.classList.remove('show');
    }
    
    // Также скрыть правую панель
    const rightPanel = document.getElementById('rightPanel');
    if (rightPanel) {
        rightPanel.style.display = 'none';
    }
    
    // Сброс подсветки при закрытии панели
    if (g) {
        g.selectAll('.node circle')
            .style('opacity', 1)
            .style('filter', 'url(#glow)')
            .style('stroke', '#0a0e1a')
            .style('stroke-width', 2);
        
        g.selectAll('.link')
            .style('stroke-opacity', 0.6)
            .style('stroke-width', 1.5)
            .style('stroke', d => colors.link[d.type] || '#2a3244');
    }
}

// Zoom controls
function zoomIn() {
    svg.transition().call(d3.zoom().scaleBy, 1.3);
}

function zoomOut() {
    svg.transition().call(d3.zoom().scaleBy, 0.7);
}

function resetZoom() {
    svg.transition().duration(750)
        .call(d3.zoom().transform, d3.zoomIdentity);
}

// Personalities View
function initializePersonalities() {
    renderPersonList();
    
    // Search
    document.getElementById('personSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderPersonList(searchTerm);
    });
}

function renderPersonList(searchTerm = '') {
    const container = document.getElementById('personList');
    container.innerHTML = '';
    
    const filteredPersons = personsData.filter(person => {
        if (searchTerm) {
            return person.name.toLowerCase().includes(searchTerm) ||
                   person.company.toLowerCase().includes(searchTerm) ||
                   person.category.toLowerCase().includes(searchTerm);
        }
        return true;
    });
    
    filteredPersons.forEach(person => {
        const card = document.createElement('div');
        card.className = 'person-card fade-in';
        if (selectedPerson && selectedPerson.id === person.id) {
            card.classList.add('active');
        }
        
        card.innerHTML = `
            <div class="person-name">${person.name}</div>
            <div class="person-position">${person.position}</div>
            <div class="person-company">${person.company}</div>
            <span class="person-category">${person.category}</span>
        `;
        
        card.onclick = () => selectPerson(person);
        container.appendChild(card);
    });
}

function selectPerson(person) {
    selectedPerson = person;
    
    // Update cards
    document.querySelectorAll('.person-card').forEach(card => {
        card.classList.remove('active');
    });
    event.currentTarget.classList.add('active', 'pulse-animation');
    
    // Render details
    renderPersonDetails(person);
}

// Функция для открытия MD файла
function openMdFile(mdFileName) {
    // Открытие MD файла в новом окне или модальном окне
    const mdViewerPath = `md-viewer.html?file=${mdFileName}`;
    
    // Создаем модальное окно для просмотра MD
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 14, 26, 0.95);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #141929;
        border: 1px solid #00d4ff;
        border-radius: 12px;
        max-width: 1200px;
        width: 100%;
        max-height: 90vh;
        overflow: hidden;
        padding: 0;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 212, 255, 0.3);
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        padding: 20px 30px;
        border-bottom: 1px solid #00d4ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const title = document.createElement('h2');
    title.innerHTML = `📄 Полное досье: ${mdFileName.replace('compass_artifact_', '').replace('_text_markdown.md', '')}`;
    title.style.cssText = `
        color: #00d4ff;
        margin: 0;
        font-size: 18px;
        text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        width: 40px;
        height: 40px;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s;
    `;
    closeBtn.onmouseover = () => {
        closeBtn.style.background = '#00d4ff';
        closeBtn.style.color = '#0a0e1a';
        closeBtn.style.transform = 'rotate(90deg)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'transparent';
        closeBtn.style.color = '#fff';
        closeBtn.style.transform = 'rotate(0)';
    };
    closeBtn.onclick = () => document.body.removeChild(modal);
    
    const iframe = document.createElement('iframe');
    iframe.src = mdViewerPath;
    iframe.style.cssText = `
        width: 100%;
        height: calc(90vh - 70px);
        border: none;
        background: #0a0e1a;
    `;
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Закрытие по ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Закрытие при клике вне модального окна
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEsc);
        }
    };
}

function renderPersonDetails(person) {
    const container = document.getElementById('personDetail');
    
    let html = `
        <div class="fade-in" style="color: #a8b2d1;">
            <h1 style="color: #00d4ff; margin-bottom: 10px;">${person.fullName}</h1>
            <div style="color: #64748b; font-size: 18px; margin-bottom: 20px;">
                ${person.position} • ${person.company}
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: #141929; padding: 15px; border-radius: 8px; border: 1px solid #2a3244;">
                    <div style="color: #64748b; font-size: 12px; text-transform: uppercase;">Опыт</div>
                    <div style="color: #00d4ff; font-size: 20px; font-weight: bold;">${person.experience}</div>
                </div>
                <div style="background: #141929; padding: 15px; border-radius: 8px; border: 1px solid #2a3244;">
                    <div style="color: #64748b; font-size: 12px; text-transform: uppercase;">Локация</div>
                    <div style="color: #00d4ff; font-size: 20px; font-weight: bold;">${person.location}</div>
                </div>
                <div style="background: #141929; padding: 15px; border-radius: 8px; border: 1px solid #2a3244;">
                    <div style="color: #64748b; font-size: 12px; text-transform: uppercase;">Категория</div>
                    <div style="color: #00d4ff; font-size: 20px; font-weight: bold;">${person.category}</div>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #00d4ff; margin-bottom: 15px;">Описание</h3>
                <p style="line-height: 1.6;">${person.description}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #00d4ff; margin-bottom: 15px;">Ключевые достижения</h3>
                ${person.achievements.map(a => `
                    <div style="background: #141929; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid #00d4ff;">
                        ${a}
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #00d4ff; margin-bottom: 15px;">Карьерный путь</h3>
                ${person.career.map(c => `
                    <div style="background: #141929; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid ${c.type === 'current' ? '#00d4ff' : '#2a3244'};">
                        <div style="color: #64748b; font-size: 12px;">${c.period}</div>
                        <div style="color: #fff; font-weight: bold;">${c.role}</div>
                        <div style="color: #a8b2d1;">${c.company}</div>
                        ${c.exit ? `<div style="color: #00d4ff; font-size: 12px; margin-top: 5px;">Exit: ${c.exit}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #00d4ff; margin-bottom: 15px;">Навыки и экспертиза</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${person.expertise.map(skill => `
                        <span style="padding: 8px 15px; background: rgba(0, 212, 255, 0.1); border: 1px solid #00d4ff; border-radius: 20px; font-size: 13px;">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            ${person.mdFile ? `
            <div style="margin-top: 30px; text-align: center;">
                <button onclick="openMdFile('${person.mdFile}')" style="
                    padding: 15px 40px;
                    background: linear-gradient(135deg, #667eea 0%, #00d4ff 100%);
                    border: none;
                    border-radius: 25px;
                    color: white;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 30px rgba(0, 212, 255, 0.5)'" 
                   onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 20px rgba(0, 212, 255, 0.3)'">
                    📄 Открыть полное досье (MD)
                </button>
            </div>
            ` : ''}
        </div>
    `;
    
    container.innerHTML = html;
}

// Update statistics
function updateStats() {
    const filteredData = filterGraphData();
    
    document.getElementById('nodeCount').textContent = filteredData.nodes.length;
    document.getElementById('linkCount').textContent = filteredData.links.length;
    document.getElementById('companyCount').textContent = filteredData.nodes.filter(n => n.type === 'company').length;
}

// Window resize
window.addEventListener('resize', () => {
    if (activeTab === 'graph' && graphSimulation) {
        const width = window.innerWidth;
        const height = window.innerHeight - 70;
        
        svg.attr('width', width).attr('height', height);
        graphSimulation.force('center', d3.forceCenter(width / 2, height / 2));
        graphSimulation.alpha(0.3).restart();
    }
});