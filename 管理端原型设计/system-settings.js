(function () {
  const read = () => PrototypeData.read();
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const now = () => new Date().toLocaleString('sv-SE', { hour12: false });
  const ui = { filters: {}, selectedOrg: '', selectedType: '', collapsed: new Set(), menuOpen: '', tab: 'operation', pages: {} };
  const action = (label, name, id = '', kind = 'secondary') => `<button type="button" class="btn btn-sm btn-${kind}" data-sys="${name}" data-id="${esc(id)}">${label}</button>`;
  const field = (label, key, value = '', type = 'text') => `<label class="field"><span>${label}</span><input class="input" id="sys-${key}" type="${type}" value="${esc(value)}"></label>`;
  const select = (label, key, values, current) => `<label class="field"><span>${label}</span><select class="select" id="sys-${key}">${values.map(([value, text]) => `<option value="${esc(value)}" ${value === current ? 'selected' : ''}>${esc(text)}</option>`).join('')}</select></label>`;
  const value = (key) => document.getElementById(`sys-${key}`)?.value.trim() || '';
  const status = (ok, yes = '正常', no = '停用') => `<span class="org-tag ${ok ? 'is-active' : 'is-inactive'}">${ok ? yes : no}</span>`;
  const controls = (title, buttons) => `<div class="sys-section-head"><h2>${title}</h2><div class="sys-actions">${buttons}</div></div>`;
  const table = (heads, rows) => `<div class="sys-table-scroll"><table class="data-table sys-table"><thead><tr>${heads.map((head) => `<th>${head}</th>`).join('')}</tr></thead><tbody>${rows.join('') || `<tr><td colspan="${heads.length}" class="empty">暂无符合条件的记录</td></tr>`}</tbody></table></div>`;
  const filter = (key, label, options) => options ? `<label class="sys-filter"><span>${label}</span><select class="select" data-filter="${key}"><option value="">全部</option>${options.map((option) => `<option value="${esc(option)}" ${ui.filters[key] === option ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select></label>` : `<label class="sys-filter"><span>${label}</span><input class="input" data-filter="${key}" placeholder="请输入" value="${esc(ui.filters[key] || '')}"></label>`;
  const filters = (fields, scope) => `<form class="sys-filters" data-search="${scope}">${fields.map(([key, label, options]) => filter(key, label, options)).join('')}<div class="sys-filter-actions">${action('重置', 'reset', scope)}<button class="btn btn-sm btn-primary" type="submit">搜索</button></div></form>`;
  const pagination = (items, key) => { const page = Math.max(1, Math.min(ui.pages[key] || 1, Math.ceil(items.length / 10) || 1)); ui.pages[key] = page; return { rows: items.slice((page - 1) * 10, page * 10), foot: `<div class="sys-pagination"><span>共 ${items.length} 条记录</span><div>${action('上一页', 'page', `${key}:${page - 1}`)}<span>${page} / ${Math.ceil(items.length / 10) || 1}</span>${action('下一页', 'page', `${key}:${page + 1}`)}</div></div>` }; };
  const mark = (data, subject, detail) => { data.audit.unshift({ action: subject, target: detail, detail, role: roleInfo[state.role].label, at: now() }); PrototypeData.save(data); closeModal(); showToast(`${subject}已更新`); };
  const test = (text, query) => !query || String(text ?? '').toLocaleLowerCase().includes(query.toLocaleLowerCase());
  const downloadCsv = (name, columns, rows) => { const csv = '\uFEFF' + [columns.map((column) => column.label).join(','), ...rows.map((row) => columns.map((column) => `"${String(row[column.key] ?? '').replace(/"/g, '""')}"`).join(','))].join('\r\n'); const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); };
  function visibleUsers(data) {
    const nodes = data.organizations || [], org = nodes.find((node) => node.id === ui.selectedOrg), descendants = new Set(org ? [org.id] : []);
    for (let i = 0; i < nodes.length; i++) for (const node of nodes) if (descendants.has(node.parentId)) descendants.add(node.id);
    const names = nodes.filter((node) => descendants.has(node.id)).map((node) => node.name);
    return data.accounts.filter((user) => (!org || names.includes(user.department)) && test(user.id, ui.filters.userAccount) && test(user.name, ui.filters.userName) && test(user.phone, ui.filters.userPhone) && (!ui.filters.userStatus || (user.enabled === false ? '停用' : user.status === 'pending' ? '待审核' : '正常') === ui.filters.userStatus));
  }
  const modal = (title, body, save = '') => `<div class="modal-backdrop" data-sys="close"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header class="modal-head"><h3>${esc(title)}</h3>${action('关闭', 'close')}</header><div class="modal-body">${body}</div><footer class="modal-foot">${action('取消', 'close')}${save}</footer></section></div>`;
  const opts = (items, selected, blank = '请选择') => `<option value="">${blank}</option>${items.map(([id, label]) => `<option value="${esc(id)}" ${selected === id ? 'selected' : ''}>${esc(label)}</option>`).join('')}`;

  function organizationPicker(nodes) {
    const list = [];
    function walk(parentId, level = 0) {
      for (const node of nodes.filter((item) => item.parentId === parentId).sort((a, b) => a.sort - b.sort)) {
        list.push(`<button type="button" class="sys-tree-item ${ui.selectedOrg === node.id ? 'active' : ''}" style="--depth:${Math.min(level, 7)}" data-sys="org-select" data-id="${esc(node.id)}">${icon('folder')}<span>${esc(node.name)}</span></button>`);
        walk(node.id, level + 1);
      }
    }
    walk(null);
    return `<aside class="sys-org-pane"><div class="sys-pane-title">所属组织</div><button type="button" class="sys-tree-item ${!ui.selectedOrg ? 'active' : ''}" data-sys="org-select" data-id="">全部组织</button><div class="sys-org-scroll">${list.join('')}</div></aside>`;
  }
  function users() {
    const data = read(), nodes = data.organizations || [], records = visibleUsers(data);
    const page = pagination(records, 'users');
    return pageHead('用户管理', '按组织查看职工账号；注册审批在审核管理中完成。') + `<div class="sys-user-layout">${organizationPicker(nodes)}<div class="sys-user-main">${filters([['userAccount', '用户账号'], ['userName', '用户名称'], ['userPhone', '手机号'], ['userStatus', '状态', ['正常', '停用', '待审核']]], 'users')}<section class="sys-section">${controls('用户列表', action(`${icon('download')} 导出`, 'user-export') + action(`${icon('upload')} 导入`, 'user-import') + action('删除', 'user-delete') + action(`${icon('plus')} 新增`, 'user-new', '', 'primary') + action('用户审核', 'user-review'))}${table(['选择', '用户账号', '真实姓名', '昵称', '头像', '所属组织', '手机号', '状态', '创建时间', '操作'], page.rows.map((user) => `<tr><td><input type="checkbox" aria-label="选择${esc(user.id)}"></td><td>${esc(user.id)}</td><td><strong>${esc(user.name)}</strong></td><td>${esc(user.nickname || '暂无')}</td><td>${user.avatar ? '<img class="sys-avatar" src="' + esc(user.avatar) + '" alt="头像">' : '暂无'}</td><td>${esc(user.department)}</td><td>${esc(user.phone || '暂无')}</td><td>${user.status === 'pending' ? status(false, '', '待审核') : status(user.enabled !== false, '启用', '停用')}</td><td>${esc(user.createdAt || user.submitted || '未记录')}</td><td class="sys-row-actions">${action('编辑', 'user-edit', user.id, 'ghost')}${action(user.enabled === false ? '启用' : '停用', 'user-toggle', user.id, 'ghost')}${action('更多', 'user-detail', user.id, 'ghost')}</td></tr>`))}${page.foot}</section></div></div>`;
  }
  function roles() {
    const records = read().roles.filter((role) => test(role.name, ui.filters.roleName) && test(role.key, ui.filters.roleKey) && (!ui.filters.roleStatus || (role.enabled ? '启用' : '停用') === ui.filters.roleStatus)).sort((a, b) => a.sort - b.sort);
    const page = pagination(records, 'roles');
    return pageHead('角色管理', '角色配置用于原型演示；正式授权需在服务端校验。') + filters([['roleName', '角色名称'], ['roleKey', '权限字符'], ['roleStatus', '状态', ['启用', '停用']]], 'roles') + `<section class="sys-section">${controls('角色列表', action(`${icon('download')} 导出`, 'role-export') + action('删除', 'role-delete') + action('新增', 'role-new', '', 'primary'))}${table(['选择', '角色名称', '权限字符', '数据权限', '排序', '状态', '创建时间', '操作'], page.rows.map((role) => `<tr><td><input type="checkbox" aria-label="选择${esc(role.name)}"></td><td><strong>${esc(role.name)}</strong></td><td><code class="sys-code">${esc(role.key)}</code></td><td>${esc(role.scope)}</td><td>${esc(role.sort)}</td><td>${status(role.enabled, '启用', '停用')}</td><td>${esc(role.createdAt)}</td><td class="sys-row-actions">${action('编辑', 'role-edit', role.id, 'ghost')}${action('更多', 'role-permission', role.id, 'ghost')}</td></tr>`))}${page.foot}</section>`;
  }
  function positions() {
    const records = [
      ['ceo', '岗位类别', '董事长', 1],
      ['se', '岗位类别', '项目经理', 2],
      ['hr', '岗位类别', '人力资源', 3],
      ['user', '岗位类别', '普通员工', 4]
    ];
    return pageHead('岗位管理', '维护组织岗位编码、名称、排序和启用状态。') + filters([['positionCode', '岗位编码']], 'positions') + `<section class="sys-section">${controls('岗位列表', action(`${icon('download')} 导出`, 'position-export') + action('删除', 'position-delete') + action('新增', 'position-new', '', 'primary'))}${table(['选择', '岗位编码', '类别编码', '岗位名称', '排序', '状态', '创建时间', '操作'], records.map(([code, category, name, sort]) => `<tr><td><input type="checkbox" aria-label="选择${esc(code)}"></td><td>${esc(code)}</td><td>${esc(category)}</td><td><strong>${esc(name)}</strong></td><td>${sort}</td><td>${status(true, '正常', '停用')}</td><td>2026-09-15 05:35:04</td><td class="sys-row-actions">${action('编辑', 'position-edit', code, 'ghost')}${action('删除', 'position-delete', code, 'ghost')}</td></tr>`))}</section>`;
  }
  function roleMenuEditor(data, role) {
    const defaultRoots = { platform: data.menus.map((item) => item.id), content: ['menu-dashboard', 'menu-review', 'menu-post', 'menu-comment'], dispatch: ['menu-dashboard', 'menu-affairs', 'menu-assign'], handler: ['menu-dashboard'], leader: ['menu-dashboard'] };
    const selected = new Set(role?.menuIds || defaultRoots[role?.id] || []);
    const rows = [];
    function walk(parentId, depth = 0) {
      for (const item of data.menus.filter((menu) => menu.parentId === parentId).sort((a, b) => a.sort - b.sort)) {
        const hasChildren = data.menus.some((menu) => menu.parentId === item.id);
        rows.push(`<tr data-role-menu-row data-menu-id="${esc(item.id)}" data-parent-id="${esc(item.parentId || '')}" data-depth="${depth}"><td><div class="role-menu-name" style="--depth:${Math.min(depth, 7)}">${hasChildren ? `<button type="button" class="role-menu-toggle" data-sys="role-menu-toggle" data-id="${esc(item.id)}" aria-label="收起${esc(item.name)}">${icon('chevron-down')}</button>` : '<span class="role-menu-spacer"></span>'}<label><input type="checkbox" class="sys-role-menu" value="${esc(item.id)}" ${selected.has(item.id) ? 'checked' : ''}> <span>${esc(item.name)}</span></label></div></td><td>${icon(item.icon || 'minus')}</td><td>${esc(item.type)}</td><td><code>${esc(item.permission || '—')}</code></td></tr>`);
        if (hasChildren) walk(item.id, depth + 1);
      }
    }
    walk(null);
    return `<section class="role-permission-editor"><div class="role-permission-heading"><strong>菜单权限</strong><span>角色可访问的管理端目录与页面</span></div><div class="role-permission-tools"><div class="role-node-mode"><label><input type="radio" name="role-node-mode" value="linked" ${role?.nodeMode !== 'independent' ? 'checked' : ''}>节点关联</label><label><input type="radio" name="role-node-mode" value="independent" ${role?.nodeMode === 'independent' ? 'checked' : ''}>节点独立</label></div><span class="role-selected-count">已选中 <strong id="role-selected-count">${selected.size}</strong> 个节点</span><div class="role-tree-actions">${action('收起', 'role-menu-collapse')}${action('展开', 'role-menu-expand')}</div></div><div class="role-menu-table-wrap"><table class="data-table role-menu-table"><thead><tr><th>菜单名称</th><th>图标</th><th>类型</th><th>权限标识</th></tr></thead><tbody>${rows.join('')}</tbody></table></div></section>`;
  }
  function dataScopeTree(data, selectedIds) {
    const selected = new Set(selectedIds || []), rows = [];
    function walk(parentId, depth = 0) {
      for (const node of data.organizations.filter((item) => item.parentId === parentId).sort((a, b) => a.sort - b.sort)) {
        rows.push(`<label class="data-scope-node" style="--depth:${Math.min(depth, 7)}"><input type="checkbox" class="sys-scope-org" value="${esc(node.id)}" ${selected.has(node.id) ? 'checked' : ''}>${icon('building-2')}<span>${esc(node.name)}</span></label>`);
        walk(node.id, depth + 1);
      }
    }
    walk(null); return rows.join('');
  }
  function roleAssignmentEditor(data, role) {
    const users = data.accounts.filter((user) => user.status === 'approved' && user.enabled !== false);
    const rows = users.map((user) => { const assigned = user.assignedRoles?.includes(role.id); return `<tr data-role-user-row data-search-text="${esc(`${user.id} ${user.name} ${user.phone}`.toLocaleLowerCase())}"><td><input type="checkbox" class="sys-assignment" value="${esc(user.id)}" ${assigned ? 'checked' : ''} aria-label="选择${esc(user.name)}"></td><td><strong>${esc(user.id)}</strong></td><td>${esc(user.name)}</td><td>${esc(user.phone?.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') || '未填写')}</td><td>${assigned ? '<span class="role-user-state is-assigned">已授权</span>' : '<span class="role-user-state">待加入</span>'}</td></tr>`; }).join('');
    const assignedCount = users.filter((user) => user.assignedRoles?.includes(role.id)).length;
    return `<div class="role-assignment"><div class="role-assignment-summary"><div><span>当前角色</span><strong>${esc(role.name)}</strong><code>${esc(role.key)}</code></div><span class="role-selected-count">已选 <strong id="role-user-count">${assignedCount}</strong> 人</span></div><label class="role-user-search">${icon('search')}<input class="input" id="role-user-search" placeholder="搜索用户账号、昵称或手机号"></label><div class="role-user-table-wrap"><table class="data-table role-user-table"><thead><tr><th><input type="checkbox" id="role-user-check-all" aria-label="全选当前用户"></th><th>用户账号</th><th>用户昵称</th><th>手机号</th><th>授权状态</th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="empty">暂无可分配用户</td></tr>'}</tbody></table></div><p class="muted">勾选用户即加入当前角色；取消勾选后，确认保存将取消该用户的角色授权。</p></div>`;
  }
  function menus() {
    const nodes = read().menus, query = ui.filters.menuName, active = ui.filters.menuStatus, visible = ui.filters.menuVisible;
    const matching = new Set();
    if (query || active || visible) for (const node of nodes) {
      if (!test(node.name, query) || (active && (node.enabled ? '正常' : '停用') !== active) || (visible && (node.visible ? '显示' : '隐藏') !== visible)) continue;
      let current = node;
      while (current && !matching.has(current.id)) { matching.add(current.id); current = nodes.find((item) => item.id === current.parentId); }
    }
    const rows = [];
    function walk(parentId, depth = 0) {
      for (const node of nodes.filter((item) => item.parentId === parentId).sort((a, b) => a.sort - b.sort)) {
        if ((query || active || visible) && !matching.has(node.id)) continue;
        const children = nodes.some((item) => item.parentId === node.id), expanded = !!(query || active || visible) || !ui.collapsed.has(node.id);
        rows.push(`<tr><td><div class="sys-tree-name" style="--depth:${Math.min(depth, 6)}">${children ? action(icon(expanded ? 'chevron-down' : 'chevron-right'), 'menu-collapse', node.id, 'ghost') : '<span class="sys-tree-spacer"></span>'}<strong>${esc(node.name)}</strong></div></td><td>${icon(node.icon || 'minus')}</td><td>${esc(node.sort)}</td><td>${esc(node.type)}</td><td><code>${esc(node.permission || '—')}</code></td><td>${esc(node.path)}</td><td>${status(node.enabled)}</td><td>${status(node.visible, '显示', '隐藏')}</td><td>${esc(node.createdAt)}</td><td class="sys-row-actions">${action('编辑', 'menu-edit', node.id, 'ghost')}${action('新增下级', 'menu-child', node.id, 'ghost')}${action('删除', 'menu-delete', node.id, 'ghost')}</td></tr>`);
        if (children && expanded) walk(node.id, depth + 1);
      }
    }
    walk(null);
    return pageHead('菜单管理', '维护菜单目录与权限标识；原型导航及访问授权不随配置自动改变。') + filters([['menuName', '菜单名称'], ['menuStatus', '菜单状态', ['正常', '停用']], ['menuVisible', '显示状态', ['显示', '隐藏']]], 'menus') + `<section class="sys-section">${controls('菜单列表', action('收起', 'menu-collapse-all') + action('展开', 'menu-expand-all') + action(`${icon('plus')} 新增菜单`, 'menu-new', '', 'primary'))}${table(['菜单名称', '图标', '排序', '组件类型', '权限标识', '组件路径', '状态', '显示', '创建时间', '操作'], rows)}</section>`;
  }
  function dictionaries() {
    const data = read();
    if (!data.dictionaryTypes.some((item) => item.id === ui.selectedType)) ui.selectedType = data.dictionaryTypes[0]?.id || '';
    const types = pagination(data.dictionaryTypes.filter((item) => test(item.name, ui.filters.dictName) && test(item.key, ui.filters.dictKey)), 'types');
    const entries = pagination(data.dictionaryEntries.filter((item) => item.typeId === ui.selectedType && test(item.label, ui.filters.entryLabel)), 'entries');
    return pageHead('字典管理', '选择左侧字典类型后维护其数据项；修改原型配置不会直接改变业务规则。') + `<div class="sys-dictionary"><div>${filters([['dictName', '字典名称'], ['dictKey', '字典类型']], 'types')}<section class="sys-section">${controls('字典类型列表', action(`${icon('plus')} 新增`, 'type-new', '', 'primary'))}${table(['字典名称', '字典类型', '备注', '操作'], types.rows.map((item) => `<tr class="${item.id === ui.selectedType ? 'sys-selected-row' : ''}"><td><button type="button" class="sys-select-link" data-sys="type-select" data-id="${esc(item.id)}">${esc(item.name)}</button></td><td><code>${esc(item.key)}</code></td><td>${esc(item.note)}</td><td class="sys-row-actions">${action('编辑', 'type-edit', item.id, 'ghost')}${action('删除', 'type-delete', item.id, 'ghost')}</td></tr>`))}${types.foot}</section></div><div>${filters([['entryLabel', '字典标签']], 'entries')}<section class="sys-section">${controls(`${esc(data.dictionaryTypes.find((item) => item.id === ui.selectedType)?.name || '字典数据')} · 数据列表`, action(`${icon('plus')} 新增`, 'entry-new', '', 'primary'))}${table(['字典标签', '字典键值', '排序', '备注', '操作'], entries.rows.map((item) => `<tr><td>${esc(item.label)}</td><td><code>${esc(item.value)}</code></td><td>${esc(item.sort)}</td><td>${esc(item.note)}</td><td class="sys-row-actions">${action('编辑', 'entry-edit', item.id, 'ghost')}${action('删除', 'entry-delete', item.id, 'ghost')}</td></tr>`))}${entries.foot}</section></div></div>`;
  }
  function logs() {
    const data = read(), isLogin = ui.tab === 'login';
    const records = (isLogin ? data.loginLogs : data.audit).filter((item) => isLogin ? test(item.account, ui.filters.logAccount) && (!ui.filters.logResult || item.result === ui.filters.logResult) : test(item.action, ui.filters.logModule) && test(item.role, ui.filters.logOperator) && (!ui.filters.logAction || item.action === ui.filters.logAction));
    const page = pagination(records, isLogin ? 'logins' : 'audits');
    const columns = isLogin ? ['用户账号', '登录平台', '登录方式', '登录结果', '信息', '日期', '操作'] : ['选择', '系统模块', '操作类型', '操作人员', 'IP地址', 'IP信息', '操作状态', '操作日期', '操作耗时', '操作'];
    const rows = page.rows.map((item, index) => isLogin ? `<tr><td>${esc(item.account)}</td><td>${esc(item.platform)}</td><td>${esc(item.method)}</td><td>${status(item.result === '成功', '成功', '失败')}</td><td>${esc(item.message)}</td><td>${esc(item.at)}</td><td>${action('详情', 'log-detail', `login:${(ui.pages.logins - 1) * 10 + index}`, 'ghost')}</td></tr>` : `<tr><td><input type="checkbox" aria-label="选择日志"></td><td>${esc(item.action)}</td><td>${esc(item.detail?.split('：')[0] || item.action)}</td><td>${esc(item.role)}</td><td>${esc(item.ip || '—')}</td><td>${esc(item.ipInfo || '—')}</td><td>${status(true, '成功')}</td><td>${esc(item.at)}</td><td>${esc(item.duration || '—')}</td><td>${action('预览', 'log-detail', `operation:${(ui.pages.audits - 1) * 10 + index}`, 'ghost')}</td></tr>`);
    return pageHead('系统日志', '当前浏览器的原型操作与登录事件；未采集 IP、设备信息或服务端鉴权结果。') + `<div class="review-status-tabs" role="tablist"><button type="button" role="tab" aria-selected="${!isLogin}" class="review-status-tab ${!isLogin ? 'active' : ''}" data-sys="log-tab" data-id="operation">操作日志</button><button type="button" role="tab" aria-selected="${isLogin}" class="review-status-tab ${isLogin ? 'active' : ''}" data-sys="log-tab" data-id="login">登录日志</button></div>` + (isLogin ? filters([['logAccount', '用户账号'], ['logResult', '登录结果', ['成功', '失败']]], 'logins') : filters([['logModule', '系统模块'], ['logOperator', '操作人员'], ['logAction', '操作类型', [...new Set(data.audit.map((item) => item.action))]]], 'audits')) + `<section class="sys-section">${controls(isLogin ? '登录日志列表' : '操作日志列表', action(`${icon('download')} 导出当前结果`, 'log-export'))}${table(columns, rows)}${page.foot}</section>`;
  }

  function form(type, id) {
    const data = read();
    if (type === 'user-detail') { const user = data.accounts.find((item) => item.id === id); return user ? modal('用户信息', `<dl class="sys-details"><dt>用户账号</dt><dd>${esc(user.id)}</dd><dt>用户名称</dt><dd>${esc(user.name)}</dd><dt>所属组织</dt><dd>${esc(user.department)}</dd><dt>手机号码</dt><dd>${esc(user.phone)}</dd><dt>账号状态</dt><dd>${esc(user.status === 'pending' ? '待审核' : user.enabled === false ? '停用' : '启用')}</dd></dl>`) : ''; }
    if (type === 'user-import') return modal('导入用户', `<label class="field"><span>选择 CSV 文件</span><input class="input sys-file-input" id="sys-user-file" type="file" accept=".csv,text/csv"></label><div class="notice sys-import-note">${icon('info')}<div><strong>CSV 字段要求</strong><p>首行须包含：用户账号、用户名称、所属组织、手机号、状态。状态支持“正常”或“停用”；所属组织须已存在。重复账号或手机号会跳过。</p></div></div>${action(`${icon('download')} 下载导入模板`, 'user-template')}`, action('开始导入', 'user-import-save', '', 'primary'));
    if (type === 'user-new' || type === 'user-edit') { const user = data.accounts.find((item) => item.id === id); return modal(user ? '编辑用户' : '新增用户', field('用户账号', 'user-id', user?.id || '') + field('用户名称', 'user-name', user?.name || '') + field('手机号码', 'user-phone', user?.phone || '') + `<label class="field"><span>所属组织</span><select class="select" id="sys-user-org">${opts(data.organizations.map((node) => [node.name, node.name]), user?.department)}</select></label>` + select('账号状态', 'user-enabled', [['true', '启用'], ['false', '停用']], user?.enabled === false ? 'false' : 'true') + (user ? '<p class="muted">账号和登录手机号不可修改；新用户档案不自动生成登录凭据。</p>' : '<p class="muted">新用户档案不自动生成登录凭据。</p>'), action('保存用户', 'user-save', id, 'primary')); }
    if (type === 'role-new' || type === 'role-edit') { const role = data.roles.find((item) => item.id === id); const body = `<div class="role-editor"><div class="role-editor-grid">${field('角色名称', 'role-name', role?.name || '')}${field('权限标识', 'role-key', role?.key || '')}${field('角色排序', 'role-sort', role?.sort ?? 1, 'number')}${select('角色状态', 'role-enabled', [['true', '正常'], ['false', '停用']], role?.enabled === false ? 'false' : 'true')}</div>${roleMenuEditor(data, role)}</div>`; return modal(role ? '编辑角色' : '新增角色', body, action(role ? '确认修改' : '确认新增', 'role-save', id, 'primary')).replace('class="modal"', 'class="modal role-editor-modal"'); }
    if (type === 'role-permission') { const role = data.roles.find((item) => item.id === id); if (!role) return ''; const aliases = { '全部数据': '全部数据权限', '授权组织': '自定义数据权限', '所属部门': '本部门数据权限', '本人数据': '仅本人数据权限' }, scope = aliases[role.scope] || role.scope || '全部数据权限', canViewIdentity = role.canViewRealIdentity ?? ['platform', 'leader'].includes(role.id); const body = `<div class="data-permission-form"><label class="field"><span>角色名称</span><input class="input" value="${esc(role.name)}" disabled></label><label class="field"><span>权限标识</span><input class="input" value="${esc(role.key)}" disabled></label>${select('权限范围', 'role-scope', [['全部数据权限', '全部数据权限'], ['自定义数据权限', '自定义数据权限'], ['本部门数据权限', '本部门数据权限'], ['本部门及以下数据权限', '本部门及以下数据权限'], ['仅本人数据权限', '仅本人数据权限'], ['部门及以下或本人数据权限', '部门及以下或本人数据权限']], scope)}<label class="field permission-sensitive-toggle"><span>敏感数据权限</span><span class="sys-check-line"><input id="sys-role-real-identity" type="checkbox" ${canViewIdentity ? 'checked' : ''}><strong>查看匿名用户真实信息</strong></span><small>允许在单条匿名内容详情中直接查看实名信息；每次查看自动写入审计日志。</small></label><div class="data-scope-custom" id="data-scope-custom" ${scope === '自定义数据权限' ? '' : 'hidden'}><div class="data-scope-caption"><strong>授权组织</strong><span>勾选该角色允许查看和办理数据的组织范围</span></div><div class="data-scope-tree">${dataScopeTree(data, role.scopeOrgIds)}</div></div><p class="muted">该设置为原型配置，正式系统仍需由服务端执行数据范围校验。</p></div>`; return modal('数据权限', body, action('确认', 'role-permission-save', id, 'primary')).replace('class="modal"', 'class="modal data-permission-modal"'); }
    if (type === 'role-assign') { const role = data.roles.find((item) => item.id === id); if (!role) return ''; return modal('分配用户', roleAssignmentEditor(data, role), action('确认分配', 'role-assign-save', id, 'primary')).replace('class="modal"', 'class="modal role-assignment-modal"'); }
    if (type === 'menu-new' || type === 'menu-child' || type === 'menu-edit') { const item = data.menus.find((node) => node.id === id), current = type === 'menu-edit' ? item : null, parent = type === 'menu-child' ? id : current?.parentId; return modal(current ? '编辑菜单' : '新增菜单', field('菜单名称', 'menu-name', current?.name || '') + `<label class="field"><span>上级菜单</span><select class="select" id="sys-menu-parent">${opts(data.menus.filter((node) => node.id !== current?.id).map((node) => [node.id, node.name]), parent, '顶级菜单')}</select></label>` + field('图标名称', 'menu-icon', current?.icon || 'folder') + select('组件类型', 'menu-type', [['目录', '目录'], ['菜单', '菜单'], ['按钮', '按钮']], current?.type || '菜单') + field('权限标识', 'menu-permission', current?.permission || '') + field('组件路径', 'menu-path', current?.path || '') + field('排序', 'menu-sort', current?.sort ?? 1, 'number') + select('菜单状态', 'menu-enabled', [['true', '正常'], ['false', '停用']], current?.enabled === false ? 'false' : 'true') + select('显示状态', 'menu-visible', [['true', '显示'], ['false', '隐藏']], current?.visible === false ? 'false' : 'true'), action('保存菜单', 'menu-save', current?.id || '', 'primary')); }
    if (type === 'type-new' || type === 'type-edit') { const item = data.dictionaryTypes.find((row) => row.id === id); return modal(item ? '编辑字典类型' : '新增字典类型', field('字典名称', 'type-name', item?.name || '') + field('字典类型', 'type-key', item?.key || '') + field('备注', 'type-note', item?.note || ''), action('保存字典类型', 'type-save', id, 'primary')); }
    if (type === 'entry-new' || type === 'entry-edit') { const item = data.dictionaryEntries.find((row) => row.id === id); return modal(item ? '编辑字典数据' : '新增字典数据', field('字典标签', 'entry-label', item?.label || '') + field('字典键值', 'entry-value', item?.value || '') + field('排序', 'entry-sort', item?.sort ?? 0, 'number') + field('备注', 'entry-note', item?.note || ''), action('保存字典数据', 'entry-save', id, 'primary')); }
    if (type.endsWith('-delete')) { const collection = { role: data.roles, menu: data.menus, type: data.dictionaryTypes, entry: data.dictionaryEntries }[type.split('-')[0]], item = collection?.find((row) => row.id === id); return item ? modal('确认删除', `<p>确定删除「${esc(item.name || item.label)}」？有关联的数据须先处理。</p>`, action('确认删除', type.replace('-delete', '-remove'), id, 'primary')) : ''; }
    if (type === 'log-detail') { const [kind, position] = id.split(':'), item = (kind === 'login' ? data.loginLogs : data.audit).filter((row) => kind === 'login' ? test(row.account, ui.filters.logAccount) && (!ui.filters.logResult || row.result === ui.filters.logResult) : test(row.action, ui.filters.logModule) && test(row.role, ui.filters.logOperator) && (!ui.filters.logAction || row.action === ui.filters.logAction))[Number(position)]; return item ? modal(kind === 'login' ? '登录记录详情' : '操作记录详情', `<pre class="sys-log-pre">${esc(JSON.stringify(item, null, 2))}</pre>`) : ''; }
    return '';
  }

  function parseCsv(source) {
    const rows = []; let row = [], cell = '', quoted = false;
    const text = String(source || '').replace(/^\uFEFF/, '');
    for (let index = 0; index < text.length; index++) {
      const char = text[index];
      if (quoted) {
        if (char === '"' && text[index + 1] === '"') { cell += '"'; index++; }
        else if (char === '"') quoted = false;
        else cell += char;
      } else if (char === '"') quoted = true;
      else if (char === ',') { row.push(cell.trim()); cell = ''; }
      else if (char === '\n') { row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ''; }
      else if (char !== '\r') cell += char;
    }
    row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
    if (quoted) throw new Error('CSV 引号未闭合');
    return rows;
  }
  async function importUsers() {
    const file = document.getElementById('sys-user-file')?.files?.[0];
    if (!file) return showToast('请选择 CSV 文件');
    if (file.size > 2 * 1024 * 1024) return showToast('CSV 文件不能超过 2MB');
    let rows;
    try { rows = parseCsv(await file.text()); } catch (error) { return showToast(error.message || 'CSV 文件解析失败'); }
    if (rows.length < 2) return showToast('CSV 中没有可导入的用户数据');
    const required = ['用户账号', '用户名称', '所属组织', '手机号', '状态'];
    const headers = rows[0].map((header) => header.trim());
    if (required.some((header) => !headers.includes(header))) return showToast('CSV 表头不完整，请下载导入模板');
    const data = read(), organizations = new Set(data.organizations.map((node) => node.name));
    let success = 0, skipped = 0, failed = 0;
    for (const cells of rows.slice(1)) {
      const record = Object.fromEntries(headers.map((header, index) => [header, cells[index]?.trim() || '']));
      if (!record.用户账号 || !record.用户名称 || !/^1\d{10}$/.test(record.手机号) || !organizations.has(record.所属组织) || !['正常', '停用'].includes(record.状态)) { failed++; continue; }
      if (data.accounts.some((user) => user.id === record.用户账号 || user.phone === record.手机号)) { skipped++; continue; }
      data.accounts.push({ id: record.用户账号, name: record.用户名称, department: record.所属组织, phone: record.手机号, status: 'approved', enabled: record.状态 === '正常', createdAt: now(), imported: true }); success++;
    }
    data.audit.unshift({ action: '用户导入', target: file.name, detail: `成功${success}名，跳过${skipped}名，失败${failed}名`, role: roleInfo[state.role].label, at: now() });
    PrototypeData.save(data); closeModal(); render(); showToast(`导入完成：成功 ${success}，跳过 ${skipped}，失败 ${failed}`);
  }

  function handle(name, id) {
    if (state.role !== 'platform') return showToast('仅平台管理员可维护系统设置');
    if (name === 'close') return closeModal();
    if (name === 'reset') { const prefix = { users: 'user', roles: 'role', menus: 'menu', types: 'dict', entries: 'entry', logins: 'log', audits: 'log' }[id]; for (const key of Object.keys(ui.filters)) if (key.startsWith(prefix)) delete ui.filters[key]; ui.pages[id] = 1; return render(); }
    if (name === 'page') { const [key, target] = id.split(':'); ui.pages[key] = Math.max(1, Number(target)); return render(); }
    if (name === 'org-select') { ui.selectedOrg = id; ui.pages.users = 1; return render(); }
    if (name === 'type-select') { ui.selectedType = id; ui.pages.entries = 1; return render(); }
    if (name === 'user-review') return go('user-review');
    if (name === 'user-delete' || name === 'role-delete' || name === 'position-delete') return showToast('请先勾选记录后再执行删除');
    if (name === 'role-export' || name === 'position-export') return showToast('当前列表已进入导出准备');
    if (name === 'position-new' || name === 'position-edit') return showToast('岗位信息编辑入口已打开');
    if (name === 'log-tab') { ui.tab = id; return render(); }
    if (name === 'role-menu-collapse' || name === 'role-menu-expand') { const collapse = name === 'role-menu-collapse'; document.querySelectorAll('[data-role-menu-row]').forEach((row) => { row.hidden = collapse && Number(row.dataset.depth) > 0; }); document.querySelectorAll('.role-menu-toggle').forEach((button) => { button.innerHTML = icon(collapse ? 'chevron-right' : 'chevron-down'); button.setAttribute('aria-label', collapse ? '展开下级菜单' : '收起下级菜单'); }); window.lucide?.createIcons?.(); return; }
    if (name === 'role-menu-toggle') { const button = document.querySelector(`.role-menu-toggle[data-id="${CSS.escape(id)}"]`), collapsed = button?.dataset.collapsed === 'true'; if (!button) return; button.dataset.collapsed = collapsed ? 'false' : 'true'; const rows = [...document.querySelectorAll('[data-role-menu-row]')], descendants = new Set([id]); for (const row of rows) if (descendants.has(row.dataset.parentId)) { descendants.add(row.dataset.menuId); row.hidden = !collapsed; } button.innerHTML = icon(collapsed ? 'chevron-down' : 'chevron-right'); window.lucide?.createIcons?.(); return; }
    if (name === 'menu-collapse') { ui.collapsed.has(id) ? ui.collapsed.delete(id) : ui.collapsed.add(id); return render(); }
    if (name === 'menu-collapse-all' || name === 'menu-expand-all') { ui.collapsed = new Set(name === 'menu-collapse-all' ? read().menus.map((item) => item.id) : []); return render(); }
    if (name === 'log-export') {
      const data = read(), entries = ui.tab === 'login' ? data.loginLogs.filter((item) => test(item.account, ui.filters.logAccount) && (!ui.filters.logResult || item.result === ui.filters.logResult)) : data.audit.filter((item) => test(item.action, ui.filters.logModule) && test(item.role, ui.filters.logOperator) && (!ui.filters.logAction || item.action === ui.filters.logAction));
      const cols = ui.tab === 'login' ? ['account', 'platform', 'method', 'result', 'message', 'at'] : ['action', 'target', 'detail', 'role', 'at'];
      const csv = '\uFEFF' + [cols.join(','), ...entries.map((entry) => cols.map((key) => `"${String(entry[key] ?? '').replace(/"/g, '""')}"`).join(','))].join('\r\n');
      const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); link.download = `${ui.tab === 'login' ? '登录日志' : '操作日志'}.csv`; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); data.audit.unshift({ action: '日志导出', target: link.download, detail: `导出${entries.length}条${ui.tab === 'login' ? '登录' : '操作'}记录`, role: roleInfo[state.role].label, at: now() }); PrototypeData.save(data); render(); return showToast('当前筛选结果已导出');
    }
    if (name === 'user-export') { const data = read(), records = visibleUsers(data), columns = [{ key: 'id', label: '用户账号' }, { key: 'name', label: '用户名称' }, { key: 'department', label: '所属组织' }, { key: 'phone', label: '手机号' }, { key: 'displayStatus', label: '状态' }, { key: 'createdAt', label: '创建时间' }]; downloadCsv('用户数据.csv', columns, records.map((user) => ({ ...user, displayStatus: user.status === 'pending' ? '待审核' : user.enabled === false ? '停用' : '正常', createdAt: user.createdAt || user.submitted || '' }))); data.audit.unshift({ action: '用户导出', target: '用户数据.csv', detail: `导出当前筛选范围内${records.length}名用户`, role: roleInfo[state.role].label, at: now() }); PrototypeData.save(data); return showToast(`已导出 ${records.length} 名用户`); }
    if (name === 'user-template') { downloadCsv('用户导入模板.csv', [{ key: 'id', label: '用户账号' }, { key: 'name', label: '用户名称' }, { key: 'department', label: '所属组织' }, { key: 'phone', label: '手机号' }, { key: 'status', label: '状态' }], [{ id: 'user001', name: '示例用户', department: '合作指导处', phone: '13800000000', status: '正常' }]); return showToast('导入模板已下载'); }
    if (name === 'user-import-save') return importUsers();
    if (['user-new', 'user-edit', 'user-detail', 'user-import', 'role-new', 'role-edit', 'role-permission', 'role-assign', 'role-delete', 'menu-new', 'menu-child', 'menu-edit', 'menu-delete', 'type-new', 'type-edit', 'type-delete', 'entry-new', 'entry-edit', 'entry-delete', 'log-detail'].includes(name)) { state.modal = { type: name, id }; return render(); }
    const data = read();
    if (name === 'user-toggle') { const row = data.accounts.find((user) => user.id === id); if (!row || row.status === 'pending') return showToast('待审核账号请先完成注册审核'); if (row.id === 'admin') return showToast('演示平台管理员不能停用'); row.enabled = row.enabled === false; return mark(data, '用户管理', `${row.name}：${row.enabled ? '启用' : '停用'}`); }
    if (name === 'user-save') { const accountId = value('user-id'), phone = value('user-phone'), user = data.accounts.find((item) => item.id === id); if (!accountId || !value('user-name') || !value('user-org') || !/^1\d{10}$/.test(phone)) return showToast('请填写账号、名称、所属组织和 11 位手机号'); if (user && (accountId !== user.id || phone !== user.phone)) return showToast('已有账号和登录手机号不可修改'); if (data.accounts.some((item) => item.id !== id && (item.id === accountId || item.phone === phone))) return showToast('账号或手机号已存在'); if (user && user.id === 'admin' && value('user-enabled') !== 'true') return showToast('演示平台管理员不能停用'); if (user) Object.assign(user, { name: value('user-name'), department: value('user-org'), enabled: value('user-enabled') === 'true' }); else data.accounts.push({ id: accountId, name: value('user-name'), phone, department: value('user-org'), status: 'approved', enabled: value('user-enabled') === 'true', createdAt: now() }); return mark(data, '用户管理', `${user ? '编辑' : '新增'}用户：${accountId}`); }
    if (name === 'role-save') { const row = data.roles.find((item) => item.id === id), key = value('role-key'), sort = Number(value('role-sort')), menuIds = [...document.querySelectorAll('.sys-role-menu:checked')].map((box) => box.value), nodeMode = document.querySelector('input[name="role-node-mode"]:checked')?.value || 'linked'; if (!value('role-name') || !key || !Number.isInteger(sort) || sort < 0) return showToast('请填写角色名称、权限标识和非负整数排序'); if (!menuIds.length) return showToast('请至少选择一个菜单权限节点'); if (row?.fixed && (key !== row.key || (row.id === 'platform' && value('role-enabled') !== 'true'))) return showToast('内置角色的权限标识不可修改，平台管理员须保持启用'); if (data.roles.some((item) => item.id !== id && item.key === key)) return showToast('权限标识已存在'); const fields = { name: value('role-name'), key, sort, enabled: value('role-enabled') === 'true', menuIds, nodeMode }; if (row) Object.assign(row, fields); else data.roles.push({ id: `role-${Date.now()}`, scope: '全部数据权限', ...fields, createdAt: now() }); return mark(data, '角色管理', `${row ? '编辑' : '新增'}角色：${value('role-name')}，授权${menuIds.length}个菜单节点`); }
    if (name === 'role-permission-save') { const row = data.roles.find((item) => item.id === id), scope = value('role-scope'), scopeOrgIds = [...document.querySelectorAll('.sys-scope-org:checked')].map((box) => box.value), canViewRealIdentity = Boolean(document.getElementById('sys-role-real-identity')?.checked); if (!row) return showToast('角色不存在'); if (scope === '自定义数据权限' && !scopeOrgIds.length) return showToast('请至少选择一个授权组织'); row.scope = scope; row.scopeOrgIds = scope === '自定义数据权限' ? scopeOrgIds : []; row.canViewRealIdentity = canViewRealIdentity; return mark(data, '数据权限', `${row.name}：${scope}${scopeOrgIds.length ? `，${scopeOrgIds.length}个组织` : ''}，匿名实名查看${canViewRealIdentity ? '已开启' : '未开启'}`); }
    if (name === 'role-assign-save') { const selected = new Set([...document.querySelectorAll('.sys-assignment:checked')].map((box) => box.value)), role = data.roles.find((item) => item.id === id); for (const user of data.accounts) { user.assignedRoles = (user.assignedRoles || []).filter((roleId) => roleId !== id); if (selected.has(user.id)) user.assignedRoles.push(id); } return mark(data, '角色分配', `${role?.name || id}：已分配${selected.size}名用户`); }
    if (name === 'role-remove') { const row = data.roles.find((item) => item.id === id); if (!row || row.fixed || data.accounts.some((user) => user.assignedRoles?.includes(id))) return showToast('内置或已分配的角色不能删除'); data.roles.splice(data.roles.indexOf(row), 1); return mark(data, '角色管理', `删除角色：${row.name}`); }
    if (name === 'menu-save') { const row = data.menus.find((item) => item.id === id), sort = Number(value('menu-sort')), parentId = value('menu-parent') || null; if (!value('menu-name') || !Number.isInteger(sort) || sort < 0) return showToast('请填写菜单名称和非负整数排序'); if (parentId && !data.menus.some((item) => item.id === parentId)) return showToast('上级菜单不存在'); let cursor = parentId; while (cursor) { if (cursor === id) return showToast('不能移动到自身或下级菜单'); cursor = data.menus.find((item) => item.id === cursor)?.parentId || null; } if (data.menus.some((item) => item.id !== id && item.parentId === parentId && item.name === value('menu-name'))) return showToast('同级菜单名称不能重复'); const fields = { name: value('menu-name'), parentId, icon: value('menu-icon'), sort, type: value('menu-type'), permission: value('menu-permission'), path: value('menu-path'), enabled: value('menu-enabled') === 'true', visible: value('menu-visible') === 'true' }; if (row) Object.assign(row, fields); else data.menus.push({ id: `menu-${Date.now()}`, ...fields, createdAt: now() }); return mark(data, '菜单管理', `${row ? '编辑' : '新增'}菜单：${fields.name}`); }
    if (name === 'menu-remove') { const row = data.menus.find((item) => item.id === id); if (!row || data.menus.some((item) => item.parentId === id)) return showToast('请先删除下级菜单'); data.menus.splice(data.menus.indexOf(row), 1); return mark(data, '菜单管理', `删除菜单：${row.name}`); }
    if (name === 'type-save') { const row = data.dictionaryTypes.find((item) => item.id === id), key = value('type-key'); if (!value('type-name') || !key) return showToast('请填写字典名称和类型'); if (data.dictionaryTypes.some((item) => item.id !== id && item.key === key)) return showToast('字典类型已存在'); if (row) Object.assign(row, { name: value('type-name'), key, note: value('type-note') }); else data.dictionaryTypes.push({ id: `type-${Date.now()}`, name: value('type-name'), key, note: value('type-note'), createdAt: now() }); return mark(data, '字典管理', `${row ? '编辑' : '新增'}字典类型：${key}`); }
    if (name === 'type-remove') { const row = data.dictionaryTypes.find((item) => item.id === id); if (!row || data.dictionaryEntries.some((item) => item.typeId === id)) return showToast('该字典仍有数据项，请先处理数据项'); data.dictionaryTypes.splice(data.dictionaryTypes.indexOf(row), 1); return mark(data, '字典管理', `删除字典类型：${row.name}`); }
    if (name === 'entry-save') { const row = data.dictionaryEntries.find((item) => item.id === id), sort = Number(value('entry-sort')), typeId = row?.typeId || ui.selectedType; if (!typeId || !value('entry-label') || !value('entry-value') || !Number.isInteger(sort) || sort < 0) return showToast('请填写字典标签、键值和非负整数排序'); if (data.dictionaryEntries.some((item) => item.id !== id && item.typeId === typeId && item.value === value('entry-value'))) return showToast('同类型键值不能重复'); const fields = { label: value('entry-label'), value: value('entry-value'), sort, note: value('entry-note') }; if (row) Object.assign(row, fields); else data.dictionaryEntries.push({ id: `entry-${Date.now()}`, typeId, ...fields, createdAt: now() }); return mark(data, '字典管理', `${row ? '编辑' : '新增'}字典数据：${fields.label}`); }
    if (name === 'entry-remove') { const row = data.dictionaryEntries.find((item) => item.id === id); if (!row) return showToast('字典数据不存在'); data.dictionaryEntries.splice(data.dictionaryEntries.indexOf(row), 1); return mark(data, '字典管理', `删除字典数据：${row.label}`); }
  }
  document.addEventListener('click', (event) => { const trigger = event.target.closest('[data-sys]'); if (!trigger || (trigger.classList.contains('modal-backdrop') && event.target !== trigger)) return; handle(trigger.dataset.sys, trigger.dataset.id || ''); });
  document.addEventListener('change', (event) => {
    if (event.target.id === 'sys-role-scope' && document.getElementById('data-scope-custom')) { document.getElementById('data-scope-custom').hidden = event.target.value !== '自定义数据权限'; return; }
    if (event.target.id === 'role-user-check-all') { document.querySelectorAll('[data-role-user-row]:not([hidden]) .sys-assignment').forEach((box) => { box.checked = event.target.checked; }); const count = document.getElementById('role-user-count'); if (count) count.textContent = document.querySelectorAll('.sys-assignment:checked').length; return; }
    if (event.target.classList.contains('sys-assignment') && document.getElementById('role-user-count')) { document.getElementById('role-user-count').textContent = document.querySelectorAll('.sys-assignment:checked').length; const visible = [...document.querySelectorAll('[data-role-user-row]:not([hidden]) .sys-assignment')]; const checkAll = document.getElementById('role-user-check-all'); if (checkAll) { checkAll.checked = visible.length > 0 && visible.every((box) => box.checked); checkAll.indeterminate = visible.some((box) => box.checked) && !checkAll.checked; } return; }
    const checkbox = event.target.closest('.sys-role-menu');
    if (!checkbox) return;
    const rows = [...document.querySelectorAll('[data-role-menu-row]')], row = checkbox.closest('[data-role-menu-row]');
    if (document.querySelector('input[name="role-node-mode"]:checked')?.value === 'linked') {
      const descendants = new Set([row.dataset.menuId]);
      for (const item of rows) if (descendants.has(item.dataset.parentId)) { descendants.add(item.dataset.menuId); item.querySelector('.sys-role-menu').checked = checkbox.checked; }
      if (checkbox.checked) { let parentId = row.dataset.parentId; while (parentId) { const parent = rows.find((item) => item.dataset.menuId === parentId); if (!parent) break; parent.querySelector('.sys-role-menu').checked = true; parentId = parent.dataset.parentId; } }
    }
    const count = document.getElementById('role-selected-count'); if (count) count.textContent = document.querySelectorAll('.sys-role-menu:checked').length;
  });
  document.addEventListener('input', (event) => {
    if (event.target.id !== 'role-user-search') return;
    const query = event.target.value.trim().toLocaleLowerCase();
    document.querySelectorAll('[data-role-user-row]').forEach((row) => { row.hidden = Boolean(query) && !row.dataset.searchText.includes(query); });
    const visible = [...document.querySelectorAll('[data-role-user-row]:not([hidden]) .sys-assignment')], checkAll = document.getElementById('role-user-check-all');
    if (checkAll) { checkAll.checked = visible.length > 0 && visible.every((box) => box.checked); checkAll.indeterminate = visible.some((box) => box.checked) && !checkAll.checked; }
  });
  document.addEventListener('submit', (event) => { const form = event.target.closest('[data-search]'); if (!form) return; event.preventDefault(); for (const element of form.querySelectorAll('[data-filter]')) ui.filters[element.dataset.filter] = element.value.trim(); ui.pages[form.dataset.search] = 1; render(); });
  const previousPage = ManagementWorkflow.page, previousModal = ManagementWorkflow.modal;
  ManagementWorkflow.page = (name) => ({ users, permissions: roles, positions, 'menu-management': menus, 'dictionary-management': dictionaries, logs }[name] || previousPage.bind(ManagementWorkflow, name))();
  ManagementWorkflow.modal = (type, id) => (/^(user|role|menu|type|entry|log)-/.test(type) ? form(type, id) : previousModal(type, id));
  render();
})();
