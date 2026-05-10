# HanBooking Next - AI Handoff Context

Last updated: 2026-05-10

## Project Summary

HanBooking is a Next.js accommodation booking frontend for South Korea. Users can search and book stays, save favorites, read/write community articles, manage profiles, and use live chat plus an AI assistant.

The project is currently a Pages Router Next.js app using:

- Next.js 14.2.1
- React 18.2.0
- Apollo Client for GraphQL
- MUI and SCSS for UI
- next-i18next for locales: `en`, `kr`, `ru`, `uz`
- Valtio/Apollo reactive vars for some client state

## Important Directories

- `pages/`: Next.js routes and API routes.
- `pages/api/ai-chat.ts`: Server API route for Groq-powered AI assistant.
- `pages/_admin/`: Admin pages.
- `apollo/`: Apollo client, reactive store, GraphQL queries and mutations.
- `libs/auth/`: Login, signup, token storage, decoded user state.
- `libs/components/`: Shared UI components and domain components.
- `libs/types/`: Frontend TypeScript domain types.
- `scss/`: Global, desktop, mobile, and MUI theme styles.
- `public/locales/`: Translation files.

## Current Verification Status

These commands were run on 2026-05-10:

```bash
npx tsc --noEmit
yarn build
yarn lint
```

Results:

- `npx tsc --noEmit` passed.
- `yarn build` passed.
- `yarn lint` failed because Next ESLint is not configured yet. It opens an interactive prompt.

Build warning notes:

- During `yarn build`, Apollo repeatedly logged a warning about `cache.diff`, `canonizeResults`, and removing that option. The codebase search did not find `canonizeResults`, so it likely comes from dependency compatibility.
- Build also printed several component-level `console.log` outputs during static generation.

## High-Risk Areas

### Auth And Token Refresh

File: `apollo/client.ts`

`TokenRefreshLink` is currently a placeholder:

- `isTokenValidOrUndefined` always returns `true`.
- `fetchAccessToken` returns `null`.

This means expired tokens are not refreshed. A user with an expired token can get API errors instead of a clean refresh or logout flow.

File: `libs/auth/index.ts`

Auth stores `accessToken` in `localStorage` and decodes it into `userVar`. This is simple but exposes the token to XSS if the app ever has an injection issue.

### Admin Route Protection

File: `libs/components/layout/LayoutAdmin.tsx`

Admin access is checked on the client after mount. Non-admin users are redirected to `/`, but protected pages can still be requested and rendered as empty UI before redirect. Backend GraphQL authorization must remain the real security boundary.

### AI Chat API

File: `pages/api/ai-chat.ts`

Current API route:

- Accepts request body without checking HTTP method.
- Does not validate `message` type or length.
- Does not check whether `GROQ_API_KEY` exists.
- Does not handle non-OK Groq responses carefully.
- Has no rate limit.
- Logs full upstream response.

This should be hardened before production use.

### Dependency Drift

File: `package.json`

There are version mismatches and old packages:

- `next` is 14.2.1 but `eslint-config-next` is 12.1.0.
- `subscriptions-transport-ws` is deprecated.
- `react-scripts` appears unnecessary in a Next app.
- Older MUI picker packages coexist with MUI 5 packages.
- Apollo packages are likely mismatched because install resolution uses `@apollo/client` 3.14.0 while `package.json` requests `^3.5.10`.

### Type Safety Debt

Approximate counts from static scan:

- 133 TypeScript/TSX files under `pages`, `libs`, `apollo`.
- 281 uses of `any`.
- 24 uses of `@ts-ignore`.
- 73 uses of `console.*`.

This does not block builds today, but it will slow down future feature work and make regressions harder to catch.

## Useful Commands

```bash
yarn dev
yarn build
npx tsc --noEmit
yarn lint
rg -n "@ts-ignore|any\\b|console\\." pages libs apollo
```

## Recommended First Read Tomorrow

Read in this order:

1. `docs/ai/MIGRATION_CONTEXT.md`
2. `docs/ai/DECISIONS.md`
3. `docs/ai/NEXT_STEPS.md`
4. `docs/ai/FRONTEND_MIGRATION.md`
5. `docs/ai/COMPLETED_TASKS.md`
6. `docs/ai/PROMPTS.md`

