import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AI Coding Fluency',
  tagline: 'A maturity model for AI-assisted software development',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://phodal.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/ai-coding-fluency/',

  // GitHub pages deployment config.
  organizationName: 'phodal',
  projectName: 'ai-coding-fluency',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      'zh-CN': {
        label: '简体中文',
        htmlLang: 'zh-CN',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/phodal/ai-coding-fluency/tree/master/',
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI Coding Fluency',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'modelSidebar',
          position: 'left',
          label: 'Model',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/phodal/ai-coding-fluency',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Model',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
            {
              label: 'Complete Matrix',
              to: '/docs/matrix',
            },
            {
              label: 'How to Use',
              to: '/docs/how-to-use',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Agile Fluency® Project',
              href: 'https://www.agilefluency.org/',
            },
            {
              label: 'Factory.ai Agent Readiness',
              href: 'https://factory.ai/news/agent-readiness',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/phodal/ai-coding-fluency',
            },
          ],
        },
      ],
      copyright: `Adapted from the Agile Fluency® Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
