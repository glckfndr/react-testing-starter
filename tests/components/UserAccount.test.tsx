import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render User Name", () => {
    const user: User = { id: 1, name: "John"}
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();

  });

  it("should render User Profile heading", () => {
    const user: User = { id: 1, name: "John"}
    render(<UserAccount user={user} />);
    expect(screen.getByRole('heading')).toHaveTextContent(/user profile/i)
  });

  it("should not render button when user is not Admin", () => {
    const user: User = { id: 1, name: "John"}
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("should render button when user is Admin", () => {
    const user: User = { id: 1, name: "John", isAdmin: true}
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i)
  });
});
