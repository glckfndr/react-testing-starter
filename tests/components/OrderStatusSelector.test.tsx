import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const optionNames = ["New", "Processed", "Fulfilled"];
  const renderComponent = () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );
    return {
      trigger: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) => screen.findByRole("option", { name: label }),
      onChange,
      user
    };
  };

  it("should render a New trigger as default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it("should render a correct statuses", async () => {
    const { user, trigger, getOptions } = renderComponent();

    await user.click(trigger);
    const options = await getOptions();
    console.log(options[0]);
    const labels = options.map((option) => option.textContent);

    expect(options).toHaveLength(3);
    expect(labels).toEqual(optionNames);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])("should call OnChange with $value when $label is selected ", async ({label, value}) => {
    const { user, trigger, onChange, getOption } = renderComponent();

    await user.click(trigger);
    const option = await getOption(label);

    await user.click(option);
    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should call Onchange with new when New is selected', async() => {
    const { user, trigger, onChange, getOption } = renderComponent();
    await user.click(trigger);

    const fulfilledOption = await getOption(/fulfilled/i);
    await user.click(fulfilledOption);
    await user.click(trigger);

    const newOption = await getOption(/new/i);
    await user.click(newOption);
    expect(onChange).toHaveBeenCalledWith('new');
  })
});
