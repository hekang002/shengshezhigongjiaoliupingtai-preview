# 消息中心设计规范（职工端）

> 适用范围：职工端侧栏「通知公告」升级为「**消息中心**」的增量改造。
> 设计原则：**沿用现有视觉系统，不换风格、不引入新配色**。所有样式一律取自 `styles.css` 已有令牌。
> 版本：v1 · 2026-10-10 · 撰写：彩格调（设计系统专家）

---

## 0. 结论速览

| 项 | 结论 |
|----|------|
| `.message-*` 家族 | **已在 `styles.css` L1124–1180 完整实现**，无需重写 |
| 是否需要新色值 | **否**。全部使用 `--red / --red-pale / --muted / --ink-2 / --green / --line / --paper` |
| 本次追加样式 | 7 条（见 §7），仅用于**补齐状态显式化**与**拉开一/二级页签层级** |
| 是否改动 `app.js`/`mobile.js`/`index.html` | **否** |
| 一级 vs 二级页签 | **红色下划线 = 一级，中性灰底 = 二级**（一句话规则，见 §6） |

---

## 1. 现有令牌摘录（实际取自 `styles.css :root`，L1–L17）

| 令牌 | 取值 | 用途 |
|------|------|------|
| `--red` | `#b52c2f` | 供销红，一级导航/强调/未读 |
| `--red-dark` | `#8f2024` | 红色 hover 深态 |
| `--red-pale` | `#fbebea` | 红色浅底（图标底、类型标签底） |
| `--ink` | `#202224` | 主文本 |
| `--ink-2` | `#343638` | 次级文本 |
| `--paper` | `#fff` | 卡片/面板底色 |
| `--canvas` | `#f6f5f2` | 页面画布底 |
| `--line` | `#deded9` | 分割线/边框 |
| `--muted` | `#72767b` | 弱化文本/元信息 |
| `--gold` | `#c89a45` | 点缀金 |
| `--green` | `#237a57` | 正向语义（公开答复） |
| `--blue` | `#2663a6` | 信息语义 |
| `--shadow` | `0 18px 42px rgba(22,24,25,.11)` | 卡片阴影 |
| `--radius` | `7px` | 圆角 |

### 1.1 角色级令牌（`.workspace`，L274–L277）

```css
.workspace            { --role: var(--red);      --role-soft: var(--red-pale); }
.workspace.role-handler { --role: #237a57;        --role-soft: #e8f4ee; }
.workspace.role-admin   { --role: #2663a6;        --role-soft: #eaf1fa; }
.workspace.role-leader  { --role: #967128;        --role-soft: #fbf3df; }
```

> ⚠️ **重要约定**：`--role` 会随角色切换变色（办理人绿 / 管理员蓝 / 领导金）。
> `.knowledge-*` 家族依赖 `--role`，**会跟着角色变色**；
> 而 `.message-*` 家族**直接引用 `var(--red)`**，因此在所有角色下保持统一的「供销红」。
> **消息中心一律使用 `var(--red)`，禁止改用 `var(--role)`**，否则切换角色时消息中心配色会漂移。

### 1.2 已有字面量（非令牌，沿用不改动）

`.message-item` 与 `.message-list` 中存在少量既有硬编码色，本次**保持原样**，仅作记录：

- `.message-list` 背景 `#f7f7f5`
- `.message-item` 边框 `#e7e8e4`、hover 边框 `#dcd8d4`
- `.message-item.read` 背景 `#fcfcfb`、已读图标底 `#f2f2f0`
- `.message-item-actions button` 边框 `#d6a8a9`

---

## 2. 一级页签 `.message-tabs`（PC 端）

**结构**（`app.js` L682–685，`<nav>` 语义）：

```html
<nav class="message-tabs" aria-label="消息中心分类">
  <button type="button" class="message-tab active" aria-current="page">通知公告</button>
  <button type="button" class="message-tab">互动</button>
  <button type="button" class="message-tab">官方回复<span class="message-tab-badge">3</span></button>
</nav>
```

**规格**（`styles.css` L1127–1131）：

| 项 | 取值 |
|----|------|
| 容器 | `flex`，`gap: 2px`，`padding: 0 15px`，`border-bottom: 1px solid var(--line)`，背景 `#fbfbfa` |
| 按钮高度 | `min-height: 48px` |
| 内边距 | `padding: 0 17px` |
| 字号 / 字距 | `13px` / `letter-spacing: 1px` |
| 过渡 | `color / background-color / border-color .18s ease` |

