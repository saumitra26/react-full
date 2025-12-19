vi.mock("../../src/hooks/useDebounce", () => ({
  useDebounce: (value: any) => value,
}));

import BookPage from "../../src/pages/BookPage";
import { renderWithProviders } from "../test.utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("BookPage", () => {
  it("renders heading and search input", () => {
    renderWithProviders(<BookPage />, {
      route: "/book",
      path: "/book",
    });

    expect(screen.getByText("All Books List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search books...")).toBeInTheDocument();
  });

  it("shows loading initially", () => {
    renderWithProviders(<BookPage />, {
      route: "/book",
      path: "/book",
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("filters books by search", async () => {
    const user = userEvent.setup();

    renderWithProviders(<BookPage />, {
      route: "/book",
      path: "/book",
    });

    await user.type(
      screen.getByPlaceholderText("Search books..."),
      "test"
    );

    expect(
      await screen.findByText(/test book/i)
    ).toBeInTheDocument();
  });

  it("shows error when API fails", async () => {
    server.use(
      http.get("http://localhost:8800/api/books", () => {
        return HttpResponse.error();
      })
    );

    renderWithProviders(<BookPage />, {
      route: "/book",
      path: "/book",
    });

    expect(
      await screen.findByText("Error loading books.")
    ).toBeInTheDocument();
  });
});