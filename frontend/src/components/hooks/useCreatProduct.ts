import { useState } from "react";

interface ValuesType {
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

  const createProduct = async (product: ValuesType) => {
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
