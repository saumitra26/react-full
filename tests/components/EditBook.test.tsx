import { renderWithProviders } from "../test.utils";
import EditBook from "../../src/pages/EditBook";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

// mock navigation + useParams
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "2" }),
  };
});

it("prefills form and navigates after successful update", async () => {
  const user = userEvent.setup();

  renderWithProviders(<EditBook />, {
    route: "/book/2/edit",
    path: "/book/:id/edit",
  });

  // prefilled value proves GET /books/:id + writers + BookForm defaultValues are working
  expect(await screen.findByDisplayValue("Test Book")).toBeInTheDocument();

  // just submit without changing
  await user.click(screen.getByRole("button", { name: /edit book/i }));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/book/2");
  });
});
