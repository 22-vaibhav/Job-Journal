# JobJournal — Improvement Backlog

This document tracks all identified improvements for the JobJournal project, organised by priority. Each item includes the problem, the affected file(s), and a concrete recommendation.

---

## Table of Contents

- [🔴 High Priority — Bugs, Security & Correctness](#-high-priority--bugs-security--correctness)
- [🟡 Medium Priority — Features & UX](#-medium-priority--features--ux)
- [🟢 Low Priority — Polish & Nice-to-Have](#-low-priority--polish--nice-to-have)
- [Summary Table](#summary-table)

---

## 🔴 High Priority — Bugs, Security & Correctness

---

### 1. Internal Error Messages Exposed to Clients

**Problem**
500-level error responses in multiple controllers return `message: error.message` directly. If Mongoose, JWT, or any internal library throws a detailed error (e.g. a connection string, a schema path, an internal stack hint), it is forwarded verbatim to the client — leaking implementation details.

**Affected Files**
- `server/controllers/authController.js` — lines 73–76, 131–134
- `server/controllers/journalController.js` — lines 43–46
- `server/controllers/settingsController.js` — lines 14–16, 31–33, 50–52, 68–71

**Recommendation**
Return a generic message to the client and log the real error server-side only.

```js
// Before
res.status(500).json({ success: false, message: error.message });

// After
console.error("[Controller Error]", error);
res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
```

---

### 2. CORS Accepts Requests from Any Origin

**Problem**
`app.use(cors())` in `server/server.js` without an `origin` option allows cross-origin requests from *any* domain. In production this means any website can make authenticated API calls on behalf of your users.

**Affected File**
- `server/server.js` — line 21

**Recommendation**
Restrict the allowed origin to your frontend URL via an environment variable.

```js
// Before
app.use(cors());

// After
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
```

Also add `FRONTEND_URL` to `server/.env.example` (see item 3 below).

---

### 3. `FRONTEND_URL` Used in Code but Missing from `.env.example`

**Problem**
`server/services/reminderService.js` uses `process.env.FRONTEND_URL` to build the CTA link inside reminder emails. This variable is never documented in `server/.env.example`, so anyone setting up the project from scratch will get `undefined` in their email links with no obvious explanation.

**Affected Files**
- `server/services/reminderService.js` — line 53
- `server/.env.example` — missing entry

**Recommendation**
Add the variable to `server/.env.example`:

```env
# URL of the frontend app — used in email CTA links
FRONTEND_URL=http://localhost:5173
```

---

### 4. Notification Time/Day Pickers Are Missing from the UI

**Problem**
The `User` model stores `time` and `day` for each notification type (daily reminder, weekly report, monthly report). The `reminderService` matches users by their stored `time` value to decide who to email. However, `NotificationSettings.jsx` only renders an on/off toggle — there are no inputs for the user to change their preferred time or day. The description text even hardcodes "8:30 PM" instead of reading the stored value.

This means per-user notification scheduling is stored in the database but is completely unreachable from the UI.

**Affected Files**
- `client/src/components/settings/NotificationSettings.jsx`
- `server/models/User.js` — `notifications` sub-schema

**Recommendation**
Add a time `<input type="time">` for the daily reminder and weekly report, and a day-of-week `<select>` for the weekly report, and a day-of-month `<select>` for the monthly report. Wire them to the existing `updateNotifications` API.

---

### 5. Password Strength Not Validated on the Backend

**Problem**
The register endpoint accepts any non-empty string as a password. There is no minimum length or complexity check server-side. A client sending `password: "a"` will successfully create an account with a bcrypt hash of a single-character password.

**Affected File**
- `server/controllers/authController.js` — `registerUser` function

**Recommendation**
Add a length check before hashing:

```js
if (password.length < 8) {
    return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
    });
}
```

---

### 6. `DELETE` Account Route Is Missing

**Problem**
`client/src/components/settings/DangerZone.jsx` exists as a settings panel (implying account deletion functionality), but there is no `DELETE /api/users` route in `server/routes/userRoutes.js`. The UI advertises a feature the backend does not support.

**Affected Files**
- `server/routes/userRoutes.js`
- `server/controllers/userController.js`

**Recommendation**
Implement a `DELETE /api/users/account` endpoint that:
1. Verifies the user's password before proceeding (prevent accidental or hijacked deletion)
2. Deletes all `JournalEntry` documents belonging to the user
3. Deletes the `User` document
4. Returns `200` with a success message

```js
router.delete("/account", protect, deleteAccount);
```

---

## 🟡 Medium Priority — Features & UX

---

### 7. Weekly & Monthly Report Cron Jobs Are Not Implemented

**Problem**
`server/cron/weeklyReportCron.js` and `server/cron/monthlyReportCron.js` are completely empty files. The `User` model already has `weeklyReport` and `monthlyReport` notification settings, the email templates exist in `server/emails/`, and the Settings UI lets users toggle these notifications — but the cron jobs that would actually send the emails do not exist.

**Affected Files**
- `server/cron/weeklyReportCron.js` — empty
- `server/cron/monthlyReportCron.js` — empty
- `server/emails/weeklyReportEmail.js`
- `server/emails/monthlyReportEmail.js`

**Recommendation**
Implement both cron jobs following the same pattern as `dailyReminderCron.js`. The weekly report should query journals from the past 7 days, aggregate totals (tasks, learnings, achievements, streak), and email users whose `weeklyReport.enabled` is `true` and whose `weeklyReport.day` and `weeklyReport.time` match the current time. Until these are implemented, the UI toggles for weekly and monthly reports should either be hidden or clearly labelled as "coming soon".

---

### 8. AI Summary Field Exists but Is Never Populated

**Problem**
`server/models/JournalEntry.js` has an `aiSummary` field and `server/mappers/journalMapper.js` returns it in every response — but nothing in the codebase ever writes a value to it. The field name and the app's original name ("ResumeLog AI", visible in `server/server.js`) strongly suggest AI summarisation was always the core differentiating feature.

**Affected Files**
- `server/models/JournalEntry.js` — `aiSummary` field
- `server/controllers/journalController.js` — `submitToday`
- `server/services/journalService.js` — `submitJournal`

**Recommendation**
On journal submission, call an LLM API (OpenAI GPT-4o-mini, IBM watsonx, or similar) with the entry's structured data and store the result in `aiSummary`. Example prompt:

```
Summarise this work journal entry in 3 concise bullet points suitable for a resume or performance review:
Projects: ...
Tasks Completed: ...
Achievements: ...
Learnings: ...
```

Display the summary on the completed journal view and on the search result cards. This is the feature that would most differentiate JobJournal from a plain notes app.

---

### 9. Re-open Submitted Journals

**Problem**
Once a journal's status is `completed`, the entire form is read-only and there is no way to edit it. Users cannot correct typos, add forgotten entries, or update their notes after submission.

**Affected Files**
- `client/src/components/journal/JournalForm.jsx` — `isCompleted` gate
- `server/routes/journalRoutes.js`
- `server/services/journalService.js`

**Recommendation**
Add a `PUT /api/journal/:id/reopen` endpoint that sets `status` back to `draft` and clears `submittedAt`. Add a "Re-open" button to the completed journal view on the frontend. Consider adding a soft warning ("Re-opening this entry will mark it as a draft again") before proceeding.

---

### 10. Search Has No Pagination

**Problem**
`searchJournals` in `server/services/journalService.js` returns every matching document in a single query with no `limit`. A user who has journalled for a year or more could have hundreds of entries returned in one response.

**Affected Files**
- `server/services/journalService.js` — `searchJournals` function
- `server/controllers/journalController.js` — `searchJournalEntries`
- `client/src/pages/search/SearchPage.jsx`

**Recommendation**
Add `page` and `limit` query parameters (default: `page=1`, `limit=20`) and return a `totalCount` alongside the results so the frontend can render a "Load more" button or numbered pagination.

```js
const page = Number(query.page) || 1;
const limit = Number(query.limit) || 20;
const skip = (page - 1) * limit;

const [journals, totalCount] = await Promise.all([
    JournalEntry.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
    JournalEntry.countDocuments(filter),
]);
```

---

### 11. Search Uses a Regex Scan — No Text Index

**Problem**
Keyword search in `searchJournals` uses `new RegExp(keyword, "i")` against unindexed string array fields across the entire user's journal collection. This is a full collection scan on every search request.

**Affected File**
- `server/models/JournalEntry.js`

**Recommendation**
Add a MongoDB text index to the journal schema:

```js
journalEntrySchema.index({
    projects:       "text",
    tasksCompleted: "text",
    meetings:       "text",
    challenges:     "text",
    solutions:      "text",
    learnings:      "text",
    achievements:   "text",
    notes:          "text",
});
```

Then replace the `$or` regex filter with `{ $text: { $search: keyword } }`. This is significantly faster and also enables relevance-based scoring.

---

### 12. Streak Calculation Should Explicitly Skip Weekends

**Problem**
`server/services/journalService.js` includes an `isWeekend` helper function (line 333), but it must be verified that the streak calculation logic (lines 338–426) correctly skips Saturdays and Sundays. If a user journals every weekday but not on weekends, their streak should not break over the weekend — this is the most common correctness bug in journaling streak implementations.

**Affected File**
- `server/services/journalService.js` — `calculateCurrentStreak`, `calculateLongestStreak`

**Recommendation**
Review the streak logic to confirm weekend days are explicitly excluded from the "consecutive day" requirement. Add a comment at the top of both functions documenting the intended weekend behaviour so future maintainers don't accidentally break it.

---

### 13. Insights Page Has No Charts

**Problem**
The Insights page (`client/src/pages/insights/InsightsPage.jsx`) only renders stat cards. The statistics endpoint already returns rich data (per-month counts, streak history, task totals) that is well-suited to visualisation.

**Affected Files**
- `client/src/pages/insights/InsightsPage.jsx`
- `client/src/components/insights/StatsGrid.jsx`

**Recommendation**
Add at least two charts using a library like [Recharts](https://recharts.org) or [Chart.js](https://www.chartjs.org/):

1. **Bar chart** — "Entries per month" over the last 6 or 12 months
2. **Line chart** — Cumulative journal count over time (shows growth visually)

The backend statistics endpoint may need to be extended to return monthly breakdown data. These charts would make the Insights page the most compelling part of the app.

---

## 🟢 Low Priority — Polish & Nice-to-Have

---

### 14. Two Toast Notification Libraries Installed

**Problem**
`client/package.json` lists both `react-hot-toast` and `react-toastify` as dependencies. `NotificationSettings.jsx` uses `react-hot-toast`; `InsightsPage.jsx` uses `react-toastify`. Having both adds unnecessary bundle weight (~40 KB combined) and makes the toast style inconsistent across pages.

**Affected Files**
- `client/package.json`
- All components importing either toast library

**Recommendation**
Pick one library (either is fine — `react-toastify` is more featureful; `react-hot-toast` is lighter) and replace all usages of the other. Then remove the unused package with `npm uninstall`.

---

### 15. No Loading Skeleton on the Journal Form

**Problem**
When the Journal page loads it makes an API call to `GET /api/journal/today`. During this time the page shows a blank area before the form appears. On a slow connection this flash is jarring.

**Affected File**
- `client/src/pages/journal/JournalPage.jsx`

**Recommendation**
Add a skeleton loader — a few grey rounded placeholder bars matching the rough layout of the journal form — that renders while `loading === true`. This is a 20-line CSS-only addition that meaningfully improves perceived performance.

---

### 16. No Empty State on the Journey Calendar

**Problem**
A brand new user who opens the Journey page sees an empty calendar grid with no explanation or call to action. There is no guidance telling them what to do next.

**Affected Files**
- `client/src/pages/journey/JourneyPage.jsx`
- `client/src/components/journey/Calendar.jsx`

**Recommendation**
Detect when the calendar has zero entries for the displayed month and render a friendly empty state with a message like "No entries yet this month" and a button linking to `/journal`. This significantly improves the new-user onboarding experience.

---

### 17. `googleId` Field in Schema with No OAuth Implementation

**Problem**
`server/models/User.js` has a `googleId` field, but there is no Google OAuth route, no Passport.js integration, and no "Sign in with Google" button on the frontend. The field is dead weight until OAuth is actually implemented.

**Affected File**
- `server/models/User.js`

**Recommendation**
Either implement Google OAuth (Passport.js `passport-google-oauth20` strategy is the standard approach for Express + MongoDB), or remove the `googleId` field from the schema until it is needed. Keeping unused schema fields creates confusion about what is actually supported.

---

### 18. No Tests

**Problem**
`server/package.json` has `"test": "echo \"Error: no test specified\" && exit 1"`. The journal service (`server/services/journalService.js`) contains complex streak calculation logic (~90 lines) that is entirely untested. A subtle off-by-one error in streak logic (e.g. timezone handling, weekend exclusion) would silently produce wrong values for all users.

**Affected Files**
- `server/package.json`
- `server/services/journalService.js` — `calculateCurrentStreak`, `calculateLongestStreak`

**Recommendation**
Start with unit tests for the two streak functions and the `searchJournals` filter-building logic using [Jest](https://jestjs.io). These are pure functions (or close to it) that are straightforward to test without a running database. Even 10–15 tests would catch the most likely regressions.

```bash
cd server
npm install --save-dev jest
```

---

## Summary Table

| # | Improvement | Priority | Effort | Impact |
|---|---|---|---|---|
| 1 | Fix internal error messages exposed to clients | 🔴 High | Low | High |
| 2 | Restrict CORS to known origin | 🔴 High | Low | High |
| 3 | Add `FRONTEND_URL` to `.env.example` | 🔴 High | Trivial | Medium |
| 4 | Add time/day pickers to Notification Settings UI | 🔴 High | Medium | High |
| 5 | Validate password length on the backend | 🔴 High | Trivial | Medium |
| 6 | Implement DELETE account endpoint | 🔴 High | Low | Medium |
| 7 | Implement weekly & monthly report cron jobs | 🟡 Medium | Medium | High |
| 8 | Populate `aiSummary` field via LLM on submit | 🟡 Medium | Medium | Very High |
| 9 | Allow re-opening submitted journals | 🟡 Medium | Low | Medium |
| 10 | Add pagination to search results | 🟡 Medium | Low | Medium |
| 11 | Replace regex search with MongoDB text index | 🟡 Medium | Low | Medium |
| 12 | Verify weekend exclusion in streak logic | 🟡 Medium | Low | High |
| 13 | Add charts to the Insights page | 🟡 Medium | Medium | High |
| 14 | Remove duplicate toast library | 🟢 Low | Trivial | Low |
| 15 | Add loading skeleton to Journal form | 🟢 Low | Low | Medium |
| 16 | Add empty state to Journey calendar | 🟢 Low | Low | Medium |
| 17 | Remove or implement `googleId` / Google OAuth | 🟢 Low | Low–High | Low–High |
| 18 | Add unit tests for streak & search logic | 🟢 Low | Medium | High |
