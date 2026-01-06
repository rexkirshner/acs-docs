# /code-review Command Improvement Plan

**Date:** 2025-11-17
**Version:** v3.4.0 Planning
**Status:** Implementation Plan - Ready for Execution

---

## Executive Summary

Based on real-world usage across two projects, the `/code-review` command produces excellent comprehensive analysis but has a critical weakness: **findings live in isolation and require extensive manual work to become actionable**.

**Validated Pain Points:**
- 30-60 minutes of manual todo creation (40+ tasks)
- Manual review document updates (5+ edits per review cycle)
- Manual comparison between reviews (Session 8 → 12)
- No integration with context system (KNOWN_ISSUES.md, STATUS.md)
- No automatic progress tracking

**Core Insight:** Users run `/code-review` as quality gates before milestones, then spend more time organizing findings than the review itself took. The command should automate the tedious post-review workflow.

---

## Feedback Analysis

### Project 1: Production Readiness Review
- **Context:** 7 modules complete, pre-production quality gate
- **Findings:** 42 TypeScript errors, multiple categories
- **Manual Work:** 30+ min creating todos, 5+ doc updates
- **Grade Progression:** B → B+ → A- → A → A+ (manually tracked)
- **Key Request:** "Automatic TodoWrite integration would save 30 minutes"

### Project 2: Iterative Quality Improvement
- **Context:** Session 8 initial (Grade A) → Session 12 follow-up (Grade A+)
- **Findings:** Fixed C1, C2, H1, H2; 2 medium issues remain
- **Manual Work:** Manually updated Session 8 review doc with resolution status
- **Key Request:** "Automate the 'what changed since last review' workflow"

### Common Themes (Universal - Must Address)
1. **TodoWrite Integration** - Both manually created todos (validated pain point)
2. **Review Comparison** - Both manually tracked what changed between reviews
3. **Context Integration** - Both wanted findings in KNOWN_ISSUES.md, STATUS.md
4. **Smart Grouping** - 25 similar errors → 1 actionable task (Project 1 insight)

### Project-Specific (Lower Priority)
- Remediation mode (interactive fixing) - Only Project 1, seems complex
- Export to GitHub Issues - Only Project 1, adds complexity
- Scoped reviews - Low priority for both (useful for large codebases only)
- Team collaboration - Not applicable (solo user)

---

## What Currently Works Well

**Strengths to Preserve:**
1. ✅ Comprehensive analysis (9 categories: security, performance, accessibility, etc.)
2. ✅ Read-only principle (analysis separate from fixes - prevents rushed changes)
3. ✅ Specific file:line references (makes fixing precise)
4. ✅ Code examples in suggestions (shows exactly how to fix)
5. ✅ Grading system (A-F provides quick quality assessment)
6. ✅ Categorization by severity (helps prioritize)

**Do Not Change:** The comprehensive nature of the review. This is the command's core value.

---

## Proposed Improvements

### Phase 1: Core Integration (HIGHEST VALUE - 4 hours)

#### 1. TodoWrite Generation with Smart Grouping (2 hours)

**Problem:** Users manually create 40+ todos, wasting 30+ minutes per review.

**Solution:** After review completes, automatically offer to create TodoWrite tasks with intelligent grouping.

**Implementation:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 REVIEW COMPLETE - Grade: B
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found 42 issues (3 critical, 5 high, 34 medium/low)

Create TodoWrite tasks for critical and high priority issues? (Y/n) > Y

🧠 Smart grouping detected:
   - 25 similar errors: Missing @testing-library/jest-dom type definitions
   - 12 similar errors: Unused imports
   - 5 unique errors

Creating 7 grouped tasks:

Critical Issues (3):
✅ [pending] Fix SQL injection in search API (api/search.ts:123)
✅ [pending] Add rate limiting to auth endpoints (3 files: auth/register.ts, auth/login.ts, auth/refresh.ts)
✅ [pending] Remove hardcoded secrets from config (config.ts:89)

High Priority Issues (4 → 4 tasks):
✅ [pending] Fix missing type definitions for @testing-library/jest-dom (25 files affected)
✅ [pending] Remove unused imports (12 files affected)
✅ [pending] Add error handling to async database operations (api/users.ts:456)
✅ [pending] Fix Decimal type handling in calculations (utils/math.ts:78)

