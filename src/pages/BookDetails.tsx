import React, { useEffect, useState } from "react";
import { useBook } from "../context/BookContext";
import { Link, useParams } from "react-router-dom";
import type { Book } from "../dataModel/book";
import { useNavigate } from "react-router-dom";
const BookDetails = () => {
  const { bookById, deleteBook, loading } = useBook();
  const { id } = useParams();
  const bookId = Number(id);
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBookById() {
      try {
        const bookDetails = await bookById(bookId);
        setBook(bookDetails);
      } catch (error) {
        console.error("Failed to load book:", error);
      }
    }
    if (!isNaN(bookId)) {
      fetchBookById();
    }
  }, [bookById, bookId]);
  const removeBook = async () => {
    try {
      await deleteBook(bookId);
      navigate("/book");
    } catch (error) {
      console.error(error);
    }
  };
  if (!book) {
    return <div className="text-center mt-10">No Result Found</div>;
  }
  return (
    <section>
      <div className="max-w-7xl mx-auto p-4">
        <div className=" grid grid-cols-1 md:grid-cols-[70%_30%] gap-4">
          <main className="flex flex-col p-4">
            <div className="bg-white rounded-md shadow mb-3 text-center">
              <h2 className="text-2xl font-bold px-3 py-2">{book?.name}</h2>
              <p className="text-xl px-3 py-2">{book?.writer_name}</p>
              <p className="text-xl px-3 py-2">{book?.type}</p>
              <p className="text-xl px-3 py-2">{book?.price}</p>

              <p className="text-xl  px-3 py-2">
                {new Date(book?.published_date).toLocaleDateString()}
              </p>
            </div>
          </main>
          <aside className="flex flex-col p-4">
            <div className="bg-white rounded-md shadow mb-3">
              <h2 className="text-xl font-bold px-3 py-2 text-center">
                Description of Books
              </h2>
              <p className="text-xl px-3 py-2 text-center pb-6">
                {book?.description}
              </p>
            </div>
            <div className="bg-white rounded-md shadow mb-3 flex justify-around p-4">
              <Link  to={`/editBook/${bookId}`}className="bg-blue-400 text-white rounded-md px-2 py-1 hover:bg-blue-300 hover:cursor-pointer">
                Edit Books
              </Link>
              <button
                onClick={removeBook}
                className="bg-red-400 text-white rounded-md px-2 py-1 hover:bg-red-300 hover:cursor-pointer"
              >
                Delete Book
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
