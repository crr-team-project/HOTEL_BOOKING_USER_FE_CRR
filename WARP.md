# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repo is a React 19 + Vite single-page application for the hotel-booking user frontend (`hotel-booking-user-fe`). It uses React Router v7 for routing, SCSS for styling, flat ESLint configuration, and `rolldown-vite` as the Vite runtime.

The app entry point is `src/main.jsx`, which mounts `App` from `src/App.jsx` into the `index.html#root` element and wraps it with `AuthProvider` from `src/context/AuthContext.jsx`.

There are no custom CLAUDE, Cursor, or Copilot rule files in this project as of now.

## Common Commands

All commands are intended to be run from the repo root.

- Install dependencies:
  - `npm install`
- Start dev server (HMR):
  - `npm run dev`
- Production build:
  - `npm run build`
- Preview a production build locally:
  - `npm run preview`
- Lint the whole project (flat ESLint):
  - `npm run lint`
- Lint a specific file or directory (useful during development):
  - `npm run lint -- src/pages/home/HomePage.jsx`

### Notes

- Vite is resolved via `rolldown-vite` using the `overrides` field in `package.json`; treat it like standard Vite unless modifying bundler-level behavior.
- There are currently no test scripts configured in `package.json`.

## Code Architecture

### Entry point and providers

- `index.html`
  - Contains the root `<div id="root">` where the React tree is mounted.
- `src/main.jsx`
  - Imports global styles from `src/styles/index.scss`.
  - Wraps the app tree with `AuthProvider` so authentication state is available throughout the component tree.
  - Uses `ReactDOM.createRoot` to render `<App />` inside `React.StrictMode`.
- `src/App.jsx`
  - Thin shell that renders the router: `<AppRouter />`.

### Routing and layouts

Routing is centralized in `src/AppRouter.jsx` using `BrowserRouter`, with nested layouts that define the main page shells.

- `MainLayout` (`src/components/layouts/MainLayout.jsx`)
  - Applied to the main landing and search area (`/`).
  - Renders a persistent `Header` and `Footer` around an `<Outlet />` where page content is injected.
  - Primary routes:
    - `/` → `HomePage` (`src/pages/home/HomePage.jsx`).
    - `/search` → `SearchPage` (`src/pages/search/SearchPage.jsx`).
    - `/hotels` → `HotelListPage` and `/hotels/:hotelId` → `HotelDetailPage`.

- Booking flow (protected, hotel-specific)
  - Rooted at `/booking/:hotelId` with `BookingStepLayout`.
  - Nested step routes:
    - `/booking/:hotelId` → `BookingStepDates`.
    - `/booking/:hotelId/room` → `BookingStepRoom`.
    - `/booking/:hotelId/extras` → `BookingStepExtras`.
    - `/booking/:hotelId/payment` → `BookingStepPayment`.
    - `/booking/:hotelId/complete` → `BookingComplete`.
  - The entire booking tree is wrapped in `ProtectedRoute`.

- Support section (`/support`)
  - Routes for FAQ, notices, and contact:
    - `/support` and `/support/faq` → `FaqPage`.
    - `/support/notices` → `NoticeListPage`.
    - `/support/notices/:noticeId` → `NoticeDetailPage`.
    - `/support/contact` → `ContactPage`.

- My Page (protected, user account area)
  - Rooted at `/mypage` and wrapped in both `ProtectedRoute` and `MyPageLayout`.
  - `MyPageLayout` provides a structural shell with an `<aside>` for navigation and a `<main>` containing an `<Outlet />` for the active subsection.
  - Key routes:
    - `/mypage` → `MyOverviewPage`.
    - `/mypage/profile` → `ProfilePage`.
    - `/mypage/bookings` → `MyBookingsPage` and `/mypage/bookings/:bookingId` → `MyBookingDetailPage`.
    - `/mypage/reviews` → `MyReviewsPage`.
    - `/mypage/wishlist` → `WishlistPage`.
    - `/mypage/coupons` → `MyCouponsPage`.
    - `/mypage/points` → `MyPointsPage`.
    - `/mypage/inquiries` → `MyInquiriesPage`.

