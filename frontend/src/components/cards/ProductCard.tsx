
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/CartSlice";

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
  const { name, brand, rating, price, reviews, imageUrl, id } = product;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="md:max-w-80 w-full flex-strech rounded-lg min-h-80 h-80 overflow-hidden border shadow-sm border-gray-200">
      <div className=" bg-gray-100 h-1/2 overflow-hidden max-h-1/2 ">
        <img
          src={imageUrl}
          alt="product image"
          className="w-full h-full min-w-full min-h-full object-cover"
        />
      </div>
      <div className="px-4 py-4 bg-white h-1/2  flex flex-col ">
        <h4 className="font-medium md:text-sm lg:text-lg">
          <Link to={`/product/${id}`}>{name}</Link>
        </h4>
        <p className=" text-sm text-gray-400">{brand}</p>
        <div className="text-xs text-gray-400">
          {" "}
          ⭐ {rating} ({reviews} reviews){" "}
        </div>
        <p className="font-medium lg:text-lg">${price}</p>
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
