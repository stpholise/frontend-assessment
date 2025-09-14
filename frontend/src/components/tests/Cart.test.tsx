import Header from "../layouts/Header";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Home from "../../pages/Home";
import { Provider } from "react-redux";
import cartReducer from "../../store/slices/CartSlice";
import appReducer from "../../store/slices/AppSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom"; 

describe("Cart component", () => {
  it("should update cart badge when items are added", async () => {

    const queryClient = new QueryClient();
 
    const store = configureStore({
      reducer: {
        cart: cartReducer,
        app: appReducer,
      },
    });
    render(
      <Provider store={store}>
       <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Home />
            <Header />
           
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );

    const addButtons = await screen.findAllByRole("button", { name: /add to cart/i });
    fireEvent.click(addButtons[0]);

    const cartBadge = await screen.findByTestId("cart-badge");
    await waitFor(() => {
      expect(cartBadge).toHaveTextContent("1");
    });
  });
});
