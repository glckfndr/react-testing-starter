import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { db } from "../mocks/db";
import { Product } from "../../src/entities";

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
    const item = await screen.findByText("Product Detail");
    expect(item).toBeInTheDocument();
  });

  it("should return message if product is not found", async () => {
    const id = productIds[0];
    db.product.delete({ where: { id: { equals: id } } });
    render(<ProductDetail productId={id} />);

    const item = await screen.findByText(/not found/i);
    expect(item).toBeInTheDocument();
  });

  it("should return error if id is invalid", async () => {
    render(<ProductDetail productId={0} />);

    const item = await screen.findByText(/error: invalid/i);
    expect(item).toBeInTheDocument();
  });

  it("should render product details", async () => {
    const id = productIds[1];
    const product = db.product.findFirst({
      where: { id: { equals: id } },
    });
    render(<ProductDetail productId={id} />);

    expect(
      await screen.findByText(new RegExp(product!.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product!.price.toString()))
    ).toBeInTheDocument();
  });
});
