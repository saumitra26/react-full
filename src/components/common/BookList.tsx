import React, { useState } from "react";
import { useBook } from "../../context/BookContext";
import BookCard from "./BookCard";

const BookList = () => {
  const { books } = useBook();
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const startIndex = page * ITEMS_PER_PAGE;
  const TOTAL_PAGES: number = Math.ceil(books.length / ITEMS_PER_PAGE);
  const visibleBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const nextPage = () => {
    console.log("dd", page);
    if (page < TOTAL_PAGES - 1) setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto p-4 relative w-full">
        { visibleBooks &&  <button
          onClick={nextPage}
          disabled={page === TOTAL_PAGES - 1}
          className=" absolute right-0 top-1/2 z-10 bg-custom-lime rounded-full py-1  disabled:hidden "
        >
          Next
        </button>}
        { visibleBooks && <button
          onClick={prevPage}
          disabled={page === 0}
          className=" absolute left-0 top-1/2 z-10 bg-custom-lime rounded-full py-1 disabled:hidden"
        >
          Prev
        </button>}
        
       <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
