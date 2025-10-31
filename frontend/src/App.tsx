import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import Cart from "./components/Cart"; 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; 

function App() { 
 
  return (
    <>
      <Router>
        <div className="bg-[#f9f9f9] ">
          <ToastContainer />
          <Header />
          <Sidebar />
          { <Cart />}

          <div className="  h-full min-h-screen bg-[#f9f9f9] md:w-full lg:w-[calc(100%-25rem)] lg:ml-80">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/create" element={<CreateProduct/>} />
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
