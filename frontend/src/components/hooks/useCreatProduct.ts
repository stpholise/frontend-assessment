import { useState } from "react";

interface Product {
  id?: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string | number | boolean>;
  rating?: number;
  reviews?: number;
}

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createProduct = async (product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || "Failed to create product");
      }

      const created = await res.json();
      return created;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createProduct, isLoading, error };
};

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProduct = async (id: number, product: Product) => {
    setIsLoading(true);
    setError(null);
    const url = `http://localhost:3000/api/products/${id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
         const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to update product");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { updateProduct, isLoading, error };
};


export const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete product");
      }

        if (response.status === 204) {
      return { message: "Product deleted successfully" };
    }

      return await response.json();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProduct, isLoading, error };
};
