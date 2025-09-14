import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../cards/ProductCard";
import { Provider } from "react-redux";
import { store } from "../../store/index";
import { BrowserRouter } from "react-router-dom";
import { addToCart } from "../../store/slices/CartSlice";
import { useDispatch } from "react-redux";
import { it, expect, describe, vi } from "vitest";
const mockDispatch = vi.fn();
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});
describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Test Product",
    brand: "Test Brand",
    rating: 4.5,
    reviews: 10,
    price: 99.99,
    imageUrl: "http://example.com/image.jpg",
    specifications: {},
    category: "Test Category",
    subCategory: "Test Subcategory",
    stock: 5,
    description: "This is a test product",
  };

  it("renders product info correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Product/i)).not.toBeNull();

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(`/product/${product.id}`);
    const img = screen.getByAltText("product image") as HTMLImageElement;
    expect(img.src).toBe(product.imageUrl);
  });

  it("calls dispatch when Add to Cart is clicked", async () => {
    vi.spyOn({ useDispatch }, "useDispatch").mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );

    const buttons = screen.getAllByRole("button", { name: /Add to Cart/i });
    const button = buttons[0];
    await userEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(product)); 
  });
});
