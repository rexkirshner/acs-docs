# /code-review-security

Deep OWASP-style security audit covering authentication, injection, XSS, and dependency vulnerabilities.

::: tip Agent-Based (v5.0.0)
This command is now backed by the **security-reviewer agent** (`.claude/agents/security-reviewer.md`) with a self-declaring contract that specifies its capabilities and output format.
:::

## Overview

Comprehensive security audit based on the OWASP Top 10:
- Authentication and authorization flaws
- Injection vulnerabilities (SQL, NoSQL, command)
- Cross-site scripting (XSS)
- Cryptographic failures
- Security misconfigurations
- Dependency vulnerabilities

## Quick Start

```bash
/code-review-security
```

## What It Checks

### OWASP Top 10 Coverage

| Category | Checks |
|----------|--------|
| A01: Broken Access Control | Auth checks, RBAC, IDOR |
| A02: Cryptographic Failures | Weak crypto, exposed secrets |
| A03: Injection | SQL, NoSQL, command, LDAP |
| A04: Insecure Design | Missing security controls |
| A05: Security Misconfiguration | Headers, CORS, defaults |
| A06: Vulnerable Components | npm audit, known CVEs |
| A07: Auth Failures | Session, password, MFA |
| A08: Integrity Failures | Untrusted data, CI/CD |
| A09: Logging Failures | Missing logs, sensitive data |
| A10: SSRF | Server-side request forgery |

### Authentication Audit

- Session management security
- Password requirements and hashing
- Multi-factor authentication
- Token handling (JWT, refresh)
- Rate limiting on auth endpoints

### Dependency Scan

```bash
# Runs automatically
npm audit --json
```

## Report Output

Reports saved to `docs/audits/security-audit-NN.md`:

```markdown
# Security Audit Report (01)

## Executive Summary
**Grade:** B
**Critical Issues:** 1
**High Issues:** 3

## Findings

### CRITICAL: SQL Injection
**Location:** app/api/search/route.ts:45
**Risk:** Data breach, unauthorized access
**Fix:** Use parameterized queries

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | No critical/high, ≤3 medium |
| B | No critical, ≤2 high |
| C | ≤1 critical, ≤5 high |
| D | 2-3 critical issues |
| F | 4+ critical issues |

## When to Run

- Before production deployments
- After authentication changes
- After adding new API endpoints
- Monthly security audits
- After dependency updates

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/build-check](/commands/build-check) - Pre-push validation
