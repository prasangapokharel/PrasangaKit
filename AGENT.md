# Prasanga UI — Agent Guide

React Native (Expo) UI component library. Goal: **A+ premium**, scalable, theme-aware, secure, minimal code.

## Stack

- Expo ~54, React 19, React Native 0.81, TypeScript (strict)
- Package name: `prasanga-ui` — published to npm
- Theme: shadcn-style HSL tokens in `src/styles/globals.css` → hex via `src/lib/theme.ts`

## Before You Change Anything

1. Read existing code in the target file and its neighbors — match patterns.
2. Run `npm run type-check` and `npm run lint` before finishing.
3. Do **not** create markdown files unless the user explicitly asks.
4. Do **not** commit or publish unless the user explicitly asks.

## Project Layout

```
src/
├── components/ui/   # Presentation-only UI components (export from src/index.ts)
├── lib/             # theme, theme-context, typography, utils
├── hooks/           # useApi, useValidation, usePagination
├── services/        # apiService
├── types/           # Shared TypeScript types
├── utils/           # Pure helpers
├── config/          # env access
└── styles/globals.css
constants/           # App-wide constants (validation, pagination, etc.)
App.tsx              # Local demo app (not published)
```

## Non-Negotiables

### Code quality
- Minimal diffs — fix only what the task requires.
- No duplicate logic — reuse `typography`, `useTheme`, shared utils.
- No over-abstraction — no one-line helpers or premature generics.
- Components are **presentation-only** — no business logic inside UI files.
- Every UI component: `React.forwardRef`, typed props, `displayName`.

### React Native UI
- Always use `useTheme()` for colors — never hardcode theme colors in components.
- Always use `typography` presets — never magic font sizes.
- Support light and dark via `ThemeProvider` / `globals.css` tokens.
- Use `StyleSheet.create` inside components when styles depend on theme.
- Platform-aware shadows via `platformSpecificStyles` when needed.
- Prefer `Pressable` / `TouchableOpacity` with explicit `activeOpacity` and disabled states.

### Security
- Never commit secrets (`.env`, tokens, keys).
- Never log tokens, passwords, or PII.
- Validate external input in hooks/utils — not duplicated per component.
- API calls only through `src/services/api.ts`.
- No `eval`, dynamic `require` from user input, or `dangerouslySetInnerHTML`.

### Exports
- Public API lives in `src/index.ts` only.
- Export `ThemeProvider`, `useTheme`, hooks, and utilities when they are part of the library contract.

### Documentation
- Do not add or edit README/docs unless the user asks.
- JSDoc only for non-obvious props or public hook APIs.

## Theme System

```tsx
import { ThemeProvider, useTheme } from "./src/lib/theme-context";

// colors.* comes from globals.css HSL → **converted in theme.ts
const { theme, colors, toggleTheme, setTheme } = useTheme();
```

Edit colors in `src/styles/globals.css` (`:root` / `.dark`). Components pick them up automatically.

## Quality Gates

```bash
npm run type-check   # tsc --noEmit
npm run lint         # expo lint
```

Both must pass before any publish.

## Publish Checklist (user-requested only)

1. Bump version in `package.json` and align `constants/index.ts` `APP_CONFIG.VERSION`.
2. Confirm `src/index.ts` exports match README promises.
3. Confirm `.npmignore` / `package.json` `files` are consistent.
4. Run type-check + lint.
5. `npm publish` (user runs or explicitly requests).

## What Not To Do

- Add new dependencies without strong reason.
- Create parallel theme/color systems.
- Inline styles for theme-dependent values.
- Add tests or docs unless requested.
- Force-push or amend commits the user did not ask for.
