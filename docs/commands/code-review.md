# /code-review

Comprehensive AI code review leveraging full project context.

## Overview

Automated code review that understands your decisions, architecture, and mental models:
- Analyzes code quality and patterns
- Checks against documented decisions
- Identifies security and performance issues
- Provides context-aware suggestions
- **Reads DECISIONS.md and SESSIONS.md** for intelligent review

**Philosophy:** Code review WITH context, not just pattern matching.

## What Makes It Different

### Traditional Linters
- Pattern matching only
- No context awareness
- Generic rules
- No understanding of WHY

### /code-review
- ✅ Reads your DECISIONS.md (knows why you chose this approach)
- ✅ Reads SESSIONS.md (understands recent changes)
- ✅ Considers your constraints (budget, timeline, tech stack)
- ✅ Provides context-aware suggestions
- ✅ Respects documented tradeoffs

## When to Use

**Use /code-review for:**
- Before pull requests
- After implementing major features
- Weekly code quality audits
- Before production deployments
- When onboarding new team members

**Frequency:** Weekly or before major milestones

## What It Reviews

### Code Quality
- Naming conventions
- Code organization
- Duplication
- Complexity metrics
- Error handling

### Architecture Alignment
- Follows documented patterns (from ARCHITECTURE.md)
- Consistent with design decisions (from DECISIONS.md)
- Matches stated approach (from SESSIONS.md)

### Security
- Authentication/authorization issues
- Input validation
- SQL injection risks
- XSS vulnerabilities
- Secrets in code

### Performance
- N+1 queries
- Inefficient algorithms
- Memory leaks
- Unnecessary re-renders
- Bundle size concerns

### Best Practices
- Framework-specific patterns
- Language idioms
- Testing coverage
- Documentation quality

## How It Works

### Step 1: Load Context

Reads your documentation:
```
📚 Loading project context...
   ✅ CONTEXT.md (architecture, constraints)
   ✅ DECISIONS.md (15 decisions)
   ✅ SESSIONS.md (last 3 sessions)
   ✅ STATUS.md (current phase, focus)
```

### Step 2: Analyze Changed Files

```
🔍 Analyzing recent changes...
   • lib/auth.ts (234 lines, +89 -12)
   • app/api/login/route.ts (67 lines, +67 new)
   • middleware.ts (145 lines, +34 -5)
```

### Step 3: Context-Aware Review

Reviews code considering:
- Your documented decisions
- Known constraints
- Current project phase
- Recent mental models

### Step 4: Generate Report

Creates detailed report in `artifacts/code-reviews/review-YYYY-MM-DD.md`

## Example Review Output

