import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";

const App = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
