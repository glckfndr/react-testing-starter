//import { it, expect, describe } from "vitest";
import { render, screen } from '@testing-library/react'
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render Hello name when the name is provided", () => {
    render(<Greet name="John" />);
    //screen.debug();
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/John/i)
  });

  it("should render login button when the name is not provided", () => {
    render(<Greet/>);
    //screen.debug();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i)
  });
});
