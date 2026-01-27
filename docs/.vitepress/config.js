export default {
  title: 'AI Context System',
  description: 'Session continuity for AI coding. Pick up exactly where you left off.',

  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-65S3KZSEY8' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-65S3KZSEY8');
    `],
    ['meta', { property: 'og:image', content: 'https://acs-docs.pages.dev/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:title', content: 'AI Context System' }],
    ['meta', { property: 'og:description', content: 'Session continuity for AI coding. Pick up exactly where you left off.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://acs-docs.pages.dev/og-image.png' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Commands', link: '/commands/' },
      { text: 'Workflows', link: '/workflows/' },
      {
        text: 'v6.0.6',
        items: [
          { text: 'Changelog', link: '/about/changelog' },
          { text: 'Migration Guide', link: '/about/migration' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/getting-started' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Session Continuity', link: '/guide/session-continuity' },
            { text: 'Multi-AI Support', link: '/guide/multi-ai' }
          ]
        },
        {
          text: 'Context Files',
          items: [
            { text: 'CLAUDE.md', link: '/guide/claude-md' },
            { text: 'STATUS.md', link: '/guide/status-file' },
            { text: 'DECISIONS.md', link: '/guide/decisions-file' }
          ]
        },
        {
          text: 'Help',
          items: [
            { text: 'Troubleshooting', link: '/guide/troubleshooting' }
          ]
        }
      ],

      '/commands/': [
        {
          text: 'Commands',
          items: [
            { text: 'Overview', link: '/commands/' },
            { text: '/init-context', link: '/commands/init-context' },
            { text: '/save', link: '/commands/save' },
            { text: '/update-context-system', link: '/commands/update-context-system' }
          ]
        }
      ],

      '/workflows/': [
        {
          text: 'Workflows',
          items: [
            { text: 'Overview', link: '/workflows/' }
          ]
        }
      ],

      '/about/': [
        {
          text: 'About',
          items: [
            { text: 'Changelog', link: '/about/changelog' },
            { text: 'Migration Guide', link: '/about/migration' }
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
      copyright: '© 2026 AI Context System. A <a href="https://scratchspace.dev/" target="_blank" rel="noopener">Scratch Space</a> Project.'
    }
  }
}
