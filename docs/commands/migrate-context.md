# /migrate-context

Migrate existing project documentation to AI Context System while preserving all content.

## Overview

Designed for mature projects with existing documentation. This command:
- Preserves ALL existing content (zero data loss)
- Organizes scattered documentation into standard structure
- Augments existing docs with new sections
- Creates missing files from templates
- Maintains your existing work while adding AI Context System benefits

**Philosophy:** Work with what you have. Don't force rewrites. Preserve and organize.

## When to Use

**Use /migrate-context for:**
- Projects with 2+ significant documentation files
- Existing README.md + ARCHITECTURE.md
- Projects with scattered docs in root directory
- Projects with docs/ directory containing markdown files
- Converting from other documentation systems
- Projects with code reviews, lighthouse reports, or other artifacts

**Use /init-context instead for:**
- New projects with no documentation
- Projects with only a basic README
- Starting fresh

::: tip Auto-Detection
/migrate-context automatically detects new projects and suggests /init-context if you have <2 documentation files.
:::

## What Gets Migrated

### Documentation Files

**README.md**
- Kept in place (project entry point)
- Referenced from context/CONTEXT.md
- No duplication

**ARCHITECTURE.md**
- Moved to context/ARCHITECTURE.md
- Existing content preserved
- New sections added if missing

**docs/ directory**
- Scanned for markdown files
- Referenced from context/CONTEXT.md
- Optionally consolidated

**Scattered docs**
- PRD.md → context/PRD.md
- DESIGN.md → Referenced or moved
- ROADMAP.md → Referenced from STATUS.md

### Artifact Files

**Code reviews** - code-reviews/ → artifacts/code-reviews/

**Lighthouse reports** - lighthouse/ → artifacts/lighthouse/

**Performance data** - performance/ → artifacts/performance/

**Security scans** - security/ → artifacts/security/

**Bundle analysis** - bundle-analysis/ → artifacts/bundle-analysis/

**Coverage reports** - coverage/ → artifacts/coverage/

## How It Works

### Step 1: Scan Existing Structure

Automatically detects:
```bash
Found existing documentation:
   📄 README.md (512 lines)
   📄 ARCHITECTURE.md (234 lines)
   📁 docs/ directory (12 files)
   📁 code-reviews/ (3 reviews)
   📄 PRD.md (145 lines)
```

### Step 2: Create Standard Structure

```
project/
├── context/                   # NEW - organized documentation
│   ├── claude.md             # NEW - AI entry point
│   ├── CONTEXT.md            # NEW - references README.md, docs/
│   ├── STATUS.md             # NEW - current state
│   ├── DECISIONS.md          # NEW - decision log
│   ├── SESSIONS.md           # NEW - session history
│   ├── ARCHITECTURE.md       # MOVED from root
│   ├── PRD.md                # MOVED from root
│   └── context-feedback.md   # NEW - system feedback
│
├── artifacts/                 # NEW - organized outputs
│   ├── code-reviews/         # MOVED from root
│   ├── lighthouse/           # MOVED from root
│   └── ...
│
├── README.md                  # KEPT - unchanged
└── docs/                      # KEPT - referenced from CONTEXT.md
```

### Step 3: Augment Existing Files

Existing files get NEW sections added:

**ARCHITECTURE.md** gets:
- Decision Rationale section
- Trade-offs section
- When to Reconsider section

**PRD.md** gets:
- Status tracking
- Decision links
- Change history

**Preserves existing content** - only adds new sections at bottom

### Step 4: Create Missing Files

Files that don't exist are created from templates:
- context/claude.md (AI entry point)
- context/CONTEXT.md (references existing README/docs)
- context/STATUS.md (current state)
- context/DECISIONS.md (decision log)
- context/SESSIONS.md (session history)

## Migration Strategies

### Strategy 1: Reference (Recommended)

Keep docs where they are, reference from CONTEXT.md:

```markdown
# In context/CONTEXT.md

## What & Why

See [README.md](../README.md) for project overview.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design.

## Detailed Documentation

See [docs/](../docs/) for:
- API documentation
- Component guides
- Integration docs
```

**Pros:** Minimal changes, existing links still work

**Cons:** Some duplication possible

### Strategy 2: Consolidate

Move everything to context/:

```markdown
# User decides for each file:
ARCHITECTURE.md → context/ARCHITECTURE.md (moved)
PRD.md → context/PRD.md (moved)
docs/api.md → context/API.md (moved)
```

**Pros:** Everything in one place

**Cons:** May break existing links

### Strategy 3: Hybrid (Most Common)

Mix of both:
- Keep README.md in root (entry point)
- Move architecture docs to context/
- Reference detailed docs/ directory
- Move artifacts to artifacts/

