import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/auth/login";
import Register from "./components/auth/register.jsx";
import Add_spot from "./components/dashboard/add_spot";
import Edit_spot from "./components/dashboard/edit_spot";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/add-spot" element={<Add_spot />} />
        <Route path="dashboard/edit-spot/:id" element={<Edit_spot />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
