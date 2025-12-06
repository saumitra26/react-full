import { useCallback, useEffect, useState } from "react";
import BookList from "../components/books/BookList";
import { useBook } from "../context/BookContext";
import type { Book } from "../dataModel/book";
import bookApi from "../api/bookApi";
import { useDebounce } from "../hooks/useDebounce";

const BookPage = () => {
  const { books } = useBook();

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [filterBook, setFilterBook] = useState<Book[]>(books);
  const [loading, setLoading] = useState(false);
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  },[]);
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      
      try {
        if (!debounceSearch.trim) {
          setFilterBook(books);
        } else {
          const result = await bookApi.getBooks({ search: debounceSearch });
          setFilterBook(result.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [debounceSearch, books]);
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="text-6xl font-bold text-gray-600 pt-8 text-center">
            All Books List
          </h1>
          <input
            type="text"
            placeholder="Search books..."
            className="w-full max-w-md mx-auto block border p-2 mt-4"
            value={search}
            onChange={handleSearch}
          />
          <div className="h-px bg-gray-300 my-4"></div>
        </div>
      </section>
      <BookList books={filterBook} paginate={false} />
    </>
  );
};

export default BookPage;
