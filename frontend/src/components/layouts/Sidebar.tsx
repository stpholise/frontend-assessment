const Sidebar = () => {
  return (
    <div className="w-56 bg-white h-full px-4 py-4 fixed left-0 flex flex-col gap-4">
      <p className=""> All</p>

      {navigationList.map((item, index) => (
        <div className=" " key={index}>
          <p className="font-semibold mb-3">{item.key}</p>
          <div className=" px-3 leading-5 flex flex-col gap-2 ">
            {item.items.map((vals, index) => (
              <p className="text-sm" key={index}>
                {" "}
                {vals.title}
              </p>
            ))}
          </div>
        </div>
      ))}
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
