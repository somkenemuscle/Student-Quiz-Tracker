# Student Quiz Tracker

A full stack EdTech app for creating quizzes, taking them, and tracking scores, built as a technical assessment.

**Live app:** https://quiz-tracker-app.vercel.app
**API:** https://student-quiz-tracker.onrender.com/api/health

> Note: the backend is hosted on Render's free tier, which spins down after inactivity. The first request after idling can take 30–60s to wake up — this is expected, not a bug.

## Features

- Create a quiz with a title and any number of questions (each with a question text and a correct answer)
- View all created quizzes on the home screen
- Take a quiz one question at a time and submit answers
- See a score (number correct out of total) at the end, persisted to a real database
- All data survives a page refresh , quizzes and results are stored in PostgreSQL, not local storage

## Tech stack

**Client:** React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Lucide icons
**Server:** Node, Express, TypeScript, Prisma, PostgreSQL (hosted on Neon)
**Hosting:** Vercel (client), Render (server), Neon (database)

## Project structure

```
client/   React + TypeScript frontend
server/   Express + TypeScript API, Prisma schema and migrations
```

## Running locally

### Prerequisites
- Node.js 18+
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech) project)

### 1. Server

```bash
cd server
npm install
cp .env.example .env   # then fill in DATABASE_URL with your own Postgres connection string
npx prisma migrate dev
npm run dev
```

The API runs on `http://localhost:4000` by default. `GET /api/health` should return `{"status":"ok"}`.

### 2. Client

```bash
cd client
npm install
cp .env.example .env   # defaults to http://localhost:4000, adjust if needed
npm run dev
```

The app runs on `http://localhost:5173`.

## API overview

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/quizzes` | List all quizzes |
| `POST` | `/api/quizzes` | Create a quiz with its questions |
| `GET` | `/api/quizzes/:id` | Get a quiz's questions (answers excluded) |
| `POST` | `/api/quizzes/:id/attempts` | Submit answers, graded server-side |
| `GET` | `/api/attempts/:id` | Fetch a saved attempt's score |
| `GET` | `/api/health` | Health check |

## Decisions & trade-offs

- **Free-text answers, not multiple choice.** The brief describes each question as having "a text field and a correct answer," which reads as a typed answer rather than a set of options. Answers are graded server side with a normalized (trimmed, lowercased) string comparison, so minor casing/whitespace differences don't unfairly mark a correct answer wrong.
- **Grading is server-side only.** The correct answer for a question is never sent to the client while a quiz is being taken (enforced by an explicit Prisma `select`, not just by convention), only used internally when scoring a submitted attempt.
- **Custom design system, no reference mockup was provided.** The brief calls out UI attention specifically, so the interface was designed from scratch with its own consistent visual language (typography, spacing, color, loading skeletons, micro interactions) rather than a default/unstyled look.
- **React Query + resource based custom hooks** (`useQuizzes`, `useAttempts`) wrap all data fetching, mirroring how the backend's own routes are grouped by resource. This keeps each query's cache key defined in exactly one place, avoiding a class of bugs where a typo between a query and its cache invalidation silently breaks the UI from refreshing.
- **Component organization follows colocation**: page specific components live next to the page that uses them; only genuinely shared, page agnostic pieces (`Navbar`, `Field`, `Skeleton`, `Breadcrumb`, `ErrorMessage`) live in a top level `components/` folder.
- **CORS** is restricted via an environment variable (`CORS_ORIGIN`) to the deployed frontend's origin in production, defaulting to the local dev server only if unset.
- **Centralized error handling, no repeated `try/catch`.** Express 5 automatically forwards a thrown error (or rejected promise) from any `async` route handler to a single global error handling middleware in `app.ts`, which logs the real error and returns a clean, consistent `{ error: "..." }` response. Expected failures (bad input, missing resource) are still handled explicitly per route with specific status codes (`400`, `404`); this global handler is only a safety net for anything unexpected, so error handling stays consistent everywhere without boilerplate `try/catch` in every route.

## What's incomplete

Nothing, all four core requirements (create, list, take, and persist quizzes/results) are implemented and verified working end to end on the live deployment.
