const accounts = [
  { id: 'staff', phone: '13800002026', password: '123456', role: 'staff', name: '张晓雨', department: '合作指导处', status: 'approved' },
  { id: 'handler', phone: '13600002026', password: '123456', role: 'handler', name: '陈凯', department: '经济发展处', status: 'approved' },
  { id: 'handler-office', phone: '13600002027', password: '123456', role: 'handler', name: '刘敏', department: '办公室', status: 'approved' },
  { id: 'handler-cooperation', phone: '13600002028', password: '123456', role: 'handler', name: '周磊', department: '合作指导处', status: 'approved' },
  { id: 'admin', phone: '13500002026', password: '123456', role: 'admin', name: '王敏', department: '平台管理组', status: 'approved' },
  { id: 'leader', phone: '18800002026', password: '123456', role: 'leader', name: '李建国', department: '省社机关', status: 'approved' },
  { id: 'pending', phone: '13900002026', password: '123456', role: 'staff', name: '周宁', department: '待完善', status: 'pending', submitted: '2026-09-10 09:36' },
  { id: 'rejected', phone: '13700002026', password: '123456', role: 'staff', name: '孙晨', department: '待完善', status: 'rejected', submitted: '2026-09-09 14:18' }
];

const dashboards = {
  staff: {
    title: '职工工作台', desc: '查看个人提醒、交流动态和已提交事项的最新进展。',
    metrics: [['待办提醒', '3', '2 项待回复', 'warn'], ['我的发言', '12', '较上月 +4', ''], ['收到回复', '8', '本周新增 3 条', 'info'], ['已办结事项', '6', '办结率 86%', '']],
    listTitle: '与我相关', rows: [['关于优化机关食堂晚餐供应时段的建议', '已受理 · 办公室', '办理中', '今天 10:12'], ['县域冷链项目验收资料整理经验分享', '业务交流 · 12 条新回复', '交流中', '昨天 16:40'], ['新入职职工业务导师制度建议', '建言献策 · 等待受理', '待受理', '09-08']],
    insight: '本周交流提醒', insightText: '你关注的“县域冷链”话题新增 12 条高质量经验分享。', progress: [['我的事项办理进度', '72%'], ['本月互动完成度', '64%']], action: '查看我的帖子'
  },
  handler: {
    title: '承办工作台', desc: '聚焦待办事项、答复草稿和超期风险，推动办理闭环。',
    metrics: [['待办理事项', '12', '较昨日 +2', 'warn'], ['即将超期', '3', '请优先处置', 'warn'], ['答复草稿', '5', '2 份待提交', 'info'], ['本月办结', '28', '办结率 91%', '']],
    listTitle: '我的待办', rows: [['基层社农资配送时效问题', '限时：09 月 12 日 · 紧急', '即将超期', '09-10'], ['建议建立产销信息跨单位共享机制', '限时：09 月 15 日 · 合作指导处', '办理中', '09-10'], ['食堂晚餐供应时段优化建议', '待补充办理依据', '待补充', '09-09']],
    insight: '办理提示', insightText: '有 3 项事项将在 48 小时内到期，请优先补充办理意见。', progress: [['本月事项按期办结', '91%'], ['答复公开完成率', '76%']], action: '进入事项办理'
  },
  admin: {
    title: '平台管理工作台', desc: '统筹内容治理、账号审核和事项分办，维护平台平稳运行。',
    metrics: [['待审核内容', '8', '含 3 条评论', 'warn'], ['待分办事项', '6', '2 件需要确认', 'warn'], ['平台用户', '2,468', '本周新增 19 人', 'info'], ['今日访问', '386', '较昨日 +8.4%', '']],
    listTitle: '待处理事务', rows: [['新注册账号审核', '待审核 2 条 · 请核验手机号', '待审核', '今天 09:36'], ['“农资配送”事项分办建议', '来源：心声诉求板块', '待分办', '今天 08:52'], ['评论审核提醒', '含 1 条敏感表达待确认', '待审核', '昨天 17:20']],
    insight: '运行提示', insightText: '今日发布内容均已完成机审，人工审核队列保持在可控范围。', progress: [['内容审核及时率', '96%'], ['事项分办完成率', '88%']], action: '进入内容审核'
  },
  leader: {
    title: '领导运行视图', desc: '掌握平台运行、热点议题与重点事项闭环情况。',
    metrics: [['运行事项', '86', '本周新增 9 项', 'info'], ['闭环办结率', '92.6%', '较上月 +2.1%', ''], ['热点议题', '14', '3 项持续升温', 'warn'], ['重点事项', '5', '均在办理时限内', '']],
    listTitle: '重点事项', rows: [['基层社农资保供配送机制优化', '牵头：经济发展处 · 重点督办', '办理中', '09-10'], ['县域流通网络建设意见征集', '牵头：合作指导处 · 公开答复', '已答复', '09-09'], ['职工后勤服务满意度提升', '牵头：办公室 · 持续跟踪', '跟踪中', '09-08']],
    insight: '专题洞察', insightText: '“基层服务效率”本周讨论热度上升 23%，建议关注农资保供与配送协同。', progress: [['重点事项按期推进', '100%'], ['职工诉求闭环质量', '93%']], action: '查看专题分析'
  }
};

