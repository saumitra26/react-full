
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteWriterMutation, useGetWriterByIdQuery } from "../services/writerAPI";

const WriterDetails = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const writerId = Number(id);

  const { data: writer } = useGetWriterByIdQuery(writerId);
  const[deleteWriter]=useDeleteWriterMutation()
  console.log("the data",writer)
 
  const removeWriter = async () => {
    await deleteWriter(writerId).unwrap();
    navigate("/writer");
  };
  if (!writer) {
    return <div className="text-center mt-10">No Result found</div>;
  }
  return (
    <section>
      <div className="max-w-7xl mx-auto m-4 p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 p-4">
          <main className="bg-white round-md p-4 rounded-md">
            <h2 className=" text-3xl font-bold text-center py-1.5">
              {writer.name}
            </h2>
            <p className="text-center py-1.5">{writer?.email}</p>
            <p className="text-center py-1.5">{writer?.id}</p>
          </main>
          <aside className=" flex flex-col  gap-2 ">
            <div className="bg-white round-md p-4 rounded-md">
              <p className="">
                The details of every writer is not dynamic, all the writers who
                belongs in this application have same type of descriptions. All
                the writer have at least single number of books.
              </p>
            </div>
            <div className="bg-white rounded-md shadow mb-3 flex  justify-around p-4 gap-1">
              <Link
                to={`/editWriter/${writerId}`}
                className="bg-blue-400 text-white text-center rounded-md px-2 py-1 hover:bg-blue-300 hover:cursor-pointer"
              >
                Edit Writer
              </Link>
              <button
                onClick={removeWriter}
                className="bg-red-400 text-white rounded-md px-2 py-1 hover:bg-red-300 hover:cursor-pointer"
              >
                Delete Writer
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default WriterDetails;
