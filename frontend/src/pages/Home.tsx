import ProductCard from "../components/cards/ProductCard";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../components/hooks/useDebouncer";
import Loading from "../components/Loading";
import clsx from "clsx";

export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  brand: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  specifications: Record<string, string | number | boolean>;
}

const fetchProducts = async ({
  page,
  limit,
  search,
  minPrice,
  maxPrice,
  sortBy,
  order,
}: {
  page: number;
  limit: number;
  search: string;
  minPrice: number;
  maxPrice?: number;
  sortBy: string;
  order: string;
}) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products?page=${page}&limit=${limit}&search=${search}&minPrice=${minPrice}&maxPrice=${
        maxPrice ?? ""
      }&sortBy=${sortBy}&order=${order}`,
      { method: "GET" }
    );

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to fetch products");
    }

    return res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error("An Error occured");
    } else {
      throw new Error("A new Error occured ");
    }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const [range, setRange] = useState<{
    start: number;
    end?: number | undefined;
  }>({
    start: 0,
    end: undefined,
  });

  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "products",
      currentPage,
      itemsPerPage,
      debouncedSearch,
      range,
      sortBy,
      order,
    ],
    queryFn: () =>
      fetchProducts({
        page: Number(currentPage),
        limit: itemsPerPage,
        search: debouncedSearch,
        minPrice: range.start,
        maxPrice: range.end,
        sortBy,
        order,
      }),
  });

  const totalProducts = productsData?.totalProducts || 0;
  const totalPages =
    totalProducts > 0 ? Math.ceil(totalProducts / itemsPerPage) : 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };
  return (
    <>
      <div className="flex justify-between px-6  mt-8 mb-2 items-center ">
        <h2 className="font-semibold text-xl">All Products</h2>{" "}
        <button
          className="block bg-black text-white text-sm font-medium px-4 py-2 rounded-lg"
          onClick={() => navigate("/products/create")}
        >
          Add New Product
        </button>
      </div>
      {
        <>
          <div className="functionality  px-6 py-1 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div className="">
              <p className="font-medium">Search</p>
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(e.target.value.trim());
                }}
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
                    setRange((prev) => ({
                      ...prev,
                      start: Number(numericalValue),
                    }));
                  }}
                />
                to
                <input
                  type="text"
                  className="w-18 bg-white rounded-sm px-3 py-1 text-sm outline-none"
                  value={range.end}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const numericalValue = e.target.value.replace(/\D/g, "");
                    setRange((prev) => ({
                      ...prev,
                      end: Number(numericalValue),
                    }));
                  }}
                />
              </div>
            </div>
            <div className="">
              <p className="font-medium">Sort By</p>
              <div className="w-full rounded-lg py-1 px-3 bg-white">
                <select
                  name="sortBy"
                  id="sortBy"
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full outline-none test-sm capitalize"
                >
                  <option value="id">Id</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            <div className="">
              <p className="font-medium">Order</p>
              <div className="w-full rounded-lg py-1 px-3 bg-white">
                <select
                  name="order"
                  id="order"
                  value={order}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setOrder(e.target.value)
                  }
                  className="w-full outline-none test-sm capitalize"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="my-12">
              <Loading />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center w-full h-full   ">
              <img
                src="/cirlcle-error.svg"
                alt="error icon"
                width={250}
                className="lg:size-32 size-12"
              />
              <p className="font-bold lg:text-xl  text-red-600">
                Error Loading products
              </p>
            </div>
          ) : productsData && productsData.products.length > 0 ? (
            <div className="mx-auto  w-full h-full px-6  mt-4  grid grid-cols-2 py-3  gap-4 md:grid-cols-3  sm:grid sm:grid-cols-2 flex-wrap">
              {productsData &&
                productsData.products.map((item: Product) => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full my-12  ">
              <img
                src="box.svg"
                alt="empty box"
                width={250}
                className="lg:size-32 size-12"
              />
              <p className="font-semibold lg:text-xl text-slate-800 ">
                No products found
              </p>
            </div>
          )}
          <footer className=" px-6 pt-4 pb-2 my-1 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <button
                disabled={currentPage === 1}
                className="disabled:bg-gray-400  bg-slate-800 px-5 py-2 rounded-sm text-sm font-medium text-white cursor-pointer"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <p className="text-sm font-medium">
                Page {productsData && productsData.currentPage}
              </p>
              <button
                disabled={currentPage === totalPages}
                className={clsx(
                  "disabled:bg-gray-400 bg-slate-800 px-5 py-2 rounded-sm text-sm font-medium text-white cursor-pointer "
                )}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <div className="relative w-44">
              <div className="bg-white rounded-lg  px-3 py-1">
                <select
                  name="itemsPerPage"
                  id=""
                  value={itemsPerPage}
                  className="w-full outline-none"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setItemsPerPage(Number(e.target.value));
                  }}
                >
                  <option value="3">3 per page</option>
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                </select>
              </div>
            </div>
          </footer>
        </>
      }
    </>
  );
};

export default Home;
