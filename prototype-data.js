(function () {
  const key = 'hubei-voice-prototype-v1';
  const sensitiveMeta = (term) => {
    if (/密码|口令|验证码|身份证|银行卡|涉密文件原件/.test(term)) return { category: '信息安全', riskLevel: '高' };
    if (/底价|专家名单|人事档案|通讯录|干部任免|考核结果|会议纪要|保密协议/.test(term)) return { category: '内部信息', riskLevel: '中' };
    return { category: '廉洁合规', riskLevel: '低' };
  };
  const demoWords = [
    '涉密文件原件', '内部会议纪要全文', '未公开干部任免名单', '未公开项目底价', '招标评审专家名单',
    '财政专户密码', '单位账户密码', '后台管理口令', '验证码转发给我', '身份证号码及住址',
    '职工完整身份证号', '个人银行卡号及密码', '人事档案扫描件', '未经授权公开通讯录', '保密协议全文',
    '虚开发票套现', '公款私存', '违规收受礼金', '代写虚假验收报告', '绕过招标程序', '擅自披露考核结果'
  ].map((term, index) => ({ id: `word-agency-demo-${index + 1}`, term, scope: '全部', matchRule: '包含匹配', ...sensitiveMeta(term), enabled: true, hitCount: 0 })).filter((rule) => rule.id !== 'word-agency-demo-3');
  const demoCommentTerms = ['内部会议纪要全文', '未公开项目底价', '招标评审专家名单', '财政专户密码', '单位账户密码', '后台管理口令', '验证码转发给我', '身份证号码及住址'];
  const demoComments = [
    ['不如把内部会议纪要全文直接发出来，大家查看更方便。', '刘畅', '合作指导处', '待审核'],
    ['建议公布未公开项目底价，基层单位才能准确参考。', '赵颖', '机关服务中心', '待审核'],
    ['谁有招标评审专家名单，可以在评论区共享一下。', '黄晨', '经济发展处', '待审核'],
    ['财政专户密码可以统一登记在共享表里。', '吴桐', '信息中心', '待审核'],
    ['把单位账户密码发给经办人就能快速处理。', '陈峰', '武汉市供销合作总社', '待审核'],
    ['后台管理口令是否还是上次培训时设置的那一个？', '李雯', '办公室', '待审核'],
    ['系统登录不了，请把验证码转发给我协助排查。', '王可', '荆州市供销合作社', '待审核'],
    ['建议把身份证号码及住址一并放进联系人清单。', '周扬', '省供销集团', '待审核'],
    ['支持建立跨单位信息共享机制。', '孙悦', '合作指导处', '已发布'],
    ['晚餐供应时间可以结合实际人数动态调整。', '郑航', '机关服务中心', '已发布'],
    ['经验总结清晰，便于项目验收参考。', '蒋欣', '经济发展处', '已发布'],
    ['建议同时明确数据更新责任人。', '冯宇', '信息中心', '已发布'],
    ['基层单位需要更便捷的反馈渠道。', '许宁', '办公室', '已发布'],
    ['建议按地区和品类提供筛选功能。', '郭睿', '武汉市供销合作总社', '已发布'],
    ['希望后续公布实施进度。', '何静', '荆州市供销合作社', '已发布'],
    ['建议形成常态化更新机制。', '唐杰', '省供销集团', '已发布'],
    ['重复刷屏内容，请管理员删除。', '匿名用户', '省社机关', '已驳回'],
    ['该评论包含无关推广信息。', '匿名用户', '直属企业', '已驳回'],
    ['与原帖主题无关的情绪表达。', '匿名用户', '市州供销社', '已驳回'],
    ['包含不文明用语的演示评论。', '匿名用户', '省社机关', '已驳回']
  ].map(([text, author, department, status], index) => ({ id: `PL-DEMO-${String(index + 1).padStart(3, '0')}`, postId: index % 4 === 0 ? 'POST-FLOW-E-04' : index % 3 + 1, author, department, text, createdAt: `2026-09-${String(13 - Math.floor(index / 5)).padStart(2, '0')} ${String(9 + index % 8).padStart(2, '0')}:20`, status, risk: index < 8 ? '敏感词命中' : '低风险', sensitiveHits: index < 8 ? [demoCommentTerms[index]] : [], reviewReason: status === '已驳回' ? '内容与主题无关或不符合评论规范' : '', reviewedAt: status === '待审核' ? '' : '2026-09-14 09:00' }));
  const demoReports = [
    '疑似公开个人联系方式，请核对是否取得本人授权。', '内容中可能包含尚未公开的项目数据。', '评论存在不文明表达，影响正常交流。', '帖子疑似重复发布，请核查是否需要合并。',
    '内容与事实不符，建议联系相关部门核实。', '疑似包含广告推广信息。', '匿名发帖可能涉及对个人的不实评价。', '帖子中引用的政策文件版本可能已经失效。',
    '疑似泄露内部会议材料。', '评论区出现联系方式引流信息。', '内容可能侵犯他人隐私。', '标题与正文不一致，疑似误导。',
    '帖子包含未经证实的项目进度信息。', '疑似冒用他人身份发布内容。', '内容存在重复刷屏情况。', '举报该帖可能包含敏感业务数据。',
    '评论带有明显营销性质。', '内容引用来源不明确，请核查真实性。', '疑似恶意攻击其他用户。', '帖子可能违反平台信息发布规范。'
  ].map((reason, index) => ({
    id: `JB-DEMO-${String(index + 1).padStart(3, '0')}`,
    postId: index % 4 === 0 ? 'POST-FLOW-E-04' : index % 3 + 1,
    reason,
    category: /个人|隐私|身份/.test(reason) ? '个人信息' : /广告|营销|引流/.test(reason) ? '广告推广' : /攻击|不文明/.test(reason) ? '不文明内容' : /重复/.test(reason) ? '重复内容' : /内部|敏感|项目数据/.test(reason) ? '敏感信息' : '内容失实',
    reporter: index % 3 === 0 ? '匿名举报' : ['刘畅', '赵颖', '黄晨'][index % 3],
    createdAt: `2026-09-${String(15 - Math.floor(index / 4)).padStart(2, '0')} ${String(9 + index % 8).padStart(2, '0')}:30`,
    status: index < 12 ? '待核查' : '已处理',
    resolution: index < 12 ? '' : index % 2 ? '举报不成立' : '举报成立',
    reviewReason: index < 12 ? '' : index % 2 ? '经核对，原内容未违反平台规范。' : '经核对，内容存在违规信息，已记录处置。',
    reviewedAt: index < 12 ? '' : '2026-09-14 10:30'
  }));
  const reviewBodyByTerm = {
    '内部会议纪要全文': '近期各处室通过工作群传阅会议材料的情况较多，建议明确可公开、内部传阅和限制传阅三个层级，并在文件首页标注范围。个别同事提出直接上传内部会议纪要全文供基层单位参考，建议平台先核对材料密级和公开边界，再决定是否发布。',
    '未公开项目底价': '基层社在准备冷链设施采购时，希望参考同类项目的预算构成和设备参数。目前项目仍处于采购论证阶段，材料中涉及未公开项目底价，建议由项目主管部门确认可公开范围后，整理成不含具体价格的经验指引。',
    '招标评审专家名单': '建议建立农业社会化服务项目采购常见问题库，公开资格条件、评审流程和结果查询渠道。原稿附带招标评审专家名单，可能影响评审独立性，建议删除人员信息后再分享流程经验。',
    '财政专户密码': '部分基层单位反映财政资金专户交接缺少统一清单，人员调整时容易遗漏网银权限和印鉴资料。帖子中出现财政专户密码等高敏感信息，建议立即转人工核查，并将内容改为账户交接制度和双人复核要求。',
    '单位账户密码': '社有企业开展月度资金盘点时，需要核对银行账户、U盾保管人和审批链路。为说明问题，原文填写了单位账户密码，这类信息不应在交流平台流转，建议仅保留风险描述和整改建议。',
    '后台管理口令': '县域流通信息系统近期完成升级，部分网点反馈账号权限没有同步调整。帖子列出了后台管理口令用于说明登录问题，应删除具体口令，并由信息中心通过工单渠道处理账号权限。',
    '验证码转发给我': '近期有职工收到冒充技术人员的短信，要求回复“验证码转发给我”以协助系统升级。建议平台发布防诈骗提醒，明确任何管理员都不会索取短信验证码，并提供异常情况上报渠道。',
    '身份证号码及住址': '职工申请培训补贴时，希望一次提交材料并在后续环节复用。现有说明要求上传身份证号码及住址，建议按照最小必要原则重新梳理字段，对确需收集的信息加密保存并限制查询权限。',
    '个人银行卡号及密码': '部分单位在登记慰问金发放信息时，仍通过普通表格汇总个人银行卡号及密码。建议统一使用财务系统采集必要的收款账户信息，严禁收集银行卡密码，并对历史表格及时清理。',
    '人事档案扫描件': '跨单位调动过程中，人事材料需要在组织人事部门之间规范流转。有人建议将人事档案扫描件上传到交流平台便于下载，此方式存在隐私风险，建议改用专门的人事档案系统并设置审批和水印。',
    '未经授权公开通讯录': '基层网点希望获得业务联系人清单，以便及时咨询农资供应和项目申报问题。当前附件属于未经授权公开通讯录，建议由各部门确认对外联系人，只公布办公电话和工作邮箱。',
    '保密协议全文': '建议为新入职职工增加信息安全培训，结合典型案例说明资料使用边界。原帖引用了保密协议全文，其中部分条款不适合公开，建议改为提炼注意事项并链接正式制度查询入口。',
    '代写虚假验收报告': '冷链项目验收应以合同、现场记录、设备运行数据和影像资料为依据。近期有人在群内宣传代写虚假验收报告，建议各单位加强材料真实性核验，对异常服务信息及时报告。',
    '绕过招标程序': '部分基层项目工期紧，存在先实施后补手续的倾向，甚至提出绕过招标程序。建议经济发展和财务部门联合发布采购流程指引，明确紧急采购适用条件、审批权限和留痕要求。',
    '虚开发票套现': '社有企业费用报销检查中发现，个别宣传信息包含虚开发票套现等违法内容。建议加强票据真伪核验和公务卡数据比对，同时公布合规咨询和问题举报渠道。',
    '擅自披露考核结果': '年度考核结束后，职工希望及时了解结果查询和申诉流程。讨论中涉及擅自披露考核结果的具体情形，建议由人事部门统一发布查询规则，避免传播未经确认的个人评价信息。',
    '未公开干部任免名单': '基层单位希望提前了解干部调整后的业务对接安排，但帖子包含未公开干部任免名单。建议等待正式文件发布后，再同步岗位职责和办公联系方式，不传播个人任免传闻。',
    '涉密文件原件': '为提高项目申报效率，有人建议把历年申报材料打包上传供各单位参考，其中包含涉密文件原件。建议先由资料归口部门完成审查、脱敏和版本清理，只发布可公开的模板与填报说明。',
    '违规收受礼金': '建议结合节假日前监督提醒，说明社有企业商务往来、礼品登记和廉洁纪律要求。帖子引用了违规收受礼金的具体案例，涉及人员和调查细节，应删除身份信息后再作为警示教育材料使用。'
  };
  const demoReviewPosts = [
    ['关于规范内部会议材料传阅范围的建议', '业务交流', '楚风同行', '内部会议纪要全文'],
    ['基层项目招标信息公开边界咨询', '心声诉求', '江汉新声', '未公开项目底价'],
    ['建议加强评审专家信息保护', '建言献策', '供销观察员', '招标评审专家名单'],
    ['财务专户安全管理问题反馈', '心声诉求', '田野微光', '财政专户密码'],
    ['关于单位账号安全培训的建议', '建言献策', '荆楚行者', '单位账户密码'],
    ['后台系统口令管理经验交流', '业务交流', '云端稻香', '后台管理口令'],
    ['短信验证码安全提醒建议', '建言献策', '清风徐来', '验证码转发给我'],
    ['职工身份资料收集范围咨询', '心声诉求', '湖畔听雨', '身份证号码及住址'],
    ['建议规范银行卡信息登记流程', '建言献策', '山川有信', '个人银行卡号及密码'],
    ['人事档案线上流转安全建议', '业务交流', '晨光同行', '人事档案扫描件'],
    ['通讯录公开范围需要进一步明确', '心声诉求', '基层之声', '未经授权公开通讯录'],
    ['建议明确保密材料引用规范', '建言献策', '楚天新语', '保密协议全文'],
    ['关于项目验收材料真实性的提醒', '业务交流', '实干先锋', '代写虚假验收报告'],
    ['采购流程合规问题咨询', '心声诉求', '长江之声', '绕过招标程序'],
    ['建议加强财务票据合规教育', '建言献策', '供销青年', '虚开发票套现'],
    ['考核结果发布范围咨询', '心声诉求', '匿名用户', '擅自披露考核结果'],
    ['干部任免信息发布规范建议', '建言献策', '江城行者', '未公开干部任免名单'],
    ['单位内部资料外发审批建议', '业务交流', '合作之声', '涉密文件原件'],
    ['关于礼金登记和监督机制的建议', '心声诉求', '廉洁同行', '违规收受礼金']
  ].map(([title, board, author, term], index) => ({ id: `POST-DEMO-${String(index + 1).padStart(3, '0')}`, title, board, author, ...(author === '匿名用户' ? { authorId: 'staff', publicationMode: 'anonymous' } : {}), status: index < 12 ? '待审核' : index < 16 ? '已发布' : index < 18 ? '退回修改' : '已驳回', risk: '敏感词命中', sensitiveHits: [term], body: reviewBodyByTerm[term], time: `09月${String(13 - Math.floor(index / 5)).padStart(2, '0')}日 ${String(8 + index % 9).padStart(2, '0')}:15` }));
  const emptyEngagement = () => ({
    views: 0,
    uniqueViews: 0,
    uniqueViewAccounts: [],
    likes: 0,
    favorites: 0,
    shares: 0,
    historicComments: 0,
    likeUsers: [],
    favoriteUsers: [],
    shareChannels: { copy: 0, internal: 0, system: 0 },
    daily: []
  });
  const processBoards = new Set(['建言献策', '心声诉求']);
  const pendingAuditStatuses = new Set(['私密发布', '待审核']);
  const rejectedAuditStatuses = new Set(['退回修改', '已驳回']);
  const affairStatusMap = new Map([
    ['待分办', '待处理'], ['待处理', '待处理'],
    ['待承办确认', '处理中'], ['转办待接收', '处理中'], ['办理中', '处理中'], ['待复核', '处理中'], ['处理中', '处理中'],
    ['已反馈', '已回复'], ['已办结', '已回复'], ['已回复', '已回复']
  ]);
  const needsSensitiveReview = (post) => Array.isArray(post?.sensitiveHits) && post.sensitiveHits.length > 0;
  function deriveAuditStatus(post) {
    if (!needsSensitiveReview(post)) return '审核通过';
    if (post.contentAuditStatus) return post.contentAuditStatus;
    if (pendingAuditStatuses.has(post.status)) return '待审核';
    return rejectedAuditStatuses.has(post.status) ? '已驳回' : '审核通过';
  }
  function derivePublishStatus(post) {
    if (post.publishStatus) return post.publishStatus;
    if (post.status === '私密发布' || post.status === '已办结私密' || post.status === '已私密回复') return '私密发布';
    if (pendingAuditStatuses.has(post.status) || rejectedAuditStatuses.has(post.status) || post.status === '已隐藏') return '未发布';
    return '已发布';
  }
  function deriveWorkflowPublishStatus(post, affair) {
    if (post.publishStatus === '未发布' || post.status === '已隐藏') return '未发布';
    if (!needsSensitiveReview(post)) return '已发布';
    return derivePublishStatus(post);
  }
  function deriveHandlingStatus(post, affair) {
    if (!processBoards.has(post.board)) return '不适用';
    if (!affair) return deriveAuditStatus(post) === '审核通过' ? '待处理' : '不适用';
    return affairStatusMap.get(affair.status) || '处理中';
  }
  function normalizeWorkflowState(data) {
    let changed = false;
    for (const affair of data.affairs || []) {
      const normalizedStatus = affairStatusMap.get(affair.status) || '处理中';
      if (affair.status !== normalizedStatus) { affair.status = normalizedStatus; changed = true; }
      if (affair.assignmentState !== normalizedStatus) { affair.assignmentState = normalizedStatus; changed = true; }
      if (!affair.createdAt) { affair.createdAt = affair.reviewedAt || affair.events?.[0]?.at || '2026-09-14 09:00'; changed = true; }
      if (!Array.isArray(affair.events)) { affair.events = []; changed = true; }
      if (!affair.category) { affair.category = affair.sourceType === '心声诉求' ? '服务诉求' : '改进建议'; changed = true; }
      if (!Array.isArray(affair.topicTags)) { affair.topicTags = []; changed = true; }
      if (typeof affair.isKey !== 'boolean') { affair.isKey = ['重点', '紧急'].includes(affair.priority); changed = true; }
      if (typeof affair.isCommon !== 'boolean') { affair.isCommon = false; changed = true; }
      if (!affair.internalNote) { affair.internalNote = affair.requirements || ''; changed = true; }
      if (affair.status === '已回复' && !affair.repliedAt) { affair.repliedAt = affair.closedAt || affair.events.at(-1)?.at || affair.createdAt; changed = true; }
      for (const event of affair.events) {
        const text = String(event.text || '')
          .replace(/已分办[^，。]*/g, '事项已完成分类')
          .replace('承办结果已提交，等待分办审核', '事项正在整理回复')
          .replace('承办结果已提交，等待答复审核', '事项正在整理回复')
          .replace(/答复审核通过并办结/g, '已向用户发送正式回复');
        if (event.text !== text) { event.text = text; changed = true; }
      }
    }
    for (const post of data.posts || []) {
      const affair = (data.affairs || []).find((item) => String(item.postId) === String(post.id));
      const contentAuditStatus = deriveAuditStatus(post);
      const publishStatus = deriveWorkflowPublishStatus(post, affair);
      const handlingStatus = deriveHandlingStatus(post, affair);
      if (post.contentAuditStatus !== contentAuditStatus) { post.contentAuditStatus = contentAuditStatus; changed = true; }
      if (post.publishStatus !== publishStatus) { post.publishStatus = publishStatus; changed = true; }
      if (!needsSensitiveReview(post) && publishStatus === '已发布' && post.status !== '已发布') { post.status = '已发布'; changed = true; }
      if (post.handlingStatus !== handlingStatus) { post.handlingStatus = handlingStatus; changed = true; }
    }
    return changed;
  }
  function nextAffairNumber(data) {
    const stamp = new Date().toLocaleDateString('sv-SE').slice(0, 7).replace('-', '');
    const max = (data.affairs || []).reduce((value, affair) => {
      const match = String(affair.id || '').match(/-(\d+)$/);
      return Math.max(value, match ? Number(match[1]) : 0);
    }, 79);
    return `SX-${stamp}-${String(max + 1).padStart(3, '0')}`;
  }
  function ensureApprovedAffairs(data) {
    let changed = false;
    for (const post of data.posts || []) {
      if (!processBoards.has(post.board) || deriveAuditStatus(post) !== '审核通过') continue;
      if ((data.affairs || []).some((affair) => String(affair.postId) === String(post.id))) continue;
      const createdAt = post.reviewedAt || post.updatedAt || post.createdAt || post.time || '2026-09-14 09:00';
      const id = nextAffairNumber(data);
      data.affairs.unshift({
        id, postId: post.id, title: post.title, sourceType: post.board,
        auditStatus: '审核通过', reviewedAt: createdAt, createdAt,
        category: post.board === '心声诉求' ? '服务诉求' : '改进建议', topicTags: [], isKey: false, isCommon: false, internalNote: '',
        feedback: '', status: '待处理', assignmentState: '待处理', draft: '', repliedAt: '',
        events: [{ text: `内容发布后自动生成待处理事项 ${id}`, at: createdAt }]
      });
      post.handlingStatus = '待处理';
      changed = true;
    }
    return changed;
  }
  function isPublicPost(post) {
    return Boolean(post) && post.enabled !== false && post.deleted !== true
      && deriveAuditStatus(post) === '审核通过' && derivePublishStatus(post) === '已发布';
  }
  function isPublicEcho(publication, data) {
    if (publication?.status !== '已发布') return false;
    const source = data.posts.find((post) => String(post.id) === String(publication.sourcePostId));
    return !source || !['建言献策', '心声诉求'].includes(source.board) || isPublicPost(source);
  }
  function reconcileProcessingPosts(data) {
    let changed = normalizeWorkflowState(data);
    if (ensureApprovedAffairs(data)) changed = true;
    for (const affair of data.affairs) {
      const post = data.posts.find((item) => String(item.id) === String(affair.postId));
      if (!post || !processBoards.has(post.board)) continue;
      if (!post.processingAccepted) { post.processingAccepted = true; changed = true; }
      const handlingStatus = deriveHandlingStatus(post, affair);
      if (post.handlingStatus !== handlingStatus) { post.handlingStatus = handlingStatus; changed = true; }
      if (affair.status === '已回复') {
        post.replyVisibility = affair.feedback === '公开答复' ? '公开可见' : '仅个人可见';
        post.reply = affair.draft || '';
      }
    }
    return normalizeWorkflowState(data) || changed;
  }
  const engagementSeeds = {
    1: { views: 326, uniqueViews: 248, likes: 42, favorites: 16, shares: 9, historicComments: 18 },
    2: { views: 241, uniqueViews: 190, likes: 27, favorites: 9, shares: 5, historicComments: 9 },
    3: { views: 518, uniqueViews: 401, likes: 65, favorites: 34, shares: 14, historicComments: 22 },
    15: { views: 116, uniqueViews: 93, likes: 8, favorites: 3, shares: 1, historicComments: 2 }
  };
  function seededEngagement(postId) {
    const seed = engagementSeeds[postId];
    if (!seed) return emptyEngagement();
    const recentUsers = [
      { accountId: 'demo-liu', name: '刘芳', department: '合作指导处', at: '2026-09-13 16:42' },
      { accountId: 'demo-zhou', name: '周凯', department: '信息中心', at: '2026-09-13 15:18' },
      { accountId: 'demo-wu', name: '吴静', department: '经济发展处', at: '2026-09-12 10:36' }
    ];
    return {
      ...emptyEngagement(),
      ...seed,
      likeUsers: recentUsers.map((item) => ({ ...item })),
      favoriteUsers: recentUsers.slice(0, 2).map((item) => ({ ...item, at: '2026-09-12 09:20' })),
      shareChannels: (() => {
        const copy = Math.max(0, seed.shares - 4);
        const internal = Math.min(3, seed.shares - copy);
        return { copy, internal, system: Math.max(0, seed.shares - copy - internal) };
      })(),
      daily: [
        { date: '2026-09-10', views: Math.round(seed.views * .24), likes: Math.round(seed.likes * .2), comments: Math.round(seed.historicComments * .2), favorites: Math.round(seed.favorites * .2), shares: Math.round(seed.shares * .2) },
        { date: '2026-09-11', views: Math.round(seed.views * .31), likes: Math.round(seed.likes * .3), comments: Math.round(seed.historicComments * .3), favorites: Math.round(seed.favorites * .3), shares: Math.round(seed.shares * .3) },
        { date: '2026-09-12', views: Math.round(seed.views * .27), likes: Math.round(seed.likes * .28), comments: Math.round(seed.historicComments * .28), favorites: Math.round(seed.favorites * .28), shares: Math.round(seed.shares * .28) },
        { date: '2026-09-13', views: Math.round(seed.views * .18), likes: Math.round(seed.likes * .22), comments: Math.round(seed.historicComments * .22), favorites: Math.round(seed.favorites * .22), shares: Math.round(seed.shares * .22) }
      ]
    };
  }
  function ensureEngagement(post) {
    const source = post.engagement || seededEngagement(post.id);
    const fallback = emptyEngagement();
    post.engagement = {
      ...fallback,
      ...source,
      uniqueViewAccounts: Array.isArray(source.uniqueViewAccounts) ? source.uniqueViewAccounts : [],
      likeUsers: Array.isArray(source.likeUsers) ? source.likeUsers : [],
      favoriteUsers: Array.isArray(source.favoriteUsers) ? source.favoriteUsers : [],
      shareChannels: { ...fallback.shareChannels, ...(source.shareChannels || {}) },
      daily: Array.isArray(source.daily) ? source.daily : []
    };
    return post.engagement;
  }
  const mockPostTitles = [
    '建议建立基层社项目申报材料共享专区', '关于优化职工培训报名流程的建议', '农产品品牌联合推广经验交流', '建议完善县域配送线路信息公示',
    '关于增加青年职工业务交流活动的建议', '再生资源回收网点运营经验分享', '建议统一直属企业采购信息模板', '关于完善职工书屋借阅服务的建议',
    '农业社会化服务项目台账整理方法', '建议开展基层网点数字化工具培训', '关于优化会议室预约流程的建议', '县域流通服务网络建设案例分享',
    '建议建立跨部门政策答疑协作机制', '关于完善困难职工帮扶申请指引的建议', '冷链仓储日常安全检查经验交流', '建议增加供销品牌产品展示活动',
    '关于优化差旅报销材料清单的建议', '基层社电商直播运营经验分享', '建议建立重点项目进度共享看板', '关于完善职工意见反馈闭环的建议'
  ];
  const mockPosts = mockPostTitles.map((title, index) => {
    const board = ['建言献策', '心声诉求', '业务交流'][index % 3];
    const status = board !== '业务交流' && index % 4 === 0 ? '私密发布' : '已发布';
    return { id: `POST-CONTENT-${String(index + 1).padStart(3, '0')}`, title, board, author: ['楚天同行', '供销青年', '江城之声', '基层实践者'][index % 4], status, enabled: index !== 17, deleted: false, risk: index % 7 === 0 ? '需核验' : '低风险', body: `${title}，建议结合现有工作流程明确责任部门、办理节点和反馈方式，形成可查询、可跟踪的工作记录。`, time: `09月${String(13 - Math.floor(index / 4)).padStart(2, '0')}日 ${String(9 + index % 8).padStart(2, '0')}:20`, engagement: { ...emptyEngagement(), views: 86 + index * 17, uniqueViews: 62 + index * 13, likes: 6 + index * 2, favorites: 2 + index % 9, shares: 1 + index % 6, historicComments: 3 + index % 12 } };
  });
  const noticeTitles = ['中秋国庆期间值班安排通知', '全省供销系统业务培训报名通知', '职工健康体检时间安排', '网络安全宣传周活动通知', '农业社会化服务专题讲座通知', '直属单位财务人员培训通知', '机关办公区消防演练通知', '年度职工摄影作品征集通知', '县域流通服务体系交流会通知', '再生资源业务专题研讨通知', '青年理论学习小组活动通知', '供销品牌产品展示活动通知', '项目申报材料报送提醒', '职工书屋新书推荐活动通知', '档案管理专项检查通知', '数据安全自查工作通知', '基层社负责人座谈会通知', '冬季安全生产检查通知', '年度工作总结报送通知', '职工交流平台使用意见征集'];
  const noticeAudience = { '全体职工': 2468, '省社本级': 386, '直属企业': 1280 };
  const mockNotices = noticeTitles.map((title, index) => {
    const scope = ['全体职工', '省社本级', '直属企业'][index % 3];
    const targetCount = noticeAudience[scope];
    return { id: `GG-MOCK-${String(index + 1).padStart(3, '0')}`, title, body: `${title}相关安排已确定，请各处室和直属单位按要求组织人员参加，并于规定时间前完成反馈。`, scope, status: '已发布', targetCount, successCount: Math.max(0, targetCount - index % 5), publishedAt: `2026-09-${String(14 - Math.floor(index / 2)).padStart(2, '0')} ${index % 2 ? '14:30' : '09:00'}` };
  });
  const policyTitles = ['农业社会化服务项目管理指引', '县域流通服务网络建设工作要点', '再生资源回收体系建设政策解读', '供销合作社项目资金管理规范', '直属企业采购管理操作指引', '基层社规范化建设评价办法', '农产品品牌培育工作指南', '冷链物流项目验收资料指引', '职工教育培训管理办法', '数据分类分级管理工作指引'];
  const mockPolicies = policyTitles.map((title, index) => ({ id: `POLICY-MOCK-${String(index + 1).padStart(3, '0')}`, title, category: ['为农服务', '项目管理', '综合改革', '内部管理'][index % 4], department: ['合作指导处', '经济发展处', '财务资产处', '信息中心'][index % 4], summary: `${title}的适用范围、办理流程、材料要求和责任分工摘要。`, body: `${title}用于统一相关工作的办理口径，明确申请条件、工作流程、材料清单、审核要求和归档规范。`, status: '已发布', publishedAt: `2026-09-${String(12 - index).padStart(2, '0')}` }));
  const questionTitles = ['基层社项目申报需要哪些前置条件？', '农业社会化服务台账应保留多久？', '跨部门共享数据需要履行什么程序？', '直属企业采购计划如何备案？', '职工培训报名后如何变更人员？', '冷链项目验收需准备哪些影像资料？', '供销品牌产品如何申请展示推荐？', '困难职工帮扶申请需要哪些证明？', '匿名发帖后平台是否可以查看身份？', '已公开答复存在错误如何申请更正？'];
  const mockQuestions = questionTitles.map((title, index) => ({ id: `QUESTION-MOCK-${String(index + 1).padStart(3, '0')}`, title, category: ['项目申报', '业务办理', '数据管理', '平台使用'][index % 4], department: ['经济发展处', '合作指导处', '信息中心', '平台管理组'][index % 4], answer: index < 7 ? `关于“${title}”，请按照现行制度准备相关材料，经所属部门审核后通过规定流程提交，具体以最新通知为准。` : '', status: index < 7 ? '已发布' : '待答复', submittedAt: `2026-09-${String(13 - index).padStart(2, '0')}`, answeredAt: index < 7 ? `2026-09-${String(14 - index).padStart(2, '0')}` : '' }));
  const mockRectificationPublications = [
    ['基层报销材料重复提交问题整改情况', '财务管理', '财务资产处', '针对线上审批后仍重复提交纸质材料的问题，已统一材料留存口径。', '线上审核通过后不再重复收取相同纸质附件，原始票据按归档要求留存。', '修订报销材料清单并完成经办人员培训。', '已完成', '已发布', '2026-09-12'],
    ['项目申报结果反馈不及时问题整改进展', '项目申报', '经济发展处', '针对项目申报结果反馈节点不统一的问题，推进受理和反馈时限标准化。', '已明确受理、初审和结果反馈三个节点的办理时限。', '建立节点提醒和逾期督办机制，并按周检查执行情况。', '整改中', '已发布', '2026-09-10'],
    ['职工培训学时登记口径不统一整改情况', '教育培训', '人事处', '统一直属单位培训学时认定、补录和查询规则。', '已发布统一登记表和学时认定说明。', '完成历史数据核对，设置季度抽查机制。', '已完成', '已发布', '2026-09-08'],
    ['基层网点业务系统账号开通较慢整改进展', '信息化服务', '信息中心', '优化基层网点业务系统账号申请、审核和开通流程。', '已将平均开通时间由五个工作日压缩至两个工作日。', '上线标准申请模板，增加超时提醒和办理进度查询。', '整改中', '草稿', '']
  ].map(([title, category, department, summary, result, measure, progress, status, publishedAt], index) => ({ id: `RECT-PUB-MOCK-${String(index + 1).padStart(3, '0')}`, title, category, department, summary, result, measure, progress, status, publishedAt }));
  const mockStaffQuestions = [
    { id: 'QUESTION-STAFF-DEMO-1', title: '项目申报材料能否使用电子签章？', category: '项目申报', department: '待分办', body: '近期准备基层社项目申报材料，想确认实施方案和承诺书是否可以使用电子签章提交。', answer: '', status: '待答复', submittedAt: '2026-09-14', answeredAt: '', authorId: 'staff', authorName: '张晓雨', anonymous: false, sourceType: '职工提问', needRectification: false, rectificationId: '' },
    { id: 'QUESTION-STAFF-DEMO-2', title: '培训报名后如何调整参训人员？', category: '教育培训', department: '人事处', body: '原报名人员临时无法参加，已更换一名同岗位同事，请问需要在哪个入口修改信息？', answer: '请在培训报名截止前联系组织处室管理员，由管理员在报名名单中完成替换；超过截止时间的，请提交情况说明后办理。', status: '答复中', submittedAt: '2026-09-12', answeredAt: '', authorId: 'staff', authorName: '张晓雨', anonymous: false, sourceType: '职工提问', needRectification: false, rectificationId: '' },
    { id: 'QUESTION-STAFF-DEMO-3', title: '差旅报销是否需要重复提交纸质附件？', category: '财务管理', department: '财务资产处', body: '线上已经上传审批单和行程凭证，线下报销时是否还需要再次提交完整纸质材料？', answer: '线上材料通过审核后，原则上不再重复提交相同纸质附件；原始票据及确需留存的凭证仍按财务归档要求办理。', status: '已发布', submittedAt: '2026-09-09', answeredAt: '2026-09-10', authorId: 'staff', authorName: '张晓雨', anonymous: false, sourceType: '职工提问', needRectification: false, rectificationId: '' },
    { id: 'QUESTION-STAFF-DEMO-4', title: '项目申报结果反馈时间不统一怎么办？', category: '项目申报', department: '经济发展处', body: '不同项目的结果反馈时间差异较大，基层社难以安排后续工作，建议明确统一反馈节点。', answer: '该问题已纳入项目申报流程优化范围，后续将统一受理、初审和结果反馈时限，并在办理进展中公开整改情况。', status: '已发布', submittedAt: '2026-09-06', answeredAt: '2026-09-08', authorId: 'staff', authorName: '张晓雨', anonymous: false, sourceType: '职工提问', needRectification: true, rectificationId: 'ZG-DEMO-QUESTION-1' }
  ];
  const echoTitles = ['关于基层项目申报材料共享建议的答复', '关于职工培训报名流程优化的答复', '关于农产品品牌联合推广建议的答复', '关于县域配送线路公示建议的答复', '关于青年职工交流活动建议的答复', '关于再生资源网点运营问题的答复', '关于采购信息模板统一建议的答复', '关于职工书屋服务建议的答复', '关于项目台账整理问题的答复', '关于数字化工具培训建议的答复', '关于会议室预约流程建议的答复', '关于县域流通网络建设问题的答复', '关于政策答疑协作机制建议的答复', '关于困难职工帮扶指引的答复', '关于冷链仓储安全检查问题的答复', '关于供销品牌展示活动建议的答复', '关于差旅报销材料清单的答复', '关于基层社电商运营问题的答复', '关于重点项目进度共享建议的答复', '关于职工意见反馈闭环建议的答复'];
  const mockEchoPublications = echoTitles.map((title, index) => ({ id: `ECHO-MOCK-${String(index + 1).padStart(3, '0')}`, affairId: `SX-MOCK-${String(index + 1).padStart(3, '0')}`, sourcePostId: 1001 + index, title, body: `针对相关职工建议，责任部门已完成情况核实并形成改进措施。后续将按计划推进落实，并通过平台持续反馈办理进展。`, scope: ['全体职工', '省社本级', '直属企业'][index % 3], status: index % 7 === 6 ? '已撤回' : '已发布', publishedAt: `09月${String(14 - Math.floor(index / 3)).padStart(2, '0')}日 ${String(9 + index % 7).padStart(2, '0')}:10`, engagement: { ...emptyEngagement(), views: 120 + index * 19, uniqueViews: 90 + index * 14, likes: 8 + index * 2, favorites: 3 + index % 8, shares: 2 + index % 5, historicComments: 4 + index % 10 } }));
  const processMockPosts = mockPosts.filter((post) => ['建言献策', '心声诉求'].includes(post.board));
  const mockAffairs = processMockPosts.map((post, index) => {
    const departments = ['经济发展处', '办公室', '合作指导处'];
    const people = [['handler', '陈凯'], ['handler-office', '刘敏'], ['handler-cooperation', '周磊']];
    const statuses = ['办理中', '办理中', '办理中', '办理中', '待复核', '已反馈', '已办结'];
    const status = statuses[index % statuses.length];
    const person = people[index % people.length];
    const deadline = `2026-09-${String(16 + (index % 12)).padStart(2, '0')}`;
    const affair = { id: `SX-MOCK-${String(index + 1).padStart(3, '0')}`, postId: post.id, title: post.title, owner: departments[index % departments.length], initialOwner: departments[index % departments.length], co: departments[(index + 1) % departments.length], deadline, priority: index % 5 === 0 ? '紧急' : index % 3 === 0 ? '重点' : '一般', feedback: index % 4 === 0 ? '私密回复' : '公开答复', status, assignmentState: status, assigneeId: person[0], assigneeName: person[1], requirements: '请核实具体情况，形成办理措施并按时提交答复。', stage: status === '已办结' ? '形成正式答复' : ['调查核实', '制定措施', '等待协同反馈'][index % 3], progress: `已完成第 ${index % 3 + 1} 阶段核实，正在整理办理意见。`, draft: ['待复核', '已反馈', '已办结'].includes(status) ? `关于${post.title}的办理答复：已完成情况核实并提出改进措施。` : '', extension: null, returnReason: status === '办理中' && index % 6 === 0 ? '请补充协同部门反馈和完成时限。' : '', transfer: null, events: [{ text: `已分办至${departments[index % departments.length]} · ${person[1]}，直接进入办理中`, at: `09月${String(14 - index % 5).padStart(2, '0')} 09:20` }] };
    return affair;
  });
  // POST-FLOW-I/V/E: overdue derives from deadline; exchange cases never create affairs.
  const flowCases = [
    { id: 'POST-FLOW-I-01', board: '建言献策', title: '基层网点供需清单共享建议', body: '建议按地区和品类汇总基层网点的农产品供需清单，定期更新联系人和有效期。', status: '待审核', at: '2026-09-14 09:20' },
    { id: 'POST-FLOW-I-02', board: '建言献策', title: '项目申报材料共享范围建议', body: '建议将已公开的申报模板按项目类型整理，避免各单位反复索取历史表格。', status: '已驳回', reason: '请明确拟共享材料的来源和可公开范围，避免包含内部审批附件。', at: '2026-09-13 10:15' },
    { id: 'POST-FLOW-I-03', board: '建言献策', title: '跨区域品牌推广活动协作建议', body: '建议联合市州社开展品牌推广，统一报名表、活动日程和效果统计口径。', status: '办理中', at: '2026-09-12 09:10', affair: { owner: '合作指导处', assigneeId: 'handler-cooperation', assigneeName: '周磊', deadline: '2026-09-28', stage: '制定措施', progress: '已与两个市州社沟通活动时间，正在拟定协作方案。', extension: { status: '已批准', deadline: '2026-09-28', reason: '协同部门反馈需要补充办理时限。' } } },
    { id: 'POST-FLOW-I-04', board: '建言献策', title: '农产品采购需求更新频率建议', body: '建议采购需求每周更新一次，并标明需求变更时间，方便基层网点及时供货。', status: '办理中', at: '2026-09-11 08:30', affair: { owner: '经济发展处', assigneeId: 'handler', assigneeName: '陈凯', deadline: '2026-09-12', stage: '等待协同反馈', progress: '已收集采购部门意见，仍待确定统一更新频率。' } },
    { id: 'POST-FLOW-I-05', board: '建言献策', title: '社有企业经验案例库建设建议', body: '建议汇总社有企业的经营案例，并建立分类检索和年度更新机制。', status: '已处理-分办审核', at: '2026-09-10 11:40', affair: { owner: '合作指导处', assigneeId: 'handler-cooperation', assigneeName: '周磊', deadline: '2026-09-20', stage: '形成正式答复', progress: '案例目录和维护规则已完成。', draft: '已确定案例库首批收录范围，并安排专人按季度核对更新。' } },
    { id: 'POST-FLOW-I-06', board: '建言献策', title: '县域冷链验收影像归档建议', body: '建议为县域冷链验收制定影像资料目录，统一现场照片的命名和归档要求。', status: '已办结公开', at: '2026-09-09 14:00', affair: { owner: '经济发展处', assigneeId: 'handler', assigneeName: '陈凯', deadline: '2026-09-18', draft: '已发布冷链验收影像资料目录，明确拍摄节点、命名规则和归档责任。', feedback: '公开答复' } },
    { id: 'POST-FLOW-I-07', board: '建言献策', title: '直属企业内部台账复用建议', body: '建议在直属企业内部复用经过审批的项目台账字段，减少重复填报。', status: '已办结私密', at: '2026-09-08 09:45', affair: { owner: '办公室', assigneeId: 'handler-office', assigneeName: '刘敏', deadline: '2026-09-17', draft: '已向提交人提供内部台账调整方案和适用单位名单。', feedback: '私密回复' } },
    { id: 'POST-FLOW-V-01', board: '心声诉求', title: '机关办公区午间休息空间需求', body: '近期午间休息空间不足，希望核实空闲会议室是否可在规定时段开放。', status: '待审核', at: '2026-09-14 10:40' },
    { id: 'POST-FLOW-V-02', board: '心声诉求', title: '职工体检预约时间冲突反馈', body: '部分岗位需要值班，希望允许按批次调整体检预约时间。', status: '已驳回', reason: '请补充预约批次和冲突日期，便于核实调整。', at: '2026-09-13 15:35' },
    { id: 'POST-FLOW-V-03', board: '心声诉求', title: '机关食堂餐食标识不清反馈', body: '希望在供餐区标注主要原料和适用人群，方便有饮食限制的职工选择。', status: '办理中', at: '2026-09-12 14:25', affair: { owner: '办公室', assigneeId: 'handler-office', assigneeName: '刘敏', deadline: '2026-09-23', stage: '调查核实', progress: '已与机关服务中心核对当前标识，正在整理补充方案。' } },
    { id: 'POST-FLOW-V-04', board: '心声诉求', title: '基层社培训报名反馈滞后', body: '提交培训报名后一直未收到确认，希望及时说明审核结果和候补安排。', status: '办理中', at: '2026-09-11 16:10', affair: { owner: '办公室', assigneeId: 'handler-office', assigneeName: '刘敏', deadline: '2026-09-11', stage: '等待协同反馈', progress: '已核对报名名单，正在等待培训组织方确认候补人数。' } },
    { id: 'POST-FLOW-V-05', board: '心声诉求', title: '职工通勤线路调整反馈', body: '希望核查部分站点的班车到站时间，并优化晚间通勤线路。', status: '已处理-分办审核', at: '2026-09-10 09:35', affair: { owner: '办公室', assigneeId: 'handler-office', assigneeName: '刘敏', deadline: '2026-09-19', stage: '形成正式答复', progress: '线路调查已结束。', draft: '拟调整晚班车经停站点，并在试运行后收集职工反馈。' } },
    { id: 'POST-FLOW-V-06', board: '心声诉求', title: '职工书屋借阅时段调整请求', body: '建议延长每周两天的借阅时段，让外勤岗位职工也能使用职工书屋。', status: '已办结公开', at: '2026-09-09 10:05', affair: { owner: '办公室', assigneeId: 'handler-office', assigneeName: '刘敏', deadline: '2026-09-18', draft: '职工书屋周二、周四借阅时间已延长至 18:30，并向全体职工公告。', feedback: '公开答复' } },
    { id: 'POST-FLOW-V-07', board: '心声诉求', title: '个人帮扶申请材料咨询', body: '希望了解帮扶申请的证明材料和个人信息的保密处理方式。', status: '已办结私密', at: '2026-09-08 13:20', affair: { owner: '办公室', assigneeId: 'handler-office', assigneeName: '刘敏', deadline: '2026-09-16', draft: '已向提交人单独说明材料清单和保密提交渠道。', feedback: '私密回复' } },
    { id: 'POST-FLOW-E-01', board: '业务交流', title: '农资集配订单核对方法交流', body: '分享订单、出库和签收三个节点的对账经验，欢迎补充不同网点的做法。', status: '待审核', at: '2026-09-14 11:25' },
    { id: 'POST-FLOW-E-02', board: '业务交流', title: '冷链设备巡检经验分享', body: '整理冷链设备的日常巡检步骤和故障登记方式，供项目组参考。', status: '已驳回', reason: '请删除未经确认的设备编号，并补充适用项目范围后重新提交。', at: '2026-09-13 09:55' },
    { id: 'POST-FLOW-E-03', board: '业务交流', title: '县域配送车辆调度复盘', body: '根据驳回意见删去了内部车辆信息，补充了调度节点和沟通顺序。', status: '待审核', at: '2026-09-12 10:30', history: [{ text: '因包含内部车辆编号被驳回', at: '09/11 16:20' }, { text: '原帖修改后重新提交', at: '09/12 10:30' }] },
    { id: 'POST-FLOW-E-04', board: '业务交流', title: '再生资源回收网点分类运营案例', body: '介绍网点按回收品类分区、每周复盘库存和错峰调度的具体做法。', status: '已发布', at: '2026-09-10 15:20', history: [{ text: '分办人员审核通过，原帖公开发布', at: '09/11 09:40' }] }
  ];
  const flowPosts = flowCases.map((item) => ({
    id: item.id, board: item.board, title: item.title, body: item.body, status: item.status,
    reason: item.reason || '', author: '张晓雨', authorId: 'staff', publicationMode: 'real',
    processingAccepted: Boolean(item.affair), replyVisibility: item.affair?.feedback === '公开答复' ? '公开可见' : item.affair?.feedback === '私密回复' ? '仅个人可见' : '',
    createdAt: item.id === 'POST-FLOW-E-03' ? '2026-09-11 14:00' : item.at, updatedAt: item.at,
    time: `${item.at.slice(5, 7)}/${item.at.slice(8, 10)} ${item.at.slice(11, 16)}`,
    history: item.history || (item.reason ? [{ text: `分办人员驳回：${item.reason}`, at: `${item.at.slice(5, 7)}/${item.at.slice(8, 10)} 17:10` }] : item.affair ? [{ text: '分办人员确认需要办理', at: `${item.at.slice(5, 7)}/${item.at.slice(8, 10)} 17:00` }] : []),
    risk: '低风险', sensitiveHits: [], allowComments: true, enabled: true, deleted: false, engagement: emptyEngagement()
  }));
  const flowAffairs = flowCases.filter((item) => item.affair).map((item) => {
    const detail = item.affair, closed = Boolean(detail.feedback), review = item.status === '已处理-分办审核';
    const submittedDay = `${item.at.slice(5, 7)}/${item.at.slice(8, 10)}`;
    return {
      id: `SX-FLOW-${item.id.slice(-4)}`, postId: item.id, title: item.title,
      owner: detail.owner, initialOwner: detail.owner, assigneeId: detail.assigneeId, assigneeName: detail.assigneeName,
      deadline: detail.deadline, priority: '一般', requirements: `核实“${item.title}”并形成办理结果。`,
      feedback: detail.feedback || '', status: closed ? '已办结' : review ? '待复核' : '办理中',
      assignmentState: closed ? '已办结' : review ? '待复核' : '办理中',
      stage: detail.stage || (closed ? '形成正式答复' : '调查核实'), progress: detail.progress || '', draft: detail.draft || '',
      extension: null, transfer: null, events: [
        { text: `已交由${detail.assigneeName}办理`, at: `${submittedDay} 17:00` },
        ...(detail.progress ? [{ text: detail.progress, at: `${submittedDay} 18:20` }] : []),
        ...(review ? [{ text: '承办结果已提交，等待答复审核', at: '09/14 09:10' }] : []),
        ...(closed ? [{ text: `答复审核通过并办结 · ${detail.feedback}`, at: '09/15 10:30' }] : [])
      ]
    };
  });
  const bannerImages = [
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=76',
    'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=76',
    'https://images.unsplash.com/photo-1530507629858-e4977d30e9e8?auto=format&fit=crop&w=1200&q=76',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=76',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=76'
  ];
  const mockBanners = Array.from({ length: 20 }, (_, index) => {
    const type = ['post', 'notice', 'policy'][index % 3];
    const targetId = type === 'post' ? mockPosts[index % 13].id : type === 'notice' ? mockNotices[index].id : mockPolicies[index % 8].id;
    return { id: `BANNER-MOCK-${String(index + 1).padStart(3, '0')}`, title: ['为农服务工作动态', '职工通知及时知晓', '政策要点专题解读', '基层实践经验分享'][index % 4], summary: `聚焦全省供销系统重点工作与职工关切，展示第 ${index + 1} 期推荐内容。`, image: bannerImages[index % bannerImages.length], type, targetId, url: '', sort: index + 1, enabled: index % 6 !== 5, createdAt: `2026-09-${String(14 - Math.floor(index / 3)).padStart(2, '0')} 09:00` };
  });
  function appendUntil(collection, candidates, predicate, target = 20) {
    for (const candidate of candidates) {
      if (collection.filter(predicate).length >= target) break;
      if (!collection.some((item) => String(item.id) === String(candidate.id))) collection.push({ ...candidate });
    }
  }
  const initial = () => ({
    flowFixtureVersion: 2,
    posts: [
      { id: 1, title: '建议建立农产品产销信息跨单位共享机制', board: '建言献策', author: '山野微风', status: '已发布', risk: '低风险', body: '建议由合作指导处牵头建立按周更新的农产品供需清单，统一品类、数量、交付区域和有效期。', time: '09月11日 09:24' },
      { id: 2, title: '关于优化机关食堂晚餐供应时段的建议', board: '心声诉求', author: '一盏清茶', status: '已发布', risk: '需核验', body: '希望结合实际用餐数据适当调整晚餐时段。', time: '09月11日 08:47' },
      { id: 3, title: '县域冷链项目验收资料整理经验分享', board: '业务交流', author: '江城行者', status: '已发布', risk: '低风险', sensitiveHits: [], body: '分享县域冷链项目验收材料目录和常见退回原因。', time: '09月10日 11:06' },
      { id: 15, title: '关于基层网点联系方式展示的意见', board: '心声诉求', author: '匿名用户', authorId: 'staff', publicationMode: 'anonymous', status: '待审核', risk: '个人信息', sensitiveHits: ['个人信息'], body: '建议完善基层网点联系方式展示规则，并注意保护个人信息。', time: '09月10日 09:10' },
      ...demoReviewPosts,
      ...flowPosts,
      ...mockPosts.slice(0, 13)
    ].map((post) => ({ ...post, enabled: true, deleted: false, engagement: seededEngagement(post.id) })),
    affairs: [
      { id: 'SX-202609-079', postId: 2, title: '关于优化机关食堂晚餐供应时段的建议', owner: '办公室', co: '机关服务中心', deadline: '2026-09-18', priority: '一般', feedback: '公开答复', status: '办理中', stage: '调查核实', requirements: '核实晚餐实际用餐量并提出调整方案。', progress: '正在结合用餐数据研究调整方案', draft: '', extension: null, events: [{ text: '已分办至办公室', at: '09月11日 10:12' }] },
      ...flowAffairs,
      ...mockAffairs
    ],
    comments: demoComments.map((item) => ({ ...item })), reports: demoReports.map((item) => ({ ...item })), notices: mockNotices.map((item) => ({ ...item })), banners: mockBanners.map((item) => ({ ...item })), traceRequests: [
      { id: 'TR-202609-001', postId: 15, applicantId: 'admin', applicant: '王敏', department: '平台管理组', reason: '核查疑似个人信息发布来源，联系发帖人确认授权范围。', submittedAt: '2026-09-17 09:20', status: '待审核', viewCount: 0 }
    ], rectifications: [], rectificationPublications: mockRectificationPublications.map((item) => ({ ...item })),
    policies: [
      { id: 'policy-admin-1', title: '湖北省供销合作社系统农业社会化服务工作指引', category: '为农服务', department: '合作指导处', summary: '明确服务主体、服务内容、项目实施和台账管理要求。', body: '围绕农业社会化服务项目实施，统一服务流程、质量要求和资料归档口径。', status: '已发布', publishedAt: '2026-09-08' },
      { id: 'policy-admin-2', title: '基层社项目申报操作指引（2026 年版）', category: '项目申报', department: '经济发展处', summary: '梳理项目申报条件、材料清单、审核节点及反馈方式。', body: '申报单位应按年度通知准备申报表、实施方案、资金预算和必要证明材料。', status: '已发布', publishedAt: '2026-09-03' },
      ...mockPolicies.slice(0, 8)
    ],
    questions: [
      { id: 'question-admin-1', title: '基层社项目申报需要准备哪些材料？', category: '项目申报', department: '经济发展处', answer: '申报单位应提交项目申报表、实施方案、资金预算及必要的资质证明材料。', status: '已发布', submittedAt: '2026-09-07', answeredAt: '2026-09-08' },
      { id: 'question-admin-2', title: '跨单位共享业务数据应履行什么手续？', category: '数据管理', department: '信息中心', answer: '', status: '待答复', submittedAt: '2026-09-12', answeredAt: '' },
      ...mockQuestions.slice(0, 8)
    ],
    echoPublications: mockEchoPublications.map((item) => ({ ...item })),
    accounts: [
      { id: 'staff', phone: '13800002026', name: '张晓雨', department: '合作指导处', status: 'approved', role: 'staff', createdAt: '2026-09-10 09:00' },
      { id: 'handler', phone: '13600002026', name: '陈凯', department: '经济发展处', status: 'approved', role: 'handler', createdAt: '2026-09-10 09:00' },
      { id: 'handler-office', phone: '13600002027', name: '刘敏', department: '办公室', status: 'approved', role: 'handler', createdAt: '2026-09-14 09:00' },
      { id: 'handler-cooperation', phone: '13600002028', name: '周磊', department: '合作指导处', status: 'approved', role: 'handler', createdAt: '2026-09-14 09:00' },
      { id: 'admin', phone: '13500002026', name: '王敏', department: '平台管理组', status: 'approved', role: 'platform', createdAt: '2026-09-10 09:00' },
      { id: 'leader', phone: '18800002026', name: '李建国', department: '省社机关', status: 'approved', role: 'leader', createdAt: '2026-09-10 09:00' },
      { id: 'pending', phone: '13900002026', name: '周宁', department: '合作指导处', status: 'pending', role: 'staff', submitted: '2026-09-10 09:36', createdAt: '2026-09-10 09:36' },
      { id: 'rejected', phone: '13700002026', name: '孙晨', department: '经济发展处', status: 'rejected', role: 'staff', submitted: '2026-09-09 14:18', createdAt: '2026-09-09 14:18' }
    ], audit: [], loginLogs: [],
    roles: [
      { id: 'platform', name: '平台管理员', key: 'platform', scope: '全部数据', canViewRealIdentity: true, sort: 1, enabled: true, createdAt: '2026-09-10 09:00', fixed: true },
      { id: 'content', name: '内容管理员', key: 'content', scope: '授权组织', canViewRealIdentity: false, sort: 2, enabled: true, createdAt: '2026-09-10 09:00', fixed: true },
      { id: 'dispatch', name: '事项管理员', key: 'dispatch', scope: '授权组织', canViewRealIdentity: false, sort: 3, enabled: true, createdAt: '2026-09-10 09:00', fixed: true },
      { id: 'handler', name: '历史承办角色（停用）', key: 'handler', scope: '所属部门', canViewRealIdentity: false, sort: 4, enabled: false, createdAt: '2026-09-10 09:00', fixed: true },
      { id: 'leader', name: '领导查看', key: 'leader', scope: '授权组织', canViewRealIdentity: true, sort: 5, enabled: true, createdAt: '2026-09-10 09:00', fixed: true }
    ],
    menus: [
      { id: 'menu-dashboard', parentId: null, name: '工作总览', icon: 'layout-dashboard', sort: 1, type: '目录', permission: '', path: 'dashboard', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-audit', parentId: null, name: '审核管理', icon: 'user-round-check', sort: 2, type: '目录', permission: '', path: 'user-review', enabled: true, visible: true, createdAt: '2026-09-14 09:00' },
      { id: 'menu-user-review', parentId: 'menu-audit', name: '用户审核', icon: 'user-round-check', sort: 1, type: '菜单', permission: 'user:review', path: 'user-review', enabled: true, visible: true, createdAt: '2026-09-14 09:00' },
      { id: 'menu-comment', parentId: 'menu-audit', name: '信息发布审核', icon: 'shield-check', sort: 2, type: '菜单', permission: 'content:review', path: 'content-review', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-comment-review', parentId: 'menu-audit', name: '评论审核', icon: 'message-square', sort: 3, type: '菜单', permission: 'comment:review', path: 'comments', enabled: true, visible: true, createdAt: '2026-09-14 09:00' },
      { id: 'menu-report-review', parentId: 'menu-audit', name: '举报核查', icon: 'flag-triangle-right', sort: 4, type: '菜单', permission: 'report:review', path: 'report-review', enabled: true, visible: true, createdAt: '2026-09-14 09:00' },
      { id: 'menu-review', parentId: null, name: '内容管理', icon: 'files', sort: 3, type: '目录', permission: '', path: 'content-ledger', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-post', parentId: 'menu-review', name: '发帖信息台账管理', icon: 'notebook-tabs', sort: 1, type: '菜单', permission: 'content:ledger:view', path: 'content-ledger', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-announcements', parentId: 'menu-review', name: '通知公告管理', icon: 'megaphone', sort: 3, type: '菜单', permission: 'content:announcement', path: 'announcements', enabled: true, visible: true, createdAt: '2026-09-14 08:00' },
      { id: 'menu-policy', parentId: 'menu-review', name: '政策与问答', icon: 'book-open-check', sort: 4, type: '菜单', permission: 'content:policy', path: 'policy', enabled: true, visible: true, createdAt: '2026-09-14 08:00' },
      { id: 'menu-echo', parentId: 'menu-review', name: '回音壁管理', icon: 'badge-check', sort: 5, type: '菜单', permission: 'content:echo', path: 'echo', enabled: true, visible: true, createdAt: '2026-09-14 08:00' },
      { id: 'menu-affairs', parentId: null, name: '事项办理', icon: 'clipboard-list', sort: 4, type: '目录', permission: '', path: 'assignments', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-assign', parentId: 'menu-affairs', name: '事项处理', icon: 'tags', sort: 1, type: '菜单', permission: 'affair:process', path: 'handler-dispatch', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-settings', parentId: null, name: '系统设置', icon: 'settings-2', sort: 9, type: '目录', permission: '', path: 'settings', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-users', parentId: 'menu-settings', name: '用户管理', icon: 'users', sort: 1, type: '菜单', permission: 'system:user:view', path: 'users', enabled: true, visible: true, createdAt: '2026-09-10 09:00' },
      { id: 'menu-dict', parentId: 'menu-settings', name: '字典管理', icon: 'book-open', sort: 2, type: '菜单', permission: 'system:dict:view', path: 'dictionary-management', enabled: true, visible: true, createdAt: '2026-09-10 09:00' }
    ],
    dictionaryTypes: [
      { id: 'dict-auth', name: '登录方式', key: 'sys_login_method', note: '登录方式演示项', createdAt: '2026-09-10 09:00' },
      { id: 'dict-affair', name: '事项优先级', key: 'affair_priority', note: '办理事项优先级', createdAt: '2026-09-10 09:00' },
      { id: 'dict-status', name: '系统状态', key: 'sys_status', note: '基础状态展示', createdAt: '2026-09-10 09:00' },
      { id: 'dict-report-reason', name: '举报原因类型', key: 'report_reason_type', note: '职工提交举报时选择，管理端可维护', createdAt: '2026-09-16 09:00' }
    ],
    dictionaryEntries: [
      { id: 'entry-password', typeId: 'dict-auth', label: '密码认证', value: 'password', sort: 1, note: '账号密码', createdAt: '2026-09-10 09:00' },
      { id: 'entry-sms', typeId: 'dict-auth', label: '短信认证', value: 'sms', sort: 2, note: '演示验证码', createdAt: '2026-09-10 09:00' },
      { id: 'entry-normal', typeId: 'dict-affair', label: '一般', value: 'normal', sort: 1, note: '', createdAt: '2026-09-10 09:00' },
      { id: 'entry-important', typeId: 'dict-affair', label: '重点', value: 'important', sort: 2, note: '', createdAt: '2026-09-10 09:00' },
      { id: 'entry-urgent', typeId: 'dict-affair', label: '紧急', value: 'urgent', sort: 3, note: '', createdAt: '2026-09-10 09:00' },
      { id: 'entry-active', typeId: 'dict-status', label: '正常', value: 'active', sort: 1, note: '', createdAt: '2026-09-10 09:00' },
      { id: 'entry-report-personal', typeId: 'dict-report-reason', label: '个人信息', value: 'personal_information', sort: 1, note: '涉及个人联系方式、身份或隐私信息', createdAt: '2026-09-16 09:00' },
      { id: 'entry-report-sensitive', typeId: 'dict-report-reason', label: '敏感信息', value: 'sensitive_information', sort: 2, note: '疑似涉及内部或不宜公开信息', createdAt: '2026-09-16 09:00' },
      { id: 'entry-report-false', typeId: 'dict-report-reason', label: '内容失实', value: 'false_information', sort: 3, note: '内容可能与事实不符', createdAt: '2026-09-16 09:00' },
      { id: 'entry-report-abuse', typeId: 'dict-report-reason', label: '不文明内容', value: 'abusive_content', sort: 4, note: '存在侮辱、攻击或不文明表达', createdAt: '2026-09-16 09:00' },
      { id: 'entry-report-ad', typeId: 'dict-report-reason', label: '广告推广', value: 'advertising', sort: 5, note: '营销、推广或引流信息', createdAt: '2026-09-16 09:00' },
      { id: 'entry-report-duplicate', typeId: 'dict-report-reason', label: '重复内容', value: 'duplicate_content', sort: 6, note: '重复发布或刷屏', createdAt: '2026-09-16 09:00' },
      { id: 'entry-report-other', typeId: 'dict-report-reason', label: '其他', value: 'other', sort: 7, note: '其他需要平台核查的问题', createdAt: '2026-09-16 09:00' }
    ],
    boards: [
      { id: 'board-ideas', name: '建言献策', description: '征集改革发展和管理服务建议', type: '诉求办理类', publisher: '职工', reviewRule: '按敏感规则处理', allowComments: true, generatesAffair: true, system: false, sort: 1, enabled: true, staffPost: true },
      { id: 'board-voices', name: '心声诉求', description: '反映工作生活中的具体问题和实际诉求', type: '诉求办理类', publisher: '职工', reviewRule: '按敏感规则处理', allowComments: true, generatesAffair: true, system: false, sort: 2, enabled: true, staffPost: true },
      { id: 'board-exchange', name: '业务交流', description: '分享业务经验、工作方法和协作信息', type: '内容交流类', publisher: '职工', reviewRule: '按敏感规则处理', allowComments: true, generatesAffair: false, system: false, sort: 3, enabled: true, staffPost: true },
      { id: 'board-echo', name: '回音壁', description: '展示管理员选择公开的事项回复', type: '成果发布类', publisher: '管理员', reviewRule: '仅管理员发布', allowComments: true, generatesAffair: false, system: true, sort: 4, enabled: true, staffPost: false }
    ],
    flowConfigs: ['建言献策', '心声诉求'].map((board) => ({
      board, version: 1, published: { decision: '人工判断', contentRole: 'content', assignmentRole: 'dispatch', answerRole: 'dispatch', extensionRole: 'dispatch' }, draft: null, publishedAt: '2026-09-14 09:00'
    })),
    sensitiveWords: [{ id: 'word-demo', term: '测试禁词', category: '其他', riskLevel: '高', scope: '全部', matchRule: '包含匹配', enabled: true, hitCount: 0 }, ...demoWords],
    deletedSensitiveWordIds: [],
    protectedLists: [{ id: 'list-demo-appointment', name: '未公开干部任免名单（虚构演示）', kind: '人事名单', scope: '全部', expires: '2026-12-31', enabled: true, hitCount: 0, entries: [{ name: '林知远', unit: '示范单位甲', position: '副主任' }, { name: '周明澈', unit: '示范单位乙', position: '处长' }] }],
    organizations: [
      { id: 'org-hubei', parentId: null, name: '湖北省供销合作总社', sort: 0, visible: true, status: '正常', createdAt: '2026-09-10 09:00' },
      { id: 'org-office', parentId: 'org-hubei', name: '办公室', sort: 1, visible: true, status: '正常', createdAt: '2026-09-10 09:10' },
      { id: 'org-cooperation', parentId: 'org-hubei', name: '合作指导处', sort: 2, visible: true, status: '正常', createdAt: '2026-09-10 09:12' },
      { id: 'org-economy', parentId: 'org-hubei', name: '经济发展处', sort: 3, visible: true, status: '正常', createdAt: '2026-09-10 09:14' },
      { id: 'org-information', parentId: 'org-hubei', name: '信息中心', sort: 4, visible: true, status: '正常', createdAt: '2026-09-10 09:16' },
      { id: 'org-service', parentId: 'org-office', name: '机关服务中心', sort: 1, visible: true, status: '正常', createdAt: '2026-09-10 09:18' },
      { id: 'org-enterprises', parentId: 'org-hubei', name: '直属企业', sort: 5, visible: true, status: '正常', createdAt: '2026-09-10 09:20' },
      { id: 'org-supply', parentId: 'org-enterprises', name: '省供销集团', sort: 1, visible: true, status: '正常', createdAt: '2026-09-10 09:22' },
      { id: 'org-cities', parentId: 'org-hubei', name: '市州供销社', sort: 6, visible: true, status: '正常', createdAt: '2026-09-10 09:24' },
      { id: 'org-wuhan', parentId: 'org-cities', name: '武汉市供销合作总社', sort: 1, visible: true, status: '正常', createdAt: '2026-09-10 09:26' },
      { id: 'org-jingzhou', parentId: 'org-cities', name: '荆州市供销合作社', sort: 2, visible: true, status: '正常', createdAt: '2026-09-10 09:28' }
    ]
  });
  function applyDemoScenario(data, scenario) {
    const mode = ['mixed', 'pending', 'processing', 'replied'].includes(scenario) ? scenario : 'mixed';
    if (mode === 'mixed') { data.__demoScenario = mode; return data; }
    data.affairs.forEach((affair, index) => {
      if (mode === 'pending') {
        Object.assign(affair, { status: '待处理', assignmentState: '待处理', category: '', topicTags: [], isKey: false, repliedAt: '', draft: '' });
      } else if (mode === 'processing') {
        Object.assign(affair, { status: '处理中', assignmentState: '处理中', category: affair.category || ['改进建议', '服务诉求', '政策咨询'][index % 3], classifiedAt: affair.classifiedAt || affair.updatedAt || affair.createdAt, isKey: index % 4 === 0 });
      } else if (mode === 'replied') {
        Object.assign(affair, { status: '已回复', assignmentState: '已回复', category: affair.category || '改进建议', repliedAt: affair.repliedAt || affair.updatedAt || affair.createdAt, draft: affair.draft || '感谢您的反馈，管理人员已完成集中研究并形成统一回复。' });
      }
    });
    const processingIds = data.affairs.filter((affair) => affair.status === '处理中').map((affair) => affair.id);
    if (!data.affairTopics?.length && processingIds.length) {
      const names = ['基层服务优化', '职工生活保障', '项目申报协同', '业务流程改进', '信息公开咨询'];
      data.affairTopics = names.map((name, index) => ({ id: `ZT-DEMO-${index + 1}`, name, summary: `围绕${name}集中整理相关事项并统一回复。`, affairIds: processingIds.filter((_, itemIndex) => itemIndex % names.length === index), discussionConclusion: '', createdBy: '平台管理员', createdAt: '2026-09-18 09:00', updatedAt: '2026-09-18 09:00' })).filter((topic) => topic.affairIds.length);
    }
    if (!data.affairs.some((affair) => affair.status === '已归档')) {
      const archiveSeeds = data.affairs.filter((affair) => affair.status !== '已归档').slice(0, 10);
      data.affairs.push(...archiveSeeds.map((affair, index) => ({ ...affair, id: `SX-ARCHIVE-${String(index + 1).padStart(3, '0')}`, status: '已归档', assignmentState: '已归档', archiveReason: ['重复事项', '内容不属于平台办理范围', '已通过其他渠道处理', '信息不完整暂不办理'][index % 4], archivedAt: `2026-09-${String(18 - index).padStart(2, '0')} 15:30`, archivedBy: '平台管理员', events: [...(affair.events || []), { text: '演示数据：事项已归档', at: `2026-09-${String(18 - index).padStart(2, '0')} 15:30` }] })));
    }
    if (mode === 'processing') data.affairTopics = (data.affairTopics || []).slice(0, 5);
    data.__demoScenario = mode;
    return data;
  }
  function read() {
    const requestedScenario = new URLSearchParams(window.location.search).get('demo') || 'mixed';
    try {
      const raw = JSON.parse(localStorage.getItem(key));
      if (raw && Array.isArray(raw.posts) && Array.isArray(raw.affairs) && Array.isArray(raw.audit)) {
        const hasAssignmentStates = raw.affairs.some((affair) => ['待处理', '处理中', '已回复'].includes(affair.status));
        if (requestedScenario && (raw.__demoScenario !== requestedScenario || !hasAssignmentStates)) {
          const scenarioData = applyDemoScenario(initial(), requestedScenario);
          reconcileProcessingPosts(scenarioData);
          localStorage.setItem(key, JSON.stringify(scenarioData));
          return scenarioData;
        }
        const defaults = initial();
        if (!raw.recycleFixtureVersion) {
          const samples = [
            ['RECYCLE-DEMO-01', '关于机关停车位预约规则的建议', '建言献策', '张晓雨', '张晓雨（职工端）', '2026-10-12 09:20', '建议优化停车位预约时间，减少重复预约。'],
            ['RECYCLE-DEMO-02', '县域冷链配送线路交流', '业务交流', '江城行者', '王敏（管理端）', '2026-10-11 16:35', '整理县域冷链配送线路的运行经验，供网点交流参考。'],
            ['RECYCLE-DEMO-03', '职工食堂晚餐供应意见', '心声诉求', '匿名职工', '王敏（管理端）', '2026-10-11 14:10', '希望结合加班情况调整晚餐供应时段。'],
            ['RECYCLE-DEMO-04', '基层网点培训资料共享建议', '建言献策', '张晓雨', '张晓雨（职工端）', '2026-10-10 11:45', '建议建立培训资料共享目录，方便基层网点查询。']
          ];
          for (const [id, title, board, author, deletedBy, deletedAt, body] of samples) {
            if (!raw.posts.some((p) => p.id === id)) raw.posts.push({ id, title, board, author, authorId: author === '张晓雨' || author === '匿名职工' ? 'staff' : 'demo-author:江城行者', body, time: deletedAt, deleted: true, enabled: false, deletedBy, deletedAt, status: '已隐藏', publishStatus: '未发布', contentAuditStatus: '审核通过', sensitiveHits: [], history: [{ text: `${deletedBy}删除帖子`, at: deletedAt }] });
          }
          raw.recycleFixtureVersion = 1;
          localStorage.setItem(key, JSON.stringify(raw));
        }
        if (!Array.isArray(raw.boards)) raw.boards = defaults.boards;
        const wordsMissing = !Array.isArray(raw.sensitiveWords);
        if (wordsMissing) raw.sensitiveWords = defaults.sensitiveWords;
        let wordsChanged = wordsMissing;
        if (!Array.isArray(raw.deletedSensitiveWordIds)) { raw.deletedSensitiveWordIds = []; wordsChanged = true; }
        for (const rule of raw.sensitiveWords) {
          if (!Number.isFinite(rule.hitCount)) { rule.hitCount = 0; wordsChanged = true; }
          if (!rule.matchRule) { rule.matchRule = '包含匹配'; wordsChanged = true; }
          const meta = sensitiveMeta(rule.term || '');
          if (!rule.category) { rule.category = meta.category; wordsChanged = true; }
          if (!['高', '中', '低'].includes(rule.riskLevel)) { rule.riskLevel = meta.riskLevel; wordsChanged = true; }
        }
        for (const rule of demoWords) {
          if (!raw.deletedSensitiveWordIds.includes(rule.id) && !raw.sensitiveWords.some((item) => item.id === rule.id || item.term === rule.term)) {
            raw.sensitiveWords.push({ ...rule }); wordsChanged = true;
          }
        }
        if (!Array.isArray(raw.protectedLists)) {
          raw.protectedLists = defaults.protectedLists;
          wordsChanged = true;
        }
        const obsolete = raw.sensitiveWords.findIndex((item) => item.id === 'word-agency-demo-3' && item.term === '未公开干部任免名单' && !item.hitCount);
        if (obsolete >= 0) { raw.sensitiveWords.splice(obsolete, 1); wordsChanged = true; }
        if (wordsChanged) localStorage.setItem(key, JSON.stringify(raw));
        let dataChanged = false;
        if (!Array.isArray(raw.traceRequests)) { raw.traceRequests = defaults.traceRequests; dataChanged = true; }
        const seededPost = raw.posts.find((post) => post.id === 15 && post.title === '关于基层网点联系方式展示的意见' && post.author === '匿名用户' && post.body === '建议完善基层网点联系方式展示规则，并注意保护个人信息。');
        if (seededPost && !seededPost.authorId) { seededPost.authorId = 'staff'; seededPost.publicationMode = 'anonymous'; dataChanged = true; }
        for (const request of raw.traceRequests) {
          if (!request.applicantId && request.id === 'TR-202609-001' && request.applicant === '王敏') { request.applicantId = 'admin'; dataChanged = true; }
        }
        if (!Array.isArray(raw.banners)) { raw.banners = []; dataChanged = true; }
        if (!Array.isArray(raw.comments)) { raw.comments = []; dataChanged = true; }
        for (const comment of demoComments) {
          if (raw.comments.length >= 20) break;
          if (!raw.comments.some((item) => item.id === comment.id)) { raw.comments.push({ ...comment }); dataChanged = true; }
        }
        for (const expected of demoComments) {
          const current = raw.comments.find((item) => item.id === expected.id);
          if (current && (JSON.stringify(current.sensitiveHits || []) !== JSON.stringify(expected.sensitiveHits) || current.text !== expected.text || String(current.postId) !== String(expected.postId))) { Object.assign(current, expected); dataChanged = true; }
        }
        if (!Array.isArray(raw.reports)) { raw.reports = []; dataChanged = true; }
        for (const report of demoReports) {
          if (raw.reports.length >= 20) break;
          if (!raw.reports.some((item) => item.id === report.id)) { raw.reports.push({ ...report }); dataChanged = true; }
        }
        for (const expected of demoReports) {
          const current = raw.reports.find((item) => item.id === expected.id);
          if (current && (!current.category || !current.reporter || !current.createdAt || String(current.postId) !== String(expected.postId))) {
            Object.assign(current, expected, { status: current.status, resolution: current.resolution, reviewReason: current.reviewReason, reviewedAt: current.reviewedAt });
            dataChanged = true;
          }
        }
        raw.boards.forEach((board, index) => {
          if (!Number.isInteger(board.sort) || board.sort < 1) { board.sort = index + 1; dataChanged = true; }
          const expected = defaults.boards.find((item) => item.id === board.id);
          const fallback = expected || { description: '', type: '内容交流类', publisher: '职工', reviewRule: '按敏感规则处理', allowComments: true, generatesAffair: false, system: false, staffPost: true };
          for (const field of ['description', 'type', 'publisher', 'reviewRule', 'allowComments', 'generatesAffair', 'system', 'staffPost']) {
            if (!Object.hasOwn(board, field)) { board[field] = fallback[field]; dataChanged = true; }
          }
        });
        if (raw.flowFixtureVersion !== 2) {
          for (const post of flowPosts) if (!raw.posts.some((item) => String(item.id) === post.id)) raw.posts.push({ ...post });
          for (const affair of flowAffairs) if (!raw.affairs.some((item) => String(item.id) === affair.id)) raw.affairs.push({ ...affair });
          raw.flowFixtureVersion = 2;
          dataChanged = true;
        }
        for (const post of raw.posts) {
          if (!Object.hasOwn(post, 'enabled')) { post.enabled = true; dataChanged = true; }
          if (!Object.hasOwn(post, 'deleted')) { post.deleted = false; dataChanged = true; }
          if (post.author === '匿名用户' && !post.authorId) { post.authorId = 'staff'; post.publicationMode = 'anonymous'; dataChanged = true; }
          if (!Array.isArray(post.sensitiveHits) && post.risk === '个人信息') { post.sensitiveHits = ['个人信息']; dataChanged = true; }
          const before = JSON.stringify(post.engagement || null);
          ensureEngagement(post);
          if (JSON.stringify(post.engagement) !== before) dataChanged = true;
        }
        for (const post of demoReviewPosts) {
          const current = raw.posts.find((item) => item.id === post.id);
          if (current?.body?.startsWith('帖子正文用于演示')) { current.body = post.body; dataChanged = true; }
        }
        for (const post of demoReviewPosts) {
          const reviewCount = raw.posts.filter((item) => item.sensitiveHits?.length || item.risk === '个人信息' || item.protectedListId).length;
          if (reviewCount >= 20) break;
          if (!raw.posts.some((item) => item.id === post.id)) { raw.posts.push({ ...post, enabled: true, deleted: false, engagement: seededEngagement(post.id) }); dataChanged = true; }
        }
        if (!Array.isArray(raw.organizations)) { raw.organizations = defaults.organizations; dataChanged = true; }
        for (const expected of defaults.accounts.filter((account) => account.role === 'handler')) {
          if (!raw.accounts.some((account) => account.id === expected.id)) { raw.accounts.push({ ...expected }); dataChanged = true; }
        }
        if (!Array.isArray(raw.flowConfigs)) { raw.flowConfigs = defaults.flowConfigs; dataChanged = true; }
        for (const expected of defaults.flowConfigs) if (!raw.flowConfigs.some((item) => item.board === expected.board)) { raw.flowConfigs.push(expected); dataChanged = true; }
        for (const post of raw.posts) {
          const original = defaults.flowConfigs.find((item) => item.board === post.board);
          if (original && !Object.hasOwn(post, 'flowSnapshot')) { post.flowSnapshot = { ...original.published, board: original.board, version: 1 }; dataChanged = true; }
        }
        for (const affair of raw.affairs) {
          const post = raw.posts.find((item) => item.id === affair.postId);
          if (post?.flowSnapshot && !affair.flowSnapshot) { affair.flowSnapshot = { ...post.flowSnapshot }; dataChanged = true; }
          const currentHandler = raw.accounts.find((account) => account.role === 'handler' && account.status === 'approved' && account.department === affair.owner);
          if (!affair.initialOwner) { affair.initialOwner = affair.owner; dataChanged = true; }
          if (!affair.assignmentState) { affair.assignmentState = affair.status === '办理中' ? '已接收' : affair.status; dataChanged = true; }
          if (!affair.assigneeId && currentHandler) { affair.assigneeId = currentHandler.id; dataChanged = true; }
          if (!affair.assigneeName && currentHandler) { affair.assigneeName = currentHandler.name; dataChanged = true; }
          if (!Object.hasOwn(affair, 'transfer')) { affair.transfer = null; dataChanged = true; }
          if (!Array.isArray(affair.events)) { affair.events = []; dataChanged = true; }
        }
        const extensionDemo = raw.affairs.find((item) => item.id === 'SX-FLOW-I-03' && item.status === '办理中');
        if (extensionDemo && !extensionDemo.extension) {
          extensionDemo.extension = { status: '已批准', deadline: '2026-09-28', reason: '协同部门反馈需要补充办理时限。' };
          extensionDemo.deadline = extensionDemo.extension.deadline;
          dataChanged = true;
        }
        for (const field of ['roles', 'menus', 'dictionaryTypes', 'dictionaryEntries', 'loginLogs', 'policies', 'questions', 'rectificationPublications', 'notices', 'banners', 'echoPublications']) if (!Array.isArray(raw[field])) { raw[field] = defaults[field]; dataChanged = true; }
        for (const type of defaults.dictionaryTypes.filter((item) => item.id === 'dict-report-reason')) if (!raw.dictionaryTypes.some((item) => item.id === type.id || item.key === type.key)) { raw.dictionaryTypes.push({ ...type }); dataChanged = true; }
        for (const entry of defaults.dictionaryEntries.filter((item) => item.typeId === 'dict-report-reason')) if (!raw.dictionaryEntries.some((item) => item.id === entry.id)) { raw.dictionaryEntries.push({ ...entry }); dataChanged = true; }
        const countsBefore = [raw.posts.length, raw.affairs.length, raw.notices.length, raw.policies.length, raw.questions.length, raw.rectificationPublications.length, raw.banners.length, raw.echoPublications.length].join(':');
        appendUntil(raw.posts, mockPosts, (post) => post.deleted !== true && ['私密发布', '已发布', '已受理', '已隐藏'].includes(post.status));
        appendUntil(raw.notices, mockNotices, () => true);
        appendUntil(raw.policies, mockPolicies, () => true, 10);
        appendUntil(raw.questions, mockQuestions, () => true, 10);
        appendUntil(raw.questions, mockStaffQuestions, (item) => item.authorId === 'staff', mockStaffQuestions.length);
        appendUntil(raw.rectificationPublications, mockRectificationPublications, () => true, mockRectificationPublications.length);
        appendUntil(raw.banners, mockBanners, () => true);
        appendUntil(raw.echoPublications, mockEchoPublications, () => true);
        appendUntil(raw.affairs, mockAffairs, () => true);
        for (const notice of raw.notices) {
          if (notice.status !== '已发布') { notice.status = '已发布'; dataChanged = true; }
          const targetCount = noticeAudience[notice.scope] || noticeAudience['全体职工'];
          if (!Number.isFinite(notice.targetCount)) { notice.targetCount = targetCount; dataChanged = true; }
          if (!Number.isFinite(notice.successCount)) { notice.successCount = notice.targetCount; dataChanged = true; }
        }
        for (const policy of raw.policies) if (policy.status !== '已发布') { policy.status = '已发布'; dataChanged = true; }
        for (const candidate of mockPosts.filter((post) => post.status === '私密发布')) {
          const current = raw.posts.find((post) => post.id === candidate.id);
          if (current?.status === '已发布' && !raw.audit.some((event) => String(event.target) === String(current.id))) { current.status = '私密发布'; dataChanged = true; }
        }
        if ([raw.posts.length, raw.affairs.length, raw.notices.length, raw.policies.length, raw.questions.length, raw.rectificationPublications.length, raw.banners.length, raw.echoPublications.length].join(':') !== countsBefore) dataChanged = true;
        if (reconcileProcessingPosts(raw)) dataChanged = true;
        for (const affair of raw.affairs) {
          const post = raw.posts.find((item) => String(item.id) === String(affair.postId));
          if (affair.status === '待复核' && post?.processingAccepted && ['建言献策', '心声诉求'].includes(post.board) && post.status === '待复核') { post.status = '已处理-分办审核'; dataChanged = true; }
        }
        for (const post of raw.posts) ensureEngagement(post);
        for (const publication of raw.echoPublications) ensureEngagement(publication);
        for (const account of raw.accounts || []) {
          if (!account.submitted && account.createdAt) { account.submitted = account.createdAt; dataChanged = true; }
          const fallback = defaults.accounts.find((item) => item.id === account.id);
          if (account.department === '待完善' && fallback?.department && fallback.department !== '待完善') { account.department = fallback.department; dataChanged = true; }
        }
        const managedMenuDefaults = defaults.menus.filter((item) => ['menu-audit', 'menu-review'].includes(item.id) || ['menu-audit', 'menu-review'].includes(item.parentId));
        for (const expected of managedMenuDefaults) {
          const current = raw.menus.find((item) => item.id === expected.id);
          const legacyNames = { 'menu-review': '内容治理', 'menu-post': '帖子审核', 'menu-comment': '评论与举报' };
          if (current && current.name === legacyNames[current.id]) {
            Object.assign(current, expected, { enabled: current.enabled, visible: current.visible, createdAt: current.createdAt });
            dataChanged = true;
          } else if (current?.id === 'menu-comment' && current.parentId === 'menu-review' && current.name === '信息发布审核' && current.path === 'content-review') {
            current.parentId = 'menu-audit'; current.sort = 2;
            dataChanged = true;
          } else if (current?.id === 'menu-review' && current.name === '内容管理' && current.sort === 2) {
            current.sort = 3;
            dataChanged = true;
          } else if (current?.id === 'menu-comment-review' && current.parentId === 'menu-audit' && current.name === '评论审核' && current.icon === 'message-square-check') {
            current.icon = 'message-square';
            dataChanged = true;
          } else if (current?.id === 'menu-report-review' && current.name === '举报复核') {
            current.name = '举报核查';
            dataChanged = true;
          } else if (!current) {
            raw.menus.push({ ...expected });
            dataChanged = true;
          }
        }
        const affairsMenu = raw.menus.find((item) => item.id === 'menu-affairs');
        if (affairsMenu?.name === '事项办理' && affairsMenu.parentId === null && affairsMenu.sort === 3) { affairsMenu.sort = 4; dataChanged = true; }
        const processMenu = raw.menus.find((item) => item.id === 'menu-assign');
        if (processMenu && (processMenu.name !== '事项处理' || processMenu.path !== 'handler-dispatch' || processMenu.permission !== 'affair:process')) {
          Object.assign(processMenu, { name: '事项处理', icon: 'tags', path: 'handler-dispatch', permission: 'affair:process' });
          dataChanged = true;
        }
        const dispatchRole = raw.roles.find((item) => item.id === 'dispatch');
        if (dispatchRole?.name !== '事项管理员') { dispatchRole.name = '事项管理员'; dataChanged = true; }
        const handlerRole = raw.roles.find((item) => item.id === 'handler');
        if (handlerRole && (handlerRole.name !== '历史承办角色（停用）' || handlerRole.enabled !== false)) {
          handlerRole.name = '历史承办角色（停用）'; handlerRole.enabled = false; dataChanged = true;
        }
        for (const board of raw.boards.filter((item) => ['建言献策', '心声诉求'].includes(item.name))) {
          if (board.reviewRule !== '按敏感规则处理') { board.reviewRule = '按敏感规则处理'; dataChanged = true; }
        }
        const echoBoard = raw.boards.find((item) => item.id === 'board-echo');
        if (echoBoard && echoBoard.description !== '展示管理员选择公开的事项回复') { echoBoard.description = '展示管理员选择公开的事项回复'; dataChanged = true; }
        const echoMenu = raw.menus.find((item) => item.id === 'menu-echo');
        if (echoMenu?.name === '回音壁发布') { echoMenu.name = '回音壁管理'; dataChanged = true; }
        for (const role of raw.roles) {
          if (!Array.isArray(role.permissions) || !role.permissions.includes('内容治理')) continue;
          role.permissions = role.permissions.map((name) => name === '内容治理' ? '内容管理' : name);
          dataChanged = true;
        }
        if (!Array.isArray(raw.echoPublications)) {
          raw.echoPublications = raw.affairs.filter((affair) => affair.draft && affair.feedback === '公开答复' && ['已反馈', '已办结'].includes(affair.status)).map((affair) => ({
            id: `echo-migrated-${affair.id}`,
            sourcePostId: affair.postId,
            affairId: affair.id,
            title: `关于“${affair.title}”的答复`,
            body: affair.draft,
            scope: '全体职工',
            status: '已发布',
            publishedAt: '历史公开'
          }));
          dataChanged = true;
        }
        for (const publication of raw.echoPublications) {
          const before = JSON.stringify(publication.engagement || null);
          ensureEngagement(publication);
          if (JSON.stringify(publication.engagement) !== before) dataChanged = true;
        }
        const topicsBefore = JSON.stringify(raw.affairTopics || []);
        applyDemoScenario(raw, raw.__demoScenario || 'mixed');
        if (JSON.stringify(raw.affairTopics || []) !== topicsBefore) dataChanged = true;
        if (!Array.isArray(raw.accounts)) raw.accounts = defaults.accounts;
        for (const account of defaults.accounts) if (!raw.accounts.some((item) => item.phone === account.phone)) { raw.accounts.push(account); dataChanged = true; }
        if (dataChanged) localStorage.setItem(key, JSON.stringify(raw));
        return raw;
      }
    } catch (_) { /* Invalid demo data starts from the seed. */ }
    const data = applyDemoScenario(initial(), requestedScenario);
    reconcileProcessingPosts(data);
    reconcileProcessingPosts(data);
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
  window.PrototypeData = {
    read,
    emptyEngagement,
    ensureEngagement,
    isPublicPost,
    isPublicEcho,
    save(data) { localStorage.setItem(key, JSON.stringify(data)); window.dispatchEvent(new Event('prototype-data-changed')); },
    reset() { const data = initial(); reconcileProcessingPosts(data); this.save(data); return data; },
    resetDemo(scenario = 'mixed') { const data = applyDemoScenario(initial(), scenario); this.save(data); return data; },
    postingBoards(data = read()) { return data.boards.filter((board) => board.enabled && board.staffPost); },
    searchContent(query, data = read()) {
      const keywords = String(query || '').normalize('NFKC').toLocaleLowerCase().split(/\s+/).filter(Boolean);
      const items = [
        ...(data.posts || []).filter(isPublicPost).map((item) => ({ type: '帖子', id: item.id, title: item.title, meta: `${item.board || ''} · ${item.author || ''}`, searchText: [item.title, item.body, item.board, item.author, item.id] })),
        ...(data.policies || []).filter((item) => item.status === '已发布').map((item) => ({ type: '政策', id: item.id, title: item.title, meta: `${item.category || ''} · ${item.department || ''}`, searchText: [item.title, item.summary, item.body, item.category, item.department, item.id] }))
      ];
      return items.map((item, index) => {
        const title = String(item.title || '').normalize('NFKC').toLocaleLowerCase();
        const text = item.searchText.join(' ').normalize('NFKC').toLocaleLowerCase();
        const matched = !keywords.length || keywords.every((word) => text.includes(word));
        const score = keywords.reduce((total, word) => total + (title.includes(word) ? 4 : text.includes(word) ? 1 : 0), 0);
        return { ...item, matched, score, index };
      }).filter((item) => item.matched).sort((a, b) => b.score - a.score || a.index - b.index);
    },
    flowFor(board, data = read()) { const item = data.flowConfigs?.find((flow) => flow.board === board); return item ? { ...item.published, board, version: item.version } : null; },
    blockedWord(content, scope, data = read()) {
      const normalized = String(content ?? '').normalize('NFKC').toLocaleLowerCase();
      const matches = data.sensitiveWords.filter((rule) => {
        if (!rule.enabled || (rule.scope !== '全部' && rule.scope !== scope)) return false;
        const term = String(rule.term || '').trim().normalize('NFKC').toLocaleLowerCase();
        if (!term) return false;
        if (rule.matchRule !== '完整词匹配') return normalized.includes(term);
        let start = normalized.indexOf(term);
        while (start !== -1) {
          const before = normalized.slice(0, start);
          const after = normalized.slice(start + term.length);
          if (!/[\p{L}\p{N}_]$/u.test(before) && !/^[\p{L}\p{N}_]/u.test(after)) return true;
          start = normalized.indexOf(term, start + 1);
        }
        return false;
      });
      const priority = { '高': 3, '中': 2, '低': 1 };
      return matches.sort((a, b) => (priority[b.riskLevel] || 2) - (priority[a.riskLevel] || 2))[0] || null;
    },
    recordHit(rule, data) {
      rule.hitCount = (Number.isFinite(rule.hitCount) ? rule.hitCount : 0) + 1;
      this.save(data);
    },
    protectedMatch(content, scope, data = read()) {
      const text = String(content ?? '').normalize('NFKC').toLocaleLowerCase();
      const today = new Date().toISOString().slice(0, 10);
      for (const list of data.protectedLists || []) {
        if (!list.enabled || (list.expires && list.expires < today) || (list.scope !== '全部' && list.scope !== scope)) continue;
        for (const entry of list.entries || []) {
          const name = String(entry.name || '').trim().normalize('NFKC').toLocaleLowerCase();
          const contexts = [entry.unit, entry.position].map((value) => String(value || '').trim().normalize('NFKC').toLocaleLowerCase()).filter(Boolean);
          if (name && contexts.length && text.includes(name) && contexts.some((value) => text.includes(value))) return { list, entry };
        }
      }
      return null;
    }
  };
})();
