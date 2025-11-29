import React from "react";
import BookForm from "../components/books/BookForm";
import type { BookRequest } from "../dataModel/book";
import { useWriter } from "../context/WriterContext";
import { useBook } from "../context/BookContext";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const { writers } = useWriter();
  const { addNewBook } = useBook();
   const navigate= useNavigate()

  const handleAddSubmit = async (data: BookRequest) => {
    console.log("data", data);

    try {
      await addNewBook(data);
     // navigate("/book")

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <BookForm
      defaultValues={{}}
      authors={writers}
      bookSubmit={handleAddSubmit}
    />
  );
};

export default AddBook;
