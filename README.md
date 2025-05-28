# 🌿 Kanbloom

**Kanbloom** is a modern, fullstack Kanban board app inspired by Trello, built with **React + Redux Toolkit** on the frontend and **Django + Django REST Framework** on the backend. It helps individuals and teams manage tasks, collaborate, and visualize progress using a clean and responsive UI. The project uses Docker with persistent volumes and PostgreSQL for database persistence.

---

## 🚀 Features

- ✅ JWT authentication
- ✅ Create boards, lists, and cards
- ✅ Drag and drop cards across lists
- ✅ Assign cards to users
- ✅ Comment on tasks
- ✅ Upload user profile pictures (Material UI Avatar)
- ✅ “Connection Requests” system using Redis
- ✅ Separate views for recent and all boards
- ✅ Simple task status flow: `To Do → In Process → Blocked → Done`
- ✅ Full-featured REST API with modular Django apps (board, task, etc.), with all API URLs defined in `backend/api/urls.py`.
- ✅ Default filtering via custom model managers (`objects.all()` returns only active items, e.g. Board with `is_active=True`).
- ✅ Pretty URLs using slugs for boards and tasks.
- ✅ Dockerized for easy local and production use, with persistent volumes for Postgres, static, and media files.

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
- Redis (for ephemeral connection requests)
- Centralized API URLs in `backend/api/urls.py`

---

## 🗂️ Project Structure

```
/frontend          # React app
/backend           # Django app
/docker            # Docker/Docker Compose files
/db_data           # Persistent Postgres data volume
/backend/static    # Collected static files
/backend/media     # Uploaded media files
```

> API URLs are centralized in `backend/api/urls.py`. Model managers control default filtering to return only active items by default.

---

## 📦 Installation (Dev)

### 🔧 Using Docker Compose (Recommended)

If you have Docker and Docker Compose installed, you can start the entire app with:

```bash
docker-compose up --build
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
cd ../frontend
npm install
npm run dev
```

---

## 📌 License

This project is licensed under the [MIT License](./LICENSE) © 2025 Rubeshchandar Rajkumar.