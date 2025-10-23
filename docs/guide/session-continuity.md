# Session Continuity

Never lose context between AI sessions. Pick up exactly where you left off—days, weeks, or months later—without re-explaining anything.

## The Problem

Traditional AI coding sessions have a critical flaw: **context loss**.

When you end a session and return later, you face:
- Re-explaining the entire project
- Reminding the AI of past decisions
- Rebuilding the mental model
- Losing track of work in progress
- Forgetting why choices were made

This isn't just inconvenient—it's a productivity killer.

## The Solution

The AI Context System solves this through **structured documentation** that preserves:

### 1. Current State (STATUS.md)

**What's happening right now:**
- Active tasks and their status
- Current blockers
- Next session start point
- Auto-generated Quick Reference

**Example:**
```markdown
## Work In Progress

**Current Task:** Implementing user authentication
- ✅ Set up database schema
- ✅ Created User model
- 🔄 Building login endpoint (in progress)
- ⏳ Add password hashing (next)

**Blocker:** Need to decide between JWT and session-based auth
```

When you return, `/review-context` shows this immediately.

### 2. Session History (SESSIONS.md)

**What happened and why:**
- Session-by-session timeline
- AI mental models at each point
- Problem-solving approaches
- What changed and why
- Git operations logged automatically

**Example:**
```markdown
## Session 3 | 2025-10-22 | Authentication Implementation

**TL;DR:** Implemented JWT-based authentication with refresh tokens

### Mental Models
**Current understanding:**
- Using JWT for stateless auth (decision: prefer horizontal scaling)
- Refresh tokens stored in Redis (7-day expiry)
- Access tokens short-lived (15 min)
- HTTPS-only cookies for security

### Problem-Solving Approach
- Researched JWT vs sessions (sessions require sticky sessions)
- Decided on JWT for better load balancing
- Implemented refresh token rotation for security
```

### 3. Decision Rationale (DECISIONS.md)

**Why choices were made:**
- Technical decisions with reasoning
- Alternatives considered
- Constraints and tradeoffs
- When to reconsider

**Example:**
```markdown
## DEC-003: Use JWT for Authentication

**Decision:** Implement JWT-based authentication instead of session-based

**Context:** Building API that will scale horizontally with multiple servers

**Options Considered:**
1. Session-based auth (requires sticky sessions or shared session store)
2. JWT with refresh tokens (stateless, better for horizontal scaling)

**Decision:** JWT with refresh tokens

**Rationale:**
- Horizontal scaling without sticky sessions
- Stateless auth = simpler load balancing
- Refresh token rotation provides security
- Industry standard for APIs
```

## How It Works

### Daily Workflow

**Start of session:**
```bash
/review-context
```

Shows:
- Quick Reference (project overview)
- Current work in progress
- Recent decisions
- Version check

**During work:**
```bash
/save  # Every 30-60 minutes (2-3 min)
```

Updates:
- STATUS.md with current state
- Auto-generated Quick Reference
- Work in progress

**End of session:**
```bash
/save-full  # Before breaks (10-15 min)
```

Creates:
- Complete SESSIONS.md entry
- Mental model capture
- Decision rationale
- Git operation log

### Resuming Later

**Days, weeks, or months later:**

```bash
/review-context
```

**What you see:**
1. **Quick Reference** - Project at a glance
2. **Last session summary** - What happened
3. **Work in progress** - Where to pick up
4. **Recent decisions** - Context for current work

**Result:** You're oriented in 2-3 minutes instead of 20-30 minutes.

## Real-World Example

### Without Session Continuity

**Day 1:** Implement authentication
- AI builds JWT system
- Makes key decisions
- Session ends

**Day 8:** Resume work
- "What were we doing?"
- "Why JWT instead of sessions?"
- "What's the token expiry?"
- Re-explain everything (20 minutes)
- Risk of inconsistent decisions

### With Session Continuity

**Day 1:** Implement authentication
```bash
/save-full  # 10 minutes
```

**Day 8:** Resume work
```bash
/review-context  # 2 minutes
```

**Sees:**
- Current: "Building login endpoint (in progress)"
- Blocker: "Need to decide between JWT and sessions"
- Decision: "DEC-003: Use JWT (horizontal scaling)"
- Mental model: Complete auth strategy

**Result:** Pick up exactly where you left off.

## Key Benefits

### 1. Zero Context Loss
- AI remembers everything
- No re-explaining
- Consistent decision-making

### 2. Fast Resume
- 2-3 minute orientation
- Clear start point
- Full context available

### 3. Long-Term Projects
- Works across months
- Handles complexity
- Maintains consistency

### 4. Multiple AI Agents
- Seamless handoffs
- Peer review with context
- Collaborative development

## Best Practices

### Save Frequently
```bash
/save  # Every 30-60 minutes
```
- Captures incremental progress
- Safety net for unexpected interruptions
- Quick (2-3 minutes)

### Full Saves at Boundaries
```bash
/save-full  # Before breaks, handoffs
```
- Comprehensive mental model
- Decision rationale
- Complete session record

### Review at Start
```bash
/review-context  # Every session start
```
- Instant orientation
- Verifies documentation current
- Checks for updates

### Trust the System
- Document even "obvious" decisions
- Capture mental models honestly
- Future you will thank present you

## Success Metric

> **"I can end any session abruptly, start days later, run /review-context, and continue exactly where I left off."**

When this is true, you have perfect session continuity.

## Next Steps

- [Externalized Context](/guide/externalized-context) - Make AI reasoning visible
- [Mental Models](/guide/mental-models) - Capture AI understanding
- [STATUS.md Guide](/guide/status-file) - Current state documentation
- [SESSIONS.md Guide](/guide/sessions-file) - Session history
