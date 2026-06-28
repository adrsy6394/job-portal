# Job Portal Management System - Development TODO List

This document breaks down the development of the Job Portal Management System into manageable phases, modules, and atomic tasks to ensure a one-feature-at-a-time development approach, preventing overwhelming code drops.

## Phase 1: Project Setup & Initialization

### Module 1.1: Environment Setup
**Folder Structure Focus:**
```
job-portal/
├── client/
└── server/
```
**Tasks:**
- [x] Initialize Git repository.
- [x] Setup `server/` directory with `package.json` (Node.js/Express).
- [x] Setup `client/` directory with Vite (React.js) or Create React App.
- [x] Install basic dependencies for both frontend and backend.
- [x] Create basic `.env` files for both `server` and `client`.
- [x] Setup overarching `README.md`.

### Module 1.2: Server Foundation
**Folder Structure Focus:**
```
server/
├── config/
├── utils/
├── app.js
└── server.js
```
**Tasks:**
- [x] Setup basic Express server in `server.js` and `app.js`.
- [x] Implement database connection (MongoDB) in `config/db.js`.
- [x] Add basic error handling middleware.
- [x] Test server connectivity and database connection.

### Module 1.3: Client Foundation
**Folder Structure Focus:**
```
client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
```
**Tasks:**
- [x] Install and configure Tailwind CSS and Framer Motion.
- [x] Setup global styles matching the Design PRD (colors, typography).
- [x] Setup React Router DOM in `App.jsx`.
- [x] Create placeholder pages for Home, Login, and Register.
- [x] Implement a basic responsive layout wrapper.

---

## Phase 2: Authentication System

### Module 2.1: Auth Backend
**Folder Structure Focus:**
```
server/
├── models/User.js
├── controllers/authController.js
├── routes/authRoutes.js
└── middleware/authMiddleware.js
```
**Tasks:**
- [x] Create `User` Mongoose model (Name, Email, Password, Role).
- [x] Implement `register` controller (with bcrypt password hashing).
- [x] Implement `login` controller (with JWT token generation).
- [x] Implement `logout` controller.
- [x] Create JWT authentication middleware to protect routes.
- [x] Setup `/api/auth` routes.
- [x] Test endpoints using Postman/Insomnia.

### Module 2.2: Auth Frontend
**Folder Structure Focus:**
```
client/
├── src/
│   ├── context/AuthContext.jsx
│   ├── services/authService.js
│   ├── pages/Login.jsx
│   ├── pages/Register.jsx
│   └── components/Header.jsx
```
**Tasks:**
- [x] Create `AuthContext` to manage global user state.
- [x] Setup `authService.js` for Axios API calls to `/api/auth`.
- [x] Build the UI for `Register.jsx` (Job Seeker/Recruiter toggle).
- [x] Build the UI for `Login.jsx` (with Admin login support).
- [x] Implement form validation on frontend.
- [x] Integrate API calls and context updates on successful login/register.
- [x] Build `Header.jsx` with dynamic Login/Logout/Upload CV buttons based on auth state.

---

## Phase 3: Core UI & Landing Page (Design Implementation)

### Module 3.1: Home Page Components
**Folder Structure Focus:**
```
client/
├── src/
│   ├── pages/Home.jsx
│   ├── components/HeroSection.jsx
│   ├── components/BrandLogos.jsx
│   ├── components/RecruitSection.jsx
│   ├── components/CategorySection.jsx
│   ├── components/FeaturedJobs.jsx
│   └── components/FeedbackSection.jsx
```
**Tasks:**
- [x] Build `HeroSection.jsx` (large headings, candidate image, stats).
- [x] Build `BrandLogos.jsx` (horizontal monochrome logos).
- [x] Build `RecruitSection.jsx` (Job Posting/Candidate Management info cards).
- [x] Build `CategorySection.jsx` (circular cards for job categories).
- [x] Build `FeaturedJobs.jsx` (two-column layout with category list and job cards).
- [x] Build `FeedbackSection.jsx` (customer feedback cards).
- [x] Ensure all sections use the Design PRD's Dark Green/Bright Lime Green palette.
- [x] Apply subtle Framer Motion animations (Fade In, Hover Scaling).
- [x] Ensure full responsiveness across all components.

---

## Phase 4: Job Seeker Features

