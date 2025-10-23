# Meta-Project Workflow

Managing parent directories that contain multiple sub-repositories with AI Context System.

## What is a Meta-Project?

**Meta-project:** Parent directory containing multiple sub-repositories, each with its own codebase.

**Example structure:**
```
~/projects/portfolio/              # Meta-project (parent)
├── .claude/                        # Meta-project commands
├── context/                        # Meta-project context
│   ├── claude.md
│   ├── CONTEXT.md
│   ├── STATUS.md
│   ├── DECISIONS.md
│   └── SESSIONS.md
├── frontend/                       # Sub-repo 1
│   └── .git/
├── backend/                        # Sub-repo 2
│   └── .git/
├── mobile/                         # Sub-repo 3
│   └── .git/
└── infrastructure/                 # Sub-repo 4
    └── .git/
```

**Why this matters:**
- Tracks cross-repo architecture decisions
- Documents how services interact
- Maintains consistency across repos
- Enables working from any subdirectory

## Setup

### 1. Install in Parent Directory

```bash
cd ~/projects/portfolio
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash
```

**What gets created:**
```
portfolio/
├── .claude/commands/     # Available from any subdirectory
├── context/              # Meta-project documentation
└── scripts/              # Helper scripts
```

### 2. Initialize Meta-Project

```bash
/init-context
```

**When prompted:**
```
Detected existing documentation:
- frontend/README.md
- backend/README.md
- mobile/README.md

This appears to be a MATURE project.
You should use /migrate-context instead.

Switch to /migrate-context? [Y/n]
```

**Choose based on:**
- New meta-project with no docs → `/init-context`
- Existing repos with docs → `/migrate-context`

### 3. Configure as Meta-Project

Edit `.context-config.json`:
```json
{
  "project": {
    "type": "meta-project",
    "subProjects": [
      "frontend",
      "backend",
      "mobile",
      "infrastructure"
    ]
  }
}
```

**This tells the system:**
- Multiple git repositories exist
- Cross-repo context management
- Different git status handling

## Working from Anywhere

### Context Folder Detection

**The system finds context/ automatically:**

```bash
# Work from parent
cd ~/projects/portfolio
/save  # ✅ Finds context/

# Work from sub-repo
cd ~/projects/portfolio/backend
/save  # ✅ Finds ../context/

# Work from nested directory
cd ~/projects/portfolio/backend/src/api
/save  # ✅ Finds ../../../context/

# Up to 3 parent levels
cd ~/projects/portfolio/backend/src/api/routes
/save  # ✅ Finds ../../../../context/
```

**How it works:**
1. Check current directory for context/
2. Check parent directory
3. Check grandparent directory
4. Check great-grandparent directory
5. If found, use it
6. If not found, error

### Git Status Handling

**Meta-projects have special git handling:**

```bash
# From parent directory:
/save

# Output:
ℹ️  Meta-project detected (sub-repos have git repositories)
💡 Tip: Track file changes manually or run from sub-repo

# No git status shown (parent has no .git)
```

**From sub-repo:**
```bash
cd backend/
/save

# Output:
✅ Git repository detected
Branch: main
New: 2 | Modified: 5 | Staged: 1

# Shows git status for backend repo
```

## Cross-Repo Documentation

### Architecture Decisions

**Document how repos interact:**

```markdown
## DEC-020: Microservices Architecture

**Decision:** Split into 4 repositories (frontend, backend, mobile, infra)

**Date:** 2025-09-15

**Context:** Monorepo became too large (50K+ LOC), slow CI/CD,
team wanted independent deploys.

**Repositories:**
- `frontend/` - Next.js web app (Vercel)
- `backend/` - Express API (Railway)
- `mobile/` - React Native (Expo)
- `infrastructure/` - Terraform configs (AWS)

**Communication:**
- Frontend → Backend: REST API (https://api.portfolio.com)
- Mobile → Backend: Same REST API
- Backend → Database: PostgreSQL (Supabase)

**Deployment:**
- Frontend: Vercel (auto-deploy on push to main)
- Backend: Railway (auto-deploy on push to main)
- Mobile: Manual builds (Expo)
- Infrastructure: Manual apply (Terraform Cloud)

**Tradeoffs:**
- ✅ Independent deploys, parallel dev, clear ownership
- ❌ More repos to manage, API versioning complexity

**Reconsider if:**
- Team shrinks below 3 people (overhead not worth it)
- Coordination overhead exceeds benefits
- Need atomic commits across repos
```

