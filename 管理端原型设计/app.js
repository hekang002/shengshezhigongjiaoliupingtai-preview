const initialRole = ['handler', 'leader'].includes(new URLSearchParams(location.search).get('role')) ? new URLSearchParams(location.search).get('role') : 'platform';
const state = {
  role: initialRole,
  page: initialRole === 'handler' ? 'handler-dashboard' : initialRole === 'leader' ? 'leader-dashboard' : 'dashboard',
  authMode: 'password',
  smsCountdown: 0,
  profileOpen: false,
  profileModal: false,
  profileTab: 'basic',
  registeredPhone: '',
  modal: null,
  activePermissionRole: 'content',
  // Platform users need to see the downstream work queue entry immediately.
  // The dispatch role keeps its original collapsed navigation behavior.
  expandedNavGroup: initialRole === 'platform' ? 4 : ['handler', 'leader'].includes(initialRole) ? 0 : null,
  userReviewTab: 'pending',
  contentLedgerTab: '全部',
  postDetailTab: 'content',
  policyAdminTab: 'policy',
  reviewTab: 'pending',
  reviewRows: [
    { id: 'POST-20260911-018', title: '建议建立农产品产销信息跨单位共享机制', author: '山野微风', board: '建言献策', risk: '低风险', status: '待审核', time: '今天 09:24' },
    { id: 'POST-20260911-017', title: '关于优化机关食堂晚餐供应时段的建议', author: '一盏清茶', board: '心声诉求', risk: '需核验', status: '待审核', time: '昨天 16:40' },
    { id: 'POST-20260911-016', title: '县域冷链项目验收资料整理经验分享', author: '江城行者', board: '业务交流', risk: '低风险', status: '退回修改', time: '昨天 11:06' },
    { id: 'POST-20260911-015', title: '关于基层网点联系方式展示的意见', author: '匿名用户', board: '心声诉求', risk: '个人信息', status: '待审核', time: '09月10日' },
  ],
  assignments: [
    { id: 'SX-202609-081', title: '农产品产销信息共享机制', from: '建言献策', owner: '合作指导处', co: '信息中心', deadline: '09月18日', status: '待分办', priority: '重点' },
    { id: 'SX-202609-079', title: '机关食堂晚餐供应时段优化', from: '心声诉求', owner: '办公室', co: '机关服务中心', deadline: '09月16日', status: '办理中', priority: '一般' },
    { id: 'SX-202609-074', title: '基层网点回收设备维修响应', from: '心声诉求', owner: '再生资源处', co: '财务处', deadline: '09月12日', status: '临期', priority: '重点' },
    { id: 'SX-202609-068', title: '县域冷链项目资料标准化', from: '业务交流', owner: '经济发展处', co: '合作指导处', deadline: '09月08日', status: '待复核', priority: '一般' },
  ],
  notices: [
    ['分办管理员', '完成了事项 SX-202609-074 的催办', '10分钟前'],
    ['内容管理员', '将帖子 POST-20260911-015 转人工审核', '32分钟前'],
    ['平台管理员', '调整了“心声诉求”板块的评论规则', '1小时前'],
    ['合作指导处', '提交了事项 SX-202609-068 的答复草稿', '2小时前'],
  ],
};

const icon = (name, cls = '') => `<i data-lucide="${name}" class="icon ${cls}"></i>`;
const badge = (text, type = '') => `<span class="badge ${type}">${text}</span>`;
const roleInfo = {
  platform: { label: '平台管理员', short: '平台', tone: '平台治理', avatar: '管' },
  content: { label: '内容管理员', short: '内容', tone: '内容管理', avatar: '审' },
  dispatch: { label: '事项管理员', short: '事项', tone: '事项处理', avatar: '事' },
  handler: { label: '历史承办角色', short: '历史', tone: '已停用角色', avatar: '历' },
  leader: { label: '领导查看', short: '领导', tone: '运行总览', avatar: '领' },
};

const handlerNav = [
  ['handler-dashboard', '工作台与任务', 'layout-dashboard'],
  ['handler-handling', '办理反馈', 'clipboard-pen-line'],
  ['handler-answers', '已办结事项', 'badge-check']
];
  const leaderNav = [
    ['leader-dashboard', '数据驾驶舱', 'chart-spline']
  ];
const navByRole = {
  platform: [
    ['运营工作台', [['dashboard', '运营工作台', 'gauge']]],
    ['数据统计', leaderNav],
    ['内容管理', [['content-ledger', '信息台账管理', 'notebook-tabs'], ['dialog-messages', '私信消息管理', 'messages-square'], ['announcements', '通知公告管理', 'megaphone'], ['banners', '轮播图管理', 'images']]],
    ['事项办理', [['handler-dispatch', '事项处理', 'tags']]],
    ['审核管理', [['content-review', '信息内容审核', 'shield-check'], ['comments', '评论审核', 'message-square'], ['report-review', '举报核查', 'flag-triangle-right'], ['user-review', '用户审核', 'user-round-check']]],
    ['配置管理', [['categories', '栏目管理', 'panels-top-left'], ['sensitive', '敏感词库', 'scan-text'], ['base-config', '基础配置', 'shield-check']]],
    ['系统设置', [['users', '用户管理', 'users'], ['organization', '组织架构', 'network'], ['permissions', '角色管理', 'key-round'], ['positions', '岗位管理', 'briefcase-business'], ['menu-management', '菜单管理', 'panels-top-left'], ['dictionary-management', '字典管理', 'book-open'], ['logs', '系统日志', 'scroll-text']]],
  ],
  content: [
    ['运营工作台', [['dashboard', '运营工作台', 'gauge']]],
    ['审核管理', [['content-review', '信息内容审核', 'shield-check'], ['comments', '评论审核', 'message-square'], ['report-review', '举报核查', 'flag-triangle-right']]],
    ['内容管理', [['content-ledger', '信息台账管理', 'notebook-tabs'], ['dialog-messages', '私信消息管理', 'messages-square'], ['announcements', '通知公告管理', 'megaphone'], ['banners', '轮播图管理', 'images']]],
    ['配置管理', [['categories', '栏目管理', 'panels-top-left'], ['sensitive', '敏感词库', 'scan-text']]],
  ],
  dispatch: [
    ['运营工作台', [['dashboard', '运营工作台', 'gauge']]],
    ['事项办理', [['handler-dispatch', '事项处理', 'tags'], ['rectifications', '整改台账', 'list-checks']]],
    ['分析与协同', [['statistics', '办理统计', 'chart-no-axes-combined'], ['audit', '操作留痕', 'scroll-text']]],
  ],
  handler: [],
  leader: [['数据统计', leaderNav]],
};

