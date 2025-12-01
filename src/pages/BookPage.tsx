import { useEffect, useState } from "react";
import BookList from "../components/books/BookList";
import { useBook } from "../context/BookContext";
import type { Book } from "../dataModel/book";
import bookApi from "../api/bookApi";

const BookPage = () => {
  const { books } = useBook();
  const [search, setSearch] = useState("");
  const [filterBook, setFilterBook] = useState<Book[]>(books);
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearch(value);
  };
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (search.trim() === "") {
        setFilterBook(books); // load all books
      } else {
        const result = await bookApi.getBooks({ search });

        setFilterBook(result.data);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);
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
