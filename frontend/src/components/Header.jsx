import { useEffect, useRef, useState } from "react";
import { images } from "../assets/assets";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  // Ẩn modal khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#E30019] text-white py-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <div onClick={() => navigate("/")} className="w-40">
            <img className="w-full" src={images.logo} alt="logo" />
          </div>
          <div className="relative">
            {/* Nút Danh mục */}
            <div
              className="flex items-center gap-3 bg-[#BE1529] px-3 py-1.5 font-medium rounded cursor-pointer"
              onClick={() => setShowModal(!showModal)} // Mở modal khi nhấn
            >
              <Menu className="text-white" size={28} />
              <p className="hidden md:block">Danh mục</p>
            </div>
          </div>
          {/* Thanh tìm kiếm */}
          <div className="bg-white lg:flex items-center rounded px-3 py-1.5 hidden ">
            <input
              type="text"
              className="text-black outline-none w-70"
              placeholder="Bạn cần tìm gì?"
              required
            />
            <Search size={28} className="text-gray-700 cursor-pointer" />
          </div>
        </div>

        {/* Giỏ hàng và Đăng nhập */}
        <div className="flex items-center gap-2 font-medium">
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={28} />
            <p className="absolute -right-2 -top-1 flex items-center justify-center w-5 h-5 text-red-500 bg-white rounded-full text-[10px] font-bold shadow-md">
              0
            </p>
          </NavLink>
          <div className="flex gap-3"></div>
          <NavLink to="/login" className="flex items-center gap-3 bg-[#BE1529] px-3 py-1.5 font-medium rounded">
            <User className="text-white" size={28} />
            <p className="hidden md:block">Đăng nhập</p>
          </NavLink>
        </div>
      </div>

      {/* Overlay khi modal mở */}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setShowModal(false)} // Đóng modal khi click vào overlay
        ></div>
      )}

      {/* Modal Danh mục */}
      {showModal && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 z-50 w-60 h-full bg-white shadow-lg p-6 animate-slide-in"
        >
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <span className="text-red-600 font-bold text-2xl">&times;</span>
          </div>
          <h3 className="font-semibold text-xl mb-4">Chọn danh mục</h3>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
            Tất cả
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
            Đồ họa - Studio
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
            Học sinh - Sinh viên
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
            Mỏng nhẹ cao cấp
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Gaming
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
