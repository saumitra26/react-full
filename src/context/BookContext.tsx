import { createContext, useState, useContext, useEffect } from "react";
import type { Book, BookRequest } from "../dataModel/book";
import bookApi from "../api/bookApi";
import { useAuth } from "./AuthContext";
type BookContextType = {
  books: Book[];
  loading: boolean;
  error: string | null;
  bookById: (id: number) => Promise<Book | null>;
  addNewBook: (payload: BookRequest) => Promise<void>;
  updateBook: (id: number, payload: BookRequest) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  fetchAllBook: (params?: Record<string, any>) => Promise<void>;
};
const BookContext = createContext<BookContextType | null>(null);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    console.log("helooo");
    if (user) {
      fetchAllBook();
      console.log("helooo");
    }
  }, [user]);

  const fetchAllBook = async (params?: Record<string, any>) => {
    try {
      setLoading(true);
      const result = await bookApi.getBooks(params);
      setBooks(result.data);
     
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const bookById = async (id: number): Promise<Book | null> => {
    try {
      const book = await bookApi.getBookById(id);
      return book;
    } catch (error: any) {
      setError(error.message);

      return null;
    }
  };
  const addNewBook = async (payload: BookRequest) => {
    try {
      setLoading(true);
      const newBook = await bookApi.addBook(payload);
      setBooks((prev) => [...prev, newBook]);
    } catch (error: any) {
      console.error("Error adding new book:", error.message || error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateBook = async (id: number, payload: BookRequest) => {
    try {
      setLoading(true);
      const result = await bookApi.updateBook(id, payload);
      const updatedBook = result.data;
      setBooks((prev) => prev.map((b) => (b.id == id ? updatedBook : b)));
    } catch (error) {
      console.log("Error to add new book" + error);
    } finally {
      setLoading(false);
    }
  };
  const deleteBook = async (id: number) => {
    try {
      setLoading(true);
      const result = await bookApi.deleteBook(id);
      const deletedId = result.id;
      setBooks((prev) => prev.filter((book) => book.id !== deletedId));
    } catch (error: any) {
      console.log("Error to add new book" + error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        bookById,
        deleteBook,
        updateBook,
        addNewBook,
        fetchAllBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used inside <BookProvider>");
  return ctx;
};
