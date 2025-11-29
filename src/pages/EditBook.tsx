import React, { useEffect, useState } from "react";
import { useBook } from "../context/BookContext";
import { useNavigate, useParams } from "react-router-dom";
import type { Book, BookRequest } from "../dataModel/book";
import BookForm from "../components/books/BookForm";
import { useWriter } from "../context/WriterContext";
const EditBook = () => {
  const { updateBook, bookById } = useBook();
  const { writers } = useWriter();
  const navigate= useNavigate()
  const { id } = useParams();
  const bookId = Number(id);
    const [book, setBook] = useState<Book | null>(null);
    const type:string="edit"

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

  const handleEditSubmit = async (data: BookRequest) => {
    try {
      console.log("dataOf edit",data)
      await updateBook(bookId, data);
      navigate(`/book/${bookId}`)
    } catch (error) { 
      console.error(error)
    }
  // <-- THIS is the implementation
  };

  return (
    <BookForm
      defaultValues={book ?? {}}
      bookSubmit={handleEditSubmit}
          authors={writers}
          type={type}
    />
  );
};
export default EditBook;
