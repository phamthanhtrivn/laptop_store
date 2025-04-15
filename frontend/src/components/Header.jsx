import { useEffect, useRef, useState } from "react";
import { images } from "../assets/assets";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#E30019] text-white py-4 flex justify-between">
      <div className="flex gap-4 items-center">
        <div className="w-40">
          <img className="w-full" src={images.logo} alt="logo" />
        </div>
        <div className="relative" ref={dropdownRef}>
          {/* Nút Danh mục */}
          <div
            className="flex items-center gap-3 bg-[#BE1529] px-3 py-1.5 font-medium rounded cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <Menu className="text-white" size={28} />
            <p className="hidden md:block">Danh mục</p>
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute left-[-30px] mt-2 w-48 bg-white text-black rounded shadow-lg z-50 animate-slide-down font-medium">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Đồ họa - Studio
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Học sinh - Sinh viên
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Mỏng nhẹ cao cấp
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Gaming
              </div>
            </div>
          )}
        </div>
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
      <div className="flex items-center gap-2 font-medium">
        <div className="relative">
          <ShoppingCart size={28} />
          <p className="absolute -right-2 -top-1 flex items-center justify-center w-5 h-5 text-red-500 bg-white rounded-full text-[10px] font-bold shadow-md">
            0
          </p>
        </div>
        <div className="flex gap-3"></div>
        <div className="flex items-center gap-3 bg-[#BE1529] px-3 py-1.5 font-medium rounded">
          <User className="text-white" size={28} />
          <p className="hidden md:block">Đăng nhập</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
