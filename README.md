# Film Making — AI Pre-production Workspace

Film Making 2 is a Next.js pre-production dashboard that connects screenplay input to a remote API for script analysis, character breakdowns, scheduling, budgeting, and storyboard generation.

## Core features

- Drag-and-drop `.txt` screenplay upload and direct text submission.
- Script-analysis timeline and detail views.
- Character profiles and breakdown views.
- Shooting schedule creation with date, location, weather, and workday constraints.
- Budget generation, budget scenarios, and chart-based summaries.
- Per-scene and batch storyboard generation with image retrieval.
- Browser-local caching, offline upload fallback, theme persistence, and API data reload/reset.

## Technology stack

- Next.js 15 and React 19
- JavaScript and TypeScript
- Material UI 5, Emotion, and custom wrapper components
- MUI X Date Pickers, date-fns, React Dropzone, and Nivo charts
- Tailwind CSS 4 build tooling

## Prerequisites

- Node.js and npm
- Network access to the external API currently configured in `app/page.jsx`

## Local setup

```bash
git clone https://github.com/varunisrani/film_making2.git
cd film_making2
npm ci
npm run dev
```

The front end uses `http://localhost:3000` by default.

Production commands:

```bash
npm run build
npm run start
```

The repository also defines `npm run lint`.

## Configuration

No environment variables are referenced. The API URL is hard-coded in `app/page.jsx`, so changing the backend currently requires a source edit.

## Project structure

- `app/page.jsx` — main workflow, API integration, dashboards, and storyboard UI.
- `app/components/` — custom UI wrappers, tabs, theme support, and budgeting components.
- `app/hooks/useBudget.ts` — budget-related state behavior.
- `app/types/budget.ts` — budget types.
- `utils/storage.js` — browser-local persistence helpers.
- `pages/404.js` and `app/[...not_found]/` — legacy and App Router not-found handling.
- Root `page*` and unusually named files — historical/backup artifacts not used as the main App Router page.

## Status and limitations

This is a front-end prototype coupled to a fixed external service. Most analysis features fail when that service is unavailable or incompatible; only basic uploaded script text has a local fallback. The repository contains several backup or scratch files and mixed JavaScript/TypeScript implementations. The referenced placeholder asset is not present at its expected path. No automated test script is defined, and the lint script uses `next lint`, which may not work with this Next.js version.