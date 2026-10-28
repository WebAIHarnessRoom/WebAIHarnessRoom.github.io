(function () {
  'use strict';

  var DATA = window.HARNESS_DATA || [];
  var BASE = document.documentElement.getAttribute('data-base') || '';
  var STATUS_LABELS = { verified: '已验证', pending: '待验证', experimental: '实验中' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function badge(status) {
    var label = STATUS_LABELS[status] || status;
    return '<span class="badge badge-' + esc(status) + '">' + esc(label) + '</span>';
  }

  function formatDate(iso) { return iso || '—'; }

  function harnessUrl(id) { return BASE + 'harness/' + id + '/index.html'; }

  function byLastVerifiedDesc(a, b) {
    return (b.last_verified || '').localeCompare(a.last_verified || '');
  }

  function renderStatusBar() {
    var el = document.getElementById('status-bar');
    if (!el) return;
    var total = DATA.length;
    var verified = DATA.filter(function (h) { return h.status === 'verified'; }).length;
    var lastVerified = DATA.reduce(function (max, h) {
      return h.last_verified && h.last_verified > max ? h.last_verified : max;
    }, '');
    el.innerHTML =
      '<div class="status-item"><span class="status-value">' + total + '</span><span class="status-label">Harness</span></div>' +
      '<div class="status-item"><span class="status-value">' + verified + '</span><span class="status-label">已验证</span></div>' +
      '<div class="status-item"><span class="status-value">' + esc(lastVerified || '—') + '</span><span class="status-label">索引最后验证</span></div>';
  }

  function cardHTML(h) {
    var iconHTML = '';
    if (h.icon) {
      iconHTML = '<img class="card-icon" src="' + BASE + h.icon + '" alt="" width="32" height="32" loading="lazy">';
    }
    return '<a class="harness-card" href="' + harnessUrl(h.id) + '">' +
      '<div class="harness-card-head">' + iconHTML +
      '<span class="harness-card-name">' + esc(h.name) + '</span>' + badge(h.status) + '</div>' +
      '<div class="harness-card-meta"><span>' + esc(h.target_web_ai) + '</span><span>·</span><span>' + esc(formatDate(h.last_verified)) + '</span></div>' +
      '<p class="harness-card-tagline">' + esc(h.tagline) + '</p>' +
      '<span class="harness-card-link">查看详情 →</span>' +
      '</a>';
  }

  function renderHomeCards() {
    var el = document.getElementById('home-cards');
    if (!el) return;
    if (DATA.length === 0) {
      el.innerHTML = '<p class="empty-state">索引尚为空。参见 <a href="' + BASE + 'contributing/index.html">贡献页</a> 提交第一个 Harness。</p>';
      return;
    }
    var items = DATA.slice().sort(byLastVerifiedDesc).slice(0, 5);
    el.innerHTML = items.map(cardHTML).join('');
  }

  function renderIndexTable(items) {
    var el = document.getElementById('index-view-table');
    if (!el) return;
    if (items.length === 0) { el.innerHTML = ''; return; }
    el.innerHTML = '<table class="index-table"><thead><tr>' +
      '<th>名称</th><th>目标 Web AI</th><th>说明</th><th>状态</th><th>最后验证</th>' +
      '</tr></thead><tbody>' +
      items.map(function (h) {
        return '<tr>' +
          '<td class="col-name"><a href="' + harnessUrl(h.id) + '">' + esc(h.name) + '</a></td>' +
          '<td>' + esc(h.target_web_ai) + '</td>' +
          '<td class="col-desc">' + esc(h.tagline) + '</td>' +
          '<td>' + badge(h.status) + '</td>' +
          '<td class="col-date">' + esc(formatDate(h.last_verified)) + '</td>' +
          '</tr>';
      }).join('') +
      '</tbody></table>';
  }

  function renderIndexCards(items) {
    var el = document.getElementById('index-view-cards');
    if (!el) return;
    if (items.length === 0) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="index-cards">' + items.map(cardHTML).join('') + '</div>';
  }

  function initIndex() {
    var searchEl = document.getElementById('search');
    var targetEl = document.getElementById('filter-target');
    var statusEl = document.getElementById('filter-status');
    var tableEl = document.getElementById('index-view-table');
    var cardsEl = document.getElementById('index-view-cards');
    var emptyEl = document.getElementById('empty-state');
    var toggleTable = document.getElementById('toggle-table');
    var toggleCards = document.getElementById('toggle-cards');
    if (!searchEl || !targetEl || !statusEl || !tableEl || !cardsEl) return;

    var targets = [];
    DATA.forEach(function (h) {
      if (h.target_web_ai && targets.indexOf(h.target_web_ai) === -1) targets.push(h.target_web_ai);
    });
    targets.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      targetEl.appendChild(opt);
    });

    var view = 'table';

    function apply() {
      var q = searchEl.value.trim().toLowerCase();
      var target = targetEl.value;
      var status = statusEl.value;
      var items = DATA.filter(function (h) {
        if (target && h.target_web_ai !== target) return false;
        if (status && h.status !== status) return false;
        if (q) {
          var hay = (h.name + ' ' + h.tagline).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      }).sort(byLastVerifiedDesc);

      renderIndexTable(items);
      renderIndexCards(items);
      var empty = items.length === 0;
      if (emptyEl) emptyEl.hidden = !empty;
      tableEl.hidden = empty || view !== 'table';
      cardsEl.hidden = empty || view !== 'cards';
    }

    [searchEl, targetEl, statusEl].forEach(function (el) {
      el.addEventListener('input', apply);
      el.addEventListener('change', apply);
    });

    if (toggleTable && toggleCards) {
      toggleTable.addEventListener('click', function () {
        view = 'table';
        toggleTable.classList.add('active');
        toggleCards.classList.remove('active');
        apply();
      });
      toggleCards.addEventListener('click', function () {
        view = 'cards';
        toggleCards.classList.add('active');
        toggleTable.classList.remove('active');
        apply();
      });
    }

    apply();
  }

  function renderDetail() {
    var page = document.querySelector('.detail-page');
    if (!page) return;
    var id = page.getAttribute('data-harness-id');
    var h = null;
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].id === id) { h = DATA[i]; break; }
    }
    if (!h) return;

    function setText(field, value) {
      var el = page.querySelector('[data-field="' + field + '"]');
      if (el) el.textContent = value;
    }

    var statusEl = page.querySelector('[data-field="status"]');
    if (statusEl) {
      statusEl.className = 'badge badge-' + h.status;
      statusEl.textContent = STATUS_LABELS[h.status] || h.status;
    }

    setText('target_web_ai', h.target_web_ai || '—');
    setText('language', h.language || '—');
    setText('license', h.license || '—');
    setText('version', h.version ? 'v' + String(h.version).replace(/^v/, '') : '—');
    setText('last_verified', formatDate(h.last_verified));
    if (h.getting_started) setText('getting_started', h.getting_started);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderStatusBar();
    renderHomeCards();
    initIndex();
    renderDetail();
  });
})();