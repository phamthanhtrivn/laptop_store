import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";

const App = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<UserDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
