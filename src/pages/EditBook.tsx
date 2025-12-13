import { useNavigate, useParams } from "react-router-dom";
import type { BookRequest } from "../dataModel/book";
import BookForm from "../components/books/BookForm";
import { useWriter } from "../context/WriterContext";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../services/bookAPI";
import { useGetWritersQuery } from "../services/writerAPI";
const EditBook = () => {
  const { data: writers = [], isLoading, error } = useGetWritersQuery({})
  const navigate = useNavigate();
  const { id } = useParams();
  const bookId = Number(id);
  const { data: book } = useGetBookByIdQuery(bookId);
  const [updateBook] = useUpdateBookMutation();
  const type: string = "edit";
  const handleEditSubmit = async (data: BookRequest) => {
    try {
      await updateBook({ id: bookId, payload: data }).unwrap();
      navigate(`/book/${bookId}`);
    } catch (error) {
      console.error(error);
    }
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
