import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );
    return {
      button: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
    };
  };

  it("should render a New button as default value", () => {
    const { button } = renderComponent();
    expect(button).toHaveTextContent(/new/i);
  });

  it("should render a correct statuses", async () => {
    const { button, getOptions } = renderComponent();
    const user = userEvent.setup();
    await user.click(button);
    const options = await getOptions();
    const labels = options.map((option) => option.textContent);

    expect(options).toHaveLength(3);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });
});
