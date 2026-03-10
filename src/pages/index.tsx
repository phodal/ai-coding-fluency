import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import { LevelTabs, DimensionTabs, Matrix, ReadinessGrid } from '@site/src/components/FluencyModel';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          AI Coding Fluency Model
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.subtitle">
            AI is gradually entering the core of software development
          </Translate>
        </p>
        <p className={styles.heroDesc}>
          <Translate id="homepage.description">
            The AI Coding Fluency Model helps teams assess their maturity level across various dimensions of AI-assisted development and identify the key investments needed to progress.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            <Translate id="homepage.getStarted">Get Started</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI Coding Fluency Model"
      description="A maturity model for evaluating AI-assisted software development">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2">
              <Translate id="homepage.fiveLevels">Five Fluency Levels</Translate>
            </Heading>
            <p>
              <Translate id="homepage.levelsDesc">
                From initial awareness to full autonomy, each level represents a qualitative shift in how teams collaborate with AI.
              </Translate>
            </p>
            <LevelTabs />
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <Heading as="h2">
              <Translate id="homepage.fiveDimensions">Five Assessment Dimensions</Translate>
            </Heading>
            <p>
              <Translate id="homepage.dimensionsDesc">
                Each dimension focuses on a key aspect of AI integration into the development process.
              </Translate>
            </p>
            <DimensionTabs />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Heading as="h2">
              <Translate id="homepage.completeMatrix">Complete Matrix</Translate>
            </Heading>
            <p>
              <Translate id="homepage.matrixDesc">
                The following matrix displays the key characteristics of the five dimensions at each fluency level.
              </Translate>
            </p>
            <Matrix />
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <Heading as="h2">
              <Translate id="homepage.codebaseReadiness">Codebase Readiness</Translate>
            </Heading>
            <p>
              <Translate id="homepage.readinessDesc">
                The effectiveness of AI coding agents depends not only on model capabilities but also on the codebase environment itself.
              </Translate>
            </p>
            <ReadinessGrid />
          </div>
        </section>
      </main>
    </Layout>
  );
}
