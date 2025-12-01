import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ApiResponse, Writer, writerRequest } from "../dataModel/writer";
import { writerApi } from "../api/writerApi";
import { useAuth } from "./AuthContext";

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
  const { user } = useAuth();
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);

  const fetchWriters = useCallback(async () => {
    try {
      setLoading(true);
      setErrors(null);
      const result = await writerApi.getWriters();
      setWriters(result.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch writers";
      setErrors(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchWriters();
    }
  }, [user, fetchWriters]);

  const writerById = async (id: number): Promise<Writer | null> => {
    try {
      const response = await writerApi.getWriterById(id);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch writer";
      setErrors(message);
      return null;
    }
  };

  const addedWriter = async (payload: writerRequest) => {
    try {
      setLoading(true);
      setErrors(null);
      const result = await writerApi.addWriter(payload);
      setWriters((prev) => [...prev, result.data]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add writer";
      setErrors(message);
    } finally {
      setLoading(false);
    }
  };

  const updateWriter = async (id: number, payload: Writer) => {
    try {
      setLoading(true);
      setErrors(null);
      const result = await writerApi.updateWriter(id, payload);
      const updatedWriter = result.data;
      setWriters((prev) => prev.map((w) => (w.id === id ? updatedWriter : w)));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update writer";
      setErrors(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWriter = async (id: number) => {
    try {
      setLoading(true);
      setErrors(null);
      const result = await writerApi.deleteWriter(id);
      const deletedId = result.deletedId;
      setWriters((prev) => prev.filter((w) => w.id !== deletedId));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete writer";
      setErrors(message);
    } finally {
      setLoading(false);
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