const STAFF_APP_URL = new URL('../index.html', document.baseURI).href;

function showToast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.classList.remove('show'), 2300);
}
const searchSafe = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
function renderGlobalSearchResults() {
  const input = document.getElementById('global-search-keyword'), panel = document.getElementById('global-search-results');
  if (!input || !panel) return;
  const rows = window.PrototypeData?.searchContent(input.value) || [];
  panel.hidden = false;
  panel.innerHTML = rows.length ? `<div class="global-search-caption">${input.value.trim() ? `找到 ${rows.length} 条结果` : '默认展示最近内容'}</div>${rows.map((item) => `<button type="button" onmousedown="event.preventDefault();openGlobalSearchResult('${item.type}','${searchSafe(item.id)}')"><span class="global-search-type">${item.type}</span><span><strong>${searchSafe(item.title)}</strong><small>${searchSafe(item.meta)}</small></span>${icon('chevron-right')}</button>`).join('')}` : '<div class="global-search-empty">未找到匹配内容，请增加或调整关键词</div>';
}
function closeGlobalSearchResults() { setTimeout(() => { const panel = document.getElementById('global-search-results'); if (panel) panel.hidden = true; }, 120); }
function openGlobalSearchResult() { const panel = document.getElementById('global-search-results'); if (panel) panel.hidden = true; go('content-ledger'); }

function setState(next) { Object.assign(state, next); render(); }
function logout() { sessionStorage.removeItem('prototype-handler-account-id'); sessionStorage.removeItem('prototype-management-account-id'); window.location.href = STAFF_APP_URL; }
function currentAccount() {
  const data = window.PrototypeData?.read();
  const storedId = sessionStorage.getItem('prototype-management-account-id') || (state.role === 'handler' ? sessionStorage.getItem('prototype-handler-account-id') : '');
  const storedAccount = data?.accounts?.find((account) => account.id === storedId && account.role === state.role && account.status === 'approved');
  const fallbackId = state.role === 'leader' ? 'leader' : state.role === 'platform' ? 'admin' : state.role;
  return storedAccount || data?.accounts?.find((account) => account.id === fallbackId) || data?.accounts?.find((account) => account.role === state.role && account.status === 'approved') || { id: fallbackId, name: roleInfo[state.role].label };
}
function toggleProfileMenu() { state.profileOpen = !state.profileOpen; render(); }
function profileAction(action) {
  state.profileOpen = false;
  if (action === 'logout') return logout();
  state.profileModal = true;
  state.profileTab = 'basic';
  render();
}
function closeProfileModal(event) { if (event && event.target !== event.currentTarget) return; state.profileModal = false; render(); }
function setProfileTab(tab) { state.profileTab = ['basic', 'security', 'devices'].includes(tab) ? tab : 'basic'; render(); }
function saveProfile() { const data = window.PrototypeData?.read(), current = currentAccount(), account = data?.accounts?.find((item) => item.id === current.id), name = document.getElementById('profile-nickname')?.value.trim(); if (!account || !name) return showToast('请填写用户昵称'); account.name = name; account.gender = document.querySelector('input[name="profile-gender"]:checked')?.value || '未知'; PrototypeData.save(data); state.profileModal = false; render(); showToast('个人信息已更新'); }
function changeProfilePassword() { const oldPassword = document.getElementById('profile-old-password')?.value, password = document.getElementById('profile-new-password')?.value, confirm = document.getElementById('profile-confirm-password')?.value; if (!oldPassword || !password || !confirm) return showToast('请完整填写密码信息'); if (password.length < 6) return showToast('新密码不能少于 6 位'); if (password !== confirm) return showToast('两次输入的新密码不一致'); showToast('密码修改成功'); }
function renderProfileModal() {
  if (!state.profileModal) return '';
  const account = currentAccount(), tab = state.profileTab;
  const basic = `<div class="account-basic"><aside><div class="account-avatar">${roleInfo[state.role].avatar}</div><h3>${account.name}</h3><p>服务基层 · 倾听心声 · 协同办理</p><dl><div><dt>账号</dt><dd>${account.id}</dd></div><div><dt>部门</dt><dd>${account.department || '未设置'}</dd></div><div><dt>当前角色</dt><dd>${roleInfo[state.role].label}</dd></div></dl></aside><section><label><span><b>*</b> 昵称</span><input class="input" id="profile-nickname" value="${account.name}"></label><div class="account-gender"><span><b>*</b> 性别</span>${['男','女','未知'].map((item) => `<label><input type="radio" name="profile-gender" value="${item}" ${(account.gender || '未知') === item ? 'checked' : ''}><span>${item}</span></label>`).join('')}</div><button class="btn btn-primary" onclick="saveProfile()">更新信息</button></section></div>`;
  const security = `<form class="account-security" onsubmit="event.preventDefault();changeProfilePassword()">${[['原密码','profile-old-password'],['新密码','profile-new-password'],['确认密码','profile-confirm-password']].map(([label,id]) => `<label><span><b>*</b> ${label}</span><input class="input" id="${id}" type="password" placeholder="请输入"></label>`).join('')}<button class="btn btn-primary" type="submit">修改密码</button></form>`;
  const devices = `<div class="account-devices"><h3>我的在线设备</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>序号</th><th>登录平台</th><th>IP 地址</th><th>登录地址</th><th>浏览器</th><th>系统</th><th>登录时间</th><th>操作</th></tr></thead><tbody><tr><td>1</td><td>PC</td><td>117.152.223.105</td><td>中国湖北省武汉市</td><td>Chrome</td><td>OS X</td><td>2026-09-14 14:26</td><td><button class="text-link" onclick="showToast('当前设备不能强制下线')">强制下线</button></td></tr></tbody></table></div></div>`;
  return `<div class="account-modal-backdrop" onclick="closeProfileModal(event)"><section class="account-modal" role="dialog" aria-modal="true" aria-label="个人中心"><header><h2>个人中心</h2><button onclick="closeProfileModal()" title="关闭">${icon('x')}</button></header><nav>${[['basic','基本设置'],['security','安全设置'],['devices','在线设备']].map(([id,label]) => `<button class="${tab === id ? 'active' : ''}" onclick="setProfileTab('${id}')">${label}</button>`).join('')}</nav><div class="account-modal-body">${tab === 'basic' ? basic : tab === 'security' ? security : devices}</div></section></div>`;
}
function switchRole(role) { state.role = role; state.page = role === 'handler' ? 'handler-dashboard' : role === 'leader' ? 'leader-dashboard' : 'dashboard'; state.modal = null; state.expandedNavGroup = ['handler', 'leader'].includes(role) ? 0 : null; const url = new URL(location.href); if (role === 'handler') url.searchParams.set('role', 'handler'); else url.searchParams.delete('role'); history.replaceState(null, '', url); render(); showToast(`已切换至${roleInfo[role].label}`); }
function go(page) { state.page = ['policy', 'trace-query', 'trace-review'].includes(page) ? 'dashboard' : page; state.modal = null; state.traceResult = null; const groupIndex = navByRole[state.role]?.findIndex(([, items]) => items.some(([route]) => route === state.page)) ?? -1; if (groupIndex >= 0) state.expandedNavGroup = groupIndex; render(); window.scrollTo(0, 0); }
function toggleNavGroup(index) { state.expandedNavGroup = state.expandedNavGroup === index ? null : index; render(); }
function openModal(type, id = '') { state.modal = { type, id }; render(); }
function closeModal() { state.modal = null; render(); }
function markReviewed(index, action) { state.reviewRows[index].status = action === 'approve' ? '已发布' : action === 'reject' ? '已驳回' : '退回修改'; state.modal = null; render(); showToast(action === 'approve' ? '审核通过，内容已发布' : action === 'reject' ? '内容已驳回' : '已退回修改'); }

