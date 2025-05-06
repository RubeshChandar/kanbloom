# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

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