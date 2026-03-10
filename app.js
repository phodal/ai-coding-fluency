function initTabs(navId, contentId, items, renderTab, renderPanel) {
  const nav = document.getElementById(navId);
  const content = document.getElementById(contentId);
  nav.innerHTML = items.map((item, i) => renderTab(item, i)).join('');
  content.innerHTML = items.map((item, i) =>
    '<div class="tab-panel ' + (i === 0 ? 'active' : '') + '" data-panel="' + i + '">' + renderPanel(item, i) + '</div>'
  ).join('');
  nav.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      nav.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      content.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      content.querySelector('[data-panel="' + btn.dataset.tab + '"]').classList.add('active');
    });
  });
}

function icon(id) { return ICONS[id] || ''; }

// Levels Tabs
initTabs('level-tabs', 'level-content', LEVELS,
  function(level, i) {
    return '<button class="tab-btn ' + (i === 0 ? 'active' : '') + '" data-tab="' + i + '" role="tab">'
      + '<span class="tab-dot" style="background:' + level.color + '"></span>'
      + level.name + '</button>';
  },
  function(level) {
    return '<div class="level-panel-header">'
      + '<span class="level-panel-dot" style="background:' + level.color + '"></span>'
      + '<span class="level-panel-name">' + level.name + '</span>'
      + '<span class="level-panel-name-cn">' + level.nameCn + '</span></div>'
      + '<p class="level-panel-summary">' + level.summary + '</p>'
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
    ${level.investments ? `
    <div class="level-investments">
      <h4>关键投入</h4>
      <ul>${level.investments.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
    ` : ''}
    ${level.metrics ? `
    <div class="level-metrics">
      <h4>可衡量指标</h4>
      <ul>${level.metrics.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
    ` : ''}
  `
  DIMENSIONS.forEach(dim => {
    html += `<tr><th><span class="matrix-dim-icon">${dim.icon}</span>${dim.name}<br><span style="font-weight:400">${dim.nameCn}</span></th>`;
    dim.levels.forEach(l => {
      html += `<td><span class="matrix-cell-title">${l.title}</span>${l.desc.split('。')[0]}。</td>`;
    });
    html += '</tr>';
  });
  
  html += '</tbody>';
  table.innerHTML = html;
})();// --- Matrix Table ---
(function renderMatrix() {
  const container = document.getElementById('matrix-table').parentElement;
  
  let html = '<div class="matrix-grid">';
  
  // Header row with dimension names
  html += '<div class="matrix-header-corner"></div>';
  DIMENSIONS.forEach(dim => {
    html += `
      <div class="matrix-header-cell">
        <div class="matrix-dim-icon">${dim.icon}</div>
        <div class="matrix-dim-name">${dim.name}</div>
        <div class="matrix-dim-name-cn">${dim.nameCn}</div>
      </div>
    `;
  });
  
  // Data rows
  LEVELS.forEach((level, li) => {
    // Level header cell
    html += `
      <div class="matrix-level-cell" style="--level-color: ${level.color}">
        <div class="matrix-level-dot"></div>
        <div class="matrix-level-name">${level.name}</div>
        <div class="matrix-level-name-cn">${level.nameCn}</div>
      </div>
    `;
    
    // Content cells for each dimension
    DIMENSIONS.forEach(dim => {
      const l = dim.levels[li];
      html += `
        <div class="matrix-content-cell">
          <div class="matrix-cell-title">${l.title}</div>
          <div class="matrix-cell-desc">${l.desc}</div>
        </div>
      `;
    });
  });
  
  html += '</div>';
  container.innerHTML = html;
})();