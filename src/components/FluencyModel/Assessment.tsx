import React, { useState, useEffect } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { DIMENSIONS, LEVELS } from '@site/src/data/fluencyData';
import styles from './styles.module.css';

interface AssessmentState {
  [dimension: string]: {
    current: number;
    target: number;
  };
}

type ViewMode = 'dashboard' | 'dimension' | 'report';

export default function Assessment(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isChinese = i18n.currentLocale === 'zh-CN';

  const [selections, setSelections] = useState<AssessmentState>({});
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fluency-assessment-v2');
    if (saved) {
      try {
        setSelections(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved assessment', e);
      }
    }
  }, []);

  const saveSelections = (newSelections: AssessmentState) => {
    setSelections(newSelections);
    localStorage.setItem('fluency-assessment-v2', JSON.stringify(newSelections));
  };

  const handleSelectFluency = (dimensionId: string) => {
    setActiveDimension(dimensionId);
    setViewMode('dimension');
  };

  const handleLevelSelect = (dimensionId: string, current: number, target: number) => {
    const newSelections = {
      ...selections,
      [dimensionId]: { current, target }
    };
    saveSelections(newSelections);
  };

  const handleBackToDashboard = () => {
    setViewMode('dashboard');
    setActiveDimension(null);
  };

  const handleReset = () => {
    setSelections({});
    localStorage.removeItem('fluency-assessment-v2');
    setViewMode('dashboard');
    setActiveDimension(null);
  };

  const completedCount = Object.keys(selections).length;
  const totalCount = DIMENSIONS.length;

  const getLocalizedText = (en: string, cn: string) => isChinese ? cn : en;

  // Dashboard View - Similar to ThoughtWorks
  const renderDashboard = () => (
    <div className={styles.dfmDashboard}>
      <div className={styles.dfmHeader}>
        <h2>{getLocalizedText('AI Coding Fluency Assessment', 'AI 编码流畅度评估')}</h2>
        <p className={styles.dfmSubtitle}>
          {getLocalizedText(
            'Map out your current and aspired level of fluency for each dimension and identify the investments required to achieve your goals. Select a dimension to get started.',
            '评估您在每个维度的当前和目标流畅度等级，识别达成目标所需的关键投入。选择一个维度开始评估。'
          )}
        </p>
      </div>

      <div className={styles.dfmBlocks}>
        {DIMENSIONS.map((dimension) => {
          const selection = selections[dimension.id];
          const isCompleted = !!selection;

          return (
            <div
              key={dimension.id}
              className={`${styles.dfmBlock} ${isCompleted ? styles.completed : ''}`}
              style={{ '--block-color': dimension.color } as React.CSSProperties}
            >
              <div className={styles.dfmBlockHeader}>
                <div className={styles.dfmBlockIcon} style={{ backgroundColor: dimension.color }}>
                  {isCompleted && <span className={styles.checkmark}>✓</span>}
                </div>
                <h3>{dimension.name}</h3>
                <p className={styles.dfmBlockNameCn}>{dimension.nameCn}</p>
              </div>
              <p className={styles.dfmBlockDesc}>
                {getLocalizedText(dimension.summary, dimension.summaryCn)}
              </p>
              {isCompleted && (
                <div className={styles.dfmBlockStatus}>
                  <span className={styles.statusLabel}>
                    {getLocalizedText('Current', '当前')}: {LEVELS[selection.current].name}
                  </span>
                  <span className={styles.statusArrow}>→</span>
                  <span className={styles.statusLabel}>
                    {getLocalizedText('Target', '目标')}: {LEVELS[selection.target].name}
                  </span>
                </div>
              )}
              <button
                className={styles.dfmSelectButton}
                onClick={() => handleSelectFluency(dimension.id)}
              >
                {isCompleted
                  ? getLocalizedText('Edit Selection', '修改选择')
                  : getLocalizedText('Select Fluency', '选择等级')
                }
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.dfmProgress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        <span className={styles.progressText}>
          {completedCount}/{totalCount} {getLocalizedText('dimensions completed', '个维度已完成')}
        </span>
      </div>

      <div className={styles.dfmActions}>
        {completedCount === totalCount && (
          <button
            className={styles.primaryButton}
            onClick={() => setViewMode('report')}
          >
            {getLocalizedText('View Your Fluency Pattern', '查看您的流畅度模式')}
          </button>
        )}
        {completedCount > 0 && (
          <button className={styles.secondaryButton} onClick={handleReset}>
            {getLocalizedText('Reset All', '重置全部')}
          </button>
        )}
      </div>
    </div>
  );

  // Dimension Detail View
  const renderDimensionView = () => {
    const dimension = DIMENSIONS.find(d => d.id === activeDimension);
    if (!dimension) return null;

    const selection = selections[dimension.id] || { current: -1, target: -1 };

    return (
      <div className={styles.dfmDimensionView}>
        <button className={styles.backButton} onClick={handleBackToDashboard}>
          ← {getLocalizedText('Back to Dashboard', '返回仪表盘')}
        </button>

        <div className={styles.dfmDimensionHeader} style={{ borderColor: dimension.color }}>
          <h2>{dimension.name}</h2>
          <p className={styles.dfmDimensionNameCn}>{dimension.nameCn}</p>
          <p className={styles.dfmDimensionDesc}>
            {getLocalizedText(dimension.description, dimension.descriptionCn)}
          </p>
        </div>

        <div className={styles.dfmLevelSelection}>
          <h3>{getLocalizedText('Select Your Current Level', '选择您的当前等级')}</h3>
          <p className={styles.selectionHint}>
            {getLocalizedText(
              'Where is your team today?',
              '您的团队目前处于哪个等级？'
            )}
          </p>

          <div className={styles.dfmLevels}>
            {LEVELS.map((level, index) => {
              const dimLevel = dimension.levels[index];
              const isCurrentSelected = selection.current === index;

              return (
                <div
                  key={level.id}
                  className={`${styles.dfmLevelCard} ${isCurrentSelected ? styles.currentSelected : ''}`}
                  onClick={() => handleLevelSelect(dimension.id, index, Math.max(index, selection.target))}
                >
                  <div className={styles.dfmLevelHeader}>
                    <div
                      className={styles.dfmLevelDot}
                      style={{ backgroundColor: level.color }}
                    />
                    <div className={styles.dfmLevelInfo}>
                      <span className={styles.dfmLevelName}>{level.name}</span>
                      <span className={styles.dfmLevelNameCn}>{level.nameCn}</span>
                    </div>
                    {isCurrentSelected && (
                      <span className={styles.currentBadge}>
                        {getLocalizedText('Current', '当前')}
                      </span>
                    )}
                  </div>
                  <div className={styles.dfmLevelContent}>
                    <h4>{getLocalizedText(dimLevel.title, dimLevel.titleCn)}</h4>
                    <p>{getLocalizedText(dimLevel.desc, dimLevel.descCn)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selection.current >= 0 && (
          <div className={styles.dfmTargetSelection}>
            <h3>{getLocalizedText('Select Your Target Level', '选择您的目标等级')}</h3>
            <p className={styles.selectionHint}>
              {getLocalizedText(
                'Where do you want to be? (Must be equal to or higher than current)',
                '您希望达到哪个等级？（必须等于或高于当前等级）'
              )}
            </p>

            <div className={styles.dfmLevels}>
              {LEVELS.map((level, index) => {
                const dimLevel = dimension.levels[index];
                const isTargetSelected = selection.target === index;
                const isDisabled = index < selection.current;

                return (
                  <div
                    key={level.id}
                    className={`${styles.dfmLevelCard} ${isTargetSelected ? styles.targetSelected : ''} ${isDisabled ? styles.disabled : ''}`}
                    onClick={() => !isDisabled && handleLevelSelect(dimension.id, selection.current, index)}
                  >
                    <div className={styles.dfmLevelHeader}>
                      <div
                        className={styles.dfmLevelDot}
                        style={{ backgroundColor: level.color }}
                      />
                      <div className={styles.dfmLevelInfo}>
                        <span className={styles.dfmLevelName}>{level.name}</span>
                        <span className={styles.dfmLevelNameCn}>{level.nameCn}</span>
                      </div>
                      {isTargetSelected && (
                        <span className={styles.targetBadge}>
                          {getLocalizedText('Target', '目标')}
                        </span>
                      )}
                    </div>
                    <div className={styles.dfmLevelContent}>
                      <h4>{getLocalizedText(dimLevel.title, dimLevel.titleCn)}</h4>
                      <p>{getLocalizedText(dimLevel.desc, dimLevel.descCn)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selection.current >= 0 && selection.target >= 0 && selection.target > selection.current && (
          <div className={styles.dfmInvestments}>
            <h3>{getLocalizedText('Recommended Investments', '建议投入')}</h3>
            <p className={styles.investmentHint}>
              {getLocalizedText(
                `To progress from ${LEVELS[selection.current].name} to ${LEVELS[selection.target].name}, consider these investments:`,
                `从 ${LEVELS[selection.current].nameCn} 进阶到 ${LEVELS[selection.target].nameCn}，建议以下投入：`
              )}
            </p>

            {Array.from({ length: selection.target - selection.current }, (_, i) => {
              const levelIndex = selection.current + i + 1;
              const level = LEVELS[levelIndex];
              return (
                <div key={level.id} className={styles.investmentPhase}>
                  <h4 style={{ color: level.color }}>
                    {getLocalizedText(`Phase ${i + 1}: ${level.name}`, `阶段 ${i + 1}：${level.nameCn}`)}
                  </h4>
                  <ul>
                    {(isChinese ? level.investmentsCn : level.investments).map((inv, idx) => (
                      <li key={idx}>{inv}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.dfmDimensionActions}>
          <button className={styles.primaryButton} onClick={handleBackToDashboard}>
            {getLocalizedText('Save & Continue', '保存并继续')}
          </button>
        </div>
      </div>
    );
  };

  // Report View
  const renderReport = () => (
    <div className={styles.dfmReport}>
      <button className={styles.backButton} onClick={handleBackToDashboard}>
        ← {getLocalizedText('Back to Dashboard', '返回仪表盘')}
      </button>

      <div className={styles.dfmReportHeader}>
        <h2>{getLocalizedText('Your AI Coding Fluency Pattern', '您的 AI 编码流畅度模式')}</h2>
        <p>
          {getLocalizedText(
            'This pattern shows your current state and target aspirations across all dimensions. Use this to guide your investment decisions and track progress.',
            '此模式展示了您在所有维度的当前状态和目标愿景。用它来指导投资决策和跟踪进度。'
          )}
        </p>
      </div>

      <div className={styles.dfmPatternGrid}>
        {DIMENSIONS.map((dimension) => {
          const selection = selections[dimension.id];
          if (!selection) return null;

          const currentLevel = LEVELS[selection.current];
          const targetLevel = LEVELS[selection.target];
          const gap = selection.target - selection.current;

          return (
            <div key={dimension.id} className={styles.dfmPatternCard}>
              <div className={styles.patternHeader} style={{ backgroundColor: dimension.color }}>
                <h3>{dimension.name}</h3>
                <p>{dimension.nameCn}</p>
              </div>
              <div className={styles.patternBody}>
                <div className={styles.patternLevels}>
                  <div className={styles.patternLevel}>
                    <span className={styles.patternLevelLabel}>
                      {getLocalizedText('Current', '当前')}
                    </span>
                    <span className={styles.patternLevelValue} style={{ color: currentLevel.color }}>
                      {currentLevel.name}
                    </span>
                  </div>
                  <div className={styles.patternArrow}>→</div>
                  <div className={styles.patternLevel}>
                    <span className={styles.patternLevelLabel}>
                      {getLocalizedText('Target', '目标')}
                    </span>
                    <span className={styles.patternLevelValue} style={{ color: targetLevel.color }}>
                      {targetLevel.name}
                    </span>
                  </div>
                </div>
                {gap > 0 && (
                  <div className={styles.patternGap}>
                    <span className={styles.gapLabel}>
                      {getLocalizedText('Gap', '差距')}: {gap} {getLocalizedText('level(s)', '个等级')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.dfmReportSummary}>
        <h3>{getLocalizedText('Investment Roadmap', '投资路线图')}</h3>
        {DIMENSIONS.map((dimension) => {
          const selection = selections[dimension.id];
          if (!selection || selection.target <= selection.current) return null;

          return (
            <div key={dimension.id} className={styles.roadmapSection}>
              <h4 style={{ color: dimension.color }}>{dimension.name}</h4>
              {Array.from({ length: selection.target - selection.current }, (_, i) => {
                const levelIndex = selection.current + i + 1;
                const level = LEVELS[levelIndex];
                return (
                  <div key={level.id} className={styles.roadmapPhase}>
                    <div className={styles.phaseHeader}>
                      <span className={styles.phaseDot} style={{ backgroundColor: level.color }} />
                      <span>{level.name} ({level.nameCn})</span>
                    </div>
                    <ul>
                      {(isChinese ? level.investmentsCn : level.investments).slice(0, 3).map((inv, idx) => (
                        <li key={idx}>{inv}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className={styles.dfmReportActions}>
        <button className={styles.secondaryButton} onClick={handleBackToDashboard}>
          {getLocalizedText('Edit Selections', '修改选择')}
        </button>
        <button className={styles.secondaryButton} onClick={handleReset}>
          {getLocalizedText('Start Over', '重新开始')}
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.dfmContainer}>
      {viewMode === 'dashboard' && renderDashboard()}
      {viewMode === 'dimension' && renderDimensionView()}
      {viewMode === 'report' && renderReport()}
    </div>
  );
}