**状态**：

| 状态 | 表现 |
|------|------|
| 默认 | `color: var(--muted)`，透明底，下边框 `2px solid transparent` |
| hover | `color: var(--red)`，底 `rgba(181,44,47,.04)` |
| active | `color: var(--red)`，`border-bottom: 2px solid var(--red)`，底 `var(--paper)`，`font-weight: 700` |
| focus | 继承全局按钮焦点样式（建议沿用 `--gold` outline，与 `.knowledge-tabs button:focus-visible` 一致） |

> 未读数为 0 时**不渲染** `.message-tab-badge`，避免无意义的「0」徽标。

**移动端** `.mobile-message-tabs`（`styles.css` L1167–1169，`mobile.js` L77）：
复用 `.mobile-segments` 分段控件，active 为 `--red` 文字 + `--red-pale` 底 + 700 字重。
本次追加 `min-height: 48px` 与红色下划线，使其与 42px 的二级页签拉开差距。

---

## 3. 未读徽标

### 3.1 页签计数徽标 `.message-tab-badge`

| 项 | 取值 |
|----|------|
| 尺寸 | `min-width: 17px`，`padding: 1px 5px` |
| 圆角 | `border-radius: 9px`（胶囊） |
| 配色 | 白字 `#fff` + 底 `var(--red)` |
| 字号 / 行高 | `10px / 16px` |
| 位置 | `margin-left: 6px`，`vertical-align: 1px` |

- **对比度**：`#fff` on `#b52c2f` ≈ **6.24:1** ✅ 通过 WCAG AA（小文本 ≥4.5:1）
- 移动端对应 `.mobile-message-tabs b`（`min-width: 15px`，`9px` 字号，`margin-left: 4px`），配色一致

### 3.2 列表项红点 `.message-unread-dot`

```html
<h3>标题文字<i class="message-unread-dot" aria-label="未读"></i></h3>
```

| 项 | 取值 |
|----|------|
| 尺寸 | `6px × 6px`，`border-radius: 50%` |
| 颜色 | `background: var(--red)` |
| 位置 | `margin: 0 0 2px 5px`（标题右上角） |

- 仅在**未读**时渲染；已读时整个 `<i>` 不输出（见 `app.js` L688、L693）
- 与 `.knowledge-notice-item h3 i` 的既有点样式保持 6px 一致的视觉节奏

---

## 4. 消息列表卡片 `.message-item`

**结构**（`app.js` L688 / L693）：

```html
<article class="message-item unread">
  <span class="message-item-icon"><i class="icon"></i></span>
  <div class="message-item-main">
    <div class="message-item-meta">
      <span class="message-item-type">官方回复</span>
      <small>时间</small>
    </div>
    <h3>标题<i class="message-unread-dot"></i></h3>
    <p>摘要…</p>
    <div class="message-item-note"><span class="message-item-scope public">公开答复</span></div>
  </div>
  <div class="message-item-actions"><button class="primary">查看回复</button></div>
</article>
```

### 4.1 布局

| 元素 | 说明 |
|------|------|
| `.message-list` | `grid`，PC 端 **2 列**（`gap: 12px`，`padding: 14px`，背景 `#f7f7f5`）；≤820px 降为 1 列 |
| `.message-item` | `flex`，`min-height: 124px`，`gap: 12px`，`padding: 13px 14px 12px`，`border: 1px solid #e7e8e4`，底 `var(--paper)` |
| `.message-item-icon` | `34px` 圆形（`border-radius: 50%`），`flex: none` |
| `.message-item-main` | `flex: 1`，`min-width: 0`（保证省略号生效） |
| `.message-item-actions` | `flex: none`，`align-self: center`（移动端 `flex-end`） |

### 4.2 排版层级

| 层级 | 元素 | 字号 | 颜色 | 说明 |
|------|------|------|------|------|
| L1 标题 | `.message-item-main h3` | `13px / 1.45` | 继承 `--ink` | 未读加红点 |
| L2 摘要 | `.message-item-main p` | `11px / 1.6` | `#5d6266` | 2 行截断（`-webkit-line-clamp: 2`） |
| L3 类型 | `.message-item-type` | `10px`，`700` | `--red` / `--red-pale` 底 | 胶囊标签 |
| L4 元信息 | `.message-item-meta > small` | `9px` | `--muted` | 单行省略 |
| L5 可见性 | `.message-item-scope` | `9px` | `--muted` / `--green` | 描边胶囊 |

### 4.3 状态

