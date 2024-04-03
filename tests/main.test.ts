import { it, expect, describe } from "vitest";

describe("fetch", () => {
  it("should return request data", async () => {
    const response = await fetch("/categories");
    const data = await response.json();
    console.log(data);
    expect(data).toHaveLength(3);
  });
});
