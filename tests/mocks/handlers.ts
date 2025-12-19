import { http, HttpResponse } from "msw";
import type { BookRequest } from "../../src/dataModel/book";

const API_BASE_URL = "http://localhost:8800/api";

export const handlers = [
  http.get("http://localhost:8800/api/books", ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase();
    const books = [
      {
        id: 1,
        name: "Test Book",
        writer_name: "Test Writer",
        type: "Novel",
        price: 100,
        description: "Test description",
        published_date: "2024-01-01",
      },
    ];

    const filtered = search
      ? books.filter((b) => b.name.toLowerCase().includes(search))
      : books;

    return HttpResponse.json({ data: filtered }, { status: 200 });
  }),
  http.get(`${API_BASE_URL}/books/:id`, ({ params }) => {
    return HttpResponse.json(
      {
        id: Number(params.id),
        name: "Test Book",
        writer_name: "Test Writer",
        type: "Novel",
        price: 100,
        description: "Test description",
        published_date: "2024-01-01",
      },
      { status: 200 }
    );
  }),
  http.put(`${API_BASE_URL}/books/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as BookRequest; // this is BookRequest payload from frontend

    // mimic your controller returning rows[0]
    // merge id and payload
    const updated = {
      id,
      ...body,
    };

    return HttpResponse.json(updated, { status: 200 });
  }),
  http.delete(`${API_BASE_URL}/books/:id`, () => {
    return new Response(null, { status: 200 });
  }),
  http.get(`${API_BASE_URL}/writers`, () => {
    return HttpResponse.json(
      [
        { id: 1, name: "Test Writer" },
        { id: 2, name: "Another Writer" },
      ],
      { status: 200 }
    );
  }),
];
