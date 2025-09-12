import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { openCart } from "../../store/slices/CartSlice";
const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="w-full sticky min-h-14 max-h-16  strech-1 top-0 left-0 right-0 bg-white pl-70 pr-60 py-4 flex justify-between">
      <h1 className="text-black font-bold">
        {" "}
        <a href="/"> Test App</a>
      </h1>
      <button className="relative block " onClick={() => dispatch(openCart())}>
        cart{" "}
        <p className="text-xs absolute -top-1 -right-1 text-red-400">
          {cartItems.length > 0 && cartItems.length}
        </p>
      </button>
    </div>
  );
};

export default Header;
