# Mental Models

Capture and externalize how AI agents understand your project—making invisible reasoning visible and verifiable.

## What is a Mental Model?

A **mental model** is the AI's current understanding of:
- Your project's architecture
- Business logic and domain concepts
- Technical constraints and tradeoffs
- What's implemented vs. planned
- Known issues and unknowns

**Without externalization:** This understanding exists only during the session, then disappears.

**With externalization:** Mental models are documented in SESSIONS.md, preserving AI understanding across time.

## Why Mental Models Matter

### 1. Verify AI Understanding

**Problem:** AI might misunderstand your requirements without you knowing.

**Solution:** Read the mental model to verify understanding.

**Example:**
```markdown
### Mental Models (Session 3)

**Current understanding:**
- Users can create "projects" with multiple "tasks"
- Tasks have: title, description, due date, assignee
- Projects are private (only creator can see)
- No team collaboration features yet
```

**If this is wrong**, you can catch it immediately and course-correct.

**If this is right**, you have confidence AI understands the scope.

### 2. Enable Session Continuity

**Problem:** New session = AI forgets what it understood.

**Solution:** Read previous mental model to restore understanding.

**Example:**

**Session 5 ends:**
```markdown
**Mental Models:**
- Authentication: JWT with 15min access tokens, 7-day refresh
- Database: PostgreSQL with connection pool (max 20 connections)
- Caching: Redis for session data (1 hour TTL)
- Deployment: Docker on DigitalOcean (single droplet, $12/month)
```

**Session 6 starts (3 days later):**
```bash
/review-context
```

AI reads mental model → immediately understands current architecture.

### 3. Facilitate AI-to-AI Handoffs

**Problem:** New AI agent must reverse-engineer understanding.

**Solution:** Read previous AI's mental model.

**Example:**
```markdown
### Session 10 | Claude Code | Database Optimization

**Mental Models:**
- Performance bottleneck: N+1 queries on /api/projects endpoint
- Solution: Added eager loading with .include() for tasks
- Trade-off: More memory per query, but 10x faster (1.2s → 120ms)
- Monitoring: Added slow query logging (>500ms threshold)
```

**New AI agent reads this** → knows optimization history → builds on it instead of redoing.

## What Gets Captured

### 1. Architecture Understanding

```markdown
**Architecture understanding:**
- Frontend: Next.js 14 (App Router, React Server Components)
- Backend: Next.js API routes (serverless functions)
- Database: Supabase (PostgreSQL + Auth + Storage)
- Deployment: Vercel (automatic previews, edge functions)
- File storage: Supabase Storage (images, documents)

**Data flow:**
- User action → Server Component → API Route → Supabase → Response
- Auth: Supabase Auth (email + OAuth)
- Real-time: Supabase Realtime (WebSocket subscriptions)
```

### 2. Domain Knowledge

```markdown
**Domain understanding:**
- "Projects" = containers for related tasks
- "Tasks" = individual work items with status (todo/in-progress/done)
- "Workspaces" = team-level organization (1 workspace = many projects)
- "Members" = users with workspace access (owner/admin/member roles)

**Business rules:**
- Free tier: 1 workspace, 10 projects, unlimited tasks
- Pro tier: Unlimited workspaces/projects, $10/month
- Workspace owners can invite members
- Only owners can delete workspace
```

### 3. Known Constraints

```markdown
**Known constraints:**
- Must work on mobile (60% of traffic)
- Target load time: <2 seconds on 3G
- Budget: $50/month (Vercel + Supabase free tiers)
- No personal data in logs (GDPR compliance)
- Support modern browsers only (no IE11)

**Technical debt:**
- No error tracking (need to add Sentry)
- No automated tests (planned for Sprint 3)
- API has no rate limiting (add later)
```

### 4. Unknowns and Assumptions

```markdown
**Unknowns/Assumptions:**
- ✅ **Known:** User wants email notifications
- ❓ **Unknown:** How often? Immediate or daily digest?
- 🔮 **Assuming:** Daily digest (less email spam)
- ⚠️ **Need to verify** with user before implementing

- ✅ **Known:** Need to export data (user request)
- ❓ **Unknown:** Format? CSV, JSON, PDF?
- 🔮 **Assuming:** CSV (most universal)
- ⚠️ **Ask user** before building
```

## How Mental Models Are Captured

### Automatic Capture with /save-full

```bash
/save-full
```

**AI is prompted to document:**
1. What it currently understands about the system
2. How components fit together
3. What constraints it's working within
4. What it knows vs. assumes
5. Any gaps in understanding

