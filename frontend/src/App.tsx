import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import EditProduct from "./pages/EditProduct";

function App() {
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  return (
    <>
      <Router>
        <div className="bg-[#f9f9f9] ">
          <Header />
          <Sidebar />
          {isCartOpen && <Cart />}

          <div className="  h-full min-h-screen bg-[#f9f9f9] md:w-full lg:w-[calc(100%-25rem)] lg:ml-80">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<CreateProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              

              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