function renderNav() {
  const groups = navByRole[state.role] || navByRole.platform;
  const data = window.PrototypeData?.read();
  const handlerAccountId = sessionStorage.getItem('prototype-handler-account-id');
  const handlerDept = (handlerAccountId ? data?.accounts.find((account) => account.id === handlerAccountId && account.role === 'handler' && account.status === 'approved') : data?.accounts.find((account) => account.role === 'handler' && account.status === 'approved'))?.department;
  const counts = data ? { review: data.posts.filter((p) => p.sensitiveHits?.length && p.contentAuditStatus === '待审核').length, comments: new Set(data.comments.filter((c) => c.status === '待审核' && c.sensitiveHits?.length).map((c) => String(c.postId))).size, 'report-review': data.reports.filter((r) => r.status === '待核查').length, 'content-review': data.posts.filter((p) => ['建言献策', '心声诉求', '业务交流'].includes(p.board) && (state.role !== 'content' || p.board !== '业务交流') && p.sensitiveHits?.length && p.contentAuditStatus === '待审核').length, assignments: data.affairs.filter((a) => a.status === '待处理').length, 'user-review': (data.accounts || []).filter((a) => a.status === 'pending').length } : {};
  const groupIcons = { '工作总览': 'layout-dashboard', '审核管理': 'user-round-check', '溯源查询': 'search-check', '系统设置': 'settings-2', '内容管理': 'files', '事项办理': 'clipboard-list', '承办管理': 'briefcase-business', '整改与公开': 'badge-check', '内容运营': 'megaphone', '数据分析': 'chart-no-axes-combined', '配置管理': 'sliders-horizontal', '分析与协同': 'chart-no-axes-combined', '承办工作台': 'briefcase-business', '部门数据': 'folder-open', '数据统计': 'chart-spline', '领导视图': 'chart-spline' };
  counts['dialog-messages'] = window.PrivateChat?.unreadCount() || 0;
  return groups.map(([group, items], index) => {
    const expanded = state.expandedNavGroup === index;
    const current = items.some(([page]) => page === state.page);
    const pending = items.reduce((total, [page]) => total + (counts[page] || 0), 0);
    return `<div class="nav-group nav-accordion"><button class="nav-item nav-parent ${current ? 'current' : ''}" type="button" aria-expanded="${expanded}" aria-controls="nav-panel-${state.role}-${index}" onclick="toggleNavGroup(${index})">${icon(groupIcons[group] || 'folder')}<span>${group}</span>${pending ? `<span class="badge red">${pending}</span>` : ''}${icon(expanded ? 'chevron-down' : 'chevron-right', 'nav-chevron')}</button><div class="nav-children" id="nav-panel-${state.role}-${index}" ${expanded ? '' : 'hidden'}>${items.map(([page, label, ico]) => `<button class="nav-item nav-child ${state.page === page ? 'active' : ''}" type="button" onclick="go('${page}')">${icon(ico)}<span>${label}</span>${counts[page] ? `<span class="badge red">${counts[page]}</span>` : ''}</button>`).join('')}</div></div>`;
  }).join('');
}

function renderShell() {
  const info = roleInfo[state.role];
  const account = currentAccount();
  return `<div class="app-shell role-${state.role}">
    <header class="topbar"><div class="topbar-brand"><div class="brand-seal"><span>湖北<br>供销</span></div><div><strong>湖北供销·心声</strong><small>管理工作台 · 统一权限视图</small></div></div><div class="topbar-center"><div class="global-search">${icon('search')}<input class="global-search-input" id="global-search-keyword" aria-label="全局搜索关键词" autocomplete="off" placeholder="输入关键词，多个关键词请用空格分隔" onfocus="renderGlobalSearchResults()" oninput="renderGlobalSearchResults()" onblur="closeGlobalSearchResults()"><div class="global-search-results" id="global-search-results" hidden></div></div></div><div class="top-actions"><div class="profile-wrap"><button class="profile-trigger" title="打开用户菜单" aria-haspopup="menu" aria-expanded="${state.profileOpen}" onclick="toggleProfileMenu()"><div class="avatar">${info.avatar}</div><span class="profile-name">${account.name}</span>${icon(state.profileOpen ? 'chevron-up' : 'chevron-down')}</button>${state.profileOpen ? `<div class="profile-menu" role="menu"><div class="profile-summary"><div class="avatar">${info.avatar}</div><div><strong>${account.name}</strong><small>${account.id}</small></div></div><button role="menuitem" onclick="profileAction('center')">${icon('user-round')}<span>个人中心</span></button><button class="profile-logout" role="menuitem" onclick="profileAction('logout')">${icon('log-out')}<span>退出登录</span></button></div>` : ''}</div></div></header>
    <aside class="sidebar">${renderNav()}<div class="sidebar-foot">当前数据范围：${state.role === 'handler' ? '所属部门主办事项' : '省社本级及授权组织'}<br>所有敏感操作均自动留痕</div></aside>
    <main class="main">${renderPage()}</main>
    ${renderModal()}
    ${renderProfileModal()}
  </div>`;
}

function pageHead(title, desc, actions = '') { return `<div class="page-head"><div class="page-title"><div class="page-kicker"><span></span>${roleInfo[state.role].tone}</div><h1>${title}</h1><p>${desc}</p></div><div class="head-actions">${actions}</div></div>`; }

