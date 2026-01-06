# /build-check

Pre-push build gate running lint, typecheck, tests, and build in sequence.

## Overview

Sequential build validation before pushing:
1. **Lint** - ESLint/Prettier checks
2. **Typecheck** - TypeScript compilation
3. **Tests** - Test suite execution
4. **Build** - Production build

Stops on first failure with actionable fix suggestions.

## Quick Start

```bash
/build-check
```

## What It Does

### Sequential Execution

```
/build-check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1/4: Lint
Running: npm run lint
✅ Passed (2.3s)

Step 2/4: Typecheck
Running: npx tsc --noEmit
✅ Passed (4.1s)

Step 3/4: Tests
Running: npm test
✅ Passed (12.7s)

Step 4/4: Build
Running: npm run build
✅ Passed (18.2s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All checks passed! Safe to push.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Framework Auto-Detection

| Framework | Detected By | Commands |
|-----------|-------------|----------|
| Next.js | next.config.* | next lint, next build |
| Remix | remix.config.* | remix build |
| Astro | astro.config.* | astro check, astro build |
| Vite | vite.config.* | vite build |
| Generic | package.json | npm run lint/test/build |

### Failure Handling

```
Step 2/4: Typecheck
Running: npx tsc --noEmit
❌ Failed

Errors:
  src/lib/auth.ts:45:10 - error TS2322: Type 'string' is not assignable to type 'number'.

Common Fixes:
1. Fix the type error at src/lib/auth.ts:45
2. If intentional, add type assertion: `as number`
3. Check if related types need updating

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Build check failed at: Typecheck
Fix the errors above and run /build-check again.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Common Failure Patterns

### Lint Failures

| Pattern | Fix |
|---------|-----|
| Unused imports | Remove or use the import |
| Missing semicolons | Run `npm run lint -- --fix` |
| Console.log statements | Remove or use logger |

### Typecheck Failures

| Pattern | Fix |
|---------|-----|
| Type mismatch | Fix types or add assertion |
| Missing types | Add @types/* package |
| Implicit any | Add explicit type annotation |

### Test Failures

| Pattern | Fix |
|---------|-----|
| Snapshot mismatch | Update snapshots or fix code |
| Timeout | Increase timeout or fix async |
| Mock issues | Update mock implementations |

### Build Failures

| Pattern | Fix |
|---------|-----|
| Module not found | Check imports and dependencies |
| Memory exceeded | Increase Node memory or optimize |
| Environment vars | Check .env.local setup |

## Configuration

Configure in `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "build": "next build"
  }
}
```

## When to Run

- **Before every push** - Catch issues early
- **Before PR creation** - Ensure CI will pass
- **After major changes** - Validate everything works
- **After dependency updates** - Check compatibility

## Integration with Git Hooks

Add to `.husky/pre-push`:

```bash
#!/bin/sh
# Run build check before pushing
echo "Running pre-push checks..."
# Note: /build-check is a Claude Code command
# For git hooks, use the actual commands:
npm run lint && npm run typecheck && npm test && npm run build
```

## Related Commands

- [/code-review](/commands/code-review) - Quality audits
- [/code-review-testing](/commands/code-review-testing) - Test coverage audit
- [/code-review-typescript](/commands/code-review-typescript) - Type safety audit