**Example output:**
```markdown
## Session 7 | 2025-10-23 | Email Notification System

### Mental Models

**Current understanding:**
- Building transactional email system (not marketing)
- Using SendGrid for delivery (100/day free tier)
- Email triggers: task assigned, task completed, @mentions
- Template engine: Handlebars (simple, familiar syntax)
- Preview mode: Log to console in dev, send in production

**Technical approach:**
- Background jobs: Bull queue (Redis-backed)
- Job processor: Separate worker process
- Retry logic: 3 attempts with exponential backoff
- Failure handling: Log to database, alert admin

**Known constraints:**
- SendGrid free tier: 100 emails/day
- Email deliverability: Need SPF/DKIM (SendGrid docs)
- Privacy: No tracking pixels (GDPR compliance)
- Unsubscribe: Must include in every email

**Assumptions being made:**
- Users want immediate emails (not batched)
- Plain text + HTML versions needed
- English only for now (i18n later)
```

### Manual Verification

**After /save-full, humans should:**

1. **Read the mental model**
```bash
cat context/SESSIONS.md | tail -50
```

2. **Verify accuracy**
- ✅ "Yes, that's correct"
- ❌ "No, we want batched emails"

3. **Course-correct if needed**
- Update CONTEXT.md with correct constraint
- Run `/save` to update
- AI reads updated constraint

## Real-World Example

### Session 1: Initial Understanding

```markdown
**Mental Models:**
- Building todo list app
- Users can create tasks
- Simple CRUD operations
- No teams/collaboration
```

**Human verifies:** ✅ Correct

### Session 5: Evolved Understanding

```markdown
**Mental Models:**
- Todo list evolved into project management tool
- Users → Workspaces → Projects → Tasks (hierarchy)
- Need team collaboration (multiple users per workspace)
- Real-time updates (WebSockets)
- File attachments on tasks
- Comments with @mentions
```

**Human verifies:** ✅ Correct evolution

### Session 10: Complex Understanding

```markdown
**Mental Models:**
- Project management platform (mature understanding)
- 3-tier pricing: Free/Pro/Enterprise
- Multi-tenant architecture (workspace isolation)
- Real-time collaboration (operational transform for conflicts)
- Activity feed (event sourcing pattern)
- Notifications (email + in-app)
- Integrations: Slack, GitHub (webhooks)
- API for third-party apps (OAuth 2.0)

**Performance characteristics:**
- Target: 1000 concurrent users
- Database: Connection pooling (max 50)
- Caching: Redis (session + API responses)
- CDN: Cloudflare (static assets)
```

**Human verifies:** ✅ AI has deep understanding

## Benefits of Captured Mental Models

### 1. Continuity Across Time

**Months later:**
- Read last session's mental model
- Immediately understand where things were
- Continue without rebuilding understanding

### 2. Verification of Understanding

**After each session:**
- Read what AI understood
- Catch misunderstandings early
- Correct before they compound

### 3. Knowledge Transfer

**New team members:**
- Read SESSIONS.md chronologically
- See how understanding evolved
- Understand "why" not just "what"

### 4. AI-to-AI Collaboration

**New AI agent:**
- Reads previous mental models
- Inherits understanding
- Builds on instead of redoes

## Best Practices

### 1. Be Comprehensive

```markdown
# Capture:
- Architecture
- Domain concepts
- Constraints
- Unknowns
- Assumptions

# Don't just say:
"Building authentication"

# Instead:
"Building JWT authentication with refresh tokens,
 using bcrypt for password hashing (10 rounds),
 storing refresh tokens in Redis (7-day expiry),
 HTTP-only cookies for security"
```

### 2. Update as Understanding Evolves

```markdown
# Session 1:
"Simple blog (posts and comments)"

# Session 5:
"Content platform with posts, comments, likes, follows,
 notifications, moderation queue, SEO optimization"
```

### 3. Document Assumptions

```markdown
**Assumptions:**
- Assuming users want dark mode (design trend)
- **⚠️ VERIFY** before implementing

vs.

**Verified:**
- User requested dark mode in feedback form
- ✅ Safe to implement
```

### 4. Capture the "Why"

```markdown
# Not just:
"Using PostgreSQL"

# Include:
"Using PostgreSQL because:
 - Need ACID transactions for orders
 - Complex relationships (products/orders/users)
 - Team familiar with SQL
 - JSON columns give flexibility where needed"
```

## Success Metric

> **"A new AI agent can read my SESSIONS.md and understand the project as deeply as I do."**

When this is true, mental models are properly externalized.

## Next Steps

- [SESSIONS.md Guide](/guide/sessions-file) - Where mental models live
- [Session Continuity](/guide/session-continuity) - Using mental models for continuity
- [AI-to-AI Handoff](/workflows/ai-handoff) - Mental models enable handoffs
- [/save-full Command](/commands/save-full) - How mental models are captured