const policyBanners = [
  { title: '推进基层供销社高质量发展', summary: '围绕为农服务体系建设，明确本季度重点工作与协同要求。', tag: '政策解读', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=82' },
  { title: '农产品流通体系建设行动要点', summary: '聚焦县域商业、冷链物流和产销对接，提升流通服务能力。', tag: '专项行动', image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=82' },
  { title: '关于做好秋季农资保供工作的通知', summary: '加强货源组织和基层网点服务，保障重点地区农资稳定供应。', tag: '工作通知', image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e8?auto=format&fit=crop&w=1600&q=82' },
  { title: '再生资源回收网络建设指引', summary: '推动回收站点规范化、资源化与数字化协同发展。', tag: '行业指引', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=82' },
  { title: '职工服务与交流平台使用规范', summary: '明确发言边界、内容审核和互动处置，营造良好交流环境。', tag: '平台规则', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82' }
];

const portalPosts = [
  { id: 1, board: '建言献策', title: '建议建立农产品产销信息跨单位共享机制', excerpt: '市县供销社、基层网点与直属企业掌握的供需信息仍存在时间差，建议按周形成标准化供需清单，供相关单位及时对接使用。', content: ['目前，市县供销社、基层网点和直属企业掌握的供需信息分散在不同业务系统中，发布时间、统计口径和更新频率也不一致，实际对接时往往还需要反复核实。', '建议由合作指导处牵头统一信息模板，按周汇总主要农产品的品类、数量、规格、可供时间和目标区域，并明确各单位更新责任人及截止时间。', '对涉及采购、仓储和配送的跨单位事项，可同步增加承办联系人，形成“信息发布—需求确认—资源匹配—结果反馈”的闭环，减少重复沟通。'], media: { src: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=82', alt: '农产品产销对接场景', caption: '统一供需信息口径，有助于基层网点与市场渠道及时对接。' }, author: '山野微风', time: '今天 09:24', likes: 42, favorites: 16, comments: 18, status: '已受理', commentList: [{ author: '合作指导处', text: '已纳入本周调研范围，正在汇总各单位情况。', status: '已通过' }] },
  { id: 2, board: '心声诉求', title: '关于优化机关食堂晚餐供应时段的建议', excerpt: '部分处室加班较多，现有晚餐领取时间偏早，希望结合实际用餐数据适当调整，满足加班职工的就餐需求。', author: '一盏清茶', time: '今天 08:47', likes: 27, favorites: 9, comments: 9, status: '办理中', commentList: [{ author: '办公室', text: '已纳入本周服务优化安排，后续将公布调整结果。', status: '已通过' }] },
  { id: 3, board: '业务交流', title: '县域冷链项目验收资料整理经验分享', excerpt: '整理了一套验收材料目录和常见退回原因，供近期负责同类项目的同事参考，也欢迎补充其他地区的有效做法。', author: '江城行者', time: '昨天 11:06', likes: 65, favorites: 34, comments: 22, status: '交流中', commentList: [{ author: '向阳而行', text: '目录很实用，已补充一份冷库设备验收清单。', status: '已通过' }] },
  { id: 4, board: '回音壁', title: '关于集中采购办公耗材配送周期问题的答复', excerpt: '经核查，已与供应商重新约定常用耗材补货时限，并建立缺货预警机制，后续将持续跟踪配送执行情况。', author: '办公室', time: '09 月 06 日', likes: 31, favorites: 11, comments: 6, status: '已答复', commentList: [{ author: '后勤服务组', text: '本周已完成第一轮补货，配送周期已缩短。', status: '已通过' }] },
  { id: 5, board: '建言献策', title: '关于完善基层社经营目标考核的建议', excerpt: '建议在统一考核框架下增加为农服务质量和基层网点覆盖指标，兼顾经营规模与服务成效，避免单一数量导向。', author: '基层同行', time: '今天 07:56', likes: 35, favorites: 14, comments: 12, status: '已受理' },
  { id: 6, board: '建言献策', title: '建立跨区域农产品品牌联合推广机制', excerpt: '可依托省级平台整合各地特色农产品资源，通过统一活动策划、渠道对接和内容传播，降低单个县域品牌推广成本。', author: '品牌观察', time: '昨天 17:18', likes: 48, favorites: 22, comments: 16, status: '已受理' },
  { id: 7, board: '建言献策', title: '优化基层网点数字化设备配置建议', excerpt: '部分基层网点终端设备使用年限较长，建议结合业务量和设备状态分批更新，并同步开展操作培训与运维保障。', author: '数字供销', time: '昨天 15:34', likes: 29, favorites: 10, comments: 8, status: '待受理' },
  { id: 8, board: '建言献策', title: '完善职工创新项目容错激励机制', excerpt: '建议对业务创新中非主观故意造成的问题建立容错清单，同时设置过程评价和成果转化奖励，鼓励基层主动探索。', author: '改革之声', time: '昨天 10:12', likes: 39, favorites: 19, comments: 14, status: '办理中' },
  { id: 9, board: '建言献策', title: '建立为农服务项目专家库建议', excerpt: '针对基层项目建设和技术服务需求，建议按农业技术、冷链物流、品牌运营等领域建立专家库，提供常态化咨询支持。', author: '田野智库', time: '09 月 09 日', likes: 33, favorites: 17, comments: 11, status: '已受理' },
  { id: 10, board: '建言献策', title: '推进社有企业青年人才双向交流', excerpt: '建议建立机关与社有企业、市县社之间的青年人才轮岗机制，明确周期、岗位任务和评价方式，促进经验互补。', author: '青春供销', time: '09 月 08 日', likes: 44, favorites: 21, comments: 19, status: '办理中' },
  { id: 11, board: '心声诉求', title: '关于改善基层社职工通勤保障的建议', excerpt: '部分基层网点公共交通覆盖不足，晚间值班通勤较为不便，希望结合实际调研优化班车线路或提供相应保障。', author: '基层小周', time: '昨天 16:42', likes: 25, favorites: 7, comments: 10, status: '办理中' },
  { id: 12, board: '心声诉求', title: '建议优化业务系统账号权限办理流程', excerpt: '新入职和岗位调整人员账号权限办理环节较多，建议明确线上申请材料与审批时限，减少重复提交和线下确认。', author: '系统用户', time: '昨天 13:28', likes: 18, favorites: 6, comments: 7, status: '已回复' },
  { id: 13, board: '心声诉求', title: '关于增设职工健康咨询服务的诉求', excerpt: '希望定期组织健康讲座和基础咨询，重点关注久坐办公、颈椎腰椎及心理健康问题，提升职工健康管理意识。', author: '健康同行', time: '09 月 09 日', likes: 37, favorites: 16, comments: 13, status: '已受理' },
  { id: 14, board: '心声诉求', title: '老旧办公楼饮水设备维护问题', excerpt: '部分楼层饮水设备制水速度较慢，偶有故障提示，希望增加巡检频次并明确报修后的响应时限。', author: '楼层守望', time: '09 月 09 日', likes: 16, favorites: 4, comments: 5, status: '办理中' },
  { id: 15, board: '心声诉求', title: '关于优化出差报销审批流程的建议', excerpt: '部分公务出差存在材料重复填写和审批节点较多的问题，建议进一步打通业务系统数据，提升报销办理效率。', author: '轻装出行', time: '09 月 08 日', likes: 30, favorites: 12, comments: 11, status: '待受理' },
  { id: 16, board: '心声诉求', title: '基层社职工培训名额分配建议', excerpt: '建议结合岗位需求和个人发展意愿分配培训名额，并向长期在基层一线工作的职工适当倾斜，增强培训实效。', author: '成长计划', time: '09 月 07 日', likes: 28, favorites: 10, comments: 9, status: '已回复' },
  { id: 17, board: '业务交流', title: '农资集采集配降本增效做法分享', excerpt: '通过汇总区域内基层网点需求、统一谈判采购和优化配送路线，有效降低单品采购成本并缩短到货周期。', author: '农资先锋', time: '昨天 18:06', likes: 58, favorites: 31, comments: 25, status: '交流中' },
  { id: 18, board: '业务交流', title: '再生资源回收网点运营数据复盘', excerpt: '结合近三个月回收品类、周转效率和人员配置数据，梳理网点经营中的主要波动原因与可优化环节。', author: '绿源先锋', time: '昨天 14:26', likes: 41, favorites: 23, comments: 15, status: '交流中' },
  { id: 19, board: '业务交流', title: '县域流通项目节点管理经验', excerpt: '围绕项目立项、招标、建设、验收等关键节点建立周清单和风险提示机制，便于各方及时掌握推进状态。', author: '项目管家', time: '昨天 09:51', likes: 47, favorites: 26, comments: 18, status: '交流中' },
  { id: 20, board: '业务交流', title: '基层社资产盘活中的税务处理交流', excerpt: '整理了资产租赁、合作经营和产权转让等常见情形涉及的税务处理要点，供各基层社结合实际参考。', author: '财税同行', time: '09 月 09 日', likes: 36, favorites: 29, comments: 14, status: '交流中' },
  { id: 21, board: '业务交流', title: '农产品品牌共建案例与问题清单', excerpt: '梳理多地区联合品牌建设中的授权管理、质量标准、渠道分工和利益联结机制，方便后续项目对照使用。', author: '品牌服务组', time: '09 月 08 日', likes: 52, favorites: 28, comments: 20, status: '交流中' },
  { id: 22, board: '业务交流', title: '农业社会化服务项目验收要点', excerpt: '结合项目验收常见问题，整理服务台账、作业记录、满意度评价和资金使用材料的核对要点。', author: '服务观察员', time: '09 月 07 日', likes: 43, favorites: 24, comments: 17, status: '交流中' },
  { id: 23, board: '回音壁', title: '关于基层社网点设备更新问题的答复', excerpt: '已组织相关单位摸底设备使用情况，后续将按照急用先行、分批实施的原则推进更新，并同步完善运维支持。', author: '合作指导处', time: '昨天 16:08', likes: 34, favorites: 13, comments: 8, status: '已答复' },
  { id: 24, board: '回音壁', title: '关于职工培训名额分配问题的答复', excerpt: '后续培训名额分配将兼顾岗位需求、基层一线和职工发展意愿，具体规则将在每期培训通知中同步说明。', author: '人事处', time: '昨天 12:30', likes: 26, favorites: 9, comments: 6, status: '已答复' },
  { id: 25, board: '回音壁', title: '业务系统权限流程优化处理结果', excerpt: '已完成账号权限申请材料梳理，线上审批流程正在调整，计划于本月内上线试运行并收集使用反馈。', author: '平台管理组', time: '09 月 09 日', likes: 22, favorites: 8, comments: 5, status: '已办结' },
  { id: 26, board: '回音壁', title: '职工通勤保障诉求办理进展', excerpt: '已收集相关基层网点通勤线路和时间数据，正在与交通服务单位沟通可行的优化方案。', author: '办公室', time: '09 月 08 日', likes: 19, favorites: 6, comments: 4, status: '已答复' }
].map((post) => ({ ...post, commentList: post.commentList || [{ author: '平台管理组', text: '内容已收到，相关单位将结合实际工作跟进。', status: '已通过' }] }));

const homeNotices = [
  { id: 'notice-1', channel: '其他', category: '其他', icon: 'book-open', title: '平台发言与信息发布规范（试行）', summary: '请按平台规范发布内容，涉及业务材料时注意信息安全和隐私保护。', meta: '社区规则 · 09-10' },
  { id: 'notice-2', channel: '建言献策', category: '建言献策', icon: 'shield-check', title: '职工交流平台内容审核规范', summary: '了解内容审核范围、处理方式和申诉反馈渠道，保障交流内容及时被看见。', meta: '内容规范 · 09-09' },
  { id: 'notice-3', channel: '心声诉求', category: '心声诉求', icon: 'lock-keyhole', title: '平台个人信息与隐私保护说明', summary: '平台将按最小必要原则处理账号信息和互动数据，请查看相关保护说明。', meta: '隐私说明 · 09-08' },
  { id: 'notice-4', channel: '其他', category: '其他', icon: 'user-round-check', title: '匿名发言使用与保护说明', summary: '匿名发言仍需遵守平台规则，平台将依法依规保护合理诉求和个人隐私。', meta: '匿名说明 · 09-07' },
  { id: 'notice-5', channel: '回音壁', category: '回音壁', icon: 'clipboard-check', title: '问题整改反馈公开说明', summary: '共性问题的办理结果、整改措施和公开进展将持续在平台同步。', meta: '整改公示 · 09-06' },
  { id: 'notice-6', channel: '业务交流', category: '业务交流', icon: 'megaphone', title: '为农服务重点工作交流提示', summary: '欢迎围绕基层服务、县域流通和产销对接补充一线经验与可行建议。', body: '请各单位结合近期为农服务工作，梳理基层服务、县域流通和产销对接中的具体问题与有效做法。交流材料应说明适用场景、实施步骤和实际成效，并在规定时间内反馈至合作指导处。', attachment: { name: '为农服务工作交流要点.txt', content: '为农服务工作交流要点\n\n一、基层服务：梳理服务覆盖、人员配置和农资配送情况。\n二、县域流通：说明集采集配、仓储和冷链协同做法。\n三、产销对接：列出供需信息更新和对接反馈机制。\n四、请勿在公开材料中包含涉密或个人敏感信息。' }, meta: '工作动态 · 09-05' }
];
function noticeTimestamp(notice) {
  const raw = notice.publishedAt || notice.createdAt || notice.date || notice.meta?.match(/\d{2}-\d{2}/)?.[0] || '01-01';
  const value = String(raw).replace(/年|月/g, '-').replace(/日/g, '').replace(/--/g, '-');
  const normalized = /^\d{4}-/.test(value) ? value : `2026-${value}`;
  const timestamp = Date.parse(normalized);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}
function sortedHomeNotices() { return [...homeNotices].sort((a, b) => noticeTimestamp(b) - noticeTimestamp(a)); }

const personalPostIds = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const personalComments = personalPostIds;
const personalPostRecords = {
  1: { publication: '公开发布', reviewed: true, shares: 6, reports: 0 },
  8: { publication: '私密发布', reviewed: true, shares: 2, reports: 0 },
  16: { publication: '私密发布', reviewed: true, shares: 1, reports: 0 }
};
personalPostIds.forEach((id, index) => {
  if (personalPostRecords[id]) return;
  const post = portalPosts.find((item) => item.id === id);
  personalPostRecords[id] = {
    publication: ['建言献策', '心声诉求'].includes(post?.board) ? (index % 4 === 0 ? '私密发布' : '公开发布') : '公开发布',
    reviewed: index % 5 !== 0,
    shares: (index * 3) % 11,
    reports: 0
  };
});
const personalMockImages = [
  { src: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=82', alt: '基层供销工作现场' },
  { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=82', alt: '农产品与田间服务场景' }
];
personalPostIds.forEach((id, index) => {
  const post = portalPosts.find((item) => item.id === id);
  if (!post) return;
  const subject = post.title;
  post.content = [
    `围绕“${subject}”，结合近期基层走访、业务台账和一线同事反馈，现将看到的情况整理如下。当前相关工作已经具备一定基础，但不同地区、不同岗位之间的信息口径和执行节奏仍不完全一致，职工在实际办理时经常需要重复确认材料、流程和联系人。`,
    `从调研情况看，问题主要集中在三个方面：一是信息更新不够及时，重要节点缺少统一提醒；二是现有做法分散在不同单位，好的经验没有形成可复制的模板；三是办理结果反馈不够完整，提出问题的人难以持续了解后续进展。上述问题不一定需要新增复杂系统，先统一清单、责任人、时间点和反馈方式，就能解决一部分实际困难。`,
    `建议由相关部门牵头建立月度梳理机制，按照事项分类收集需求、问题、办理动作和结果说明，并为每项内容标注来源、更新时间和承办联系人。对需要跨部门协同的事项，可在周例会上形成简短纪要，明确下一步动作和完成期限；对已经验证有效的经验，整理成一页式指引，方便基层网点和新入职职工直接参考。`,
    `在执行过程中，建议保留职工补充意见的入口，同时设置必要的审核和隐私保护规则，涉及个人信息、未公开经营数据或敏感材料时不直接公开展示。对于能够公开的内容，应及时说明处理进度、阶段结果和后续安排，让信息发布、问题办理与结果反馈形成闭环。`,
    `以上内容是基于当前工作观察形成的初步建议，后续还可以结合不同单位的业务量、人员配置和实际条件进一步细化。希望大家补充本地区的做法和遇到的困难，共同把可执行、可跟踪、可复用的工作方法沉淀下来，减少重复沟通，提升基层服务效率。`
  ];
  post.body = post.content.join('\n\n');
  post.mediaList = [
    { ...personalMockImages[index % personalMockImages.length], caption: `${subject}相关现场图片一` },
    { ...personalMockImages[(index + 1) % personalMockImages.length], caption: `${subject}相关现场图片二` }
  ];
  post.media = post.media || post.mediaList[0];
});
const personalAffairs = [
  { title: '建议建立农产品产销信息跨单位共享机制', category: '建言献策', status: '已受理', update: '合作指导处已受理 · 今天 09:24', step: '正在汇总各单位供需信息' },
  { title: '关于优化机关食堂晚餐供应时段的建议', category: '心声诉求', status: '办理中', update: '办公室办理中 · 今天 10:12', step: '正在结合用餐数据研究调整方案' },
  { title: '新入职职工业务导师制度建议', category: '建言献策', status: '待办理', update: '我发布的内容', step: '等待承办部门受理' },
  { title: '办公耗材配送周期问题反馈', category: '回音壁', status: '已回复', update: '已收到办理答复', step: '承办部门已反馈办理结果' },
  { title: '业务系统账号权限流程优化', category: '心声诉求', status: '办理中', update: '平台管理组办理', step: '正在核对账号权限流程' },
  { title: '基层职工培训名额分配建议', category: '建言献策', status: '已回复', update: '人事处已答复', step: '承办部门已反馈办理结果' },
  { title: '基层社职工通勤保障建议', category: '心声诉求', status: '待办理', update: '等待受理', step: '等待承办部门受理' }
];
const affairMockTitles = ['完善基层网点值班补贴机制', '优化农资配送车辆调度流程', '增加青年职工业务培训场次', '改善档案室通风与照明条件', '统一县域品牌宣传物料规范', '缩短办公设备报修响应时间', '建立跨部门项目资料共享区', '完善职工年度体检项目', '优化会议室预约使用规则', '增加基层服务网点技术支持', '规范项目验收材料归档目录', '完善困难职工帮扶申请流程', '推进食堂菜单意见反馈机制'];
affairMockTitles.forEach((title, index) => {
  const statuses = ['待办理', '已受理', '办理中', '已回复', '已办结'];
  const status = statuses[index % statuses.length];
  personalAffairs.push({ id: `SX-202609-${String(index + 81).padStart(3, '0')}`, title, category: index % 2 ? '心声诉求' : '建言献策', status, update: `${index + 1} 天前更新 · ${status}`, step: status === '待办理' ? '等待承办部门受理' : status === '已受理' ? '承办部门正在核实具体情况' : status === '办理中' ? '相关措施正在协调推进' : '承办部门已形成办理反馈', owner: ['办公室', '合作指导处', '人事处', '平台管理组'][index % 4], deadline: `09 月 ${String(18 + index).padStart(2, '0')} 日`, events: [{ text: `${status}，已记录最新办理动态`, at: `09 月 ${String(2 + index).padStart(2, '0')} 日` }] });
});
function affairTimestamp(affair) {
  const raw = affair.deadline || affair.updatedAt || affair.update?.match(/\d{4}-\d{2}-\d{2}|\d{2}\s*月\s*\d{2}\s*日/)?.[0];
  if (raw) {
    const value = String(raw).replace(/\s/g, '').replace(/月/g, '-').replace(/日/g, '');
    const timestamp = Date.parse(/^\d{4}-/.test(value) ? value : `2026-${value}`);
    if (!Number.isNaN(timestamp)) return timestamp;
  }
  const daysAgo = Number.parseInt(affair.update?.match(/(\d+)\s*天前/)?.[1], 10);
  return Number.isNaN(daysAgo) ? 0 : Date.now() - daysAgo * 86400000;
}
function sortedPersonalAffairs() { return [...personalAffairs].sort((a, b) => affairTimestamp(b) - affairTimestamp(a)); }

const staffProgressBoards = ['建言献策', '心声诉求', '业务交流'];
function postTimestamp(post) {
  const parsed = Date.parse(post.createdAt || post.updatedAt || post.time || '');
  const numericId = Number(post.id);
  return Number.isFinite(parsed) ? parsed : Number.isFinite(numericId) ? numericId : 0;
}
function ownedStaffPosts(data = PrototypeData.read()) {
  const personalIds = new Set(personalPostIds.map(String));
  const accountId = state.session?.id;
  return portalPosts
    .filter((post) => {
      const currentAuthor = Boolean(accountId && post.authorId === accountId);
      const legacyDemoAuthor = accountId === 'staff' && !post.authorId && personalIds.has(String(post.id));
      return currentAuthor || legacyDemoAuthor;
    })
    .sort((a, b) => postTimestamp(b) - postTimestamp(a));
}
function affairIsOverdue(affair) {
  if (!affair?.deadline || ['待复核', '已反馈', '已办结'].includes(affair.status)) return false;
  const deadline = Date.parse(`${affair.deadline}T23:59:59`);
  return Number.isFinite(deadline) && deadline < Date.now();
}
function staffPostProgress(post, data = PrototypeData.read()) {
  const affair = data.affairs.find((item) => String(item.postId) === String(post.id));
  const rejected = post.contentAuditStatus === '已驳回' || ['退回修改', '已驳回'].includes(post.status) || post.routingDecision === '无需办理';
  const events = [
    { text: '已提交发言', at: post.time || '提交时间未记录' },
    ...(post.history || []),
    ...(affair?.events || [])
  ];
  if (post.board === '业务交流') {
    const stages = ['待审核', '审核通过', '发布状态'];
    const auditState = post.contentAuditStatus || (['待审核'].includes(post.status) ? '待审核' : ['退回修改', '已驳回'].includes(post.status) ? '已驳回' : '审核通过');
    const publishState = post.publishStatus || (post.status === '私密发布' ? '私密发布' : post.status === '已发布' ? '已发布' : '未发布');
    if (rejected) return { label: '已驳回', alert: '未发布', visibility: '仅个人可见', tone: 'rejected', current: 0, stages, detail: post.reason || '审核已驳回，可修改原帖后重新提交，也可不再操作。', canResubmit: true, affair: null, events };
    if (auditState === '待审核') return { label: '待审核', alert: '未发布', visibility: '仅个人可见', tone: 'pending', current: 0, stages, detail: '审核状态：待审核；发布状态：未发布。', canResubmit: false, affair: null, events };
    if (publishState === '未发布') return { label: '审核通过', alert: '未发布', visibility: '仅个人可见', tone: 'review', current: 1, stages, detail: '审核状态：审核通过；发布状态：未发布，等待管理人员发布。', canResubmit: false, affair: null, events };
    if (publishState === '私密发布') return { label: '审核通过', alert: '私密发布', visibility: '仅个人可见', tone: 'private', current: 2, stages, detail: '审核状态：审核通过；发布状态：私密发布。', canResubmit: false, affair: null, events };
    return { label: '审核通过', alert: '已发布', visibility: '公开可见', tone: 'done', current: 2, stages, detail: '审核状态：审核通过；发布状态：已发布。', canResubmit: false, affair: null, events };
  }
  const stages = ['待处理', '处理中', '无需处理', '已回复'];
  if (rejected) return { label: '已驳回', visibility: '仅个人可见', tone: 'rejected', current: 0, stages, detail: post.reason || post.routingReason || '内容已驳回，可修改后重新提交。', canResubmit: true, affair, events };
  if (!affair) return post.contentAuditStatus === '审核通过'
    ? { label: '待处理', visibility: '公开可见', tone: 'pending', current: 0, stages, detail: '内容已发布，事项等待管理人员分类处理。', canResubmit: false, affair, events }
    : { label: '待审核', visibility: '仅个人可见', tone: 'pending', current: 0, stages, detail: '发言已提交，等待审核人员完成内容审核。', canResubmit: false, affair, events };
  if (affair.status === '待处理') return { label: '待处理', visibility: '公开可见', tone: 'pending', current: 0, stages, detail: '事项等待管理人员完成分类标记。', canResubmit: false, affair, events };
  if (affair.status === '已归档' || affair.status === '无需办理' || affair.status === '无需处理') return { label: '无需处理', visibility: '公开可见', tone: 'done', current: 2, stages, detail: '工作人员已查看事项，确认无需进一步处置。', canResubmit: false, affair, events };
  if (affair.status === '已回复') {
    const isPublic = affair.feedback === '公开答复';
    return { label: '已回复', visibility: isPublic ? '公开可见' : '仅个人可见', tone: isPublic ? 'done' : 'private', current: 3, stages, detail: affair.draft || '管理人员已发送正式回复。', canResubmit: false, affair, events };
  }
  return { label: '处理中', visibility: '公开可见', tone: 'active', current: 1, stages, detail: '事项正在研究并整理回复。', canResubmit: false, affair, events };
}
function staffProgressStateLabel(progress) { return [progress.label, progress.alert].filter(Boolean).join(' · '); }
function staffProgressLabel(progress) { return [staffProgressStateLabel(progress), progress.visibility].filter(Boolean).join(' · '); }
function staffListStatusLabel(post, progress) {
  if (post.board === '业务交流') return progress.label === '已驳回' ? '已驳回' : progress.alert === '已发布' ? '已发布' : '审核中';
  return progress.label;
}
function unreadStaffReplies(data = PrototypeData.read()) {
  const ids = new Set(ownedStaffPosts(data).map((post) => String(post.id)));
  return (data.staffNotifications || []).filter((item) => ids.has(String(item.postId)) && item.authorId === (state.session?.id || 'staff') && !item.readAt);
}
function progressSignature(progress) {
  return JSON.stringify([progress.label, progress.detail, progress.events.map((event) => [event.text, event.at])]);
}
function staffProgressSeen(data, posts) {
  const key = `staff-progress-seen:${state.session?.id || 'staff'}`;
  let seen;
  try { seen = JSON.parse(localStorage.getItem(key) || '{}'); } catch { seen = {}; }
  let changed = false;
  for (const post of posts) {
    if (seen[post.id] !== undefined) continue;
    seen[post.id] = progressSignature(staffPostProgress(post, data));
    changed = true;
  }
  if (changed) localStorage.setItem(key, JSON.stringify(seen));
  return { key, seen };
}
function seedDemoProgressUpdates(data, posts) {
  if (state.session?.id !== 'staff' || posts.length < 15) return;
  data.staffNotifications = data.staffNotifications || [];
  const seeded = data.staffNotifications.filter((item) => String(item.id).startsWith('demo-progress-'));
  const demoPosts = seeded.length ? posts.filter((post) => seeded.some((item) => String(item.postId) === String(post.id))) : (() => {
    const selected = [];
    for (const tone of ['pending', 'rejected', 'active', 'review', 'done']) {
      selected.push(...posts.filter((post) => staffPostProgress(post, data).tone === tone).slice(0, 3));
    }
    return [...selected, ...posts.filter((post) => !selected.includes(post))].slice(0, 15);
  })();
  const nodeMessages = {
    '待审核': '发言已提交，等待内容审核',
    '待处理': '事项已生成，等待分类处理',
    '处理中': '事项正在研究并整理回复',
    '已发布': '内容审核已通过并公开发布',
    '已回复': '正式回复已发送，请查看回复内容'
  };
  let changed = false;
  const updates = demoPosts.map((post, index) => {
    const progress = staffPostProgress(post, data);
    const node = progress.stages[progress.current] || progress.label;
    const message = progress.label === '已驳回' ? '审核未通过，请查看驳回原因并修改' : progress.alert === '逾期' ? '事项仍在办理中，但已超过办理期限' : progress.alert === '退回修改' ? '答复已退回承办人修改' : nodeMessages[node] || `${node}节点有新的处理记录`;
    const text = `${post.title}：${message}`;
    const existing = data.staffNotifications.find((item) => String(item.id) === `demo-progress-${post.id}`);
    if (existing) { if (existing.text !== text || existing.node !== node || existing.message !== message) { existing.text = text; existing.node = node; existing.message = message; changed = true; } return null; }
    changed = true;
    return { id: `demo-progress-${post.id}`, postId: post.id, authorId: 'staff', node, message, text, at: `2026-09-${String(16 - Math.floor(index / 5)).padStart(2, '0')} ${String(16 - index % 5).padStart(2, '0')}:30`, readAt: null };
  });
  data.staffNotifications.unshift(...updates.filter(Boolean));
  if (changed) PrototypeData.save(data);
}

function affairProgressStage(status) {
  if (status === '已回复') return 2;
  if (status === '处理中') return 1;
  return 0;
}
const personalInteractions = [
  { type: '评论', title: '县域冷链项目验收资料整理经验分享', detail: '评论已通过审核 · 昨天 16:40', icon: 'message-circle', content: '这份材料目录很实用，建议再补充设备调试记录和验收现场照片的归档要求。' },
  { type: '点赞', title: '农资保供配送如何打通村级服务末端', detail: '已点赞 · 昨天 14:22', icon: 'thumbs-up', content: '你已对该帖子点赞，可在内容动态中继续查看。' },
  { type: '举报', title: '某条不当信息', detail: '处理中 · 09 月 07 日', icon: 'flag', content: '内容与事实不符，建议平台核查信息来源及发布依据。' }
];
const interactionMockTitles = ['基层网点数字化设备配置建议', '农产品品牌联合推广经验', '机关食堂服务优化讨论', '再生资源网点运营数据复盘', '职工健康咨询服务建议', '县域流通项目节点管理经验', '培训名额分配规则说明', '农资集采集配降本做法', '业务系统权限流程优化', '青年人才双向交流机制', '基层社经营考核指标建议', '农业社会化服务验收要点', '办公耗材配送周期答复', '职工通勤保障办理进展', '项目资料共享机制建议', '冷链设备运维经验交流', '平台匿名发言保护说明'];
interactionMockTitles.forEach((title, index) => {
  const types = ['评论', '点赞', '举报'];
  const type = types[index % types.length];
  personalInteractions.push({ type, title, detail: `${type === '举报' ? '待核查' : type === '评论' ? '评论已发布' : `已${type}`} · 09 月 ${String(6 + (index % 9)).padStart(2, '0')} 日`, icon: type === '评论' ? 'message-circle' : type === '点赞' ? 'thumbs-up' : type === '收藏' ? 'star' : 'flag', content: type === '评论' ? `我对“${title}”补充了相关工作建议和一线执行情况。` : type === '举报' ? '信息表述可能存在偏差，已提交平台管理员核查。' : `你已${type}该内容，可在个人中心查看操作记录。` });
});
const personalFavorites = [
  { title: '建立新入职职工业务导师制度', category: '建言献策', detail: '青年新锐 · 13 条讨论 · 09 月 08 日', excerpt: '围绕新入职职工的岗位适应和经验传承，建议建立周期明确、评价清晰的业务导师制度。' },
  { title: '县域冷链项目验收资料整理经验分享', category: '业务交流', detail: '江城行者 · 22 条讨论 · 昨天 16:40', excerpt: '整理了一套验收材料目录和常见退回原因，供近期负责同类项目的同事参考。' }
];
const favoriteMockTitles = ['完善基层社经营目标考核的建议', '跨区域农产品品牌联合推广机制', '基层网点数字化设备配置建议', '为农服务项目专家库建设建议', '社有企业青年人才双向交流', '基层社职工通勤保障建议', '业务系统账号权限流程优化', '职工健康咨询服务建议', '优化出差报销审批流程', '农资集采集配降本增效做法', '再生资源回收网点运营复盘', '县域流通项目节点管理经验', '基层社资产盘活税务处理', '农产品品牌共建案例清单', '农业社会化服务项目验收要点', '办公耗材配送周期问题答复', '基层网点设备更新问题答复', '职工培训名额分配问题答复'];
favoriteMockTitles.forEach((title, index) => personalFavorites.push({ title, category: ['建言献策', '心声诉求', '业务交流', '回音壁'][index % 4], detail: `${['基层同行', '江城行者', '服务观察员'][index % 3]} · ${6 + index} 条讨论 · 09 月 ${String(2 + (index % 9)).padStart(2, '0')} 日`, excerpt: `围绕“${title}”整理了具体做法、执行要点和相关工作建议，收藏后便于后续查阅参考。` }));


const policyTabs = [
  ['policy', '政策解读', '按分类查看政策文件、制度口径、办事指引及关联附件。'],
  ['faq', '常见问答', '查看统一发布的常见问题及标准答复。'],
  ['rectification', '整改公开', '查看共性问题办理结果、整改措施及公开进展。']
];

const policyContent = {
  policy: [
    { id: 'policy-1', type: '政策文件', title: '湖北省供销合作社系统农业社会化服务工作指引', category: '为农服务', department: '合作指导处', date: '2026-09-08', summary: '明确服务主体、服务内容、项目实施和台账管理要求。', content: '围绕农业社会化服务项目实施，统一服务流程、质量要求和资料归档口径，为市县供销社及基层服务主体开展工作提供操作依据。', attachment: '农业社会化服务工作指引.pdf' },
    { id: 'policy-2', type: '制度口径', title: '省社机关差旅费管理制度口径说明', category: '财务管理', department: '财务资产处', date: '2026-09-06', summary: '说明差旅审批、交通住宿标准和报销材料要求。', content: '出差人员应履行事前审批程序，并按照规定等级选择交通工具和住宿标准。报销时需提交审批单、行程凭证和合法票据。', attachment: '差旅费报销材料清单.docx' },
    { id: 'policy-3', type: '办事指引', title: '基层社项目申报操作指引（2026 年版）', category: '项目申报', department: '经济发展处', date: '2026-09-03', summary: '梳理项目申报条件、材料清单、审核节点及反馈方式。', content: '申报单位应对照年度项目通知准备申报表、实施方案、资金预算和必要证明材料，并在规定时间内通过统一入口提交。', attachment: '基层社项目申报材料模板.zip' },
    { id: 'policy-4', type: '政策文件', title: '县域流通服务网络建设重点任务清单', category: '流通服务', department: '经济发展处', date: '2026-08-29', summary: '明确县域集采集配、冷链物流和基层网点建设重点任务。', content: '重点推进县域集采集配中心、乡镇综合服务站和村级服务网点协同建设，完善农产品上行与生活资料下行双向流通体系。', attachment: '县域流通服务网络任务清单.pdf' }
  ],
  faq: [
    { id: 'faq-1', type: '常见问答', title: '基层社项目申报需要准备哪些材料？', category: '项目申报', department: '经济发展处', date: '2026-09-07', summary: '统一说明申报表、实施方案、预算和相关证明材料要求。', answer: '申报单位应按通知要求提交项目申报表、实施方案、资金预算及必要的资质证明材料。具体格式以当年度申报通知所附模板为准。' },
    { id: 'faq-2', type: '常见问答', title: '差旅报销附件需要保留哪些材料？', category: '财务管理', department: '财务资产处', date: '2026-09-05', summary: '说明审批单、行程凭证、住宿票据等材料要求。', answer: '应保留出差审批单、交通行程凭证、住宿发票及公务卡支付记录等材料；发生特殊情况的，还应附情况说明和相应审批依据。' },
    { id: 'faq-3', type: '常见问答', title: '职工参加业务培训如何登记学时？', category: '教育培训', department: '人事处', date: '2026-09-02', summary: '明确培训学时登记入口、证明材料和审核时限。', answer: '培训结束后，由职工提交培训通知、签到或结业证明等材料，经所在处室确认后统一登记。线上培训按平台生成的有效学习记录核定。' },
    { id: 'faq-4', type: '常见问答', title: '跨单位共享业务数据应履行什么手续？', category: '数据管理', department: '信息中心', date: '2026-08-28', summary: '说明数据用途、共享范围和安全责任确认要求。', answer: '申请单位应明确数据用途、使用范围、使用期限和责任人，经数据归口部门审核后按最小必要原则授权。涉及敏感信息的，应先完成脱敏处理。' }
  ],
  rectification: [
    { id: 'rectification-1', type: '整改公开', title: '基层报销材料重复提交问题整改情况', category: '财务管理', department: '财务资产处', date: '2026-09-05', summary: '统一材料清单，减少重复填报和线下确认。', result: '已完成重复材料梳理并形成统一清单。', measure: '调整线上表单字段，明确一次提交、多环节复用。', progress: '已完成' },
    { id: 'rectification-2', type: '整改公开', title: '项目申报结果反馈不及时问题整改进展', category: '项目申报', department: '经济发展处', date: '2026-09-03', summary: '明确反馈时限，并增加关键节点提醒。', result: '已统一项目受理、初审和结果反馈时限。', measure: '在申报台账中增加节点负责人和到期提醒，结果形成后统一反馈。', progress: '整改中' },
    { id: 'rectification-3', type: '整改公开', title: '职工培训学时登记口径不统一整改情况', category: '教育培训', department: '人事处', date: '2026-08-31', summary: '统一登记字段、证明材料和审核标准。', result: '已发布统一登记说明并完成历史数据复核。', measure: '统一线上登记模板，由各处室指定专人按月核对。', progress: '已完成' },
    { id: 'rectification-4', type: '整改公开', title: '基层网点业务系统账号开通较慢整改进展', category: '数据管理', department: '信息中心', date: '2026-08-27', summary: '压缩账号申请环节，明确受理和反馈时限。', result: '已取消重复确认环节，账号申请材料由五项压缩至三项。', measure: '建立统一申请入口，申请状态由系统自动提醒经办人。', progress: '整改中' }
  ]
};

const discussionRankings = [
  { id: 'd1', board: '业务交流', title: '县域冷链项目验收资料整理经验分享', meta: '江城行者 · 22 条讨论', essenceScore: 46, heatScore: 42, updated: '今天 11:06' },
  { id: 'd2', board: '建言献策', title: '建议建立农产品产销信息跨单位共享机制', meta: '山野微风 · 18 条讨论', essenceScore: 45, heatScore: 40, updated: '今天 09:24' },
  { id: 'd3', board: '业务交流', title: '农资保供配送如何打通村级服务末端', meta: '田野新声 · 31 条讨论', essenceScore: 40, heatScore: 44, updated: '今天 08:38' },
  { id: 'd4', board: '经验分享', title: '基层社农产品产销对接的三种有效模式', meta: '供销观察员 · 26 条讨论', essenceScore: 44, heatScore: 39, updated: '昨天 17:20' },
  { id: 'd5', board: '建言献策', title: '建立新入职职工业务导师制度', meta: '青年新锐 · 13 条讨论', essenceScore: 48, heatScore: 33, updated: '昨天 15:42' },
  { id: 'd6', board: '业务交流', title: '再生资源回收网点数字化改造要点', meta: '绿源先锋 · 19 条讨论', essenceScore: 41, heatScore: 38, updated: '昨天 13:18' },
  { id: 'd7', board: '经验分享', title: '乡镇基层社闲置资产盘活案例复盘', meta: '荆楚合作人 · 17 条讨论', essenceScore: 43, heatScore: 35, updated: '09 月 09 日' },
  { id: 'd8', board: '业务交流', title: '县域流通网络建设中的仓配协同经验', meta: '城乡连线 · 24 条讨论', essenceScore: 37, heatScore: 40, updated: '09 月 09 日' },
  { id: 'd9', board: '心声诉求', title: '关于优化机关食堂晚餐供应时段的建议', meta: '一盏清茶 · 9 条讨论', essenceScore: 36, heatScore: 39, updated: '09 月 09 日' },
  { id: 'd10', board: '经验分享', title: '农产品区域公用品牌共建的协作路径', meta: '品牌服务组 · 15 条讨论', essenceScore: 42, heatScore: 32, updated: '09 月 08 日' },
  { id: 'd11', board: '业务交流', title: '青年职工跨单位轮岗交流实践建议', meta: '青春供销 · 12 条讨论', essenceScore: 39, heatScore: 34, updated: '09 月 08 日' },
  { id: 'd12', board: '经验分享', title: '为农服务中心运营质效提升清单', meta: '基层服务处 · 21 条讨论', essenceScore: 38, heatScore: 34, updated: '09 月 07 日' },
  { id: 'd13', board: '业务交流', title: '农业社会化服务标准衔接问题讨论', meta: '合作经济研究 · 16 条讨论', essenceScore: 40, heatScore: 30, updated: '09 月 07 日' },
  { id: 'd14', board: '建言献策', title: '社有企业财务共享协作机制建议', meta: '财务同行 · 11 条讨论', essenceScore: 37, heatScore: 31, updated: '09 月 06 日' },
  { id: 'd15', board: '业务交流', title: '基层网点农资库存预警经验交流', meta: '农资服务岗 · 14 条讨论', essenceScore: 36, heatScore: 31, updated: '09 月 06 日' },
  { id: 'd16', board: '建言献策', title: '完善县域农产品采购需求发布机制', meta: '市场运营组 · 10 条讨论', essenceScore: 38, heatScore: 28, updated: '09 月 05 日' },
  { id: 'd17', board: '经验分享', title: '基层社直播助农活动复盘', meta: '电商服务站 · 18 条讨论', essenceScore: 34, heatScore: 31, updated: '09 月 05 日' },
  { id: 'd18', board: '业务交流', title: '农产品质量追溯台账填报要点', meta: '质量管理组 · 9 条讨论', essenceScore: 35, heatScore: 28, updated: '09 月 04 日' },
  { id: 'd19', board: '建言献策', title: '优化乡镇服务网点业务协同建议', meta: '一线职工 · 8 条讨论', essenceScore: 33, heatScore: 28, updated: '09 月 04 日' },
  { id: 'd20', board: '业务交流', title: '秋季农资配送路线优化交流', meta: '配送中心 · 12 条讨论', essenceScore: 32, heatScore: 27, updated: '09 月 03 日' }
];

const affairRankings = [
  { id: 'a1', title: '基层社农资保供配送机制优化', meta: '经济发展处 · 办理中', essenceScore: 48, progressScore: 46, updated: '今天 10:26' },
  { id: 'a2', title: '县域流通网络建设意见征集', meta: '合作指导处 · 已答复', essenceScore: 45, progressScore: 47, updated: '今天 09:48' },
  { id: 'a3', title: '职工后勤服务满意度提升', meta: '办公室 · 跟踪中', essenceScore: 43, progressScore: 44, updated: '今天 08:52' },
  { id: 'a4', title: '新入职职工业务导师制度建议', meta: '人事处 · 办理中', essenceScore: 46, progressScore: 40, updated: '昨天 16:10' },
  { id: 'a5', title: '农产品产销信息跨单位共享机制', meta: '合作指导处 · 已受理', essenceScore: 44, progressScore: 41, updated: '昨天 14:35' },
  { id: 'a6', title: '机关食堂晚餐供应时段优化', meta: '办公室 · 已回复', essenceScore: 40, progressScore: 43, updated: '昨天 11:20' },
  { id: 'a7', title: '办公耗材配送周期问题答复', meta: '后勤服务组 · 已办结', essenceScore: 36, progressScore: 46, updated: '09 月 09 日' },
  { id: 'a8', title: '再生资源回收站点规范化改造', meta: '经济发展处 · 办理中', essenceScore: 42, progressScore: 39, updated: '09 月 09 日' },
  { id: 'a9', title: '农产品冷链设施共建需求协调', meta: '合作指导处 · 已分办', essenceScore: 41, progressScore: 39, updated: '09 月 08 日' },
  { id: 'a10', title: '基层社经营人才专项培训', meta: '人事处 · 推进中', essenceScore: 38, progressScore: 41, updated: '09 月 08 日' },
  { id: 'a11', title: '社有企业内控流程优化建议', meta: '财务审计处 · 办理中', essenceScore: 39, progressScore: 38, updated: '09 月 07 日' },
  { id: 'a12', title: '职工心理健康服务资源补充', meta: '机关党委 · 已受理', essenceScore: 37, progressScore: 39, updated: '09 月 07 日' },
  { id: 'a13', title: '平台内容审核指引修订', meta: '平台管理组 · 已答复', essenceScore: 35, progressScore: 40, updated: '09 月 06 日' },
  { id: 'a14', title: '重点农资价格监测机制完善', meta: '经济发展处 · 推进中', essenceScore: 40, progressScore: 34, updated: '09 月 06 日' },
  { id: 'a15', title: '基层网点数字设备更新计划', meta: '合作指导处 · 已分办', essenceScore: 37, progressScore: 36, updated: '09 月 05 日' },
  { id: 'a16', title: '县域冷链项目验收资料优化', meta: '经济发展处 · 办理中', essenceScore: 35, progressScore: 37, updated: '09 月 05 日' },
  { id: 'a17', title: '职工培训名额分配规则调整', meta: '人事处 · 已回复', essenceScore: 34, progressScore: 36, updated: '09 月 04 日' },
  { id: 'a18', title: '业务系统账号权限流程优化', meta: '平台管理组 · 推进中', essenceScore: 36, progressScore: 33, updated: '09 月 04 日' },
  { id: 'a19', title: '基层职工通勤保障需求协调', meta: '办公室 · 已受理', essenceScore: 33, progressScore: 34, updated: '09 月 03 日' },
  { id: 'a20', title: '办公区域饮水设备维护安排', meta: '后勤服务组 · 已办结', essenceScore: 31, progressScore: 35, updated: '09 月 03 日' }
];

const affairBoardById = {
  a1: '业务交流', a2: '建言献策', a3: '心声诉求', a4: '建言献策', a5: '建言献策',
  a6: '心声诉求', a7: '回音壁', a8: '业务交流', a9: '心声诉求', a10: '业务交流',
  a11: '建言献策', a12: '心声诉求', a13: '业务交流', a14: '建言献策', a15: '心声诉求',
  a16: '业务交流', a17: '建言献策', a18: '业务交流', a19: '心声诉求', a20: '回音壁'
};

const rankFormula = {
  discussion: { title: '精华贴', formula: '精华分 + 讨论热度分', scoreKey: 'heatScore', scoreLabel: '热度' },
  progress: { title: '本周热议', formula: '精华分 + 事项推进分', scoreKey: 'progressScore', scoreLabel: '推进' }
};

function getRankingItems(type) {
  const items = type === 'discussion' ? discussionRankings : affairRankings;
  const scoreKey = rankFormula[type].scoreKey;
  return [...items].sort((a, b) => (b.essenceScore + b[scoreKey]) - (a.essenceScore + a[scoreKey]) || a.title.localeCompare(b.title, 'zh-CN'));
}

function rankingItemToPost(item, type, index) {
  const isDiscussion = type === 'discussion';
  const existingPost = portalPosts.find((post) => post.title === item.title);
  const metaParts = item.meta.split(' · ');
  const scoreKey = rankFormula[type].scoreKey;
  const total = item.essenceScore + item[scoreKey];
  return {
    ...(existingPost || {}),
    id: (isDiscussion ? 1000 : 2000) + index,
    board: existingPost?.board || item.board || (isDiscussion ? '精华贴' : affairBoardById[item.id]),
    title: item.title,
    excerpt: existingPost?.excerpt || (isDiscussion
      ? `该内容精华分 ${item.essenceScore}、讨论热度分 ${item.heatScore}，综合得分 ${total}。围绕相关业务实践和一线经验展开交流。`
      : `该事项精华分 ${item.essenceScore}、推进分 ${item.progressScore}，综合得分 ${total}。当前正按责任分工持续推进办理。`),
    author: existingPost?.author || metaParts[0],
    time: item.updated,
    likes: existingPost?.likes ?? item.essenceScore,
    favorites: existingPost?.favorites ?? Math.max(6, Math.round(item.essenceScore / 2)),
    comments: existingPost?.comments ?? (isDiscussion ? Number.parseInt(metaParts[1], 10) || item.heatScore : item.progressScore),
    status: existingPost?.status || (isDiscussion ? '精华' : metaParts[1] || '推进中'),
    commentList: existingPost?.commentList || [{ author: '平台管理组', text: '欢迎结合实际工作补充意见和办理建议。', status: '已通过' }]
  };
}

const roleMeta = { staff: ['职工', 'user-round'], handler: ['承办', 'briefcase-business'], admin: ['管理', 'shield-check'], leader: ['领导', 'chart-spline'] };
const MANAGEMENT_APP_URL = new URL('管理端原型设计/index.html?v=20260916-explicit-entry', document.baseURI).href;
function openHandlerWorkspace(account) { sessionStorage.setItem('prototype-handler-account-id', account.id); const url = new URL(MANAGEMENT_APP_URL); url.searchParams.set('role', 'handler'); window.location.href = url.href; }
function openManagementWorkspace(roleOrAccount) { const account = typeof roleOrAccount === 'string' ? accounts.find((item) => item.role === roleOrAccount && item.status === 'approved') : roleOrAccount; if (!account) return showToast('暂无可用的演示账号。'); const role = account.role === 'admin' ? 'platform' : account.role; sessionStorage.setItem('prototype-management-account-id', account.id); if (role === 'handler') sessionStorage.setItem('prototype-handler-account-id', account.id); const url = new URL(MANAGEMENT_APP_URL); url.searchParams.set('role', role); window.location.href = url.href; }
const state = { view: 'login', loginPortal: 'staff', loginMode: 'password', authDisplayMode: 'desktop', error: '', notice: '', session: null, staffDisplayMode: 'desktop', workspaceView: 'dashboard', profileOpen: false, accountCenterOpen: false, accountCenterTab: 'basic', personalTab: 'posts', mobilePersonalSection: null, personalPostCategory: '全部', personalInteractionCategory: '评论', personalExpandedPostId: null, personalProgressId: null, progressListOpen: false, editingPostId: null, personalFavoriteIndex: null, personalEditOpen: false, interactionDetail: null, postComposerOpen: false, draftBoxOpen: false, editingDraftId: null, composeBuffer: null, voiceSearch: '', policyQuestionOpen: false, myPolicyQuestionsOpen: false, hotPolicyOpen: false, smsRemaining: 0, portalTab: '全部', homeContentTab: '全部', policyTab: 'policy', policyDetailId: null, bannerDetail: null, noticeTab: '全部', noticeRead: {}, noticeCarouselIndex: 0, messageTab: '官方回复', interactionRead: {}, replyRead: {}, bannerIndex: 0, postActions: {}, expandedPostId: null, commentPostId: null, reportPostId: null, replyTarget: '', rankModal: null, rankingDetail: null };
const icon = (name) => `<i data-lucide="${name}" class="icon"></i>`;
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const byId = (id) => document.getElementById(id);
const phoneValue = (value) => (value || '').replace(/\s/g, '');
const validatePhone = (value) => /^1\d{10}$/.test(phoneValue(value));
const validateSms = (value) => value === '202608';
const setState = (next) => { if (next.session?.role === 'staff' && next.view === 'workspace' && state.authDisplayMode === 'mobile') next.staffDisplayMode = 'mobile'; Object.assign(state, next); render(); };

function showToast(message) { const toast = byId('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2300); }
function field(label, id, placeholder, iconName, type = 'text', action = '', value = '') { return `<div class="field"><div class="field-label"><label for="${id}">${label}</label></div><div class="input-box">${icon(iconName)}<input id="${id}" type="${type}" autocomplete="off" placeholder="${placeholder}" value="${escapeHtml(value)}">${action}</div></div>`; }
function renderStatus() { return state.error ? `<div class="form-error">${escapeHtml(state.error)}</div>` : state.notice ? `<div class="form-notice">${escapeHtml(state.notice)}</div>` : '<div class="form-error"></div>'; }

function renderBrand() { return `<section class="brand-panel"><div class="brand-bar"><div class="seal">湖北<br>供销</div><div class="brand-title"><strong>湖北供销·心声</strong><span>湖北省供销合作总社职工交流平台</span></div></div><div class="brand-copy"><h1>湖北供销·心声</h1><p class="slogan">倾听职工心声，凝聚供销力量</p><p>汇聚全省供销合作系统意见建议，推动每一项诉求被看见、被办理、被反馈。</p></div><div class="brand-foot">内部工作平台 · 请勿发布涉密文件及敏感数据</div></section>`; }
function renderTabs() { return `<div class="auth-tabs" role="tablist"><button class="${state.loginMode === 'password' ? 'active' : ''}" type="button" onclick="AppPrototype.setLoginMode('password')">账号密码登录</button><button class="${state.loginMode === 'sms' ? 'active' : ''}" type="button" onclick="AppPrototype.setLoginMode('sms')">短信验证码登录</button></div>`; }
function renderLoginPortal() { return `<div class="login-portal" role="tablist" aria-label="选择登录端"><button type="button" class="${state.loginPortal === 'staff' ? 'active' : ''}" onclick="AppPrototype.setLoginPortal('staff')">${icon('user-round')}<span><strong>职工端</strong><small>交流与个人服务</small></span></button><button type="button" class="${state.loginPortal === 'management' ? 'active' : ''}" onclick="AppPrototype.setLoginPortal('management')">${icon('briefcase-business')}<span><strong>管理端</strong><small>审核、承办与决策</small></span></button></div>`; }
function renderRoleLaunchers() {
  if (state.loginPortal !== 'staff') return '';
  return `<div class="login-rule">角色演示入口</div><div class="role-launchers portal-role-launchers"><button type="button" class="role-launcher" onclick="AppPrototype.launchStaffMobile()">${icon('smartphone')}<strong>职工移动端</strong><span>进入登录</span></button><button type="button" class="role-launcher" onclick="AppPrototype.prefillRole('staff')">${icon('user-round')}<strong>职工视图</strong><span>载入账号</span></button></div>`;
}
function renderLogin() { const demo = state.loginPortal === 'staff' ? 'staff' : 'admin'; const portalName = state.loginPortal === 'staff' ? '职工端' : '管理端'; const loginFields = state.loginMode === 'password' ? `${field('账号或手机号', 'identifier', '请输入账号或手机号', 'user-round', 'text', '', demo)}${field('登录密码', 'password', '请输入登录密码', 'lock-keyhole', 'password', '', '123456')}` : `${field('手机号码', 'phone', '请输入已审核通过的手机号码', 'smartphone')}${field('短信验证码', 'sms', '演示验证码：202608', 'message-square', 'text', '<button type="button" class="sms-button" onclick="AppPrototype.sendSms()">获取验证码</button>')}`; return `<div class="auth-card"><div class="auth-kicker">湖北供销 · 心声</div><h2>欢迎回来</h2><div class="auth-register-link">需要申请或查询账号？${state.loginPortal === 'staff' ? `<button type="button" onclick="AppPrototype.setView('register')">账号申请与审核查询</button>` : '请联系平台管理员开通'}</div><div class="login-credentials">${renderLoginPortal()}${renderTabs()}${loginFields}${renderStatus()}</div><button class="form-command" type="button" onclick="AppPrototype.submitLogin()">登录${portalName}</button><div class="auth-links"><button class="link-button" type="button" onclick="AppPrototype.setView('reset')">忘记密码？</button></div>${renderRoleLaunchers()}<p class="auth-help">已填入${portalName}演示账号 ${demo}，密码 123456。管理端将根据账号权限进入对应工作视图。</p></div>`; }
function renderMobileLogin() { const demo = state.loginPortal === 'staff' ? 'staff' : 'admin'; const portalName = state.loginPortal === 'staff' ? '职工端' : '管理端'; const loginFields = state.loginMode === 'password' ? `${field('账号或手机号', 'identifier', '请输入账号或手机号', 'user-round', 'text', '', demo)}${field('登录密码', 'password', '请输入登录密码', 'lock-keyhole', 'password', '', '123456')}` : `${field('手机号码', 'phone', '请输入已审核通过的手机号码', 'smartphone')}${field('短信验证码', 'sms', '演示验证码：202608', 'message-square', 'text', '<button type="button" class="sms-button" onclick="AppPrototype.sendSms()">获取验证码</button>')}`; return `<div class="mobile-auth-card"><header class="mobile-auth-brand"><div class="seal">湖北<br>供销</div><div><strong>湖北供销·心声</strong><span>职工交流平台</span></div></header><section class="mobile-auth-welcome"><span>统一身份认证</span><h1>欢迎登录</h1><p>连接职工声音，跟进每一项办理。</p></section>${renderLoginPortal()}${renderTabs()}<div class="mobile-auth-fields">${loginFields}${renderStatus()}</div><button class="form-command" type="button" onclick="AppPrototype.submitLogin()">登录${portalName}</button><div class="mobile-auth-links"><button type="button" onclick="AppPrototype.setView('reset')">忘记密码</button>${state.loginPortal === 'staff' ? `<button type="button" onclick="AppPrototype.setView('register')">申请账号 / 查询进度</button>` : '<span>管理账号请联系平台管理员</span>'}</div><p class="mobile-auth-demo">演示账号 ${demo}，密码 123456</p><button type="button" class="mobile-auth-back" onclick="AppPrototype.closeMobileLogin()">返回 Web 登录</button></div>`; }
function renderRegister() { return `<div class="auth-card"><div class="auth-kicker">ACCOUNT APPLICATION & STATUS</div><h2>账号申请与审核查询</h2><p class="auth-description">可查询已有申请的审核结果，或提交新的职工账号申请。</p><section class="query-box"><strong>查询审核状态</strong><p>输入注册手机号，查看账号是否已审核通过。</p><div class="query-actions"><div class="input-box">${icon('smartphone')}<input id="queryPhone" autocomplete="off" placeholder="请输入注册手机号"></div><button type="button" onclick="AppPrototype.queryApproval()">查询状态</button></div></section><div class="auth-section-rule">提交账号申请</div>${field('真实姓名', 'registerName', '请输入本人真实姓名', 'user-round')}${field('手机号码', 'registerPhone', '请输入常用手机号码', 'smartphone')}${field('申请部门', 'registerDepartment', '请输入所属部门', 'building-2')}${field('设置密码', 'registerPassword', '不少于 6 位', 'lock-keyhole', 'password')}${field('确认密码', 'registerConfirm', '请再次输入登录密码', 'lock-keyhole', 'password')}${field('短信验证码', 'registerSms', '演示验证码：202608', 'message-square', 'text', '<button type="button" class="sms-button" onclick="AppPrototype.sendSms()">获取验证码</button>')}${renderStatus()}<button class="form-command" type="button" onclick="AppPrototype.submitRegistration()">提交注册申请</button><div class="auth-links"><button class="link-button" type="button" onclick="AppPrototype.setView('login')">← 返回登录</button></div><p class="auth-help">审核通过后，可使用账号密码或短信验证码进入职工视图。</p></div>`; }
function renderReset() { return `<div class="auth-card"><div class="auth-kicker">RESET YOUR PASSWORD</div><h2>忘记密码</h2><p class="auth-description">仅限已审核通过的账号使用短信验证码重置密码。</p>${field('手机号码', 'resetPhone', '请输入已审核通过的手机号码', 'smartphone')}${field('短信验证码', 'resetSms', '演示验证码：202608', 'message-square', 'text', '<button type="button" class="sms-button" onclick="AppPrototype.sendSms()">获取验证码</button>')}${field('新密码', 'resetPassword', '不少于 6 位', 'lock-keyhole', 'password')}${field('确认新密码', 'resetConfirm', '请再次输入新密码', 'lock-keyhole', 'password')}${renderStatus()}<button class="form-command" type="button" onclick="AppPrototype.submitReset()">确认重置密码</button><div class="auth-links"><button class="link-button" type="button" onclick="AppPrototype.setView('login')">← 返回登录</button></div></div>`; }
function renderAuth() { const content = state.view === 'register' ? renderRegister() : state.view === 'reset' ? renderReset() : state.authDisplayMode === 'mobile' ? renderMobileLogin() : renderLogin(); if (state.authDisplayMode === 'mobile') return `<div class="mobile-auth-shell"><section class="mobile-auth-device">${content}</section></div>`; return `<div class="auth-shell">${renderBrand()}<section class="form-panel">${content}</section></div>`; }

function getAccount(identifier) { const value = phoneValue(identifier); return accounts.find((account) => account.id === value || account.phone === value); }
function authError(message) { setState({ error: message, notice: '' }); }
function clearFeedback() { state.error = ''; state.notice = ''; }
function recordLogin(account, result, message, method = state.loginMode) { const data = PrototypeData.read(); data.loginLogs.unshift({ account: account || '未识别账号', platform: '统一登录页', method: method === 'sms' ? '短信验证码' : '账号密码', result, message, at: new Date().toLocaleString('sv-SE', { hour12: false }) }); PrototypeData.save(data); }
function submitLogin() { clearFeedback(); let account, identifier; if (state.loginMode === 'password') { identifier = byId('identifier')?.value.trim(); const password = byId('password')?.value; if (!identifier || !password) return authError('请输入账号（或手机号）和登录密码。'); account = getAccount(identifier); if (!account || account.password !== password) { recordLogin(identifier, '失败', '账号或登录密码不正确'); return authError('账号或登录密码不正确。'); } } else { identifier = byId('phone')?.value; const sms = byId('sms')?.value.trim(); if (!validatePhone(identifier)) return authError('请输入正确的 11 位手机号码。'); if (!validateSms(sms)) { recordLogin(identifier, '失败', '演示验证码不正确'); return authError('短信验证码不正确，演示验证码为 202608。'); } account = getAccount(identifier); if (!account) { recordLogin(identifier, '失败', '账号尚未注册'); return authError('该手机号尚未注册，请先提交账号申请。'); } } if (account.status === 'pending') { recordLogin(account.id, '失败', '账号待审核'); return authError('该账号正在等待管理员审核，暂不能登录。'); } if (account.status === 'rejected' || account.enabled === false) { recordLogin(account.id, '失败', '账号不可用'); return authError('该账号未启用或审核未通过，请联系平台管理员。'); } const accountPortal = account.role === 'staff' ? 'staff' : 'management'; if (accountPortal !== state.loginPortal) { recordLogin(account.id, '失败', '登录端不匹配'); return authError(`该账号属于${accountPortal === 'staff' ? '职工端' : '管理端'}，请切换后登录。`); } recordLogin(account.id, '成功', '登录成功'); if (accountPortal === 'management') return openManagementWorkspace(account); applyMessageReadState(account.id); setState({ session: account, view: 'workspace', staffDisplayMode: 'desktop', workspaceView: 'dashboard', error: '', notice: '' }); }
function submitRegistration() { clearFeedback(); const name = byId('registerName')?.value.trim(); const phone = phoneValue(byId('registerPhone')?.value); const department = byId('registerDepartment')?.value.trim(); const password = byId('registerPassword')?.value || ''; const confirm = byId('registerConfirm')?.value || ''; const sms = byId('registerSms')?.value.trim(); if (!name) return authError('请输入本人真实姓名。'); if (!validatePhone(phone)) return authError('请输入正确的 11 位手机号码。'); if (!department) return authError('请输入申请部门。'); if (getAccount(phone)) return authError('该手机号已存在，请直接登录或找回密码。'); if (password.length < 6) return authError('登录密码至少需要 6 位。'); if (password !== confirm) return authError('两次输入的密码不一致。'); if (!validateSms(sms)) return authError('短信验证码不正确，演示验证码为 202608。'); const submitted = new Date().toLocaleString('sv-SE', { hour12: false }); const account = { id: `app-${Date.now()}`, phone, password, role: 'staff', name, department, status: 'pending', submitted }; accounts.push(account); const data = PrototypeData.read(); data.accounts.push({ id: account.id, phone, name: account.name, department, status: 'pending', submitted, createdAt: submitted }); PrototypeData.save(data); sessionStorage.setItem(`prototype-account-${phone}`, JSON.stringify({ id: account.id, phone, password, role: 'staff', name: account.name, department, submitted })); setState({ view: 'login', loginMode: 'password', error: '', notice: '申请已提交，等待管理员审核后方可登录。' }); }
function submitReset() { clearFeedback(); const phone = phoneValue(byId('resetPhone')?.value); const sms = byId('resetSms')?.value.trim(); const password = byId('resetPassword')?.value || ''; const confirm = byId('resetConfirm')?.value || ''; if (!validatePhone(phone)) return authError('请输入正确的 11 位手机号码。'); const account = getAccount(phone); if (!account) return authError('该手机号尚未注册。'); if (account.status !== 'approved') return authError(account.status === 'pending' ? '账号正在等待管理员审核，暂不能重置密码。' : '账号审核未通过，暂不能重置密码。'); if (!validateSms(sms)) return authError('短信验证码不正确，演示验证码为 202608。'); if (password.length < 6) return authError('新密码至少需要 6 位。'); if (password !== confirm) return authError('两次输入的密码不一致。'); account.password = password; setState({ view: 'login', loginMode: 'password', notice: '密码已重置，请使用新密码登录。', error: '' }); }
function queryApproval() { clearFeedback(); const phone = phoneValue(byId('queryPhone')?.value); if (!validatePhone(phone)) return authError('请输入正确的 11 位注册手机号码。'); const account = getAccount(phone); if (!account) return authError('未查询到该手机号的账号申请记录。'); const message = account.status === 'approved' ? '该账号已审核通过，可以直接登录平台。' : account.status === 'pending' ? '该账号正在等待管理员审核，请稍后查询。' : '该账号审核未通过，请联系平台管理员。'; setState({ error: '', notice: message }); }
function sendSms() { showToast('验证码已发送（演示验证码：202608）'); }

function renderStaffSearchResults() { const input = byId('staff-search-keyword'), panel = byId('staff-search-results'); if (!input || !panel) return; const rows = PrototypeData.searchContent(input.value); panel.hidden = false; panel.innerHTML = rows.length ? `<div class="staff-search-caption">${input.value.trim() ? `找到 ${rows.length} 条结果` : '默认展示最近内容'}</div>${rows.map((item) => `<button type="button" onmousedown="event.preventDefault();AppPrototype.openSearchResult('${item.type}','${escapeHtml(item.id)}')"><span class="staff-search-type">${item.type}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.meta)}</small></span>${icon('chevron-right')}</button>`).join('')}` : '<div class="staff-search-empty">未找到匹配内容，请增加或调整关键词</div>'; }
function closeStaffSearchResults() { setTimeout(() => { const panel = byId('staff-search-results'); if (panel) panel.hidden = true; }, 120); }
function renderTopbar() { const initials = state.session.name.slice(0, 1); return `<header class="workspace-topbar"><div class="topbar-brand"><div class="seal">湖北<br>供销</div><div><strong>湖北供销·心声</strong><span>湖北省供销合作总社职工交流平台测试</span></div></div><div class="topbar-search">${icon('search')}<input id="staff-search-keyword" aria-label="全局搜索关键词" autocomplete="off" placeholder="搜索帖子、公告和政策" onfocus="renderStaffSearchResults()" oninput="renderStaffSearchResults()" onblur="closeStaffSearchResults()"><div class="staff-search-results" id="staff-search-results" hidden></div></div><div class="staff-profile-wrap"><button class="staff-profile-trigger" type="button" aria-haspopup="menu" aria-expanded="${state.profileOpen}" title="打开用户菜单" onclick="AppPrototype.toggleProfileMenu()"><span class="profile-dot">${initials}</span><strong>${escapeHtml(state.session.name)}</strong>${icon(state.profileOpen ? 'chevron-up' : 'chevron-down')}</button>${state.profileOpen ? `<div class="staff-profile-menu" role="menu"><div class="staff-profile-summary"><span class="profile-dot">${initials}</span><div><strong>${escapeHtml(state.session.name)}</strong><small>${escapeHtml(state.session.id)}</small></div></div><button role="menuitem" onclick="AppPrototype.profileAction('center')">${icon('user-round')}<span>个人中心</span></button><button class="staff-profile-logout" role="menuitem" onclick="AppPrototype.profileAction('logout')">${icon('log-out')}<span>退出登录</span></button></div>` : ''}</div></header>`; }
function renderSidebar() { const role = state.session.role; const nav = role === 'admin' ? [['dashboard', '工作台', 'gauge'], ['review', '账号审核', 'user-round-check', accounts.filter((item) => item.status === 'pending').length], ['content', '内容审核', 'shield-check', 8], ['assign', '事项分办', 'git-pull-request-arrow', 6], ['statistics', '数据统计', 'chart-no-axes-combined']] : role === 'handler' ? [['dashboard', '承办工作台', 'briefcase-business'], ['tasks', '我的待办', 'inbox', 3], ['drafts', '答复草稿', 'files', 5], ['progress', '办理统计', 'chart-no-axes-combined']] : role === 'leader' ? [['dashboard', '运行概览', 'chart-spline'], ['topics', '热点议题', 'messages-square', 14], ['handling', '重点事项', 'clipboard-check', 5], ['analysis', '专题分析', 'chart-no-axes-combined']] : [['dashboard', '首页', 'home'], ['voices', '供销心声', 'messages-square'], ['notices', '消息中心', 'bell', messageUnreadTotal()], ['profile', '个人中心', 'user-round']]; return `<aside class="workspace-sidebar"><div class="side-caption">${role === 'admin' ? '平台治理' : role === 'handler' ? '事项办理' : role === 'leader' ? '决策视图' : '职工协同'}</div>${nav.map(([id, label, iconName, count]) => `<button class="side-item ${state.workspaceView === id || (id === 'dashboard' && state.workspaceView === 'dashboard') ? 'active' : ''}" onclick="AppPrototype.setWorkspaceView('${id}')">${icon(iconName)}<span>${label}</span>${count ? `<span class="badge">${count}</span>` : ''}</button>`).join('')}<div class="sidebar-note">合理诉求充分保护<br>违规内容依法依规处理</div></aside>`; }
function metricCard([label, value, note, type]) { return `<article class="metric ${type || ''}"><label>${label}</label><strong>${value}</strong><span>${note}</span></article>`; }
function statusClass(value) { return /超期|待受理|待审核|待分办|待答复审核|待补充/.test(value) ? 'warn' : /已发布|已答复|已办结/.test(value) ? 'done' : ''; }
function getRankTotal(item, type) { const { scoreKey } = rankFormula[type]; return item.essenceScore + item[scoreKey]; }
function renderRankingRow(item, type, index, full = false) {
  const config = rankFormula[type];
  const score = item[config.scoreKey];
  const total = getRankTotal(item, type);
  return `<button type="button" class="ranking-item" onclick="AppPrototype.openRankingDetail('${type}', '${item.id}')" title="${config.formula}：${item.essenceScore} + ${score} = ${total}"><b>${index + 1}</b><span class="rank-copy"><strong>${item.title}</strong><small>${item.meta}${full ? ` · ${item.updated}` : ''}</small></span><span class="rank-score"><em>${total}</em><small>精华 ${item.essenceScore} + ${config.scoreLabel} ${score}</small></span></button>`;
}
function renderRankingPanel(type, { limit = 10, showMore = true, className = '' } = {}) {
  const config = rankFormula[type];
  const items = getRankingItems(type).slice(0, limit);
  return `<section class="portal-panel ranking-panel ${className}"><header class="portal-panel-head"><div class="ranking-heading"><h2>${config.title}</h2></div>${showMore ? `<button type="button" onclick="AppPrototype.openRanking('${type}')">更多 ${icon('arrow-right')}</button>` : ''}</header><div class="ranking-list">${items.map((item, index) => renderRankingRow(item, type, index)).join('')}</div></section>`;
}
function getPortalPosts() {
  return portalPosts.filter((post) => !post.managedUnavailable && PrototypeData.isPublicPost(post) && (state.portalTab === '全部' || post.board === state.portalTab) && (!state.voiceSearch || `${post.title} ${post.excerpt} ${post.author}`.includes(state.voiceSearch)));
}
function renderPortalTabs() {
  const tabNames = ['全部', ...new Set([...PrototypeData.read().boards.map((board) => board.name), ...portalPosts.map((post) => post.board)])];
  return `<nav class="portal-tabs" aria-label="内容板块">${tabNames.map((tab, index) => `<button type="button" class="${state.portalTab === tab ? 'active' : ''}" onclick="AppPrototype.setPortalTabByIndex(${index})">${escapeHtml(tab)}</button>`).join('')}</nav>`;
}
function renderHomeContentTabs() {
  const tabNames = ['全部', '精华贴', '本周热议'];
  return `<nav class="portal-tabs home-content-tabs" aria-label="首页内容">${tabNames.map((tab) => `<button type="button" class="${state.homeContentTab === tab ? 'active' : ''}" onclick="AppPrototype.setHomeContentTab('${tab}')">${tab}</button>`).join('')}</nav>`;
}
function renderPortalFeed({ posts = getPortalPosts(), title = '内容动态', numbered = false } = {}) {
  return `<section class="portal-panel portal-feed"><header class="portal-panel-head"><h2>${title}</h2><button type="button" class="post-compose-trigger" onclick="AppPrototype.openPostComposer()">${icon('pencil-line')}<span>我要发言</span></button></header>${posts.map((post, index) => renderPortalPost(post, numbered ? index + 1 : null)).join('')}<footer class="feed-end"><span>没有更多了</span></footer></section>`;
}
const POST_ATTACHMENT_MAX_BYTES = 50 * 1024 * 1024;
const POST_ATTACHMENT_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'rar', '7z', 'jpg', 'jpeg', 'png']);
function formatPostFileSize(bytes = 0) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  return `${Math.max(1, Math.ceil(bytes / 1024))} KB`;
}
function getPostAttachmentError(file) {
  if (!file) return '';
  const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
  if (!POST_ATTACHMENT_EXTENSIONS.has(extension)) return '不支持该文件格式，请选择常见办公文档、压缩包或图片。';
  if (file.size > POST_ATTACHMENT_MAX_BYTES) return '附件不能超过 50MB，请重新选择。';
  return '';
}
function renderOwnerMenu(id, draft) {
  queueMicrotask(() => document.querySelectorAll('.owner-operation-menu').forEach((menu) => {
    menu.onmouseenter = () => { menu.open = true; };
    menu.querySelector('summary').onclick = (event) => { event.preventDefault(); menu.open = true; };
    menu.onmouseleave = () => { if (!menu.contains(document.activeElement)) menu.open = false; };
  }));
  return `<details class="owner-operation-menu"><summary>操作 ${icon('chevron-down')}</summary><div class="owner-operation-options"><button type="button" data-id="${escapeHtml(id)}" onclick="AppPrototype.ownerRecord(this.dataset.id,${draft})">${icon('list')}查看记录</button><button type="button" data-id="${escapeHtml(id)}" onclick="AppPrototype.ownerSettings(this.dataset.id,${draft})">${icon('settings-2')}设置</button><button type="button" data-id="${escapeHtml(id)}" onclick="AppPrototype.ownerDelete(this.dataset.id,${draft})">${icon('trash-2')}${draft ? '删除草稿' : '删除'}</button></div></details>`;
}
function staffDrafts() {
  try { const rows = JSON.parse(localStorage.getItem('prototype-staff-drafts') || '[]'); return Array.isArray(rows) ? rows.filter((item) => item.authorId === state.session?.id) : []; } catch (_) { return []; }
}
function persistStaffDrafts(rows) {
  let all = [];
  try { const stored = JSON.parse(localStorage.getItem('prototype-staff-drafts') || '[]'); if (Array.isArray(stored)) all = stored; } catch (_) {}
  localStorage.setItem('prototype-staff-drafts', JSON.stringify([...all.filter((item) => item.authorId !== state.session?.id), ...rows]));
}
function capturePostComposer() {
  const draft = state.composeBuffer || staffDrafts().find((item) => item.id === state.editingDraftId) || PrototypeData.read().posts.find((item) => String(item.id) === String(state.editingPostId)) || {};
  const board = PrototypeData.postingBoards().find((item) => item.id === byId('new-post-board')?.value);
  const file = byId('new-post-attachment')?.files?.[0];
  return { ...draft, board: board?.name || '', title: byId('new-post-title')?.value.trim() || '', subtitle: byId('new-post-subtitle')?.value.trim() || '', body: byId('new-post-body')?.innerText.trim() || '', publicationMode: document.querySelector('input[name="new-post-identity"]:checked')?.value || 'anonymous', allowComments: byId('new-post-allow-comments')?.checked !== false, attachment: file ? { name: file.name, size: file.size, type: file.type } : document.querySelector('.post-compose-modal')?.dataset.removeAttachment === 'true' ? null : draft.attachment || null };
}
function renderDraftBox() {
  if (!state.draftBoxOpen) return '';
  return `<aside class="staff-draft-box" aria-label="我的草稿"><header><h3>我的草稿</h3><button type="button" title="关闭草稿箱" onclick="AppPrototype.toggleDraftBox()">${icon('x')}</button></header>${staffDrafts().map((draft) => `<article><div><strong>${escapeHtml(draft.title || '未命名草稿')}</strong><small>${escapeHtml(draft.board || '未选择栏目')} · ${escapeHtml(draft.updatedAt)}</small></div><button type="button" onclick="AppPrototype.editStaffDraft('${draft.id}')">编辑</button><button type="button" onclick="AppPrototype.deleteStaffDraft('${draft.id}')">删除</button></article>`).join('') || '<p class="personal-empty">暂无草稿</p>'}</aside>`;
}
function renderPersonalDrafts(category) {
  const drafts = staffDrafts().filter((item) => category === '全部' || item.board === category);
  return drafts.map((draft) => `<article class="portal-post-card staff-draft-card"><div class="portal-post-card-head"><span>${escapeHtml(draft.board || '未选择栏目')}</span><small>草稿 · ${escapeHtml(draft.updatedAt)}</small></div><h3>${escapeHtml(draft.title || '未命名草稿')}</h3><p>${escapeHtml(draft.body)}</p><div class="personal-post-owner-actions"><button type="button" onclick="AppPrototype.editStaffDraft('${draft.id}')">${icon('pencil-line')} 修改后重新提交</button>${renderOwnerMenu(draft.id, true)}</div></article>`).join('');
}

function renderPostComposer() {
  if (!state.postComposerOpen) return '';
  const data = PrototypeData.read();
  const editingPost = state.composeBuffer || (state.editingDraftId ? staffDrafts().find((post) => post.id === state.editingDraftId) : state.editingPostId === null ? null : data.posts.find((post) => String(post.id) === String(state.editingPostId)));
  const boards = PrototypeData.postingBoards(data).filter((board) => board.name !== '回音壁' && (state.editingPostId === null || !editingPost || !['建言献策', '心声诉求'].includes(editingPost.board) || board.name === editingPost.board));
  const selectedBoard = boards.find((board) => board.name === editingPost?.board);
  const commentsEnabled = Boolean(selectedBoard && selectedBoard.allowComments !== false);
  const identity = editingPost?.publicationMode || staffProfile().publicationMode || 'real';
  const existingAttachment = editingPost?.attachment || null;
  const body = escapeHtml(editingPost?.body || '').replace(/\n/g, '<br>');
  return `<div class="ranking-backdrop" onclick="AppPrototype.closePostComposer(event)"><section class="ranking-modal post-compose-modal" role="dialog" aria-modal="true" aria-labelledby="post-compose-title"><header class="ranking-modal-head"><div><span>供销心声</span><h2 id="post-compose-title">${state.editingPostId !== null ? '修改帖子' : '发表帖子'}</h2></div><button type="button" class="draft-box-trigger" onclick="AppPrototype.toggleDraftBox()">草稿箱 ${staffDrafts().length}</button><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closePostComposer()">${icon('x')}</button></header><div class="post-compose-fields"><label><span class="post-field-title">发表栏目 <b class="required-mark" aria-label="必填">*</b></span><select id="new-post-board" required onchange="AppPrototype.updateComposerBoard()"><option value="">请选择发言栏目</option>${boards.map((board) => `<option value="${escapeHtml(board.id)}" ${board.name === editingPost?.board ? 'selected' : ''}>${escapeHtml(board.name)}</option>`).join('')}</select></label><label><span class="post-field-title">帖子标题 <b class="required-mark" aria-label="必填">*</b></span><input id="new-post-title" maxlength="100" placeholder="填写标题" value="${escapeHtml(editingPost?.title || '')}" required></label><label><span class="post-field-title">副标题 <small>选填</small></span><input id="new-post-subtitle" maxlength="160" placeholder="填写副标题" value="${escapeHtml(editingPost?.subtitle || '')}"></label><label><span class="post-field-title">正文内容 <b class="required-mark" aria-label="必填">*</b></span><div class="rich-editor"><div class="rich-toolbar" role="toolbar" aria-label="正文编辑工具"><button type="button" title="加粗" onclick="AppPrototype.formatPost('bold')"><b>B</b></button><button type="button" title="斜体" onclick="AppPrototype.formatPost('italic')"><i>I</i></button><button type="button" title="下划线" onclick="AppPrototype.formatPost('underline')"><u>U</u></button><button type="button" title="项目列表" onclick="AppPrototype.formatPost('insertUnorderedList')">${icon('list')}</button><button type="button" title="引用" onclick="AppPrototype.formatPost('formatBlock', 'blockquote')">${icon('text-quote')}</button><span></span><button type="button" title="撤销" onclick="AppPrototype.formatPost('undo')">${icon('undo-2')}</button><button type="button" title="重做" onclick="AppPrototype.formatPost('redo')">${icon('redo-2')}</button></div><div id="new-post-body" class="rich-editor-body" contenteditable="true" role="textbox" aria-multiline="true" aria-required="true" data-placeholder="写下具体问题、建议或工作经验">${body}</div></div></label><div class="post-attachment-field"><div class="post-field-title">附件上传 <small>选填</small></div><input id="new-post-attachment" class="post-attachment-input" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z,.jpg,.jpeg,.png" onchange="AppPrototype.handlePostAttachment(this)"><div class="post-attachment-picker"><label class="post-attachment-button" for="new-post-attachment">${icon('paperclip')}<span>${existingAttachment ? '替换文件' : '选择文件'}</span></label><div class="post-attachment-copy"><strong id="new-post-attachment-name">${escapeHtml(existingAttachment?.name || '未选择文件')}</strong><small id="new-post-attachment-hint">${existingAttachment ? `${formatPostFileSize(existingAttachment.size)} · 已保留原附件` : '限 1 份，最大 50MB；支持 PDF、Office、TXT、压缩包、JPG/PNG'}</small></div><button type="button" id="new-post-attachment-remove" class="post-attachment-remove" title="移除附件" onclick="AppPrototype.clearPostAttachment()" ${existingAttachment ? '' : 'hidden'}>${icon('x')}</button></div></div><fieldset class="post-publish-settings"><legend>发布设置</legend><div class="post-identity-options"><label class="post-identity-option"><input type="radio" name="new-post-identity" value="real" ${identity === 'real' ? 'checked' : ''}><span>实名发布</span></label><label class="post-identity-option"><input type="radio" name="new-post-identity" value="anonymous" ${identity === 'anonymous' ? 'checked' : ''}><span>匿名发布</span></label></div><div class="post-setting-divider"></div><label class="post-comment-toggle"><span><strong>允许评论</strong><small id="new-post-comment-hint">${editingPost?.board ? '栏目关闭评论时此处不可开启。' : '请先选择栏目；栏目关闭评论时此处不可开启。'}</small></span><input id="new-post-allow-comments" type="checkbox" role="switch" ${commentsEnabled && editingPost?.allowComments !== false ? 'checked' : ''} ${!commentsEnabled ? 'disabled' : ''}><i aria-hidden="true"><b></b></i></label></fieldset><p id="post-compose-error" class="post-compose-error" role="alert" hidden></p></div><footer class="post-compose-actions"><button type="button" onclick="AppPrototype.closePostComposer()">取消</button><button type="button" onclick="AppPrototype.savePostDraft()">保存草稿</button><button type="button" class="primary" onclick="AppPrototype.submitPost()">提交</button></footer>${renderDraftBox()}</section></div>`;
}
function renderHomeContent() {
  if (state.homeContentTab === '精华贴') {
    const posts = getRankingItems('discussion').slice(0, 20).map((item, index) => rankingItemToPost(item, 'discussion', index));
    return renderPortalFeed({ posts, title: '精华贴', numbered: true });
  }
  if (state.homeContentTab === '本周热议') {
    const posts = getRankingItems('progress').slice(0, 20).map((item, index) => rankingItemToPost(item, 'progress', index));
    return renderPortalFeed({ posts, title: '本周热议', numbered: true });
  }
  return renderPortalFeed({ posts: portalPosts.filter((post) => !post.managedUnavailable && PrototypeData.isPublicPost(post)), title: '内容动态', numbered: true });
}
function renderHomeNotices() {
  const notices = sortedHomeNotices();
  const visible = notices.length > 5 ? Array.from({ length: 5 }, (_, index) => notices[(state.noticeCarouselIndex + index) % notices.length]) : notices;
  const unreadCount = notices.filter((notice) => !state.noticeRead[notice.id]).length;
  return `<section class="portal-panel notice-panel"><header class="portal-panel-head"><h2>${icon('megaphone')} 通知公告${unreadCount ? `<small class="utility-count">${notices.length} 条</small>` : ''}</h2><button type="button" onclick="AppPrototype.setWorkspaceView('notices')">更多 ${icon('arrow-right')}</button></header>${visible.map((notice) => { const unread = !state.noticeRead[notice.id]; return `<button class="notice-item ${unread ? 'unread' : 'read'}" type="button" onclick="AppPrototype.showHomeNotice('${notice.id}')"><div class="utility-item-title">${unread ? '<i class="utility-unread-dot" aria-label="未读"></i>' : ''}<strong>${escapeHtml(notice.title)}</strong></div><span>${escapeHtml(notice.meta)}</span></button>`; }).join('')}</section>`;
}
function renderHomeAffairs() {
  const data = PrototypeData.read();
  const posts = ownedStaffPosts(data);
  seedDemoProgressUpdates(data, posts);
  const unread = unreadStaffReplies(data);
  const { seen } = staffProgressSeen(data, posts);
  const needsReview = posts.filter((post) => seen[post.id] !== progressSignature(staffPostProgress(post, data)) || unread.some((item) => String(item.postId) === String(post.id)));
  const visible = posts.slice(0, Math.max(0, 6 - staffDrafts().length));
  return `<section class="portal-panel my-affairs-panel"><header class="portal-panel-head"><h2>${icon('file-text')} 我的发言${needsReview.length ? `<small class="utility-count">${posts.length + staffDrafts().length} 条</small>` : ''}</h2><button type="button" onclick="AppPrototype.setWorkspaceView('profile')">查看全部 ${icon('arrow-right')}</button></header><div class="affair-review-list" aria-label="我的发言">${staffDrafts().slice(0, 6).map((draft) => `<button class="affair-item" type="button" onclick="AppPrototype.editStaffDraft('${draft.id}')"><div><strong>${escapeHtml(draft.title || '未命名草稿')}</strong><span>${escapeHtml(draft.board || '未选择栏目')}</span></div><em class="progress-status pending">草稿</em></button>`).join('')}${visible.map((post) => { const progress = staffPostProgress(post, data); const update = unread.find((item) => String(item.postId) === String(post.id)); return `<button class="affair-item updated" type="button" onclick="AppPrototype.openPostProgress('${escapeHtml(post.id)}')"><div><div class="utility-item-title"><i class="utility-unread-dot" aria-label="有更新"></i><strong>${escapeHtml(post.title)}</strong></div><span>${escapeHtml(update?.node || progress.label)} · ${escapeHtml(update?.message || progress.detail)}</span></div><em class="progress-status ${progress.tone}">${escapeHtml(staffListStatusLabel(post, progress))}</em></button>`; }).join('') || '<p class="progress-empty">暂无待查看的发言</p>'}</div>${posts.length > 6 ? `<button type="button" class="affair-review-foot" onclick="AppPrototype.setWorkspaceView('profile')">还有 ${posts.length - 6} 条，请查看全部</button>` : ''}</section>`;
}
function activeManagedBanners(data = PrototypeData.read()) {
  return (data.banners || []).filter((item) => {
    if (!item.enabled) return false;
    if (item.type === 'external') return true;
    if (item.type === 'post') {
      const post = data.posts.find((target) => String(target.id) === String(item.targetId));
      const publication = (data.echoPublications || []).find((target) => String(target.id) === String(item.targetId));
      return post ? PrototypeData.isPublicPost(post) : PrototypeData.isPublicEcho(publication, data);
    }
    const targets = item.type === 'notice' ? data.notices : [...data.policies, ...data.questions];
    return targets.some((target) => String(target.id) === String(item.targetId) && target.status === '已发布' && target.enabled !== false && !target.deleted);
  }).sort((a, b) => a.sort - b.sort).slice(0, 8);
}
function renderStaffPortal() {
  const managedBanners = activeManagedBanners();
  const banners = managedBanners.length ? managedBanners.map((item) => ({ ...item, tag: '湖北供销 · 心声' })) : policyBanners;
  const banner = banners[state.bannerIndex % banners.length];
  return `<div class="page-head portal-head"><div><div class="page-kicker">湖北供销 · 心声</div><h1>首页</h1><p>查看职工交流动态、通知公告和我的发言</p></div><button class="staff-home-compose" type="button" onclick="AppPrototype.openPostComposer()">${icon('square-pen')}<span>我要发言</span></button></div>
    <section class="portal-grid staff-home-grid">
      <div class="portal-content-column">
        <section class="policy-carousel" style="background-image:linear-gradient(90deg, rgba(25,30,31,.64), rgba(25,30,31,.12)), url('${escapeHtml(banner.image)}')">
          <div class="policy-copy"><span>${escapeHtml(banner.tag)}</span><h2>${escapeHtml(banner.title)}</h2><p>${escapeHtml(banner.summary)}</p><button type="button" onclick="AppPrototype.openBanner(${state.bannerIndex % banners.length})">查看详情 ${icon('arrow-right')}</button></div>
          <div class="carousel-tools"><button type="button" class="carousel-arrow" title="上一条" onclick="AppPrototype.changeBanner(-1)">${icon('chevron-left')}</button><div class="carousel-dots">${banners.map((_, index) => `<button type="button" class="${index === state.bannerIndex % banners.length ? 'active' : ''}" aria-label="第 ${index + 1} 条轮播图" onclick="AppPrototype.setBanner(${index})"></button>`).join('')}</div><button type="button" class="carousel-arrow" title="下一条" onclick="AppPrototype.changeBanner(1)">${icon('chevron-right')}</button></div>
        </section>
        ${renderHomeContentTabs()}
        ${renderHomeContent()}
      </div>
      <aside class="portal-utility-column">
        ${renderHomeNotices()}
        ${renderHomeAffairs()}
      </aside>
    </section>`;
}
function renderSupplyVoice() {
  return `<div class="supply-voice-page">
    <div class="page-head portal-head"><div><div class="page-kicker">职工协同</div><h1>供销心声</h1><p>汇集职工建言、诉求、业务经验与办理回音</p></div><span class="date">2026 年 09 月 10 日 · 星期四</span></div>
    <section class="portal-grid supply-voice-grid">
      <div class="portal-main-column">${renderPortalTabs()}<form class="staff-voice-tools" onsubmit="event.preventDefault();AppPrototype.searchVoices()"><div>${icon('search')}<input id="voice-search" placeholder="搜索论坛帖子、建议或回音..." value="${escapeHtml(state.voiceSearch)}"></div><button type="submit">${icon('search')} 搜索</button><button type="button" onclick="AppPrototype.refreshVoices()">${icon('refresh-cw')} 刷新</button><button type="button" class="primary" onclick="AppPrototype.openPostComposer()">${icon('pencil-line')} 我要发帖</button></form>${renderPortalFeed({ title: '内容动态' })}</div>
      <aside class="portal-side-column">${renderRankingPanel('discussion')}${renderRankingPanel('progress')}</aside>
    </section>
  </div>`;
}
function getMyPolicyQuestions() {
  const data = PrototypeData.read();
  return (data?.questions || []).filter((item) => item.authorId && item.authorId === state.session?.id).sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
}
function renderPolicyQuestionTools() {
  const questions = getMyPolicyQuestions();
  return `<section class="knowledge-question-tools"><div class="knowledge-question-intro"><span class="knowledge-section-mark"></span><div><h2>有问题，直接提交</h2><p>提交给相关部门答复，公开答复后会进入常见问答。</p></div></div><div class="knowledge-question-actions"><button type="button" class="knowledge-question-button primary" onclick="AppPrototype.openPolicyQuestion()">${icon('message-square-plus')} <span>我要提问</span></button><button type="button" class="knowledge-question-button" onclick="AppPrototype.openMyPolicyQuestions()">${icon('clipboard-list')} <span>我的提问</span>${questions.length ? `<em>${questions.length}</em>` : ''}</button></div></section>`;
}
function renderPolicyQuestionModal() {
  if (!state.policyQuestionOpen || state.staffDisplayMode === 'mobile') return '';
  return `<div class="ranking-backdrop" onclick="AppPrototype.closePolicyQuestion(event)"><section class="ranking-modal knowledge-question-modal" role="dialog" aria-modal="true" aria-labelledby="policy-question-title"><header class="ranking-modal-head"><div><span>政策答疑与公开 · 职工提问</span><h2 id="policy-question-title">提交问题</h2><p>请描述实际工作中遇到的政策、办事或制度问题，我们会转交相关部门答复。</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closePolicyQuestion()">${icon('x')}</button></header><form class="knowledge-question-form" onsubmit="event.preventDefault();AppPrototype.submitPolicyQuestion()"><label><span>问题标题 <i>必填</i></span><small>用一句话概括你想了解的事项</small><input id="policy-question-title-input" maxlength="80" placeholder="例如：基层社项目申报需要准备哪些材料？" required></label><label><span>问题分类 <i>必填</i></span><select id="policy-question-category"><option>项目申报</option><option>财务管理</option><option>教育培训</option><option>数据管理</option><option>其他</option></select></label><label><span>问题描述 <i>必填</i></span><small>可补充背景、当前困难和希望得到的具体答复，500 字以内</small><textarea id="policy-question-body" maxlength="500" rows="6" placeholder="请填写问题的具体情况"></textarea></label><label class="knowledge-question-check"><input id="policy-question-anonymous" type="checkbox"><span>匿名提交</span><small>匿名后，公开答复不会显示你的姓名</small></label><footer class="post-compose-actions"><button type="button" onclick="AppPrototype.closePolicyQuestion()">取消</button><button type="submit" class="primary">提交问题</button></footer></form></section></div>`;
}
function renderMyPolicyQuestionsModal() {
  if (!state.myPolicyQuestionsOpen || state.staffDisplayMode === 'mobile') return '';
  const questions = getMyPolicyQuestions();
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeMyPolicyQuestions(event)"><section class="ranking-modal knowledge-question-modal" role="dialog" aria-modal="true" aria-labelledby="my-policy-questions-title"><header class="ranking-modal-head"><div><span>政策答疑与公开</span><h2 id="my-policy-questions-title">我的提问</h2><p>查看问题提交记录和答复状态。</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeMyPolicyQuestions()">${icon('x')}</button></header><div class="knowledge-question-list">${questions.length ? questions.map((item) => { const answered = Boolean(item.answer); return `<article class="knowledge-question-item"><div><span>${escapeHtml(item.category || '其他')}</span><small>${escapeHtml(item.submittedAt || '')}</small></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body || '')}</p><strong class="knowledge-question-status ${answered ? 'published' : 'pending'}">${answered ? '已答复' : '待答复'}</strong>${answered ? `<div class="knowledge-question-answer"><b>答复</b><p>${escapeHtml(item.answer)}</p></div>` : ''}</article>`; }).join('') : '<p class="knowledge-question-empty">还没有提交过问题。</p>'}</div><footer class="post-compose-actions"><button type="button" class="primary" onclick="AppPrototype.closeMyPolicyQuestions()">关闭</button></footer></section></div>`;
}
function getPolicyDetail(id) {
  return Object.values(policyContent).flat().find((item) => item.id === id);
}
function policyDateLabel(date) {
  return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$1 年 $2 月 $3 日');
}
function renderPolicyCatalogItem(item) {
  return `<article class="knowledge-catalog-item"><div class="knowledge-catalog-type">${item.type}</div><div class="knowledge-catalog-copy"><div class="knowledge-catalog-meta"><span>${item.category}</span><small>${item.department} · 发布于 ${policyDateLabel(item.date)}</small></div><h3>${item.title}</h3><p>${item.summary}</p></div><button type="button" class="knowledge-detail-link" onclick="AppPrototype.openPolicyDetail('${item.id}')">查看详情 ${icon('arrow-right')}</button></article>`;
}
function getHotPolicyItems() {
  return Object.values(policyContent).flat().map((item, index) => ({ ...item, _fallbackOrder: index })).sort((a, b) => Number(Boolean(b.hotPinned)) - Number(Boolean(a.hotPinned)) || (Number.isFinite(a.hotOrder) ? a.hotOrder : 9999) - (Number.isFinite(b.hotOrder) ? b.hotOrder : 9999) || a._fallbackOrder - b._fallbackOrder || b.date.localeCompare(a.date));
}
function renderHotPolicyModal() {
  if (!state.hotPolicyOpen) return '';
  const items = getHotPolicyItems();
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeHotPolicies(event)"><section class="ranking-modal knowledge-modal hot-policy-modal" role="dialog" aria-modal="true" aria-labelledby="hot-policy-modal-title"><header class="ranking-modal-head"><div><span>后台人工置顶与排序</span><h2 id="hot-policy-modal-title">热门政策</h2><p>查看全部推荐内容</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeHotPolicies()">${icon('x')}</button></header><div class="knowledge-hot-list hot-policy-modal-list">${items.map((item, index) => `<button type="button" class="knowledge-hot-item" onclick="AppPrototype.openHotPolicyDetail('${item.id}')"><b class="hot-policy-rank">${index + 1}</b><span class="knowledge-hot-tag">${escapeHtml(item.type)}</span><span class="knowledge-hot-title">${escapeHtml(item.title)}</span><span class="knowledge-hot-date">${escapeHtml(item.date.slice(5).replace('-', '月'))}日</span>${icon('arrow-right')}</button>`).join('')}</div><footer class="ranking-modal-foot">共 ${items.length} 条推荐内容</footer></section></div>`;
}
function renderPolicyPage() {
  const active = policyTabs.find(([id]) => id === state.policyTab) || policyTabs[0];
  const items = policyContent[active[0]];
  const hotItems = getHotPolicyItems().slice(0, 5);
  return `<div class="knowledge-page">
    <section class="knowledge-hero">
      <div class="knowledge-hero-copy"><span>职工服务 · 政策答疑与公开</span><h1>政策一键查询</h1><p>政策解读、常见问答、整改公开信息集中查看</p></div>
      <form class="knowledge-search" onsubmit="AppPrototype.searchPolicy(event)"><div class="knowledge-search-mode"><b>全部内容</b><span>支持标题、分类和部门关键词</span></div><div class="knowledge-search-box">${icon('search')}<input id="policy-search" type="search" placeholder="请输入政策、问题或关键词" aria-label="搜索政策内容"><button type="submit">搜索</button></div></form>
    </section>
    <section class="knowledge-section knowledge-hot-section">
      <header class="knowledge-section-head"><div><span class="knowledge-section-mark"></span><h2>热门政策</h2></div><button type="button" class="knowledge-more-button" onclick="AppPrototype.openHotPolicies()">查看更多 ${icon('arrow-right')}</button></header>
      <div class="knowledge-hot-list">${hotItems.map((item) => `<button type="button" class="knowledge-hot-item" onclick="AppPrototype.openPolicyDetail('${item.id}')"><span class="knowledge-hot-tag">${item.type}</span><span class="knowledge-hot-title">${item.title}</span><span class="knowledge-hot-date">${item.date.slice(5).replace('-', '月')}日</span>${icon('arrow-up-right')}</button>`).join('')}</div>
    </section>
    <nav class="knowledge-entry-cards" aria-label="政策内容分类">${policyTabs.map(([id, label, description], index) => `<button type="button" class="knowledge-entry-card ${state.policyTab === id ? 'active' : ''}" onclick="AppPrototype.setPolicyTab('${id}')"><span class="knowledge-entry-icon">${icon(id === 'policy' ? 'file-text' : id === 'faq' ? 'circle-help' : 'clipboard-check')}</span><span><strong>${label}</strong><small>${index === 0 ? '政策文件与办事指引' : index === 1 ? '问题与标准答复' : '结果与公开进展'}</small></span>${icon('arrow-right')}</button>`).join('')}</nav>
    ${active[0] === 'faq' ? renderPolicyQuestionTools() : ''}
    <section class="knowledge-section knowledge-catalog">
      <header class="knowledge-section-head"><div><span class="knowledge-section-mark"></span><h2>政策清单</h2></div><span>共 ${items.length} 条 · ${active[1]}</span></header>
      <div class="knowledge-catalog-list">${items.map(renderPolicyCatalogItem).join('')}</div>
      <footer class="knowledge-catalog-foot">当前展示 ${items.length} 条公开内容</footer>
    </section>
  </div>`;
}
/* 消息中心：官方回复、业务通知、通知公告；评论/点赞/举报统一在个人中心查看 */
const MESSAGE_TABS = ['官方回复', '业务通知', '通知公告'];
/* 消息中心已读状态：三个页签共用同一份按账号隔离的 localStorage 记录，读取失败时退回内存态 */
const MESSAGE_READ_GROUPS = ['notices', 'interactions', 'replies'];
function messageReadKey(userId) { return `prototype-message-read-${userId || state.session?.id || 'staff'}`; }
function loadMessageReadState(userId) {
  const loaded = { notices: {}, interactions: {}, replies: {} };
  try {
    const raw = JSON.parse(localStorage.getItem(messageReadKey(userId)) || '{}');
    if (raw && typeof raw === 'object') for (const group of MESSAGE_READ_GROUPS) if (raw[group] && typeof raw[group] === 'object' && !Array.isArray(raw[group])) loaded[group] = raw[group];
  } catch (_) { /* localStorage 不可用或数据损坏：保持空态，不阻断渲染 */ }
  return loaded;
}
function saveMessageReadState(userId) {
  try { localStorage.setItem(messageReadKey(userId), JSON.stringify({ notices: state.noticeRead || {}, interactions: state.interactionRead || {}, replies: state.replyRead || {} })); } catch (_) { /* 写入失败仅影响刷新后的恢复，不影响当前会话 */ }
}
function hasMessageReadStore(userId) {
  try { return Boolean(localStorage.getItem(messageReadKey(userId))); } catch (_) { return false; }
}
/* 首次（无任何持久化记录）以预置已读为缺省，已有持久化时一律以持久化为准 */
function applyMessageReadState(userId) {
  const loaded = loadMessageReadState(userId);
  state.noticeRead = loaded.notices;
  state.interactionRead = loaded.interactions;
  state.replyRead = loaded.replies;
  if (!hasMessageReadStore(userId)) {
    Object.assign(state.interactionRead, INTERACTION_READ_PRESET);
    saveMessageReadState(userId);
  }
}
function noticeUnreadCount() { return homeNotices.filter((notice) => !state.noticeRead[notice.id]).length; }
function interactionUnreadCount() { return personalInteractions.filter((_, index) => !state.interactionRead[index]).length; }
function businessNotificationItems() {
  if (!state.session) return [];
  const data = PrototypeData.read();
  const authorId = state.session.id || 'staff';
  return (data.staffNotifications || []).filter((item) => String(item.authorId) === String(authorId)).map((item) => ({
    ...item,
    title: item.postTitle || item.text?.split('：')[0] || '事项办理通知',
    content: item.message || item.text || '有新的业务处理进展，请及时查看。',
    detail: item.at || '时间未记录',
    read: Boolean(item.readAt)
  }));
}
function businessNotificationUnreadCount() { return businessNotificationItems().filter((item) => !item.read).length; }
/* 互动列表 20 条演示记录保留，前 14 条预置为已读，使侧栏徽标回落到合理量级 */
const INTERACTION_READ_PRESET = Object.fromEntries(personalInteractions.slice(0, 14).map((_, index) => [index, true]));
/* 官方回复时间统一为与通知公告一致的 MM-DD 口径，无法解析时给出稳定回落值 */
const REPLY_DATE_FALLBACK = '--';
function replyDateLabel(value) {
  const text = String(value || '').trim();
  if (!text) return REPLY_DATE_FALLBACK;
  const full = text.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (full) return `${full[2].padStart(2, '0')}-${full[3].padStart(2, '0')}`;
  const short = text.match(/(\d{1,2})\D+(\d{1,2})/);
  if (short) return `${short[1].padStart(2, '0')}-${short[2].padStart(2, '0')}`;
  return REPLY_DATE_FALLBACK;
}
/* 官方回复：入列依据只有「事项办理状态为已回复」；staffNotifications 仅补充时间、摘要与未读数，不得单独造成一条记录入列 */
function officialReplyItems() {
  if (!state.session) return [];
  const data = PrototypeData.read();
  const posts = ownedStaffPosts(data);
  const authorId = state.session.id || 'staff';
  const notifications = (data.staffNotifications || []).filter((item) => String(item.authorId) === String(authorId));
  const items = [];
  for (const post of posts) {
    const progress = staffPostProgress(post, data);
    if (progress.label !== '已回复') continue;
    const affair = progress.affair || {};
    const postId = String(post.id);
    const related = notifications.filter((item) => String(item.postId) === postId);
    const unreadNotifications = related.filter((item) => !item.readAt).length;
    const lastEvent = progress.events.length ? progress.events[progress.events.length - 1] : null;
    const serverRead = related.length > 0 && unreadNotifications === 0;
    const read = Boolean(state.replyRead[postId]) || serverRead;
    items.push({
      postId,
      post,
      title: post.title,
      summary: String(affair.draft || '').trim() || '工作人员已完成办理并发送正式回复。',
      publicReply: affair.feedback === '公开答复',
      at: replyDateLabel(affair.repliedAt || lastEvent?.at || related[0]?.at || post.time),
      notificationCount: related.length,
      unreadNotifications,
      read,
      unread: !read
    });
  }
  return items;
}
function replyUnreadCount() { return officialReplyItems().filter((item) => item.unread).length; }
function messageTabUnread(tab) {
  if (tab === '官方回复') return replyUnreadCount();
  if (tab === '业务通知') return businessNotificationUnreadCount();
  return noticeUnreadCount();
}
function messageUnreadTotal() { return unifiedNoticeItems().filter((item) => !item.read).length; }
function activeMessageTab() { return MESSAGE_TABS.includes(state.messageTab) ? state.messageTab : MESSAGE_TABS[0]; }
function renderMessageTabs() {
  const active = activeMessageTab();
  return `<nav class="message-tabs" aria-label="消息中心分类">${MESSAGE_TABS.map((tab) => { const unread = messageTabUnread(tab); return `<button type="button" class="message-tab ${active === tab ? 'active' : ''}" aria-current="${active === tab ? 'page' : 'false'}" onclick="AppPrototype.setMessageTab('${tab}')">${tab}${unread ? `<span class="message-tab-badge">${unread}</span>` : ''}</button>`; }).join('')}</nav>`;
}
function renderInteractionMessages() {
  const unreadCount = interactionUnreadCount();
  const replies = officialReplyItems();
  const totalUnread = unreadCount + replies.filter((item) => item.unread).length;
  const interactionRows = personalInteractions.map((item, index) => { const read = Boolean(state.interactionRead[index]); return `<article class="message-item ${read ? 'read' : 'unread'}"><span class="message-item-icon">${icon(item.icon || 'message-circle')}</span><div class="message-item-main"><div class="message-item-meta"><span class="message-item-type">${escapeHtml(item.type)}</span><small>${escapeHtml(item.detail)}</small></div><h3>${escapeHtml(item.title)}${read ? '' : '<i class="message-unread-dot" aria-label="未读"></i>'}</h3><p>${escapeHtml(item.content)}</p></div><div class="message-item-actions"><button type="button" class="primary" onclick="AppPrototype.readInteraction(${index})">查看</button></div></article>`; });
  const replyRows = replies.map((item) => `<article class="message-item ${item.read ? 'read' : 'unread'}"><span class="message-item-icon">${icon('messages-square')}</span><div class="message-item-main"><div class="message-item-meta"><span class="message-item-type">官方回复</span><small>${escapeHtml(item.at || '时间未记录')}</small></div><h3>${escapeHtml(item.title)}${item.unread ? '<i class="message-unread-dot" aria-label="未读"></i>' : ''}</h3><p>${escapeHtml(item.summary)}</p><div class="message-item-note"><span class="message-item-scope ${item.publicReply ? 'public' : 'private'}">${item.publicReply ? '公开答复' : '仅本人可见'}</span></div></div><div class="message-item-actions"><button type="button" class="primary" onclick="AppPrototype.readReply('${escapeHtml(item.postId)}')">查看</button></div></article>`);
  return `<section class="message-section"><header class="message-section-head"><div><span class="message-section-mark"></span><div><h2>互动消息</h2><p>评论、点赞、举报与官方回复集中查看</p></div></div><div class="message-section-actions"><span class="message-unread-count ${totalUnread ? 'has-unread' : ''}">${totalUnread ? `${totalUnread} 条未读` : '全部已读'}</span><button type="button" onclick="AppPrototype.markAllInteractionsRead(); AppPrototype.markAllRepliesRead();">全部标记已读</button></div></header><div class="message-list">${interactionRows.concat(replyRows).join('') || '<p class="message-empty">暂无互动消息</p>'}</div><footer class="message-foot">共 ${interactionRows.length + replyRows.length} 条互动记录</footer></section>`;
}
function renderBusinessNotifications() {
  const items = businessNotificationItems();
  const unreadCount = businessNotificationUnreadCount();
  return `<section class="message-section"><header class="message-section-head"><div><span class="message-section-mark"></span><div><h2>业务通知</h2><p>事项进展、审核结果与办理节点提醒</p></div></div><div class="message-section-actions"><span class="message-unread-count ${unreadCount ? 'has-unread' : ''}">${unreadCount ? `${unreadCount} 条未读` : '全部已读'}</span></div></header><div class="message-list">${items.length ? items.map((item) => `<article class="message-item ${item.read ? 'read' : 'unread'}"><span class="message-item-icon">${icon('bell-ring')}</span><div class="message-item-main"><div class="message-item-meta"><span class="message-item-type">业务通知</span><small>${escapeHtml(item.detail)}</small></div><h3>${escapeHtml(item.title)}${item.read ? '' : '<i class="message-unread-dot" aria-label="未读"></i>'}</h3><p>${escapeHtml(item.content)}</p></div><div class="message-item-actions"><button type="button" class="primary" onclick="AppPrototype.openPostProgress('${escapeHtml(item.postId || '')}')">查看</button></div></article>`).join('') : '<p class="message-empty">暂无业务通知</p>'}</div><footer class="message-foot">共 ${items.length} 条业务通知</footer></section>`;
}
function renderOfficialReplyMessages() {
  const items = officialReplyItems();
  const chats = PrivateChat.items(state.session?.id).map((thread) => {
    const post = PrototypeData.read().posts.find((p) => String(p.id) === thread.postId);
    const last = thread.messages[thread.messages.length - 1];
    return `<article class="message-item"><div class="message-item-main"><div class="message-item-meta"><span>私聊</span><small>${escapeHtml(last?.at)}</small></div><h3>${escapeHtml(post?.title || '原帖私聊')}</h3><p>${escapeHtml(last?.text)}</p></div><div class="message-item-actions"><button class="primary" onclick="AppPrototype.openPrivateChat('${escapeHtml(thread.postId)}')">查看私聊${thread.messages.some((m) => m.role !== 'staff' && !m.read) ? ' · 未读' : ''}</button></div></article>`;
  }).join('');
  if (chats) return `<section class="message-section"><header class="message-section-head"><p>本人发言收到的办理答复与私密沟通</p></header><div class="message-list">${chats}${items.map((item) => `<article class="message-item"><div class="message-item-main"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></div><button onclick="AppPrototype.readReply('${escapeHtml(item.postId)}')">查看回复</button></article>`).join('')}</div></section>`;
  const unreadCount = replyUnreadCount();
  return `<section class="message-section"><header class="message-section-head"><div><span class="message-section-mark"></span><div><h2>官方回复</h2><p>本人发言收到的办理答复</p></div></div><div class="message-section-actions"><span class="message-unread-count ${unreadCount ? 'has-unread' : ''}">${unreadCount ? `${unreadCount} 条未读` : '全部已读'}</span><button type="button" onclick="AppPrototype.markAllRepliesRead()">全部标记已读</button></div></header><div class="message-list">${items.length ? items.map((item) => `<article class="message-item ${item.read ? 'read' : 'unread'}"><span class="message-item-icon">${icon('messages-square')}</span><div class="message-item-main"><div class="message-item-meta"><span class="message-item-type">官方回复</span><small>${escapeHtml(item.at || '时间未记录')}</small></div><h3>${escapeHtml(item.title)}${item.unread ? '<i class="message-unread-dot" aria-label="未读"></i>' : ''}</h3><p>${escapeHtml(item.summary)}</p></div><div class="message-item-actions"><button type="button" class="primary" onclick="AppPrototype.readReply('${escapeHtml(item.postId)}')">查看回复</button></div></article>`).join('') : '<p class="message-empty">暂无官方回复</p>'}</div><footer class="message-foot">共 ${items.length} 条办理答复</footer></section>`;
}
function renderPolicyNotices() {
  const unreadCount = noticeUnreadCount();
  const noticeTabs = ['全部', '未读', '已读'];
  const notices = homeNotices.filter((notice) => state.noticeTab === '全部' || Boolean(state.noticeRead[notice.id]) === (state.noticeTab === '已读'));
  return `<section class="knowledge-section knowledge-notice-section"><header class="knowledge-notice-head"><div><span class="knowledge-section-mark"></span><div><h2>公告清单</h2><p>平台规则、服务说明和工作提示</p></div></div><div class="knowledge-notice-head-actions"><span class="knowledge-notice-count">${unreadCount ? `${unreadCount} 条未读` : '全部已读'}</span><button type="button" onclick="AppPrototype.markAllNoticesRead()">全部标记已读</button></div></header><div class="knowledge-notice-list">${notices.length ? notices.map((notice) => { const read = Boolean(state.noticeRead[notice.id]); return `<article class="knowledge-notice-item ${read ? 'read' : 'unread'}"><div class="knowledge-notice-item-top"><span class="knowledge-notice-kind">${icon('megaphone')} 通知公告</span><small>${escapeHtml(notice.meta)}</small></div><h3>${escapeHtml(notice.title)}${read ? '' : '<i class="knowledge-notice-unread-dot" aria-label="未读"></i>'}</h3><p>${escapeHtml(notice.summary)}</p><div class="knowledge-notice-actions">${read ? '' : `<button type="button" onclick="AppPrototype.readNotice('${notice.id}')">我已知悉</button>`}<button type="button" class="primary" onclick="AppPrototype.openNotice('${notice.id}')">立即查看 ${icon('arrow-right')}</button></div></article>`; }).join('') : '<p class="knowledge-notice-empty">暂无通知公告。</p>'}</div><footer class="knowledge-notice-foot">${unreadCount ? '还有未读通知，请及时查看。' : '已全部读完'}</footer></section>`;
}
function noticeAttachment(notice) {
  const file = notice?.attachment;
  return file && typeof file === 'object' && (typeof file.content === 'string' || /^https?:\/\/|^\.\/?/.test(file.url || '')) ? file : null;
}
function renderNoticeAttachment(notice) {
  const file = noticeAttachment(notice);
  if (!file) return '';
  return `<section class="knowledge-attachment notice-attachment"><div>${icon('paperclip')}<div><span>关联附件</span><strong>${escapeHtml(file.name || '附件')}</strong></div></div><div class="notice-file-actions"><button type="button" onclick="AppPrototype.previewNoticeFile('${notice.id}')">预览</button><button type="button" onclick="AppPrototype.downloadNoticeFile('${notice.id}')">${icon('download')} 下载</button></div></section>`;
}
function renderNoticeDetailBody(notice) {
  return `<p class="knowledge-summary">${escapeHtml(notice.summary)}</p><section class="knowledge-detail-section"><h3>通知内容</h3><p>${escapeHtml(notice.body || notice.summary)}</p></section>${renderNoticeAttachment(notice)}`;
}
function renderNoticeDetailModal() {
  if (!state.noticeDetailId || state.staffDisplayMode === 'mobile') return '';
  const notice = homeNotices.find((item) => item.id === state.noticeDetailId);
  if (!notice) return '';
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeNoticeDetail(event)"><section class="ranking-modal knowledge-modal" role="dialog" aria-modal="true" aria-labelledby="notice-detail-title"><header class="ranking-modal-head"><div><span>${state.workspaceView === 'notices' ? '消息中心 · 通知公告' : '通知公告'}</span><h2 id="notice-detail-title">${escapeHtml(notice.title)}</h2><p>${escapeHtml(notice.meta)}</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeNoticeDetail()">${icon('x')}</button></header><div class="knowledge-modal-body">${renderNoticeDetailBody(notice)}</div><footer class="ranking-modal-foot"><button type="button" class="primary" onclick="AppPrototype.closeNoticeDetail()">关闭</button></footer></section></div>`;
}
function noticeFileUrl(file) {
  if (typeof file.content === 'string') return URL.createObjectURL(new Blob([file.content], { type: 'text/plain;charset=utf-8' }));
  return new URL(file.url, location.href).href;
}
function openNoticeFile(id, download) {
  const notice = homeNotices.find((item) => item.id === id);
  const file = noticeAttachment(notice);
  if (!file) return showToast('附件文件暂不可用。');
  const url = noticeFileUrl(file);
  const link = document.createElement('a');
  link.href = url;
  if (download) link.download = file.name || '通知附件';
  else link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.append(link);
  link.click();
  link.remove();
  if (typeof file.content === 'string') setTimeout(() => URL.revokeObjectURL(url), 60000);
}
function renderOriginalAffairProgressModal() {
  if (state.personalProgressId === null) return '';
  const data = PrototypeData.read();
  const post = ownedStaffPosts(data).find((item) => String(item.id) === String(state.personalProgressId));
  if (!post) return '';
  const progress = staffPostProgress(post, data);
  const affair = progress.affair;
  const meta = affair ? `${affair.id} · ${affair.category || post.board} · ${affair.isKey ? '重点事项' : affair.isCommon ? '共性事项' : '一般事项'}` : `帖子 #${post.id} · ${post.time}`;
  const nodeActor = (stage, index) => {
    if (stage === '待审核') return '王敏（内容审核人员）';
    if (stage === '待处理') return '王敏（事项管理员）';
    if (stage === '处理中') return '王敏（事项管理员）';
    if (stage === '审核通过') return '王敏（内容审核人员）';
    if (stage === '发布状态') return '王敏（内容发布人员）';
    if (stage === '已回复') return '王敏（事项管理员）';
    if (index === 0) return `${post.author || state.session?.name || '职工'}（提交人）`;
    return '王敏（事项管理员）';
  };
  const timeline = progress.stages.map((stage, index) => {
    const nodeEvents = progress.events.filter((event, eventIndex) => Math.min(eventIndex, progress.current) === index);
    const completed = index < progress.current;
    const current = index === progress.current;
    const actor = nodeActor(stage, index);
    const records = nodeEvents.map((event) => { const eventActor = event.actor || (event.text === '已提交发言' ? `${post.author || state.session?.name || '职工'}（提交人）` : actor); return `<div class="progress-node-record"><p>${escapeHtml(event.text)}</p><small class="progress-node-actor">操作人：${escapeHtml(eventActor)}</small>${event.at ? `<time>${escapeHtml(event.at)}</time>` : ''}</div>`; }).join('');
    const currentDetail = current && progress.detail && !nodeEvents.some((event) => event.text === progress.detail) ? `<p class="progress-node-detail">${escapeHtml(progress.detail)}</p><small class="progress-node-actor">操作人：${escapeHtml(actor)}</small>` : '';
    return `<li class="${index <= progress.current ? 'done' : ''} ${current ? 'current' : ''} ${index > progress.current ? 'upcoming' : ''}"><i>${completed ? icon('check') : index + 1}</i><div><strong>${escapeHtml(stage)}</strong>${currentDetail}${records}</div></li>`;
  }).reverse().join('');
  const publicationRejected = post.contentAuditStatus === '已驳回' || ['退回修改', '已驳回'].includes(post.status);
  const publicationReviewing = !publicationRejected && (post.contentAuditStatus === '待审核' || post.status === '待审核');
  const publicationPublished = !publicationRejected && !publicationReviewing && (post.publishStatus === '已发布' || post.status === '已发布' || post.status === '公开发布');
  const publicationLabel = publicationRejected ? '已驳回' : publicationReviewing ? '审核中' : '已发布';
  const publicationTone = publicationRejected ? 'rejected' : publicationReviewing ? 'pending' : 'done';
  const publicationCurrent = publicationRejected ? 2 : publicationReviewing ? 0 : 1;
  const auditLabel = publicationRejected ? '驳回' : publicationReviewing ? '审核中' : '通过';
  const publishLabel = post.publishStatus === '已发布' || publicationPublished ? '已发布' : '未发布';
  const handlingLabel = affair ? progress.label : '不适用';
  const publicationLog = [...progress.events].reverse().map((event) => `<article class="progress-operation-entry"><time>${escapeHtml(event.at || '时间未记录')}</time><strong>${escapeHtml(event.text)}</strong><small>操作人：${escapeHtml(event.actor || (event.text === '已提交发言' ? `${post.author || state.session?.name || '职工'}（提交人）` : '王敏（内容审核人员）'))}</small></article>`).join('');
  const officialReply = progress.label === '已回复' ? `<section class="official-reply-block"><div class="official-reply-block-head"><div><span class="progress-section-label">官方回复</span><h3>办理答复</h3></div><span class="message-item-scope ${affair?.feedback === '公开答复' ? 'public' : 'private'}">${affair?.feedback === '公开答复' ? '公开答复' : '仅本人可见'}</span></div><p>${escapeHtml(String(affair?.draft || '').trim() || '工作人员已完成办理并发送正式回复。')}</p><div class="official-reply-compose"><label for="progress-reply-${escapeHtml(post.id)}">继续追问</label><textarea id="progress-reply-${escapeHtml(post.id)}" placeholder="针对办理答复继续补充问题或说明"></textarea><button type="button" class="primary" onclick="AppPrototype.submitProgressReply('${escapeHtml(post.id)}')">提交追问</button></div></section>` : '';
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeAffairProgress(event)"><section class="ranking-modal affair-progress-modal" role="dialog" aria-modal="true" aria-labelledby="affair-progress-title"><header class="ranking-modal-head"><div><span>${state.workspaceView === 'notices' ? '消息中心 · 官方回复' : '个人发言 · 进度详情'}</span><h2 id="affair-progress-title">${escapeHtml(post.title)}</h2><p>${escapeHtml(meta)}</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeAffairProgress()">${icon('x')}</button></header><div class="affair-progress-body"><section class="progress-post-detail"><span class="progress-section-label">发帖信息</span><div class="progress-post-meta"><b>${escapeHtml(post.board)}</b><span>${escapeHtml(post.author || state.session?.name || '职工')} · ${escapeHtml(post.time || '')}</span></div><h3>${escapeHtml(post.title)}</h3>${post.subtitle ? `<h4>${escapeHtml(post.subtitle)}</h4>` : ''}<p>${escapeHtml(post.body || post.excerpt || '')}</p>${post.media ? `<div class="progress-post-media">${icon('image')} <span>包含关联图片：${escapeHtml(post.media.alt || '帖子图片')}</span></div>` : ''}</section><section class="progress-flow-detail"><div class="progress-status-block"><div class="progress-status-block-head"><div><span class="progress-status-caption">当前发布结果</span><strong class="progress-status ${publicationTone}" title="帖子已通过审核，对外公开展示">${publicationLabel}</strong></div></div><h3 class="progress-log-title">操作记录</h3><div class="progress-operation-log">${publicationLog || '<p class="progress-log-empty">暂无操作记录</p>'}</div></div></section></div><footer class="ranking-modal-foot">${progress.canResubmit ? `<button type="button" class="personal-progress-edit" onclick="AppPrototype.editRejectedPost('${escapeHtml(post.id)}')">修改后重新提交</button>` : ''}<button type="button" class="personal-progress-close" onclick="AppPrototype.closeAffairProgress()">关闭</button></footer></section></div>`;
}
/* 进度弹窗的答复区覆盖实现：官方回复与追问放在同一上下文中。 */
function renderAffairProgressModal() {
  if (state.personalProgressId === null) return '';
  const data = PrototypeData.read();
  const post = ownedStaffPosts(data).find((item) => String(item.id) === String(state.personalProgressId));
  if (!post) return '';
  const progress = staffPostProgress(post, data);
  const affair = progress.affair || {};
  const reply = String(affair.draft || '').trim() || '工作人员已完成办理并发送正式回复。';
  if (progress.label !== '已回复') return renderOriginalAffairProgressModal();
  const messages = PrivateChat.items(state.session.id).find((t) => t.postId === String(post.id))?.messages || [];
  const published = post.publishStatus ? post.publishStatus === '已发布' : PrototypeData.isPublicPost(post);
return `<div class="ranking-backdrop" onclick="AppPrototype.closeAffairProgress(event)"><section class="ranking-modal affair-progress-modal" role="dialog" aria-modal="true"><header class="ranking-modal-head"><div><span>消息中心 · 官方回复</span><h2>${escapeHtml(post.title)}</h2><p>${escapeHtml(affair.id || '')} · ${escapeHtml(affair.category || post.board || '')}</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeAffairProgress()">${icon('x')}</button></header><div class="affair-progress-body"><section class="progress-post-detail"><span class="progress-section-label">发帖信息</span><h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.body || post.excerpt || '')}</p><div class="progress-status-block"><h3 class="progress-log-title">发布状态</h3><strong class="progress-status ${published ? 'done' : ''}">${published ? '已发布' : '未发布'}</strong></div></section><section class="progress-flow-detail"><section class="official-reply-block"><div class="official-reply-block-head"><span class="progress-section-label">官方回复</span></div><div class="official-reply-history">${[{ role: 'admin', text: reply, at: affair.repliedAt || '' }, ...messages].map((m) => `<article data-message-id="${escapeHtml(m.id || 'official-reply')}"><small>${m.role === 'staff' ? '我' : '管理人员'}${m.at ? ` · ${escapeHtml(m.at)}` : ''}</small><p>${escapeHtml(m.text)}</p>${PrivateChat.quoteHtml(m.quote)}<button type="button" class="official-reply-expand" data-sender="${m.role === 'staff' ? '我' : '管理人员'}" aria-expanded="false" onclick="AppPrototype.expandMessageReply(this)">回复</button></article>`).join('')}</div><div class="official-reply-compose message-inline-compose" hidden><textarea id="progress-reply-${escapeHtml(post.id)}" maxlength="2000" placeholder="请输入回复内容"></textarea><div class="message-inline-actions"><button type="button" onclick="AppPrototype.cancelMessageReply(this)">取消</button><button type="button" class="primary" onclick="AppPrototype.submitProgressReply('${escapeHtml(post.id)}')">发布</button></div></div></section></section></div><footer class="ranking-modal-foot"><button type="button" class="personal-progress-close" onclick="AppPrototype.closeAffairProgress()">关闭</button></footer></section></div>`;
}
function renderProgressListModal() {
  if (!state.progressListOpen) return '';
  const data = PrototypeData.read();
  const posts = ownedStaffPosts(data);
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeProgressList(event)"><section class="ranking-modal progress-list-modal" role="dialog" aria-modal="true" aria-labelledby="progress-list-title"><header class="ranking-modal-head"><div><span>个人中心</span><h2 id="progress-list-title">我的发言</h2><p>查看本人发言的处理和回复状态</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeProgressList()">${icon('x')}</button></header><div class="progress-modal-list">${posts.map((post) => { const progress = staffPostProgress(post, data); return `<button type="button" onclick="AppPrototype.openPostProgress('${escapeHtml(post.id)}')"><span><b>${escapeHtml(post.board)}</b><strong>${escapeHtml(post.title)}</strong><small>${escapeHtml(progress.detail)}</small></span><em class="progress-status ${progress.tone}">${escapeHtml(staffListStatusLabel(post, progress))}</em>${icon('chevron-right')}</button>`; }).join('') || '<p class="progress-empty">暂无发言进度</p>'}</div><footer class="ranking-modal-foot">共 ${posts.length} 条</footer></section></div>`;
}
function unifiedNoticeItems() {
  const business = businessNotificationItems().map((item) => ({ ...item, kind: 'business', type: '业务通知' }));
  const replies = officialReplyItems().filter((item) => !business.some((row) => String(row.postId) === String(item.postId))).map((item) => ({ id: item.postId, postId: item.postId, title: '发言已收到办理答复', content: item.summary, detail: item.at, read: item.read, kind: 'reply', type: '业务通知' }));
  const notices = sortedHomeNotices().map((item) => ({ id: item.id, title: item.title, content: item.summary, detail: item.meta, read: Boolean(state.noticeRead[item.id]), kind: 'notice', type: '通知公告' }));
  return [...business, ...replies, ...notices];
}
function renderNoticePage() {
  return `<div class="knowledge-page"><div class="message-center"><header class="staff-notice-toolbar message-center-toolbar">${renderMessageTabs()}</header>${renderMessageTabBody()}</div></div>`;
}
function renderMessageTabBody() {
  const active = activeMessageTab();
  if (active === '官方回复') return renderOfficialReplyMessages();
  if (active === '业务通知') return renderBusinessNotifications();
  return renderPolicyNotices();
}
function renderPersonalPosts(posts) {
  if (!posts.length) return '<p class="personal-empty">当前分类暂无发言。</p>';
  return posts.map((post) => {
    const progress = staffPostProgress(post);
    const badge = `<em class="personal-publication progress-status ${progress.tone}">${escapeHtml(staffListStatusLabel(post, progress))}</em>`;
    return renderPortalPost(post, null, { ownerProgress: progress }).replace('</div><h3>', `${badge}</div><h3>`);
  }).join('');
}
const renderPersonalComments = renderPersonalPosts;
function renderInteractionDetail() {
  const item = state.interactionDetail === null ? null : personalInteractions[state.interactionDetail];
  if (!item) return '';
  const detail = item.type === '评论'
    ? `<div class="interaction-detail-block"><span>评论内容</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.content)}</p><small>${escapeHtml(item.detail)}</small></div>`
    : item.type === '点赞'
      ? `<div class="interaction-detail-block"><span>点赞内容</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.content)}</p><small>${escapeHtml(item.detail)}</small></div>`
      : item.type === '收藏'
        ? `<div class="interaction-detail-block"><span>收藏内容</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.content)}</p><small>${escapeHtml(item.detail)}</small></div>`
        : `<div class="interaction-detail-block"><span>举报内容</span><strong>${escapeHtml(item.title)}</strong><p>举报原因：${escapeHtml(item.content)}</p><div class="interaction-status-row"><b>处理中</b><small>${escapeHtml(item.detail)}</small></div></div>`;
  const sourcePost = portalPosts.find((post) => post.title === item.title);
  const sourceContent = sourcePost ? `<div class="interaction-source-block"><span>关联原帖</span><strong>${escapeHtml(sourcePost.title)}</strong><small>${escapeHtml(sourcePost.board)} · ${escapeHtml(sourcePost.author)} · ${escapeHtml(sourcePost.time)}</small><p>${escapeHtml(sourcePost.excerpt)}</p></div>` : '';
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeInteractionDetail(event)"><section class="ranking-modal interaction-detail-modal" role="dialog" aria-modal="true" aria-labelledby="interaction-detail-title"><header class="ranking-modal-head"><div><span>${state.workspaceView === 'notices' ? '消息中心 · 互动' : '个人中心 · 互动'}</span><h2 id="interaction-detail-title">${item.type}记录</h2><p>查看这条互动的具体内容和处理状态</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeInteractionDetail()">${icon('x')}</button></header><div class="interaction-detail-body">${detail}${sourceContent}</div><footer class="ranking-modal-foot"><button type="button" class="primary" onclick="AppPrototype.closeInteractionDetail()">关闭</button></footer></section></div>`;
}
function renderPersonalFavoriteDetail() {
  const item = state.personalFavoriteIndex === null ? null : personalFavorites[state.personalFavoriteIndex];
  if (!item) return '';
  const post = portalPosts.find((candidate) => candidate.title === item.title);
  return `<div class="ranking-backdrop" onclick="AppPrototype.closePersonalFavorite(event)"><section class="ranking-modal interaction-detail-modal" role="dialog" aria-modal="true" aria-labelledby="favorite-detail-title"><header class="ranking-modal-head"><div><span>${escapeHtml(item.category)} · 收藏内容</span><h2 id="favorite-detail-title">${escapeHtml(item.title)}</h2><p>${escapeHtml(item.detail)}</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closePersonalFavorite()">${icon('x')}</button></header><div class="interaction-detail-body"><div class="interaction-detail-block"><span>原帖摘要</span><p>${escapeHtml(post?.excerpt || item.excerpt)}</p><small>${post ? `${post.likes} 次点赞 · ${post.comments} 条评论` : '已收藏 · 可继续查看内容'}</small></div><div class="favorite-detail-status">${icon('star')} 已收藏</div></div><footer class="post-compose-actions"><button type="button" class="primary" onclick="AppPrototype.closePersonalFavorite()">关闭</button></footer></section></div>`;
}
function renderPersonalCenter() {
  const user = state.session;
  const tabs = [['posts', '我的发言', 'file-text'], ['favorites', '收藏', 'star'], ['interactions', '互动', 'heart']];
  const categories = ['全部', ...new Set(PrototypeData.postingBoards().map((board) => board.name).filter((name) => name !== '回音壁'))];
  const activeCategory = categories.includes(state.personalPostCategory) ? state.personalPostCategory : categories[0];
  const allMyPosts = ownedStaffPosts();
  const myComments = activeCategory === '全部' ? allMyPosts : allMyPosts.filter((post) => post.board === activeCategory);
  const progressItems = allMyPosts.map((post) => staffPostProgress(post));
  const processingCount = progressItems.filter((item) => ['待审核', '待处理', '处理中'].includes(item.label)).length;
  const repliedCount = progressItems.filter((item) => item.label === '已回复').length;
  const interactionCategories = ['评论', '点赞', '举报'];
  const interactionItems = personalInteractions.filter((item) => item.type === state.personalInteractionCategory);
  const interactionFilter = `<div class="personal-filter-bar">${interactionCategories.map((category) => `<button type="button" class="${state.personalInteractionCategory === category ? 'active' : ''}" onclick="AppPrototype.setPersonalInteractionCategory('${category}')">${category}</button>`).join('')}</div>`;
  const tabBody = state.personalTab === 'posts' ? `<div class="personal-filter-bar">${categories.map((category) => `<button type="button" class="${activeCategory === category ? 'active' : ''}" onclick="AppPrototype.setPersonalPostCategory('${category}')">${category}</button>`).join('')}</div><div class="personal-list">${renderPersonalDrafts(activeCategory)}${renderPersonalComments(myComments)}</div>` : state.personalTab === 'favorites' ? `<div class="personal-list">${portalPosts.filter((post) => state.postActions[post.id]?.favorited && PrototypeData.isPublicPost(post)).map((post) => renderPortalPost(post)).join('') || '<p class="personal-empty">暂无收藏</p>'}</div>` : `${interactionFilter}<div class="personal-list">${interactionItems.map((item, index) => `<article class="personal-interaction-row"><div class="personal-interaction-icon">${icon(item.icon)}</div><div class="personal-row-main"><div class="personal-row-meta"><span>${item.type}</span><small>${item.detail}</small></div><h3>${item.title}</h3></div><button type="button" class="personal-row-action" onclick="AppPrototype.openInteractionDetail(${personalInteractions.indexOf(item)})">查看记录 ${icon('arrow-right')}</button></article>`).join('')}</div>`;
  return `<div class="personal-page"><div class="page-head portal-head"><div><div class="page-kicker">职工服务</div><h1>个人中心</h1><p>管理个人资料，查看发言与互动记录</p></div><span class="date">2026 年 09 月 10 日 · 星期四</span></div><section class="personal-profile"><div class="personal-identity"><div class="personal-avatar">${staffProfile().avatar ? `<img src="${escapeHtml(staffProfile().avatar)}" alt="头像" width="64" height="64">` : escapeHtml(user.name.slice(0, 1))}</div><div><h2>${escapeHtml(user.name)}</h2><p>${escapeHtml(user.department)}　·　账号已审核</p><span>${escapeHtml(user.phone.slice(0, 3) + '****' + user.phone.slice(-4))}</span></div></div><div class="staff-profile-actions"><button type="button" class="personal-profile-action" onclick="AppPrototype.openPersonalEdit()">编辑资料 ${icon('pencil-line')}</button><button type="button" class="personal-profile-action" onclick="AppPrototype.openPasswordChange()">修改密码 ${icon('lock')}</button></div></section><section class="personal-panel"><nav class="personal-tabs" aria-label="个人中心分类">${tabs.map(([id, label, iconName]) => `<button type="button" class="${state.personalTab === id ? 'active' : ''}" onclick="AppPrototype.setPersonalTab('${id}')">${icon(iconName)}<span>${label}</span></button>`).join('')}</nav><div class="personal-tab-body">${tabBody}</div></section>${renderInteractionDetail()}${renderPersonalFavoriteDetail()}</div>`;
}
function staffProfile() {
  try { return JSON.parse(localStorage.getItem('prototype-staff-profile-' + state.session.id) || '{}'); } catch (_) { return {}; }
}
function renderPersonalEditModal() {
  if (!state.personalEditOpen) return '';
  const user = state.session, profile = staffProfile();
  return `<div class="ranking-backdrop" onclick="AppPrototype.closePersonalEdit(event)"><section class="ranking-modal personal-edit-modal" role="dialog" aria-modal="true" aria-labelledby="personal-edit-title"><header class="ranking-modal-head"><h2 id="personal-edit-title">编辑资料</h2><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closePersonalEdit()">${icon('x')}</button></header><form onsubmit="event.preventDefault();AppPrototype.saveStaffProfile()"><div class="personal-edit-fields staff-profile-form"><label>头像<div id="profile-avatar-preview">${profile.avatar ? `<img src="${escapeHtml(profile.avatar)}" alt="头像" width="64" height="64">` : icon('user-round')}</div><input type="file" id="staff-avatar-file" accept="image/png,image/jpeg,image/webp" onchange="AppPrototype.previewStaffAvatar(this)"></label><label>姓名<input value="${escapeHtml(user.name)}" disabled></label><label>昵称 *<input id="staff-profile-nickname" value="${escapeHtml(profile.nickname || user.name)}" minlength="2" maxlength="20" placeholder="2 至 20 个字符" required></label><fieldset><legend>性别 *</legend>${['男', '女'].map((gender) => `<label><input type="radio" name="staff-profile-gender" value="${gender}" ${(profile.gender || '男') === gender ? 'checked' : ''}> ${gender}</label>`).join('')}</fieldset><fieldset><legend>默认发言身份 *</legend>${[['real', '实名'], ['anonymous', '匿名']].map(([value, label]) => `<label><input type="radio" name="staff-profile-identity" value="${value}" ${(profile.publicationMode || 'real') === value ? 'checked' : ''}> ${label}</label>`).join('')}<small>发帖、评论时将默认选中该项，仍可临时切换</small></fieldset><label>所属部门<input value="${escapeHtml(user.department)}" disabled></label><label>联系电话<input value="${escapeHtml(user.phone)}" disabled></label></div><footer class="post-compose-actions"><button type="button" onclick="AppPrototype.closePersonalEdit()">取消</button><button type="submit" class="primary">保存资料</button></footer></form></section></div>`;
}
function renderPasswordChangeModal() {
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeAccountCenter(event)"><section class="ranking-modal personal-edit-modal" role="dialog" aria-modal="true" aria-label="修改密码"><header class="ranking-modal-head"><h2>修改密码</h2><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeAccountCenter()">${icon('x')}</button></header><form class="staff-profile-form" onsubmit="event.preventDefault();AppPrototype.changeAccountPassword()"><label>旧密码 *<input id="account-old-password" type="password" autocomplete="current-password" placeholder="请输入当前登录密码" required></label><label>新密码 *<input id="account-new-password" type="password" autocomplete="new-password" minlength="8" maxlength="32" placeholder="密码长度为 8 至 32 位" required></label><label>确认新密码 *<input id="account-confirm-password" type="password" autocomplete="new-password" placeholder="请再次输入新密码" required></label><footer class="post-compose-actions"><button type="button" onclick="AppPrototype.closeAccountCenter()">取消</button><button type="submit" class="primary">确认修改</button></footer></form></section></div>`;
}
function renderPolicyDetailBody(item) {
  if (item.type === '常见问答') {
    return `<section class="knowledge-detail-section"><h3>标准答复</h3><p>${item.answer}</p></section>`;
  }
  if (item.type === '整改公开') {
    return `<section class="knowledge-detail-grid"><div><span>办理结果</span><p>${item.result}</p></div><div><span>整改措施</span><p>${item.measure}</p></div><div><span>公开进展</span><strong class="knowledge-progress">${item.progress}</strong></div></section>`;
  }
  return `<section class="knowledge-detail-section"><h3>内容说明</h3><p>${item.content}</p></section><section class="knowledge-attachment"><div>${icon('paperclip')}<div><span>关联附件</span><strong>${item.attachment}</strong></div></div><button type="button" onclick="AppPrototype.notify()">查看附件</button></section>`;
}
function renderPolicyDetailModal() {
  if (!state.policyDetailId) return '';
  const item = getPolicyDetail(state.policyDetailId);
  if (!item) return '';
  return `<div class="ranking-backdrop" onclick="AppPrototype.closePolicyDetail(event)"><section class="ranking-modal knowledge-modal" role="dialog" aria-modal="true" aria-labelledby="knowledge-modal-title"><header class="ranking-modal-head"><div><span>${item.type}</span><h2 id="knowledge-modal-title">${item.title}</h2><p>${item.category} · ${item.department} · 发布于 ${policyDateLabel(item.date)}</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closePolicyDetail()">${icon('x')}</button></header><div class="knowledge-modal-body"><p class="knowledge-summary">${item.summary}</p>${renderPolicyDetailBody(item)}</div></section></div>`;
}
function renderBannerDetailModal() {
  const item = state.bannerDetail;
  if (!item) return '';
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeBannerDetail(event)"><section class="ranking-modal knowledge-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.title)}"><header class="ranking-modal-head"><div><span>${escapeHtml(item.label)}</span><h2>${escapeHtml(item.title)}</h2></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeBannerDetail()">${icon('x')}</button></header><div class="knowledge-modal-body"><p class="knowledge-summary">${escapeHtml(item.summary || '')}</p><section class="knowledge-detail-section"><h3>内容说明</h3><p>${escapeHtml(item.body || '')}</p></section></div></section></div>`;
}
function renderRankingModal() {
  if (!state.rankModal) return '';
  const type = state.rankModal;
  const config = rankFormula[type];
  const items = getRankingItems(type);
  return `<div class="ranking-backdrop" onclick="AppPrototype.closeRanking(event)"><section class="ranking-modal" role="dialog" aria-modal="true" aria-labelledby="ranking-modal-title"><header class="ranking-modal-head"><div><span>完整榜单</span><h2 id="ranking-modal-title">${config.title}</h2><p>${config.formula}，按综合分由高到低排列</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeRanking()">${icon('x')}</button></header><div class="ranking-modal-list">${items.map((item, index) => renderRankingRow(item, type, index, true)).join('')}</div><footer class="ranking-modal-foot">共 ${items.length} 条 · 综合分降序</footer></section></div>`;
}

