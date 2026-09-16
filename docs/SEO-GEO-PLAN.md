# Shipwright Studio — SEO / GEO 规划

> 目标：让 Google 能收录、让人能搜到、让 AI 助手（ChatGPT / Perplexity / AI Overviews）愿意引用。
> 原则：技术地基一次做对；内容靠 Lab 每日 2 页的复利；不买链接、不堆关键词。

## 0. 已落地（2026-09-16）

| 项目 | 状态 |
|---|---|
| `robots.txt`（放行 + 指向 sitemap） | ✅ |
| `sitemap.xml`（首页 / Lab / Lumen / Forge） | ✅，每日构建自动追加 lab 页面 |
| `llms.txt`（给 AI 爬虫看的站点摘要） | ✅ |
| 首页 JSON-LD（`ProfessionalService`） | ✅ |
| 全站 `<title>` + meta description | ✅ |
| 静态托管、移动端适配、HTTPS | ✅（Cloudflare Pages 天然满足） |

## 1. 技术 SEO（Phase 1 — 待做）

1. **Canonical URL**：每个页面加 `<link rel="canonical">`，防止 `pages.dev` 预览域名与主域名被判重复。
2. **社交卡片**：生成一张 `og-image.png`（1200×630），全站统一 `og:` / `twitter:` 标签 —— 分享到 X / Slack / iMessage 时才有脸面。
3. **404 页面**：做一个符合品牌风格的 404，带回首页和 Lab 的入口。
4. **语义化复查**：每个页面只有一个 `h1`，层级不跳级；图片全部有 `alt`。
5. **性能基线**：Lighthouse 四项 95+（静态站应无压力，每季度抽查一次）。
6. **Google Search Console**：⚠️ 需要站长（用户）在 Search Console 里添加 `shipwright-studio.pages.dev` 并验证，提交 sitemap。这是唯一需要人工的一步。

## 2. 内容 SEO（Phase 2 — 主要靠 Lab 复利）

- **每个 lab 页面自带 SEO**：已写入每日构建 checklist —— 独立标题、一句话 description、可被引用的总结段落、`WebApplication` JSON-LD。
- **关键词策略**（每个页面只打一个）：
  - Forge → "llm inference cost estimator"（已命中，无竞争的长尾）
  - Lumen → "exposure triangle simulator"
  - 工具类（JSON formatter、QR generator…）→ 各自 "best free online X" 长尾
  - 主页 → "freelance web developer bay area" / "hire web developer startup"
- **FAQ 板块**（待用户确认再加）：首页加 3–4 个问答（价格区间？工期？远程合作？），配 `FAQPage` schema —— 这是 SEO 和 GEO 双吃的格式。
- **内容飞轮**：每天 2 页 × 50 天 = 100+ 可索引页面。单个页面流量小，但"100 个免费在线小工具"的集合页面（Lab 首页）会成为聚合流量入口。

## 3. GEO — Generative Engine Optimization（Phase 3）

AI 搜索不看排名看"可引用性"。打法：

1. **`llms.txt` 持续维护**：服务、作品、联系方式保持最新；这是 AI 了解站点的第一手材料。
2. **写作格式**：每个页面开头用 1–2 句说清"这是什么、给谁用、解决什么" —— 定义式句子最容易被 AI 原样引用。
3. **问答式内容**：FAQ、"How it works" 段落直接回答用户会问 AI 的问题（"How much does it cost to hire a freelance web developer?"）。
4. **品牌一致性**：全网统一表述 —— "Shipwright Studio — independent engineering studio, Bay Area, working worldwide"。GitHub、社交媒体、lab 页脚署名全部一致，AI 才能把碎片拼成一个实体。
5. **署名**：每个 lab 页面页脚 "Built by Shipwright Studio" + 回链，demo 被转载时品牌跟着走。
6. **效果抽查**（每月一次，人工 2 分钟）：问 ChatGPT / Perplexity "推荐一个 Bay Area 的 freelance web developer"、"free llm inference cost estimator"，看是否出现本站。

## 4. 权威度（Phase 4 — 顺其自然）

- GitHub 仓库保持公开、README 写清（已是）。
- 挑最好的 3–5 个 demo 发 Show HN / 相关 Reddit（人工发，挑质量）。
- 不买外链、不做 link farm。

## 5. 待用户拍板的事项

- [ ] Google Search Console 验证（唯一需要人工的步骤）
- [ ] 首页是否加 FAQ 板块（我来设计，保持简洁高端）
- [ ] 是否生成 og 社交卡片图（我可以直接生成）

## 6. 节奏

| 频率 | 动作 |
|---|---|
| 每天 | Lab 构建自动带 SEO（标题/描述/JSON-LD/sitemap） |
| 每月 | AI 引用抽查（2 分钟人工） |
| 每季度 | Lighthouse + Search Console 数据复盘 |