Total: 7 actionable tasks created from 42 findings

💡 Run /save to persist tasks to SESSIONS.md
```

**Smart Grouping Algorithm:**
1. **Pattern Matching:** Group issues with identical error messages (e.g., "Missing type definition")
2. **Location Clustering:** Group issues in same directory/module (e.g., auth/*.ts)
3. **Fix Strategy:** Group issues with same remediation approach
4. **Threshold:** 3+ similar issues → create grouped task
5. **Unique Issues:** Create individual tasks for distinct problems

**Task Format:**
```markdown
- [pending] Fix missing type definitions for @testing-library/jest-dom (25 files affected)
  Context: See artifacts/code-reviews/review-2025-11-17.md#M1-M25 for affected files
  Fix: Add `import '@testing-library/jest-dom'` to setup files
```

**Value:** Reduces 30-60 min of manual work to 30 seconds (accept prompt).

---

#### 2. Context System Integration (2 hours)

**Problem:** Review findings don't persist in project context. AI agents in future sessions don't know about issues.

**Solution:** Automatically offer to add critical findings to KNOWN_ISSUES.md and summary to STATUS.md.

**Implementation:**

```
Add critical issues to context/KNOWN_ISSUES.md? (Y/n) > Y

Adding 3 critical issues to KNOWN_ISSUES.md:

