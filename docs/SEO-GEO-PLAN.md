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

1. **Canonical URL**：每个页面加 `<link rel="canonical">`，防止 `pages.dev` 预览域名与主域名被判重复。 ✅ 2026-09-16（6 个页面：首页 / Lab / Lumen / Forge / reaction-time / typing-test）
2. **社交卡片**：生成一张 `og-image.png`（1200×630），全站统一 `og:` / `twitter:` 标签 —— 分享到 X / Slack / iMessage 时才有脸面。
3. **404 页面**：做一个符合品牌风格的 404，带回首页和 Lab 的入口。 ✅ 2026-09-17（`404.html`：深色品牌风、"Off the chart." 文案、回首页/Lab 按钮 + 热门工具入口；`noindex`；Cloudflare Pages 自动用作 404 响应）
4. **语义化复查**：每个页面只有一个 `h1`，层级不跳级；图片全部有 `alt`。 ✅ 2026-09-18（全站 10 页扫描：修复 4 处 h1→h3 跳级 —— Forge 卡片标题、Lab 想法卡片标题、Lumen 控制面板 "Scene"、新页 password-generator 选项组标题，均改为 h2 且视觉样式不变；确认每页恰 1 个 h1、无跳级、图片全部有 alt）
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

1. **`llms.txt` 持续维护** ✅ 2026-10-16（追加 Sudoku + Pairs Trading Lab）：服务、作品、联系方式保持最新；这是 AI 了解站点的第一手材料。
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

## 运行日志

- **2026-10-21**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Tip & Split：免费在线账单分摊工具，逐道菜点选分摊到人、加小费/税费后每人应付金额精确到分、可一键复制群发总结，全本地计算；Risk of Ruin Simulator：免费在线赌局风险模拟器，输入资金/注码/胜率/赔率即见数千条蒙特卡洛权益曲线下的爆仓概率、带凯利准则提示，教育演示、仅模拟数据），实验总数 46→48；移除较早的 Sudoku / Pairs Trading Lab 条目以控制长度（保留最近 10 条）。另：当日两个 lab 新页（tip-splitter、ruin-simulator）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹、回链 /ideas/；seo-check.py 本地 51 页全通过；tip-splitter 核心分账逻辑经 node 校验——示例晚餐 5 菜 4 人 20% 小费+税 $9.63：分项 $165.03 分毫不差，$10 三人 18%+税 $2.47 舍入压力测试 4.76/4.76/4.75 精确对齐，构建中修了每人分项和与显示总额差 1 分的边界（尾差并入小费分项，已回写 spec）；ruin-simulator 模拟引擎经 node 校验——注码增大时爆仓概率单调上升、零优势公平博弈收敛于经典理论值、期望终值与固定注码闭式解一致）；sitemap 经 `generate-sitemap.py` 重生成为 50 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。


