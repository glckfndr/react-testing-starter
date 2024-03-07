import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();
    const user = userEvent.setup()
    render(<SearchBox onChange={onChange} />);
    return { input: screen.getByPlaceholderText(/Search/i),
    onChange,
    user
   };
  };

  it("should render an input field for searching", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("should call onChange when enter was pressed", async () => {
    const { input, onChange, user } = renderSearchBox();
    const text = "SearchTerm"

    await user.type(input, text + "{enter}")

    expect(onChange).toBeCalledWith(text)
  });

  it("should not call onChange when field is empty and enter was pressed", async () => {
    const { input, onChange, user } = renderSearchBox();

    await user.type(input, "{enter}")

    expect(onChange).not.toBeCalled()
  });
});
