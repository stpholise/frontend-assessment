import CreateProduct from "./CreateProduct"
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const product = location.state?.product;
    if (!product) return <p>No product data available for editing.</p>;

  return (
    <div> 
      <CreateProduct product={product} />
    </div>
  )
}

export default EditProduct