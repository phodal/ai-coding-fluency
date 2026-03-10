import React from 'react';
import { DIMENSIONS, LEVELS } from '@site/src/data/fluencyData';
import styles from './styles.module.css';

interface MatrixProps {
  locale?: string;
}

export default function Matrix({ locale = 'en' }: MatrixProps): JSX.Element {
  const isChinese = locale === 'zh-CN';
  const getLocalizedText = (en: string, cn: string) => isChinese ? cn : en;

  return (
    <div className={styles.matrixWrapper}>
      <div className={styles.matrixGrid}>
        {/* Header row */}
        <div className={styles.matrixHeaderCorner}></div>
        {DIMENSIONS.map(dim => (
          <div key={dim.id} className={styles.matrixHeaderCell}>
            <div className={styles.matrixDimName}>{dim.name}</div>
            <div className={styles.matrixDimNameCn}>{dim.nameCn}</div>
          </div>
        ))}

        {/* Data rows */}
        {LEVELS.map((level, li) => (
          <React.Fragment key={level.id}>
            <div
              className={styles.matrixLevelCell}
              style={{ '--level-color': level.color } as React.CSSProperties}
            >
              <div className={styles.matrixLevelDot}></div>
              <div className={styles.matrixLevelName}>{level.name}</div>
              <div className={styles.matrixLevelNameCn}>{level.nameCn}</div>
            </div>
            {DIMENSIONS.map(dim => {
              const l = dim.levels[li];
              return (
                <div key={`${level.id}-${dim.id}`} className={styles.matrixContentCell}>
                  <div className={styles.matrixCellTitle}>
                    {getLocalizedText(l.title, l.titleCn)}
                  </div>
                  <div className={styles.matrixCellDesc}>
                    {getLocalizedText(l.desc, l.descCn)}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

