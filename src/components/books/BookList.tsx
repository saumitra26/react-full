import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useBook } from "../../context/BookContext";
import BookCard from "./BookCard";
import useWindowWidth from "../../hooks/useWindowWidth";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
const BookList = () => {
  const { books } = useBook();
 const [page, setPage] = useState(0);
  const width = useWindowWidth();
  let cardsToShow = 2;
  if (width >= 640) cardsToShow = 3; // sm:
  if (width >= 768) cardsToShow = 4; // md:
  if (width >= 1024) cardsToShow = 5; // lg:
  if (width >= 1280) cardsToShow = 5;
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(books.length / cardsToShow)),
    [books.length, cardsToShow]
  );
  const visibleWriters = useMemo(() => {
    const startIndex = page * cardsToShow;
    return books.slice(startIndex, startIndex + cardsToShow);
  }, [page, books, cardsToShow]);
  useEffect(() => {
    if (page >= totalPages) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [cardsToShow, totalPages]);
  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);
  return (
    <section>
      <div className="max-w-7xl mx-auto pb-6">
        <h1 className="px-5  text-gray-600 text-2xl font-bold">Writer List</h1>
        <div className="h-px bg-black mt-3"></div>
      </div>
      <div className="max-w-7xl mx-auto p-4 relative w-full">
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className=" absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400 rounded-full px-2 py-2  disabled:hidden "
        >
          <GrLinkNext/> 
        </button>

        <button
          onClick={handlePrevPage}
          disabled={page === 0}
          className=" absolute left-0 top-1/2  -translate-y-1/2 z-10 bg-gray-400 rounded-full px-2 py-2 disabled:hidden"
        >
         <GrLinkPrevious/>
        </button>

        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {visibleWriters.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
