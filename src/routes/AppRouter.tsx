import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { BookProvider } from "../context/BookContext";
import { WriterProvider } from "../context/WriterContext";
import BookPage from "../pages/BookPage";
import ProtectedRoute from "./ProtectedRoute";
import WriterPage from "../pages/WriterPage";
import BookDetails from "../pages/BookDetails";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import WriterDetails from "../pages/WriterDetails";
import AddWriter from "../pages/AddWriter";
import EditWriter from "../pages/EditWriter";


const AppRouter = () => {
  return (
    <BookProvider>
      <WriterProvider>
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
      </WriterProvider>
    </BookProvider>
  );
};

export default AppRouter;