## [CRITICAL] SQL Injection Vulnerability in Search API
**Found:** 2025-11-17 (Code Review - Session 20)
**Location:** `api/search.ts:123`
**Impact:** User input directly concatenated into SQL query - high security risk
**Review:** See [Code Review Report](../artifacts/code-reviews/review-2025-11-17.md#C1)
**Status:** 🔴 Open

## [CRITICAL] Missing Rate Limiting on Auth Endpoints
**Found:** 2025-11-17 (Code Review - Session 20)
**Locations:**
  - `api/auth/register.ts:45`
  - `api/auth/login.ts:32`
  - `api/auth/refresh.ts:28`
**Impact:** Endpoints vulnerable to brute force attacks
**Review:** See [Code Review Report](../artifacts/code-reviews/review-2025-11-17.md#C2)
**Status:** 🔴 Open

## [CRITICAL] Hardcoded Secrets in Configuration
**Found:** 2025-11-17 (Code Review - Session 20)
**Location:** `config.ts:89`
**Impact:** Database credentials and API keys committed to repository
**Review:** See [Code Review Report](../artifacts/code-reviews/review-2025-11-17.md#C3)
**Status:** 🔴 Open

✅ Added to KNOWN_ISSUES.md

Update context/STATUS.md with review summary? (Y/n) > Y

Adding to STATUS.md under "Recent Changes":

### Code Review (2025-11-17)
- **Grade:** B (needs improvement before production)
- **Critical Issues:** 3 (require immediate attention)
- **High Priority:** 5 (should fix before release)
- **Medium Priority:** 34 (incremental improvements)
- **Full Report:** [Code Review - Session 20](../artifacts/code-reviews/review-2025-11-17.md)

✅ Updated STATUS.md
```

**Integration Points:**
1. **KNOWN_ISSUES.md** - Critical and high priority issues only
2. **STATUS.md** - Summary with grade, issue counts, link to full report
3. **Standard Format** - Matches existing context file conventions
4. **Bidirectional Links** - Review links to context, context links back to review

**Value:** Findings persist across AI sessions. Future agents see issues without reading full review.

---

### Phase 2: Review History & Comparison (HIGH VALUE - 3 hours)

#### 3. Review History Tracking (1.5 hours)

**Problem:** No way to see quality trends over time. "Did quality improve?" is answered manually.

**Solution:** Create `artifacts/code-reviews/INDEX.md` tracking all reviews with trend visualization.

**Implementation:**

Create/update INDEX.md after each review:

```markdown
# Code Review History

## Summary

| Date       | Session | Grade | Critical | High | Medium | Low | Files | Status    |
|------------|---------|-------|----------|------|--------|-----|-------|-----------|
| 2025-11-17 | 21      | A+    | 0        | 0    | 2      | 5   | 45    | ✅ Passing |
| 2025-11-16 | 20      | B     | 3        | 5    | 34     | 12  | 45    | ⚠️ Issues  |
| 2025-11-15 | 18      | A     | 2        | 2    | 8      | 5   | 42    | ⚠️ Issues  |

## Trends

**Grade Progression:** C → B → B+ → A- → A → A+
- ✅ Steadily improving
- 🎯 Production-ready as of Session 21

**Critical Issues:**
- Session 18: 2 issues
- Session 20: 3 issues (regressed ⚠️)
- Session 21: 0 issues (resolved ✅)

**Issue Resolution Rate:**
- Total found: 54 issues
- Total resolved: 52 issues (96%)
- Average time to fix critical: < 1 day

## Reviews

### [Session 21 | 2025-11-17 | Grade: A+](review-2025-11-17-session-21.md)
**Status:** ✅ Production Ready
- All critical issues resolved
- All high priority issues resolved
- 2 medium issues remain (non-blocking)
- Tests: 954/954 passing (100%)

### [Session 20 | 2025-11-16 | Grade: B](review-2025-11-16-session-20.md)
**Status:** ⚠️ Needs Improvement
- 3 critical issues (security)
- 5 high priority issues
- Pre-production quality gate
- Tests: 932/954 passing (97.5%)

### [Session 18 | 2025-11-15 | Grade: A](review-2025-11-15-session-18.md)
**Status:** ⚠️ Minor Issues
- 2 critical issues
- 2 high priority issues
- Initial comprehensive review
- Tests: 931/954 passing (97.6%)
```

**Visualization:**
```
📊 Quality Trend (Last 5 Reviews)

Grade:     C  → B  → B+ → A- → A  → A+  ✅ IMPROVING
Critical:  5  → 3  → 3  → 2  → 3  → 0   ✅ RESOLVED
High:      12 → 8  → 6  → 2  → 5  → 0   ✅ RESOLVED
```

**Value:** See progress at a glance. Motivating. Supports data-driven quality decisions.

---

#### 4. Automatic Review Comparison (1.5 hours)

**Problem:** Users manually compare reviews (Session 8 → 12) to see what was fixed. Time-consuming and error-prone.

**Solution:** Auto-detect previous review and show comparison report.

**Implementation:**

```
Running /code-review...

📋 Analyzing codebase (45 files)...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 COMPARISON WITH PREVIOUS REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Previous Review: Session 8 (2025-11-15) - 4 days ago

Grade:     A  → A+  ✅ Improved
Critical:  2  → 0   ✅ All resolved
High:      2  → 0   ✅ All resolved
Medium:    8  → 2   ✅ 6 resolved, 2 remain
Low:       5  → 5   ⚠️ No change

✅ RESOLVED ISSUES (10):

Critical (2):
  ✅ C1: Missing rate limiting on /api/auth/register
     Fixed in: Session 11 (2025-11-16)
     Time to fix: 1 day
     Verification: RateLimitPresets applied to all auth endpoints

  ✅ C2: SQL injection vulnerability in search
     Fixed in: Session 11 (2025-11-16)
     Time to fix: 1 day
     Verification: Parameterized queries implemented

High Priority (2):
  ✅ H1: Missing error handling in async operations
     Fixed in: Session 11 (2025-11-16)

  ✅ H2: Insufficient input validation on user endpoints
     Fixed in: Session 12 (2025-11-17)

Medium Priority (6):
  ✅ M1: Console.log statements in production code (fixed)
  ✅ M2: Missing JSDoc comments (fixed)
  ... (see full report for details)

⚠️ STILL OPEN (2):

Medium Priority:
  ⚠️ M6: Form validation error announcements for screen readers
     Age: 4 days (first found Session 8)
     Impact: Accessibility - Medium

  ⚠️ M7: Focus management in modal dialogs
     Age: 4 days (first found Session 8)
     Impact: Accessibility - Medium

🆕 NEW ISSUES (0):
  ✅ No new issues introduced since last review

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Progress Summary:
  - Issues resolved: 10/12 (83%)
  - Grade improved: A → A+
  - Time since last review: 4 days
  - Critical issues: All resolved ✅
  - Ready for production: Yes ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Comparison Logic:**
1. Auto-detect most recent review in `artifacts/code-reviews/`
2. Match issues by ID (C1, C2, H1, M1, etc.)
3. Determine status: Resolved, Still Open, New
4. Calculate time to resolution
5. Show trend (improving/degrading/stable)

**Value:** Eliminates manual comparison work. Instantly see progress. Validates that fixes actually worked.

---

### Phase 3: Issue Persistence & Tracking (MEDIUM VALUE - 2 hours)

#### 5. Issue Tracking (2 hours)

**Problem:** No central place to track individual issues from discovery to resolution.

**Solution:** Create `artifacts/code-reviews/ISSUES.md` with issue lifecycle tracking.

**Implementation:**

```markdown
# Code Review Issues Tracker

**Last Updated:** 2025-11-17 (Session 21)

## Overview

| Status      | Critical | High | Medium | Low | Total |
|-------------|----------|------|--------|-----|-------|
| 🔴 Open     | 0        | 0    | 2      | 5   | 7     |
| ✅ Resolved | 5        | 7    | 38     | 15  | 65    |
| **Total**   | 5        | 7    | 40     | 20  | 72    |

**Resolution Rate:** 90% (65/72 issues resolved)
**Avg Time to Fix Critical:** < 1 day
**Avg Time to Fix High:** 1.5 days

---

## 🔴 OPEN ISSUES (7)

### M6: Form Validation Error Announcements Missing
- **Severity:** MEDIUM (Accessibility)
- **Found:** Session 8 (2025-11-15)
- **Age:** 4 days
- **Location:** `components/forms/*.tsx` (5 components)
- **Impact:** Screen reader users don't hear validation errors
- **Review:** [Session 8 Review](review-2025-11-15-session-8.md#M6)
- **Status:** 🔴 Open
- **Notes:** Low impact (accessibility improvement, not blocker)

### M7: Focus Management in Modal Dialogs
- **Severity:** MEDIUM (Accessibility)
- **Found:** Session 8 (2025-11-15)
- **Age:** 4 days
- **Location:** `components/Modal.tsx:45`
- **Impact:** Keyboard users can tab outside modal
- **Review:** [Session 8 Review](review-2025-11-15-session-8.md#M7)
- **Status:** 🔴 Open

... (5 more open issues)

---

## ✅ RESOLVED ISSUES (65)

### C1: Missing Rate Limiting on Auth Endpoints ✅
- **Severity:** CRITICAL (Security)
- **Found:** Session 8 (2025-11-15)
- **Resolved:** Session 11 (2025-11-16)
- **Time to Fix:** 1 day
- **Locations:**
  - `api/auth/register.ts:45`
  - `api/auth/login.ts:32`
  - `api/auth/refresh.ts:28`
- **Fix Applied:** Implemented RateLimitPresets for all auth endpoints
- **Verified:** Session 12 (2025-11-17) - All endpoints now rate limited
- **Review:** [Session 8 Review](review-2025-11-15-session-8.md#C1)

### C2: SQL Injection Vulnerability in Search ✅
- **Severity:** CRITICAL (Security)
- **Found:** Session 8 (2025-11-15)
- **Resolved:** Session 11 (2025-11-16)
- **Time to Fix:** 1 day
- **Location:** `api/search.ts:123`
- **Fix Applied:** Replaced string concatenation with parameterized queries
- **Verified:** Session 12 (2025-11-17) - All queries use safe parameters
- **Review:** [Session 8 Review](review-2025-11-15-session-8.md#C2)

... (63 more resolved issues)
```

**Automatic Updates:**
- When new review runs, update issue status (open → resolved or still open)
- Calculate time to resolution
- Track verification (was issue really fixed?)
- Show issue age for open items

**Value:** Single source of truth for all code quality issues. Historical record of fixes. Easy to see long-standing issues.

---

### Phase 4: Optional Enhancements (LOWER PRIORITY - 4 hours)

#### 6. Incremental Reviews (2 hours)

**Problem:** Running full review on large codebase when only 5 files changed is inefficient.

**Solution:** Add `--incremental` flag to review only changed files.

**Implementation:**

```bash
# Review only files changed since last commit
/code-review --incremental

# Review changes since specific commit
/code-review --since-commit=abc123

# Review changes in current branch vs main
/code-review --branch-diff
```

**Output:**
```
Running incremental review (5 files changed since last review)...

Files in scope:
  - api/auth/register.ts (modified)
  - api/auth/login.ts (modified)
  - components/LoginForm.tsx (modified)
  - tests/auth.test.ts (modified)
  - README.md (skipped - documentation)

Reviewing 4 files...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 INCREMENTAL REVIEW COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope: 4 files changed (out of 45 total)

🆕 New Issues (1):
  - H1: Missing rate limit on new login endpoint

✅ Previously Flagged Issues Still Present (0)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Value:** Faster reviews for iterative development. Good for PR reviews.

---

#### 7. Scoped Reviews (2 hours)

**Problem:** Want to review only security, or only specific directory.

**Solution:** Add `--scope` and `--focus` flags.

**Implementation:**

```bash
# Review only specific directory
/code-review --scope=src/api

# Review only security issues
/code-review --focus=security

# Combine: Security review of API layer
/code-review --scope=src/api --focus=security
```

**Value:** Targeted reviews for specific concerns. Useful for large codebases or focused audits.

---

## Implementation Priority

### Tier 1: Must Have - Immediate Implementation (4 hours)
✅ **Phase 1: Core Integration**
1. TodoWrite Generation with Smart Grouping (2 hours)
2. Context Integration (2 hours)

**Rationale:** Addresses 80% of validated pain points. Reduces manual work from 30-60 min → 5 min per review. Makes findings actionable and persistent.

**ROI:** 4 hours implementation saves 30+ minutes per review session. Break-even after ~8 reviews.

---

### Tier 2: Should Have - Next Release (3 hours)
✅ **Phase 2: Review History & Comparison**
3. Review History Tracking (1.5 hours)
4. Automatic Review Comparison (1.5 hours)

**Rationale:** Validated by both projects. Shows quality trends, motivates improvement, automates manual comparison work.

**ROI:** Eliminates manual comparison work (10-15 min per follow-up review). Provides visible progress metrics.

---

### Tier 3: Nice to Have - Future Enhancement (2 hours)
✅ **Phase 3: Issue Persistence**
5. Issue Tracking (2 hours)

**Rationale:** Useful for tracking individual issues over time. Less critical if KNOWN_ISSUES.md integration works well.

**ROI:** Better for long-term tracking and analytics.

---

### Tier 4: Optional - As Needed (4 hours)
✅ **Phase 4: Advanced Features**
6. Incremental Reviews (2 hours)
7. Scoped Reviews (2 hours)

**Rationale:** Both projects rated these low priority. Useful for large codebases but not critical for current use cases.

**ROI:** Implement only if user encounters large codebase (500+ files) or needs targeted reviews.

---

## What I'm NOT Including

❌ **Remediation Mode** (Interactive fixing)
- **Reason:** Outside scope of read-only review principle
- **Evidence:** Only Project 1 mentioned, seems like separate feature
- **Alternative:** TodoWrite integration makes findings actionable without interactive mode

❌ **Live Progress Tracking** (Real-time todo completion → review update)
- **Reason:** Complex implementation, unclear value
- **Evidence:** TodoWrite already tracks progress
- **Alternative:** Re-run review to see progress

❌ **Export to GitHub Issues**
- **Reason:** Adds complexity, user is solo
- **Evidence:** Only Project 1 mentioned
- **Alternative:** KNOWN_ISSUES.md serves this purpose

❌ **Team Collaboration Features**
- **Reason:** User is solo developer
- **Evidence:** Not applicable to current use case

❌ **Custom Severity Definitions**
- **Reason:** Project-specific, adds complexity
- **Evidence:** Current severity levels work well

---

## Technical Implementation Details

### Smart Grouping Algorithm

```typescript
interface Issue {
  id: string; // "C1", "M25", etc.
  severity: "critical" | "high" | "medium" | "low";
  message: string;
  file: string;
  line: number;
  category: string;
}

function groupIssues(issues: Issue[]): GroupedIssue[] {
  const groups: Map<string, Issue[]> = new Map();

  for (const issue of issues) {
    // Strategy 1: Group by exact message match
    const messageKey = normalizeMessage(issue.message);

    // Strategy 2: Group by file pattern (e.g., api/auth/*.ts)
    const filePattern = extractFilePattern(issue.file);

    // Strategy 3: Group by fix strategy
    const fixStrategy = inferFixStrategy(issue);

    const groupKey = `${messageKey}|${filePattern}|${fixStrategy}`;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey).push(issue);
  }

  return Array.from(groups.entries())
    .map(([key, issues]) => {
      if (issues.length >= 3) {
        // Create grouped task
        return {
          type: "grouped",
          title: generateGroupedTitle(issues),
          count: issues.length,
          files: issues.map(i => i.file),
          severity: issues[0].severity,
          issues: issues,
        };
      } else {
        // Individual tasks
        return issues.map(i => ({
          type: "individual",
          title: i.message,
          file: i.file,
          line: i.line,
          severity: i.severity,
        }));
      }
    })
    .flat();
}

function generateGroupedTitle(issues: Issue[]): string {
  const commonMessage = issues[0].message;
  const fileCount = new Set(issues.map(i => i.file)).size;

  return `${commonMessage} (${fileCount} files affected)`;
  // Example: "Fix missing type definitions for @testing-library/jest-dom (25 files affected)"
}
```

### Review Comparison Logic

```typescript
interface ReviewComparison {
  previous: Review;
  current: Review;
  resolved: Issue[];
  stillOpen: Issue[];
  newIssues: Issue[];
  gradeChange: string;
  timeElapsed: number; // days
}

function compareReviews(current: Review, previous: Review): ReviewComparison {
  const resolved: Issue[] = [];
  const stillOpen: Issue[] = [];
  const newIssues: Issue[] = [];

  // Map previous issues by ID
  const prevIssuesMap = new Map(previous.issues.map(i => [i.id, i]));

  for (const currIssue of current.issues) {
    if (!prevIssuesMap.has(currIssue.id)) {
      // New issue introduced
      newIssues.push(currIssue);
    } else {
      // Issue still present
      const prevIssue = prevIssuesMap.get(currIssue.id);
      stillOpen.push({
        ...currIssue,
        age: calculateAge(prevIssue.foundDate),
      });
      prevIssuesMap.delete(currIssue.id);
    }
  }

  // Remaining issues in previous but not in current = resolved
  resolved.push(...Array.from(prevIssuesMap.values()));

  return {
    previous,
    current,
    resolved,
    stillOpen,
    newIssues,
    gradeChange: `${previous.grade} → ${current.grade}`,
    timeElapsed: daysBetween(previous.date, current.date),
  };
}
```

### Context Integration Format

**KNOWN_ISSUES.md:**
```markdown
## [CRITICAL] SQL Injection Vulnerability in Search API
**Found:** 2025-11-17 (Code Review - Session 20)
**Location:** `api/search.ts:123`
**Impact:** User input directly concatenated into SQL query - allows arbitrary SQL execution
**Severity:** CRITICAL (Security)
**Review:** See [Code Review Report](../artifacts/code-reviews/review-2025-11-17-session-20.md#C1)
**Status:** 🔴 Open

**Technical Details:**
```typescript
// UNSAFE - Current code:
const results = await db.query(`SELECT * FROM users WHERE name = '${req.body.name}'`);

// SAFE - Recommended fix:
const results = await db.query('SELECT * FROM users WHERE name = $1', [req.body.name]);
```

**Remediation:**
1. Replace all string concatenation with parameterized queries
2. Add input validation layer
3. Run security scan to verify all SQL is safe
```

**STATUS.md Addition:**
```markdown
## Recent Changes

### Code Review - Session 20 (2025-11-17)
**Grade:** B (needs improvement before production)
**Critical Issues:** 3 🔴
  - SQL injection vulnerability (api/search.ts)
  - Missing rate limiting (api/auth/*.ts)
  - Hardcoded secrets (config.ts)
**High Priority:** 5 ⚠️
**Full Report:** [Code Review Details](../artifacts/code-reviews/review-2025-11-17-session-20.md)
**Next Steps:** Fix critical security issues before deployment
```

---

## Success Metrics

### Quantitative (Measurable)
1. **Time Saved:** Manual work reduced from 30-60 min → < 5 min per review
2. **Task Creation:** Automatic instead of manual (40+ tasks in seconds)
3. **Context Persistence:** 100% of critical issues in KNOWN_ISSUES.md
4. **Review Frequency:** Increased usage due to reduced friction
5. **Resolution Tracking:** Automatic comparison shows progress

### Qualitative (Observable)
1. **Actionability:** Findings immediately convert to todos
2. **Persistence:** Issues survive session boundaries
3. **Motivation:** Visible quality trends (B → A+)
4. **Integration:** Seamless with existing context system
5. **Completeness:** No manual tracking needed

---

## Design Principles

1. **Preserve Comprehensiveness:** Don't reduce analysis quality for speed
2. **Read-Only Review:** Analysis stays separate from fixes
3. **Smart Defaults:** Opt-in for integration, but easy to accept
4. **Progressive Enhancement:** Core review works standalone, integrations are additive
5. **Backward Compatible:** Existing review docs still work
6. **User Confirmation:** Prompt before modifying context files
7. **Idempotent:** Re-running review doesn't create duplicates

---

## Open Questions

1. **TodoWrite Behavior:** Automatic or prompt-based task creation?
   - **Recommendation:** Prompt with smart default (Y)
   - **Rationale:** User maintains control, but friction is minimal

2. **KNOWN_ISSUES.md Threshold:** Which severities to add?
   - **Recommendation:** Critical only (High is optional prompt)
   - **Rationale:** Prevents clutter, focuses on must-fix issues

3. **Review History Retention:** Keep all reviews or limit?
   - **Recommendation:** Keep all, paginate in INDEX.md
   - **Rationale:** Historical data valuable, disk space cheap

4. **Issue ID Stability:** How to match issues across reviews?
   - **Recommendation:** Use file:line + message hash
   - **Rationale:** Robust to code changes, unique enough

5. **Grouped Task Details:** How much detail in task description?
   - **Recommendation:** Summary in task, link to full review
   - **Rationale:** Keeps tasks readable, review has full details

---

## Next Steps

### Immediate (This Week)
1. ✅ Implement Phase 1: TodoWrite Generation (2 hours)
2. ✅ Implement Phase 1: Context Integration (2 hours)
3. ✅ Test on both feedback projects
4. ✅ Gather feedback on Tier 1 features

### Short Term (Next Week)
5. ✅ Implement Phase 2: Review History (1.5 hours)
6. ✅ Implement Phase 2: Review Comparison (1.5 hours)
7. ✅ Test incremental workflow (Session N → Session N+1)

### Medium Term (Next Sprint)
8. ✅ Implement Phase 3: Issue Tracking (2 hours)
9. ✅ Evaluate need for Phase 4 (Scoped/Incremental)
10. ✅ Update documentation

### Future Consideration
- Monitor usage patterns to validate Phase 4 need
- Gather feedback on grouping algorithm accuracy
- Evaluate if live progress tracking becomes needed

---

## Risk Mitigation

**Risk 1: Smart Grouping Incorrect**
- **Mitigation:** Show grouped issues for review before creating tasks
- **Fallback:** User can manually adjust groups in TodoWrite

**Risk 2: Review Comparison False Positives**
- **Mitigation:** Use robust issue matching (file:line + message hash)
- **Fallback:** Manual verification in comparison report

**Risk 3: Context File Clutter**
- **Mitigation:** Only add critical issues, prompt before writing
- **Fallback:** User can edit KNOWN_ISSUES.md manually

**Risk 4: Performance Degradation**
- **Mitigation:** Review history indexed, not re-analyzed
- **Fallback:** Limit history display to last 10 reviews

---

## Conclusion

The proposed improvements transform `/code-review` from a **diagnostic tool** into an **actionable workflow integration**.

**Core Value Proposition:**
- **Before:** Great analysis, 30-60 min of manual work to act on it
- **After:** Great analysis, 5 min to integrate into workflow, automatic tracking

**Implementation Path:**
1. **Phase 1 (4 hours):** TodoWrite + Context Integration - Immediate value
2. **Phase 2 (3 hours):** History + Comparison - Quality tracking
3. **Phase 3 (2 hours):** Issue Tracking - Long-term persistence
4. **Phase 4 (4 hours):** Advanced features - As needed

**Total Investment:** 9 hours core (Phases 1-3), +4 hours optional (Phase 4)

**Expected Outcome:** `/code-review` becomes essential pre-milestone workflow instead of occasional diagnostic.

---

**Ready for implementation: Phase 1 (Tier 1) - 4 hours**
