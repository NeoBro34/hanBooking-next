# Frontend Migration Notes

Last updated: 2026-05-10

This is a practical migration plan for improving the frontend without breaking the working app.

## Current Frontend Shape

The app uses:

- Next.js Pages Router
- Layout HOCs:
  - `libs/components/layout/LayoutHome.tsx`
  - `libs/components/layout/LayoutBasic.tsx`
  - `libs/components/layout/LayoutFull.tsx`
  - `libs/components/layout/LayoutAdmin.tsx`
- Global styles from:
  - `scss/app.scss`
  - `scss/pc/main.scss`
  - `scss/mobile/main.scss`
- MUI theme from `scss/MaterialTheme`
- Translation through `next-i18next`

## Migration Goal

Make the frontend easier to maintain while preserving existing user workflows:

- Home
- Stay list/detail
- Agent list/detail
- Blog/community
- My Page
- Admin
- Chat and AI assistant

## Phase 1 - Stabilize

1. Add ESLint config compatible with Next 14.
2. Remove build-time console noise from pages and heavily-rendered components.
3. Fix password input type in login/signup.
4. Harden `pages/api/ai-chat.ts`.
5. Fix dependency mismatch warnings where possible.

Recommended verification after Phase 1:

```bash
npx tsc --noEmit
yarn lint
yarn build
```

## Phase 2 - Type Cleanup

Prioritize shared boundaries first:

1. Layout HOCs currently use broad `any`.
2. Admin list components pass handler props as `any`.
3. Chat message payload uses `memberData: any`.
4. Page props such as `initialInput` and route query parsing use `any`.
5. Apollo mutation and query handlers often use `any` errors and variables.

Do not try to fix all `any` usage in one pass. Start with files that are touched for real feature work.

## Phase 3 - Runtime Safety

Improve the places most likely to crash at runtime:

- JSON parsing from query strings in pages like `pages/stays/index.tsx`.
- Optional chained GraphQL data where arrays can be empty.
- Image URL construction with missing or already-absolute image paths.
- WebSocket message parsing in `libs/components/Chat.tsx`.

Example target:

- Wrap `JSON.parse(router.query.input as string)` with a helper that validates fallback shape.
- Add try/catch around socket `JSON.parse`.

## Phase 4 - UI Consistency

Once the app is safer:

- Normalize buttons, forms, and empty states.
- Improve mobile screens that currently return placeholders such as `Stays MOBILE` or `LOGIN MOBILE`.
- Reduce global style coupling by moving repeated patterns into component classes or MUI theme variants.
- Keep admin UI utilitarian and dense; do not turn it into a marketing-style page.

## Phase 5 - Optional Larger Migration

Only consider these after stabilization:

- App Router migration.
- Replacing deprecated WebSocket subscription transport.
- Moving auth tokens to httpOnly cookies if backend supports it.
- Adding automated E2E tests for booking and admin flows.

## Files To Review Before Editing UI

- `pages/_app.tsx`
- `scss/app.scss`
- `scss/pc/main.scss`
- `scss/mobile/main.scss`
- `libs/components/layout/LayoutBasic.tsx`
- `libs/components/layout/LayoutHome.tsx`
- `libs/components/layout/LayoutAdmin.tsx`
- `libs/components/Top.tsx`
- `libs/components/Footer.tsx`
- `libs/components/Chat.tsx`