**Pros:** Balance of organization and minimal disruption

**Cons:** Requires judgment calls

## Example Migration

### Before

```
my-app/
├── README.md
├── ARCHITECTURE.md
├── PRD.md
├── docs/
│   ├── api.md
│   └── deployment.md
├── code-reviews/
│   └── review-001.md
└── lighthouse/
    └── report-2025-10.json
```

### After

```
my-app/
├── README.md                      # KEPT (entry point)
├── docs/                          # KEPT (referenced)
│   ├── api.md
│   └── deployment.md
│
├── context/                       # NEW
│   ├── claude.md                 # NEW
│   ├── CONTEXT.md                # NEW (references README, docs/)
│   ├── STATUS.md                 # NEW
│   ├── DECISIONS.md              # NEW
│   ├── SESSIONS.md               # NEW
│   ├── ARCHITECTURE.md           # MOVED
│   ├── PRD.md                    # MOVED
│   ├── context-feedback.md       # NEW
│   └── .context-config.json      # NEW
│
└── artifacts/                     # NEW
    ├── code-reviews/             # MOVED
    │   └── review-001.md
    └── lighthouse/               # MOVED
        └── report-2025-10.json
```

### Generated context/CONTEXT.md

```markdown
# Project Context

## What & Why

See [README.md](../README.md) for complete project overview.

**Quick summary:**
- Personal portfolio site with blog
- Next.js 14, TypeScript, PostgreSQL
- Hosted on Vercel

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete system design.

## Documentation

**Detailed documentation in [docs/](../docs/):**
- [API Documentation](../docs/api.md)
- [Deployment Guide](../docs/deployment.md)

## Product Requirements

See [PRD.md](./PRD.md) for product vision and roadmap.
```

## Interactive Mode

During migration, AI will ask for your preferences:

```bash
Found: ARCHITECTURE.md (234 lines)
Action options:
  [M] Move to context/ARCHITECTURE.md
  [R] Reference from context/CONTEXT.md
  [K] Keep in place (no changes)
Your choice [M/R/K]: M

✅ Moved ARCHITECTURE.md → context/ARCHITECTURE.md

Found: docs/ directory (12 markdown files)
Action options:
  [C] Consolidate into context/
  [R] Reference from context/CONTEXT.md
  [K] Keep as-is
Your choice [C/R/K]: R

✅ Added reference to docs/ in context/CONTEXT.md
```

## Best Practices

### Preserve Git History

If moving files, use git mv:
```bash
git mv ARCHITECTURE.md context/ARCHITECTURE.md
git commit -m "Migrate: Move ARCHITECTURE.md to context/"
```

### Update Links Incrementally

After migration:
1. Test existing documentation still loads
2. Update links in README.md to point to new locations
3. Add redirects if needed
4. Update CI/CD paths

### Communicate with Team

Before migrating team projects:
1. Share migration plan
2. Get buy-in from team
3. Migrate during quiet period
4. Update team documentation
5. Share new workflow guide

### Start Fresh with DECISIONS.md

Don't try to backfill all historical decisions:
- Start logging decisions from migration forward
- Add critical past decisions if needed
- Focus on future, not perfect history

## Troubleshooting

### "Would overwrite existing file"

**Problem:** Target file already exists

**Solution:**
```bash
# Check what exists:
ls -la context/

# If context/ARCHITECTURE.md exists:
# 1. Backup existing:
cp context/ARCHITECTURE.md context/ARCHITECTURE.md.backup

# 2. Merge manually:
# Combine old and new content

# 3. Or skip migration for that file
```

### Links broken after migration

**Problem:** Internal links 404 after moving files

**Solution:**
```bash
# Update relative links in moved files
# Before (in root ARCHITECTURE.md):
[API Docs](docs/api.md)

# After (in context/ARCHITECTURE.md):
[API Docs](../docs/api.md)  # Add ../
```

### Too many files to review

**Problem:** Hundreds of files detected

**Solution:**
```bash
# Focus on main docs only:
# - README.md (keep)
# - ARCHITECTURE.md (move)
# - docs/*.md (reference)

# Ignore build artifacts:
# - node_modules/
# - dist/
# - .next/
```

## Related Commands

- [/init-context](/commands/init-context) - For new projects
- [/validate-context](/commands/validate-context) - Check migration success
- [/update-templates](/commands/update-templates) - Update migrated files

## See Also

- [Migration Guide](/about/migration) - Version-specific migrations
- [Getting Started](/guide/getting-started) - Post-migration workflow
- [CONTEXT.md Guide](/guide/context-file) - Customizing orientation