| 状态 | class | 表现 |
|------|-------|------|
| **未读** | `.message-item.unread` | 卡片底 `var(--paper)`；图标底 `--red-pale` / 图标色 `--red`；类型标签红字红底；标题带红点 |
| **已读** | `.message-item.read` | 卡片底 `#fcfcfb`（弱化）；图标底 `#f2f2f0` / 图标色 `--muted`；类型标签灰字灰底；红点移除 |
| **hover** | `.message-item:hover` | 仅边框加深为 `#dcd8d4`，**不改背景**（与 `.knowledge-item:hover` 的极轻反馈一致） |
| **空态** | `.message-empty` | 见 §5 |

> **状态命名约定**：JS 输出 `read` / `unread` 二者之一。
> 未读 = 卡片默认态；`.unread` 本次已显式声明，防止后续调整 `.read` 时误伤默认样式。

---

## 5. 空态 `.message-empty`

| 项 | 取值 |
|----|------|
| 占位 | `grid-column: 1 / -1`（跨满列表所有列） |
| 内边距 | `padding: 34px 10px` |
| 文案色 | `color: var(--muted)` |
| 背景 | `var(--paper)`（与卡片同底，避免"空洞"感） |
| 对齐 / 字号 | `text-align: center` / `11px` |

**文案规则**（须说明"为什么空"，尤其在筛选态）：

| 场景 | 文案 |
|------|------|
| 互动列表为空 | `暂无互动消息` |
| 官方回复为空 | `暂无官方回复` |
| 通知公告 · 未读筛选为空 | `暂无未读通知。` |
| 通知公告 · 已读筛选为空 | `暂无已读通知。` |

> 通知公告页沿用 `.knowledge-notice-empty`（`styles.css` L1171 补移动端 `padding: 26px 12px`），
> 与 `.message-empty` 视觉等价，保持家族一致性。

---

## 6. 一级 vs 二级页签：层级规则（核心）

### 6.1 问题

`.message-tabs`（一级）与 `.knowledge-notice-tabs`（二级）容器**底色相同**（`#fbfbfa`）、
**下边框相同**（`1px solid var(--line)`），且二级 active 使用 `--red-pale` **填充色**，
其"色块重量"甚至**强于**一级 active 的白色底——存在**层级倒挂**风险，易被误认为同级导航。

### 6.2 规则（一句话）

> **红色 = 一级导航，中性灰 = 二级筛选。** 一级靠"高度 + 红色下划线"承重，二级靠"小尺寸 + 灰底描边"退让。

### 6.3 对照表

| 维度 | 一级 `.message-tab` | 二级 `.knowledge-notice-tabs button` |
|------|--------------------|--------------------------------------|
| 语义 | 分类导航（切换内容源） | 阅读状态筛选（过滤同列表） |
| 高度 | **48px**（移动端 48px） | **28px**（移动端 42px） |
| 字号 | **13px** | **11px** |
| 字距 | `letter-spacing: 1px` | 无 |
| active 形态 | **红色 2px 下划线** + 红字 + 白底 + 700 | **灰色 2px 下划线** + `--ink-2` 字 + 白底 + 700 |
| active 填充 | 白底（`--paper`），接近容器底 | 白底（`--paper`），仅下划线区分 |
| 位置 | 紧贴 `.message-center` 顶部 | 位于 `.message-section-head` **之后**（嵌套在内容区内） |
| ARIA | `aria-current="page"` | 无 `aria-current`，仅 `aria-label="通知公告阅读状态"` |

### 6.4 补充说明

- **结构层级优先于视觉层级**：二级页签嵌套在 `<section class="message-section">` 内部、
  位于区块标题之后，视觉上被"包"在内容里；一级页签是 `.message-center` 的直接子元素、位于最顶部。
- 二级页签的**未读计数**用 `<b>` 元素（`9px` 白字红底胶囊），与一级 `.message-tab-badge` 同色但更小，
  形成"同色不同级"的次级信号。
- 降级仅在 `.message-center` 作用域内生效（见 §7），**不影响知识库页面内独立使用的 `.knowledge-notice-tabs`**。

---

## 7. 本次追加的样式（`styles.css` 末尾，共 7 条）

> 全部使用现有令牌，**零新增色值**。

