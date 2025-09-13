import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { openCart } from "../../store/slices/CartSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="w-full sticky min-h-14 max-h-16  strech-1 top-0 left-0 right-0 bg-white pl-70 pr-60 py-4 flex justify-between">
      <h1 className="text-black font-bold">
        {" "}
        <Link to="/"> Test App</Link>
      </h1>
      <button className="relative block " onClick={() => dispatch(openCart())}>
        cart{" "}
        {cartItems.length > 0 && (
          <p className="text-[10px] absolute -top-1 -right-1 text-white font-medium bg-slate-900 rounded-full size-3 h-3 w-3 flex items-center justify-center">
            {cartItems.length}
          </p>
        )}
      </button>
    </div>
  );
};

export default Header;
