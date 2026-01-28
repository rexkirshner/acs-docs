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
      { text: 'Home', link: '/' }
    ],

    sidebar: {},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rexkirshner/ai-context-system' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      copyright: 'A <a href="https://scratchspace.dev/" target="_blank" rel="noopener">Scratch Space</a> Story.'
    }
  }
}
