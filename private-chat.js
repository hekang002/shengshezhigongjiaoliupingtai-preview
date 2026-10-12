(function () {
  const esc = (value) => String(value || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let active = null;
  const quoteHtml = (quote) => quote ? `<blockquote class="message-reply-quote"><strong>${esc(quote.sender)}</strong><div>${esc(quote.text)}</div></blockquote>` : '';
  const storageKey = 'hubei-voice-private-threads-v1';
  function threads() {
    try {
      const items = JSON.parse(localStorage.getItem(storageKey) || 'null') || PrototypeData.read().privateThreads || [];
      const fixtureKey = `${storageKey}-fixtures-v1`;
      if (!localStorage.getItem(fixtureKey)) {
        const data = PrototypeData.read();
        const examples = [
          ['1', false, '请补充目前供需信息共享的具体环节及更新频率，便于核实建议的适用范围。', '目前主要通过工作群汇总，每周五更新。建议增加品类、数量和有效期字段。', '已收到补充，我们将结合现有台账整理字段模板。', '是否可以先选两个基层网点试用？我们愿意配合提供样表。'],
          ['2', false, '请说明晚餐供应时段与实际下班时间冲突的情况。', '值班人员通常在18点后结束工作，目前供餐结束较早，希望延长半小时。', '已转机关服务中心核实，拟先收集一周用餐人数再确定调整方案。'],
          ['POST-FLOW-I-01', false, '供需清单建议已收到，请补充希望共享的网点范围。', '建议先覆盖本县基层网点，确认数据口径后再逐步扩大范围。'],
          ['POST-FLOW-I-02', true, '申报材料可能包含内部信息，请先核实拟共享的材料类型。', '主要是空白申报表和填报说明，不包含财务数据和个人信息。', '可先整理通用模板，涉及具体项目的附件请单独核验。', '明白，已按通用模板和项目附件分别整理。'],
          ['POST-FLOW-V-03', false, '餐食标识问题已受理，请补充经常遇到的具体情况。', '主要是配菜和汤品缺少原料标识，希望标注是否含花生及奶制品。'],
          ['POST-FLOW-V-04', true, '已核对报名记录，请确认报名批次及提交日期。', '报名的是第二期培训，9月8日提交，尚未收到确认通知。', '已与组织方核实，您在候补名单内，确认后将另行通知。'],
          ['POST-FLOW-V-06', true, '书屋借阅时段已调整，请反馈新时段是否方便使用。', '周四延长后方便多了，外勤同事也能赶上。谢谢。', '感谢反馈，后续将结合实际借阅情况持续优化。'],
          ['POST-FLOW-E-04', false, '案例中的库存复盘方法很有参考价值，能否补充执行步骤？', '每周五先盘点库存，再按品类核对周转天数，最后安排下周调度。', '请补充异常库存的处理方式，便于其他网点借鉴。', '超过周转期限的库存会单独登记，由网点负责人核实原因并协调调运。']
        ];
        examples.forEach(([postId, read, ...texts], index) => {
          const post = data.posts.find((p) => String(p.id) === postId && !p.deleted);
          if (!post || items.some((t) => String(t.postId) === postId)) return;
          const authorId = post.authorId || data.accounts.find((a) => a.name === post.author)?.id || `demo-author:${post.author || post.id}`;
          items.push({ postId, authorId, messages: texts.map((text, i) => ({
            id: `private-demo-${index}-${i}`, role: i % 2 ? 'staff' : 'admin',
            senderId: i % 2 ? authorId : 'platform', text,
            at: `2026-10-${String(12 - index).padStart(2, '0')} ${String(9 + i).padStart(2, '0')}:20`,
            read: i % 2 ? read : true
          })) });
        });
        saveThreads(items);
        localStorage.setItem(fixtureKey, '1');
      }
      return items;
    }
    catch (_) { return []; }
  }
  function saveThreads(items) { localStorage.setItem(storageKey, JSON.stringify(items)); }
  function open(postId, role, userId, name) {
    const data = PrototypeData.read();
    const post = data.posts.find((p) => String(p.id) === String(postId));
    if (!post) return showToast('原帖不存在');
    const account = data.accounts.find((a) => a.name === post.author);
    // Unlinked demo authors receive an isolated identity, never the current staff account.
    const authorId = post.authorId || account?.id || `demo-author:${post.author || post.id}`;
    if (role === 'staff' && String(authorId) !== String(userId)) return showToast('无权查看此会话');
    active = { postId: String(postId), role, userId, name, authorId };
    const thread = threads().find((t) => t.postId === active.postId);
    if (thread) {
      thread.messages.forEach((m) => { if (m.role !== role) m.read = true; });
      data.privateThreads = threads().map((t) => t.postId === active.postId ? thread : t);
      saveThreads(data.privateThreads);
      PrototypeData.save(data);
    }
    if (role === 'admin' && typeof render === 'function') render();
    draw();
  }
  function draw() {
    active.quote = null;
    document.getElementById('private-chat-overlay')?.remove();
    const data = PrototypeData.read();
    const post = data.posts.find((p) => String(p.id) === active.postId);
    const thread = threads().find((t) => t.postId === active.postId);
    const overlay = document.createElement('div');
    const published = post.publishStatus ? post.publishStatus === '已发布' : PrototypeData.isPublicPost(post);
    const visibilityControls = active.role === 'admin' ? `<fieldset class="private-chat-visibility"><legend>原帖展示</legend><label><input type="radio" name="reply-post-visibility" value="show" ${published ? 'checked' : ''}>展示</label><label><input type="radio" name="reply-post-visibility" value="hide" ${published ? '' : 'checked'}>隐藏</label></fieldset>` : '';
    overlay.id = 'private-chat-overlay';
    overlay.className = 'private-chat-overlay';
overlay.innerHTML = `<section class="private-chat-dialog" role="dialog" aria-modal="true" aria-label="原帖回复"><header><div><h2>原帖回复</h2><small>仅发帖职工与授权管理人员可见</small></div><button onclick="PrivateChat.close()" aria-label="关闭">×</button></header><div class="private-chat-body"><aside><h3>${esc(post.title)}</h3><small>${esc(post.author)}</small><p>${esc(post.body || post.excerpt)}</p>${visibilityControls}</aside><main><div class="private-chat-messages">${(thread?.messages || []).map((m) => `<article data-message-id="${esc(m.id)}" class="${m.role === active.role ? 'mine' : ''}"><small>${esc(m.role === 'staff' ? '职工' : '平台管理员')} · ${esc(m.at)}</small><p>${esc(m.text)}</p>${quoteHtml(m.quote)}</article>`).join('') || '<p>暂无消息</p>'}</div><form onsubmit="event.preventDefault();PrivateChat.send()"><textarea id="private-chat-input" aria-label="私聊内容" maxlength="2000" placeholder="输入私聊内容"></textarea><button type="submit">发送</button></form></main></div></section>`;
    document.body.append(overlay);
    const body = overlay.querySelector('.private-chat-body');
    const main = body.querySelector('main');
    main.insertAdjacentHTML('afterbegin', '<div class="private-chat-section-label">回复消息</div>');
    main.querySelector('textarea').insertAdjacentHTML('beforebegin', '<label class="private-chat-section-label" for="private-chat-input">回复内容</label>');
    const aside = body.querySelector('aside');
    aside.innerHTML = `<span class="private-chat-board">${esc(post.board || '未分类')}</span><h3>${esc(post.title)}</h3><div class="private-chat-post-meta">${esc(post.id)} · ${esc(post.author)} · ${esc(post.createdAt || post.time || post.updatedAt || '未记录')}</div><div class="private-chat-post-content"><h4>事项内容</h4><p>${esc(post.body || post.excerpt || '')}</p></div><div class="private-chat-attachments"><strong>附件材料</strong><span>${esc(post.attachment?.name || '暂无附件')}</span></div>${visibilityControls}`;
    main.querySelector('textarea').placeholder = '请输入回复内容';
    aside.querySelector('.private-chat-board').insertAdjacentHTML('afterend', `<span class="private-chat-publish-status ${published ? 'published' : ''}">${published ? '已发布' : '未发布'}</span>`);
    const visibility = aside.querySelector('.private-chat-visibility');
    if (visibility) {
      visibility.querySelector('p')?.remove();
      main.append(visibility);
    }
    main.querySelector('textarea').setAttribute('aria-label', '回复内容');
    const affair = data.affairs.find((a) => String(a.postId) === active.postId);
    if (affair?.draft) main.querySelector('.private-chat-messages').insertAdjacentHTML('afterbegin', `<article><small>官方回复</small><p>${esc(affair.draft)}</p></article>`);
    const hasMessages = Boolean(thread?.messages?.length || String(affair?.draft || '').trim());
    if (!hasMessages) {
      main.classList.add('private-chat-first-reply');
      main.querySelector('.private-chat-section-label').remove();
      main.querySelector('.private-chat-messages').hidden = true;
    }
    const send = overlay.querySelector('form button[type="submit"]');
    send.type = 'button';
    const footer = document.createElement('footer');
    footer.innerHTML = '<button type="button" onclick="PrivateChat.close()">取消</button>';
    footer.append(send);
    overlay.querySelector('.private-chat-dialog').append(footer);
    send.className = 'private-chat-send';
    send.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.PrivateChat.send();
    });
    const messages = overlay.querySelector('.private-chat-messages');
    if (hasMessages) messages.scrollTop = messages.scrollHeight;
    if (hasMessages) {
      const form = main.querySelector('form');
      form.id = 'private-chat-reply-form';
      form.classList.add('message-inline-compose');
      form.querySelector('label.private-chat-section-label')?.remove();
      form.hidden = true;
      send.textContent = '发布';
      const actions = document.createElement('div');
      actions.className = 'message-inline-actions';
      const cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.textContent = '取消';
      cancel.addEventListener('click', () => {
        active.quote = null;
        form.hidden = true;
        main.classList.add('private-chat-reading');
        messages.querySelectorAll('.private-chat-reply-toggle').forEach((button) => button.setAttribute('aria-expanded', 'false'));
      });
      actions.append(cancel, send);
      form.append(actions);
      main.classList.add('private-chat-reading');
      messages.querySelectorAll('article').forEach((article) => {
        const replyButton = document.createElement('button');
        replyButton.type = 'button';
        replyButton.className = 'private-chat-reply-toggle';
        replyButton.textContent = '回复';
        replyButton.setAttribute('aria-expanded', 'false');
        replyButton.setAttribute('aria-controls', form.id);
        article.append(replyButton);
        replyButton.addEventListener('click', () => {
          active.quote = { messageId: article.dataset.messageId || 'official-reply', sender: article.querySelector('small').textContent.split(' · ')[0], text: article.querySelector('p').textContent };
          form.querySelector('.message-reply-quote')?.remove();
          form.insertAdjacentHTML('afterbegin', quoteHtml(active.quote));
          messages.querySelectorAll('.private-chat-reply-toggle').forEach((button) => button.setAttribute('aria-expanded', 'false'));
          article.append(form);
          form.hidden = false;
          main.classList.remove('private-chat-reading');
          replyButton.setAttribute('aria-expanded', 'true');
          const input = form.querySelector('textarea');
          input.placeholder = `回复 @${article.querySelector('small').textContent.split(' · ')[0]}`;
          input.focus();
          form.scrollIntoView({ block: 'nearest' });
        });
      });
    } else {
      overlay.querySelector('#private-chat-input').focus();
    }
  }
  window.PrivateChat = {
    open,
    quoteHtml,
    reply(postId, userId, text, quote = null) {
      const data = PrototypeData.read();
      const post = data.posts.find((p) => String(p.id) === String(postId));
      const authorId = post?.authorId || data.accounts.find((a) => a.name === post?.author)?.id;
      if (!post || String(authorId) !== String(userId)) return false;
      text = String(text || '').trim();
      if (!text || text.length > 2000) return false;
      const items = threads();
      let thread = items.find((t) => t.postId === String(postId));
      if (!thread) { thread = { postId: String(postId), authorId, messages: [] }; items.push(thread); }
      thread.messages.push({ id: Date.now(), role: 'staff', senderId: userId, text, quote, at: new Date().toLocaleString('sv-SE').slice(0,16), read: false });
      saveThreads(items);
      return true;
    },
    unreadCount() { return threads().reduce((sum, t) => sum + t.messages.filter((m) => m.role === 'staff' && !m.read).length, 0); },
    page() {
      if (!['platform', 'content'].includes(state.role)) return '<p>无权查看私信消息管理</p>';
      const data = PrototypeData.read();
      const query = this.query || '';
      const unreadOnly = this.unreadOnly || false;
      const rows = threads().filter((t) => t.messages.length).map((t) => ({ ...t, post: data.posts.find((p) => String(p.id) === t.postId), last: t.messages.at(-1), unread: t.messages.filter((m) => m.role === 'staff' && !m.read).length })).filter((t) => t.post && (!unreadOnly || t.unread) && [t.post.title, t.post.author, t.last.text].some((v) => String(v || '').includes(query))).sort((a, b) => Number(Boolean(b.unread)) - Number(Boolean(a.unread)) || b.last.at.localeCompare(a.last.at) || b.last.id - a.last.id);
      return pageHead('私信消息管理', '查看与发帖职工的对话，按原帖持续回复。', `<span class="badge">${this.unreadCount()} 条未读</span>`)
        + `<div class="filters"><input class="input" id="dialog-message-query" aria-label="搜索对话" placeholder="搜索原帖、作者或消息" value="${esc(query)}"><label class="dialog-message-unread"><input type="checkbox" ${unreadOnly ? 'checked' : ''} onchange="PrivateChat.unreadOnly=this.checked;render()">仅看未读</label><button class="btn btn-primary" onclick="PrivateChat.search()">${icon('search')}查询</button><button class="btn btn-secondary" onclick="PrivateChat.query='';PrivateChat.unreadOnly=false;render()">${icon('rotate-ccw')}重置</button></div>`
+ `<div class="table-wrap"><table class="data-table dialog-message-table"><thead><tr><th>关联原帖</th><th>发帖职工</th><th>最近消息</th><th>更新时间</th><th>阅读状态</th><th>操作</th></tr></thead><tbody>${rows.map((t) => `<tr><td><div class="td-title">${esc(t.post.title)}</div><div class="td-sub">${esc(t.post.board)} · #${esc(t.postId)}</div></td><td>${esc(t.post.author)}</td><td><div class="dialog-message-preview">${esc(t.last.text)}</div><div class="td-sub">${t.last.role === 'staff' ? '职工' : '管理人员'}</div></td><td>${esc(t.last.at)}</td><td><span class="badge ${t.unread ? 'red' : 'green'}">${t.unread ? `职工新回复 · ${t.unread} 条未读` : '已读'}</span></td><td><div class="row-actions"><button class="btn btn-sm btn-secondary" data-post-id="${esc(t.postId)}" onclick="PrivateChat.open(this.dataset.postId,'admin','platform','平台管理员')">查看回复</button></div></td></tr>`).join('') || '<tr><td colspan="6" class="dialog-message-empty">暂无符合条件的对话</td></tr>'}</tbody></table></div><div class="td-sub" style="margin-top:14px">共 ${rows.length} 个会话</div>`;
    },
    search() { this.query = document.getElementById('dialog-message-query').value.trim(); render(); },
    setVisibility(published) {
      if (active?.role !== 'admin') return showToast('无权修改原帖展示状态');
      const data = PrototypeData.read();
      const post = data.posts.find((p) => String(p.id) === active.postId);
      if (!post || post.deleted) return showToast('原帖不存在');
      if (published && (['待审核', '已驳回', '退回修改'].includes(post.status) || ['待审核', '已驳回'].includes(post.contentAuditStatus))) return showToast('原帖需审核通过后才能展示');
      post.publishStatus = published ? '已发布' : '未发布';
      post.status = published ? '已发布' : '已隐藏';
      const at = new Date().toLocaleString('sv-SE').slice(0, 16);
      post.history = [...(post.history || []), { text: published ? '内容已恢复发布' : '内容已隐藏', at }];
      const affair = data.affairs.find((a) => String(a.postId) === active.postId);
      if (affair) affair.publicationMode = post.publishStatus;
      data.audit ||= [];
      data.audit.unshift({ action: '内容发布', target: post.id, detail: published ? '原帖已展示' : '原帖已隐藏', at });
      PrototypeData.save(data);
      draw();
      showToast(published ? '原帖已展示' : '原帖已隐藏');
    },
    close() { document.getElementById('private-chat-overlay')?.remove(); active = null; if (typeof state !== 'undefined' && state.page === 'dialog-messages') render(); },
    items(userId) { return threads().filter((t) => String(t.authorId) === String(userId)); },
    send() {
      const text = document.getElementById('private-chat-input').value.trim();
      if (!text) return showToast('请输入消息内容');
      if (text.length > 2000) return showToast('消息不能超过 2000 字');
      const data = PrototypeData.read();
      data.privateThreads = threads();
      const post = data.posts.find((p) => String(p.id) === active.postId);
      if (!post || post.deleted) return showToast('原帖不存在');
      if (active.role === 'admin') {
        const published = document.querySelector('#private-chat-overlay input[name="reply-post-visibility"]:checked')?.value === 'show';
        const currentlyPublished = post.publishStatus ? post.publishStatus === '已发布' : PrototypeData.isPublicPost(post);
        if (published !== currentlyPublished) {
          if (published && (['待审核', '审核中', '已驳回', '驳回', '退回修改'].includes(post.status) || ['待审核', '审核中', '已驳回', '驳回'].includes(post.contentAuditStatus))) return showToast('原帖需审核通过后才能展示');
          post.publishStatus = published ? '已发布' : '未发布';
          post.status = published ? '已发布' : '已隐藏';
          const at = new Date().toLocaleString('sv-SE').slice(0, 16);
          post.history = [...(post.history || []), { text: published ? '回复时恢复原帖展示' : '回复时隐藏原帖', at }];
          const affair = data.affairs.find((a) => String(a.postId) === active.postId);
          if (affair) affair.publicationMode = post.publishStatus;
          data.audit ||= [];
          data.audit.unshift({ action: '内容发布', target: post.id, detail: published ? '原帖已展示' : '原帖已隐藏', at });
        }
      }
      let thread = data.privateThreads.find((t) => t.postId === active.postId);
      if (!thread) { thread = { postId: active.postId, authorId: active.authorId, messages: [] }; data.privateThreads.push(thread); }
      thread.messages.push({ id: Date.now(), role: active.role, senderId: active.userId, text, quote: active.quote, at: new Date().toLocaleString('sv-SE').slice(0, 16), read: false });
      saveThreads(data.privateThreads);
      data.audit ||= [];
      data.audit.unshift({ action: '私聊发送', target: active.postId, detail: '发送原帖私密消息', at: new Date().toISOString() });
      PrototypeData.save(data);
      draw();
      showToast('回复已发送，原帖展示设置已保存');
    }
  };
  // Refresh notification badges when another prototype tab receives a reply.
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey) return;
    if (active) return;
    if (typeof render === 'function') render();
  });
})();
