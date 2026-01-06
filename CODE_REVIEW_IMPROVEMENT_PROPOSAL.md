# /code-review Command Improvement Proposal

**Date**: 2025-11-17
**Current Version**: v3.3.1
**Status**: Proposal - Gathering User Feedback

---

## Executive Summary

The `/code-review` command is a comprehensive, analysis-only code quality audit tool. While the current implementation follows strong principles (read-only, thorough, unhurried), user feedback and analysis reveal opportunities to make it more **actionable, scalable, and integrated** with the AI Context System.

**Key Insight**: The command produces excellent analysis but has weak integration with the rest of the system and limited support for incremental workflows.

---

## Current State Analysis

### Strengths ✅
1. **Read-only principle**: Analysis separate from fixes (prevents rushed changes)
2. **Comprehensive coverage**: 9 review categories with specialized checklists
3. **Structured output**: Detailed reports with severity levels and effort estimates
4. **Grading system**: A-F scale provides quick quality assessment
5. **Unhurried approach**: Takes time to be thorough

### Limitations ⚠️

#### 1. Scope Control
- **Issue**: All-or-nothing approach - reviews entire codebase
- **Impact**: Overwhelming for large projects, excessive time for small changes
- **Evidence**: No guidance on chunking or partial reviews

#### 2. Poor Integration with AI Context System
- **Issue**: Reports saved to `artifacts/` but not integrated with context files
- **Impact**: Future AI sessions don't learn from review findings
- **Evidence**: No connection to KNOWN_ISSUES.md, DECISIONS.md, or STATUS.md

#### 3. Weak Actionability
- **Issue**: Produces report, but handoff to fixes is manual
- **Impact**: Users must manually translate findings into tasks
- **Evidence**: No TodoWrite integration, no automatic issue creation

#### 4. No Incremental Review Support
- **Issue**: Always reviews everything from scratch
- **Impact**: Redundant analysis, no support for "review changes since last commit"
- **Evidence**: No diff-based review, no review history

#### 5. Missing Quality Metrics Over Time
- **Issue**: Each review is isolated, no trend tracking
- **Impact**: Can't see if code quality is improving or degrading
- **Evidence**: No comparison with previous reviews, no metrics dashboard

#### 6. Fixed Review Scope
- **Issue**: Same categories for all projects (security, performance, etc.)
- **Impact**: CLI tools don't need accessibility checks, web apps don't need all security checks
- **Evidence**: No customization based on project type

#### 7. No False Positive Tracking
- **Issue**: Can't mark findings as "not an issue" or "by design"
- **Impact**: Same false positives reported repeatedly
- **Evidence**: No feedback loop to improve review accuracy

#### 8. Manual Fix Workflow
- **Issue**: Gap between "review complete" and "starting fixes"
- **Impact**: Context loss, unclear what to fix first
- **Evidence**: Users must manually create plan from report

---

## Proposed Improvements

### Priority 1: Scoped Reviews (HIGH VALUE)

**Problem**: Users need to review specific areas, not always the entire codebase.

**Solution**: Add scope flags to review targeted areas.

```bash
# Review specific directory
/code-review --scope=src/api

# Review specific category
/code-review --focus=security

# Review only changed files since last review
/code-review --incremental

# Review by risk level (high-traffic areas)
/code-review --priority=critical-paths
```

**Implementation**:
- Add `--scope=<path>` parameter to limit file scanning
- Add `--focus=<category>` to run only specific checklist
- Add `--incremental` to review only git diff since last review
- Add `--priority=<level>` to focus on high-risk areas first

**Impact**:
- Faster reviews for targeted needs
- Supports iterative quality improvement
- Reduces token usage for small changes

---

### Priority 2: Context Integration (HIGH VALUE)

**Problem**: Review findings don't integrate with AI Context System.

**Solution**: Automatically update context files with review findings.

**Changes**:

1. **KNOWN_ISSUES.md Integration**
   - Automatically add critical/high severity issues to KNOWN_ISSUES.md
   - Format: Standard KNOWN_ISSUES format with severity, location, impact
   - Prompt user: "Add 3 critical issues to KNOWN_ISSUES.md? (Y/n)"

2. **DECISIONS.md Integration**
   - Log architectural smells and pattern violations
   - Document recurring anti-patterns discovered
   - Example: "Decision: Avoid N+1 queries - found in 5 locations"

3. **STATUS.md Integration**
   - Update "Tech Debt" section with review summary
   - Add "Last Review: YYYY-MM-DD (Grade: B+)"
   - Link to full report in artifacts/

**Implementation**:
- After generating report, prompt for context file updates
- Use structured format matching existing context file patterns
- Make updates optional (default: yes for critical issues)

**Impact**:
- Review findings persist in AI memory
- Future sessions avoid repeating same mistakes
- Tech debt becomes visible and trackable

