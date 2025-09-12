import { useState, useEffect } from "react";

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

interface ProductsResponse {
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  products: Product[];
}

export const useFetchProducts = ({
  page = 1,
  limit = 10,
  sort = "id",
  order = "asc",
  minPrice,
  maxPrice,
  category,
  search,
}: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const [productsData, setProductsData] = useState<ProductsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    setIsLoading(true);
    const getProducts = async () => {
      const settings = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      let url = `http://localhost:3000/api/products?page=${page}&limit=${limit}&sort=${sort}&order${order}`;
      if (category) {
        url += `&category=${category}`;
      }

      if (search) {
        url += `&search=${search}`;
      }
      if (minPrice) {
        url += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        url += `&minPrice=${maxPrice}`;
      }

      try {
        const response = await fetch(url, settings);
        if (!response.ok) {
          throw new Error("failed to fetch jobs");
        }
        const data = await response.json();
        setProductsData(data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [page, limit, sort, order, category, search, maxPrice, minPrice]);

  return { productsData, isLoading, error };
};

export const useFetchAProduct = ({ id }: { id: number }) => {
  const controller = new AbortController();
  const [product, setProduct] = useState<Product | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const settings = {
      method: "GET",
    };
    const url = `http://localhost:3000/api/products/${id}`;
    const getProduct = async () => {
      try {
        const response = await fetch(url, settings);
        if (!response.ok) {
          throw Error("Can't find product by this ID");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
    return () => controller.abort();
  }, [id]);

  return { product, isLoading, error };
};
