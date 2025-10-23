# AI Context System Documentation

Documentation site for the [AI Context System](https://github.com/rexkirshner/ai-context-system).

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Deployment

This site is deployed to Cloudflare Pages at [acs.rexkirshner.com](https://acs.rexkirshner.com).

**Build settings:**
- Build command: `npm run docs:build`
- Build output directory: `docs/.vitepress/dist`
- Node version: 18 or higher

## Structure

```
acs-docs/
├── docs/
│   ├── .vitepress/
│   │   └── config.js        # VitePress configuration
│   ├── index.md             # Home page
│   ├── guide/               # Getting started & concepts
│   ├── commands/            # Command reference
│   ├── workflows/           # Common workflows
│   └── about/               # Changelog, migration guides
├── package.json
└── README.md
```

## Contributing

Content is migrated from the main [ai-context-system](https://github.com/rexkirshner/ai-context-system) repository.

To update documentation:
1. Update source content in main repo
2. Migrate changes to this docs site
3. Build and deploy