- Auth layout (`AuthLayout`, `src/components/layouts/AuthLayout.jsx`)
  - Wraps authentication-related routes with a minimal shell (`<div className="auth-layout">`).
  - Routes:
    - `/login` → `LoginPage`.
    - `/signup` → `SignupPage`.
    - `/reset-password` → `ResetPasswordPage`.
    - `/oauth/kakao/callback` → `KakaoCallbackPage`.
    - `/oauth/google/callback` → `GoogleCallbackPage`.

- 404 handling
  - `*` → `NotFoundPage` (`src/pages/common/NotFoundPage.jsx`).

When adding new sections, prefer defining them in `AppRouter.jsx` and, where appropriate, nesting them under an existing layout or a new layout component.

### Authentication context and route protection

- `AuthContext` (`src/context/AuthContext.jsx`)
  - Provides `user`, `isAuthed`, `login`, `logout`, and `setUser` through React context.
  - Persists user data in `localStorage` under the `user` key and hydrates it on app load.
- `ProtectedRoute` (`src/components/common/ProtectedRoute.jsx`)
  - Currently uses a hardcoded `isAuthenticated = false` and redirects unauthenticated users to `/auth/login`.
  - **Important for future work:** this component is a placeholder. It should eventually read authentication state from `AuthContext` (e.g., `isAuthed`) and redirect to the actual login route (`/login`) once the real login flow is implemented.

### Layout-level components

- `Header` (`src/components/common/Header.jsx`)
  - Imports its SCSS from `src/styles/components/common/Header.scss`.
  - Provides top navigation with links to search and support, plus quick access to login and signup.
- `Footer` (`src/components/common/Footer.jsx`)
  - Simple footer component used in `MainLayout`.

### Styling system

Global and shared styling is organized through SCSS modules and forwards:

- Global entry:
  - `src/styles/index.scss` is imported in `main.jsx` and acts as the root of the style tree.
- Core style primitives (`src/styles/common`):
  - `_index.scss` uses `@forward` to re-export:
    - `_variables.scss` — design tokens (colors, spacing, etc.).
    - `_mixins.scss` — reusable SCSS mixins.
    - `_reset.scss` — CSS reset.
    - `_base.scss` — base typography and layout styles.
    - `_buttons.scss` — shared button styles.
    - `_forms.scss` — shared form styles.
- Component/page styles:
  - `src/styles/components/**` contains SCSS for reusable components (e.g., header, home hero, newsletter).
  - `src/styles/pages/**` contains page-specific styles (e.g., `pages/home/HomePage.scss`).

When introducing new components or pages, prefer colocating their SCSS in the corresponding `components` or `pages` subdirectories and importing it from the relevant React component.

### Tooling configuration

- `vite.config.js`
  - Uses `defineConfig` with `@vitejs/plugin-react`.
  - CSS is configured with `devsource: true` under the `css` key; otherwise behaves like standard Vite.
- `eslint.config.js`
  - Flat ESLint config using:
    - `@eslint/js` recommended configs.
    - `eslint-plugin-react-hooks` (React Hooks rules).
    - `eslint-plugin-react-refresh` (Vite React fast-refresh rules).
  - Applies to all `**/*.{js,jsx}` files and ignores `dist` via `globalIgnores`.
  - Custom rule:
    - `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` — allows unused variables whose names are ALL CAPS (e.g., constants) without triggering errors.

## Testing

There is currently no testing setup (no Jest, Vitest, or React Testing Library) and no test scripts in `package.json`. If tests are added in the future, also add the corresponding `npm` scripts (for example, `test`, `test:watch`) and document how to run them here, including how to run a single test file.
