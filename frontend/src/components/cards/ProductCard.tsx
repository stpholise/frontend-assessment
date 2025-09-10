const ProductCard = () => {
  return (
    <div className="max-w-80 w-full flex-strech rounded-lg h-80 overflow-hidden border shadow-sm border-gray-200">
      <div className="product image bg-gray-100 h-1/2 overflow-hidden max-h-1/2 ">
       <img src='' alt='product image' className="w-full h-full min-w-full min-h-full object-cover"/>
      </div>
      <div className="px-4 py-4 bg-white h-1/2 flex flex-col ">
        <h4 className="font-medium lg:text-lg">productName</h4>
        <p className=" text-sm text-gray-400">seller</p>
        <div className="text-xs text-gray-400"> star image rating and review length</div>
        <p className="font-medium lg:text-lg">price</p>
        <button className="cart bg-slate-900 rounded-sm text-white text-sm font-medium text-center w-full mt-auto  cursor-pointer block h-6">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
