import { Route, Routes } from "react-router-dom";
import GlobalSnackBar from "./components/GlobalSnackBar";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import BoardPage from "./pages/BoardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";

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
          <Route path="/boards/:slug/task" element={<TaskPage />} />
          <Route path="/boards/:slug/task/:taskId" element={<TaskPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <GlobalSnackBar />
    </>
  );
}

export default App;