- **2026-10-20**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Connect Four vs AI：免费在线四连棋游戏，三档 minimax AI 或本地双人对战，落子动画、胜线高亮、悔棋与终身统计，全本地计算；URL Codec：免费在线 URL 编解码开发工具，Component/Full-URL 双模式、实时查询参数表（可编辑重建）、精确的非法百分号序列报错，数据不出页面），实验总数 44→46；清理了行内堆积出的双 "Recent additions:" 标记，保留最新 10 条以控制长度（移除 Position Size Calculator / JWT Decoder / Wordle Clone / Habit Tracker）。另：当日两个 lab 新页（connect-four、url-codec）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹；connect-four 核心逻辑经 node 校验 19/19 通过——四方向胜负判定、重力/满列、Hard 唯一必胜手与必防手、中心开局约 8ms，构建中按 spec 补了移动端 tap 即落子；url-codec 核心逻辑经 node 校验 23/23 通过——编解码往返/Unicode/嵌套编码/错误定位/重复键/fragment 剥离/parse→rebuild 往返，构建中发现并修了无 `?` 输入误判为查询串的边界 case，已回写 spec）；seo-check.py 本地 49 页全通过；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成（本地不再手改）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-17**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Time Converter：免费在线时间戳转换器，粘贴 Unix 时间戳即得任意时区的可读日期、或反向转换，自动识别秒/毫秒/微秒/纳秒单位、相对时间与分享链接，全本地计算；Mortgage Calc：免费在线房贷计算器，输入房价/首付/利率/期限得完整月供明细（含地税/保险/HOA/PMI）、逐年摊还表、总利息与额外还款缩期效果，全本地计算），实验总数 38→40；移除较早的 Monte Carlo Portfolio Sim 条目以控制长度。另：当日两个 lab 新页（timestamp-converter、mortgage-calc）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹，seo-check.py 本地 43 页全通过；timestamp-converter 核心逻辑经 node 校验 21/21 通过——epoch↔ISO、13/16/19 位单位识别、东京/洛杉矶时区偏移、wall-clock 反推、相对时间、hash 往返，构建中修了 wallToEpoch 偏移量双减 bug；mortgage-calc 公式经 node 校验——$1M 房价/20% 首付/6.5%/30 年 P&I=$5,056.54 与标准公式一致，首期本息拆分、额外 $500/月缩期、期末余额归零）；sitemap 经 `generate-sitemap.py` 重生成为 42 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-16**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Sudoku：免费在线数独游戏，浏览器内生成、唯一解保证，三档难度、铅笔备注、提示、错误标红与计时器，全本地计算；Pairs Trading Lab：免费在线配对交易探索器，合成协整价格对、OLS 对冲比率估计、滚动价差 z-score、平稳性检查与半衰期、带完整交易日志的通道回测，教育演示、仅合成数据），实验总数 36→38；移除较早的 Whack-a-Mole / Stopwatch 条目以控制长度。另：当日两个 lab 新页（sudoku、pairs-trading-lab）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹、回链 /ideas/；seo-check.py 本地 41 页全通过；sudoku 核心逻辑经 node 校验通过——10/10 有效完整解盘、easy/medium/hard 分别约 43/36/29 givens、countSolutions===1 确认唯一解、生成 2–39ms；pairs-trading-lab 核心逻辑经 node 校验 17/17 通过——种子可复现、默认种子 β̂=0.976/ADF t=−4.92/半衰期 3.1 天、Broken 预设判为非平稳且回测亏损、交易日志求和与总盈亏一致、紧凑预设 40/40 种子盈利；构建中修了 3 处方法论问题：共享高斯流导致对冲比率偏估→独立扰动流、1 股单位被成本吞没→$10k/腿名义、全样本 OLS 制造虚假均值回归→60 天形成/交易期分离、平滑漂移可被滚动窗口吃掉→Broken 预设改用永久 regime shift）；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-15**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Position Size Calculator：免费在线交易工具，输入账户规模/风险比例/止损距离得精确仓位股数、风险金额与名义价值，长/空方向与实时重算，全本地计算；JWT Decoder：免费在线开发工具，浏览器内解码 JSON Web Token——粘贴 token 即看 header/payload/signature 解码、过期与未生效检查、语法高亮，数据绝不离开页面），实验总数 34→36；移除较早的 Correlation Heatmap 条目以控制长度。另：当日两个 lab 新页（position-size-calculator、jwt-decoder）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹，seo-check.py 本地 39 页全通过；修复两处错误回链 /lab/→/ideas/，spec 同步更新；position-size-calculator 核心公式经 node 校验：$10,000/1%/$150/$145→20 股/$100 风险；jwt-decoder 解码核心经 node 校验 20/20 + 高亮 6/6 通过，全页 fetch/XMLHttpRequest grep 为零）；sitemap 经 `generate-sitemap.py` 重生成为 38 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-14**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Wordle Clone：免费在线猜词游戏，六猜五字母 daily seed、键盘着色、练习模式、emoji 分享；Habit Tracker：每日习惯打卡器，打勾看 streak 增长、周热力图/进度环/文本导出，全本地存储），实验总数 32→34；移除较早的 Breakout 条目以控制长度。另：当日两个 lab 新页（wordle-clone、habit-tracker）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹；wordle-clone 核心逻辑经 node 校验通过——daily seed 确定性、7 例着色算法含重复字母、无效词拒绝；habit-tracker 核心逻辑经 node 校验 13/13 通过——streak 跨天/断档/空值/幂等）；sitemap 已追加两条新 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，本环境无 Chrome，继续顺延到季度节奏手动跑）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-13**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Candlestick Quiz：K 线形态限时问答，10 轮 canvas 手绘 K 线形态识别，计分/连击/ localStorage 个人最佳；Sharpe Calculator：风险调整收益计算器，粘贴月收益率或价格序列即得年化 Sharpe/Sortino、最大回撤、波动率、CAGR 与胜率，带回撤着色权益曲线，全本地计算），保留 Aim Trainer / Cron Explainer / Monte Carlo Portfolio Sim / Whack-a-Mole / Stopwatch / Correlation Heatmap / Breakout 条目（移除较早的 Simon Says / Markdown Live 以控制长度）。另：当日两个 lab 新页（candlestick-quiz、sharpe-calculator）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹；candlestick-quiz 核心逻辑经 node 校验 3,256 项通过、sharpe-calculator 数学逻辑经 node 校验通过）；sitemap 已含两条新 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-12**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Aim Trainer：30 秒在线反应力训练器，随机刷新靶心、命中/误击计分、平均反应时间、precision-over-time 曲线图、localStorage 个人最佳；Cron Explainer：cron 翻译器，粘贴 5/6 字段表达式即得自然语言描述、下 8 次运行时间、实时倒计时、逐字段解析、快捷预设，全本地计算），保留 Monte Carlo Portfolio Sim / Whack-a-Mole / Stopwatch / Correlation Heatmap / Breakout / Simon Says / Markdown Live 条目（移除较早的 Kelly Criterion Calculator / Options Payoff Lab 以控制长度）。另：当日两个 lab 新页（aim-trainer、cron-parser）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹，seo-check.py 本地通过 33 页；cron-parser 核心逻辑经 node 单元校验：`*/15 9-17 * * MON-FRI` → "Every 15 minutes from 09:00 to 17:45, on weekdays."、下 3 次运行 09:00/09:15/09:30 正确、`0 9 * * 1` 下次运行为周一 09:00、dow 7 归一为周日、dom/dow 双限 OR 语义正确；构建中修复两处：`@daily` 等快捷写法大小写查找失效（已修）、逗号列表误判为单值（已修）；aim-trainer 为纯 DOM 交互游戏，逻辑直接随 spec 实现）；sitemap 经 `generate-sitemap.py` 重生成为 32 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-11**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Monte Carlo Portfolio Sim：免费在线投资组合蒙特卡洛模拟器，输入初始本金/年供款/年限/预期回报/波动率，跑数千条随机路径，给出百分位扇形图、期末分布直方图、达成目标概率与 CSV 导出，带通胀调整开关与三档预设；Whack-a-Mole：60 秒打地鼠反应游戏，3×3 地洞、锤子光标点击动画、连击倍率、金色地鼠 5 分、难度递增、localStorage 最高分、WebAudio 音效开关），保留 Stopwatch / Correlation Heatmap / Breakout / Simon Says / Markdown Live / Kelly Criterion Calculator / Options Payoff Lab 条目（移除较早的 Tetris / Regex Tester 以控制长度）。另：当日两个 lab 新页（monte-carlo-portfolio、whack-a-mole）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹，seo-check.py 本地通过 31 页；JS 核心逻辑经 node 单元校验：蒙特卡洛分位数单调 P10≤P25≤P50≤P75≤P90、30 年 9%/12% 中位数约 $98 万在合理区间、零波动路径与连续复利闭式解一致；打地鼠连击 5 连击升 ×2、miss 重置 ×1、金色 5 分、生成间隔严格递减）；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成（本地不再手改）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-10**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Stopwatch：毫秒级秒表，wall-clock 计时、lap 圈速 + 相对上一圈 delta、best/worst 高亮、键盘快捷键；Correlation Heatmap：粘贴资产价格数据生成 Pearson 相关性热力图，带示例数据与单元格精确值），保留 Breakout / Simon Says / Markdown Live / Kelly Criterion Calculator / Options Payoff Lab / Tetris / Regex Tester 条目（移除较早的 Event Countdown / 2048 以控制长度）。另：当日两个 lab 新页（stopwatch、correlation-heatmap）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1，seo-check.py 本地通过 29 页；JS 核心逻辑经 node 单元校验：heatmap 样本 TECH×CLOUD=0.833、TECH×BONDS=−0.390、TECH×GOLD=−0.104、TECH×CRYPTO=0.348 均在设计值 ±0.15 内，对角线 1.00、矩阵对称，parser 覆盖 CSV/TSV/无表头/标签列/错误提示路径；构建中发现并修正样本数据因子载荷不足（TECH×CLOUD 仅 0.584，已调到 0.833））；sitemap 经 `generate-sitemap.py` 重生成为 28 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-09**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Breakout：砖块破坏游戏，90 块砖块、经典行计分——顶行 8 分到底行 1 分、过关 +8% 球速且 level 3 起 paddle 收窄、鼠标/键盘/触屏控制；Simon Says：记忆游戏，四块发光+音调垫子、序列逐轮增长、严格规则——按错一块即结束、随轮数播放加速），保留 Markdown Live / Kelly Criterion Calculator / Options Payoff Lab / Tetris / Regex Tester / Event Countdown / 2048 条目（移除较早的 Decision Wheel / Backtest Visualizer 以控制长度）。另：当日两个 lab 新页（breakout、simon-says）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1，seo-check.py 本地通过 27 页；JS 核心逻辑经 node 单元校验：breakout paddle 反弹角中心 90°→vx≈0、左边缘→vx<0、右边缘→vx>0、砖块计分顶行 8/底行 1、总数 90；simon-says 播放间隔随轮数 450ms→220ms 单调递减、序列每轮 +1、按错即 gameOver）；构建中发现并修复 breakout paddle 反弹方向 bug（左边缘原误向右弹，已改为左）；sitemap 经 `generate-sitemap.py` 重生成为 26 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-08**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Markdown Live：左右分栏即时渲染的 markdown 编辑器，自研无依赖渲染器——标题/表格/代码块/任务列表、工具栏格式化、复制 HTML/下载 .md、localStorage 自动保存；Kelly Criterion Calculator：凯利公式仓位计算器，输入胜率与赔率得最优投注比例——全/半/四分之一凯利、期望增长曲线（含爆仓区着色）、按资金换算每注金额），保留 Options Payoff Lab / Tetris / Regex Tester / Event Countdown 等条目。另：当日两个 lab 新页（markdown-preview、kelly-calculator）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1，seo-check.py 本地通过 25 页；JS 核心逻辑经 node 单元校验：markdown 渲染器 16 项断言通过——标题/加粗/表格对齐/代码块/XSS 转义/javascript: 链接拦截/嵌套列表；kelly f*=20%@60%/1:1、f*=0@50%/1:1、曲线峰值=最优比例、f≥1 爆仓区均为 NaN）；sitemap 经 `generate-sitemap.py` 重生成为 24 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-07**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Options Payoff Lab：多腿期权策略 payoff 图构建器，自定义 leg + Iron Condor/Straddle 等预设、breakeven/最大盈亏、每腿 Black-Scholes delta；Tetris：经典俄罗斯方块，7-bag 随机、ghost piece、hold 队列、关卡加速、最高分持久化），保留 Regex Tester / Event Countdown 条目。另：当日两个 lab 新页（options-payoff、tetris）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1 已核验，JS 核心逻辑经 node 单元校验：iron condor breakeven 92.60/107.40、maxP 2.40/maxL −2.60、straddle breakeven 90/110、delta ATM ~0.517；tetris 旋转往返/碰撞/消行/重力曲线 OK）；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成（本地不再手改）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-06**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Regex Tester：实时正则测试工作台，输入即高亮、逐条查看捕获组、flag 开关、内置 cheatsheet；Event Countdown：翻牌式倒计时器，命名+选日期后翻牌显示天/时/分/秒、可生成分享链接），保留 Decision Wheel / Backtest Visualizer 条目。另：当日两个 lab 新页（regex-tester、event-countdown）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1 已核验）；sitemap 经 `generate-sitemap.py` 重生成为 20 个 URL（16 个 lab；CI 在 push 后也会重生成）。跳过：Lighthouse 性能基线（Phase 1-⑤，运行环境无 Chrome/Chromium，顺延到季度节奏手动跑）、og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）。

