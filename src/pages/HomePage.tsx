import HomeStart from "../components/common/HomeStart";
import HomePageCard from "../components/common/HomePageCard";
import BookList from "../components/books/BookList";
import WriterList from "../components/writer/WriterList";
import Footer from "../components/common/Footer";
import { useGetBooksQuery } from "../services/bookAPI";
import { useGetWritersQuery } from "../services/writerAPI";

const HomePage = () => {

  const { data: book = [], isLoading, error } = useGetBooksQuery({});
  const { data: writer = [] } = useGetWritersQuery({});
  return (
    <>
      <HomeStart />
      <HomePageCard />
      <BookList books={ book} paginate={ true} />
      <WriterList writers={writer} paginate={ true} />
      <Footer />
    </>
  );
};

export default HomePage;
