# ⚡ TaskFlow

A full-stack web app with JWT authentication and task management dashboard.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38BDF8?logo=tailwindcss&style=flat-square)

---

## Features

- JWT Register / Login / Logout
- Task CRUD — Create, Edit, Delete, Filter & Search
- User Profile management
- Protected routes & fully responsive UI

---

## Tech Stack

| Frontend | Backend |
|----------|---------|
| React + Vite | Node.js + Express |
| TailwindCSS | MongoDB + Mongoose |
| React Router | JWT + bcryptjs |
| Axios | Helmet + Rate Limit |

---

## Getting Started

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/taskflow-webapp.git
cd taskflow-webapp
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. MongoDB
```bash
mongod
```

Open **http://localhost:5173** ✅

---

## Environment Variables

**`backend/.env`**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/webapp
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Sign in |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/tasks` | ✅ | Get all tasks |
| POST | `/api/tasks` | ✅ | Create task |
| PUT | `/api/tasks/:id` | ✅ | Update task |
| DELETE | `/api/tasks/:id` | ✅ | Delete task |
| PUT | `/api/users/profile` | ✅ | Update profile |

---

## Project Structure

```
webapp/
├── backend/src/
│   ├── config/        # DB connection
│   ├── controllers/   # Route logic
<<<<<<< HEAD
│   ├── middleware/   # Auth, validation, errors
│   ├── models/       # User, Task schemas
│   ├── routes/       # API routes
│   └── utils/        # Token, response helpers
└── frontend/src/
    ├── components/   # Reusable UI + layout
    ├── context/      # Auth state (AuthContext)
    ├── hooks/        # useTasks
    ├── pages/        # Login, Register, Dashboard, Profile
    ├── services/     # Axios API calls
    └── utils/        # Form validators
=======
│   ├── middleware/    # Auth, validation, errors
│   ├── models/        # User, Task schemas
│   ├── routes/        # API routes
│   └── utils/         # Token, response helpers
└── frontend/src/
    ├── components/    # Reusable UI + layout
    ├── context/       # Auth state (AuthContext)
    ├── hooks/         # useTasks
    ├── pages/         # Login, Register, Dashboard, Profile
    ├── services/      # Axios API calls
    └── utils/         # Form validators
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
```

---

## Scripts

```bash
# Backend
npm run dev     # with nodemon
npm start       # production

# Frontend
npm run dev     # Vite dev server
<<<<<<< HEAD
npm run build  # production build
=======
npm run build   # production build
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
```

---

## License

<<<<<<< HEAD
MIT © 2026 [Your Name](https://github.com/vkcodez)
=======
MIT © 2026 vkcodez
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