- **2026-10-05**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Decision Wheel：2–12 选项转盘决策器，真实减速动画、localStorage 持久化；Backtest Visualizer：CSV 收益率/价格 → 权益曲线、underwater 回撤图、月度收益热力图、Sharpe/CAGR/最大回撤统计，纯前端解析），保留此前 2048 / Palette Lab / Unit Converter 条目。另：当日两个 lab 新页（decision-wheel、backtest-visualizer）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD；sitemap 经 `generate-sitemap.py` 重生成为 18 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）。下一步候选：性能基线 Lighthouse（Phase 1-⑤，按季度节奏）或 og 社交卡片（等用户拍板）。

- **2026-09-19**：Phase 3-① `llms.txt` 持续维护 —— 在 "The Lab" 条目下追加今日新上线的两个实验（Memory Match、Snake）含 URL 和一句话描述，保持 AI 爬虫看到的站点摘要最新。另：当日两个 lab 新页（memory-match、snake）均按构建 checklist 自带 canonical/title/description/quotable 定义段/JSON-LD；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成。跳过：og 社交卡片（待用户拍板）、GSC 验证（需人工）。下一步候选：性能基线 Lighthouse（Phase 1-⑤，按季度节奏）。
- **2026-09-18**：Phase 1 任务 ④ 语义化复查 —— 全站 10 个页面扫描，发现并修复 4 处 h1→h3 跳级（Forge、ideas、Lumen、password-generator，改为 h2、样式不变）；每页恰 1 个 h1、图片全部有 alt。另：当日两个 lab 新页（password-generator、pomodoro）均按构建 checklist 自带 canonical/title/description/JSON-LD；sitemap 经 `generate-sitemap.py` 重生成为 10 个 URL。跳过：og 社交卡片（待用户拍板）、GSC 验证（需人工）。下一步候选：性能基线 Lighthouse 95+（Phase 1-⑤，按季度节奏）。
- **2026-09-17**：Phase 1 任务 ③ 品牌 404 页面 —— 新建 `404.html`（Fraunces + brass 品牌风格、"Off the chart." 航海主题文案、回首页/Lab 双按钮、QR Studio / JSON Formatter / Forge / Lumen 热门入口；`noindex` + canonical + WebPage JSON-LD，通过 seo-check）。另：当日两个 lab 新页（qr-generator、json-formatter）均通过 seo-check；sitemap 经 `generate-sitemap.py` 重生成为 8 个 URL。下一步候选：og 社交卡片图（Phase 1-②，待用户拍板，见 §5）。
- **2026-09-16**：Phase 1 任务 ① Canonical URL —— 6 个页面全部加上（首页、Lab、Lumen、Forge、reaction-time、typing-test；lab 新页面由每日构建 checklist 自动带）。下一步候选：og 社交卡片图（Phase 1-②）。

