import { createSlice } from "@reduxjs/toolkit";
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

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartSliceProps {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartSliceProps = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const existingItems = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItems) {
        existingItems.quantity += 1;
      } else {
        state.items = [
          ...state.items,
          { product: action.payload, quantity: 1 },
        ];
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    reduceItem: (state, action) => {
      const existingItems = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItems) {
        existingItems.quantity -= 1;
      }
    },
  },
});

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  openCart,
  closeCart,
  reduceItem
} = cartSlice.actions;
export default cartSlice.reducer;
