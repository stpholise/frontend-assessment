import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { addToCart, closeCart, reduceItem , removeFromCart } from "../store/slices/CartSlice";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-80 h-full min-h-screen bg-white fixed top-0 right-0 border-l border-gray-200 p-4">
        <button
          onClick={() => dispatch(closeCart())}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        <h2 className="font-bold text-lg mb-4">Shopping Cart</h2>
        <p className="text-xs text-gray-400">
          {" "}
          {cartItems.length === 0
            ? "Your cart is currently empty."
            : `You have ${cartItems.length} items in your cart.`}
        </p>
        <div className="flex flex-col space-y-4">
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
              <div className="">
                <button
                  disabled={item.quantity === 1}
                  onClick={() => dispatch(reduceItem({ ...item.product }))}
                  className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded"
                >
                 -
                </button>
                <span className="text-xs text-gray-500">{item.quantity}</span>
                <button
                  onClick={() => dispatch(addToCart({ ...item.product }))}
                  className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded"
                >
                 +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart({ ...item.product }))}
                  className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded"
                >
                 x
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="bg-slate-900 text-white font-medium text-sm px-4 py-2 w-full h-8 rounded flex items-center justify-center">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
