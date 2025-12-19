import { render, screen } from "@testing-library/react";
import BookDetails from "../../src/pages/BookDetails";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test.utils";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("group", () => {
  it("shows loading first", () => {
    renderWithProviders(<BookDetails />, {
      route: "/book/2",
      path: "/book/:id",
    });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should trigger a button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookDetails />, {
      route: "/book/2",
      path: "/book/:id",
    });
    const deleteButton = await screen.findByText("Delete Book");
    await user.click(deleteButton);
  });
  it("should naviage to booklist page", async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookDetails />, {
      route: "/book/2",
      path: "/book/:id",
    });
    const deleteButton = await screen.findByText("Delete Book");
    await user.click(deleteButton);
    expect(await screen.findByText("Book List Page")).toBeInTheDocument();
  });
  it("shows book details after loading", async () => {
    renderWithProviders(<BookDetails />, {
      route: "/book/2",
      path: "/book/:id",
    });
    expect(await screen.findByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("Test Writer")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
  it("shows no result when book is null", async () => {
    server.use(
      http.get("http://localhost:8800/api/books/:id", () => {
        return HttpResponse.json(null, { status: 200 });
      })
    );
    renderWithProviders(<BookDetails />, {
      route: "/book/2",
      path: "/book/:id",
    });

    expect(await screen.findByText("No Result Found")).toBeInTheDocument();
  });
});

// const user=userEvent.setup();
