# Next Steps

Last updated: 2026-05-10

This is the recommended order for the next working session.

## Step 1 - Configure ESLint

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

Files:

- `apollo/client.ts`
- `libs/auth/index.ts`

Options:

- Implement real refresh-token flow if backend supports it.
- Remove `TokenRefreshLink` and handle `401` with logout plus user-facing message.

Do not keep the current placeholder long term.

## Step 5 - Clean Build-Time Console Noise

Start with files that printed during `yarn build`:

- `pages/account/join.tsx`
- `libs/components/mypage/MyProfile.tsx`
- Any page/component that logs default state during render.

Then scan:

```bash
rg -n "console\\." pages libs apollo
```

Keep only intentional dev logs or replace with a tiny logger that is disabled in production.

## Step 6 - Safe Query Parsing

File:

- `pages/stays/index.tsx`

Current risk:

- `JSON.parse(router.query.input as string)` can throw if the query param is malformed.

Task:

- Add a helper for safe parsing and fallback to `initialInput`.
- Avoid mutating `searchFilter` directly in pagination.

## Step 7 - Dependency Cleanup

Review `package.json` and remove or upgrade carefully.

Likely candidates:

- Align `eslint-config-next` with `next`.
- Investigate Apollo warning.
- Replace deprecated `subscriptions-transport-ws` eventually.
- Remove `react-scripts` if unused.
- Review old picker packages.

Run after each dependency change:

```bash
yarn install
npx tsc --noEmit
yarn build
```