function renderDashboard() {
  const role = state.role;
  const title = role === 'leader' ? '领导驾驶舱' : role === 'handler' ? '承办工作概览' : '运营工作台';
  const desc = role === 'leader' ? '按授权组织范围查看运行指标、重点事项和公开成果。' : '今天是 2026 年 9 月 11 日，以下是需要优先处理的业务动态。';
  const actions = role === 'leader' ? `<button class="btn btn-secondary" onclick="go('statistics')">${icon('chart-no-axes-combined')}专题统计</button>` : `<button class="btn btn-secondary" onclick="go('statistics')">${icon('download')}导出日报</button><button class="btn btn-primary" onclick="go('${role === 'dispatch' ? 'assignments' : role === 'content' ? 'review' : 'handling'}')">${icon('arrow-up-right')}进入待办</button>`;
  if (role === 'leader') return `${pageHead(title, desc, actions)}<div class="grid grid-4"><div class="card stat"><div class="stat-label">本月发帖量</div><div class="stat-value">286</div><div class="stat-note">较上月 +12.4%</div></div><div class="card stat info"><div class="stat-label">事项受理量</div><div class="stat-value">142</div><div class="stat-note">覆盖 18 个组织</div></div><div class="card stat good"><div class="stat-label">按期办结率</div><div class="stat-value">93.6%</div><div class="stat-note">较上月 +3.2%</div></div><div class="card stat warn"><div class="stat-label">临期 / 逾期</div><div class="stat-value">7 / 2</div><div class="stat-note">需关注重点事项</div></div></div><div class="split-layout"><section class="card"><div class="card-title card-pad" style="padding-bottom:0">事项办理趋势 <span class="badge blue">近 6 个月</span></div><div class="chart">${[54,76,62,88,74,96].map((h, i) => `<div class="bar" style="height:${h}%"><span>${['4月','5月','6月','7月','8月','9月'][i]}</span></div>`).join('')}</div></section><aside class="card card-pad"><div class="card-title">重点事项跟踪 <span class="badge gold">4 项</span></div><div class="queue-list">${state.assignments.slice(0,3).map(a => `<div><strong style="display:block;font-size:13px">${a.title}</strong><p style="margin:4px 0;color:var(--muted);font-size:12px">${a.owner} · ${a.deadline}</p>${badge(a.status, a.status === '临期' ? 'red' : 'gold')}</div>`).join('')}</div></aside></div>`;
  return `${pageHead(title, desc, actions)}${role === 'content' ? `<div class="notice">${icon('scan-text')}<div><strong>今日有 3 条内容命中敏感规则</strong><p>其中 1 条涉及疑似个人信息，建议优先完成复核。</p></div><button class="btn btn-sm btn-secondary" onclick="go('review')">查看队列</button></div>` : role === 'dispatch' ? `<div class="notice">${icon('clock-3')}<div><strong>有 2 项事项将在 48 小时内临期</strong><p>请核对承办部门进展，必要时发起催办或延期审批。</p></div><button class="btn btn-sm btn-secondary" onclick="go('handling')">查看临期</button></div>` : role === 'handler' ? `<div class="notice">${icon('inbox')}<div><strong>你有 3 条新增待办</strong><p>其中 1 项为重点事项，最早办理期限为 2026-09-12。</p></div><button class="btn btn-sm btn-secondary" onclick="go('tasks')">查看待办</button></div>` : ''}<div class="grid grid-4"><div class="card stat"><div class="stat-label">今日新增发帖</div><div class="stat-value">18</div><div class="stat-note">较昨日 +4</div></div><div class="card stat warn"><div class="stat-label">待处理队列</div><div class="stat-value">${role === 'content' ? '12' : role === 'dispatch' ? '9' : role === 'handler' ? '3' : '26'}</div><div class="stat-note">含临期事项 2 项</div></div><div class="card stat info"><div class="stat-label">本月办结率</div><div class="stat-value">93.6%</div><div class="stat-note">较上月 +3.2%</div></div><div class="card stat good"><div class="stat-label">平台活跃组织</div><div class="stat-value">18</div><div class="stat-note">今日新增 2 个组织</div></div></div><div class="split-layout"><section class="card"><div class="card-title card-pad" style="padding-bottom:0">优先处理队列 <button class="text-link" onclick="go('${role === 'content' ? 'review' : role === 'dispatch' ? 'assignments' : role === 'handler' ? 'tasks' : 'handling'}')">查看全部</button></div><div class="queue-list card-pad" style="padding-top:0">${renderQueue(role)}</div></section><aside class="card card-pad"><div class="card-title">近期动态 <span class="badge">实时</span></div><div class="timeline">${state.notices.map(([who, text, time], i) => `<div class="timeline-item"><span class="timeline-dot">${icon(i === 0 ? 'bell-ring' : 'activity')}</span><div><strong>${who}</strong><p>${text}</p></div><span class="timeline-time">${time}</span></div>`).join('')}</div></aside></div>`;
}

function renderQueue(role) {
  const rows = role === 'content' ? state.reviewRows.slice(0, 3).map(r => [r.title, `${r.board} · ${r.time}`, r.risk, 'review', 'file-search']) : role === 'handler' ? state.assignments.slice(1, 4).map(r => [r.title, `${r.owner} · 截止 ${r.deadline}`, r.status, 'handling', 'clipboard-pen-line']) : state.assignments.slice(0, 3).map(r => [r.title, `${r.owner} · 截止 ${r.deadline}`, r.status, role === 'dispatch' ? 'assignments' : 'handling', 'git-pull-request-arrow']);
  return rows.map(([title, sub, status, page, ico]) => `<div class="queue-item"><span class="queue-icon">${icon(ico)}</span><div><strong>${title}</strong><p>${sub}</p></div><div>${badge(status, status === '临期' || status === '需核验' ? 'red' : status === '办理中' ? 'gold' : 'blue')}<button class="btn btn-sm btn-ghost" onclick="go('${page}')">处理 ${icon('chevron-right')}</button></div></div>`).join('');
}

