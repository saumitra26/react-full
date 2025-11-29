import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import Navbar from "./components/common/Navbar.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
);
