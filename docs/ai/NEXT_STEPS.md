# Next Steps

Last updated: 2026-05-10

This is the recommended order for the next working session.

## Step 1 - Configure ESLint

Status: completed on 2026-05-10.

Goal: make `yarn lint` non-interactive and useful.

Tasks:

- Add a Next 14-compatible ESLint config.
- Align `eslint-config-next` version with current `next` version.
- Run:

```bash
yarn lint
npx tsc --noEmit
yarn build
```

Expected result:

- `yarn lint` should produce real lint output instead of a setup prompt.

## Step 2 - Harden AI Chat API

Status: completed on 2026-05-10.

File:

- `pages/api/ai-chat.ts`

Tasks:

- Allow only `POST`.
- Validate `message` is a non-empty string.
- Limit message length.
- Return `400`, `405`, `500`, or `502` where appropriate.
- Check `process.env.GROQ_API_KEY`.
- Remove full upstream response logs.
- Consider simple IP-based or in-memory rate limiting if this remains a public endpoint.

Verification:

```bash
npx tsc --noEmit
yarn build
```

Manual checks:

- Empty message returns validation error.
- Wrong method returns method error.
- Valid message returns a short AI reply.

## Step 3 - Fix Login UX/Security Basics

Status: completed on 2026-05-10.

File:

- `pages/account/join.tsx`

Tasks:

- Change password input from `type="text"` to `type="password"`.
- Add minimal required-field validation before calling `logIn` or `signUp`.
- Remove `console.warn(input)` and `console.log('+input:', input)`.

Verification:

```bash
npx tsc --noEmit
yarn build
```

## Step 4 - Decide Token Refresh Strategy

Status: completed on 2026-05-10 for current frontend scope.

Files:

- `apollo/client.ts`
- `libs/auth/index.ts`

Options:

- Implement real refresh-token flow if backend supports it.
- Remove `TokenRefreshLink` and handle `401` with logout plus user-facing message.

Decision:

- No refresh endpoint or mutation was found in the frontend GraphQL operations.
- The placeholder refresh link was removed.
- Current behavior clears `accessToken` and reloads on `401` or GraphQL `UNAUTHENTICATED`.
- If the backend later adds refresh-token support, revisit this step.

## Step 5 - Clean Build-Time Console Noise

Status: partially completed on 2026-05-10.

Start with files that printed during `yarn build`:

- `pages/account/join.tsx`
- `libs/components/mypage/MyProfile.tsx`
- Any page/component that logs default state during render.

Then scan:

```bash
rg -n "console\\." pages libs apollo
```

Progress:

- Removed account join render/input logs.
- Removed my profile render log.

Remaining:

- Search for remaining `console.*` logs and decide which are useful.
- Apollo/i18n build warnings remain and are not ordinary app `console.log` output.

## Step 6 - Safe Query Parsing

Status: completed for `pages/stays/index.tsx` on 2026-05-10.

File:

- `pages/stays/index.tsx`

Current risk:

- `JSON.parse(router.query.input as string)` can throw if the query param is malformed.

Task:

- Add a helper for safe parsing and fallback to `initialInput`.
- Avoid mutating `searchFilter` directly in pagination.

## Step 7 - Dependency Cleanup

Status: partially completed on 2026-05-10.

Review `package.json` and remove or upgrade carefully.

Likely candidates:

- Align `eslint-config-next` with `next`. Completed.
- Investigate Apollo warning.
- Replace deprecated `subscriptions-transport-ws` eventually.
- Remove `react-scripts` if unused. Completed.
- Review old picker packages. `material-ui-pickers` removed because it was unused.

Already removed:

- `@apollo/react-components`
- `apollo-link-token-refresh`
- `material-ui-pickers`
- `react-scripts`

Run after each dependency change:

```bash
yarn install
npx tsc --noEmit
yarn build
```
