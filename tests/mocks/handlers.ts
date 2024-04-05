import { http, HttpResponse } from "msw";
import { products } from "./products";

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Beauty" },
      { id: 3, name: "Gardening" },
    ]);
  }),
  http.get("/products", () => {
    return HttpResponse.json(products);
  }),
  http.get("/products/:id", ({ params }) => {
    const id = parseInt(params.id as string);
    const product = products.find((el) => el.id === id);

    if (!product) return HttpResponse.json(null);
    return HttpResponse.json([product]);
  }),
];
