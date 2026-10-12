# 原帖私聊 Implementation Plan

**Goal:** 管理员从帖子发起私聊，职工在官方回复中接收并回复。

**Architecture:** 共用 PrototypeData 本地存储，按 postId 关联会话，authorId 确定接收人。独立 private-chat.js 与 CSS 提供两端弹窗，不发送测试环境请求。

**Tech Stack:** 原生 JavaScript、HTML、CSS、localStorage。

## Tasks

- [x] 增加共享会话模块，发送消息追加到 privateThreads，记录时间、角色及已读状态。
- [x] 信息台账查看旁增加私聊按钮，未关联账号时提示，匿名显示昵称。
- [x] 职工官方回复列表增加私聊入口，打开时校验账号归属。
- [x] 官方回复追问入口改为进入私聊，普通办理进度保持原实现。
- [x] 语法检查，浏览器核验管理端按钮和匿名帖子会话弹窗。
- [ ] 两端完整发送及刷新回归。

## Constraints

仅本地演示，前端校验不是生产权限控制。生产环境需要服务端授权和会话接口。不得将私聊内容复制到公开评论或公开回复。
