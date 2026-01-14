# CONTEXT.md - Project Orientation

**Who, what, how, why.** The entry point for any AI agent or human taking over your project.

## Purpose

CONTEXT.md provides **complete project orientation** in one place:
- What the project is and why it exists
- Who it's for and how we work
- Technical stack and architecture
- Communication preferences
- Anti-patterns (what NOT to do)

**Goal:** Any AI agent or human can read this file and understand the project in 5-10 minutes.

## When to Read

**AI agents should read CONTEXT.md:**
- ✅ First time working on project
- ✅ After long break (1+ weeks)
- ✅ Before major architecture changes
- ✅ During AI-to-AI handoffs

**Humans should read CONTEXT.md:**
- ✅ Onboarding to project
- ✅ Before code reviews
- ✅ When verifying AI understood requirements

## File Structure

### 1. What & Why

**Project identity and purpose:**

```markdown
## What & Why

**Project:** Task management platform for remote teams

**Business Goal:** Help distributed teams coordinate work across timezones

**Target Users:**
- Primary: Remote team leads (10-50 person teams)
- Secondary: Individual contributors tracking personal work

**Key Value Proposition:**
- Async-first design (no real-time required)
- Timezone-aware scheduling
- Clear hand-off points between shifts
```

**Why this matters:**
- AI understands the "why" not just the "what"
- Prevents feature creep
- Guides decision-making

### 2. Current State

**Where the project is now:**

```markdown
## Current State

**Development Phase:** MVP (v0.5.0)

**What's Working:**
- ✅ User authentication (email + OAuth)
- ✅ Task creation and assignment
- ✅ Basic project organization
- ✅ Email notifications

**What's Not Ready:**
- ⏳ Timezone conversion (in progress)
- ⏳ Recurring tasks (planned)
- ❌ Mobile app (future)
- ❌ API for integrations (v2.0)

**Known Issues:**
- Performance degrades with >1000 tasks per project
- Email notifications sometimes delayed (15+ min)
- No offline support
```

**Why this matters:**
- Sets expectations
- Prevents working on wrong things
- Shows what's in scope vs. out of scope

### 3. Tech Stack

**What technologies are used:**

```markdown
## Tech Stack

**Frontend:**
- Next.js 14 (App Router, React Server Components)
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui components
- React Query for data fetching

**Backend:**
- Next.js API routes (serverless functions)
- PostgreSQL 15 (Supabase hosted)
- Prisma ORM
- Redis for caching (Upstash)

**Infrastructure:**
- Hosting: Vercel (automatic deploys from main branch)
- Database: Supabase (PostgreSQL + Auth + Storage)
- File storage: Supabase Storage
- Email: SendGrid (transactional)
- Monitoring: Vercel Analytics + Sentry

**Development:**
- Package manager: npm
- Testing: Vitest + Testing Library
- Linting: ESLint + Prettier
- CI/CD: GitHub Actions
```

**Why this matters:**
- AI knows what tools are available
- Prevents suggesting incompatible tech
- Helps estimate complexity

### 4. Architecture

**How components fit together:**

```markdown
## Architecture

**System Design:**
```
[Users] → [Next.js Frontend] → [API Routes] → [PostgreSQL]
                ↓                                    ↑
           [Redis Cache]                      [Background Jobs]
                                                     ↓
                                              [Email Service]
```

**Key Patterns:**
- Server Components for initial render (faster load)
- Client Components only where needed (forms, interactivity)
- API routes handle mutations (POST/PUT/DELETE)
- Optimistic updates for better UX
- SWR for client-side caching

**Data Flow:**
1. User action → Server Component or Client Component
2. Mutation → API route → Database
3. Revalidation → Fresh data fetched
4. UI updates (optimistic or real)
```

**Why this matters:**
- AI understands how to implement features
- Maintains consistency
- Prevents architectural drift

### 5. How We Work

**Communication and workflow preferences:**

