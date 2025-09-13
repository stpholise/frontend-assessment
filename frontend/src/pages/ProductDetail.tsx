//  import { type Product } from "../components/hooks/useFetchProducts"
import { useParams } from "react-router-dom";
import { useFetchAProduct } from "../components/hooks/useFetchProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
// import { type Product } from "../components/hooks/useFetchProducts";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { product, error, isLoading } = useFetchAProduct({ id: Number(id) });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!product) return <p>Product not found</p>;
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product }));
    console.log("Added to cart", product);
  };

  return (
    <div className="w-full   rounded-lg px-4 py-4">
      <h2 className="text-xl font-medium my-2">Product Detail</h2>
      <div className="rounded-lg border border-gray-200 shadow overflow-hidden">
        <div className="bg-white w-full h-12 py-3 px-4 border border-gray-100 rounded-t-lg">
          <button className="text-black text-sm font-medium">
            Back to Products
          </button>
        </div>
        <div className="w-full flex gap-0 bg-white">
          <div className="">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-70 min-h-80 h-full object-cover"
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
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-start gap-2 py-0.5">
                  <span className="text-xs text-gray-700 font-semibold">
                    {key} :
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="py-4  border-gray-200 mt-auto flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-black text-white text-xs font-medium px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
              <button className="bg-black text-white text-xs font-medium px-4 py-2 rounded-lg">
                Edit Product
              </button>
              <button className="bg-red-500 text-white text-xs font-medium px-4 py-2 rounded-lg">
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
