import React from "react";
import type { Book } from "../../dataModel/book";
import { Link } from "react-router-dom";

const BookCard = ({ book }: { book: Book }) => {
  return (
   <div className="bg-white shadow-md flex flex-col overflow-hidden px-5 py-4 relative rounded-2xl flex-shrink-0 w-[300px]">
      <div className="pb-12">
        <h1
          className="font-bold text-xl 
         py-2"
        >
          {book.name}
        </h1>
        <h1 className="font-bold  px-2 py-1">Author: {book.writer_id}</h1>
        <p className="px-2 py-1 ">Type: {book.type}</p>
        <p className="px-2 py-1 ">Description: {book.description}</p>
        <p className="px-2  ">Price: {book.price}</p>
      </div>
      <Link
        className="absolute bottom-2 right-2 bg-custom-lime block rounded py-1.5 px-2 text-center font-bold text-black hover:bg-green-600 transform duration-300"
        to={`/books/${book.id}`}
      >
        Details
      </Link>
    </div>
  );
};

export default BookCard;
