import { images } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";

const SideBarMenu = () => {
  const navigate = useNavigate()
  
  return (
    <div className="p-5 border-r-1 border-gray-300">
      <div className="w-30" onClick={() => navigate('/')}>
        <img className="w-full" src={images.logo_admin} alt="logo_admin" />
      </div>
      <div className="mt-5 flex flex-col gap-5 text-gray-700">
        <NavLink
          to="/"
          className="flex items-center gap-4 px-3 py-1.5 rounded font-medium border borderblack"
        >
          <img
            className="w-8"
            src={images.dashboard}
            alt="dashboard_icon"
          />
          <p>DashBoard</p>
        </NavLink>
        <NavLink
          to="/products"
          className="flex items-center gap-4 px-3 py-1.5 rounded font-medium border border-black"
        >
          <img
            className="w-8"
            src={images.laptop}
            alt="laptop"
          />
          <p>Products</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-4 px-3 py-1.5 rounded font-medium border border-black"
        >
          <img
            className="w-8"
            src={images.order}
            alt="order"
          />
          <p>Orders</p>
        </NavLink>
        <NavLink
          to="/users"
          className="flex items-center gap-4 px-3 py-1.5 rounded font-medium border border-black"
        >
          <img
            className="w-8"
            src={images.group}
            alt="group"
          />
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBarMenu;