---

### Priority 3: Automated Fix Planning (HIGH VALUE)

**Problem**: Manual translation from review report to action items.

**Solution**: Generate TodoWrite tasks automatically for critical/high issues.

**Changes**:

After review completes, prompt:
```
🔍 Review found 12 issues (3 critical, 5 high, 4 medium)

Generate TodoWrite tasks for critical issues? (Y/n)
> Y

Creating tasks:
- [pending] Fix SQL injection in search API (file.ts:123)
- [pending] Add input validation to user endpoints (file.ts:456)
- [pending] Remove secrets from codebase (config.ts:89)

Tasks created. Run /save to persist.
```

**Implementation**:
- Convert critical/high issues to TodoWrite format
- Include file location and brief description
- Set appropriate status (pending, not in_progress)
- Optionally prioritize by effort + impact

**Impact**:
- Seamless handoff from review to fixes
- Clear action plan immediately available
- Tracks progress on review findings

---

### Priority 4: Review History & Metrics (MEDIUM VALUE)

**Problem**: No way to track quality improvements over time.

**Solution**: Maintain review history and show trends.

**Changes**:

1. **Review Index**: Create `artifacts/code-reviews/INDEX.md`
   ```markdown
   # Code Review History

   | Date | Grade | Critical | High | Medium | Files | Notes |
   |------|-------|----------|------|--------|-------|-------|
   | 2025-11-17 | B+ | 3 | 5 | 7 | 45 | Initial review |
   | 2025-11-10 | C  | 5 | 8 | 12 | 45 | Pre-refactor |
   ```

2. **Trend Analysis**: Show improvement/regression
   ```
   📊 Review Trends (Last 3 Reviews)

   Grade:     C → B- → B+  ✅ Improving
   Critical:  5 → 4 → 3    ✅ Decreasing
   High:      8 → 6 → 5    ✅ Decreasing
   ```

3. **Repeat Issues**: Flag issues found in multiple reviews
   ```
   ⚠️  Found 2 issues from previous reviews:
   - SQL injection in search (found 3 times)
   - Missing error handling (found 2 times)
   ```

**Implementation**:
- Create/update INDEX.md after each review
- Compare with previous review if exists
- Flag repeat issues by file:line matching
- Show trends when multiple reviews exist

**Impact**:
- Visible progress on code quality
- Catch repeat issues quickly
- Motivates continuous improvement

---

### Priority 5: Smart Scope Selection (MEDIUM VALUE)

**Problem**: Fixed review scope doesn't match all project types.

**Solution**: Customize review based on project configuration.

**Changes**:

Read `.context-config.json` to tailor review:
```json
{
  "project": {
    "type": "api",
    "focus": ["security", "performance"],
    "skip": ["accessibility", "seo"]
  }
}
```

**Auto-adjustments**:
- CLI tools: Skip accessibility, SEO
- APIs: Emphasize security, performance
- Web apps: Full review including a11y, SEO
- Libraries: Focus on API design, documentation

**Implementation**:
- Read project.type from config
- Map to relevant review categories
- Still allow manual override with --focus flag

**Impact**:
- More relevant findings
- Faster reviews (skip irrelevant checks)
- Better signal-to-noise ratio

---

### Priority 6: Incremental Review Mode (MEDIUM VALUE)

**Problem**: Re-reviews unchanged code repeatedly.

**Solution**: Add `--incremental` mode to review only changes.

**Changes**:

```bash
# Review only files changed since last commit
/code-review --incremental

# Review changes in current branch
/code-review --incremental --branch=feature/auth

# Review changes since tag
/code-review --incremental --since=v3.3.0
```

**Implementation**:
- Use `git diff` to find changed files
- Review only those files + dependencies
- Note in report: "Incremental review (23 files changed)"
- Warn if changed files affect untested areas

**Impact**:
- Fast reviews for feature branches
- Supports PR-like workflow
- Reduces review time for small changes

---

### Priority 7: False Positive Feedback (LOW VALUE, HIGH LEARNING)

**Problem**: No way to mark findings as "not an issue".

**Solution**: Add feedback mechanism to improve accuracy.

**Changes**:

After review, allow marking findings:
```bash
/code-review-feedback --issue=C1 --status=false-positive --reason="Intentional design"
```

**Implementation**:
- Save feedback to `artifacts/code-reviews/.feedback.json`
- Learn patterns to suppress in future reviews
- Show summary: "Suppressed 3 known false positives"

**Impact**:
- Improved accuracy over time
- Reduced noise in reports
- AI learns project-specific patterns

---

## Implementation Phases

### Phase 1: Core Improvements (v3.4.0 - 8 hours)
1. ✅ Scoped reviews (`--scope`, `--focus`)
2. ✅ Context integration (KNOWN_ISSUES.md, STATUS.md)
3. ✅ Automated fix planning (TodoWrite generation)

