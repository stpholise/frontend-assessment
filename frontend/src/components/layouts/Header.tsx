import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { openCart } from "../../store/slices/CartSlice";
import { setMenuState } from "../../store/slices/AppSlice";

import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const menuState = useSelector((state: RootState) => state.app.menuState);
  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header>
      <div className="w-full sticky min-h-14 max-h-16  strech-1 top-0 left-0 right-0 bg-white lg:pl-70 md:px-8  pl-4 pr-4  xl:pr-60 lg:pr-22  sm:pr-20 py-4 flex justify-between">
        <button
          onClick={() => dispatch(setMenuState(!menuState))}
          className="lg:hidden"
        >
          <img src="/menu.svg" alt="menu" className="size-6" />
        </button>
        <h1 className="text-black font-bold ">
          {" "}
          <Link to="/"> Test App</Link>
        </h1>
        <button className="relative block" onClick={() => dispatch(openCart())}>
          <img src="/cart.svg" alt="cart" className="size-6" />
          {cartItems.length > 0 && (
            <p data-testid="cart-badge" className="text-[10px] absolute -top-1 -right-1 text-white font-medium bg-slate-900 rounded-full size-3.5 h-3.5 w-3.5 flex items-center justify-center">
              {cartItemsCount}
            </p>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
