# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repo is a React + Vite frontend (`hotel-booking-user-fe`) using the Vite React template, `rolldown-vite` as the bundler, React Router, and SCSS (`sass-embedded`). The app entry point is `src/main.jsx`, which mounts `App` (from `src/App.jsx`) into `index.html#root` inside an `AuthProvider` context.

There are currently no project-specific CLAUDE, Cursor, or Copilot rules in this repo.

## Common Commands

Run all commands from the repo root.

- Start dev server (HMR):
  - `npm run dev`
- Production build:
  - `npm run build`
- Preview production build locally:
  - `npm run preview`
- Lint the whole project (flat ESLint):
  - `npm run lint`

### Notes

- Vite is resolved via `rolldown-vite` (`vite` is overridden in `package.json`), but can be treated like standard Vite unless you are changing bundler-level behavior.
- SCSS is compiled via `sass-embedded`; styles are imported through the Vite pipeline (no separate CSS build step).

## Runtime Architecture

### Entry and composition

- `index.html`
  - Contains the root `<div id="root">` where the React tree is mounted.
- `src/main.jsx`
  - Imports global styles from `src/styles/index.scss`.
  - Wraps the app with `AuthProvider` from `src/context/AuthContext.jsx`.
  - Uses `ReactDOM.createRoot` to render `<App />` inside `React.StrictMode`.
- `src/App.jsx`
  - Thin shell that renders `<AppRouter />`.
- `src/AppRouter.jsx`
  - Central routing configuration using `react-router-dom`.

### Routing and layouts

Routing is organized around a few layout components and grouped feature areas:

- `MainLayout` (`src/components/layouts/MainLayout.jsx`)
  - Wraps the main landing experience: header (`Header`), footer (`Footer`), and an `Outlet` for nested routes.
  - Handles `/` (home), `/search`, and `/hotels` pages (including `/hotels/:hotelId`).
- `AuthLayout` (`src/components/layouts/AuthLayout.jsx`)
  - Minimal layout for authentication-related screens (`/login`, `/signup`, `/reset-password`, `/oauth/...`).
- `MyPageLayout` (`src/components/layouts/MyPageLayout.jsx`)
  - Shell for user account / dashboard pages under `/mypage`.
- `ProtectedRoute` (`src/components/common/ProtectedRoute.jsx`)
  - Wrapper around `children` that will eventually enforce authentication.
  - Currently uses a placeholder `isAuthenticated = false` with a TODO; it redirects to `/auth/login` when unauthenticated.

Key route groups (see `src/AppRouter.jsx` for full details):

- Main experience (`/`, `/search`, `/hotels`, `/hotels/:hotelId`).
- Booking flow (requires auth, wrapped in `ProtectedRoute`):
  - `/booking/:hotelId` with nested steps: dates, room, extras, payment, complete.
- My Page (requires auth, wrapped in `ProtectedRoute`):
  - `/mypage` overview, profile, bookings (and booking detail), reviews, wishlist, coupons, points, inquiries.
- Support:
  - `/support` index, FAQ, notices (list/detail), contact.
- Auth:
  - `/login`, `/signup`, `/reset-password`, and OAuth callbacks under `/oauth/...`.
- Fallback:
  - `*` → `NotFoundPage` (`src/pages/common/NotFoundPage.jsx`).

## State and context

- `AuthContext` (`src/context/AuthContext.jsx`)
  - Provides `user`, `isAuthed`, `login`, `logout`, and `setUser` via React Context.
  - Persists user info in `localStorage` (`user` key) and restores it on page load.
  - `AuthProvider` wraps the entire app in `src/main.jsx`.

Agents adding authentication or integrating APIs should coordinate with `AuthContext` and then wire `ProtectedRoute` to use `isAuthed` instead of the current placeholder.

## Pages and components (high level)

Pages are grouped by domain under `src/pages`:

- `home`, `search`, `hotel` — discovery and hotel detail flows.
- `booking` — multi-step booking process, mounted under `BookingStepLayout`.
- `mypage` — user account area (bookings, profile, reviews, wishlist, etc.) rendered under `MyPageLayout`.
- `support` — FAQ, notices, and contact.
- `auth` — login/signup/reset and OAuth callbacks.
- `common` — shared pages like `NotFoundPage`.

Shared UI lives under `src/components`:

- `components/common` — cross-cutting components like `Header`, `Footer`, and `ProtectedRoute`.
- `components/layouts` — page shells used as React Router layout routes.

## Styling

SCSS is modularized via partials and forwarded through a single entry file:

- `src/styles/index.scss`
  - Main style entry imported by `src/main.jsx`.
  - Forwards everything from `src/styles/common/_index.scss`.
- `src/styles/common/_index.scss`
  - Re-exports base layers: `_variables.scss`, `_mixins.scss`, `_reset.scss`, `_base.scss`, `_buttons.scss`, `_forms.scss`.
- `src/styles/components/common/Header.scss`
  - Header-specific styles used by `Header`.
- `src/styles/pages/...`
  - Page-level styles (e.g., `pages/home/HomePage.scss`).

When adding new components or pages, prefer colocated SCSS under `styles/components` or `styles/pages` and import them in the relevant React components.

## Tooling configuration

- `vite.config.js`
  - Uses `@vitejs/plugin-react` and enables `css.devsource`.
  - Extend this when adding aliases, additional plugins, or dev server customization.
- `eslint.config.js`
  - Flat config built from:
    - `@eslint/js` recommended rules.
    - `eslint-plugin-react-hooks` recommended rules.
    - `eslint-plugin-react-refresh` Vite integration.
  - Targets `**/*.{js,jsx}` and ignores `dist`.
  - Custom rule: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` to allow constant-like unused identifiers.

## Testing

There is currently no test runner configured (no Jest, Vitest, or similar). Before adding tests, introduce a test stack (for example, Vitest + React Testing Library), wire it into `package.json` scripts (e.g., `"test"`, `"test:watch"`), and then update this section with the exact commands to run all tests and a single test file.

## Other docs

- `README.md` is the default Vite React template and mainly documents generic Vite/React usage; refer to it for Vite CLI options or React Compiler notes if needed.
