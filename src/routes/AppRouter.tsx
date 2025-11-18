import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/common/Navbar";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { BookProvider } from "../context/BookContext";
import { WriterProvider } from "../context/WriterContext";

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Wrap the ENTIRE routing system */}
      <BookProvider>
        <WriterProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </WriterProvider>
      </BookProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
