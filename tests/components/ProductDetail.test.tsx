import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";

describe("ProductDetail", () => {
  it("should get product with valid id", async () => {
    render(<ProductDetail productId={1} />);

    const item = await screen.findByText("Product Detail");
    expect(item).toBeInTheDocument();
  });

  it("should return message if product is not found", async () => {
    render(<ProductDetail productId={10} />);

    const item = await screen.findByText(/not found/i);
    expect(item).toBeInTheDocument();
  });

  it("should return error if id is invalid", async () => {
    render(<ProductDetail productId={0} />);

    const item = await screen.findByText(/error: invalid/i);
    expect(item).toBeInTheDocument();
  });
});