- **2026-09-20**：Phase 3-① `llms.txt` 持续维护 —— 在 "The Lab" 条目下把 "Recent additions" 更新为今日新上线的两个实验（2048：滑块合并经典数字谜题，含动画/触屏/2048 通关遮罩/最高分持久化；Palette Lab：六模式配色生成器 + WCAG 对比度检查 + CSS/Tailwind/JSON 导出），含 URL 和一句话描述。另：当日两个 lab 新页（game-2048、color-palette）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD；sitemap 由 `generate-sitemap.py` 本地重生成为 14 个 URL（CI 在 push 后也会重生成）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）。下一步候选：性能基线 Lighthouse（Phase 1-⑤，按季度节奏）或 og 社交卡片（等用户拍板）。

- **2026-10-18**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Tic-Tac-Toe vs AI：免费在线井字棋，选 Easy（可战胜）或 Unbeatable（minimax 永不落败）两种难度，先手可选，胜负平记分板 + 胜线高亮动画，全本地计算；Order Book Visualizer：免费在线限价订单簿模拟器，合成订单簿引擎、canvas 深度图、实时 ladder 表、挂自己限价单小组件、"How to read an order book" 教学区，教育演示、仅模拟数据），实验总数 40→42；移除较早的 Aim Trainer / Cron Explainer 条目以控制长度。另：当日两个 lab 新页（tic-tac-toe、orderbook-visualizer）均按构建 checklist 自带 canonical/title/description/quotable 定义段/JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹、回链 /ideas/；tic-tac-toe 核心逻辑经 node 校验 12/12 通过——Unbeatable 对随机对手 400 局 0 负、Easy 可战胜；orderbook-visualizer 订单簿引擎经 node 校验——2000 步事件不变式零违反、价差始终 ∈ [1, maxSpread]、三档预设干净，构建中修了 2 处真 bug：单事件价差超限→enforceSpread 原子收紧、ask 累计深度方向算反→已修正并回写 spec）；seo-check.py 本地 44/45 页通过。sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成（本地不再手改）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-19**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Base64 Lab：免费在线开发工具，浏览器内编解码 Base64 文本与文件——自动识别模式、whitespace 一键修复、字节统计与 SHA-256 指纹，数据绝不离开页面；VWAP Tracker：免费在线交易教育工具，绘制盘中价格相对 VWAP 及 ±1σ/±2σ 偏差带——逐棒回放、任意柱面 scrub 取值、自定义价格/成交量粘贴、三档示例行情，教育演示、仅合成数据），实验总数 42→44；移除较早的 Candlestick Quiz / Sharpe Calculator 条目以控制长度。另：当日两个 lab 新页（base64-lab、vwap-tracker）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹；seo-check.py 本地 47 页全通过）；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成（本地不再手改）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。

