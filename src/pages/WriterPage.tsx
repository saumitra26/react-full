import React, { useEffect, useState } from "react";
import WriterList from "../components/writer/WriterList";
import type { Writer } from "../dataModel/writer";
import { useGetWritersQuery } from "../services/writerAPI";

const WriterPage = () => {
  const { data: writers = [], isLoading, error } = useGetWritersQuery({})
  const [search, setSearch] = useState("");
  const [filteredWriters, setFilteredWriters] = useState<Writer[]>(writers);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) {
        // if search is empty → show all writers
        setFilteredWriters(writers);
        return;
      }
      const result = filteredWriters.filter((writer) =>
        writer.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredWriters(result);
    }, 600);
    return () => clearTimeout(timeout);
  });
  useEffect(() => {
    setFilteredWriters(writers); // Reset when context changes
  }, [writers]);
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto py-8 ">
          <h1 className="text-6xl font-bold text-gray-600 pt-8 text-center">
            Author List
          </h1>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full max-w-sm mx-auto block border p-2 mt-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="h-px bg-gray-300 my-4"></div>
        </div>
      </section>
      <WriterList writers={filteredWriters} paginate={false} />
    </>
  );
};

export default WriterPage;
