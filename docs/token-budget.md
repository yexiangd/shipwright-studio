# Token Budget — Idea Lab Daily Workflow

> 免费计划每周 token 额度按 100% 计（`subscription-status status` 只报告百分比）。
> 本文件是每日构建的用量预算与校准记录。

## 预算

| 项目 | 数值 | 说明 |
|---|---|---|
| 每周总额 | 100% | 每周刷新 |
| 每日平均 | ~14% | 100 ÷ 7，workflow + 用户日常聊天共用 |
| Workflow 单次 hard limit | 8% | 一次运行消耗超过 8% 即视为超标（见降级规则） |
| 单次运行估算成本 | 3% | 初始保守估计，来自 2026-09-16 试跑反推；用下方校准记录滚动修正 |
| 聊天预留 | ~6%/天 | 留给用户日常对话，不归 workflow 动用 |

## 运行前预测（每次必做）

1. 跑 `subscription-status status`，记当前用量 `C`。
2. 取估算成本 `E` = 最近 7 次校准记录的平均值（不足 7 次时用 3%）。
3. 预测 `P = C + E`，按三档执行：
   - `P ≤ 90%`：正常跑（2 个 idea + 1 个 SEO 任务）。
   - `90% < P < 97%`：降级跑（只做 2 个 idea，跳过 SEO 任务），汇报里说明。
   - `P ≥ 97%`：**直接跳过本次运行**，不消耗额度，汇报里说明“为保护周预算已暂停，刷新后恢复”。
4. 运行结束再查一次用量，记 `C_after`，实际成本 `C_after - C` 追加到校准记录。

## 校准记录

