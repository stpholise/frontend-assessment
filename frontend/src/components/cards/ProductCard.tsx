import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/CartSlice";
import { useNavigate } from "react-router-dom";

import { toast, Slide, Bounce } from "react-toastify";

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

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { name, brand, rating, price, reviews, imageUrl, id } = product;
  const dispatch = useDispatch();
  const isMobile = window.innerWidth < 768;
  const notify = (message: string) => {
    toast.success(message, {
      position: isMobile ? "top-center" : "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: isMobile ? Bounce : Slide,
    });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    notify("Product added to cart");
  };

  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="md:max-w-80 w-full flex-strech rounded-lg min-h-80 h-80 overflow-hidden border shadow-sm border-gray-200">
      <div
        onClick={handleNavigate}
        className="cursor-pointer bg-gray-100 h-1/2 overflow-hidden max-h-1/2 "
      >
        <img
          src={imageUrl}
          alt="product image"
          className="w-full h-full min-w-full min-h-full object-cover"
        />
      </div>
      <div className="px-4 py-4 bg-white h-1/2  flex flex-col ">
        <div
          className="cursor-pointer  flex flex-col "
          onClick={handleNavigate}
        >
          <h4 className="font-medium md:text-sm lg:text-lg truncate">{name}</h4>
          <p className=" text-sm text-gray-400 truncate ">{brand}</p>
          <div className="text-xs text-gray-400">
            {" "}
            ⭐ {rating} ({reviews} reviews){" "}
          </div>
          <p className="font-medium lg:text-lg">${price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="cart bg-slate-900 rounded-sm text-white text-sm font-medium text-center w-full mt-auto  cursor-pointer  h-6   flex itemsc-center justify-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
