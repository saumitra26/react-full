import React, { useEffect, useState } from "react";
import { useWriter } from "../context/WriterContext";
import { useNavigate, useParams } from "react-router-dom";
import type { Writer, writerRequest } from "../dataModel/writer";
import WriterForm from "../components/writer/WriterForm";

const EditWriter = () => {
  const { updateWriter, writerById } = useWriter();
  const { id } = useParams();
  const writerId = Number(id);
  const navigate = useNavigate();
  const [writer, setWriter] = useState<Writer | null>(null);

  useEffect(() => {
    const getWriterById = async () => {
      try {
        const writerDetails = await writerById(writerId);

        if (!writerDetails) {
          console.warn("No writer found for ID:", writerId);
          return;
        }

        console.log("writerId", writerDetails);

        setWriter(writerDetails);
      } catch (error) {
        console.error("Failed to load writer:", error);
      }
    };

    if (!isNaN(writerId)) {
      getWriterById();
    }
  }, [writerId, writerById]);

  const updateWriterInfo = async (data: writerRequest) => {
      try {
        console.log('testEitWriter',writerId,data)
      await updateWriter(writerId, data);
      navigate(`/writer/${writerId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WriterForm onSubmit={updateWriterInfo} defaultValues={writer ?? {}} type="Edit" />
  );
};

export default EditWriter;