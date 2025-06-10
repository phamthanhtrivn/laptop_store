/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./store/authSlice";
import { initializeCart, setCart } from "./store/cartSlice";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import ForgotPassword from "./pages/ForgotPassword";
import OrderComplete from "./components/OrderComplete";
import PaymentFailed from "./components/PaymentFailed";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const initCartFromUser = async () => {
      await dispatch(initializeCart()).unwrap();
    };
    initCartFromUser();
  }, [isAuthenticated]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await dispatch(initializeAuth()).unwrap();
        }
      } catch (error) {
        console.error("Lỗi khi khởi tạo auth:", error);
      }

      try {
        await dispatch(initializeCart()).unwrap();
      } catch (error) {
        console.error("Lỗi khi khởi tạo cart:", error);
      }
    };

    fetchData();
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
          <Route path="/terms" element={<TermsAndPrivacy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
