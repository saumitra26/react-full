import axiosClient from "./axiosClient";

import type { Book, BookRequest } from "../dataModel/book";
export interface BookApiResponse {
  message: string;
  page: number;
  limit: number;
  count: number;
  data: Book[];
}
export interface DeleteResponse {
  message: string;
  success: boolean;
  id: number;
}
export interface UpdateResponse {
  message: string;
  success: boolean;
  data: Book;
}

const bookApi = {
  getBooks: () =>
    axiosClient
      .get<BookApiResponse>("/books")
      .then((response) => response.data),
  getBookById: (id: number) =>
    axiosClient.get<Book>(`/books/${id}`).then((response) => response.data),
  addBook: (payload: BookRequest) =>
    axiosClient.post<Book>("/books", payload).then((response) => response.data),
  updateBook: (id: number, payload: BookRequest) =>
    axiosClient
      .put<UpdateResponse>(`/books/${id}`, payload)
      .then((response) => response.data),
  deleteBook: (id: number) =>
    axiosClient
      .delete<DeleteResponse>(`/books/${id}`)
      .then((response) => response.data),
};
export default bookApi;
