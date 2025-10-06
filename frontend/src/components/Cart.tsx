import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import {
  addToCart,
  closeCart,
  reduceItem,
  removeFromCart,
} from "../store/slices/CartSlice";
import clsx from "clsx";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  const dispatch = useDispatch();

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className={clsx(
          "sm:w-80  w-full h-full min-h-screen  bg-white fixed top-0 right-0 border-l border-gray-200 p-4 z-50",
          "transform   transition-all duration-500 ease-in-out",
          {
            "-translate-x-0 duration-1000 opacity-100": isCartOpen,
            "translate-x-full opacity-0 ": !isCartOpen,
          }
        )}
      >
        <button
          onClick={() => dispatch(closeCart())}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <img src="/close.svg" alt="" className="size-4" />
        </button>
        <h2 className="font-bold text-lg mb-4">Shopping Cart</h2>
        <p className="text-xs text-gray-400">
          {" "}
          {cartItems.length === 0
            ? "Your cart is currently empty."
            : `You have ${cartItemsCount} items in your cart.`}
        </p>
        <div className="flex flex-col space-y-4 mt-2">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="max-w-14 max-h-16 size-14 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-xs">{item.product.name}</h3>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold">${item.product.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  disabled={item.quantity === 1}
                  onClick={() => dispatch(reduceItem({ ...item.product }))}
                  className="bg-white text-black shadow size-4 text-xs font-medium px-2 py-1 rounded flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xs text-gray-500 w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(addToCart({ ...item.product }))}
                  className="bg-white text-black shadow size-4 text-xs font-medium px-2 py-1 rounded flex items-center justify-center"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart({ ...item.product }))}
                  className="bg-white text-black text-xs font-medium px-2 py-1 rounded"
                >
                  <img src="/close.svg" alt="" className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            total: <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <button className="bg-slate-900 text-white font-medium text-sm px-4 py-2 w-full h-8 rounded flex items-center justify-center">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "lg-hidden fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.1)] z-40",
          {
            hidden: !isCartOpen,
            flex: isCartOpen,
          }
        )}
        onClick={() => dispatch(closeCart())}
      >
        {" "}
      </div>
    </>
  );
};

export default Cart;