```markdown
## How We Work

**Communication Preferences:**
- 📝 Explain decisions before implementing
- 🖼️ Show mockups for UI changes
- ❓ Ask before major architectural changes
- 🧪 Write tests for critical paths
- 📚 Document non-obvious code

**Development Workflow:**
1. Feature request → GitHub issue
2. Design/spec in issue comments
3. Create feature branch
4. Implement with tests
5. PR with description + screenshots
6. Deploy to staging → test
7. Merge to main → auto-deploy production

**Code Review Expectations:**
- PRs under 400 lines (easier to review)
- Tests included for new features
- Updated docs if API changes
- No commented-out code
```

**Why this matters:**
- AI knows what to ask
- Workflow stays consistent
- Reduces back-and-forth

### 6. Invariants & Non-goals

::: tip New in v5.0.0
Prevents AI from "helpfully" undoing intentional architectural choices.
:::

**What should NOT change:**

```markdown
## Invariants & Non-goals

**Invariants (Do Not Change Without Discussion):**
- No Redux - using React Context + Zustand by design
- All auth via httpOnly cookies, not localStorage
- Server Components by default, Client Components only where needed
- TypeScript strict mode with no `any` types
- Mobile-first responsive design

**Non-goals (Not Now):**
- Mobile native app (web-first until v2)
- Bundle size optimization (functionality first)
- Multi-tenancy (single tenant for MVP)
- Real-time collaboration (async-first by design)

**When to Update:**
- Add new invariants when making architectural decisions
- Move non-goals to active development when scope changes
- Remove invariants only after explicit discussion
```

**Why this matters:**
- Prevents AI from "fixing" intentional choices
- Documents what's deliberately out of scope
- Reduces wasted effort on rejected approaches

### 7. Anti-Patterns

**What NOT to do:**

```markdown
## Anti-Patterns (What NOT to Do)

**❌ Don't:**
- Add features without discussing impact on simplicity
- Use bleeding-edge tech (stability matters)
- Optimize prematurely (ship MVP first)
- Break mobile experience (60% of users)
- Add dependencies >100KB without discussion
- Implement complex algorithms without benchmarks
- Change database schema without migration plan

**✅ Instead:**
- Discuss feature complexity impact
- Use proven, stable tech
- Profile before optimizing
- Mobile-first design
- Justify large dependencies
- Benchmark performance changes
- Plan migrations carefully
```

**Why this matters:**
- Prevents common mistakes
- Maintains project quality
- Saves time on course-correction

### 8. References

**Links to other documentation:**

```markdown
## References

**Core Documentation:**
- [STATUS.md](./STATUS.md) - Current work in progress
- [DECISIONS.md](./DECISIONS.md) - Why choices were made
- [SESSIONS.md](./SESSIONS.md) - Session history

**External Resources:**
- Design system: [Figma](https://figma.com/...)
- API docs: [Postman](https://postman.com/...)
- User feedback: [ProductBoard](https://productboard.com/...)
- Roadmap: [GitHub Projects](https://github.com/...)
```

**Why this matters:**
- Single source of truth
- No duplicate documentation
- Easy to find resources

## Real-World Example

Here's a complete CONTEXT.md for a real project:

