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
  const table = document.getElementById('matrix-table');
  const dimNames = DIMENSIONS.map(d => `<span class="matrix-dim-icon">${d.icon}</span>${d.name}<br><span style="font-weight:400;font-size:12px">${d.nameCn}</span>`);

  let html = `<thead><tr><th></th>${dimNames.map(n => `<th>${n}</th>`).join('')}</tr></thead><tbody>`;

  LEVELS.forEach((level, li) => {
    html += `<tr><th><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${level.color};margin-right:6px;vertical-align:middle"></span>${level.name}<br><span style="font-weight:400">${level.nameCn}</span></th>`;
    DIMENSIONS.forEach(dim => {
      const l = dim.levels[li];
      html += `<td><span class="matrix-cell-title">${l.title}</span>${l.desc.split('。')[0]}。</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody>';
  table.innerHTML = html;
})();