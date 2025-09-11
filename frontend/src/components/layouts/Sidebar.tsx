const Sidebar = () => {
  return (
    <div className="w-56 bg-white min-h-screen h-full px-4 py-4 fixed top-0 pt-17 left-0 flex flex-col gap-4">
      <p className=""> All</p>

      {navigationList.map((item, index) => (
        <div className=" " key={index}>
          <p className="font-semibold mb-3 font-sm">{item.key}</p>
          <div className="  leading-5 flex flex-col  ">
            {item.items.map((vals, index) => (
              <button className="text-xs font-medium cursor-pointer block text-left px-3 hover:bg-gray-100 w-full py-1.5 rounded-lg" key={index}>
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