```css
/* 1) 显式锁定未读默认态，防止 .read 规则被误改时反向影响默认样式 */
.message-item.unread { background: var(--paper); }

/* 2) 官方回复项：左侧 3px 红条（复用 .knowledge-question-answer 的权威答复语言）
      用 :has() 命中，因此无需改动 app.js */
.message-item:has(.message-item-scope) { border-left: 3px solid var(--red); }

/* 3) 官方回复标题转宋体，强化「正式文书」语感 */
.message-item:has(.message-item-scope) .message-item-main h3 {
  font-family: SimSun, "STSong", serif;
  letter-spacing: .3px;
}

/* 4) 显式声明「仅本人可见」中性态（此前仅靠基类隐式兜底） */
.message-item-scope.private { color: var(--muted); border-color: var(--line); background: var(--paper); }

/* 5) 二级页签降级为中性灰，让红色专属于一级导航 */
.message-center .knowledge-notice-tabs button.active {
  color: var(--ink-2);
  background: var(--paper);
  box-shadow: inset 0 -2px 0 var(--line);
}

/* 6)(7) 移动端一级页签加高并加红色下划线，与 42px 二级页签拉开差距 */
.mobile-message-tabs button { min-height: 48px; font-size: 12px; letter-spacing: 1px; }
.mobile-message-tabs button.active { box-shadow: inset 0 -2px 0 var(--red); }
```

### 7.1 为什么现有类不够用

| 追加项 | 原因 |
|--------|------|
| `.message-item.unread` | 此前**未读态没有独立规则**，完全依赖「基类默认值」。一旦有人调整 `.message-item` 基类背景，未读/已读的对比会被静默破坏。显式声明可锁定语义。 |
| `:has(.message-item-scope)` 红条 | `app.js` 渲染官方回复项时**未输出任何区分 class**（只输出 `read`/`unread`）。而「权威答复 vs 社交反馈」是本次改造的核心语义差异，必须在视觉上可辨。用 `:has()` 可在**不改 JS** 的前提下命中——该选择器在本项目已有先例（`.mobile-progress-detail:has(...)`，L678），无兼容风险。 |
| 宋体标题 | 本系统已建立「宋体 = 正式/权威」的约定（`.message-section-head h2`、`.knowledge-question-tools h2` 均为 SimSun）。官方回复标题沿用，零成本获得权威感。 |
| `.message-item-scope.private` | JS 会输出 `private` class，但 CSS **只有 `.public` 有规则**，`private` 靠基类隐式兜底。补全后双态对称、可维护。 |
| 二级页签降级 | 见 §6.1 层级倒挂问题。必须降级才能建立「红=一级」的唯一强信号。 |
| 移动端 48px + 下划线 | 移动上一级 44px vs 二级 42px 仅差 2px，几乎无法区分。加高至 48px 并补下划线。 |

---

## 8. 「官方回复」vs「互动」的视觉差异

**约束**：只用排版 / 图标 / 边框手段，**不引入新颜色**。

| 手段 | 官方回复（权威答复） | 互动（社交反馈） |
|------|---------------------|-----------------|
| 图标 | `messages-square`（统一官印式图标） | 按类型变化：`message-circle` / `heart` / `flag` 等（`item.icon`） |
| 卡片左边框 | **`border-left: 3px solid var(--red)`**（本次追加） | 无（保持 1px 常规边框） |
| 标题字体 | **宋体** SimSun / STSong | 默认无衬线 |
| 类型标签文案 | 固定「官方回复」 | 动态：评论 / 点赞 / 举报 |
| 附加信息 | **可见性徽标** `.message-item-scope`（公开答复 / 仅本人可见） | 无 |
| 操作按钮文案 | 「查看回复」 | 「查看」 |

**设计依据**：「左侧 3px 红条 + 浅红底」是本系统**已有的权威答复语言**，见于
`.knowledge-question-answer { border-left: 3px solid var(--red); background: var(--red-pale); }`（L575）。
官方回复卡片沿用同一语言（仅取左侧红条，不铺满浅红底，以免整卡过响），
因此**既建立了权威感，又没有引入任何新的视觉词汇**。

---

## 9. 可见性徽标 `.message-item-scope`

新增语义元素，双态小标签。

| 状态 | class | 文字色 | 边框 | 底色 |
|------|-------|--------|------|------|
| 公开答复 | `.message-item-scope.public` | `var(--green)` `#237a57` | `#cbe3d7` | `#f4faf7` |
| 仅本人可见 | `.message-item-scope.private` | `var(--muted)` `#72767b` | `var(--line)` `#deded9` | `var(--paper)` `#fff` |

**共同规格**：`display: inline-flex`，`padding: 1px 7px`，`border: 1px solid`，`border-radius: 9px`，`font-size: 9px`。

**对比度检查**：

