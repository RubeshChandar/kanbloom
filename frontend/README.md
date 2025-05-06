# 🚀 Kanbloom – React + TypeScript + Vite

Kanbloom is a responsive and themeable kanban board app built with:

- ⚛️ **React** (with Hooks and Components)
- 🧠 **TypeScript** for static typing
- ⚡ **Vite** for fast builds and HMR
- 🎨 **Material UI** for beautiful UI components
- 🧵 **TailwindCSS** for utility-first styling
- 🧪 **React Hook Form + Zod** for robust form handling and validation
- 🧩 **Modular architecture**: clean separation between form logic and UI components

---

## 📦 Features

- Custom reusable components with full React Hook Form integration
- Centralized theme file (`MaterialTheme.ts`) with dark mode + custom palette
- Simulated network delay for testing async UX flows
- Styled Material UI components (`StyledInput`, `LoadingButton`)
- Controlled inputs with validation-aware feedback
- Tailwind for layout + Material UI for structure = best of both

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

---

## 🧪 Dev Setup

```bash
npm install
npm run dev
```

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

---

## 🛠 TODO

- Add Drag and Drop for Kanban cards
- Auth integration
- Responsive mobile design polish

---

Built with ❤️ by Rubesh