# 🚀 Kanbloom – Full Stack Setup with React + TypeScript + Vite Frontend and Django REST Backend

Kanbloom is a responsive and themeable kanban board app built with a modern full stack setup:

- ⚛️ **React** (with Hooks and Components), **TypeScript**, and **Vite** for the frontend
- 🐍 **Django REST Framework** for the backend API
- 🎨 **Material UI** for beautiful UI components
- 🧵 **TailwindCSS** for utility-first styling
- 🧪 **React Hook Form + Zod** for robust form handling and validation
- 🧩 **Modular architecture**: clean separation between form logic and UI components

The backend uses Docker with persistent volumes and Postgres as the database for reliable and scalable data storage.

---

## 📦 Features

- Custom reusable components with full React Hook Form integration
- Centralized theme file (`MaterialTheme.ts`) with dark mode + custom palette
- Simulated network delay for testing async UX flows
- Styled Material UI components (`StyledInput`, `LoadingButton`)
- Controlled inputs with validation-aware feedback
- Tailwind for layout + Material UI for structure = best of both
- Full-featured Django REST API (board/task apps, custom managers for is_active filtering, user avatars)

---

## 📁 Project Structure

```
frontend/
├── components/          # Reusable styled components like StyledInput
├── styles/              # Theme and Tailwind config
├── pages/               # Page-level logic like LoginPage
├── types/               # Zod schemas and shared types
└── main.tsx             # Entry point
```

The backend (Django) uses modular apps, but all API URLs are centralized in `api/urls.py` for clear routing.

---

## 🧪 Dev Setup

```bash
npm install
npm run dev
```

For backend development, use Docker to manage services with persistent volumes and Postgres as the database.

Make sure to install these peer dependencies manually if not already:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install tailwindcss react-hook-form zod @hookform/resolvers
```

---

## 🧰 Commands

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server (Vite)  |
| `npm run build`| Build for production     |
| `npm run lint` | Run eslint               |

---

## 💡 Notes

- Inputs are **controlled** to avoid React state warnings.
- Material UI styles are **theme-driven** and consistent across the app.
- Reusable form components encapsulate their own `Controller` logic.
- Backend uses custom managers for default filtering (e.g. `Board.objects` only returns `is_active=True`).

---

## 🛠 TODO

- Add Drag and Drop for Kanban cards
- Auth integration
- Responsive mobile design polish

---

Built with ❤️ by Rubesh