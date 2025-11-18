import { createContext, useContext, useEffect, useState } from "react";
import type { Writer, writerRequest } from "../dataModel/writer";
import { writerApi } from "../api/writerApi";

type WriterContextType = {
  writers: Writer[];
  loading: boolean;
  errors: string | null;
  writerById: (id: number) => Promise<Writer | null>;
  addedWriter: (payload: writerRequest) => Promise<void>;
  updateWriter: (id: number, payload: Writer) => Promise<void>;
  deleteWriter: (id: number) => Promise<void>;
};
const WriterContext = createContext<WriterContextType | null>(null);
export const WriterProvider = ({ children }: { children: React.ReactNode }) => {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);
  console.log("result");
  useEffect(() => {
    fetchWriters();
  }, []);
  const fetchWriters = async () => {
    try {
      setLoading(true);
      const result = await writerApi.getWriters();
       console.log("resultwwww")
      setWriters(result.data);
    } catch (error: any) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };
  const writerById = async (id: number): Promise<Writer | null> => {
    try {
      const writer = await writerApi.getWriterById(id);
      return writer;
    } catch (error: any) {
      setErrors(error.message);
      return null;
    }
  };
  const addedWriter = async (payload: writerRequest) => {
    try {
      setLoading(true);
      const newWriter = await writerApi.addWriter(payload);
      setWriters((prev) => [...prev, newWriter]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const updateWriter = async (id: number, payload: Writer) => {
    try {
      setLoading(true);
      const result = await writerApi.updateWriter(id, payload);
      const updatedWriter = result.data;
      setWriters((prev) => prev.map((w) => (w.id == id ? updatedWriter : w)));
    } catch (error: any) {
      setErrors(error.message);
    } finally {
      setLoading(true);
    }
  };
  const deleteWriter = async (id: number) => {
    try {
      setLoading(true);
      const result = await writerApi.deleteWriter(id);
      const deletedId = result.deletedId;
      setWriters((prev) => prev.filter((w) => w.id !== deletedId));
    } catch (error: any) {
      setErrors(error.message);
    } finally {
      setLoading(true);
    }
  };
  return (
    <WriterContext.Provider
      value={{
        writers,
        loading,
        errors,
        writerById,
        addedWriter,
        updateWriter,
        deleteWriter,
      }}
    >
      {children}
    </WriterContext.Provider>
  );
};
export const useWriter = () => {
  const ctx = useContext(WriterContext);
  if (!ctx) throw new Error("useWriter must be used inside <WriterProvider>");
  return ctx;
};