```markdown
# Project Context - TaskFlow

## What & Why

**Project:** TaskFlow - Async-first task management for remote teams

**Business Goal:** Enable 24/7 productivity across timezones without meetings

**Target Users:**
- Remote engineering teams (10-50 people)
- Distributed across 3+ timezones
- Async-first communication culture

**Key Value Proposition:**
- No real-time collaboration required
- Timezone-aware task scheduling
- Clear handoff documentation
- Works offline (sync when online)

## Current State

**Phase:** MVP (v0.8.0 - feature complete, bug fixing)

**Launch Date:** 2025-11-01 (3 weeks away)

**What's Working:**
- ✅ Auth (email + Google OAuth)
- ✅ Projects and tasks
- ✅ Timezone-aware scheduling
- ✅ Handoff notes
- ✅ Email digests (daily summaries)

**What's In Progress:**
- 🔄 Offline support (PWA with service worker)
- 🔄 Mobile responsive improvements
- 🔄 Performance optimization (lazy loading)

**Not in MVP:**
- ❌ Recurring tasks (v1.1)
- ❌ File attachments (v1.2)
- ❌ Slack integration (v2.0)

## Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind, shadcn/ui
**Backend:** Next.js API routes, PostgreSQL (Supabase), Prisma
**Infrastructure:** Vercel, Supabase, Upstash Redis, SendGrid
**Monitoring:** Sentry, Vercel Analytics

## Architecture

**Pattern:** Server Components + API routes + PostgreSQL

**Data Flow:**
1. Server Component fetches initial data
2. Client Component handles interactions
3. Mutations → API route → Database
4. Revalidation → Updated UI

**Performance:**
- Redis cache for expensive queries (5min TTL)
- Database indexes on user_id, project_id
- Image optimization via next/image
- Route-based code splitting

## How We Work

**Communication:**
- Ask before major changes
- Explain tradeoffs in PRs
- Show mockups for UI
- Write tests for critical paths

**Development:**
- Feature branches from main
- PR → staging deploy → test → merge
- Auto-deploy to production on merge

**Code Style:**
- TypeScript strict mode
- ESLint + Prettier
- Functional components + hooks
- No prop drilling (use context or state management)

## Anti-Patterns

**❌ Don't:**
- Add real-time features (breaks async-first principle)
- Use client components unnecessarily (slower)
- Add dependencies >50KB without discussion
- Break mobile experience (60% mobile users)
- Implement features without timezone consideration

**✅ Do:**
- Keep async-first (email notifications, not push)
- Server Components by default
- Evaluate bundle size impact
- Mobile-first design
- Always consider timezone implications

## References

- [STATUS.md](./STATUS.md) - Current work
- [DECISIONS.md](./DECISIONS.md) - Why we chose things
- [SESSIONS.md](./SESSIONS.md) - Development history
- [Design System](https://figma.com/file/...)
- [Roadmap](https://github.com/taskflow/taskflow/projects/1)
```

## When to Update

**Update CONTEXT.md when:**
- ✅ Project goals change
- ✅ Tech stack changes
- ✅ Architecture evolves
- ✅ Team workflow changes
- ✅ New anti-patterns discovered

**Don't update for:**
- ❌ Day-to-day work (use STATUS.md)
- ❌ Temporary decisions (use DECISIONS.md)
- ❌ Session notes (use SESSIONS.md)

## Best Practices

### 1. Keep It Concise

```markdown
# Too verbose:
"We are using React because it's a popular JavaScript library
 for building user interfaces that uses a virtual DOM..."

# Better:
"React 18 (virtual DOM, concurrent features)"
```

### 2. Reference, Don't Duplicate

```markdown
# Don't duplicate:
"Recent decisions: [paste 50 lines from DECISIONS.md]"

# Instead reference:
"See DECISIONS.md for architecture choices"
```

### 3. Make It Scannable

```markdown
# Use:
- **Bold for key terms**
- ✅ ❌ for do/don't
- Bullet points
- Short paragraphs
- Clear headings
```

### 4. Update Regularly

```markdown
# At end of major milestones:
/save-full

# Then review CONTEXT.md:
- Is tech stack still accurate?
- Have goals evolved?
- New anti-patterns discovered?
```

## Success Metric

> **"A new team member can read CONTEXT.md and understand the project well enough to start contributing within a day."**

When this is true, CONTEXT.md is doing its job.

## Next Steps

- [STATUS.md Guide](/guide/status-file) - Current state documentation
- [DECISIONS.md Guide](/guide/decisions-file) - Decision rationale
- [SESSIONS.md Guide](/guide/sessions-file) - Session history
- [/init-context Command](/commands/init-context) - Creates CONTEXT.md
