import React from "react";
import { useBook } from "../context/BookContext";
import { useWriter } from "../context/WriterContext";
import HomeStart from "../components/common/HomeStart";
import HomePageCard from "../components/common/HomePageCard";
import BookList from "../components/books/BookList";
import WriterList from "../components/writer/WriterList";
import Footer from "../components/common/Footer";

const HomePage = () => {
  // const { books } = useBook()
  // console.log("ddd",books)
  const { writers } = useWriter();
  const { books } = useBook();

  console.log("writers", writers);
  return (
    <>
      <HomeStart />
      <HomePageCard />
      <BookList />
      <WriterList />
      <Footer/>
    </>
  );
};

export default HomePage;
