import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  modelSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Fluency Levels',
      items: ['levels/awareness', 'levels/assisted-coding', 'levels/structured-ai-coding', 'levels/agent-centric', 'levels/agent-first'],
    },
    {
      type: 'category',
      label: 'Dimensions',
      items: ['dimensions/human-ai', 'dimensions/sdlc', 'dimensions/engineering', 'dimensions/governance', 'dimensions/context'],
    },
    'matrix',
    'codebase-readiness',
    'how-to-use',
  ],
};

export default sidebars;
