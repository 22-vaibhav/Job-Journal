# ResumeLog AI API Documentation

Base URL

http://localhost:5000

---

## Authentication

### Register

POST /api/auth/register

Description

Register a new user.

Request Body

{
    "name":"",
    "email":"",
    "password":""
}

Response

201 Created

---

### Login

POST /api/auth/login

Description

Authenticate user and return JWT.

Request Body

{
    "email":"",
    "password":""
}

Response

200 OK

Returns JWT Token.

---

### Profile

GET /api/auth/profile

Authentication

Bearer Token Required

Response

200 OK

Returns logged in user.

---

## Journal

### Calendar

GET /api/journal/calendar

Authentication

Bearer Token Required

Query Params

year

month

Returns

Journal statuses for the selected month.

---

### Today's Journal

GET /api/journal/today

Authentication

Bearer Token Required

Behavior

Creates today's draft automatically if it doesn't exist.

---

### Save Draft

PUT /api/journal/:id

Authentication

Bearer Token Required

Description

Updates editable journal fields.

---

### Submit Journal

PUT /api/journal/:id/submit

Authentication

Bearer Token Required

Description

Marks journal as completed.