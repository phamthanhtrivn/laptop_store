import { useEffect, useRef, useState } from "react";
import { images } from "../assets/assets";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/searchSlice";
import { clearCategory, setCategory } from "../store/categorySlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const modalRef = useRef();

  const categories = [
    "Đồ họa - Studio",
    "Học sinh - Sinh viên",
    "Mỏng nhẹ cao cấp",
    "Gaming",
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate("/products");
      setShowModal(false);
    }
  };

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
      <div className="fixed top-0 left-0 w-full z-99 shadow-md px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#E30019] text-white py-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <div onClick={() => navigate("/")} className="w-40">
            <img className="w-full" src={images.logo} alt="logo" />
          </div>
          <div className="relative">
            {/* Nút Danh mục */}
            <div
              className="flex items-center gap-3 bg-[#BE1529] px-3 py-1.5 font-medium rounded cursor-pointer"
              onClick={() => setShowModal(!showModal)}
            >
              <Menu className="text-white" size={28} />
              <p className="hidden md:block">Danh mục</p>
            </div>
          </div>
          {/* Thanh tìm kiếm */}
          <div className="bg-white lg:flex items-center rounded px-3 py-1.5 hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              onKeyDown={handleSearch}
              className="text-black outline-none w-70"
              placeholder="Bạn cần tìm gì?"
              required
            />
            <Search
              size={28}
              onClick={() => searchQuery.trim() && navigate("/products")}
              className="text-gray-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Giỏ hàng và Đăng nhập */}
        <div className="flex items-center gap-2 font-medium">
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={28} />
            <p className="absolute -right-2 -top-1 flex items-center justify-center w-5 h-5 text-red-500 bg-white rounded-full text-[10px] font-bold shadow-md">
              {totalQuantity}
            </p>
          </NavLink>
          <div className="flex gap-3"></div>
          <NavLink
            to={isAuthenticated ? "/user" : "/login"}
            className="flex items-center gap-3 bg-[#BE1529] px-3 py-1.5 font-medium rounded"
          >
            <User className="text-white" size={28} />
            <p className="hidden md:block">{isAuthenticated ? (user?.name) : "Đăng nhập"}</p>
          </NavLink>
        </div>
      </div>

      {/* Overlay khi modal mở */}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-999"
          onClick={() => setShowModal(false)}
        ></div>
      )}

      {/* Modal Danh mục */}
      {showModal && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 z-999 w-60 h-full bg-white shadow-lg p-6 animate-slide-in"
        >
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <span className="text-red-600 font-bold text-2xl">×</span>
          </div>
          <h3 className="font-semibold text-xl mb-4">Chọn danh mục</h3>
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(clearCategory());
              navigate("/products");
              setShowModal(false);
            }}
            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
              !selectedCategory ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Tất cả
          </div>
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
                selectedCategory === cat ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setCategory(cat));
                navigate(`/products/category/${cat}`);
                setShowModal(false);
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;