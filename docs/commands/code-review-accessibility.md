# /code-review-accessibility

WCAG 2.1 AA compliance audit covering keyboard navigation, screen readers, and ARIA.

## Overview

Accessibility audit based on WCAG 2.1 AA guidelines:
- POUR principles (Perceivable, Operable, Understandable, Robust)
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus management
- ARIA implementation

## Quick Start

```bash
/code-review-accessibility
```

## What It Checks

### POUR Principles

| Principle | Checks |
|-----------|--------|
| Perceivable | Alt text, color contrast, text resize |
| Operable | Keyboard nav, focus visible, skip links |
| Understandable | Labels, error messages, consistent nav |
| Robust | Valid HTML, ARIA roles, compatibility |

### Keyboard Navigation

- All interactive elements focusable
- Logical tab order
- No keyboard traps
- Skip navigation links
- Focus indicators visible

### Screen Reader Support

- Semantic HTML structure
- Heading hierarchy (h1→h6)
- Landmark regions
- Live regions for updates
- Hidden content handling

### Color & Contrast

- Text contrast ratios (4.5:1 normal, 3:1 large)
- Non-text contrast (3:1)
- Color not sole indicator
- Focus indicator contrast

### ARIA Usage

- Proper role assignments
- Required ARIA attributes
- State management
- No redundant ARIA on semantic elements

## Report Output

Reports saved to `docs/audits/accessibility-audit-NN.md`:

```markdown
# Accessibility Audit Report (01)

## Executive Summary
**Grade:** B
**WCAG Level:** AA (partial)
**Critical Issues:** 0

## Findings

### HIGH: Missing Form Labels
**Location:** components/LoginForm.tsx:15
**Impact:** Screen reader users can't identify fields
**Fix:** Add htmlFor/id associations

...
```

## Grading Scale

| Grade | WCAG Coverage |
|-------|---------------|
| A | Full AA compliance |
| B | 90%+ AA, no critical |
| C | 75%+ AA, ≤2 critical |
| D | 50%+ AA |
| F | < 50% AA |

## When to Run

- Before public launch
- After UI changes
- Before accessibility audits
- After component library updates
- When adding forms/modals

## Legal Compliance

WCAG 2.1 AA is required by:
- ADA (Americans with Disabilities Act)
- Section 508
- EN 301 549 (EU)
- AODA (Ontario)

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/code-review-seo](/commands/code-review-seo) - SEO audit