- **2026-10-22**：Phase 3-① `llms.txt` 持续维护 —— "Recent additions" 更新为今日新上线的两个实验（Hangman：免费在线猜词游戏，四类词库（科技/自然/美食/混合）×三档难度（按词长）、六步 SVG 绞刑架渐进绘制、提示（每局一次、揭示一个未猜中字母）、键盘+触屏双输入、localStorage 胜/负/连胜/最佳纪录，全本地运行；UUID Generator：免费在线 UUID 批量生成开发工具，v1（时间戳单调）/v4（密码学随机）/v7（Unix 毫秒时序）/nil 四版本、1–1000 批量、大小写/连字符/大括号格式开关、逐行点击复制、一键全复制与 .txt 下载，Web Crypto 本地生成、数据不出页面），实验总数 48→50；移除较早的 Time Converter / Mortgage Calc 条目以控制长度（保留最近 10 条）。另：当日两个 lab 新页（hangman、uuid-generator）均按构建 checklist 自带 canonical/title/description/quotable 定义段/WebApplication JSON-LD（每页恰 1 个 h1、无 mailto、无密钥痕迹——唯一 "TOKEN" 命中为猜词词库单词、回链 /ideas/；seo-check.py 本地 53 页全通过；hangman 核心逻辑经 node 校验——词库 293 词全 A-Z、无重复、各分类×难度池 ≥8 词且符合词长带、胜/负/重复猜测幂等/提示逻辑通过，构建中修了严格模式下 pills 回调误用 arguments.callee、Easy 带放宽为 3–5 字母（回写 spec）、补齐 hard 词库至每类 ≥14 词；uuid-generator 核心逻辑经 node 校验——1000 个 v4 全部合规且唯一、v1/v7 版本位与 variant 位正确且时间戳单调、nil 全零、格式开关与数量钳制正确）；sitemap 由 CI 的 `generate-sitemap.py` 在 push 后自动重生成（本地不再手改）。跳过：og 社交卡片（待用户拍板，见 §5）、GSC 验证（需人工）、Lighthouse 性能基线（Phase 1-⑤，按季度节奏）。下一步候选：Lighthouse 性能基线（Phase 1-⑤）或 og 社交卡片（等用户拍板）。
