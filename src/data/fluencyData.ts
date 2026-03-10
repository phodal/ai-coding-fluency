export const COLORS = {
  pink: '#F2617A', teal: '#003D4F', yellow: '#CC850A',
  green: '#6B9E78', blue: '#47A1AD', purple: '#634F7D',
};

export interface Level {
  id: string; name: string; nameCn: string; color: string;
  summary: string; summaryCn: string;
  description: string; descriptionCn: string;
  signals: string[]; signalsCn: string[];
  investments: string[]; investmentsCn: string[];
  metrics: string[]; metricsCn: string[];
}

export interface DimensionLevel {
  title: string; titleCn: string; desc: string; descCn: string;
}

export interface Dimension {
  id: string; name: string; nameCn: string; color: string;
  summary: string; summaryCn: string;
  description: string; descriptionCn: string;
  levels: DimensionLevel[];
}

export const LEVELS: Level[] = [
  {
    id: 'awareness', name: 'Awareness', nameCn: '认识/意识唤醒', color: COLORS.yellow,
    summary: 'Teams begin to recognize AI coding tools\' existence and potential.',
    summaryCn: '团队开始意识到 AI 编码工具的存在和潜力，但使用方式仍然是零散的、被动的。',
    description: 'Developers interact with AI through Q&A, treating it as a smarter search engine. AI tools exist as standalone chat interfaces.',
    descriptionCn: '开发者主要通过问答方式与 AI 交互，将其视为一个更智能的搜索引擎。AI 工具以独立的对话界面存在，与现有开发工具链没有集成。',
    signals: ['Using ChatGPT for technical queries', 'Cautious attitude toward AI code', 'Individual initiative only'],
    signalsCn: ['使用 ChatGPT 查询技术问题', '对 AI 生成代码持谨慎态度', 'AI 使用依赖个人主动性'],
    investments: ['Internal AI tool sharing sessions', 'Basic AI usage guidelines', 'Encourage tool experimentation'],
    investmentsCn: ['组织 AI 编码工具内部分享会', '建立 AI 使用基本指南', '鼓励尝试不同 AI 工具'],
    metrics: ['Team AI awareness', 'AI tool trial rate', 'Sharing frequency'],
    metricsCn: ['团队 AI 认知度', 'AI 工具试用率', '分享讨论频率']
  },
  {
    id: 'assisted-coding', name: 'Assisted Coding', nameCn: '辅助编码', color: COLORS.blue,
    summary: 'AI serves as a coding assistant integrated into daily development.',
    summaryCn: 'AI 作为编码助手融入日常开发，开发者主导编写，AI 提供实时辅助。',
    description: 'Developers use AI plugins in IDE for code completion, error fixing, and basic test generation.',
    descriptionCn: '开发者在 IDE 中使用 AI 插件获得代码补全、错误修复和基础测试生成能力。',
    signals: ['Team uses Copilot or similar', 'Completion acceptance tracked', 'Basic AI code review process'],
    signalsCn: ['团队统一使用 Copilot 等插件', 'AI 补全接受率可追踪', '建立基础 AI 代码审查流程'],
    investments: ['Unified IDE AI plugins', 'Code standards and linters', 'AI code review checklist', 'Hallucination training'],
    investmentsCn: ['统一部署 IDE AI 插件', '配置代码规范和 Linter', '建立 AI 代码 Review 清单', '培训识别 AI 幻觉'],
    metrics: ['Acceptance rate >25%', 'AI-assisted developer %', 'Quality issue rate', 'Efficiency improvement'],
    metricsCn: ['补全接受率 >25%', 'AI 辅助开发者占比', '质量问题率', '效率提升百分比']
  },
  {
    id: 'structured-ai-coding', name: 'Structured AI Coding', nameCn: '结构化开发', color: COLORS.green,
    summary: 'Developers delegate tasks to AI through structured specifications.',
    summaryCn: '开发者通过结构化的方式委托任务给 AI，AI 能生成完整的代码模块。',
    description: 'Developers define specs, AI generates complete modules with CI/CD integration and RAG-based knowledge retrieval.',
    descriptionCn: '开发者定义 Spec，AI 协助生成完整模块。AI 工具与 CI/CD 流水线集成，通过仓库级 RAG 技术实现知识检索。',
    signals: ['Spec-driven AI workflows', 'CI/CD AI feedback loops', 'Automated test gates'],
    signalsCn: ['Spec 驱动的 AI 工作流', 'CI/CD 中集成 AI 反馈循环', '测试覆盖率门禁自动化'],
    investments: ['Codebase readiness baseline', 'Pre-commit hooks', 'Documentation', 'Test coverage >80%', 'CI/CD integration', 'RAG system'],
    investmentsCn: ['建立代码库就绪度基线', '配置 pre-commit hooks', '完善文档', '测试覆盖率门禁 >80%', 'CI/CD 集成', '建立 RAG 系统'],
    metrics: ['Readiness score Level 3', 'CI time <5min', 'Coverage >80%', 'First-pass rate', 'Spec-to-deploy time'],
    metricsCn: ['就绪度评分 Level 3', 'CI 反馈时间 <5分钟', '测试覆盖率 >80%', '首次通过率', 'Spec 到部署时间']
  },
  {
    id: 'agent-centric', name: 'Agent-Centric', nameCn: '智能体为中心', color: COLORS.purple,
    summary: 'Humans focus on goals and environment, agents handle execution.',
    summaryCn: '人类专注于目标拆解和环境构建，智能体承担主要的执行工作。',
    description: 'Human role transforms to architect. AI manages CI/CD, monitoring, with custom linters enforcing architecture.',
    descriptionCn: '人类角色从编码者转变为架构师。AI 不仅写业务代码，还管理 CI/CD、监控仪表盘等泛代码资产。',
    signals: ['End-to-end agent development', 'Agent Linter enforcement', 'Agent-optimized codebase'],
    signalsCn: ['智能体独立完成端到端功能开发', '架构约束通过 Agent Linter 执行', '代码仓库针对智能体优化'],
    investments: ['AGENTS.md', 'Agent Linter', 'Codebase optimization', 'Observability stack', 'DevOps access', 'Directory maps'],
    investmentsCn: ['创建 AGENTS.md', '开发 Agent Linter', '优化代码库结构', '建立可观测性工具栈', '实现 DevOps 访问', '设计目录地图'],
    metrics: ['Task completion >70%', 'Violation detection rate', 'Completion time', 'Intervention -50%', 'Readability score'],
    metricsCn: ['任务完成率 >70%', '架构违规检测率', '任务完成时间', '人工干预降低 50%', '可读性评分']
  },
  {
    id: 'agent-first', name: 'Agent-First', nameCn: '智能体优先自治', color: COLORS.teal,
    summary: 'Agents are primary developers, humans validate business value.',
    summaryCn: '智能体成为开发的主体，人类专注于验证系统杠杆与业务价值。',
    description: 'Humans focus on system design. Agents autonomously handle bug-to-PR flow with multi-agent collaboration.',
    descriptionCn: '人类不再手写代码，专注于系统设计和业务价值验证。智能体自主复现 Bug、修复、验证并合并 PR。',
    signals: ['Autonomous bug-to-PR flow', 'Multi-agent review', 'Knowledge agent docs'],
    signalsCn: ['智能体自主完成 Bug 到 PR 全流程', '多智能体协作代码审查', '知识智能体维护文档'],
    investments: ['Multi-agent framework', 'Autonomous PR flow', 'Quality agents', 'Knowledge agents', 'Minimal interfaces', 'Self-monitoring'],
    investmentsCn: ['建立多智能体框架', '实现自主 PR 流程', '部署质量智能体', '建立知识智能体', '设计最小化接口', '实现自我监控'],
    metrics: ['Agent PR >80%', 'Bug-fix time', 'Entropy trends', 'Human contribution <20%', 'Doc coverage', 'Multi-agent efficiency'],
    metricsCn: ['智能体 PR 占比 >80%', 'Bug 修复时间', '代码熵值趋势', '人类贡献 <20%', '文档自动更新覆盖率', '多智能体协作效率']
  },
];




