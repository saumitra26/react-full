import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
import { BookProvider } from "../context/BookContext";
import { WriterProvider } from "../context/WriterContext";
import ProtectedRoute from "./ProtectedRoute";
const HomePage = lazy(() => import("../pages/HomePage"));
const BookPage = lazy(() => import("../pages/BookPage"));
const AddBook = lazy(() => import("../pages/AddBook"));
const EditBook = lazy(() => import("../pages/EditBook"));
const BookDetails = lazy(() => import("../pages/BookDetails"));

const WriterPage = lazy(() => import("../pages/WriterPage"));
const WriterDetails = lazy(() => import("../pages/WriterDetails"));
const AddWriter = lazy(() => import("../pages/AddWriter"));
const EditWriter = lazy(()=>import("../pages/EditWriter"))


const AppRouter = () => {
  return (
    <BookProvider>
      <WriterProvider>
        <Suspense fallback={ <div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addBook"
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              }
            />
              <Route
              path="/editBook/:id"
              element={
                <ProtectedRoute>
                  <EditBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/writer"
              element={
                <ProtectedRoute>
                  <WriterPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/writer/:id"
              element={
                <ProtectedRoute>
                  <WriterDetails />
                </ProtectedRoute>
              }
            />
               <Route
              path="/addWriter/"
              element={
                <ProtectedRoute>
                  <AddWriter />
                </ProtectedRoute>
              }
            />
             <Route
              path="/editWriter/:id"
              element={
                <ProtectedRoute>
                  <EditWriter />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          </Routes>
          </Suspense>
      </WriterProvider>
    </BookProvider>
  );
};

export default AppRouter;
