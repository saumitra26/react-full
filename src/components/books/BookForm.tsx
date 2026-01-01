import { useForm } from "react-hook-form";
import type { Book, BookRequest } from "../../dataModel/book";
import type { Writer } from "../../dataModel/writer";
import { memo, useEffect } from "react";
interface BookFormProps {
  defaultValues?: Partial<Book>;
  authors: Writer[];
  bookSubmit: (data: BookRequest) => void;
  type?: string;
}

const BookForm = ({
  defaultValues,
  authors,
  bookSubmit,
  type,
}: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Book>({ defaultValues });
  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);

    // Get local year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months 0-11
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const writerName = watch("writer_name");
  useEffect(() => {
    const selectedWriter = authors.find((a) => a.name === writerName);

    if (selectedWriter?.id) {
      setValue("writer_id", selectedWriter.id);
    }
  }, [writerName, authors, setValue]);
  useEffect(() => {
    if (!defaultValues) return;

    const selected = authors.find((a) => a.name === defaultValues.writer_name);

    reset({
      ...defaultValues,
      writer_id: selected?.id,
      published_date: defaultValues.published_date
        ? formatDateForInput(defaultValues.published_date)
        : "",
    });
  }, [defaultValues, authors, reset]);

  return (
    <section>
      <div className="max-w-3xl mx-auto p-4 mt-8">
        <div className="flex  flex-col justify-center items-center">
          <div className="bg-white rounded-md shadow px-5 p-3  w-full">
            <h1 className="text-center pb-5 text-4xl font-bold">
              Add new Book
            </h1>

            <form
              onSubmit={handleSubmit(bookSubmit)}
              className=" flex flex-col gap-1 py-4 px-5"
            >
              <label htmlFor="book-name">Book Name</label>
              <input
                id="book-name"
                className="border rounded-md p-2 mb-3 "
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder=" Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
              <label htmlFor="book-type">Book Type</label>
              <input
                id="book-type"
                className="border rounded-md p-2 mb-3"
                type="text"
                {...register("type", { required: "type is required" })}
                placeholder=" Type"
              />
              <label htmlFor="author-name">Author Name</label>
              <select
                id="author-name"
                {...register("writer_name")}
                className="border rounded-md p-2 mb-3"
              >
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option value={a.name} key={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              <label htmlFor="book-description">Book Description</label>
              <textarea
                id="book-description"
                className="border border-gray-300 rounded-lg w-full h-28 px-3 py-2 mb-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                placeholder="Book details..."
                {...register("description", { required: "type is required" })}
              ></textarea>
              <label htmlFor="published-date">Published date</label>
              <input
                id="published-date"
                {...register("published_date", {
                  required: "date is required",
                })}
                className="border rounded-md p-2 mb-3"
                type="date"
                placeholder=" Published date"
              />
              <label htmlFor="book-price">Book Price</label>
              <input
                id="book-price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                className="border rounded-md p-2 mb-6"
                type="text"
                placeholder=" Price"
              />
              <button
                type="submit"
                className="bg-blue-500 p-2 text-white rounded-md hover: cursor-pointer"
              >
                {type === "edit" ? "Edit Book" : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BookForm);
