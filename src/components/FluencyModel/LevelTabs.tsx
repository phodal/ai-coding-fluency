import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { LEVELS, Level } from '@site/src/data/fluencyData';
import styles from './styles.module.css';

interface LevelTabsProps {
  locale?: string;
}

export default function LevelTabs({ locale = 'en' }: LevelTabsProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const isChinese = locale === 'zh-CN';

  const getLocalizedText = (en: string | string[], cn: string | string[]) => {
    return isChinese ? cn : en;
  };

  return (
    <div className={styles.tabsComponent}>
      <div className={styles.tabsNav} role="tablist">
        {LEVELS.map((level, i) => (
          <button
            key={level.id}
            className={`${styles.tabBtn} ${i === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(i)}
            role="tab"
            aria-selected={i === activeIndex}
          >
            <span className={styles.tabDot} style={{ background: level.color }} />
            {level.name}
          </button>
        ))}
      </div>
      <div className={styles.tabsContent}>
        {LEVELS.map((level, i) => (
          <div
            key={level.id}
            className={`${styles.tabPanel} ${i === activeIndex ? styles.active : ''}`}
            role="tabpanel"
          >
            <div className={styles.levelPanelHeader}>
              <span className={styles.levelPanelDot} style={{ background: level.color }} />
              <span className={styles.levelPanelName}>{level.name}</span>
              <span className={styles.levelPanelNameCn}>{level.nameCn}</span>
            </div>
            <p className={styles.levelPanelSummary}>
              {getLocalizedText(level.summary, level.summaryCn)}
            </p>
            <p className={styles.levelPanelDesc}>
              {getLocalizedText(level.description, level.descriptionCn)}
            </p>
            <div className={styles.levelSignals}>
              <h4><Translate id="fluency.keySignals">Key Signals</Translate></h4>
              <ul>
                {(getLocalizedText(level.signals, level.signalsCn) as string[]).map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
            <div className={styles.levelInvestments}>
              <h4><Translate id="fluency.keyInvestments">Key Investments</Translate></h4>
              <ul>
                {(getLocalizedText(level.investments, level.investmentsCn) as string[]).map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
            <div className={styles.levelMetrics}>
              <h4><Translate id="fluency.metrics">Metrics</Translate></h4>
              <ul>
                {(getLocalizedText(level.metrics, level.metricsCn) as string[]).map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

