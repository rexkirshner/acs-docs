export default {
  title: 'AI Context System',
  description: 'A swan song: what I learned building context management for AI coding tools.',

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
    ['meta', { property: 'og:description', content: 'A swan song: what I learned building context management for AI coding tools.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://acs-docs.pages.dev/og-image.png' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Commands', link: '/commands/' }
    ],

    sidebar: {
      '/commands/': [
        {
          text: 'Commands',
          items: [
            { text: 'Overview', link: '/commands/' },
            { text: '/update-context', link: '/commands/update-context' },
            { text: '/save-session', link: '/commands/save-session' },
            { text: '/review', link: '/commands/review' },
            { text: '/cleanup-acs', link: '/commands/cleanup-acs' }
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
