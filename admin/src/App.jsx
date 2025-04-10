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
import { ToastContainer } from "react-toastify";

const App = () => {
  const { token } = useToken();
  return (
    <>
      <ToastContainer />
      {token ? (
        <>
          <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
              <aside className="w-[300px] flex-shrink-0 border-r border-gray-300">
                <SideBarMenu />
              </aside>
              <main className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 overflow-y-auto p-5">
                  <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </div>
              </main>
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
