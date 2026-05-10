# Useful Prompts

Last updated: 2026-05-10

Use these prompts at the start of future AI sessions.

## Start Tomorrow

```text
Avval docs/ai/MIGRATION_CONTEXT.md, DECISIONS.md, NEXT_STEPS.md, FRONTEND_MIGRATION.md, COMPLETED_TASKS.md fayllarini o'qib chiq. Keyin loyiha hozir qayerda turganini qisqa ayt va NEXT_STEPS.md dagi Step 1 dan boshlab implementatsiya qil.
```

## Continue From A Specific Step

```text
docs/ai fayllarini o'qib chiq va NEXT_STEPS.md dagi Step [raqam] ni bajar. O'zgarishlarni kichik scope'da qil, keyin npx tsc --noEmit va yarn build bilan tekshir.
```

## AI Chat API Hardening

```text
docs/ai kontekstini o'qib chiq. pages/api/ai-chat.ts faylini production uchun xavfsizroq qil: method check, message validation, max length, missing GROQ_API_KEY handling, upstream non-OK handling va ortiqcha loglarni olib tashla. Keyin TypeScript va buildni tekshir.
```

## ESLint Setup

```text
docs/ai kontekstini o'qib chiq. Projectda yarn lint interaktiv promptda to'xtayapti. Next 14 ga mos ESLint config qo'sh, eslint-config-next versiyasini tekshir, keyin yarn lint, npx tsc --noEmit va yarn build natijalarini ayt.
```

## Auth Refresh Decision

```text
docs/ai kontekstini o'qib chiq. apollo/client.ts va libs/auth/index.ts dagi token refresh holatini analiz qil. Backend refresh endpoint yoki mutation mavjudligini qidir. Agar mavjud bo'lsa real refresh flow implement qil, bo'lmasa TokenRefreshLink placeholderini olib tashlab 401 holatda aniq logout/error flow qil.
```

## Clean Console Logs

```text
docs/ai kontekstini o'qib chiq. Build paytida chiqadigan console loglarni top va production renderdan olib tashla. Kerakli joylarda faqat error handling qoldir. Keyin npx tsc --noEmit va yarn build bilan tekshir.
```

## Type Safety Pass

```text
docs/ai kontekstini o'qib chiq. Bitta kichik module tanla va undagi any/@ts-ignore ishlatishlarini aniq tiplarga almashtir. Katta refactor qilma. O'zgarishdan keyin npx tsc --noEmit bilan tekshir.
```

## Stay List Runtime Safety

```text
docs/ai kontekstini o'qib chiq. pages/stays/index.tsx ichida query input JSON.parse va searchFilter mutation risklarini tuzat. Malformed query bo'lsa initialInput ishlasin. Behaviorni saqla, keyin TypeScript va buildni tekshir.
```

## Review Mode

```text
docs/ai fayllarini va oxirgi git diffni o'qib chiq. Code review qil: avval bug/risklarni severity bo'yicha file:line bilan yoz, keyin qisqa summary ber.
```

