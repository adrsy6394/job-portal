# Job Portal Management System

A premium recruitment web application that connects Job Seekers, Recruiters, and Admins on a single unified platform.

---

## 🚀 Running the Project (Local Development)

### 1. Backend Server Setup
Navigate to the `server` folder, configure environment settings, install dependencies, and run the dev script:
```bash
cd server
npm install
```
Make sure to check/adjust the `.env` settings inside the `server/.env` file:
* `PORT=5000`
* `MONGODB_URI=mongodb://localhost:27017/job-portal` (or your MongoDB Atlas connection string)
* `JWT_SECRET=your_jwt_secret_key`
* `CLIENT_URL=http://localhost:5173`

Start the server:
```bash
npm run dev
```
*(The server will boot on `http://localhost:5000` and confirm connection to MongoDB)*

### 2. Frontend Client Setup
Open a second terminal window, navigate to the `client` folder, install dependencies, and run the Vite server:
```bash
cd client
npm install
npm run dev
```
*(The client will boot on `http://localhost:5173/` and compile styles natively using `@tailwindcss/vite`)*

---

## 👑 Accessing the Admin Portal

The UI provides registration toggles for **Job Seeker** and **Recruiter** roles. To prevent public registrations from gaining administration access, creating an **Admin** account is managed via a backend CLI promotion tool.

Follow these steps to create and log in as an Admin:

### Step 1: Register a regular account in the UI
1. Open `http://localhost:5173/register` in your browser.
2. Register a new user (e.g., Name: `Admin User`, Email: `admin@portal.com`, Password: `password123`).

### Step 2: Promote the user to Admin via CLI
In your backend terminal, navigate to the `server` directory and run the `create-admin.js` promotion utility, passing the registered email as an argument:
```bash
cd server
node create-admin.js admin@portal.com
```
On success, you will see the output:
`[SUCCESS] User "Admin User" (admin@portal.com) is now configured as an Admin.`

### Step 3: Log in to the Admin Portal
1. Navigate to the login page: `http://localhost:5173/login`.
2. Enter the admin credentials (`admin@portal.com` / `password123`).
3. Upon login, a dynamic **"Admin Panel"** link will appear in your top navigation header.
4. Click **"Admin Panel"** (or go to `http://localhost:5173/admin`) to open the control dashboard.

---

## 🛠️ Admin Control Dashboard Capabilities
Once inside `http://localhost:5173/admin`, the administrator can manage the system across three panels:
* **Users Management**: View all Job Seeker and Recruiter accounts, with the ability to delete profiles (automatically triggers cascading deletions of their respective postings and applications).
* **Jobs Board Control**: Review all active job listings posted across the platform, with capabilities to delete listings.
* **Applications Tracker**: Inspect all candidate applications, tracking who applied to which role, with deletion triggers.

---

## 📂 Project Architecture

```
job-portal/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Header, Hero, BrandLogos, RecruitSection, CategorySection, etc.
│   │   ├── context/        # AuthContext.jsx session provider
│   │   ├── layouts/        # Responsive MainLayout.jsx structure
│   │   ├── pages/          # Home, Login, Register, JobSearch, JobDetails, Dashboards
│   │   └── services/       # jobService, recruiterService, adminService, authService (Axios adapters)
│
├── server/                 # Express Backend
│   ├── config/             # Mongoose db.js connection config
│   ├── controllers/        # authController, jobController, recruiterController, adminController
│   ├── middleware/         # authMiddleware (JWT & roles), uploadMiddleware (Multer pdf check)
│   ├── models/             # User, Job, Application, JobSeekerProfile, RecruiterProfile
│   └── routes/             # authRoutes, jobRoutes, recruiterRoutes, adminRoutes
```