function renderReview() {
  const rows = state.reviewRows.filter(r => state.reviewTab === 'all' || (state.reviewTab === 'pending' ? ['待审核','退回修改'].includes(r.status) : r.status === '已发布'));
  return `${pageHead('内容审核','按风险等级和审核状态处理帖子，所有处置动作自动写入审计日志。', `<button class="btn btn-secondary" onclick="go('sensitive')">${icon('scan-text')}敏感规则</button><button class="btn btn-primary" onclick="showToast('已刷新审核队列')">${icon('refresh-cw')}刷新队列</button>`)}<div class="filters"><input class="input" placeholder="搜索标题、编号或作者"><select class="select"><option>全部板块</option><option>建言献策</option><option>心声诉求</option><option>业务交流</option></select><select class="select"><option>全部风险</option><option>需核验</option><option>个人信息</option></select><button class="btn btn-secondary" onclick="showToast('筛选条件已应用')">${icon('list-filter')}筛选</button></div><div class="card"><div class="tabs" style="padding:12px;border-bottom:1px solid var(--line)">${[['pending','待处理'],['all','全部记录'],['published','已发布']].map(([id,label]) => `<button class="btn btn-sm ${state.reviewTab === id ? 'btn-primary' : 'btn-ghost'}" onclick="setState({reviewTab:'${id}'})">${label}${id === 'pending' ? ' 3' : ''}</button>`).join('')}</div><div class="table-wrap" style="border:0;border-radius:0"><table class="data-table"><thead><tr><th>内容</th><th>来源</th><th>风险识别</th><th>状态</th><th>提交时间</th><th>操作</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td><div class="td-title">${r.title}</div><div class="td-sub">${r.id} · ${r.author}</div></td><td>${badge(r.board)}</td><td>${badge(r.risk, r.risk === '低风险' ? 'green' : 'red')}</td><td>${badge(r.status, r.status === '已发布' ? 'green' : r.status === '退回修改' ? 'gold' : 'blue')}</td><td>${r.time}</td><td><div class="row-actions"><button class="btn btn-sm btn-secondary" onclick="openModal('review','${i}')">查看</button>${r.status !== '已发布' ? `<button class="btn btn-sm btn-primary" onclick="markReviewed(${i},'approve')">通过</button>` : ''}</div></td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderAssignments() {
  return `${pageHead('问题登记与分办','把通过审核、具有办理价值的帖子登记为事项，并配置主办、协办、时限和反馈方式。', `<button class="btn btn-secondary" onclick="showToast('已刷新待分办列表')">${icon('refresh-cw')}刷新</button><button class="btn btn-primary" onclick="openModal('assignment')">${icon('plus')}登记事项</button>`)}<div class="grid grid-4"><div class="card stat"><div class="stat-label">待分办</div><div class="stat-value">4</div><div class="stat-note">今日新增 1 项</div></div><div class="card stat warn"><div class="stat-label">临期事项</div><div class="stat-value">2</div><div class="stat-note">需优先催办</div></div><div class="card stat info"><div class="stat-label">办理中</div><div class="stat-value">18</div><div class="stat-note">覆盖 9 个部门</div></div><div class="card stat good"><div class="stat-label">本月办结</div><div class="stat-value">62</div><div class="stat-note">办结率 93.6%</div></div></div><div class="filters"><input class="input" placeholder="搜索事项编号或标题"><select class="select"><option>全部状态</option><option>待分办</option><option>办理中</option><option>待复核</option><option>临期</option></select><select class="select"><option>全部优先级</option><option>重点</option><option>一般</option><option>紧急</option></select><button class="btn btn-secondary" onclick="showToast('筛选条件已应用')">${icon('list-filter')}筛选</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>事项</th><th>来源</th><th>主办部门</th><th>协办部门</th><th>办理期限</th><th>状态</th><th>操作</th></tr></thead><tbody>${state.assignments.map((a, i) => `<tr><td><div class="td-title">${a.title}</div><div class="td-sub">${a.id} · ${badge(a.priority, a.priority === '重点' ? 'gold' : '')}</div></td><td>${badge(a.from)}</td><td>${a.owner}</td><td>${a.co}</td><td>${a.deadline}</td><td>${badge(a.status, a.status === '临期' ? 'red' : a.status === '办理中' ? 'gold' : a.status === '待复核' ? 'blue' : '')}</td><td><div class="row-actions"><button class="btn btn-sm btn-secondary" onclick="openModal('assignment','${i}')">详情</button><button class="btn btn-sm btn-ghost" onclick="showToast('${a.status === '待分办' ? '已打开分办表单' : '催办通知已发送'}')">${a.status === '待分办' ? '分办' : '催办'}</button></div></td></tr>`).join('')}</tbody></table></div>`;
}

function renderHandling() {
  return `${pageHead('办理管理','按事项状态跟踪承办进展、答复复核、延期审批和办理留痕。', `<button class="btn btn-secondary" onclick="showToast('已导出当前权限范围台账')">${icon('download')}导出台账</button><button class="btn btn-primary" onclick="showToast('已发送批量催办提醒')">${icon('bell-ring')}批量催办</button>`)}<div class="filters"><input class="input" placeholder="搜索事项编号、标题或部门"><select class="select"><option>全部办理状态</option><option>办理中</option><option>临期</option><option>待复核</option><option>已办结</option></select><select class="select"><option>全部组织范围</option><option>省社本级</option><option>市州社</option><option>直属企业</option></select><button class="btn btn-secondary" onclick="showToast('筛选条件已应用')">${icon('list-filter')}筛选</button></div><div class="card"><div class="card-title card-pad" style="padding-bottom:0">全流程事项 <span class="badge">共 26 项</span></div><div class="table-wrap" style="border:0;border-radius:0"><table class="data-table"><thead><tr><th>事项</th><th>主办部门</th><th>当前节点</th><th>办理进展</th><th>期限</th><th>风险</th><th>操作</th></tr></thead><tbody>${state.assignments.concat([{id:'SX-202609-063',title:'基层网点回收设备维修响应',owner:'再生资源处',status:'已办结',deadline:'08月28日',priority:'一般',from:'心声诉求'}]).map((a, i) => `<tr><td><div class="td-title">${a.title}</div><div class="td-sub">${a.id}</div></td><td>${a.owner}</td><td>${badge(a.status, a.status === '已办结' ? 'green' : a.status === '临期' ? 'red' : 'gold')}</td><td style="min-width:160px"><div class="progress"><i style="width:${a.status === '已办结' ? 100 : a.status === '待复核' ? 88 : a.status === '临期' ? 62 : 45}%"></i></div><div class="td-sub">${a.status === '已办结' ? '已完成复核归档' : '最近更新：今天 10:18'}</div></td><td>${a.deadline}</td><td>${a.status === '临期' ? badge('需催办','red') : badge(a.priority === '重点' ? '重点关注' : '正常', a.priority === '重点' ? 'gold' : 'green')}</td><td><button class="btn btn-sm btn-secondary" onclick="openModal('handling','${i}')">查看详情</button></td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderPermissions() {
  const permissions = ['运营工作台','帖子审核','评论审核','事项分办','办理管理','整改台账','用户与组织','角色权限','数据统计','匿名溯源','操作日志','安全运维'];
  const role = state.activePermissionRole;
  const can = { content: ['运营工作台','帖子审核','评论审核','栏目管理','公告管理','政策与问答'], dispatch: ['运营工作台','事项分办','办理管理','整改台账','数据统计','操作日志'], platform: permissions, handler: ['运营工作台','办理管理','数据统计'], leader: ['运营工作台','数据统计','办理管理'] }[role];
  return `${pageHead('角色与权限','角色决定可执行的业务动作，数据范围决定可见的组织和事项；同一用户可拥有多个角色。', `<button class="btn btn-secondary" onclick="showToast('权限变更已保存至草稿')">${icon('save')}保存配置</button><button class="btn btn-primary" onclick="openModal('role')">${icon('plus')}新建角色</button>`)}<div class="permission-grid"><section class="card card-pad"><div class="card-title">角色列表 <span class="badge">5 个角色</span></div><div class="role-list">${Object.entries(roleInfo).map(([id, info]) => `<button class="role-item ${role === id ? 'active' : ''}" onclick="setState({activePermissionRole:'${id}'})"><span>${info.label}</span><span class="badge">${id === 'platform' ? '全量' : id === 'leader' ? '只读' : '已配置'}</span></button>`).join('')}</div><div class="notice" style="margin-top:16px;margin-bottom:0">${icon('info')}<div><strong>权限模型</strong><p>菜单、操作、数据范围三层同时校验，前端隐藏不作为授权依据。</p></div></div></section><section class="card"><div class="card-title card-pad" style="padding-bottom:0">${roleInfo[role].label} · 操作权限 <span class="badge blue">${can.length} 项已授权</span></div><div class="check-row header"><span>功能模块</span><span>查看</span><span>办理</span><span>管理</span></div>${permissions.map(name => `<div class="check-row"><label>${name}</label><span><input type="checkbox" checked ${can.includes(name) ? '' : 'disabled'}></span><span><input type="checkbox" ${can.includes(name) ? 'checked' : ''}></span><span><input type="checkbox" ${role === 'platform' || (role === 'content' && ['帖子审核','评论审核'].includes(name)) ? 'checked' : ''}></span></div>`).join('')}</section></div>`;
}

function renderStatistics() {
  return `${pageHead(state.role === 'leader' ? '专题统计' : '综合统计','按时间、板块、组织、部门和事项状态查看趋势，并导出权限范围内的结果。', `<button class="btn btn-secondary" onclick="showToast('报表已生成')">${icon('file-chart-column')}生成报表</button><button class="btn btn-primary" onclick="showToast('导出任务已提交')">${icon('download')}导出结果</button>`)}<div class="filters"><select class="select"><option>近 30 天</option><option>本季度</option><option>今年以来</option></select><select class="select"><option>全部板块</option><option>建言献策</option><option>心声诉求</option><option>业务交流</option></select><select class="select"><option>全部组织</option><option>省社本级</option><option>市州社</option><option>直属企业</option></select><button class="btn btn-secondary" onclick="showToast('统计口径已更新')">${icon('list-filter')}应用筛选</button></div><div class="grid grid-4"><div class="card stat"><div class="stat-label">发帖量</div><div class="stat-value">286</div><div class="stat-note">较同期 +12.4%</div></div><div class="card stat info"><div class="stat-label">事项办理量</div><div class="stat-value">142</div><div class="stat-note">其中重点事项 26</div></div><div class="card stat good"><div class="stat-label">按期办结率</div><div class="stat-value">93.6%</div><div class="stat-note">平均办理 5.6 个工作日</div></div><div class="card stat warn"><div class="stat-label">逾期事项</div><div class="stat-value">2</div><div class="stat-note">较上周减少 1 项</div></div></div><div class="split-layout"><section class="card"><div class="card-title card-pad" style="padding-bottom:0">发帖与办理趋势 <span class="badge blue">2026 年</span></div><div class="chart">${[56,65,72,68,84,91,78,95].map((h, i) => `<div class="bar" style="height:${h}%"><span>${['2月','3月','4月','5月','6月','7月','8月','9月'][i]}</span></div>`).join('')}</div></section><aside class="card card-pad"><div class="card-title">问题类型分布</div>${[['建言献策',38,'var(--brand)'],['心声诉求',27,'var(--gold)'],['业务交流',22,'var(--blue)'],['其他',13,'var(--green)']].map(x => `<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span>${x[0]}</span><strong>${x[1]}%</strong></div><div class="progress"><i style="width:${x[1]}%;background:${x[2]}"></i></div></div>`).join('')}</aside></div>`;
}

function simplePage(title, desc, body, actions = '') { return `${pageHead(title, desc, actions)}${body}`; }
function renderUsers() { return simplePage('用户与组织','维护用户状态、所属组织和在职信息，组织调整不会改变历史事项留痕。', `<div class="filters"><input class="input" placeholder="搜索姓名、手机号或组织"><select class="select"><option>全部状态</option><option>正常</option><option>待审核</option><option>停用</option></select><button class="btn btn-secondary" onclick="showToast('筛选条件已应用')">${icon('list-filter')}筛选</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>用户</th><th>所属组织</th><th>角色</th><th>状态</th><th>最近登录</th><th>操作</th></tr></thead><tbody>${[['张婧','省社办公室','平台管理员','正常','今天 09:12'],['周凯','合作指导处','分办管理员','正常','今天 08:42'],['李倩','经济发展处','承办负责人','正常','昨天 17:26'],['王敏','荆州市供销社','职工','待审核','未登录']].map((u,i) => `<tr><td><div class="td-title">${u[0]}</div><div class="td-sub">138****20${26+i}</div></td><td>${u[1]}</td><td>${badge(u[2], u[2] === '平台管理员' ? 'gold' : 'blue')}</td><td>${badge(u[3], u[3] === '正常' ? 'green' : 'gold')}</td><td>${u[4]}</td><td><button class="btn btn-sm btn-secondary" onclick="showToast('已打开用户详情')">查看</button></td></tr>`).join('')}</tbody></table></div>`, `<button class="btn btn-primary" onclick="showToast('用户邀请链接已生成')">${icon('user-plus')}邀请用户</button>`); }
function renderEcho() { return simplePage('回音壁发布','汇总共性问题答复、典型办理结果和整改成效，按公开范围发布。', `<div class="grid grid-3">${[['待发布',3,'gold'],['已发布',34,'green'],['已撤回',2,'blue']].map(x => `<div class="card stat ${x[2] === 'gold' ? 'warn' : x[2] === 'green' ? 'good' : 'info'}"><div class="stat-label">${x[0]}</div><div class="stat-value">${x[1]}</div><div class="stat-note">本月新增 ${x[2] === 'gold' ? 2 : 6} 项</div></div>`).join('')}</div><div class="card card-pad" style="margin-top:16px"><div class="card-title">公开答复草稿 <button class="btn btn-sm btn-primary" onclick="openModal('echo')">${icon('plus')}新建公开成果</button></div>${['关于办公耗材配送周期问题的答复','县域冷链项目验收资料标准化做法','基层网点回收设备维修响应整改成效'].map((x,i) => `<div class="queue-item" style="margin-bottom:10px"><span class="queue-icon">${icon('badge-check')}</span><div><strong>${x}</strong><p>来源事项 SX-202609-0${68+i} · ${i === 0 ? '待发布' : '已发布'}</p></div><button class="btn btn-sm btn-secondary" onclick="openModal('echo')">${i === 0 ? '编辑发布' : '查看'}</button></div>`).join('')}</div>`); }
function renderSimpleList(title, desc, label, action) { return simplePage(title, desc, `<div class="card empty">${icon('settings-2')}<h3>${label}</h3><p>该工作台已按当前角色加载数据范围，原型中保留了查询、编辑和审计入口。</p><button class="btn btn-primary" onclick="showToast('${action}')">${icon('plus')}新增配置</button></div>`); }

function renderModal() {
  if (!state.modal) return '';
  const { type, id } = state.modal;
  if (type === 'review') {
    const row = state.reviewRows[Number(id)] || state.reviewRows[0];
    return `<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h3>审核内容详情</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div><div class="modal-body"><div class="post-meta" style="color:var(--muted);font-size:12px">${row.id} · ${row.author} · ${row.time} ${badge(row.risk, row.risk === '低风险' ? 'green' : 'red')}</div><h3 style="font-size:20px;line-height:1.5;margin:13px 0">${row.title}</h3><p style="line-height:1.85;color:var(--muted)">直属企业掌握的采购需求与基层网点的供应信息存在时间差，建议由相关处室牵头建立按周更新的农产品供需清单，统一品类、数量、交付区域和有效期等字段。</p><div class="notice" style="margin-top:18px">${icon('scan-text')}<div><strong>风险识别结果</strong><p>${row.risk === '低风险' ? '未发现敏感词和疑似个人信息。' : '命中个人信息或敏感规则，建议人工核验后再决定是否公开。'}</p></div></div></div><div class="modal-foot"><button class="btn btn-secondary" onclick="closeModal()">取消</button><button class="btn btn-danger" onclick="markReviewed(${Number(id)},'reject')">驳回</button><button class="btn btn-secondary" onclick="markReviewed(${Number(id)},'return')">退回修改</button><button class="btn btn-primary" onclick="markReviewed(${Number(id)},'approve')">审核通过</button></div></div></div>`;
  }
  if (type === 'assignment') return `<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h3>${id === '' ? '登记办理事项' : '事项分办详情'}</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div><div class="modal-body"><div class="field"><label>事项标题</label><input class="input" value="农产品产销信息共享机制" /></div><div class="grid grid-2"><div class="field"><label>主办部门</label><select class="select"><option>合作指导处</option><option>经济发展处</option><option>办公室</option></select></div><div class="field"><label>协办部门</label><select class="select"><option>信息中心</option><option>机关服务中心</option><option>财务处</option></select></div></div><div class="grid grid-2"><div class="field"><label>事项复杂度</label><select class="select"><option>一般事项 · 7 个工作日</option><option>复杂事项 · 15 个工作日</option></select></div><div class="field"><label>反馈方式</label><select class="select"><option>公开答复</option><option>私密回复</option><option>阶段反馈</option></select></div></div><div class="field"><label>办理要求</label><textarea class="textarea" placeholder="填写办理要求、反馈口径和附件要求"></textarea></div></div><div class="modal-foot"><button class="btn btn-secondary" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="closeModal();showToast('事项已保存并发送至主办部门')">${icon('send')}保存并分办</button></div></div></div>`;
  if (type === 'handling') return `<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h3>事项办理详情</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div><div class="modal-body"><div class="card-title"><span>农产品产销信息共享机制</span>${badge('办理中','gold')}</div><div class="td-sub" style="margin-bottom:18px">SX-202609-081 · 主办：合作指导处 · 截止：2026-09-18</div><div class="timeline"><div class="timeline-item"><span class="timeline-dot">${icon('check')}</span><div><strong>事项已登记并完成分办</strong><p>分办管理员：张婧 · 2026-09-08 14:20</p></div><span class="timeline-time">已完成</span></div><div class="timeline-item"><span class="timeline-dot">${icon('activity')}</span><div><strong>承办部门更新阶段进展</strong><p>已完成三家直属企业需求字段梳理，待补充县级社数据。</p></div><span class="timeline-time">今天 10:18</span></div><div class="timeline-item"><span class="timeline-dot">${icon('clock-3')}</span><div><strong>下一节点：提交答复草稿</strong><p>办理要求：说明采纳情况、具体措施和计划完成时间。</p></div><span class="timeline-time">待处理</span></div></div></div><div class="modal-foot"><button class="btn btn-secondary" onclick="closeModal()">关闭</button><button class="btn btn-primary" onclick="closeModal();showToast('催办提醒已发送')">${icon('bell-ring')}发送催办</button></div></div></div>`;
  return `<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h3>配置操作</h3><button class="icon-btn" onclick="closeModal()">${icon('x')}</button></div><div class="modal-body"><p style="line-height:1.8;color:var(--muted)">该操作会根据当前角色的数据范围写入审计日志，确认后立即生效。</p><div class="field"><label>名称</label><input class="input" placeholder="请输入名称"></div></div><div class="modal-foot"><button class="btn btn-secondary" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="closeModal();showToast('配置已保存')">保存</button></div></div></div>`;
}

function renderPage() {
  if (state.page === 'dialog-messages') return window.PrivateChat?.page() || '';
  if (window.ManagementWorkflow) return window.ManagementWorkflow.page(state.page);
  const pages = {
    dashboard: renderDashboard, review: renderReview, assignments: renderAssignments, handling: renderHandling,
    permissions: renderPermissions, statistics: renderStatistics, users: renderUsers, echo: renderEcho,
    comments: () => renderSimpleList('评论审核', '处理评论、回复和举报内容，记录违规原因和处置结果。', '评论审核队列', '已进入评论审核队列'),
    sensitive: () => renderSimpleList('敏感信息识别', '维护敏感词分类、匹配规则和疑似个人信息处置方式。', '敏感规则库', '已打开规则新增表单'),
    categories: () => renderSimpleList('栏目管理', '维护论坛板块的名称、排序、状态和发帖规则。', '栏目板块', '已打开栏目新增表单'),
    announcements: () => renderSimpleList('公告管理', '新增、预览、发布、撤回和定时发布平台公告。', '公告内容', '已打开公告新增表单'),
    policy: () => renderSimpleList('政策与问答', '维护政策解读、常见问题、标准答复和整改公开内容。', '政策与问答', '已打开政策新增表单'),
    rectifications: () => renderSimpleList('整改台账', '登记整改事项、责任单位、措施、时限和验收要求。', '整改台账', '已打开整改登记表单'),
    settings: () => renderSimpleList('系统设置', '配置平台名称、发帖规则、审核机制、附件限制和办理时限。', '系统参数', '已打开参数配置表单'),
    tasks: () => renderHandling(), drafts: () => renderHandling(), notices: () => renderHandling(),
  };
  return (pages[state.page] || renderDashboard)();
}

function refineOperationsWorkbench() {
  document.querySelector('.wb-profile .wb-mini-stats')?.remove();

  const profile = document.querySelector('.wb-profile');
  const quickEntrances = document.querySelector('.wb-left > .wb-side-section:not(.wb-scope-note)');
  const summarySection = document.querySelector('.wb-summary');
  if (!profile || !summarySection || !window.PrototypeData) return;

  quickEntrances?.remove();
  summarySection.classList.add('wb-summary-results');

  const data = PrototypeData.read();
  const affairs = data.affairs || [];
  const pendingTotal = [...document.querySelectorAll('.wb-queue-count')]
    .reduce((total, item) => total + (Number(item.textContent) || 0), 0);
  const processing = affairs.filter((item) => item.status === '处理中').length;
  const replied = affairs.filter((item) => item.status === '已回复').length;
  const parseStatusDate = (value) => {
    const raw = String(value || '').trim();
    if (!raw) return null;
    let normalized = raw
      .replace(/年/g, '-')
      .replace(/月/g, '-')
      .replace(/日/g, '')
      .replace(/\//g, '-');
    if (/^\d{2}-\d{1,2}(?=\s|$)/.test(normalized)) normalized = `${new Date().getFullYear()}-${normalized}`;
    const parsed = new Date(normalized.includes('T') ? normalized : normalized.replace(/\s+/, 'T'));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };
  const statusDuration = (item) => {
    const source = item.status === '待处理'
      ? item.createdAt || item.reviewedAt
      : item.classifiedAt || item.processingAt || item.updatedAt || item.createdAt || item.reviewedAt;
    const start = parseStatusDate(source);
    if (!start) return { days: null, label: '时长未记录', date: '起算时间未记录', longRunning: false };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const days = Math.max(0, Math.floor((today - start) / 86400000));
    const date = `${item.status === '待处理' ? '生成于' : '进入处理'} ${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
    return { days, label: `${item.status} ${days} 天`, date, longRunning: days >= 7 };
  };
  const openAffairs = affairs.filter((item) => ['待处理', '处理中'].includes(item.status));
  const longRunning = openAffairs.filter((item) => statusDuration(item).longRunning).length;

  summarySection.innerHTML = `
    <button type="button" class="wb-summary-card is-pending" onclick="document.getElementById('work-queue')?.scrollIntoView({ behavior: 'smooth', block: 'start' })">
      <span class="wb-summary-label">待我处理 <i class="metric-help" tabindex="0" data-tip="待我处理 = 内容审核 + 待处理事项 + 待公开反馈 + 评论审核 + 举报核查 + 用户审核。处理中事项不重复计入。" aria-label="待我处理统计口径">${icon('info')}</i></span>
      <strong>${pendingTotal}</strong><small>6 类任务，点击查看</small>
    </button>
    <button type="button" class="wb-summary-card is-processing" data-action="nav" data-id="handler-dispatch">
      <span class="wb-summary-label">处理中事项 <i class="metric-help" tabindex="0" data-tip="已完成分类并进入办理，但尚未形成回复的事项。" aria-label="处理中事项统计口径">${icon('info')}</i></span>
      <strong>${processing}</strong><small>继续办理或形成回复</small>
    </button>
    <button type="button" class="wb-summary-card is-long-running" data-action="nav" data-id="handler-dispatch">
      <span class="wb-summary-label">长时间未回复 <i class="metric-help" tabindex="0" data-tip="待处理事项从生成时间起算；处理中事项从完成分类或进入处理的时间起算；持续 7 天及以上且尚未回复的事项。" aria-label="长时间未回复统计口径">${icon('info')}</i><em class="wb-summary-flag">需关注</em></span>
      <strong>${longRunning}</strong><small>持续 7 天及以上</small>
    </button>
    <button type="button" class="wb-summary-card is-replied" data-action="nav" data-id="handler-dispatch">
      <span class="wb-summary-label">已回复事项 <i class="metric-help" tabindex="0" data-tip="已形成处理结果并完成回复的事项，是已完成工作，不计入待我处理。" aria-label="已回复事项统计口径">${icon('info')}</i></span>
      <strong>${replied}</strong><small>已形成处理结果</small>
    </button>`;

  document.querySelectorAll('.wb-kicker').forEach((item) => item.remove());
  document.querySelectorAll('.wb-focus-row').forEach((row) => {
    const affair = affairs.find((item) => String(item.id) === String(row.dataset.id));
    if (!affair) return;
    const duration = statusDuration(affair);
    const nextAction = affair.status === '待处理'
      ? '完成分类或归档'
      : affair.draft ? '核对并发送回复' : '整理结论并形成回复';
    const status = row.querySelector(':scope > .badge');
    if (!status) return;
    row.classList.toggle('is-long-running', duration.longRunning);
    status.insertAdjacentHTML('beforebegin', `
      <span class="wb-focus-duration ${duration.longRunning ? 'is-long-running' : ''}"><strong>${duration.label}</strong><small>${duration.date}</small></span>
      <span class="wb-focus-next"><strong>下一步</strong><small>${nextAction}</small></span>`);
  });
}

function render() {
  const sidebarScroll = document.querySelector('.sidebar')?.scrollTop || 0;
  document.getElementById('app').innerHTML = renderShell();
  const brandSubtitle = document.querySelector('.topbar-brand small');
  if (brandSubtitle) brandSubtitle.textContent = '湖北省供销合作总社职工交流平台测试';
  const globalSearch = document.querySelector('.global-search-input');
  if (globalSearch) globalSearch.placeholder = '搜索事项、帖子、用户或编号';
  refineOperationsWorkbench();
  document.querySelector('.sidebar').scrollTop = sidebarScroll;
  if (window.lucide) window.lucide.createIcons();
}
render();
