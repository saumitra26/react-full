import HomeStart from "../components/common/HomeStart";
import HomePageCard from "../components/common/HomePageCard";
import BookList from "../components/books/BookList";
import WriterList from "../components/writer/WriterList";
import Footer from "../components/common/Footer";
import { useWriter } from "../context/WriterContext";
import { useBook } from "../context/BookContext";

const HomePage = () => {
  const { writers } = useWriter();
  const { books } = useBook();
  return (
    <>
      <HomeStart />
      <HomePageCard />
      <BookList books={ books} paginate={ true} />
      <WriterList writers={writers} paginate={ true} />
      <Footer />
    </>
  );
};

export default HomePage;