function getRankingDetailPost() {
  if (!state.rankingDetail) return null;
  const { type, itemId } = state.rankingDetail;
  const items = getRankingItems(type);
  const index = items.findIndex((item) => String(item.id) === String(itemId));
  return index < 0 ? null : rankingItemToPost(items[index], type, index);
}

function renderRankingDetailModal() {
  const post = getRankingDetailPost();
  if (!post) return '';
  const config = rankFormula[state.rankingDetail.type];
  return `<div class="ranking-backdrop ranking-detail-backdrop" onclick="AppPrototype.closeRankingDetail(event)"><section class="ranking-modal ranking-post-modal" role="dialog" aria-modal="true" aria-labelledby="ranking-post-title"><header class="ranking-modal-head"><div><span>${config.title} · 帖子详情</span><h2 id="ranking-post-title">${escapeHtml(post.title)}</h2><p>${escapeHtml(post.board)} · ${escapeHtml(post.author)} · ${escapeHtml(post.time)}</p></div><button type="button" class="ranking-close" title="关闭" onclick="AppPrototype.closeRankingDetail()">${icon('x')}</button></header><div class="ranking-post-body">${renderPortalPost(post)}</div><footer class="ranking-modal-foot"><button type="button" class="personal-progress-close" onclick="AppPrototype.closeRankingDetail()">关闭</button></footer></section></div>`;
}
function getPostFullContent(post) {
  if (Array.isArray(post.content)) return post.content;
  const boardContext = {
    '建言献策': '建议将结合业务实际进一步细化实施步骤、责任分工和预期成效，便于相关单位研究采纳。',
    '心声诉求': '相关情况已按诉求类型进行梳理，将重点核对影响范围和办理条件，推动形成可执行的解决方案。',
    '业务交流': '文中做法已按照适用场景、关键步骤和注意事项进行整理，便于不同单位结合自身条件参考使用。',
    '回音壁': '办理过程坚持问题核实、责任落实和结果反馈相衔接，后续还将持续跟踪实际效果。'
  };
  return [
    post.excerpt,
    `围绕“${post.title}”，${boardContext[post.board] || '相关内容将结合实际工作进一步研究，并持续收集各方意见。'}在推进过程中，将重点关注问题是否得到有效回应，同时兼顾制度衔接、执行成本和基层实际承受能力。`,
    `下一步将根据办理和讨论情况动态补充信息，及时公开重要进展；对需要跨单位协同的事项，将明确沟通节点和反馈方式，避免信息重复流转。`
  ];
}
function renderPortalPost(post, sequence = null, options = {}) {
  const postIdArg = JSON.stringify(post.id);
  const actions = state.postActions[post.id] || {};
  const expanded = state.expandedPostId === post.id;
  const commentsEnabled = post.allowComments !== false;
  const commentsOpen = commentsEnabled && state.commentPostId === post.id;
  const reportOpen = state.reportPostId === post.id;
  const likes = post.likes;
  const favorites = post.favorites;
  const fullContent = expanded ? getPostFullContent(post).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') + ((post.mediaList || (post.media ? [post.media] : [])).length ? `<div class="portal-post-media-grid">${(post.mediaList || [post.media]).slice(0, 2).map((media) => `<figure class="portal-post-media"><img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}"><figcaption>${escapeHtml(media.caption || '')}</figcaption></figure>`).join('')}</div>` : '') : '';
  const attachment = expanded && post.attachment ? `<div class="portal-post-attachment">${icon('paperclip')}<span><strong>${escapeHtml(post.attachment.name)}</strong><small>${formatPostFileSize(post.attachment.size)}</small></span><button type="button" onclick="AppPrototype.notify()">查看附件</button></div>` : '';
  const commentAction = commentsEnabled ? `<button type="button" class="${commentsOpen || actions.commented ? 'active' : ''}" onclick="AppPrototype.toggleComments(${postIdArg})">${icon('message-circle')} ${post.comments + (actions.newComment ? 1 : 0)} 条评论</button>` : `<button type="button" class="post-comments-disabled" disabled>${icon('message-circle-off')} 评论已关闭</button>`;
  const ownerActions = options.ownerProgress ? `<div class="personal-post-owner-actions">${options.ownerProgress.canResubmit ? `<button type="button" class="post-resubmit-button" onclick="AppPrototype.editRejectedPost('${escapeHtml(post.id)}')">${icon('pencil-line')} 修改后重新提交</button>` : ''}${renderOwnerMenu(post.id, false)}</div>` : '';
  const reportReasonOptions = reportOpen ? PrototypeData.read().dictionaryEntries.filter((item) => item.typeId === 'dict-report-reason').sort((a, b) => a.sort - b.sort) : [];
  return `<article class="portal-post-card ${sequence ? 'numbered' : ''}">${sequence ? `<b class="post-sequence">${String(sequence).padStart(2, '0')}</b>` : ''}<div class="portal-post-card-head"><span>${escapeHtml(post.board)}</span><i></i><small>${escapeHtml(post.author)} · ${escapeHtml(post.time)}</small></div><h3>${escapeHtml(post.title)}${post.subtitle ? ` - ${escapeHtml(post.subtitle)}` : ''}</h3><p class="${expanded ? 'expanded' : ''}">${escapeHtml(post.excerpt)}</p>${expanded ? `<div class="portal-post-full">${fullContent}</div>${attachment}` : ''}<button type="button" class="read-more" aria-expanded="${expanded}" onclick="AppPrototype.togglePostExpanded(${postIdArg})">${expanded ? '收起全文' : '查看全文'} ${icon(expanded ? 'chevron-up' : 'chevron-down')}</button>${ownerActions}<div class="post-actions"><button type="button" class="${actions.liked ? 'active' : ''}" onclick="AppPrototype.togglePostAction(${postIdArg}, 'liked')">${icon('thumbs-up')} ${actions.liked ? '已赞' : '点赞'} ${likes}</button>${commentAction}<button type="button" class="${actions.favorited ? 'active' : ''}" onclick="AppPrototype.togglePostAction(${postIdArg}, 'favorited')">${icon('star')} ${actions.favorited ? '已收藏' : '收藏'} ${favorites}</button><button type="button" onclick="AppPrototype.sharePost(${postIdArg})">${icon('share-2')} 分享 ${post.shares || 0}</button>${ownedStaffPosts().some((item) => String(item.id) === String(post.id)) ? '' : `<button type="button" class="danger-action ${actions.reported ? 'active' : ''}" onclick="AppPrototype.toggleReport(${postIdArg})">${icon('flag')} 举报</button>`}</div>${commentsOpen ? `<section class="comment-zone"><div class="comment-list">${post.commentList.map((comment, index) => `<article><div><strong>${escapeHtml(comment.author)}</strong><span class="comment-status">${escapeHtml(comment.status)}</span></div><p>${escapeHtml(comment.text)}</p><button type="button" onclick="AppPrototype.replyToComment(${postIdArg}, ${index})">回复</button></article>`).join('')}${actions.newComment ? `<article><div><strong>我</strong><span class="comment-status reviewing">审核中</span></div><p>${escapeHtml(actions.newComment)}</p></article>` : ''}</div><div class="comment-compose"><textarea id="comment-${post.id}" placeholder="${escapeHtml(state.replyTarget ? `回复 @${state.replyTarget}` : '发表评论，提交后将进入审核')}"></textarea><button type="button" onclick="AppPrototype.submitComment(${postIdArg})">发布评论</button></div></section>` : ''}${reportOpen ? `<section class="report-zone"><label for="report-type-${post.id}">举报原因类型</label><select id="report-type-${post.id}"><option value="">请选择举报原因类型</option>${reportReasonOptions.map((item) => `<option value="${escapeHtml(item.label)}">${escapeHtml(item.label)}</option>`).join('')}</select><label for="report-${post.id}">举报说明</label><textarea id="report-${post.id}" placeholder="请具体说明需要核查的问题"></textarea><div><button type="button" class="cancel-report" onclick="AppPrototype.toggleReport(${postIdArg})">取消</button><button type="button" class="submit-report" onclick="AppPrototype.submitReport(${postIdArg})">提交举报</button></div></section>` : ''}</article>`;
}

