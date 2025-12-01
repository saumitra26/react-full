import type { Writer } from "../../dataModel/writer";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
const WriterCard = ({ writer }: { writer: Writer }) => {
  return (
    <div className="bg-white relative rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[180px]">
      
      <div className="space-y-2">
        <h1 className="font-semibold text-lg text-gray-800">
          {writer.name}
        </h1>

        <p className="text-sm text-gray-600 wrap-break-word">
          {writer.email}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          to={`/writer/${writer.id}`}
          className="rounded-full absolute bg-custom-lime bottom-2 right-2 px-2 py-2 text-sm font-medium hover:opacity-90 transition"
        >
         <GrLinkNext/>
        </Link>
      </div>
    </div>
  );
};

export default WriterCard;
