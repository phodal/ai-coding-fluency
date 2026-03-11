import React, { useState } from 'react';
import { DIMENSIONS, LEVELS } from '@site/src/data/fluencyData';
import styles from './styles.module.css';

interface InteractiveMatrixProps {
  locale?: string;
}

interface SelectedCell {
  levelId: string;
  dimensionId: string;
}

export default function InteractiveMatrix({ locale = 'en' }: InteractiveMatrixProps): JSX.Element {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [highlightedLevel, setHighlightedLevel] = useState<string | null>(null);
  const [highlightedDimension, setHighlightedDimension] = useState<string | null>(null);

  const isChinese = locale === 'zh-CN';
  const getLocalizedText = (en: string, cn: string) => isChinese ? cn : en;

  const handleCellClick = (levelId: string, dimensionId: string) => {
    if (selectedCell?.levelId === levelId && selectedCell?.dimensionId === dimensionId) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ levelId, dimensionId });
    }
  };

  const isSelected = (levelId: string, dimensionId: string) => {
    return selectedCell?.levelId === levelId && selectedCell?.dimensionId === dimensionId;
  };

  const isHighlighted = (levelId: string, dimensionId: string) => {
    return (highlightedLevel === levelId || highlightedDimension === dimensionId) &&
           !isSelected(levelId, dimensionId);
  };

  const getSelectedCellDetails = () => {
    if (!selectedCell) return null;

    const level = LEVELS.find(l => l.id === selectedCell.levelId);
    const dimension = DIMENSIONS.find(d => d.id === selectedCell.dimensionId);
    
    if (!level || !dimension) return null;

    const levelIndex = LEVELS.findIndex(l => l.id === selectedCell.levelId);
    const cellData = dimension.levels[levelIndex];

    return {
      level,
      dimension,
      cellData,
    };
  };

  const details = getSelectedCellDetails();

  return (
    <div className={styles.interactiveMatrixContainer}>
      <div className={styles.matrixWrapper}>
        <div className={styles.matrixGrid}>
          {/* Header row */}
          <div className={styles.matrixHeaderCorner}></div>
          {DIMENSIONS.map(dim => (
            <div 
              key={dim.id} 
              className={`${styles.matrixHeaderCell} ${
                highlightedDimension === dim.id ? styles.highlighted : ''
              }`}
              onMouseEnter={() => setHighlightedDimension(dim.id)}
              onMouseLeave={() => setHighlightedDimension(null)}
            >
              <div className={styles.matrixDimName}>{dim.name}</div>
              <div className={styles.matrixDimNameCn}>{dim.nameCn}</div>
            </div>
          ))}

          {/* Data rows */}
          {LEVELS.map((level, li) => (
            <React.Fragment key={level.id}>
              <div
                className={`${styles.matrixLevelCell} ${
                  highlightedLevel === level.id ? styles.highlighted : ''
                }`}
                style={{ '--level-color': level.color } as React.CSSProperties}
                onMouseEnter={() => setHighlightedLevel(level.id)}
                onMouseLeave={() => setHighlightedLevel(null)}
              >
                <div className={styles.matrixLevelDot}></div>
                <div className={styles.matrixLevelName}>{level.name}</div>
                <div className={styles.matrixLevelNameCn}>{level.nameCn}</div>
              </div>
              {DIMENSIONS.map(dim => {
                const l = dim.levels[li];
                const selected = isSelected(level.id, dim.id);
                const highlighted = isHighlighted(level.id, dim.id);
                
                return (
                  <div 
                    key={`${level.id}-${dim.id}`} 
                    className={`${styles.matrixContentCell} ${
                      selected ? styles.selectedCell : ''
                    } ${highlighted ? styles.highlightedCell : ''} ${styles.clickableCell}`}
                    onClick={() => handleCellClick(level.id, dim.id)}
                    onMouseEnter={() => {
                      setHighlightedLevel(level.id);
                      setHighlightedDimension(dim.id);
                    }}
                    onMouseLeave={() => {
                      setHighlightedLevel(null);
                      setHighlightedDimension(null);
                    }}
                  >
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

      {details && (
        <div className={styles.cellDetailsPanel}>
          <div className={styles.detailsHeader}>
            <h3>
              {details.dimension.name} - {details.level.name}
            </h3>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedCell(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className={styles.detailsContent}>
            <div className={styles.detailSection}>
              <h4>{getLocalizedText('Characteristic', '特征')}</h4>
              <p><strong>{getLocalizedText(details.cellData.title, details.cellData.titleCn)}</strong></p>
              <p>{getLocalizedText(details.cellData.desc, details.cellData.descCn)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

