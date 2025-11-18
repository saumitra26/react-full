import type { Writer, writerRequest } from "../dataModel/writer";
import axiosClient from "./axiosClient";

type WritersResponse = {
  message: string;
  data: Writer[];
};
type updateResponse = {
  message: string;
  data: Writer;
};
export interface DeleteResponse {
  message: string;
  deletedId: number;
}

export const writerApi = {
  getWriters: () =>
    axiosClient
      .get<WritersResponse>("/writers")
      .then((response) => response.data),
  getWriterById: (id: number) =>
    axiosClient.get<Writer>(`/writers/${id}`).then((response) => response.data),
  addWriter: (payload: writerRequest) =>
    axiosClient
      .post<Writer>("/writers", payload)
      .then((response) => response.data),
  updateWriter: (id: number, payload: Writer) =>
    axiosClient
      .put<updateResponse>(`/writer/${id}`, payload)
      .then((response) => response.data),
  deleteWriter: (id: number) =>
    axiosClient
      .delete<DeleteResponse>(`/writer/${id}`)
      .then((response) => response.data),
};
