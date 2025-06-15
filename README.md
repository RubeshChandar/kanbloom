# 🌿 Kanbloom v1.2.3

**Kanbloom** is a modern, fullstack Kanban board app inspired by Trello, built with **React + Redux Toolkit** on the frontend and **Django + Django REST Framework** on the backend. Now at version **1.2.3**, Kanbloom delivers a stable, production-ready foundation for collaborative task management, with scalable architecture and responsive UI.

---

## 🚀 Features

### ✅ Completed Features

- ✅ JWT authentication
- ✅ Create boards, lists, and cards
- ✅ Drag and drop cards across lists
- ✅ Assign cards to users
- ✅ Upload user profile pictures (Material UI Avatar)
- ✅ Separate views for recent and all boards
- ✅ Simple task status flow: `To Do → In Process → Blocked → Done`
- ✅ Full-featured REST API with modular Django apps (board, task, etc.), with all API URLs defined in `backend/api/urls.py`.
- ✅ Default filtering via custom model managers (`objects.all()` returns only active items, e.g. Board with `is_active=True`).
- ✅ Pretty URLs using slugs for boards and tasks.
- ✅ Dockerized for easy local and production use, with persistent volumes for Postgres, static, and media files.

### 📦 Version 1.2.3 Highlights

- Reworked serializer logic to support both UUID and nested object input for user fields.
- Added dual-field strategy (`assigned_to_id` and `assigned_to`) to cleanly separate input/output handling.
- Improved error handling and validation in task update flows.

### 🛠️ Planned / Upcoming Features

- Drag-and-drop UI polish
- Board member invitations
- Board/task activity logs
- Notifications
- Search and filtering capabilities
- Real-time synchronization

---

## 🧰 Tech Stack

### Frontend
- React 18
- Redux Toolkit
- Vite
- TypeScript
- TailwindCSS
- React Hook Form + Zod
- Material UI
- React DnD
- Axios

### Backend
- Django 5 with modular apps and custom model managers
- Django REST Framework
- SimpleJWT (Auth)
- PostgreSQL
- Centralized API URLs in `backend/api/urls.py`

---

## 🗂️ Project Structure

```
Kanbloom/
├── backend/
│ ├── api/ # Centralized API views and URL routing
│ ├── board/ # Board app: models, serializers, business logic
│ ├── task/ # Task app: models, serializers, business logic
│ ├── media/ # Uploaded media files (user profile pictures, attachments)
│ ├── static/ # Collected static files for production
│ ├── db.sqlite3 # (if using SQLite for dev; otherwise, use Postgres via Docker)
│ ├── manage.py
│ └── ... # Other Django core files
├── db_data/ # Persistent Postgres data volume (Docker)
├── docker/ # Docker and Docker Compose configs
├── frontend/
│ ├── components/ # Reusable React components (cards, boards, forms, etc.)
│ ├── pages/ # Top-level pages/routes (e.g., BoardPage, LoginPage)
│ ├── types/ # TypeScript types and Zod schemas
│ ├── App.tsx
│ ├── main.tsx
│ ├── tailwind.config.js
│ ├── index.html
│ └── ... # Other React/Vite config and asset files
├── .env # Environment variables for both backend and frontend
├── docker-compose.yml
└── README.md
```

> API URLs are centralized in `backend/api/urls.py`. Model managers control default filtering to return only active items by default.

---

## 📦 Installation (Dev)

### 🔧 Using Docker Compose (Recommended)

If you have Docker and Docker Compose installed, you can start the entire app with:

```bash
compose_bake=1 docker compose up --build
```

Then access:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000/api/

---

```sh
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📌 License

This project is licensed under the [MIT License](./LICENSE) © 2025 Rubeshchandar Rajkumar.