| 日期 | 运行前 % | 运行后 % | 实际成本 % | 模式 |
|---|---|---|---|---|
| 2026-09-16 | — | 10% | — | 试跑日（含 SEO 地基、+30 idea 等大量额外工作，非标准运行，仅作反推基准：标准运行估算 ≈ 3%） |
| 2026-09-17 | 36% | 38% | 2% | 标准运行（2 idea + 1 SEO 任务 + 部署；QR 编码器经多轮调试验证） |
| 2026-09-18 | 56% | 57% | 1% | 标准运行（2 idea + 1 SEO 任务；部署已 offload 到 GitHub Actions，cron 只写 spec+实现+push） |
| 2026-09-19 | 68% | 68% | 0% | 标准运行（2 idea + 1 SEO 任务；部署由 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-09-20 | 85% | 86% | 1% | 标准运行（2 idea + 1 SEO 任务；部署由 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-09-21 | 93% | 94% | 1% | 降级运行（预算预测 94% 落在 90–97% 档：只做 2 idea，跳过 SEO 任务；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-05 | 14% | 15% | 1% | 标准运行（2 idea + 1 SEO 任务；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-06 | 21% | 21% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 22% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-07 | 0% | 0% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~1% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-08 | 3% | 3% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~4% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-09 | 7% | 7% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~7.4% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；构建中修了 breakout paddle 反弹方向 bug；状态粒度为 1%，实际成本 <1%） |
| 2026-10-10 | 8% | 9% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~8.4% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；构建中修正 heatmap 样本数据因子载荷（TECH×CLOUD 0.584→0.833）；状态粒度为 1%，实际成本 <1%） |
| 2026-10-11 | 14% | 15% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~14.4% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；构建通过双子 agent 并行：蒙特卡洛 sim 分位数单调、零波动路径与连续复利闭式解一致、打地鼠连击/金色/难度递增逻辑 OK；状态粒度为 1%，实际成本 <1%） |
| 2026-10-12 | 17% | 18% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~17.4% 落在 ≤90% 档：全量运行；部署经 GitHub Actions；构建中修了 cron-parser 两处：@快捷写法大小写查找失效、逗号列表误判单值；状态粒度为 1%，实际成本 <1%） |
| 2026-10-13 | n/r | 23% | n/r | 标准运行（2 idea + 1 SEO 任务；构建子 agent 超时，提交/部署/记账由修复流程补完；CI 部署成功，两页 curl 200；状态粒度为 1%） |
| 2026-10-14 | 0% | 1% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~0.5% 落在 ≤90% 档：全量运行；双子 agent 并行构建：wordle-clone 1,365 答案词/daily seed/着色算法 node 校验通过、habit-tracker 13/13 node 校验通过；CI 首轮 seo-check 拦截 habit-tracker 页脚坏链 /lab/（已改 /ideas/ 补提交），第二轮 CI 通过、两页 curl 200；状态粒度为 1%） |
| 2026-10-15 | 8% | 11% | 3% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~8.6% 落在 ≤90% 档：全量运行；双子 agent 并行构建：position-size-calculator node 公式校验通过、jwt-decoder 解码核心 20/20 + 高亮 6/6 通过；本地 seo-check 拦截两处坏链 /lab/（已改 /ideas/，spec 同步），重跑 39 页全通过；CI 部署成功，两页 curl 200；状态粒度为 1%） |
| 2026-10-17 | 20% | 20% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~21.2% 落在 ≤90% 档：全量运行；双子 agent 并行构建：timestamp-converter 21/21 node 校验通过（构建中修了 wallToEpoch 偏移量双减 bug）、mortgage-calc 公式校验通过（$1M/20%/6.5%/30年 P&I=$5,056.54）；seo-check.py 本地 43 页全通过；commit f60dccee 后 CI 部署，两页 curl 200；状态粒度为 1%，实际成本 <1%） |
| 2026-10-18 | 22% | 23% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~23% 落在 ≤90% 档：全量运行；双子 agent 并行构建：tic-tac-toe 12/12 node 校验通过（Unbeatable 对随机 400 局 0 负、Easy 200 局胜率 81%）、orderbook-visualizer 订单簿引擎 2000 步不变式零违反（构建中修了单事件价差超限与 ask 累计深度方向 bug 并回写 spec）；seo-check.py 本地 45 页全通过；状态粒度为 1%） |
| 2026-10-19 | 24% | 25% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~25.2% 落在 ≤90% 档：全量运行；双子 agent 并行构建：base64-lab / vwap-tracker（node --check 通过，JS 核心逻辑经构建 agent node 校验）；seo-check.py 本地 47 页全通过；commit 49060fa5 后 CI 部署，两页 curl 200；状态粒度为 1%） | 标准运行（2 idea + 1 SEO 任务；预算预测 ~23% 落在 ≤90% 档：全量运行；双子 agent 并行构建：tic-tac-toe 12/12 node 校验通过（Unbeatable 对随机 400 局 0 负、Easy 200 局胜率 81%）、orderbook-visualizer 订单簿引擎 2000 步不变式零违反（构建中修了单事件价差超限与 ask 累计深度方向 bug 并回写 spec）；seo-check.py 本地 45 页全通过；状态粒度为 1%） |
| 2026-10-20 | 28% | 29% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~29.2% 落在 ≤90% 档：全量运行；双子 agent 并行构建：connect-four node 校验 19/19 通过（构建中按 spec 补移动端 tap 即落子）、url-codec 23/23 通过（构建中修了无 `?` 输入误判为查询串的边界 case，已回写 spec）；seo-check.py 本地 49 页全通过；commit 76e94e40 后 CI 部署，两页 curl 200；状态粒度为 1%） |
| 2026-10-21 | 0% | 0% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~1% 落在 ≤90% 档：全量运行；双子 agent 并行构建：tip-splitter 分账逻辑 node 校验通过（示例晚餐 5 菜 4 人 $165.03 分毫不差，舍入压力测试 4.76/4.76/4.75；构建中修了每人分项与总额差 1 分边界并回写 spec）、ruin-simulator 蒙特卡洛引擎 node 校验通过（爆仓概率随注码单调、零优势收敛经典理论值、期望终值与闭式解一致）；seo-check.py 本地 51 页全通过；CI 部署（待验证），两页 curl 200；状态粒度为 1%，实际成本 <1%） |
| 2026-10-22 | 3% | 3% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~4% 落在 ≤90% 档：全量运行；hangman 核心逻辑 node 校验 16/16 通过（词库 293 词全 A-Z 无重复、各分类×难度池 ≥8 词、胜/负/重复猜测幂等/提示逻辑；构建中修了严格模式 arguments.callee、Easy 带放宽为 3–5 字母并回写 spec、补齐 hard 词库）、uuid-generator 核心逻辑 node 校验 13/13 通过（1000 个 v4 合规且唯一、v1/v7 版本位+时间戳单调、nil 全零、格式开关与数量钳制）；seo-check.py 本地 53 页全通过；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-23 | 8% | 9% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~8.9% 落在 ≤90% 档：全量运行；双子 agent 并行构建：efficient-frontier node 22/22 通过（手写高斯消元逆矩阵、GMV/max-Sharpe 闭式解、有效前沿单调性、long-only hull 非负性）、flappy-flyer node 15/15 通过（60/120Hz 轨迹完全一致、单管单计分、碰撞夹具；构建中回写 spec 2 处：最大下落速度 560px/s+1/120s 子步长、天花板碰撞钳位不死亡）；seo-check.py 本地 55 页全通过；commit f21426d9 后 CI 部署，两页 curl 200；状态粒度为 1%，实际成本 1%） |
| 2026-10-24 | 10% | 11% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~10.6% 落在 ≤90% 档：全量运行；双子 agent 并行构建：hash-generator node 校验通过（SHA-1/256/384/512("abc")与已知向量一致、空串 SHA-256 一致）、metronome node 校验通过（60/120/240 BPM 对应 1000/500/250ms、点按测速中位数、4/4 与 6/8 重音换拍；构建中修了视觉脉冲覆盖调度节拍计数的问题）；seo-check.py 本地 57 页全通过；sitemap 重生成为 56 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-10-25 | 14% | 15% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~14.7% 落在 ≤90% 档：全量运行；双子 agent 并行构建：trading-journal 核心统计 node 校验通过（样本 6 笔总盈亏 $176、胜率 0.6、盈亏比 ≈3.3158、期望值 ≈29.3333）、pong 核心物理 node 校验通过（挡板/墙壁反弹、得分判定、AI 档位与边界钳制、球速递增封顶）；seo-check.py 本地 59 页全通过；llms.txt 编辑中修了两次描述残留（条目删除须整段删、不能按逗号切）；commit 4cd43fbd 后 CI 部署，两页 curl 200；状态粒度为 1%，实际成本 1%） |
| 2026-10-26 | 19% | 19% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~19.7% 落在 ≤90% 档：全量运行；双子 agent 并行构建：text-diff node 校验 18/18 通过（LCS 行 diff 中段插入/删除对齐、词级 diff、忽略空白开关）、pocket-piano node 校验 26/26 通过（C4 261.63Hz/A4 440Hz、八度倍频、键盘映射、延音 0.15s/1.5s）；seo-check.py 本地 61 页全通过；sitemap 重生成为 60 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-27 | 22% | 23% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~22.6% 落在 ≤90% 档：全量运行；双子 agent 并行构建：funding-arbitrage node 校验通过（$100,000 名义本金 0.01%/8h → 每期 $10、每日 $30、年化 10.95%）、game-of-life 规则经构建 agent 校验（方块静止、闪烁器周期 2、滑翔机 4 代对角平移）；seo-check.py 本地 63 页全通过；sitemap 重生成为 62 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-10-28 | 0% | 0% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~0.6% 落在 ≤90% 档：全量运行；双页自建：word-counter 核心统计 node 校验通过、gas-tracker 成本公式 node 校验通过；seo-check.py 本地 65 页全通过；sitemap 重生成为 64 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-29 | 3% | 3% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~3.6% 落在 ≤90% 档：全量运行；双页自建：maze-lab 核心逻辑 node 校验通过（15/21/31 三档全连通、路径起止与穿墙检查；构建中修了路径重建起点键 0 falsy 导致首格丢失的真 bug）、http-status 核心逻辑 node 校验通过（36 码唯一、分类 3/5/6/17/5、quiz 200 轮答案恒在 4 互异选项中且无立即重复；构建中修了 login/log in 空白敏感搜索问题）；seo-check.py 本地 67 页全通过；sitemap 重生成为 66 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-30 | 9% | 9% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~9.6% 落在 ≤90% 档：全量运行；双页自建：drum-pad WebAudio 合成鼓组 + 16 步音序器、address-validator 内联 Keccak-256 EIP-55 校验（向量与示例地址全通过）；seo-check.py 本地 69 页全通过；sitemap 重生成为 68 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-10-31 | 12% | 12% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~12.4% 落在 ≤90% 档：全量运行；双页自建：easing-visualizer 缓动求解器 node 校验通过（ease 0.5 处 0.8024 与暴力采样一致、ease-out-back 超调 1.098）、vesting-visualizer 解锁数学 node 校验通过（Team 预设 cliff/50%/100% 节点与月度求和精确）；seo-check.py 本地 71 页全通过；sitemap 重生成为 70 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-11-01 | 14% | 15% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~14.3% 落在 ≤90% 档：全量运行；双页自建：rock-paper-scissors 核心逻辑 node 校验通过（9 种组合/counter/最常用平局/bot 60% 反制分支）、gradient-studio CSS 生成 node 校验通过（线性/径向/按位置排序）；seo-check.py 本地 73 页全通过；sitemap 重生成为 72 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-11-02 | 16% | 16% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~16.3% 落在 ≤90% 档：全量运行；双页自建：white-noise 噪音生成 node 校验通过（粉/棕不削波、棕噪音 lag-1 自相关 0.980）、lp-simulator 仓位数学 node 校验通过（入场价值恰等于本金、区间外单一代币、区间内日手续费 $15）；seo-check.py 本地 75 页全通过；sitemap 重生成为 74 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-11-03 | 24% | 24% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~24.3% 落在 ≤90% 档：全量运行；双页自建：shadow-generator 阴影字符串 node 校验通过（标准值/3 位 hex/inset 前缀）、nft-rarity 稀有度数学 node 校验通过（样本 12 件、Gold 仅 1 件、最稀有 #7 总分 24.00）；seo-check.py 本地 77 页全通过；sitemap 重生成为 76 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-11-04 | 0% | 0% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~0.1% 落在 ≤90% 档：全量运行；双页自建：nonogram 线索逻辑 node 校验通过（10×10 种子谜题行列线索与解一致、线索函数 3/3；构建中修了 render 缺失右括号）、flexbox-playground CSS 生成 node 校验通过（column/center 与单项 grow/basis 输出一致；构建中把 Equal 预设 basis 改回 auto 以免 select 无匹配项）；llms.txt 修复说明：首次编辑按 ** 切分误将条目切碎，已按条目对重建并补回 RPS/Gradient/Easing/Vesting，核验 recent=10 条；seo-check.py 本地 79 页全通过；sitemap 重生成为 78 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-11-05 | 10% | 11% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~10.1% 落在 ≤90% 档：全量运行；双子 agent 并行构建：name-picker 核心逻辑 node 校验 16/16 通过（crypto 拒绝采样无模偏、20k 抽分布均匀、不重复抽尽整池；构建中把抽奖动画从 1.2s 改为 ~1.8s 并回写 spec）、seed-phrase-lab node 校验 12/12 通过（官方 BIP39 词表 2048 词已核验嵌入、零熵向量 abandon×11+about、校验和与未知词拒绝、12/15/18/21/24 词全长度往返）；seo-check.py 本地 81 页全通过；sitemap 重生成为 80 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-11-06 | 21% | 22% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~21.3% 落在 ≤90% 档：全量运行；双子 agent 并行构建：grid-builder node 校验 31/31 通过（CSS 生成/区域归一化/重叠检测/四档预设）、eth-unit-converter node 校验 16/16 通过（BigInt 精确换算、gas 成本、非法输入拒绝）；seo-check.py 本地 83 页全通过；sitemap 重生成为 82 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-11-07 | 24% | 24% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~24.4% 落在 ≤90% 档：全量运行；双子 agent 并行构建：pipe-loop node 校验 15/15 通过（5×5/7×7/9×9 各 200 次生成均可解、旋转破坏已解盘面、4 次旋转恒等）、fluid-type node 校验 22/22 通过（默认 clamp(16px, 12.87px + 0.87vw, 24px)、端点/中点/越界钳制与非法输入拒绝）；seo-check.py 本地 85 页全通过；sitemap 重生成为 84 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 <1%） |
| 2026-11-08 | 25% | 26% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~25.4% 落在 ≤90% 档：全量运行；双子 agent 并行构建：quote-generator 核心逻辑 node 校验通过（59 条名言、洗牌真排列、每日一句确定性）、event-decoder node 校验 31/31 通过（Transfer topic0 与已知值一致、样本解码精确）；seo-check.py 本地 87 页全通过；sitemap 重生成为 86 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-11-09 | 29% | 30% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~29.4% 落在 ≤90% 档：全量运行；双子 agent 并行构建：px-rem 核心逻辑 node 校验 30/30 通过、dao-voting-viz 核心逻辑 node 校验 32/32 通过（构建中修了千分位逗号余额解析 bug）；seo-check.py 本地 89 页全通过；sitemap 重生成为 88 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-11-10 | 36% | 37% | 1% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~36.6% 落在 ≤90% 档：全量运行；双子 agent 并行构建：asteroids 核心逻辑 node 校验 33/33 通过、aspect-ratio 核心数学 node 校验 123 断言通过（构建中修了 21:9 marketed 分辨率与精确比例不一致并回写 spec）；seo-check.py 本地 91 页全通过；sitemap 重生成为 90 个 URL；部署经 GitHub Actions；状态粒度为 1%，实际成本 1%） |
| 2026-11-11 | 0% | 0% | 0% | 标准运行（2 idea + 1 SEO 任务；预算预测 ~0.7% 落在 ≤90% 档：全量运行；双子 agent 并行构建：joke-machine 核心逻辑 node 校验 39/39 通过（构建中修了首局误标 reshuffle 的真 bug 并回写 spec）、depeg-monitor 核心逻辑 node 校验 19/19 通过；seo-check.py 本地 93 页全通过；sitemap 重生成为 92 个 URL；部署经 cf_pages_deploy.py Direct Upload，两页 curl 200；状态粒度为 1%，实际成本 <1%） |
