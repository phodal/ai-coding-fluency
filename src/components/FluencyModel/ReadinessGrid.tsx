import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface ReadinessItem {
  icon: string;
  titleEn: string;
  titleCn: string;
  descEn: string;
  descCn: string;
}

const READINESS_ITEMS: ReadinessItem[] = [
  {
    icon: '🚀',
    titleEn: 'Fast Feedback Loops',
    titleCn: '快速反馈循环',
    descEn: 'Configure pre-commit hooks to ensure agents get feedback in 5 seconds rather than waiting 10 minutes for CI.',
    descCn: '配置 pre-commit hooks，确保智能体在 5 秒内获得反馈，而不是等待 10 分钟的 CI。'
  },
  {
    icon: '📚',
    titleEn: 'Clear Documentation',
    titleCn: '清晰的文档',
    descEn: 'Maintain comprehensive README, CONTRIBUTING, AGENTS.md. Agents need clear guidance to understand project structure.',
    descCn: '完善 README、CONTRIBUTING、AGENTS.md 等文档。智能体需要明确的指引来理解项目结构。'
  },
  {
    icon: '🧪',
    titleEn: 'Comprehensive Testing',
    titleCn: '完善的测试',
    descEn: 'Establish test coverage gates (recommended >80%), allowing agents to confidently verify their generated code.',
    descCn: '建立测试覆盖率门禁（建议 >80%），让智能体能够自信地验证其生成的代码。'
  },
  {
    icon: '🔒',
    titleEn: 'Automated Quality Gates',
    titleCn: '自动化质量门禁',
    descEn: 'Configure linters, formatters, static analysis, and security scanning for immediate quality feedback.',
    descCn: '配置 Linter、格式化工具、静态分析和安全扫描，为智能体提供即时的质量反馈。'
  },
  {
    icon: '🗺️',
    titleEn: 'Structured Code Organization',
    titleCn: '结构化的代码组织',
    descEn: 'Adopt clear directory structures and naming conventions, use "directory maps" for progressive information disclosure.',
    descCn: '采用清晰的目录结构和命名规范，使用"目录地图"帮助智能体快速定位相关代码。'
  },
  {
    icon: '📊',
    titleEn: 'Observability',
    titleCn: '可观测性',
    descEn: 'Provide agents with access to logging, monitoring, and debugging tools for autonomous diagnosis.',
    descCn: '为智能体提供日志、监控和调试工具的访问权限，让它能够自主诊断问题。'
  }
];

interface ReadinessGridProps {
  locale?: string;
}

export default function ReadinessGrid({ locale = 'en' }: ReadinessGridProps): JSX.Element {
  const isChinese = locale === 'zh-CN';

  return (
    <div className={styles.readinessSection}>
      <div className={styles.readinessGrid}>
        {READINESS_ITEMS.map((item, i) => (
          <div key={i} className={styles.readinessItem}>
            <h3>{item.icon} {isChinese ? item.titleCn : item.titleEn}</h3>
            <p>{isChinese ? item.descCn : item.descEn}</p>
          </div>
        ))}
      </div>
      <div className={styles.readinessNote}>
        <strong>
          <Translate id="fluency.keyInsight">Key Insight:</Translate>
        </strong>{' '}
        <Translate id="fluency.readinessInsight">
          Codebase environment improvements have a compound effect. A better environment makes agents more efficient, more efficient agents can handle more work, thereby freeing up time to further improve the environment.
        </Translate>
      </div>
    </div>
  );
}

