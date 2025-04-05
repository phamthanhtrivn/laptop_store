import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToken } from "../context/TokenContextProvider";
import Swal from "sweetalert2";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("Dashboard");
  const { setToken } = useToken();

  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setToken("")
        Swal.fire("Đăng xuất", "", "success");
      }
    });
  };

  useEffect(() => {
    const getTitle = (path) => {
      switch (path) {
        case "/":
          return "Dashboard";
        case "/products":
          return "Products";
        case "/orders":
          return "Orders";
        case "/users":
          return "Users";

        default:
          break;
      }
    };

    setTitle(getTitle(location.pathname));
  }, [location]);

  return (
    <div className="p-5 flex items-center justify-between border-b border-gray-300">
      <div className="text-2xl font-bold text-red-500">{title}</div>
      <button
        onClick={handleLogout}
        className="font-medium px-4 py-2 bg-[#353535] text-white rounded-lg hover:bg-white hover:text-[#353535] border border-[#353535] transition-all duration-300 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
