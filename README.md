# Learning Pavilion

Learning Pavilion is a mobile-first gamified learning platform for kids built with the Next.js App Router. The MVP includes public marketing pages, auth scaffolding, student quiz and typing flows, reward and leaderboard surfaces, a parent-ready structure, and a multi-module admin panel.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Custom JWT auth with secure HTTP-only cookies
- Redis-ready leaderboard/session cache layer

## Included architecture

- Route groups for public, auth, student, parent, and admin experiences
- Prisma schema covering users, profiles, quiz, typing, games, wallet ledger, streaks, badges, leaderboards, rewards, subscriptions, coupons, settings, audit logs, and media
- Seed script for roles, master data, badges, plans, settings, rewards, quiz sets, typing lessons, and demo users
- Service-layer business logic for auth, wallet ledger updates, streak progression, badge rule evaluation, leaderboards, quiz attempts, typing attempts, rewards, storage validation, and payment abstraction
- API route handlers for auth, dashboard, quiz, typing, rewards, notifications, leaderboards, and admin stats
- Reusable design system and App Router pages for the MVP
- Unit and integration-oriented tests for core rules

## Setup

1. Install Node.js 20+ and npm.
2. Copy `.env.example` to `.env.local` and fill the secrets.
3. Install dependencies with `npm install`.
4. Generate Prisma client with `npm run prisma:generate`.
5. Create the database migration with `npm run prisma:migrate`.
6. Seed data with `npm run seed`.
7. Start the app with `npm run dev`.

## Demo accounts

- Student: `student@learningpavilion.app` / `Student@123`
- Parent: `parent@learningpavilion.app` / `Parent@123`
- Admin: `admin@learningpavilion.app` / `Admin@123`

## Notes

- Redis integration is prepared but optional for local development.
- Payment handling is abstracted so Stripe or Razorpay can be plugged in without changing page-level flows.
- The migration SQL file is a placeholder because this workspace did not have Node/Prisma tooling available during scaffolding. Generate the real migration after dependency installation.
- Parent analytics, puzzle gameplay, advanced reports, coupon UX, and AI tutor are scaffolded for later phases while the MVP path focuses on auth, dashboard, quiz, typing, rewards, leaderboard, and admin workflows.
