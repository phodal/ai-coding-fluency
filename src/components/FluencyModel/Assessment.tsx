import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import { DIMENSIONS, LEVELS } from '@site/src/data/fluencyData';
import styles from './styles.module.css';

interface AssessmentState {
  [dimension: string]: number; // level index
}

export default function Assessment(): JSX.Element {
  const [selections, setSelections] = useState<AssessmentState>({});
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fluency-assessment');
    if (saved) {
      try {
        setSelections(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved assessment', e);
      }
    }
  }, []);

  const handleSelection = (dimensionId: string, levelIndex: number) => {
    const newSelections = { ...selections, [dimensionId]: levelIndex };
    setSelections(newSelections);
    localStorage.setItem('fluency-assessment', JSON.stringify(newSelections));
  };

  const handleReset = () => {
    setSelections({});
    localStorage.removeItem('fluency-assessment');
    setShowRecommendations(false);
  };

  const getRecommendations = (dimensionId: string, currentLevel: number) => {
    if (currentLevel >= LEVELS.length - 1) {
      return null; // Already at highest level
    }

    const nextLevel = LEVELS[currentLevel + 1];
    const dimension = DIMENSIONS.find(d => d.id === dimensionId);

    return {
      nextLevel: nextLevel.name,
      investments: nextLevel.keyInvestments || [],
    };
  };

  const allDimensionsSelected = DIMENSIONS.every(
    d => selections[d.id] !== undefined
  );

  return (
    <div className={styles.assessment}>
      <div className={styles.assessmentHeader}>
        <h2>
          <Translate id="assessment.title">流畅度自评估</Translate>
        </h2>
        <p>
          <Translate id="assessment.subtitle">
            评估您的团队在 AI 辅助开发各维度的当前水平
          </Translate>
        </p>
      </div>

      <div className={styles.assessmentGrid}>
        {DIMENSIONS.map((dimension) => (
          <div key={dimension.id} className={styles.assessmentDimension}>
            <h3>{dimension.name}</h3>
            <p className={styles.dimensionDesc}>{dimension.description}</p>

            <div className={styles.levelSelector}>
              <label>
                <Translate id="assessment.selectLevel">选择当前等级</Translate>:
              </label>
              <div className={styles.levelButtons}>
                {LEVELS.map((level, index) => (
                  <button
                    key={level.id}
                    className={`${styles.levelButton} ${
                      selections[dimension.id] === index ? styles.selected : ''
                    }`}
                    onClick={() => handleSelection(dimension.id, index)}
                    title={level.name}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {selections[dimension.id] !== undefined && (
                <div className={styles.selectedLevel}>
                  <strong>
                    <Translate id="assessment.yourLevel">您的等级</Translate>:
                  </strong>{' '}
                  {LEVELS[selections[dimension.id]].name}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.assessmentActions}>
        <button
          className={styles.primaryButton}
          onClick={() => setShowRecommendations(!showRecommendations)}
          disabled={!allDimensionsSelected}
        >
          <Translate id="assessment.recommendations">改进建议</Translate>
        </button>
        <button className={styles.secondaryButton} onClick={handleReset}>
          <Translate id="assessment.reset">重置评估</Translate>
        </button>
      </div>

      {showRecommendations && allDimensionsSelected && (
        <div className={styles.recommendations}>
          <h3>
            <Translate id="assessment.nextSteps">下一步行动</Translate>
          </h3>
          {DIMENSIONS.map((dimension) => {
            const currentLevel = selections[dimension.id];
            const recommendations = getRecommendations(dimension.id, currentLevel);

            if (!recommendations) return null;

            return (
              <div key={dimension.id} className={styles.recommendation}>
                <h4>{dimension.name}</h4>
                <p>
                  <strong>当前:</strong> {LEVELS[currentLevel].name} →{' '}
                  <strong>下一级:</strong> {recommendations.nextLevel}
                </p>
                {recommendations.investments.length > 0 && (
                  <ul>
                    {recommendations.investments.map((investment, idx) => (
                      <li key={idx}>{investment}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

