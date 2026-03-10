import React, { useState } from 'react';
import Translate from '@docusaurus/Translate';
import { DIMENSIONS, LEVELS } from '@site/src/data/fluencyData';
import styles from './styles.module.css';

interface DimensionTabsProps {
  locale?: string;
}

export default function DimensionTabs({ locale = 'en' }: DimensionTabsProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const isChinese = locale === 'zh-CN';

  const getLocalizedText = (en: string, cn: string) => isChinese ? cn : en;

  return (
    <div className={styles.tabsComponent}>
      <div className={styles.tabsNav} role="tablist">
        {DIMENSIONS.map((dim, i) => (
          <button
            key={dim.id}
            className={`${styles.tabBtn} ${i === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(i)}
            role="tab"
            aria-selected={i === activeIndex}
          >
            {isChinese ? dim.nameCn : dim.name}
          </button>
        ))}
      </div>
      <div className={styles.tabsContent}>
        {DIMENSIONS.map((dim, i) => (
          <div
            key={dim.id}
            className={`${styles.tabPanel} ${i === activeIndex ? styles.active : ''}`}
            role="tabpanel"
          >
            <div className={styles.dimPanelHeader}>
              <span className={styles.dimPanelName}>{dim.name}</span>
              <span className={styles.dimPanelNameCn}>{dim.nameCn}</span>
            </div>
            <p className={styles.dimPanelSummary}>
              {getLocalizedText(dim.summary, dim.summaryCn)}
            </p>
            <p className={styles.dimPanelDesc}>
              {getLocalizedText(dim.description, dim.descriptionCn)}
            </p>
            <div className={styles.dimLevelsList}>
              {dim.levels.map((level, li) => (
                <div
                  key={li}
                  className={styles.dimLevelItem}
                  style={{ borderLeftColor: LEVELS[li].color }}
                >
                  <div className={styles.dimLevelItemHeader}>
                    <span className={styles.dimLevelDot} style={{ background: LEVELS[li].color }} />
                    <span className={styles.dimLevelLabel}>
                      {LEVELS[li].name} · {LEVELS[li].nameCn}
                    </span>
                  </div>
                  <div className={styles.dimLevelTitle}>
                    {getLocalizedText(level.title, level.titleCn)}
                  </div>
                  <div className={styles.dimLevelDesc}>
                    {getLocalizedText(level.desc, level.descCn)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