| 组合 | 比值 | 结论 |
|------|------|------|
| `#237a57` on `#f4faf7` | ≈ **4.99:1** | ✅ 通过 WCAG AA（≥4.5:1） |
| `#72767b` on `#fff` | ≈ **4.58:1** | ✅ 通过 WCAG AA |

> 语义映射：公开答复 = **正向/可传播**（绿）；仅本人可见 = **中性/私密**（灰）。
> 与 `.knowledge-question-status.published`（绿）保持一致的色彩语义。

---

## 10. 无障碍与响应式

### 10.1 无障碍

| 项 | 要求 |
|----|------|
| 页签容器 | `<nav aria-label="消息中心分类">` |
| 一级当前项 | `aria-current="page"`（非当前项 `aria-current="false"`） |
| 二级容器 | `aria-label="通知公告阅读状态"` |
| 红点 | `aria-label="未读"`，因为 `<i>` 为纯装饰，读屏需文字替代 |
| 焦点可见 | 沿用 `.knowledge-tabs button:focus-visible` 的 `outline: 2px solid var(--gold)` |

> ⚠️ 已知项：`--muted #72767b` 在 `#fbfbfa`（页签容器底）上对比度约 **4.42:1**，
> 略低于 AA 的 4.5:1。因本项目要求"沿用现有视觉系统"，**本次不调整令牌**；
> 若后续要做无障碍专项整改，建议将一级页签默认文字色由 `--muted` 调整为 `--ink-2`（≈ 10.9:1）。

### 10.2 响应式（断点 820px，来自 `styles.css` L1173–1180）

| 元素 | PC | ≤820px |
|------|-----|--------|
| `.message-list` | 2 列 | **1 列** |
| `.message-tab` | `48px` / `13px` / 字距 1px | `44px` → 本次**加高至 48px** / `12px` / 字距 0 → **1px** |
| `.message-item-actions` | `align-self: center` | `align-self: flex-end` |
| `.message-section-head` | `66px` / `padding 10px 17px` | `56px` / `padding 9px 13px` |
| `.message-section-head h2` | `18px` | `16px` |
| `.message-tabs` | `padding: 0 15px` | `padding: 0 4px` |

---

## 11. 完整 class 清单（供研发对照）

| class | 状态/用途 | CSS 位置 |
|-------|----------|---------|
| `.message-center` | 外层卡片容器 | L1125 |
| `.message-tabs` | 一级页签容器 | L1127 |
| `.message-tab` | 一级页签按钮 | L1128 |
| `.message-tab:hover` | 悬停 | L1129 |
| `.message-tab.active` | 当前页签 | L1130 |
| `.message-tab-badge` | 页签未读计数 | L1131 |
| `.message-section-head` | 区块标题栏 | L1132 |
| `.message-section-mark` | 标题左侧红色竖条 | L1134 |
| `.message-section-actions` | 标题右侧操作区 | L1137 |
| `.message-unread-count` | 未读计数文本 | L1140 |
| `.message-unread-count.has-unread` | 有未读（红字加粗） | L1141 |
| `.message-list` | 列表网格容器 | L1142 |
| `.message-item` | 消息卡片 | L1143 |
| `.message-item:hover` | 悬停 | L1144 |
| `.message-item.read` | 已读态 | L1145 |
| `.message-item.unread` | 未读态（**本次显式化**） | 追加 |
| `.message-item:has(.message-item-scope)` | 官方回复权威红条（**本次新增**） | 追加 |
| `.message-item-icon` | 圆形图标区 | L1146 |
| `.message-item-main` | 主内容区 | L1149 |
| `.message-item-meta` | 元信息行 | L1150 |
| `.message-item-type` | 类型胶囊标签 | L1151 |
| `.message-unread-dot` | 标题右侧红点 | L1155 |
| `.message-item-note` | 附加信息行 | L1157 |
| `.message-item-scope` | 可见性徽标基类 | L1158 |
| `.message-item-scope.public` | 公开答复 | L1159 |
| `.message-item-scope.private` | 仅本人可见（**本次补全**） | 追加 |
| `.message-item-actions` | 操作按钮区 | L1160 |
| `.message-empty` | 空态 | L1163 |
| `.message-foot` | 列表脚注 | L1164 |
| `.mobile-message-tabs` | 移动端一级页签 | L1167 |
| `.mobile-reply-scope` | 移动端可见性徽标 | L1170 |
| `.knowledge-notice-tabs` | 二级页签（**本次在消息中心内降级**） | L793 |
