import ProductCard from "../components/cards/ProductCard";
import { useState } from "react";

const Home = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); 
  const [range, setRange] = useState<{
    start: number | string;
    end: number | string;
  }>({
    start: 0,
    end: 10,
  });
  return (
    < >
      <div className="flex justify-between px-6  mt-8 mb-2 items-center">
        <h2 className="font-semibold text-xl">All Products</h2>{" "}
        <button className="block bg-black text-white text-sm font-medium px-4 py-2 rounded-lg">
          Add New Product
        </button>
      </div>

      <div className="functionality border-2 border-red-400 px-6 py-1 grid grid-cols-3 gap-4 text-sm">
        <div className="">
          <p className="font-medium">Search</p>
          <input
            type="text"
            className="w-full bg-white rounded-sm px-3 py-1 text-sm outline-none"
            placeholder="Search Products..."
          />
        </div>
        <div className="">
          <p className="font-medium ">Price Range </p>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-18 bg-white rounded-sm  px-3 py-1 text-sm outline-none"
              value={range.start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const numericalValue = e.target.value.replace(/\D/g, "");
                setRange((prev) => ({ ...prev, start: numericalValue }));
              }}
            />
            to
            <input
              type="text"
              className="w-18 bg-white rounded-sm px-3 py-1 text-sm outline-none"
              value={range.end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const numericalValue = e.target.value.replace(/\D/g, "");
                setRange((prev) => ({ ...prev, end: numericalValue }));
              }}
            />
          </div>
        </div>
        <div className="">
          <p className="font-medium">Sort By</p>
          <div className="w-full rounded-lg py-1 px-3 bg-white">
            <select
              name=""
              id=""
              className="w-full outline-none test-sm capitalize"
            >
              <option value="price">price</option>
              <option value="price">date</option>
              <option value="price">name</option>
            </select>
          </div>
        </div>
        <div className="">
          <p className="font-medium">Order</p>
          <input
            type="text"
            className="w-full bg-white rounded-sm px-3 py-1 text-sm outline-none"
            placeholder="Ascending"
          />
        </div>
      </div>
      <div className="mx-auto  w-full h-full px-6  mt-4 flex gap-4 lg:grid-cols-3 lg:grid flex-wrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <footer className="border-2 border-red-400 px-6 pt-4 pb-2 my-1 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            disabled={pageNumber === 1}
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
        <div className="relative w-44">
         
          <div className="bg-white rounded-lg  px-3 py-1">
            <select
              name=""
              id=""
              className="w-full outline-none"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setItemsPerPage(Number(e.target.value));
              }}
            >
              <option value="10">10 per page</option>
              <option value="12">12 per page</option>
              <option value="15">15 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>
      </footer>
    </>
  );
};

 

export default Home;
