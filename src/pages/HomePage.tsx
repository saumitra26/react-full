import HomeStart from "../components/common/HomeStart";
import HomePageCard from "../components/common/HomePageCard";
import BookList from "../components/books/BookList";
import WriterList from "../components/writer/WriterList";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <>
      <HomeStart />
      <HomePageCard />
      <BookList />
      <WriterList />
      <Footer />
    </>
  );
};

export default HomePage;
