import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>

      </Route>


    </Routes>
  );
}

export default App;
