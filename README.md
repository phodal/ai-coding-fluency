# AI Coding Fluency Model

A maturity model for evaluating and advancing AI-assisted software development capabilities across teams and organizations.

## Overview

The AI Coding Fluency Model helps teams assess their maturity level in AI-assisted development across multiple dimensions and identify the key investments needed to progress from their current stage to the next. Adapted from the [Agile Fluency® Project](https://www.agilefluency.org/), this model provides a clear evolution path from initial awareness to full agent-first autonomy.

## Five Fluency Levels

The model defines five distinct fluency levels, each representing a qualitative leap in how teams collaborate with AI:

1. **Awareness (认识/意识唤醒)** - Teams begin to recognize AI coding tools' existence and potential, but usage remains scattered and passive.

2. **Assisted Coding (辅助编码)** - AI serves as a coding assistant integrated into daily development, with developers leading and AI providing real-time assistance.

3. **Structured AI Coding (结构化开发)** - Developers delegate tasks to AI through structured specifications, with AI generating complete code modules.

4. **Agent-Centric (智能体为中心)** - Humans focus on goal decomposition and environment construction, while agents handle the heavy execution work.

5. **Agent-First (智能体优先自治)** - Agents become the primary developers, with humans focusing on system leverage validation and business value.

## Five Assessment Dimensions

Each dimension focuses on a critical aspect of AI integration into the development process:

- **Human-AI Collaboration (人机协作)** - How the collaboration model between humans and AI evolves
- **SDLC Coverage (生命周期覆盖度)** - How many stages of the software development lifecycle AI covers
- **AI Engineering Harness (工程化支撑)** - How mature the engineering infrastructure supporting AI coding is
- **Governance & Quality (质量与治理)** - How code quality and security are ensured for AI-generated code
- **Context Engineering (上下文工程)** - How much contextual information AI can access and utilize

## How to Use

1. **Assess Current State** - For each dimension, identify your team's current fluency level by comparing against the level descriptions.

2. **Set Goals** - Based on your team's business needs and technical capabilities, set reasonable target levels for each dimension.

3. **Plan the Path** - Identify gaps between current and target levels, and develop specific improvement plans.

4. **Continuous Evolution** - Regularly reassess and track progress. Fluency improvement is gradual, and each level transition requires time and practice.

## Features

- Built with [Docusaurus](https://docusaurus.io/) for modern documentation experience
- Interactive React components with tabbed navigation
- Complete matrix view showing all dimensions across fluency levels
- Detailed MDX documentation for each level and dimension
- Bilingual support (English and Chinese)
- Responsive design for mobile and desktop
- GitHub Pages deployment

## Getting Started

Visit the live site: [https://phodal.github.io/ai-coding-fluency/](https://phodal.github.io/ai-coding-fluency/)

### Local Development

```bash
npm install
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the master branch.

## Credits

This model is adapted from the [Agile Fluency® Project](https://www.agilefluency.org/) by Diana Larsen and James Shore.

We also drew inspiration from [Factory.ai's Agent Readiness framework](https://factory.ai/news/agent-readiness), which provides valuable insights on codebase-level readiness for autonomous development. While our model focuses on organizational and process maturity across five dimensions, Factory.ai's framework complements this with technical evaluation criteria for code repositories.

## License

MIT
