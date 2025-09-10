import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <Router>
        <div className="bg-[#f9f9f9] ">
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