export const DIMENSIONS: Dimension[] = [
  {
    id: 'human-ai', name: 'Human-AI Collaboration', nameCn: '人机协作', color: COLORS.pink,
    summary: 'How the collaboration model between humans and AI evolves.',
    summaryCn: '人与 AI 之间的协作模式如何演进——从被动问答到主动委托，再到完全自治。',
    description: 'This dimension focuses on the interaction patterns and responsibility allocation between developers and AI.',
    descriptionCn: '这个维度关注的是开发者与 AI 之间的互动方式和职责分配。',
    levels: [
      { title: 'Q&A Assistance', titleCn: '问答求助', desc: 'Developers ask, AI answers.', descCn: '开发者提问，AI 解答。' },
      { title: 'Smart Completion', titleCn: '智能补全', desc: 'Developers lead, AI completes.', descCn: '开发者主导编写，AI 即时补全。' },
      { title: 'Task Delegation', titleCn: '任务委托', desc: 'Developers define specs, AI generates modules.', descCn: '开发者定义 Spec，AI 生成模块。' },
      { title: 'Goal + Environment', titleCn: '目标拆解 + 环境构建', desc: 'Humans decompose goals, agents execute.', descCn: '人类拆解目标，智能体执行。' },
      { title: 'Validation & Leverage', titleCn: '验证与杠杆', desc: 'Humans validate business value only.', descCn: '人类专注验证业务价值。' }
    ]
  },
  {
    id: 'sdlc', name: 'SDLC Coverage', nameCn: '生命周期覆盖度', color: COLORS.blue,
    summary: 'How many stages of the SDLC AI covers.',
    summaryCn: 'AI 在软件开发生命周期中覆盖了多少环节。',
    description: 'This dimension measures AI penetration across SDLC stages.',
    descriptionCn: '这个维度衡量 AI 在 SDLC 各环节的渗透程度。',
    levels: [
      { title: 'Information Retrieval', titleCn: '信息获取', desc: 'Technical lookup, code snippets.', descCn: '技术查阅、代码片段。' },
      { title: 'Coding & Debugging', titleCn: '编码调试', desc: 'IDE code generation, error fixing.', descCn: 'IDE 代码生成、错误修复。' },
      { title: 'Process Expansion', titleCn: '流程拓展', desc: 'Batch tests, refactoring, scaffolding.', descCn: '批量测试、重构、脚手架。' },
      { title: 'Meta-Code Generation', titleCn: '泛代码生成', desc: 'AI manages CI/CD, monitoring.', descCn: 'AI 管理 CI/CD、监控。' },
      { title: 'End-to-End Autonomy', titleCn: '端到端自治', desc: 'Agents handle bug-to-PR flow.', descCn: '智能体处理 Bug 到 PR 全流程。' }
    ]
  },
  {
    id: 'engineering', name: 'AI Engineering Harness', nameCn: '工程化支撑', color: COLORS.green,
    summary: 'How mature the engineering infrastructure is.',
    summaryCn: '支撑 AI 编码的工程基础设施有多完善。',
    description: 'This dimension evaluates engineering infrastructure maturity.',
    descriptionCn: '这个维度评估工程化基础设施的成熟度。',
    levels: [
      { title: 'Scattered Tools', titleCn: '零散工具', desc: 'Standalone chat UI, no integration.', descCn: '独立对话 UI，无集成。' },
      { title: 'IDE Plugin Integration', titleCn: 'IDE 插件集成', desc: 'Basic observe-act-feedback loop.', descCn: '基础观察-动作-反馈循环。' },
      { title: 'Workflow Loop', titleCn: 'Workflow 闭环', desc: 'IDE/CLI Agent + CI + auto feedback.', descCn: 'Agent + CI + 自动反馈。' },
      { title: 'Agent Infrastructure', titleCn: '智能体基建', desc: 'Agents have observability and UI control.', descCn: '智能体有可观测性和 UI 控制。' },
      { title: 'High-Throughput Loop', titleCn: '高吞吐闭环', desc: 'Fast merge, multi-agent reviews.', descCn: '极速合并、多轮 Review。' }
    ]
  },
  {
    id: 'governance', name: 'Governance & Quality', nameCn: '质量与治理', color: COLORS.purple,
    summary: 'How code quality and security are ensured.',
    summaryCn: '如何确保 AI 生成代码的质量和安全。',
    description: 'This dimension focuses on quality assurance mechanisms.',
    descriptionCn: '这个维度关注质量保障和治理机制。',
    levels: [
      { title: 'Fully Manual', titleCn: '完全人工', desc: 'Manual code review only.', descCn: '依赖人工 Review。' },
      { title: 'Traditional Validation', titleCn: '传统校验', desc: 'Linter, formatter, manual hallucination check.', descCn: 'Linter、Format、人工防幻觉。' },
      { title: 'Integrated Verification', titleCn: '融合验证', desc: 'Static analysis, test coverage gates.', descCn: '静态分析、测试覆盖率门禁。' },
      { title: 'Architecture Constraints', titleCn: '架构约束', desc: 'Agent Linter enforces boundaries.', descCn: 'Agent Linter 强制架构边界。' },
      { title: 'Background GC', titleCn: '后台垃圾回收', desc: 'Agents clean code entropy and debt.', descCn: '智能体清理代码熵值和技术债。' }
    ]
  },
  {
    id: 'context', name: 'Context Engineering', nameCn: '上下文工程', color: COLORS.teal,
    summary: 'How much context AI can access and utilize.',
    summaryCn: 'AI 能获取和利用多少上下文信息。',
    description: 'This dimension evaluates AI context capabilities.',
    descriptionCn: '这个维度评估 AI 的上下文能力。',
    levels: [
      { title: 'Ephemeral Context', titleCn: '瞬时上下文', desc: 'Single conversation, no memory.', descCn: '单次对话，无记忆。' },
      { title: 'File-Level Context', titleCn: '文件级上下文', desc: 'Current file and nearby tabs.', descCn: '当前文件、相近 Tab。' },
      { title: 'Repo-Level Retrieval', titleCn: '仓库级检索', desc: 'Repo RAG, historical Issues/PRs.', descCn: '仓库级 RAG，历史 Issue/PR。' },
      { title: 'Agent Readability', titleCn: '智能体可读性', desc: 'Directory maps + progressive disclosure.', descCn: '目录地图 + 渐进式披露。' },
      { title: 'Self-Evolving Knowledge', titleCn: '知识自我演进', desc: 'Knowledge agents maintain system memory.', descCn: '知识智能体维持系统记忆。' }
    ]
  },
];