**Rationale**: High value, clear user benefit, moderate effort

### Phase 2: Historical Tracking (v3.5.0 - 4 hours)
1. ✅ Review history (INDEX.md)
2. ✅ Trend analysis
3. ✅ Repeat issue detection

**Rationale**: Enables long-term quality tracking

### Phase 3: Advanced Features (v3.6.0 - 6 hours)
1. ✅ Incremental review mode
2. ✅ Smart scope selection
3. ✅ False positive tracking

**Rationale**: Power user features, optimization

---

## User Research Questions

To validate these improvements, we need feedback from real-world users. Use this survey to gather data:

---

### /code-review User Feedback Survey

**Goal:** Understand real-world usage patterns and prioritize improvements for v3.4.0+

**Time:** 5-7 minutes

---

#### Section 1: Current Usage

**Q1. Have you used the `/code-review` command?**
- [ ] Yes, multiple times (go to Q2)
- [ ] Yes, once or twice (go to Q2)
- [ ] No, but I plan to (skip to Q6)
- [ ] No, and I don't plan to (skip to Q11)

**Q2. How often do you run `/code-review`?**
- [ ] Every commit
- [ ] Daily
- [ ] Weekly
- [ ] Monthly
- [ ] Only once on the entire project
- [ ] Other: _______________

**Q3. What typically triggers you to run a code review?**
- [ ] End of feature development
- [ ] Before pushing to main/master
- [ ] Debugging quality issues
- [ ] Curiosity about code quality
- [ ] Regular maintenance schedule
- [ ] Other: _______________

**Q4. How large is your typical project when you run `/code-review`?**
- [ ] Small (< 10 files)
- [ ] Medium (10-50 files)
- [ ] Large (50-200 files)
- [ ] Very large (200+ files)

**Q5. How long does a typical review take?**
- [ ] < 2 minutes
- [ ] 2-5 minutes
- [ ] 5-15 minutes
- [ ] 15-30 minutes
- [ ] > 30 minutes

---

#### Section 2: Pain Points

**Q6. What prevents you from using `/code-review` more often?** (Select all that apply)
- [ ] Takes too long
- [ ] Reviews entire codebase (when I only need specific areas)
- [ ] Produces too much output (overwhelming)
- [ ] Findings aren't actionable enough
- [ ] Hard to track what I've already fixed
- [ ] Can't exclude false positives
- [ ] Other: _______________

**Q7. After running `/code-review`, what do you do with the findings?**
- [ ] Fix critical issues immediately
- [ ] Create TODO list manually
- [ ] Nothing (report is too overwhelming)
- [ ] Cherry-pick a few issues to fix
- [ ] Save report for later (but rarely revisit)
- [ ] Other: _______________

**Q8. What's your biggest frustration with the current `/code-review` command?**

[Open text field]

---

#### Section 3: Proposed Improvements (Priority Ranking)

**Q9. Rank these proposed improvements by value to you (1 = most valuable, 7 = least valuable):**

- [ ] **Scoped Reviews** - Review only specific directories or file patterns (`--scope=src/api`, `--focus=security`)
- [ ] **Incremental Reviews** - Review only changed files since last commit/review (`--incremental`)
- [ ] **Context Integration** - Auto-add critical findings to KNOWN_ISSUES.md and STATUS.md
- [ ] **Automated Fix Planning** - Generate TodoWrite tasks for critical/high issues
- [ ] **Review History & Trends** - Track quality improvements over time (grade trends, repeat issues)
- [ ] **Smart Scope** - Customize review based on project type (skip accessibility for CLI tools)
- [ ] **False Positive Tracking** - Mark findings as "not an issue" to suppress in future reviews

**Q10. Which ONE improvement would make you use `/code-review` significantly more often?**

[Open text field]

---

#### Section 4: Feature-Specific Feedback

**Q11. Scoped Reviews: Would you use `--scope` to review specific areas?**
- [ ] Yes, frequently (most reviews would be scoped)
- [ ] Yes, occasionally (mix of full and scoped reviews)
- [ ] Maybe (need to see how it works)
- [ ] No, I prefer full reviews

**Q12. Incremental Reviews: How useful is reviewing only changed files?**
- [ ] Very useful (this is how I want to use it)
- [ ] Somewhat useful (nice to have)
- [ ] Not useful (I want full reviews)
- [ ] Unsure

**Q13. Context Integration: Should critical findings auto-update KNOWN_ISSUES.md?**
- [ ] Yes, automatically (default: yes)
- [ ] Yes, but ask first (prompt before updating)
- [ ] No, keep review separate from context files
- [ ] Unsure