function sharedPostFor(data, id) {
  let post = data.posts.find((item) => String(item.id) === String(id));
  if (post) return post;
  const detailPost = getRankingDetailPost();
  const portal = portalPosts.find((item) => String(item.id) === String(id)) || (String(detailPost?.id) === String(id) ? detailPost : null);
  if (!portal) return null;
  if (portal.sharedEcho) {
    const publication = (data.echoPublications || []).find((item) => item.status === '已发布' && 6000 + Number(item.sourcePostId || 0) === Number(id));
    post = { id: portal.id, title: portal.title, board: portal.board, author: portal.author, status: '已发布', risk: '低风险', body: portal.content?.join('\n') || publication?.content || portal.excerpt, time: portal.time, engagement: publication?.engagement || PrototypeData.emptyEngagement() };
    data.posts.push(post);
    return post;
  }
  post = { id: portal.id, title: portal.title, board: portal.board, author: portal.author, status: portal.status, risk: '低风险', body: portal.content?.join('\n') || portal.excerpt, time: portal.time, engagement: PrototypeData.emptyEngagement() };
  data.posts.push(post);
  return post;
}
function engagementActor() {
  return { accountId: state.session?.id || 'staff', name: state.session?.name || '职工', department: state.session?.department || '未配置', at: new Date().toLocaleString('zh-CN', { hour12: false }) };
}
function recordDaily(engagement, field, delta = 1) {
  const date = new Date().toLocaleDateString('sv-SE');
  let item = engagement.daily.find((row) => row.date === date);
  if (!item) { item = { date, views: 0, likes: 0, comments: 0, favorites: 0, shares: 0 }; engagement.daily.push(item); }
  item[field] = Math.max(0, Number(item[field] || 0) + delta);
}
function recordPostView(id) {
  const data = PrototypeData.read(), post = sharedPostFor(data, id);
  if (!post) return;
  const engagement = PrototypeData.ensureEngagement(post), accountId = state.session?.id || 'staff';
  engagement.uniqueViewAccounts = Array.isArray(engagement.uniqueViewAccounts) ? engagement.uniqueViewAccounts : [];
  engagement.views += 1;
  if (!engagement.uniqueViewAccounts.includes(accountId)) { engagement.uniqueViewAccounts.push(accountId); engagement.uniqueViews += 1; }
  recordDaily(engagement, 'views');
  PrototypeData.save(data);
}
function renderDashboard() { if (state.session.role === 'staff') return renderStaffPortal(); const data = dashboards[state.session.role]; return `<div class="page-head"><div><div class="page-kicker">${roleMeta[state.session.role][0]}协同</div><h1>${data.title}</h1><p>${data.desc}</p></div><span class="date">2026 年 09 月 10 日 · 星期四</span></div><section class="metric-grid">${data.metrics.map(metricCard).join('')}</section><section class="content-grid"><article class="panel"><div class="panel-header"><h2>${data.listTitle}</h2><button type="button" onclick="AppPrototype.notify()">查看全部 →</button></div>${data.rows.map(([title, detail, status, date]) => `<div class="table-row"><div><strong>${title}</strong><small>${detail}</small></div><span class="status ${statusClass(status)}">${status}</span><span class="row-date">${date}</span></div>`).join('')}</article><aside class="panel summary"><div class="summary-lead"><strong>${data.insight}</strong><p>${data.insightText}</p></div>${data.progress.map(([label, value]) => `<div class="progress-item"><div class="progress-label"><span>${label}</span><b>${value}</b></div><div class="progress-track"><div class="progress-fill" style="width:${value}"></div></div></div>`).join('')}<button class="quick-action" type="button" onclick="AppPrototype.notify()">${data.action}</button></aside></section>`; }
function renderReview() { const pending = accounts.filter((account) => account.status === 'pending'); return `<div class="page-head"><div><div class="page-kicker">平台治理</div><h1>账号审核</h1><p>核验职工注册信息，审核通过后方可登录平台。</p></div><span class="date">待审核 ${pending.length} 条</span></div><div class="review-tabs"><button class="active">待审核（${pending.length}）</button><button onclick="AppPrototype.notify()">已审核记录</button></div><section class="review-panel">${pending.length ? pending.map((account) => `<div class="review-row"><div class="review-name"><strong>${account.name}</strong><span>${account.phone}</span></div><span>${account.department}</span><span>申请时间：${account.submitted}</span><div class="review-action"><button class="small-btn approve" type="button" onclick="AppPrototype.reviewAccount('${account.id}', 'approved')">通过</button><button class="small-btn reject" type="button" onclick="AppPrototype.reviewAccount('${account.id}', 'rejected')">驳回</button></div></div>`).join('') : '<div class="empty">当前没有待审核的注册申请</div>'}</section>`; }
function renderWorkspaceContent() { if (state.session.role === 'staff' && state.workspaceView === 'voices') return renderSupplyVoice(); if (state.session.role === 'staff' && state.workspaceView === 'policy') return renderPolicyPage(); if (state.session.role === 'staff' && state.workspaceView === 'notices') return renderNoticePage(); if (state.session.role === 'staff' && state.workspaceView === 'profile') return renderPersonalCenter(); return state.session.role === 'admin' && state.workspaceView === 'review' ? renderReview() : renderDashboard(); }
function renderAccountCenterModal() {
  if (!state.accountCenterOpen || !state.session) return '';
  const user = state.session, tab = state.accountCenterTab;
  if (tab === 'security') return renderPasswordChangeModal();
  const basic = `<div class="account-basic"><aside><div class="account-avatar">${escapeHtml(user.name.slice(0,1))}</div><h3>${escapeHtml(user.name)}</h3><p>服务基层 · 倾听心声 · 协同办理</p><dl><div><dt>账号</dt><dd>${escapeHtml(user.id)}</dd></div><div><dt>部门</dt><dd>${escapeHtml(user.department)}</dd></div><div><dt>当前角色</dt><dd>${escapeHtml(roleMeta[user.role]?.[0] || '职工')}</dd></div></dl></aside><section><label><span><b>*</b> 昵称</span><input class="input" id="account-center-name" value="${escapeHtml(user.name)}"></label><div class="account-gender"><span><b>*</b> 性别</span>${['男','女','未知'].map((item) => `<label><input type="radio" name="account-center-gender" value="${item}" ${(user.gender || '未知') === item ? 'checked' : ''}><span>${item}</span></label>`).join('')}</div><button class="account-primary" onclick="AppPrototype.saveAccountCenter()">更新信息</button></section></div>`;
  const security = `<form class="account-security" onsubmit="event.preventDefault();AppPrototype.changeAccountPassword()">${[['原密码','account-old-password'],['新密码','account-new-password'],['确认密码','account-confirm-password']].map(([label,id]) => `<label><span><b>*</b> ${label}</span><input class="input" id="${id}" type="password" placeholder="请输入"></label>`).join('')}<button class="account-primary" type="submit">修改密码</button></form>`;
  const devices = `<div class="account-devices"><h3>我的在线设备</h3><div class="account-table-wrap"><table><thead><tr><th>序号</th><th>登录平台</th><th>IP 地址</th><th>登录地址</th><th>浏览器</th><th>系统</th><th>登录时间</th><th>操作</th></tr></thead><tbody><tr><td>1</td><td>PC</td><td>117.152.223.105</td><td>中国湖北省武汉市</td><td>Chrome</td><td>OS X</td><td>2026-09-14 14:26</td><td><button onclick="AppPrototype.notify()">强制下线</button></td></tr></tbody></table></div></div>`;
  return `<div class="account-modal-backdrop" onclick="AppPrototype.closeAccountCenter(event)"><section class="account-modal" role="dialog" aria-modal="true" aria-label="个人中心"><header><h2>个人中心</h2><button onclick="AppPrototype.closeAccountCenter()" title="关闭">${icon('x')}</button></header><nav>${[['basic','基本设置'],['security','安全设置'],['devices','在线设备']].map(([id,label]) => `<button class="${tab === id ? 'active' : ''}" onclick="AppPrototype.setAccountCenterTab('${id}')">${label}</button>`).join('')}</nav><div class="account-modal-body">${tab === 'basic' ? basic : tab === 'security' ? security : devices}</div></section></div>`;
}
function renderWorkspace() { if (state.session.role === 'staff' && state.staffDisplayMode === 'mobile') return renderMobileWorkspace(); return `<div class="workspace role-${state.session.role}">${renderTopbar()}${renderSidebar()}<main class="workspace-main">${renderWorkspaceContent()}</main>${renderRankingModal()}${renderRankingDetailModal()}${renderHotPolicyModal()}${renderPolicyDetailModal()}${renderNoticeDetailModal()}${renderPolicyQuestionModal()}${renderMyPolicyQuestionsModal()}${renderBannerDetailModal()}${state.session.role === 'staff' ? renderPersonalEditModal() + renderAccountCenterModal() + renderProgressListModal() + renderAffairProgressModal() + renderPostComposer() : ''}</div>`; }
function syncPrototypeData() {
  const data = window.PrototypeData?.read();
  if (!data) return;
  for (const shared of data.accounts || []) { let account = accounts.find((a) => a.phone === shared.phone); if (!account) { try { const saved = JSON.parse(sessionStorage.getItem(`prototype-account-${shared.phone}`)); if (saved?.phone === shared.phone) { account = saved; accounts.push(account); } } catch (_) { /* No local demo credentials. */ } } if (account) { account.status = shared.status; account.enabled = shared.enabled !== false; account.name = shared.name; account.department = shared.department; } }
  const managedPostIds = new Set(data.posts.map((source) => String(source.id)));
  for (const post of portalPosts) if (managedPostIds.has(String(post.id))) post.managedUnavailable = true;
  for (const source of data.posts) {
    let post = portalPosts.find((item) => item.id === source.id);
    if (!post) { post = { id: source.id, likes: 0, favorites: 0, comments: 0, commentList: [] }; portalPosts.unshift(post); }
    const engagement = PrototypeData.ensureEngagement(source);
    const publishedComments = data.comments.filter((c) => String(c.postId) === String(source.id) && c.status === '已发布');
    const actorId = state.session?.id;
    state.postActions[source.id] = { ...(state.postActions[source.id] || {}), liked: Boolean(actorId && engagement.likeUsers.some((item) => item.accountId === actorId)), favorited: Boolean(actorId && engagement.favoriteUsers.some((item) => item.accountId === actorId)), commented: Boolean(actorId && data.comments.some((item) => String(item.postId) === String(source.id) && item.authorId === actorId)), reported: Boolean(actorId && data.reports.some((item) => String(item.postId) === String(source.id) && item.reporterId === actorId)) };
    const localComment = state.postActions[source.id].newComment;
    if (localComment && data.comments.some((c) => String(c.postId) === String(source.id) && c.authorId === actorId && c.text === localComment && c.status !== '待审核')) delete state.postActions[source.id].newComment;
    const visibleStatus = ['建言献策', '心声诉求'].includes(source.board) && source.handlingStatus && source.handlingStatus !== '不适用' ? source.handlingStatus : source.status;
    Object.assign(post, { title: source.title, subtitle: source.subtitle || '', contentAuditStatus: source.contentAuditStatus, publishStatus: source.publishStatus, enabled: source.enabled, deleted: source.deleted, board: source.board, author: source.author, authorId: source.authorId || '', processingAccepted: source.processingAccepted === true, status: visibleStatus, reason: source.reason || '', history: source.history || [], time: source.time, excerpt: source.body, content: [source.body], attachment: source.attachment || null, allowComments: source.allowComments !== false, managedUnavailable: source.enabled === false || source.deleted === true, likes: engagement.likes, favorites: engagement.favorites, shares: engagement.shares, comments: engagement.historicComments + publishedComments.length, commentList: publishedComments.map((c) => ({ author: c.author, text: c.text, status: '已通过' })) });
  }
  const echoPublications = (data.echoPublications || []).filter((item) => PrototypeData.isPublicEcho(item, data));
  const publishedIds = new Set(echoPublications.map((item) => 6000 + Number(item.sourcePostId || 0)));
  for (let i = portalPosts.length - 1; i >= 0; i--) if (portalPosts[i].sharedEcho && !publishedIds.has(portalPosts[i].id)) portalPosts.splice(i, 1);
  for (const publication of echoPublications) {
    const id = 6000 + Number(publication.sourcePostId || 0);
    const affair = data.affairs.find((item) => item.id === publication.affairId);
    let reply = portalPosts.find((p) => p.id === id);
    if (!reply) { reply = { id, sharedEcho: true, likes: 0, favorites: 0, comments: 0, commentList: [] }; portalPosts.unshift(reply); }
    const engagement = PrototypeData.ensureEngagement(publication);
    const publishedComments = data.comments.filter((item) => String(item.postId) === String(id) && item.status === '已发布');
    const actorId = state.session?.id;
    state.postActions[id] = { ...(state.postActions[id] || {}), liked: Boolean(actorId && engagement.likeUsers.some((item) => item.accountId === actorId)), favorited: Boolean(actorId && engagement.favoriteUsers.some((item) => item.accountId === actorId)), commented: Boolean(actorId && data.comments.some((item) => String(item.postId) === String(id) && item.authorId === actorId)), reported: Boolean(actorId && data.reports.some((item) => String(item.postId) === String(id) && item.reporterId === actorId)) };
    Object.assign(reply, { board: '回音壁', author: '平台管理组', title: publication.title, excerpt: publication.body, content: [publication.body], status: '已回复', time: publication.publishedAt || '最新反馈', likes: engagement.likes, favorites: engagement.favorites, shares: engagement.shares, comments: engagement.historicComments + publishedComments.length, commentList: publishedComments.map((item) => ({ author: item.author, text: item.text, status: '已通过' })) });
  }
  personalAffairs.splice(0, personalAffairs.length, ...data.affairs.map((a) => ({ id: a.id, title: a.title, category: portalPosts.find((post) => post.id === a.postId)?.board || a.sourceType || '事项', status: a.status, events: a.events || [], update: `${a.category || '待分类'} · ${a.isKey ? '重点事项' : a.isCommon ? '共性事项' : '一般事项'}`, step: a.status === '已回复' ? a.draft : a.status === '处理中' ? '事项正在研究并整理回复' : '等待管理人员分类处理' })));
  const sharedNoticeIds = new Set(data.notices.map((n) => n.id));
  for (let i = homeNotices.length - 1; i >= 0; i--) if (sharedNoticeIds.has(homeNotices[i].id)) homeNotices.splice(i, 1);
  for (const notice of data.notices.filter((n) => n.status === '已发布')) { const noticeDate = replyDateLabel(notice.publishedAt || notice.createdAt || notice.submittedAt); homeNotices.unshift({ id: notice.id, channel: '其他', category: '其他', icon: 'megaphone', title: notice.title, summary: notice.body, body: notice.body, attachment: notice.attachment || null, meta: `${notice.scope} · ${noticeDate === REPLY_DATE_FALLBACK ? '最新公告' : noticeDate}`, publishedAt: notice.publishedAt || notice.createdAt || notice.submittedAt }); }
  for (const type of ['policy', 'faq', 'rectification']) for (let i = policyContent[type].length - 1; i >= 0; i--) if (policyContent[type][i].sharedPublication) policyContent[type].splice(i, 1);
  const managedPolicyTitles = new Set((data.policies || []).map((item) => item.title));
  const managedQuestionTitles = new Set((data.questions || []).filter((item) => item.status === '已发布' && item.answer).map((item) => item.title));
  const managedRectificationTitles = new Set((data.rectificationPublications || []).map((item) => item.title));
  for (let i = policyContent.policy.length - 1; i >= 0; i--) if (managedPolicyTitles.has(policyContent.policy[i].title)) policyContent.policy.splice(i, 1);
  for (let i = policyContent.faq.length - 1; i >= 0; i--) if (managedQuestionTitles.has(policyContent.faq[i].title)) policyContent.faq.splice(i, 1);
  for (let i = policyContent.rectification.length - 1; i >= 0; i--) if (managedRectificationTitles.has(policyContent.rectification[i].title)) policyContent.rectification.splice(i, 1);
  for (const policy of (data.policies || []).filter((item) => item.status === '已发布')) policyContent.policy.unshift({ id: `shared-${policy.id}`, sharedPublication: true, type: '政策文件', title: policy.title, category: policy.category, department: policy.department, date: policy.publishedAt, summary: policy.summary, content: policy.body, attachment: policy.attachment || '', hotPinned: policy.hotPinned === true, hotOrder: Number.isFinite(policy.hotOrder) ? policy.hotOrder : null });
  for (const question of (data.questions || []).filter((item) => item.status === '已发布' && item.answer)) policyContent.faq.unshift({ id: `shared-${question.id}`, sharedPublication: true, type: '常见问答', title: question.title, category: question.category, department: question.department, date: question.answeredAt || question.submittedAt, summary: question.answer, answer: question.answer, hotPinned: question.hotPinned === true, hotOrder: Number.isFinite(question.hotOrder) ? question.hotOrder : null });
  for (const item of (data.rectificationPublications || []).filter((entry) => entry.status === '已发布')) policyContent.rectification.unshift({ id: `shared-${item.id}`, sharedPublication: true, type: '整改公开', title: item.title, category: item.category, department: item.department, date: item.publishedAt, summary: item.summary, result: item.result, measure: item.measure, progress: item.progress });
}
function render() { const affairScrollTop = document.querySelector('.affair-review-list')?.scrollTop || 0; syncPrototypeData(); byId('app').innerHTML = state.view === 'workspace' && state.session ? renderWorkspace() : renderAuth(); const affairList = document.querySelector('.affair-review-list'); if (affairList) affairList.scrollTop = affairScrollTop; const mobileStaffView = state.view === 'workspace' && state.session?.role === 'staff' && state.staffDisplayMode === 'mobile'; const knowledgeView = !mobileStaffView && state.view === 'workspace' && state.session?.role === 'staff' && ['policy', 'notices'].includes(state.workspaceView); const personalView = !mobileStaffView && state.view === 'workspace' && state.session?.role === 'staff' && state.workspaceView === 'profile'; const desktopRouteModalOpen = !mobileStaffView && Boolean(state.hotPolicyOpen || state.policyDetailId || state.noticeDetailId || state.policyQuestionOpen || state.myPolicyQuestionsOpen || state.personalProgressId !== null); const postComposerModalOpen = state.postComposerOpen && !mobileStaffView; const modalOpen = Boolean(state.accountCenterOpen || state.rankModal || state.rankingDetail || state.bannerDetail || postComposerModalOpen || state.personalEditOpen || state.progressListOpen || state.personalFavoriteIndex !== null || state.interactionDetail !== null || desktopRouteModalOpen); document.documentElement.classList.toggle('mobile-staff-view', mobileStaffView); document.documentElement.classList.toggle('knowledge-view', knowledgeView); document.documentElement.classList.toggle('personal-view', personalView); document.body.classList.toggle('modal-open', modalOpen); window.lucide?.createIcons?.(); }
let noticeCarouselTimer;
function startNoticeCarousel() {
  clearInterval(noticeCarouselTimer);
  noticeCarouselTimer = setInterval(() => {
    if (state.view !== 'workspace' || state.session?.role !== 'staff' || state.workspaceView !== 'dashboard' || state.postComposerOpen) return;
    const count = sortedHomeNotices().length;
    if (count <= 5) return;
    setState({ noticeCarouselIndex: (state.noticeCarouselIndex + 1) % count });
  }, 5000);
}

