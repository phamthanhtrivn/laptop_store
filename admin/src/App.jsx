import React from "react";
import SideBarMenu from "./components/SideBarMenu";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Header from "./components/Header";
import { useToken } from "./context/TokenContextProvider";
import Login from "./components/Login";

const App = () => {
  const { token } = useToken();
  return (
    <>
      {token ? (
        <>
          <div className="flex">
            <div className="w-[300px]">
              <SideBarMenu />
            </div>
            <div className="flex-1">
              <Header />
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