### Service Dependencies

**Document in CONTEXT.md:**

```markdown
## Architecture

**System Design:**
```
[Mobile App] ──┐
               │
[Web App]   ───┼──→ [Backend API] ──→ [PostgreSQL]
               │         ↓
               │    [Redis Cache]
               │         ↓
               └───→ [File Storage]
```

**Repository Boundaries:**
- `frontend/`: Web UI (React, Next.js 14)
- `backend/`: API + business logic (Express, Prisma)
- `mobile/`: Mobile UI (React Native, Expo)
- `infrastructure/`: Deployment configs (Terraform)

**API Contract:**
- Version: v1 (breaking changes → v2)
- Base URL: https://api.portfolio.com/v1
- Auth: JWT (15min access, 7day refresh)
- Docs: OpenAPI spec in backend/docs/openapi.yaml

**Shared Contracts:**
- Type definitions: backend/src/types/api.ts
- Generated for frontend: npm run generate-types
- Mobile uses same types (shared via npm package)
```

### Cross-Repo Changes

**Document in SESSIONS.md:**

```markdown
## Session 25 | 2025-10-24 | API Version Bump (v1 → v2)

**Affected Repos:**
- backend/ (API changes)
- frontend/ (client updates)
- mobile/ (client updates)

**What Changed:**

**Backend (backend/):**
- Added /v2/users endpoint with new fields
- Deprecated /v1/users (kept for 6 months)
- Migration guide in backend/MIGRATION_v1_v2.md

**Frontend (frontend/):**
- Updated API client to use /v2
- Added new user profile fields
- Tested with both v1 and v2

**Mobile (mobile/):**
- Updated API client to use /v2
- Added new user fields to profile screen
- Backward compatible with v1 (graceful degradation)

**Deployment Order:**
1. Backend first (supports both v1 and v2)
2. Frontend next (uses v2, falls back to v1)
3. Mobile last (uses v2, falls back to v1)

**Rollback Plan:**
- Backend: Toggle feature flag to disable v2
- Frontend: Environment variable to use v1
- Mobile: App update not forced (old version works)
```

## Daily Workflow

### Start Session

```bash
# From anywhere in meta-project:
/review-context

# Shows:
# - Meta-project status
# - Current focus across all repos
# - Cross-repo blockers
# - Last session summary
```

### Work in Sub-Repo

```bash
# Go to sub-repo you're working on
cd backend/

# Work on code
# ... make changes ...

# Save from sub-repo
/save

# System:
# 1. Finds context/ in parent (auto-detection)
# 2. Shows git status for backend repo
# 3. Updates STATUS.md with backend changes
```

### Work Across Multiple Repos

```bash
# Working on feature spanning frontend + backend

# 1. Work in backend
cd backend/
# ... implement API endpoint ...
git add . && git commit -m "Add user profile endpoint"

# 2. Work in frontend
cd ../frontend/
# ... implement UI for profile ...
git add . && git commit -m "Add user profile page"

# 3. Save from parent
cd ..
/save-full

# SESSIONS.md entry documents:
# - Changes in backend/
# - Changes in frontend/
# - How they work together
# - Cross-repo dependencies
```

## Best Practices

### 1. Document Cross-Repo Architecture

```markdown
# In CONTEXT.md, explain:
- How repos communicate
- API contracts
- Shared types/schemas
- Deployment dependencies
- Data flow

# Don't assume it's obvious
# New AI or human needs to understand
```

### 2. Track Deployment Order

```markdown
# In DECISIONS.md:
## DEC-025: Deployment Order

Backend must deploy before frontend because:
- Frontend depends on new API endpoints
- Backend maintains backward compatibility
- Zero-downtime deployment

**Order:**
1. Backend (Railway auto-deploy)
2. Wait for health check
3. Frontend (Vercel auto-deploy)
4. Verify end-to-end
5. Mobile (manual release)
```

### 3. Use Meta-Project for Shared Decisions

