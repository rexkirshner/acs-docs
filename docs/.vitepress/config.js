export default {
  title: 'AI Context System',
  description: 'Externalize AI context. Enable human-AI collaboration. Perfect session continuity.',

  ignoreDeadLinks: true,

  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-65S3KZSEY8' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-65S3KZSEY8');
    `]
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Commands', link: '/commands/' },
      { text: 'Workflows', link: '/workflows/' },
      {
        text: 'v3.2.2',
        items: [
          { text: 'Changelog', link: '/about/changelog' },
          { text: 'Migration Guides', link: '/about/migration' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Your First Session', link: '/guide/first-session' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Session Continuity', link: '/guide/session-continuity' },
            { text: 'Externalized Context', link: '/guide/externalized-context' },
            { text: 'Mental Models', link: '/guide/mental-models' },
            { text: 'Multi-AI Support', link: '/guide/multi-ai' }
          ]
        },
        {
          text: 'Documentation Files',
          items: [
            { text: 'CONTEXT.md', link: '/guide/context-file' },
            { text: 'STATUS.md', link: '/guide/status-file' },
            { text: 'DECISIONS.md', link: '/guide/decisions-file' },
            { text: 'SESSIONS.md', link: '/guide/sessions-file' }
          ]
        }
      ],

      '/commands/': [
        {
          text: 'Setup Commands',
          items: [
            { text: 'Overview', link: '/commands/' },
            { text: '/init-context', link: '/commands/init-context' },
            { text: '/migrate-context', link: '/commands/migrate-context' }
          ]
        },
        {
          text: 'Daily Use',
          items: [
            { text: '/save', link: '/commands/save' },
            { text: '/save-full', link: '/commands/save-full' },
            { text: '/review-context', link: '/commands/review-context' }
          ]
        },
        {
          text: 'Collaboration',
          items: [
            { text: '/code-review', link: '/commands/code-review' },
            { text: '/export-context', link: '/commands/export-context' }
          ]
        },
        {
          text: 'Maintenance',
          items: [
            { text: '/validate-context', link: '/commands/validate-context' },
            { text: '/update-context-system', link: '/commands/update-context-system' },
            { text: '/update-templates', link: '/commands/update-templates' }
          ]
        }
      ],

      '/workflows/': [
        {
          text: 'Common Workflows',
          items: [
            { text: 'Overview', link: '/workflows/' },
            { text: 'Daily Work', link: '/workflows/daily-work' },
            { text: 'AI-to-AI Handoff', link: '/workflows/ai-handoff' },
            { text: 'Human Review', link: '/workflows/human-review' },
            { text: 'Meta-Projects', link: '/workflows/meta-projects' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rexkirshner/ai-context-system' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Built for all AI coding assistants. Optimized for Claude Code.',
      copyright: 'Use freely for personal or commercial projects'
    }
  }
}
