// --- Tabs utility ---
function initTabs(navId, contentId, items, renderTab, renderPanel) {
  const nav = document.getElementById(navId);
  const content = document.getElementById(contentId);

  // Render tabs
  nav.innerHTML = items.map((item, i) => renderTab(item, i)).join('');

  // Render panels
  content.innerHTML = items.map((item, i) => 
    `<div class="tab-panel ${i === 0 ? 'active' : ''}" data-panel="${i}">${renderPanel(item, i)}</div>`
  ).join('');

  // Bind clicks
  nav.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      content.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      content.querySelector(`[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });
}

// --- Levels Tabs ---
initTabs('level-tabs', 'level-content', LEVELS,
  (level, i) => `
    <button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${i}" role="tab">
      <span class="tab-dot" style="background:${level.color}"></span>
      ${level.name}
    </button>
  `,
  (level, i) => `
    <div class="level-panel-header">
      <span class="level-panel-dot" style="background:${level.color}"></span>
      <span class="level-panel-name">${level.name}</span>
      <span class="level-panel-name-cn">${level.nameCn}</span>
    </div>
    <p class="level-panel-summary">${level.summary}</p>
    <p class="level-panel-desc">${level.description}</p>
    <div class="level-signals">
      <h4>关键信号</h4>
      <ul>${level.signals.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
  `
);

// --- Dimensions Tabs ---
initTabs('dim-tabs', 'dim-content', DIMENSIONS,
  (dim, i) => `
    <button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${i}" role="tab">
      <span class="tab-icon">${dim.icon}</span>
      ${dim.nameCn}
    </button>
  `,
  (dim, i) => `
    <div class="dim-panel-header">
      <span class="dim-panel-icon">${dim.icon}</span>
      <span class="dim-panel-name">${dim.name}</span>
      <span class="dim-panel-name-cn">${dim.nameCn}</span>
    </div>
    <p class="dim-panel-summary">${dim.summary}</p>
    <p class="dim-panel-desc">${dim.description}</p>
    <div class="dim-levels-list">
      ${dim.levels.map((l, li) => `
        <div class="dim-level-item" style="border-left-color:${LEVELS[li].color}">
          <div class="dim-level-item-header">
            <span class="dim-level-dot" style="background:${LEVELS[li].color}"></span>
            <span class="dim-level-label">${LEVELS[li].name} · ${LEVELS[li].nameCn}</span>
          </div>
          <div class="dim-level-title">${l.title}</div>
          <div class="dim-level-desc">${l.desc}</div>
        </div>
      `).join('')}
    </div>
  `
);

// --- Matrix Table ---
(function renderMatrix() {
  const table = document.getElementById('matrix-table');
  const levelNames = LEVELS.map(l => `${l.name}<br><span style="font-weight:400;font-size:12px">${l.nameCn}</span>`);
  
  let html = `<thead><tr><th></th>${levelNames.map(n => `<th>${n}</th>`).join('')}</tr></thead><tbody>`;
  
  DIMENSIONS.forEach(dim => {
    html += `<tr><th>${dim.icon} ${dim.name}<br><span style="font-weight:400">${dim.nameCn}</span></th>`;
    dim.levels.forEach(l => {
      html += `<td><span class="matrix-cell-title">${l.title}</span>${l.desc.split('。')[0]}。</td>`;
    });
    html += '</tr>';
  });
  
  html += '</tbody>';
  table.innerHTML = html;
})();
