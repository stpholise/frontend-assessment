import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "../components/hooks/useCreatProduct";
import { useQuery } from "@tanstack/react-query";

const fetchProduct = async ({ id }: { id: number }) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "GET",
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to fetch product");
  }
  return res.json();
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    deleteProduct,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteProduct();
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: () => fetchProduct({ id: Number(id) }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!product) return <p>Product not found</p>;
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product }));
    console.log("Added to cart", product);
  };
  const goToEdit = () => {
    navigate(`/products/edit/${product.id}`, { state: { product } });
  };

  const deleteProductById = async (id: number) => {
    try {
      await deleteProduct(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="w-full   rounded-lg px-4 py-4">
      {isDeleting && <p className="text-blue-500">Deleting product...</p>}
      {deleteError && (
        <p className="text-red-500">Error: {deleteError.message}</p>
      )}
      <h2 className="text-xl font-medium my-2">Product Detail</h2>
      <div className="rounded-lg border border-gray-200 shadow overflow-hidden">
        <div className="bg-white w-full h-12 py-3 px-4 border border-gray-100 rounded-t-lg">
          <button
            onClick={() => navigate("/")}
            className="text-black text-sm font-medium flex gap-1 items-center"
          >
            <img src="/arrow_back.png" alt="back" className="size-4" />
            Back to Products
          </button>
        </div>
        <div className="w-full flex sm:flex-row flex-col gap-0 bg-white">
          <div className="">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="sm:w-70 w-full min-h-80 h-full object-cover"
            />
          </div>
          <div className="flex flex-col px-4 py-4">
            <h3 className="text-lg text-blue-400 font-bold uppercase ">
              {product.category}{" "}
              <span className="font-semibold text-xl">{">"}</span>{" "}
              {product.subCategory}
            </h3>
            <h3 className="  capitalize text-2xl text-black font-bold">
              {product.name}
            </h3>
            <p className="text-gray-500 text-xs font-medium">
              {product.description}
            </p>
            <p className="text-sm font-medium text-gray-500 py-2">
              <span className="text-xl font-bold text-black">{`$${product.price}`}</span>{" "}
              in stock: {product.stock}
            </p>
            <p className="text-sm font-medium text-gray-500 mt-2">
              {" "}
              ⭐{product.rating} ({product.reviews} reviews)
            </p>
            <div className="py-3 mt-auto">
              <p className="text-sm text-black font-semibold ">
                Specifications:
              </p>
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-start gap-2 py-0.5">
                    <span className="text-xs text-gray-700 font-semibold first-letter:capitalize">
                      {key && `${key}:`}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {value !== undefined && value !== null ? `${value}` : ""}
                    </span>
                  </div>
                ))}
            </div>

            <div className="py-4  border-gray-200 mt-auto flex gap-4 flex-wrap">
             
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white text-xs font-medium px-4 py-2 rounded-lg sm:flex-1"
                >
                  Add to Cart
                </button>  
                <button
                  onClick={goToEdit}
                  className="bg-black text-white text-xs font-medium px-4 py-2 rounded-lg sm:flex-1   "
                >
                  Edit Product
                </button> 
                <button
                  onClick={() => deleteProductById(product.id)}
                  className="bg-red-500 text-white text-xs font-medium px-4 py-2 rounded-lg sm:flex-1"
                >
                  Delete Product
                </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
