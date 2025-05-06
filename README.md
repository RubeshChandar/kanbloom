# 🌿 Kanbloom

**Kanbloom** is a modern, fullstack Kanban board app inspired by Trello, built with **React + Redux Toolkit** on the frontend and **Django + Django REST Framework** on the backend. It helps individuals and teams manage tasks, collaborate, and visualize progress using a clean and responsive UI.

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

---

## 🧰 Tech Stack

### Frontend
- React 18
- Redux Toolkit
- Material UI
- React DnD
- Axios

### Backend
- Django 5
- Django REST Framework
- SimpleJWT (Auth)
- PostgreSQL
- Redis (for ephemeral connection requests)

---

## 🗂️ Project Structure

```
/frontend      # React app
/backend       # Django app
/docker        # Docker/Docker Compose files
```

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

```bash
# Backend
cd backend
python -m venv env
source env/bin/activate
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