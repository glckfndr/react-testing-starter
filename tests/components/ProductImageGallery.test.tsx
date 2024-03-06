import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should contains image list when imageUrls is not empty ", () => {
    const images: string[] = ["url_image1", "url_image1"];
    render(<ProductImageGallery imageUrls={images} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);

    imgs.forEach((img, i) => {
      expect(img).toHaveAttribute("src", images[i]);
    });
  });
});
