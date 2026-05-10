# Decisions

Last updated: 2026-05-10

This file records working decisions so tomorrow's session can continue without re-litigating the basics.

## Current Direction

The immediate goal is not a full rewrite. The safer path is incremental stabilization:

1. Keep the existing Next.js Pages Router structure for now.
2. Fix verification, linting, and security-sensitive routes first.
3. Improve auth, API validation, and dependency health before major UI refactors.
4. Preserve existing visual structure unless a specific screen is being redesigned.

## Framework Decisions

- Keep Next.js 14.2.1 for the short term.
- Do not migrate to App Router yet.
- Do not introduce a new state management library.
- Continue using Apollo Client for GraphQL.
- Continue using SCSS and MUI while cleaning rough edges gradually.

Reason: the project builds successfully today. A large framework migration before cleanup would add risk and make debugging harder.

## Auth Decisions

- Backend authorization is the source of truth.
- Frontend admin checks should improve UX but should not be treated as security by themselves.
- Token refresh should either be implemented properly or removed in favor of a clear expired-token logout flow.
- Avoid adding more sensitive values to client-exposed `next.config.js env`.

## AI Assistant Decisions

- Keep `pages/api/ai-chat.ts` server-side so `GROQ_API_KEY` stays hidden.
- Add request validation before changing the frontend chat UI.
- Add graceful errors for missing API key and upstream failures.
- Avoid logging full AI provider responses in production.
- Keep answers short because the widget UI is compact.

## Quality Decisions

- Configure ESLint before large refactors.
- Fix obvious security/UX issues before broad type cleanup.
- Use focused changes with verification after each change.
- Keep changes close to existing patterns until the project has better automated coverage.

## Naming Decisions

- Public browser environment variables should eventually use `NEXT_PUBLIC_*`.
- Server-only variables should stay unexposed and accessed only in API routes or server code.
- Existing `REACT_APP_*` names can be migrated gradually to avoid breaking runtime config.

## Testing Decisions

- Current project has no visible test setup.
- For now, use:

```bash
npx tsc --noEmit
yarn build
```

- After ESLint setup:

```bash
yarn lint
```

- Add component or integration tests only when touching high-risk behavior such as auth, booking, and admin flows.

