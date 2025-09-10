import ProductCard from "../components/cards/ProductCard";
import { useState } from "react";

const Home = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);
  return (
    <div className="  h-full min-h-screen bg-[#f9f9f9] w-[calc(100%-25rem)] lg:ml-80">
      <div className="mx-auto  w-full h-full px-6  mt-4 mb-1 flex gap-4 lg:grid-cols-3 lg:grid flex-wrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <footer className="border-2 border-red-400 px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
          disabled={pageNumber ===1}
            className="bg-gray-400 px-5 py-2 rounded-sm text-sm font-medium text-white cursor-pointer"
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Previous
          </button>
          <p className="text-sm font-medium">Page {pageNumber}</p>
          <button
            className="bg-gray-400 px-5 py-2 rounded-sm text-sm font-medium text-white cursor-pointer"
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
        <div className="relative ">
          <div className="bg-white   rounded-lg px-3 py-2 w-40" onClick={() => setOpenDropDown((prev) => !prev)}>
            {itemsPerPage} per page
          </div>

          {openDropdown && (
            <div className=" absolute bottom-full left-full bg-white w-fit h-fit rounded-t-lg rounded-br-lg rounded-bl-0">
              {perPageOptions.map((value, index) => (
                <button
                  onClick={() => {
                    setItemsPerPage(value);
                    setOpenDropDown(false);
                  }}
                  className="block px-2 py-1 cursor-pointer  hover:bg-slate-900 hover:text-white first:rounded-t-lg last:rounded-br-lg font-medium"
                  key={index}
                >
                  {value}
                </button>
              ))}
            </div>
          )}
          {/* <select
            id="perPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className=" p-1 outline-none "
          >
            <option value={10} >
              10 per page <span className="w-12 block border-red-400 border"></span>
            </option>
            <option value={12} className=" mr-23 pr-23 border border-red-400">
              12
            </option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select> */}
        </div>
      </footer>
    </div>
  );
};

const perPageOptions: number[] = [12, 15, 20];

export default Home;
