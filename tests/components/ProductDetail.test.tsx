import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { db } from "../mocks/db";

describe("ProductDetail", () => {
  const productIds: number[] = [];
  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productIds.push(product.id);
    });
  });

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  it("should get product with valid id", async () => {
    render(<ProductDetail productId={productIds[0]} />);
    console.log(productIds[0]);
    const item = await screen.findByText("Product Detail");
    expect(item).toBeInTheDocument();
  });

  it("should return message if product is not found", async () => {
    render(<ProductDetail productId={productIds[0] + 1} />);

    const item = await screen.findByText(/not found/i);
    expect(item).toBeInTheDocument();
  });

  it("should return error if id is invalid", async () => {
    render(<ProductDetail productId={0} />);

    const item = await screen.findByText(/error: invalid/i);
    expect(item).toBeInTheDocument();
  });
});
