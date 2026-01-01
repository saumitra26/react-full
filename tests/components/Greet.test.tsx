import { cleanup, render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="hi" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Hi/i);
  });
  it("should render login button when name in not provided", () => {
    render(<Greet />);
    const button = screen.getByRole("button", { name: "Login" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Login/i);
  }),
    it("should get Add", () => {
      render(<Greet />);
      const text = screen.getByText("Add");
      expect(text).toBeInTheDocument();
    });
});
