import { it, expect, describe } from "vitest";
import { db } from "./mocks/db";
describe("group", () => {
  it("should", () => {
    // const product = db.product.create();
    const product = db.product.create({ name: "Apple" });
    //console.log(product);
    //console.log(db.product.getAll());

    console.log(db.product.delete({ where: { id: { equals: product.id } } }));
    console.log(db.product.count());
    expect(db.product.count()).toEqual(0);
  });
});
