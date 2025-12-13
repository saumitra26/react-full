import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Writer, writerRequest } from "../dataModel/writer";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8800/api";

export const writerApi = createApi({
  reducerPath: "writerApi",
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
  tagTypes: ["Writer"],
  endpoints: (builder) => ({
    getWriters: builder.query<Writer[], Record<string, any> | undefined>({
      query: (params) => ({
        url: "/writers",
        params,
        }),
      transformResponse: (response: any) => response.data,
      providesTags: (result) => result ? [  ...result.map((w) => ({ type: "Writer" as const, id:w.id })),
        { type: "Writer", id: "LIST" },
      ]
    : [{ type: "Writer", id: "LIST" }]
    }),
    getWriterById: builder.query<Writer, number>({
      query: (id) => ({
        url: `/writers/${id}`,
        }),
         transformResponse: (response: { message: string; data: Writer }) => response.data,
      providesTags: (result, error, id) => [{ type: "Writer", id }],
    }),
    updateWriter: builder.mutation<Writer, { id: number; payload: writerRequest }>({
      query: ({ id, payload }) => ({
        url: `/writers/${id}`,
        method: "PUT",
        body: payload,
        }),
      
      invalidatesTags: (result, error, { id }) => [
        { type: "Writer", id },
        { type: "Writer", id: "LIST" },
      ],
    }),
    addWriter: builder.mutation<Writer, writerRequest>({
      query: (payload) => ({
        url: "/writers",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Writer", id: "LIST" }],
    }),
    deleteWriter: builder.mutation<void, number>({
      query: (id) => ({
        url: `/writers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:(result,error,id)=>[
        { type: "Writer", id },
        { type: "Writer", id: "LIST" },
      ],
    }),
  }),
});
export const { useGetWritersQuery,
  useGetWriterByIdQuery,
  useUpdateWriterMutation,
  useAddWriterMutation,
  useDeleteWriterMutation  } = writerApi;
