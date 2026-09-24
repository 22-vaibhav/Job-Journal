# JobJournal

> A daily career journaling app that helps professionals track their work, measure growth, and stay accountable — one entry at a time.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Scheduled Jobs](#scheduled-jobs)
- [Pages & Routes](#pages--routes)
- [Contributing](#contributing)

---

## Overview

JobJournal is a full-stack web application designed for working professionals who want to keep a structured daily log of their work life. Each day, a user fills in what they worked on — projects, tasks completed, meetings attended, challenges faced, solutions found, learnings, and achievements — and either saves it as a draft or submits it as complete.

Over time, the journal builds up a searchable history of your career progress. The **Insights** page surfaces statistics like your current journaling streak, total entries, completion rate, and unique projects worked on. A **Calendar** view gives a visual overview of which days have been completed, drafted, or missed. Scheduled **email reminders** nudge you to fill in your journal if you haven't done so by your preferred time.

---

## Features

### 📓 Daily Journaling
- Structured daily entry with dedicated sections: **Projects**, **Tasks Completed**, **Meetings**, **Challenges**, **Solutions**, **Learnings**, **Achievements**, and **Notes**
- Entries have three statuses: `draft`, `completed`, and `blank`
- Save a draft mid-way and come back to it; submit when done
- Auto-creates a draft for today when you open the journal page

### 📅 Calendar View
- Month-by-month calendar showing the status of every journal entry
- Color-coded days: completed, draft, blank/missed
- Navigate across months; click a day to open or create that day's entry

### 🔍 Search
- Full-text search across all journal entries
- Filter by date range, status, and keywords
- Quickly find any past entry

### 📊 Insights & Analytics
- **Current streak** — how many consecutive weekdays you've journaled
- **Longest streak** — your personal best
- **Total journals**, **Completed**, **Drafts**
- **Projects worked on** — count of unique projects across all entries
- **Completion rate** — percentage of entries that are fully submitted
- **This month / This year** counts

### 👤 Profile & Settings
- View and edit your profile: name, current company, current role, years of experience, career goal
- Change password securely
- Notification preferences per user:
  - **Daily reminder** — choose the time you want to be reminded each day
  - **Weekly report** — choose the day and time
  - **Monthly report** — choose the day of the month and time
- Appearance settings (light / dark / system theme)

### 📧 Email Notifications
- **Welcome email** on registration
- **Daily reminder emails** — sent to users who haven't completed today's journal by their chosen reminder time; skips users who have already submitted
- Weekly and monthly report infrastructure (cron jobs scaffolded)

### 🔐 Authentication
- JWT-based authentication with 7-day token expiry
- Passwords hashed with bcrypt (cost factor 10)
- Protected routes on both the frontend and backend
- Session persisted in `localStorage`; auto-verified on app load

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework |
| [Vite](https://vite.dev) | 8 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| [React Router DOM](https://reactrouter.com) | 7 | Client-side routing |
| [Axios](https://axios-http.com) | 1.x | HTTP client |
| [Day.js](https://day.js.org) | 1.x | Date manipulation |
| [Lucide React](https://lucide.dev) | 1.x | Icon library |
| [React Toastify](https://fkhadra.github.io/react-toastify) | 11 | Toast notifications |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org) | 18+ | JavaScript runtime |
| [Express](https://expressjs.com) | 5 | Web framework |
| [MongoDB](https://www.mongodb.com) | — | Database |
| [Mongoose](https://mongoosejs.com) | 9 | ODM / schema modelling |
| [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) | 9 | Authentication tokens |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | 6 | Password hashing |
| [Nodemailer](https://nodemailer.com) | 9 | Email delivery (Gmail) |
| [node-cron](https://github.com/node-cron/node-cron) | 4 | Scheduled jobs |
| [Day.js](https://day.js.org) | 1.x | Date utilities |
| [dotenv](https://github.com/motdotla/dotenv) | 17 | Environment variable loading |

---

## Project Structure

```
JobJournal/
├── client/                     # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # LoginForm, RegisterForm
│   │   │   ├── calendar/       # Calendar, CalendarGrid, CalendarDay, etc.
│   │   │   ├── common/         # HelpToolTip, UserMenu
│   │   │   ├── guide/          # QuickGuideModal, QuickGuideButton
│   │   │   ├── insights/       # StatsGrid, StatCard, CompletionCard
│   │   │   ├── journal/        # JournalForm, JournalSection, JournalHeader, etc.
│   │   │   ├── journey/        # Journey calendar & welcome banner
│   │   │   ├── layout/         # MainLayout, Navbar
│   │   │   ├── profile/        # ProfileHeader, UserInfoCard
│   │   │   ├── search/         # SearchBar, FilterBar, SearchResults
│   │   │   ├── settings/       # ProfileSettings, AccountSettings, NotificationSettings, etc.
│   │   │   └── ui/             # Button, Card, Input, PageContainer
│   │   ├── constants/          # routes.js, settingsTabs.js, quickGuideContent.js
│   │   ├── context/            # AuthContext, CalendarContext
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── auth/           # LoginPage, RegisterPage
│   │   │   ├── insights/       # InsightsPage
│   │   │   ├── journal/        # JournalPage
│   │   │   ├── journey/        # JourneyPage
│   │   │   ├── profile/        # ProfilePage
│   │   │   ├── search/         # SearchPage
│   │   │   └── settings/       # SettingsPage
│   │   ├── routes/             # AppRoutes, ProtectedRoute
│   │   ├── services/           # api.js, authService, journalService, etc.
│   │   └── utils/              # auth.js (token helpers), timeUtils.js
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Node.js + Express backend
    ├── config/
    │   └── db.js               # Mongoose connection
    ├── controllers/            # authController, journalController, userController, etc.
    ├── cron/                   # dailyReminderCron (weeklyReportCron, monthlyReportCron scaffolded)
    ├── docs/
    │   └── API.md              # API documentation
    ├── emails/                 # HTML email templates (welcome, daily reminder, reports)
    ├── mappers/
    │   └── journalMapper.js    # Maps Mongoose document → API response DTO
    ├── middleware/
    │   └── authMiddleware.js   # JWT verification (protect)
    ├── models/
    │   ├── User.js             # User schema
    │   └── JournalEntry.js     # Journal entry schema
    ├── routes/                 # authRoutes, journalRoutes, userRoutes, settingsRoutes, emailRoutes
    ├── services/               # journalService, reminderService, emailService, settingsService
    ├── utils/                  # dateUtils
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── server.js               # Express app entry point
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — local instance (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A **Gmail account** with an [App Password](https://myaccount.google.com/apppasswords) (for email features)

### Environment Variables

Both `client/` and `server/` ship with a `.env.example` file. Copy each to `.env` and fill in your values.

**Server** (`server/.env`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jobjournal
JWT_SECRET=replace_with_a_long_random_secret
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

> Generate a strong JWT secret:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

**Client** (`client/.env`):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the App

Open two terminals:

```bash
# Terminal 1 — start the backend (with hot reload)
cd server
npm run dev
```

```bash
# Terminal 2 — start the frontend
cd client
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## API Reference

All protected routes require an `Authorization: Bearer <token>` header.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | No | Register a new user |
| `POST` | `/login` | No | Login and receive JWT |
| `GET` | `/profile` | ✅ | Get current user from token |

### Journal — `/api/journal`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/today` | ✅ | Get (or auto-create) today's journal |
| `GET` | `/calendar?year=&month=` | ✅ | Get entry statuses for a month |
| `GET` | `/search` | ✅ | Search journal entries |
| `GET` | `/stats` | ✅ | Get aggregated statistics |
| `POST` | `/open` | ✅ | Open or create a journal for a given date |
| `POST` | `/` | ✅ | Create a new journal entry |
| `GET` | `/:journalId` | ✅ | Get a specific journal entry |
| `PUT` | `/:id` | ✅ | Save draft (partial update) |
| `PUT` | `/:id/submit` | ✅ | Submit journal (marks as completed) |

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/profile` | ✅ | Get user profile |
| `PUT` | `/profile` | ✅ | Update user profile |

### Settings — `/api/settings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/profile` | ✅ | Get profile settings |
| `PUT` | `/profile` | ✅ | Update profile settings |
| `GET` | `/notifications` | ✅ | Get notification preferences |
| `PUT` | `/notifications` | ✅ | Update notification preferences |
| `PUT` | `/change-password` | ✅ | Change password |

### Email — `/api/email`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/test` | No | Send a test email (dev only) |

---

## Data Models

### User

| Field | Type | Description |
|---|---|---|
| `name` | String | Full name |
| `email` | String | Unique, lowercase |
| `password` | String | bcrypt hash |
| `currentCompany` | String | Current employer |
| `currentRole` | String | Current job title |
| `experience` | Number | Years of experience |
| `careerGoal` | String | Career aspiration |
| `emailVerified` | Boolean | Email verification flag |
| `googleId` | String | Google OAuth ID (future) |
| `profileImage` | String | Profile image URL |
| `notifications` | Object | Per-user notification settings |
| `appearance.theme` | Enum | `light` / `dark` / `system` |

### JournalEntry

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId | Reference to `User` |
| `date` | Date | The journal date (unique per user) |
| `projects` | String[] | Projects worked on |
| `tasksCompleted` | String[] | Tasks finished |
| `meetings` | String[] | Meetings attended |
| `challenges` | String[] | Problems encountered |
| `solutions` | String[] | Solutions found |
| `learnings` | String[] | Things learned |
| `achievements` | String[] | Wins and milestones |
| `notes` | String | Free-form notes |
| `aiSummary` | String | AI-generated summary (future) |
| `status` | Enum | `draft` / `completed` / `blank` |
| `submittedAt` | Date | Timestamp of submission |

> A compound unique index on `(user, date)` enforces one entry per user per day at the database level.

---

## Scheduled Jobs

Cron jobs run server-side using `node-cron`. The cron scheduler runs within the same Express process.

| Job | Schedule | Description |
|---|---|---|
| **Daily Reminder** | Every minute (`* * * * *` evaluated against user preference) | Finds all users whose `notifications.dailyReminder.time` matches the current `HH:mm`, and who haven't submitted today's journal, then sends them a reminder email |
| **Weekly Report** | _(scaffolded)_ | Planned: send a weekly summary to users who opted in |
| **Monthly Report** | _(scaffolded)_ | Planned: send a monthly activity report |

---

## Pages & Routes

| Route | Page | Auth Required | Description |
|---|---|---|---|
| `/login` | Login | No | Sign in |
| `/register` | Register | No | Create account |
| `/journey` | Journey | ✅ | Calendar overview of all entries |
| `/journal` | Journal | ✅ | Today's journal entry (draft/submit) |
| `/search` | Search | ✅ | Search and filter past entries |
| `/insights` | Insights | ✅ | Statistics and streaks |
| `/profile` | Profile | ✅ | View user profile |
| `/settings` | Settings | ✅ | Edit profile, notifications, password, theme |
| `*` | — | — | Fallback redirect to `/login` |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a pull request

Please ensure you never commit `.env` files containing real secrets. Use the provided `.env.example` files as a reference.
