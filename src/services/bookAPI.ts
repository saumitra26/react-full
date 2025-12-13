import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, BookRequest } from "../dataModel/book";
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8800/api";
export const bookAPI = createApi({
  reducerPath: "bookAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Book"],

  endpoints: (builder) => ({
    getBooks: builder.query<Book[], Record<string, any> | undefined>({
      query: (params) => ({
        url: "/books",
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: [{ type: "Book", id: "LIST" }],
    }),
    getBookById: builder.query<Book, number>({
      query: (id) => `/books/${id}`,

      providesTags: (result, error, id) => [
        { type: "Book", id }, // Tag for this specific book
      ],
    }),
    addBook: builder.mutation<Book, BookRequest>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, { id: number; payload: BookRequest }>({
      query: ({ id, payload }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id }, // Invalidate updated book
        { type: "Book", id: "LIST" }, // Invalidate list
      ],
    }),
    deleteBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Book", id }, // Invalidate removed book
        { type: "Book", id: "LIST" }, // Invalidate list
      ],
    }),
  }),
});
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookAPI;
