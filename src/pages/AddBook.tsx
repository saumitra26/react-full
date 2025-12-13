import BookForm from "../components/books/BookForm";
import type { BookRequest } from "../dataModel/book";
import { useWriter } from "../context/WriterContext";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation } from "../services/bookAPI";
import { useGetWritersQuery } from "../services/writerAPI";

const AddBook = () => {
  const { data: writers = [], isLoading, error } = useGetWritersQuery({});

  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

  const handleAddSubmit = async (data: BookRequest) => {
    console.log("data", data);

    try {
      await addBook(data).unwrap();
      navigate("/book");
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
