import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GlobalSnackBar from "./components/GlobalSnackBar";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/boards/:slug" element={<BoardPage />} />
        </Route>

      </Routes>

      <GlobalSnackBar />
    </>
  );
}

export default App;
