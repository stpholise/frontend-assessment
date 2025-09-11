import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <Router>
        <div className="bg-[#f9f9f9] ">
          <Header />
          <Sidebar />
          <div className="  h-full min-h-screen bg-[#f9f9f9] w-[calc(100%-25rem)] lg:ml-80">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/create" element={<CreateProduct />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
