# Technical PRD

# Job Portal Management System

---

# 1. Technology Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB
* Mongoose ODM

---

## Authentication

* JSON Web Token (JWT)
* bcrypt.js (Password Hashing)

---

## File Upload

* Multer

Used For:

* Resume Upload (PDF/DOC/DOCX)

---

# 2. Project Architecture

Client (React.js)

↓

REST API (Express.js)

↓

Business Logic (Node.js)

↓

MongoDB Database

---

# 3. User Roles

## Job Seeker

Permissions

* Register
* Login
* Update Profile
* Upload Resume
* View Jobs
* Search Jobs
* Apply Jobs
* View Applied Jobs
* Logout

---

## Recruiter

Permissions

* Register
* Login
* Company Profile
* Post Job
* View Applicants
* Logout

---

## Admin

Permissions

* Login
* Manage Users
* Manage Jobs
* Manage Applications
* Logout

---

# 4. Authentication Flow

Registration

↓

Password Hashing (bcrypt)

↓

Store User in MongoDB

↓

Login

↓

Verify Password

↓

Generate JWT Token

↓

Send Token to Client

↓

Protected Routes

↓

Logout

---

# 5. JWT Protected Routes

Job Seeker

* Profile
* Resume Upload
* Apply Job
* Applied Jobs

Recruiter

* Company Profile
* Post Job
* View Applicants

Admin

* Manage Users
* Manage Jobs
* Manage Applications

---

# 6. Database Collections

## Users

Fields

* Name
* Email
* Password
* Role
* Created At

---

## Job Seeker Profile

Fields

* User ID
* Name
* Education
* Skills
* Resume URL

---

## Recruiter Profile

Fields

* User ID
* Company Name
* Company Details

---

## Jobs

Fields

* Job Title
* Category
* Location
* Description
* Recruiter ID
* Created At

---

## Applications

Fields

* Job ID
* Job Seeker ID
* Applied Date

---

# 7. REST API Modules

## Authentication

* Register
* Login
* Logout

---

## Job Seeker

* Get Profile
* Update Profile
* Upload Resume
* View Jobs
* Search Jobs
* Apply Job
* Applied Jobs

---

## Recruiter

* Company Profile
* Post Job
* View Applicants

---

## Admin

* Manage Users
* Manage Jobs
* Manage Applications

---

# 8. Folder Structure

```
job-portal/

├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 9. Backend Middleware

* JWT Authentication Middleware
* Role Authorization Middleware
* Error Handling Middleware
* File Upload Middleware (Multer)

---

# 10. Security

* Password Hashing using bcrypt
* JWT Authentication
* Protected API Routes
* Role-Based Authorization
* Input Validation
* Environment Variables (.env)

---

# 11. Frontend Features

* Responsive Layout
* Protected Routes
* Role-Based Navigation
* Axios API Integration
* Form Validation
* Loading States
* Error Messages

---

# 12. Backend Features

* RESTful API
* MongoDB CRUD Operations
* JWT Authentication
* Resume File Upload
* Role-Based Access Control
* Centralized Error Handling

---

# 13. API Communication

Frontend

↓

Axios Request

↓

Express API

↓

Controller

↓

MongoDB

↓

Response

↓

React UI Update

---

# 14. Environment Variables

```
PORT=

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=
```

---

# 15. Deployment

Frontend

* Vercel

Backend

* Render

Database

* MongoDB Atlas

---

# 16. Performance

* Optimized React Components
* Lazy Loaded Routes
* Efficient MongoDB Queries
* Reusable Components
* Modular Backend Structure

---

# 17. Browser Support

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

# 18. Technical Summary

Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Axios
* React Router DOM

Backend

* Node.js
* Express.js

Database

* MongoDB
* Mongoose

Authentication

* JWT
* bcrypt.js

File Upload

* Multer

Deployment

* Vercel
* Render
* MongoDB Atlas