**Q14. TodoWrite Integration: Should review generate TODO tasks for critical issues?**
- [ ] Yes, automatically
- [ ] Yes, but ask first
- [ ] No, I'll create tasks manually
- [ ] Unsure

**Q15. Review History: How valuable is tracking quality trends over time?**
- [ ] Very valuable (I want to see improvement metrics)
- [ ] Somewhat valuable (nice dashboard)
- [ ] Not valuable (one-time reviews only)
- [ ] Unsure

---

#### Section 5: Workflow Questions

**Q16. What would make `/code-review` findings more actionable?**

[Open text field]

**Q17. Do you review code for different purposes at different times?**
- [ ] Yes (e.g., security before release, performance during optimization)
- [ ] No (always comprehensive review)

**Q18. Would you use `/code-review` more if it was faster?**
- [ ] Yes, speed is a major factor
- [ ] Maybe, if it was under 5 minutes
- [ ] No, thoroughness is more important than speed

**Q19. How do you currently handle repeat issues (same issue found multiple times)?**
- [ ] Fix all at once
- [ ] Fix incrementally
- [ ] Mark as "will not fix" somewhere
- [ ] Nothing (review finds them again next time)

---

#### Section 6: Open Feedback

**Q20. What feature is `/code-review` missing that would make it invaluable to you?**

[Open text field]

**Q21. If you could change ONE thing about `/code-review`, what would it be?**

[Open text field]

**Q22. Any other feedback about code review functionality?**

[Open text field]

---

### Survey Analysis Guide

**After collecting responses:**

1. **Usage Patterns** (Q1-Q5):
   - Identify power users vs. occasional users
   - Understand typical project size and review duration
   - Map triggers to proposed improvements

2. **Pain Point Analysis** (Q6-Q8):
   - Categorize common frustrations
   - Identify most frequent blockers
   - Validate limitations from proposal

3. **Feature Prioritization** (Q9-Q10):
   - Calculate average ranking for each improvement
   - Identify most-requested single feature
   - Adjust implementation phase priorities

4. **Feature Validation** (Q11-Q15):
   - Measure enthusiasm for each proposed feature
   - Identify features that need more explanation
   - Determine default behaviors (auto vs. prompt)

5. **Workflow Insights** (Q16-Q19):
   - Understand how users want to use the tool
   - Identify workflow integration points
   - Discover unmet needs

6. **Open Insights** (Q20-Q22):
   - Capture features not in proposal
   - Identify surprising use cases
   - Find unexpected pain points

---

### Sample Size Targets

- **Minimum viable**: 10 responses (directional insights)
- **Good confidence**: 25 responses (identify trends)
- **High confidence**: 50+ responses (statistical significance)

---

### Distribution Channels

1. **GitHub Discussions** - Pin survey thread
2. **Documentation Site** - Add feedback link to /code-review docs
3. **Direct outreach** - Email known active users
4. **Release notes** - Include survey link in v3.3.1 announcement

---

## Success Metrics

**Adoption**:
- % of users running /code-review at least once per project
- Frequency of use (monthly active reviews)

**Effectiveness**:
- % of review findings that get fixed
- Time from review to fix (reduced by TodoWrite integration)
- Code quality grade improvements over time

**Efficiency**:
- Avg review time (should decrease with scoped reviews)
- Token usage (should decrease with incremental reviews)
- False positive rate (should decrease with feedback)

---

## Open Questions

1. **Scope Granularity**: Should `--scope` support file patterns (glob) or just directories?
2. **Auto-fix Integration**: Should critical security issues trigger auto-fix suggestions?
3. **Review Cadence**: Should we recommend review frequency based on commit rate?
4. **Team Reviews**: Should we support multiple reviewers (human + AI)?
5. **Cost Visibility**: Should we show estimated token usage before review?
6. **Integration Testing**: Should review check test coverage and suggest missing tests?

---

## Risks & Mitigation

**Risk 1: Scope Creep**
- Mitigation: Implement in phases, get feedback after each phase

**Risk 2: Complexity**
- Mitigation: Keep defaults simple, advanced features opt-in

**Risk 3: Context File Clutter**
- Mitigation: Make context integration optional, prompt before writing

**Risk 4: False Sense of Security**
- Mitigation: Emphasize review is not exhaustive, human judgment required

---

## Next Steps

1. **Gather user feedback** (see attached survey)
2. **Prioritize improvements** based on feedback
3. **Implement Phase 1** (v3.4.0)
4. **Test with real users** on real projects
5. **Iterate** based on usage data

---

## Appendix: Related Work

- **GitHub Copilot Reviews**: Inline suggestions during coding
- **CodeClimate**: Continuous quality tracking
- **SonarQube**: Enterprise-grade static analysis
- **Review Board**: Team code review platform

**Differentiation**: AI Context System reviews integrate with project context and decision history, providing context-aware analysis that improves over time.
