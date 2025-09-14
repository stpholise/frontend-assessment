import { it, expect, describe } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../store/slices/CartSlice";
interface Product {
  id?: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string | number | boolean>;
  rating?: number;
  reviews?: number;
}
const product: Product = {
  id: 1,
  name: "Test Product",
  brand: "Test Brand",
  category: "Test Category",
  subCategory: "Test SubCategory",
  price: 100,
  stock: 50,
  description: "Test Description",
  imageUrl: "http://example.com/image.jpg",
  specifications: {
    color: "red",
    size: "M",
  },
  rating: 4.5,
  reviews: 10,
};

describe("cart slice", () => {
  it("should return initial state ", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual({
      items: [],
      isCartOpen: false,
    });
  });

  it("should add product to cart", () => {
    const previousState = { items: [], isCartOpen: false };
    expect(cartReducer(previousState, addToCart(product))).toEqual({
      items: [{ product, quantity: 1 }],
      isCartOpen: false,
    });
    expect(cartReducer(previousState, addToCart(product)).items).toHaveLength(
      1
    );
    expect(
      cartReducer(previousState, addToCart(product)).items[0].product
    ).toEqual(product);
    expect(
      cartReducer(previousState, addToCart(product)).items[0].quantity
    ).toEqual(1);
    expect(cartReducer(previousState, addToCart(product)).isCartOpen).toBe(
      false
    );
    expect(cartReducer(previousState, addToCart(product))).not.toBe(
      previousState
    );
  });

  it("should handle addToCart (existing item)", () => {
    const initialState = { items: [{ product, quantity: 1 }] } as {
      items: { product: Product; quantity: number }[];
      isCartOpen: boolean;
    };

    const nextState = cartReducer(initialState, addToCart(product));
    expect(nextState.items[0].quantity).toBe(2);
  });

  it("should remove product from cart", () => {
    const previousState = {
      items: [{ product, quantity: 1 }],
      isCartOpen: true,
    } as {
      items: { product: Product; quantity: number }[];
      isCartOpen: boolean;
    };
    expect(cartReducer(previousState, removeFromCart(product.id))).toEqual({
      items: [],
      isCartOpen: false,
    });
    expect(
      cartReducer(previousState, removeFromCart(product.id!)).items
    ).toHaveLength(0);
  });

  it("should handle clearCart", () => {
    const initialState = { items: [{ product, quantity: 1 }] } as {
      items: { product: Product; quantity: number }[];
      isCartOpen: boolean;
    };
    const nextState = cartReducer(initialState, clearCart());
    expect(nextState.items).toHaveLength(0);
  });
 
});