window.AppPrototype = {
  setView(view) { setState({ view, error: '', notice: '' }); },
  setLoginPortal(loginPortal) { setState({ loginPortal: loginPortal === 'management' ? 'management' : 'staff', loginMode: 'password', error: '', notice: '' }); },
  setLoginMode(loginMode) { setState({ loginMode, error: '', notice: '' }); },
  sendSms,
  submitLogin,
  submitRegistration,
  submitReset,
  queryApproval,
  setPortalTab(portalTab) { setState({ portalTab }); },
  setHomeContentTab(homeContentTab) { setState({ homeContentTab, expandedPostId: null, commentPostId: null, reportPostId: null }); },
  setPolicyTab(policyTab) { setState({ policyTab, policyDetailId: null }); },
  acknowledgeNotice(kind, id) {
    if (kind === 'notice') return this.readNotice(id);
    if (kind === 'reply') { state.replyRead[id] = true; saveMessageReadState(); render(); return; }
    const data = PrototypeData.read();
    const item = (data.staffNotifications || []).find((row) => String(row.id) === String(id) && String(row.authorId) === String(state.session.id));
    if (item) { item.readAt = new Date().toISOString(); PrototypeData.save(data); render(); }
  },
  markUnifiedNoticesRead() {
    state.noticeRead = Object.fromEntries(homeNotices.map((item) => [item.id, true]));
    officialReplyItems().forEach((item) => { state.replyRead[item.postId] = true; });
    const data = PrototypeData.read();
    (data.staffNotifications || []).filter((item) => String(item.authorId) === String(state.session.id)).forEach((item) => { item.readAt = item.readAt || new Date().toISOString(); });
    saveMessageReadState(); PrototypeData.save(data); render(); showToast('已全部标记为已读');
  },
  openUnifiedNotice(kind, id, postId) {
    this.acknowledgeNotice(kind, id);
    if (kind === 'notice') return this.openNotice(id);
    if (postId) return this.openPostProgress(postId);
    showToast('暂无关联发言');
  },
  setNoticeTab(noticeTab) { setState({ noticeTab }); },
  setMessageTab(messageTab) { setState({ messageTab, noticeDetailId: null, interactionDetail: null }); },
  readInteraction(index) { if (personalInteractions[index] === undefined) return; setState({ interactionDetail: index, interactionRead: { ...state.interactionRead, [index]: true } }); saveMessageReadState(); },
  markAllInteractionsRead() { if (!interactionUnreadCount()) return showToast('互动消息已全部读完。'); setState({ interactionRead: Object.fromEntries(personalInteractions.map((_, index) => [index, true])) }); saveMessageReadState(); showToast('已将全部互动消息标记为已读。'); },
  readReply(postId) {
    const key = String(postId);
    if (!officialReplyItems().some((item) => item.postId === key)) return showToast('未找到对应的官方回复。');
    const data = PrototypeData.read();
    let changed = false;
    for (const notification of data.staffNotifications || []) {
      if (String(notification.postId) === key && notification.authorId === (state.session?.id || 'staff') && !notification.readAt) { notification.readAt = new Date().toLocaleString('zh-CN'); changed = true; }
    }
    if (changed) PrototypeData.save(data);
    setState({ replyRead: { ...state.replyRead, [key]: true }, progressListOpen: false });
    saveMessageReadState();
    this.openPostProgress(key);
  },
  markAllRepliesRead() {
    const items = officialReplyItems();
    if (!items.some((item) => item.unread)) return showToast('官方回复已全部读完。');
    const data = PrototypeData.read();
    const next = { ...state.replyRead };
    let changed = false;
    for (const item of items) {
      next[item.postId] = true;
      for (const notification of data.staffNotifications || []) {
        if (String(notification.postId) === item.postId && notification.authorId === (state.session?.id || 'staff') && !notification.readAt) { notification.readAt = new Date().toLocaleString('zh-CN'); changed = true; }
      }
    }
    if (changed) PrototypeData.save(data);
    setState({ replyRead: next });
    saveMessageReadState();
    showToast('已将全部官方回复标记为已读。');
  },
  showHomeNotice(id) { const notice = homeNotices.find((item) => String(item.id) === String(id)); if (!notice) return; setState({ noticeRead: { ...state.noticeRead, [id]: true }, noticeDetailId: id }); saveMessageReadState(); },
  openProgressList() { setState({ progressListOpen: true, personalProgressId: null }); },
  closeProgressList(event) { if (event && event.target !== event.currentTarget) return; setState({ progressListOpen: false }); },
  openPrivateChat(postId) { PrivateChat.open(postId, 'staff', state.session.id, state.session.name); },
  submitProgressReply(postId) {
    const text = document.getElementById(`progress-reply-${postId}`)?.value.trim();
    if (!text) return showToast('请输入回复内容');
    const quote = document.getElementById(`progress-reply-${postId}`)?.closest('.official-reply-compose').replyQuote || null;
    if (!PrivateChat.reply(postId, state.session.id, text, quote)) return showToast('回复未发送，请检查内容或发帖权限');
    render();
    showToast('回复已发送');
  },
  expandMessageReply(button) {
    const block = button.closest('.official-reply-block');
    const compose = block.querySelector('.official-reply-compose');
    const article = button.closest('article');
    compose.replyQuote = { messageId: article.dataset.messageId || 'official-reply', sender: button.dataset.sender, text: article.querySelector('p').textContent };
    compose.querySelector('.message-reply-quote')?.remove();
    compose.insertAdjacentHTML('afterbegin', PrivateChat.quoteHtml(compose.replyQuote));
    block.querySelectorAll('.official-reply-expand').forEach((item) => item.setAttribute('aria-expanded', 'false'));
    button.closest('article').append(compose);
    compose.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    const input = compose.querySelector('textarea');
    input.placeholder = `回复 @${button.dataset.sender}`;
    input.focus();
    compose.scrollIntoView({ block: 'nearest' });
  },
  cancelMessageReply(button) {
    const block = button.closest('.official-reply-block');
    block.querySelector('.official-reply-compose').hidden = true;
    block.querySelector('.official-reply-compose').replyQuote = null;
    block.querySelectorAll('.official-reply-expand').forEach((item) => item.setAttribute('aria-expanded', 'false'));
  },
  openPostProgress(personalProgressId) {
    const data = PrototypeData.read();
    const post = ownedStaffPosts(data).find((item) => String(item.id) === String(personalProgressId));
    if (!post) return showToast('仅本人可查看办理进度');
    const { key, seen } = staffProgressSeen(data, ownedStaffPosts(data));
    seen[post.id] = progressSignature(staffPostProgress(post, data));
    localStorage.setItem(key, JSON.stringify(seen));
    let changed = false;
    for (const notification of data.staffNotifications || []) {
      if (String(notification.postId) === String(personalProgressId) && notification.authorId === (state.session?.id || 'staff') && !notification.readAt) { notification.readAt = new Date().toLocaleString('zh-CN'); changed = true; }
    }
    if (changed) PrototypeData.save(data);
    setState({ progressListOpen: false, personalProgressId });
  },
  openAffairProgress(personalProgressId) { this.openPostProgress(personalProgressId); },
  closeAffairProgress(event) { if (event && event.target !== event.currentTarget) return; setState({ personalProgressId: null }); },
  editRejectedPost(postId) {
    const data = PrototypeData.read();
    const post = ownedStaffPosts(data).find((item) => String(item.id) === String(postId));
    if (!post || !staffPostProgress(post, data).canResubmit) return showToast('该帖子当前不可修改后重新提交。');
    setState({ editingPostId: post.id, postComposerOpen: true, personalProgressId: state.staffDisplayMode === 'mobile' ? post.id : null, progressListOpen: false });
    if (state.staffDisplayMode === 'mobile') requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)));
  },
  setPersonalTab(personalTab) { setState({ personalTab, interactionDetail: null }); },
  setPersonalInteractionCategory(personalInteractionCategory) { setState({ personalInteractionCategory, interactionDetail: null }); },
  openInteractionDetail(index) { setState({ interactionDetail: index }); },
  openInteractionSource(postId) { const post = portalPosts.find((item) => item.id === postId); if (!post) return showToast('原帖暂不可查看。'); setState({ interactionDetail: null, workspaceView: 'voices', portalTab: post.board, expandedPostId: post.id }); },
  closeInteractionDetail(event) { if (event && event.target !== event.currentTarget) return; setState({ interactionDetail: null }); },
  closePersonalFavorite(event) { if (event && event.target !== event.currentTarget) return; setState({ personalFavoriteIndex: null }); },
  openPersonalFavorite(personalFavoriteIndex) { setState({ personalFavoriteIndex }); },
  openMobilePersonalSection(mobilePersonalSection) { setState({ mobilePersonalSection, personalTab: mobilePersonalSection, interactionDetail: null, personalFavoriteIndex: null }); window.scrollTo(0, 0); },
  closeMobilePersonalSection() { setState({ mobilePersonalSection: null, interactionDetail: null, personalFavoriteIndex: null }); window.scrollTo(0, 0); },
  saveMobileProfile() {
    const name = byId('mobile-profile-name')?.value.trim();
    const phone = byId('mobile-profile-phone')?.value.trim();
    if (!name) return showToast('请填写姓名。');
    if (!/^1\d{10}$/.test(phone || '')) return showToast('请输入正确的 11 位手机号。');
    const data = PrototypeData.read();
    const account = data.accounts.find((item) => item.id === state.session.id);
    state.session.name = name;
    state.session.phone = phone;
    if (account) {
      account.name = name;
      account.phone = phone;
      PrototypeData.save(data);
    }
    setState({ mobilePersonalSection: null });
    window.scrollTo(0, 0);
    showToast('个人资料已更新。');
  },
  openMobilePersonal(personalTab = 'posts') { setState({ personalTab, workspaceView: 'profile' }); },
  previewStaffAvatar(input) {
    const file = input.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) { input.value = ''; return showToast('请选择 2MB 以内的 PNG、JPG 或 WebP 图片'); }
    const reader = new FileReader();
    reader.onload = () => { const preview = byId('profile-avatar-preview'); if (preview) { preview.dataset.avatar = reader.result; preview.innerHTML = '<img alt="头像" width="64" height="64">'; preview.querySelector('img').src = reader.result; } };
    reader.readAsDataURL(file);
  },
  saveStaffProfile() {
    const nickname = byId('staff-profile-nickname').value.trim();
    if (nickname.length < 2 || nickname.length > 20) return showToast('昵称需为 2 至 20 个字符');
    const profile = { ...staffProfile(), nickname, gender: document.querySelector('input[name="staff-profile-gender"]:checked').value, publicationMode: document.querySelector('input[name="staff-profile-identity"]:checked').value };
    const avatar = byId('profile-avatar-preview').dataset.avatar;
    if (avatar) profile.avatar = avatar;
    try { localStorage.setItem('prototype-staff-profile-' + state.session.id, JSON.stringify(profile)); } catch (_) { return showToast('本地存储空间不足，资料未保存'); }
    setState({ personalEditOpen: false }); showToast('资料已保存');
  },
  openPersonalEdit() { setState({ personalEditOpen: true }); },
  closePersonalEdit(event) { if (event && event.target !== event.currentTarget) return; setState({ personalEditOpen: false }); },
  setPersonalPostCategory(personalPostCategory) { setState({ personalPostCategory, personalExpandedPostId: null }); },
  togglePersonalPost(id) { setState({ personalExpandedPostId: state.personalExpandedPostId === id ? null : id }); },
  formatPost(command, value = null) { document.execCommand(command, false, value); byId('new-post-body')?.focus(); },
  searchPolicy(event) { event?.preventDefault(); const value = byId('policy-search')?.value.trim(); showToast(value ? `已为你检索“${value}”（原型演示）。` : '请输入政策、问题或关键词。'); },
  openPolicyQuestion() { setState({ policyQuestionOpen: true, myPolicyQuestionsOpen: false }); },
  closePolicyQuestion(event) { if (event && event.target !== event.currentTarget) return; setState({ policyQuestionOpen: false }); },
  openMyPolicyQuestions() { setState({ myPolicyQuestionsOpen: true, policyQuestionOpen: false }); },
  closeMyPolicyQuestions(event) { if (event && event.target !== event.currentTarget) return; setState({ myPolicyQuestionsOpen: false }); },
  submitPolicyQuestion() {
    const title = byId('policy-question-title-input')?.value.trim();
    const category = byId('policy-question-category')?.value || '其他';
    const body = byId('policy-question-body')?.value.trim();
    if (!title || !body) return showToast('请填写问题标题和问题描述。');
    const data = PrototypeData.read();
    data.questions = Array.isArray(data.questions) ? data.questions : [];
    data.questions.unshift({ id: `question-${Date.now()}`, title, category, department: '待分办', answer: '', body, status: '待答复', submittedAt: new Date().toLocaleDateString('sv-SE'), answeredAt: '', authorId: state.session.id, authorName: byId('policy-question-anonymous')?.checked ? '匿名职工' : state.session.name, anonymous: Boolean(byId('policy-question-anonymous')?.checked), sourceType: '职工提问', needRectification: false, rectificationId: '' });
    PrototypeData.save(data);
    setState({ policyQuestionOpen: false });
    showToast('问题已提交，等待相关部门答复。');
  },
  searchPolicyTerm(term) { const input = byId('policy-search'); if (input) input.value = term; showToast(`已为你检索“${term}”（原型演示）。`); },
  readNotice(id) { if (state.noticeRead[id]) return; setState({ noticeRead: { ...state.noticeRead, [id]: true } }); saveMessageReadState(); showToast('通知已标记为已读。'); },
  openNotice(id) { const notice = homeNotices.find((item) => item.id === id); if (!notice) return; setState({ noticeRead: { ...state.noticeRead, [id]: true }, noticeDetailId: id }); saveMessageReadState(); if (state.staffDisplayMode === 'mobile') window.scrollTo(0, 0); },
  closeNoticeDetail(event) { if (event && event.target !== event.currentTarget) return; setState({ noticeDetailId: null }); if (state.staffDisplayMode === 'mobile') window.scrollTo(0, 0); },
  previewNoticeFile(id) { openNoticeFile(id, false); },
  downloadNoticeFile(id) { openNoticeFile(id, true); },
  markAllNoticesRead() { if (homeNotices.every((notice) => state.noticeRead[notice.id])) return showToast('通知已全部读完。'); setState({ noticeRead: Object.fromEntries(homeNotices.map((notice) => [notice.id, true])) }); saveMessageReadState(); showToast('已将全部通知标记为已读。'); },
  openHotPolicies() { setState({ hotPolicyOpen: true }); if (state.staffDisplayMode === 'mobile') window.scrollTo(0, 0); },
  closeHotPolicies(event) { if (event && event.target !== event.currentTarget) return; setState({ hotPolicyOpen: false }); if (state.staffDisplayMode === 'mobile') window.scrollTo(0, 0); },
  openHotPolicyDetail(policyDetailId) { setState({ hotPolicyOpen: false, policyDetailId }); if (state.staffDisplayMode === 'mobile') window.scrollTo(0, 0); },
  openPolicyDetail(policyDetailId) { setState({ policyDetailId }); if (state.staffDisplayMode === 'mobile') requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' })); },
  closePolicyDetail(event) { if (event && event.target !== event.currentTarget) return; setState({ policyDetailId: null }); if (state.staffDisplayMode === 'mobile') requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' })); },
  setBanner(bannerIndex) { setState({ bannerIndex }); },
  changeBanner(offset) { const count = activeManagedBanners().length || policyBanners.length; setState({ bannerIndex: (state.bannerIndex + offset + count) % count }); },
  openBanner(index) {
    const data = PrototypeData.read();
    const banners = activeManagedBanners(data);
    if (!banners.length) return this.notify();
    const item = banners[index];
    if (!item) return;
    if (item.type === 'external') return window.open(item.url, '_blank', 'noopener,noreferrer');
    if (item.type === 'post') { const echo = (data.echoPublications || []).find((entry) => String(entry.id) === String(item.targetId)); const postId = echo ? 6000 + Number(echo.sourcePostId || 0) : Number(item.targetId); if (!echo) recordPostView(postId); return setState({ workspaceView: 'voices', portalTab: '全部', expandedPostId: postId }); }
    const target = (item.type === 'notice' ? data.notices : [...data.policies, ...data.questions]).find((entry) => String(entry.id) === String(item.targetId));
    if (!target || target.status !== '已发布') return showToast('关联内容已下架');
    setState({ bannerDetail: { title: target.title, label: item.type === 'notice' ? '通知公告' : '政策与问答', summary: target.summary || '', body: target.body || target.answer } });
  },
  closeBannerDetail(event) { if (event && event.target !== event.currentTarget) return; setState({ bannerDetail: null }); },
  openRanking(rankModal) { setState({ rankModal }); },
  closeRanking(event) { if (event && event.target !== event.currentTarget) return; setState({ rankModal: null }); },
  openRankingDetail(type, itemId) {
    const items = getRankingItems(type), index = items.findIndex((item) => String(item.id) === String(itemId));
    if (index < 0) return showToast('该帖子暂时无法查看。');
    const post = rankingItemToPost(items[index], type, index);
    setState({ rankingDetail: { type, itemId }, expandedPostId: post.id, commentPostId: null, reportPostId: null, replyTarget: '' });
  },
  closeRankingDetail(event) {
    if (event && event.target !== event.currentTarget) return;
    setState({ rankingDetail: null, expandedPostId: null, commentPostId: null, reportPostId: null, replyTarget: '' });
  },
  togglePostExpanded(id) { const opening = state.expandedPostId !== id; if (opening) recordPostView(id); setState({ expandedPostId: opening ? id : null, commentPostId: null, reportPostId: null }); },
  togglePostAction(id, action) {
    const config = { liked: ['likes', 'likeUsers'], favorited: ['favorites', 'favoriteUsers'] }[action];
    if (!config) return;
    const data = PrototypeData.read(), post = sharedPostFor(data, id);
    if (!post) return showToast('帖子记录不存在。');
    const engagement = PrototypeData.ensureEngagement(post), actor = engagementActor(), [countField, usersField] = config;
    const index = engagement[usersField].findIndex((item) => item.accountId === actor.accountId);
    const active = index < 0;
    if (active) engagement[usersField].unshift(actor); else engagement[usersField].splice(index, 1);
    engagement[countField] = Math.max(0, Number(engagement[countField] || 0) + (active ? 1 : -1));
    recordDaily(engagement, countField, active ? 1 : -1);
    PrototypeData.save(data);
    const postActions = { ...state.postActions, [id]: { ...(state.postActions[id] || {}), [action]: active } };
    setState({ postActions });
  },
  toggleComments(id) { const post = portalPosts.find((item) => String(item.id) === String(id)); if (post?.allowComments === false) return showToast('该帖子已关闭评论。'); setState({ commentPostId: state.commentPostId === id ? null : id, reportPostId: null, replyTarget: '' }); },
  replyTo(author) { state.replyTarget = author; const textarea = document.querySelector('.comment-compose textarea'); if (textarea) textarea.focus(); },
  replyToComment(id, index) { const detailPost = getRankingDetailPost(); const author = (portalPosts.find((post) => post.id === id) || (detailPost?.id === id ? detailPost : null))?.commentList[index]?.author; if (author) this.replyTo(author); },
  submitComment(id) { const data = PrototypeData.read(), post = sharedPostFor(data, id); if (post?.allowComments === false) return showToast('该帖子已关闭评论。'); const value = byId(`comment-${id}`)?.value.trim(); if (!value) return showToast('请输入评论内容后再发布。'); const text = `${state.replyTarget ? `回复 @${state.replyTarget}：` : ''}${value}`; const blocked = PrototypeData.blockedWord(text, '评论', data); if (blocked) blocked.hitCount = (Number.isFinite(blocked.hitCount) ? blocked.hitCount : 0) + 1; if (blocked?.riskLevel === '高') { PrototypeData.save(data); return showToast('内容包含禁止发布信息，请修改后重试。'); } const match = PrototypeData.protectedMatch(text, '评论', data); if (match) match.list.hitCount += 1; const requiresReview = Boolean(blocked || match); const reviewPriority = blocked?.riskLevel === '中' ? '优先' : requiresReview ? '普通' : ''; const createdAt = new Date().toLocaleString('sv-SE', { hour12: false }); data.comments.push({ id: `PL-${Date.now()}`, postId: id, author: state.session?.name || '职工', authorId: state.session?.id || 'staff', department: state.session?.department || '未配置', text, createdAt, status: requiresReview ? '待审核' : '已发布', risk: blocked ? `${blocked.riskLevel || '中'}风险` : match ? '受保护名单待复核' : '低风险', reviewPriority, sensitiveHits: blocked ? [blocked.term] : [], protectedListId: match?.list.id || null }); if (post) recordDaily(PrototypeData.ensureEngagement(post), 'comments'); PrototypeData.save(data); const postActions = { ...state.postActions, [id]: { ...(state.postActions[id] || {}), newComment: text, commented: true } }; setState({ postActions, replyTarget: '' }); showToast(requiresReview ? (reviewPriority === '优先' ? '评论已提交，进入优先人工审核。' : '评论已提交，等待人工审核。') : '评论已发布。'); },
  searchVoices() { setState({ voiceSearch: byId('voice-search')?.value.trim() || '' }); },
  refreshVoices() { setState({ voiceSearch: '' }); showToast('已刷新'); },
  openPasswordChange() { setState({ accountCenterOpen: true, accountCenterTab: 'security' }); },
  updateComposerBoard() {
    const board = PrototypeData.postingBoards().find((item) => item.id === byId('new-post-board')?.value);
    const toggle = byId('new-post-allow-comments');
    if (toggle) { toggle.disabled = !board || board.allowComments === false; toggle.checked = Boolean(board && board.allowComments !== false); }
    const hint = byId('new-post-comment-hint');
    if (hint) hint.textContent = !board ? '请先选择栏目；栏目关闭评论时此处不可开启。' : board.allowComments === false ? '该栏目已关闭评论。' : '栏目关闭评论时此处不可开启。';
  },
  toggleDraftBox() { setState({ composeBuffer: capturePostComposer(), draftBoxOpen: !state.draftBoxOpen }); },
  editStaffDraft(id) {
    const draft = staffDrafts().find((item) => item.id === id);
    if (!draft) return showToast('草稿不存在');
    setState({ postComposerOpen: true, editingPostId: null, editingDraftId: id, composeBuffer: null, draftBoxOpen: false });
  },
  deleteStaffDraft(id) {
    if (!window.confirm('确定删除这条草稿？')) return;
    persistStaffDrafts(staffDrafts().filter((item) => item.id !== id));
    if (state.editingDraftId === id) { state.editingDraftId = null; state.composeBuffer = null; }
    render(); showToast('草稿已删除');
  },
  ownerRecord(id, draft) {
    if (!draft) return this.openPostProgress(id);
    const item = staffDrafts().find((p) => p.id === id);
    if (item) showToast(`草稿最近保存时间：${item.updatedAt}`);
  },
  ownerDelete(id, draft) {
    if (draft) return this.deleteStaffDraft(id);
    const data = PrototypeData.read();
    const post = ownedStaffPosts(data).find((p) => String(p.id) === id);
    if (!post || !window.confirm('确定删除这条帖子？删除后将不再展示。')) return;
    post.deleted = true; post.enabled = false;
    post.deletedBy = state.session.name + '（职工端）';
    post.deletedAt = new Date().toLocaleString('sv-SE').slice(0,16);
    post.history = [...(post.history || []), { text: '发帖人删除帖子', at: new Date().toLocaleString('sv-SE') }];
    PrototypeData.save(data); render(); showToast('帖子已删除');
  },
  ownerSettings(id, draft) {
    const data = PrototypeData.read();
    const post = (draft ? staffDrafts() : ownedStaffPosts(data)).find((p) => String(p.id) === id);
    if (!post) return;
    const allowed = data.boards.find((b) => b.name === post.board)?.allowComments !== false && Boolean(post.board);
    const dialog = document.createElement('dialog');
    dialog.className = 'owner-settings-dialog';
    dialog.innerHTML = `<form method="dialog"><header><h2>帖子设置</h2><button value="cancel" aria-label="关闭">×</button></header><fieldset><legend>发布身份</legend><label><input type="radio" name="identity" value="real" ${post.publicationMode !== 'anonymous' ? 'checked' : ''}>实名</label><label><input type="radio" name="identity" value="anonymous" ${post.publicationMode === 'anonymous' ? 'checked' : ''}>匿名</label></fieldset><label class="owner-comment-setting">允许评论<input type="checkbox" name="comments" ${allowed && post.allowComments !== false ? 'checked' : ''} ${allowed ? '' : 'disabled'}></label>${allowed ? '' : '<p>当前栏目未开放评论</p>'}<footer><button value="cancel">取消</button><button value="save" class="primary">保存</button></footer></form>`;
    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'save') {
        post.publicationMode = dialog.querySelector('input[name="identity"]:checked').value;
        post.allowComments = allowed && dialog.querySelector('[name="comments"]').checked;
        if (draft) persistStaffDrafts(staffDrafts().map((p) => p.id === id ? { ...post, updatedAt: new Date().toLocaleString('sv-SE') } : p));
        else { post.author = post.publicationMode === 'anonymous' ? '匿名职工' : state.session.name; post.authorId = state.session.id; PrototypeData.save(data); }
        render(); showToast('设置已保存');
      }
      dialog.remove();
    });
    document.body.append(dialog); dialog.showModal();
  },
  savePostDraft() {
    const draft = capturePostComposer();
    if (!draft.title && !draft.body) return showToast('请填写标题或正文后保存');
    const id = state.editingDraftId || 'draft-' + Date.now();
    persistStaffDrafts([{ ...draft, id, authorId: state.session.id, updatedAt: new Date().toLocaleString('sv-SE', { hour12: false }) }, ...staffDrafts().filter((item) => item.id !== id)]);
    setState({ postComposerOpen: false, editingDraftId: null, composeBuffer: null, draftBoxOpen: false }); showToast('草稿已保存');
  },
  openPostComposer() { if (state.session?.role !== 'staff') return showToast('请切换至职工视图发表帖子。'); setState({ postComposerOpen: true, editingPostId: null, editingDraftId: null, composeBuffer: null, draftBoxOpen: false }); if (state.staffDisplayMode === 'mobile') requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0))); },
  closePostComposer(event) { if (event && event.target !== event.currentTarget) return; setState({ postComposerOpen: false, editingPostId: null, editingDraftId: null, composeBuffer: null, draftBoxOpen: false }); },
  handlePostAttachment(input) {
    const file = input.files?.[0], name = byId('new-post-attachment-name'), hint = byId('new-post-attachment-hint'), remove = byId('new-post-attachment-remove'), error = byId('post-compose-error');
    const message = getPostAttachmentError(file);
    if (message) { input.value = ''; name.textContent = '未选择文件'; hint.textContent = '限 1 份，最大 50MB；支持 PDF、Office、TXT、压缩包、JPG/PNG'; remove.hidden = true; error.textContent = message; error.hidden = false; return; }
    if (!file) return this.clearPostAttachment();
    input.closest('.post-compose-modal').dataset.removeAttachment = 'false';
    name.textContent = file.name;
    hint.textContent = `${formatPostFileSize(file.size)} · 已选择 1 份文件`;
    remove.hidden = false;
    error.hidden = true;
  },
  clearPostAttachment() {
    const input = byId('new-post-attachment'), name = byId('new-post-attachment-name'), hint = byId('new-post-attachment-hint'), remove = byId('new-post-attachment-remove');
    if (input) input.value = '';
    const composer = input?.closest('.post-compose-modal');
    if (composer) composer.dataset.removeAttachment = 'true';
    if (name) name.textContent = '未选择文件';
    if (hint) hint.textContent = '限 1 份，最大 50MB；支持 PDF、Office、TXT、压缩包、JPG/PNG';
    if (remove) remove.hidden = true;
  },
  submitPost() {
    const composer = document.querySelector('.post-compose-modal');
    const boardId = byId('new-post-board')?.value, title = byId('new-post-title')?.value.trim(), subtitle = byId('new-post-subtitle')?.value.trim(), identity = composer?.querySelector('input[name="new-post-identity"]:checked')?.value, allowComments = byId('new-post-allow-comments')?.checked !== false, attachmentFile = byId('new-post-attachment')?.files?.[0], bodyElement = byId('new-post-body'), body = bodyElement?.innerText.trim();
    const error = byId('post-compose-error');
    const fail = (message) => { error.textContent = message; error.hidden = false; };
    if (!title || !body) return fail('请填写帖子标题和正文。');
    if (!identity) return fail('请选择实名发布或匿名发布。');
    const attachmentError = getPostAttachmentError(attachmentFile);
    if (attachmentError) return fail(attachmentError);
    const data = PrototypeData.read(), board = PrototypeData.postingBoards(data).find((item) => item.id === boardId);
    if (!board) return fail('该栏目已停用，请选择其他栏目。');
    if (board.name === '回音壁') return fail('回音壁由管理人员发布，职工不能在该栏目发帖。');
    const blocked = PrototypeData.blockedWord(`${title}\n${body}`, '发帖', data);
    if (blocked) blocked.hitCount = (Number.isFinite(blocked.hitCount) ? blocked.hitCount : 0) + 1;
    if (blocked?.riskLevel === '高') { PrototypeData.save(data); return fail('内容包含禁止发布信息，请修改后重试。'); }
    const match = PrototypeData.protectedMatch(`${title}\n${body}`, '发帖', data);
    if (match) match.list.hitCount += 1;
    const requiresReview = Boolean(blocked);
    const status = requiresReview ? '待审核' : '已发布';
    const effectiveAllowComments = board.allowComments !== false && allowComments;
    const updatedAt = new Date().toLocaleString('sv-SE', { hour12: false });
    if (state.editingPostId !== null) {
      const post = data.posts.find((item) => String(item.id) === String(state.editingPostId));
      const owned = ownedStaffPosts(data).some((item) => String(item.id) === String(state.editingPostId));
      if (!post || !owned || !staffPostProgress(post, data).canResubmit) return fail('该帖子状态已变化，请关闭后刷新重试。');
      if (staffProgressBoards.includes(post.board) && board.name !== post.board) return fail('修改后重新提交须保留原发表栏目。');
      const removeAttachment = composer?.dataset.removeAttachment === 'true';
      Object.assign(post, { board: board.name, title, subtitle, body, author: identity === 'anonymous' ? '匿名职工' : (state.session?.name || '职工'), authorId: state.session?.id || post.authorId || 'staff', publicationMode: identity, attachment: attachmentFile ? { name: attachmentFile.name, size: attachmentFile.size, type: attachmentFile.type || '' } : removeAttachment ? null : post.attachment || null, allowComments: effectiveAllowComments, time: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }), updatedAt, status, contentAuditStatus: requiresReview ? '待审核' : '审核通过', publishStatus: requiresReview ? '未发布' : '已发布', handlingStatus: board.generatesAffair && !requiresReview ? '待处理' : '不适用', processingAccepted: false, enabled: true, deleted: false, reason: '', routingDecision: '', routingReason: '', risk: blocked ? `${blocked.riskLevel || '中'}风险` : '低风险', reviewPriority: blocked?.riskLevel === '中' ? '优先' : requiresReview ? '普通' : '', sensitiveHits: blocked ? [blocked.term] : [], protectedListId: match?.list.id || null, flowSnapshot: board.generatesAffair ? PrototypeData.flowFor(board.name, data) : null });
      post.history = [...(post.history || []), { text: '已根据驳回意见修改并重新提交', at: post.time }];
      personalPostRecords[post.id] = { ...(personalPostRecords[post.id] || {}), publication: status, reviewed: !requiresReview };
      PrototypeData.save(data);
      setState({ postComposerOpen: false, editingPostId: null });
      return showToast(requiresReview ? '发言已重新提交，等待人工审核。' : '发言已重新发布。');
    }
    const savedDraft = state.composeBuffer || staffDrafts().find((item) => item.id === state.editingDraftId);
    const id = Date.now();
    data.posts.unshift({ id, board: board.name, title, subtitle, body, author: identity === 'anonymous' ? '匿名职工' : (state.session?.name || '职工'), authorId: state.session?.id || 'staff', publicationMode: identity, attachment: attachmentFile ? { name: attachmentFile.name, size: attachmentFile.size, type: attachmentFile.type || '' } : savedDraft?.attachment || null, allowComments: effectiveAllowComments, time: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }), createdAt: updatedAt, updatedAt, status, contentAuditStatus: requiresReview ? '待审核' : '审核通过', publishStatus: requiresReview ? '未发布' : '已发布', handlingStatus: board.generatesAffair && !requiresReview ? '待处理' : '不适用', processingAccepted: false, enabled: true, deleted: false, risk: blocked ? `${blocked.riskLevel || '中'}风险` : '低风险', reviewPriority: blocked?.riskLevel === '中' ? '优先' : requiresReview ? '普通' : '', sensitiveHits: blocked ? [blocked.term] : [], protectedListId: match?.list.id || null, flowSnapshot: board.generatesAffair ? PrototypeData.flowFor(board.name, data) : null, engagement: PrototypeData.emptyEngagement() });
    personalPostRecords[id] = { publication: status, reviewed: !requiresReview, shares: 0, reports: 0 };
    PrototypeData.save(data); if (state.editingDraftId) persistStaffDrafts(staffDrafts().filter((item) => item.id !== state.editingDraftId)); personalPostIds.unshift(id); setState({ postComposerOpen: false, editingPostId: null, editingDraftId: null, composeBuffer: null, draftBoxOpen: false }); showToast(requiresReview ? '发言已提交，等待人工审核。' : '发言已发布。');
  },
  setPortalTabByIndex(index) { const names = ['全部', ...new Set([...PrototypeData.read().boards.map((board) => board.name), ...portalPosts.map((post) => post.board)])]; setState({ portalTab: names[index] || '全部' }); },
  toggleReport(id) { setState({ reportPostId: state.reportPostId === id ? null : id, commentPostId: null }); },
  submitReport(id) { const category = byId(`report-type-${id}`)?.value; const reason = byId(`report-${id}`)?.value.trim(); if (!category) return showToast('请选择举报原因类型。'); if (!reason) return showToast('请填写举报说明。'); const data = PrototypeData.read(); sharedPostFor(data, id); data.reports.push({ id: `JB-${Date.now()}`, postId: id, reporterId: state.session?.id || 'staff', reporter: state.session?.name || '职工用户', category, reason, createdAt: new Date().toLocaleString('sv-SE').slice(0, 16), status: '待核查', resolution: '', reviewReason: '', reviewedAt: '' }); PrototypeData.save(data); setState({ reportPostId: null, postActions: { ...state.postActions, [id]: { ...(state.postActions[id] || {}), reported: true } } }); showToast('举报已提交，平台管理员将尽快核查。'); },
  sharePost(id, channel = 'copy') { const data = PrototypeData.read(), post = sharedPostFor(data, id); if (!post) return showToast('帖子记录不存在。'); const engagement = PrototypeData.ensureEngagement(post); engagement.shares += 1; engagement.shareChannels[channel] = Number(engagement.shareChannels[channel] || 0) + 1; recordDaily(engagement, 'shares'); PrototypeData.save(data); render(); showToast('帖子链接已复制，分享次数已记录。'); },
  launchStaffMobile() { if (typeof renderMobileWorkspace !== 'function') return showToast('移动端模块尚未加载，请刷新页面后重试。'); setState({ session: null, view: 'login', authDisplayMode: 'mobile', staffDisplayMode: 'desktop', loginPortal: 'staff', loginMode: 'password', error: '', notice: '' }); window.scrollTo(0, 0); },
  closeMobileLogin() { setState({ view: 'login', authDisplayMode: 'desktop', loginPortal: 'staff', loginMode: 'password', error: '', notice: '' }); },
  exitStaffMobile() { setState({ session: null, view: 'login', authDisplayMode: 'mobile', staffDisplayMode: 'desktop', workspaceView: 'dashboard', mobilePersonalSection: null, postComposerOpen: false, personalEditOpen: false, policyDetailId: null }); },
  prefillRole(role) { const account = accounts.find((item) => item.role === role && item.status === 'approved'); setState({ view: 'login', staffDisplayMode: 'desktop', loginMode: 'password', error: '', notice: `已载入${roleMeta[role][0]}演示账号，可直接登录。` }); setTimeout(() => { if (byId('identifier')) { byId('identifier').value = account.id; byId('password').value = account.password; } }, 0); },
  openManagementWorkspace,
  switchRole(role) { const account = accounts.find((item) => item.role === role && item.status === 'approved'); if (role === 'handler') return openHandlerWorkspace(account); applyMessageReadState(account.id); setState({ session: account, staffDisplayMode: 'desktop', workspaceView: 'dashboard', rankModal: null, policyDetailId: null }); },
  setWorkspaceView(workspaceView) { const nextView = workspaceView === 'policy' ? 'dashboard' : workspaceView; setState({ workspaceView: nextView, mobilePersonalSection: nextView === 'profile' ? state.mobilePersonalSection : null, rankModal: null, policyDetailId: null, policyQuestionOpen: false, myPolicyQuestionsOpen: false, hotPolicyOpen: false }); },
  openSearchResult(type, id) { const panel = byId('staff-search-results'); if (panel) panel.hidden = true; if (type === '政策') return setState({ workspaceView: 'policy', policyDetailId: null }); setState({ workspaceView: 'voices', expandedPostId: Number.isNaN(Number(id)) ? id : Number(id) }); },
  toggleProfileMenu() { setState({ profileOpen: !state.profileOpen }); },
  profileAction(action) { if (action === 'logout') return this.logout(); setState({ profileOpen: false, accountCenterOpen: false, workspaceView: 'profile', personalTab: 'posts' }); },
  closeAccountCenter(event) { if (event && event.target !== event.currentTarget) return; setState({ accountCenterOpen: false }); },
  setAccountCenterTab(tab) { setState({ accountCenterTab: ['basic','security','devices'].includes(tab) ? tab : 'basic' }); },
  saveAccountCenter() { const name = byId('account-center-name')?.value.trim(); if (!name) return showToast('请填写用户昵称'); const data = PrototypeData.read(), shared = data.accounts.find((item) => item.id === state.session.id); state.session.name = name; state.session.gender = document.querySelector('input[name="account-center-gender"]:checked')?.value || '未知'; if (shared) { shared.name = name; shared.gender = state.session.gender; PrototypeData.save(data); } setState({ accountCenterOpen: false }); showToast('个人信息已更新'); },
  changeAccountPassword() { const oldPassword = byId('account-old-password')?.value, password = byId('account-new-password')?.value, confirm = byId('account-confirm-password')?.value; if (!oldPassword || !password || !confirm) return showToast('请完整填写密码信息'); if (oldPassword !== state.session.password) return showToast('原密码不正确'); if (password.length < 8 || password.length > 32) return showToast('密码长度为 8 至 32 位'); if (password !== confirm) return showToast('两次输入的新密码不一致'); state.session.password = password; setState({ accountCenterOpen: false }); showToast('演示密码已修改，本次页面会话内生效'); },
  reviewAccount(id, status) { const account = accounts.find((item) => item.id === id); if (!account) return; account.status = status; render(); showToast(status === 'approved' ? `${account.name} 已审核通过，可登录平台。` : `${account.name} 已驳回。`); },
  logout() { if (state.session) recordLogin(state.session.id, '成功', '退出登录', 'password'); setState({ view: 'login', session: null, staffDisplayMode: 'desktop', workspaceView: 'dashboard', profileOpen: false, accountCenterOpen: false, rankModal: null, policyDetailId: null, noticeRead: {}, interactionRead: {}, replyRead: {}, error: '', notice: '已安全退出登录。' }); },
  notify() { showToast('该功能为原型演示，正式版本将进入对应业务模块。'); }
};

document.addEventListener('click', (event) => {
  if (state.personalTab !== 'favorites' || state.workspaceView !== 'profile') return;
  const action = event.target.closest('.personal-row-action');
  if (!action) return;
  const row = action.closest('.personal-post-row');
  const index = row ? [...row.parentElement.children].indexOf(row) : -1;
  if (index >= 0) setState({ personalFavoriteIndex: index });
});
document.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; if (state.hotPolicyOpen) return setState({ hotPolicyOpen: false }); if (state.noticeDetailId) return setState({ noticeDetailId: null }); if (state.postComposerOpen) return setState({ postComposerOpen: false, editingPostId: null }); if (state.personalFavoriteIndex !== null) return setState({ personalFavoriteIndex: null }); if (state.interactionDetail !== null) return setState({ interactionDetail: null }); if (state.personalProgressId !== null) return setState({ personalProgressId: null }); if (state.progressListOpen) return setState({ progressListOpen: false }); if (state.policyDetailId) return setState({ policyDetailId: null }); if (state.rankModal) return setState({ rankModal: null }); });
render();
startNoticeCarousel();
