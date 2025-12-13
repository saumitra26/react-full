import { useCallback, useEffect, useState } from "react";
import BookList from "../components/books/BookList";
import { useDebounce } from "../hooks/useDebounce";
import { useGetBooksQuery } from "../services/bookAPI";

const BookPage = () => {
  
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const { data: books = [], isLoading, error } = useGetBooksQuery({search:debounceSearch});
  console.log("books",books)
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  }, []);

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
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading books.</p>
      ) : (
        <BookList books={books} paginate={false} />
      )}
    </>
  );
};

export default BookPage;