### Module 4.1: Job Seeker Profile (Backend)
**Folder Structure Focus:**
```
server/
├── models/JobSeekerProfile.js
├── controllers/jobSeekerController.js
├── routes/jobSeekerRoutes.js
└── uploads/
```
**Tasks:**
- [x] Create `JobSeekerProfile` model.
- [x] Setup Multer middleware for resume uploads (PDF/DOC/DOCX).
- [x] Implement get/update profile controllers.
- [x] Implement resume upload controller.
- [x] Setup `/api/job-seeker` protected routes.

### Module 4.2: Job Seeker Profile (Frontend)
**Folder Structure Focus:**
```
client/
├── src/
│   ├── pages/JobSeekerDashboard.jsx
│   ├── components/ProfileForm.jsx
│   └── services/jobSeekerService.js
```
**Tasks:**
- [x] Build `JobSeekerDashboard.jsx` for viewing/editing profile.
- [x] Implement `ProfileForm.jsx` for details and file upload.
- [x] Integrate Axios calls for saving profile and resume.

### Module 4.3: Job Searching & Applying
**Folder Structure Focus:**
```
server/models/Application.js
server/controllers/jobController.js
client/src/pages/JobSearch.jsx
client/src/pages/JobDetails.jsx
```
**Tasks:**
- [x] Backend: Implement APIs to fetch all jobs and search jobs (by title/location).
- [x] Backend: Create `Application` model and apply-to-job API.
- [x] Frontend: Build `JobSearch.jsx` with search bars and job listing grids.
- [x] Frontend: Build `JobDetails.jsx` to view single job information.
- [x] Frontend: Implement "Apply" button functionality connecting to the application API.
- [x] Frontend: Add a section/page to view "Applied Jobs".

---

## Phase 5: Recruiter Features

### Module 5.1: Recruiter Profile & Job Posting
**Folder Structure Focus:**
```
server/
├── models/RecruiterProfile.js
├── models/Job.js
├── controllers/recruiterController.js
└── routes/recruiterRoutes.js
```
**Tasks:**
- [x] Create `RecruiterProfile` and `Job` models.
- [x] Backend: Implement APIs for creating/updating company profile.
- [x] Backend: Implement APIs for posting a new job.
- [x] Frontend: Build Recruiter Dashboard for managing company profile.
- [x] Frontend: Build Job Posting form with validation.

### Module 5.2: Applicant Management
**Folder Structure Focus:**
```
client/src/pages/RecruiterDashboard.jsx
client/src/components/ApplicantList.jsx
```
**Tasks:**
- [x] Backend: API to fetch jobs posted by the recruiter.
- [x] Backend: API to fetch applicants for a specific job.
- [x] Frontend: Update dashboard to list posted jobs.
- [x] Frontend: Build `ApplicantList.jsx` to view candidates for selected jobs.
- [x] Frontend: Implement resume viewing/downloading for applicants.

---

## Phase 6: Admin Features

### Module 6.1: Admin Dashboard
**Folder Structure Focus:**
```
server/controllers/adminController.js
server/routes/adminRoutes.js
client/src/pages/AdminDashboard.jsx
```
**Tasks:**
- [x] Backend: Ensure Admin role authorization middleware is robust.
- [x] Backend: Implement APIs to fetch all users, all jobs, and all applications.
- [x] Backend: Implement APIs to delete users, jobs, or applications.
- [x] Frontend: Build `AdminDashboard.jsx`.
- [x] Frontend: Build sub-components for Managing Users (list, delete).
- [x] Frontend: Build sub-components for Managing Jobs (list, delete).
- [x] Frontend: Build sub-components for Managing Applications.

---

## Phase 7: Final Polish & Deployment

### Module 7.1: Testing & Refinement
**Tasks:**
- [x] Perform end-to-end testing of user flows (Register -> Profile -> Post Job -> Apply -> View Applicant).
- [x] Verify responsive design on mobile and tablet sizes.
- [x] Check console for errors and ensure all forms have proper validation feedback.
- [x] Verify subtle animations don't interfere with usability.

### Module 7.2: Deployment Setup
**Tasks:**
- [x] Setup production MongoDB database (MongoDB Atlas).
- [x] Prepare backend for Render deployment (environment variables).
- [x] Prepare frontend for Vercel deployment (build scripts, environment variables).
- [ ] Deploy backend and ensure it connects to the database.
- [ ] Deploy frontend and link it to the live backend URL.
- [ ] Perform live smoke testing.



