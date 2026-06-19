# React User Management System

A full-stack User Management System with separate User and Admin modules, built with React, Redux Toolkit, Node.js, Express.js, MongoDB, and JWT Authentication.

## Tech Stack

**Frontend:** React, Redux Toolkit, React Router DOM, Axios, Tailwind CSS

**Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt, Multer

## Features

**User Module**
- Register and Login with JWT Authentication
- View and update profile information
- Profile image upload
- Auto logout on token expiry

**Admin Module**
- Separate Admin login and session
- View all users with search and pagination
- Create, Edit and Delete users
- Deleted user is automatically logged out

## Setup

**Backend**
```bash
cd backend
npm install
node server.js
```

**Frontend**
```bash
cd frontend-v5
npm install
npm run dev
```

**Environment Variables** — create `.env` in backend folder:


PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@ums.com

ADMIN_PASSWORD=admin123

## Access

| Role | URL |
|------|-----|
| User | http://localhost:5173/login |
| Admin | http://localhost:5173/admin/login |

## Author

**Akhila PC** — [GitHub](https://github.com/akhilapc0)

