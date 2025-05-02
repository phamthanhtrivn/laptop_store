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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./store/authSlice";
import { initializeCart } from "./store/cartSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initializeCart());
  }, [dispatch]);


  return (
    <div>
      <Header />
      <div className="h-20"></div>
      <ToastContainer />
      <div className="bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<UserDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