```markdown
# Meta-project DECISIONS.md:
- Architecture choices
- Cross-repo standards
- API versioning strategy
- Shared tooling decisions

# Sub-repo decisions:
- Implementation details
- Repo-specific tech choices
- Internal refactoring
```

### 4. Version API Contracts

```markdown
# Document in DECISIONS.md:
## DEC-022: API Versioning Strategy

**Decision:** URL-based versioning (/v1, /v2)

**Deprecation:**
- Old version supported for 6 months
- Clients auto-migrate during window
- Hard cutoff after 6 months

**Breaking changes:**
- Increment version (/v2)
- Keep /v1 running
- Document migration in backend/MIGRATION.md
```

### 5. Run /save-full from Parent

```bash
# At end of session, run from parent:
cd ~/projects/portfolio
/save-full

# Captures work across all repos
# Documents cross-repo changes
# Maintains meta-project context
```

## Troubleshooting

### Multiple .claude Directories Warning

```bash
/save

# Output:
⚠️  Warning: Multiple .claude directories found:
   /projects/portfolio/.claude
   /projects/portfolio/backend/.claude

Which to use?
```

**Problem:** Sub-repo has its own `.claude` directory.

**Solution:**
```bash
# Remove .claude from sub-repo:
rm -rf backend/.claude

# Keep only meta-project .claude:
# /projects/portfolio/.claude

# Exception: If backend is used independently,
# keep its .claude, but document in CONTEXT.md
```

### Git Status Not Showing

```bash
# From parent directory:
/save

# Output:
ℹ️  Meta-project detected (sub-repos have git repositories)
💡 Tip: Track file changes manually or run from sub-repo
```

**This is expected behavior:**
- Parent has no .git
- Sub-repos each have .git
- System can't show unified git status

**Solution:**
```bash
# Run from specific sub-repo to see git status:
cd backend/
/save

# Or manually check:
git -C frontend/ status
git -C backend/ status
git -C mobile/ status
```

## Real-World Example

### Portfolio Meta-Project

**Structure:**
```
~/projects/portfolio/
├── .claude/commands/
├── context/
│   ├── CONTEXT.md       # Meta-project overview
│   ├── STATUS.md        # Cross-repo status
│   ├── DECISIONS.md     # Architecture decisions
│   └── SESSIONS.md      # Meta-project history
├── frontend/            # Next.js web app
│   └── .git/
├── backend/             # Express API
│   └── .git/
└── mobile/              # React Native app
    └── .git/
```

**CONTEXT.md (meta-project):**
```markdown
## What & Why

**Project:** Personal portfolio site + blog + project showcase

**Architecture:** Microservices (frontend, backend, mobile)

**Repositories:**
- `frontend/`: Web app (Next.js, Vercel)
- `backend/`: API (Express, Railway, PostgreSQL)
- `mobile/`: Mobile app (React Native, Expo)

## How Repos Communicate

Frontend/Mobile → Backend API → PostgreSQL
                        ↓
                   Redis Cache

**API Base:** https://api.rex.dev/v1
**Auth:** JWT tokens (access + refresh)
```

**DECISIONS.md (meta-project):**
```markdown
## DEC-015: Split into Microservices

**Decision:** Split monorepo into 3 repos

**Why:** Independent deployment, team autonomy, clearer ownership

## DEC-018: Shared TypeScript Types

**Decision:** Backend generates types, frontend/mobile consume

**How:** backend/src/types/ → npm package → imported by clients
```

**SESSIONS.md (meta-project):**
```markdown
## Session 10 | API v2 Migration

**Affected Repos:** backend, frontend, mobile

**Changes:**
- Backend: Added /v2 endpoints
- Frontend: Migrated to /v2 client
- Mobile: Updated API calls

**Deployment:** Backend first, then frontend, then mobile release
```

## Success Metric

> **"I can work from any subdirectory in my meta-project, run commands, and have full context—without manually navigating to parent directory."**

When this is true, meta-project setup is effective.

## Next Steps

- [/init-context Command](/commands/init-context)
- [/migrate-context Command](/commands/migrate-context)
- [CONTEXT.md Guide](/guide/context-file)
- [Daily Work Workflow](/workflows/daily-work)
