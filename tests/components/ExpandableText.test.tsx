import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const shortText = longText.substring(0, limit);
  const truncatedText = shortText + "...";

  it("should render full text in the article without button when text length <= 255", () => {
    render(<ExpandableText text={shortText} />);

    //expect(screen.getByText(shortText)).toBeInTheDocument()
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(shortText);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("should truncate text if it contains more then 255 and show More button", () => {
    render(<ExpandableText text={longText} />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(truncatedText);

    screen.getByRole("button", {name: /more/i});

  });

  it("should contain all text in article when Show More button is clicked", async () => {

    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button", {name: /more/i});
    const user = userEvent.setup();
    await user.click(button);

    expect(button).toHaveTextContent(/less/i);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it("should collapse the when Show Less button is clicked", async () => {

    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button", {name: /more/i});
    const user = userEvent.setup();

    await user.click(button);

    expect(button).toHaveTextContent(/less/i);

    await user.click(button);

    expect(button).toHaveTextContent(/more/i);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
  });
});
