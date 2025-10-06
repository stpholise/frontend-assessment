import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setMenuState } from "../../store/slices/AppSlice";

import type { RootState } from "../../store";

const Sidebar = () => {
  const menuState = useSelector((state: RootState) => state.app.menuState);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={clsx(
          "w-56 bg-white min-h-screen h-full z-40 px-4 py-4 fixed top-0 pt-17 left-0 lg:flex flex-col gap-4",
          "transform   transition-all duration-500 ease-in-out",
          {
            " -translate-x-full  opacity-0 duration-1000 lg:translate-x-0 lg:opacity-100 lg:duration-0":
              !menuState,
            "flex translate-x-0 opacity-100 duration-1000": menuState,
          }
        )}
      >
        <p className=""> All</p>
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => dispatch(setMenuState(false))}
        >
          <img src="/close.svg" alt="close" className="size-4" />
        </button>

        {navigationList.map((item, index) => (
          <div className=" " key={index}>
            <p className="font-semibold mb-3 font-sm">{item.key}</p>
            <div className="  leading-5 flex flex-col  ">
              {item.items.map((vals, index) => (
                <button
                  className="text-xs font-medium cursor-pointer block text-left px-3 hover:bg-gray-100 w-full py-1.5 rounded-lg"
                  key={index}
                >
                  {" "}
                  {vals.title}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="">
          <p className=" text-red-400 font-bold ">Category</p>
          <p className=" text-red-400 pl-3 font-bold">Sub Category</p>
        </div>
      </div>
      <div
        className={clsx(
          "lg-hidden fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.1)]",
          {
            hidden: !menuState,
            flex: menuState,
          }
        )}
        onClick={() => dispatch(setMenuState(false))}
      >
        {" "}
      </div>
    </>
  );
};

const navigationList = [
  {
    key: "Electronics",
    items: [
      { title: "Smartphones" },
      { title: "Laptops" },
      { title: "Accessories" },
    ],
  },
  {
    key: "Clothing",
    items: [{ title: "Men" }, { title: "Women" }, { title: "Kids" }],
  },
  {
    key: "Home & Gerden",
    items: [{ title: "Furniture" }, { title: "Decor" }, { title: "Kitchen" }],
  },
];

export default Sidebar;
