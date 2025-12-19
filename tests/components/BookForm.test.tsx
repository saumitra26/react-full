import { render, screen } from "@testing-library/react"; // optional if your config already provides globals
import BookForm from "../../src/components/books/BookForm";
import userEvent from "@testing-library/user-event";

describe("BookForm", () => {
  const authors = [
    { id: 1, name: "Writer One" },
    { id: 2, name: "Writer Two" },
  ];
  it("should render fields and submit button", () => {
    render(<BookForm authors={authors} bookSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Book Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Book Type/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add book/i })
    ).toBeInTheDocument();
  });
  it("validates required fields", async () => {
    const user = userEvent.setup();

    render(<BookForm authors={authors} bookSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /add book/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
  });

  it("submits entered data", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<BookForm authors={authors} bookSubmit={handleSubmit} />);

    await user.type(screen.getByPlaceholderText(/Name/i), "Test Book");
    await user.type(screen.getByPlaceholderText(/Type/i), "Fiction");
    await user.selectOptions(screen.getByLabelText(/Author/i), "Writer One");
    await user.type(screen.getByPlaceholderText(/Book details/i), "description");
    await user.type(screen.getByPlaceholderText(/Published date/i), "2024-01-01");
    await user.type(screen.getByPlaceholderText(/Price/i), "100");

    await user.click(screen.getByRole("button", { name: /add book/i }));

    expect(handleSubmit).toHaveBeenCalled();
     expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ writer_id: 1 }),
      expect.anything()
    );
  });
  });