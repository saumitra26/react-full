import { Link } from "react-router-dom";
import HomeCard from "./HomeCard";

const HomePageCard = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto p-4">
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10  ">
          {/* Books Card */}
          <HomeCard>
            <h1 className="font-bold text-4xl p-4">Books</h1>
            <p className="text-2xl pb-4">You will find all types of books</p>
            <Link
              to="/"
              className="bg-green-800 inline-block text-white py-2 px-1.5 rounded-md w-full mb-5 text-center  hover:bg-blue-300"
            >
              All Writers
            </Link>
          </HomeCard>

          {/* Writers Card */}
                  <HomeCard bg="bg-gray-200">
            <h1 className="font-bold text-4xl p-4">Writers</h1>
            <p className="text-2xl pb-4">All the writer information</p>
            <Link
              to="/"
              className="bg-green-800 inline-block text-white py-2 px-1.5 text-center rounded-md w-full mb-5 hover:bg-blue-300"
            >
              All Writers
            </Link>
          </HomeCard>
        </div>
      </div>
    </section>
  );
};

export default HomePageCard;