```markdown
# Code Review - 2025-10-23

## Summary

**Files Reviewed:** 8
**Issues Found:** 12 (3 high, 5 medium, 4 low)
**Overall Quality:** 🟡 Good (needs improvements)

## Context Used

**Decisions Referenced:**
- DEC-023: jose library choice (understood: Edge Runtime constraint)
- DEC-024: 15min token expiry (validated against security requirements)

**Recent Work (Session 15):**
- JWT authentication implementation
- Mental model: Access tokens in memory, refresh in cookies

**Current Constraints:**
- Must work on Edge Runtime ✅ Validated
- Budget: <$50/month ✅ No expensive dependencies added

## High Priority Issues

### 1. Potential Security Issue - Token Validation

**File:** `lib/auth.ts:156`

**Issue:**
```typescript
const payload = await jose.jwtVerify(token, secret);
return payload; // ⚠️ No expiration check!
```

**Problem:** Token expiration not explicitly validated after verification.

**Context-Aware Suggestion:**
Based on DEC-024 (15min expiry), add explicit expiration check:
```typescript
const payload = await jose.jwtVerify(token, secret);
if (payload.exp && payload.exp < Date.now() / 1000) {
  throw new Error('Token expired');
}
return payload;
```

**Why this matters:** Session 15 mental model emphasized security over UX.
Expired tokens should be rejected immediately.

---

### 2. Performance - N+1 Query Pattern

**File:** `app/api/users/route.ts:45`

**Issue:**
```typescript
const users = await db.user.findMany();
for (const user of users) {
  user.posts = await db.post.findMany({ // ⚠️ N+1!
    where: { userId: user.id }
  });
}
```

**Context-Aware Suggestion:**
Use Prisma's include (aligns with your tech stack):
```typescript
const users = await db.user.findMany({
  include: {
    posts: true
  }
});
```

**Performance Impact:**
- Before: 1 + N queries
- After: 1 query
- For 100 users: 101 queries → 1 query

---

## Medium Priority Issues

### 3. Inconsistent Error Handling

**File:** `app/api/login/route.ts:34`

**Issue:** Using generic Error instead of typed errors

**Suggestion:**
Based on SESSIONS.md Session 12 mental model (structured error responses),
use typed errors:
```typescript
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
```

---

## Low Priority Issues

### 4-12. Style and Convention Issues

(Details omitted for brevity)

---

## Positive Observations

✅ **Decision Alignment:**
- Jose library correctly used (DEC-023)
- Token expiry matches decision (DEC-024: 15min)
- CORS configuration matches Session 15 findings

✅ **Best Practices:**
- HttpOnly cookies for refresh tokens ✅
- Input validation on all endpoints ✅
- Rate limiting implemented ✅

✅ **Architecture Consistency:**
- Follows documented Edge Runtime constraints
- Aligns with stateless auth pattern from ARCHITECTURE.md

---

## Recommendations

### Immediate Actions (Before Production)
1. Fix token expiration validation (High priority #1)
2. Resolve N+1 query pattern (High priority #2)
3. Add error type hierarchy (Medium priority #3)

### Follow-Up Actions
1. Add integration tests for auth flow
2. Consider adding refresh token rotation logging
3. Document rate limiting thresholds in DECISIONS.md

### Future Considerations
Based on SESSIONS.md, you're planning 2FA (Session 15 "Next Session").
Consider reviewing these patterns before implementation:
- TOTP vs SMS (security tradeoff)
- Backup codes storage
- Rate limiting for verification attempts

---

## Review Metrics

**Code Quality Score:** 75/100
- Security: 70/100 (fix #1)
- Performance: 65/100 (fix #2)
- Maintainability: 85/100
- Best Practices: 80/100

**Context Alignment:** ✅ High
- Decisions: 100% aligned
- Constraints: 100% respected
- Mental Models: Consistent

**Next Review:** Before production deploy
```

## Output Files

Review saved to:
```
artifacts/code-reviews/
├── review-2025-10-23.md          # Full review
├── review-2025-10-23-summary.md  # Executive summary
└── review-2025-10-23.json        # Machine-readable
```

## Best Practices

### Run Before PRs

```bash
# Before creating pull request
/code-review

# Read review
cat artifacts/code-reviews/review-$(date +%Y-%m-%d).md

# Fix issues
# ... make changes ...

# Re-run review
/code-review

# Verify improvements
```

### Weekly Audits

```bash
# Every Monday
/code-review

# Track metrics over time
# Compare quality scores week-to-week
```

### Pre-Production Checklist

```bash
# Before deploying to production
/code-review              # Comprehensive audit
/validate-context         # Docs up to date
/save-full               # Document state

# Address all HIGH priority issues
# Consider MEDIUM priority issues
```

## Configuration

Customize review in `.context-config.json`:

```json
{
  "code_review": {
    "ignore_patterns": [
      "node_modules/",
      "dist/",
      "*.test.ts"
    ],
    "severity_threshold": "medium",
    "max_file_size": 1000,
    "include_low_priority": false
  }
}
```

## Limitations

**What /code-review CAN do:**
- ✅ Identify patterns and anti-patterns
- ✅ Check against documented decisions
- ✅ Suggest improvements with context
- ✅ Validate architecture alignment

**What it CANNOT do:**
- ❌ Run automated tests (use test runner)
- ❌ Fix code automatically (read-only)
- ❌ Guarantee bug-free code
- ❌ Replace human code review

## Related Commands

- [/save-full](/commands/save-full) - Document decisions for context-aware reviews
- [/validate-context](/commands/validate-context) - Ensure docs current

## See Also

- [DECISIONS.md Guide](/guide/decisions-file) - Document rationale
- [Code Quality](/guide/code-quality) - Best practices
