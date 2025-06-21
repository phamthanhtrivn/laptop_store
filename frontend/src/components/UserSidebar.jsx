import { User, MapPin, ShoppingBag, LogOut } from "lucide-react";
import { memo } from "react";

const UserSidebar = ({ userInfo, activeTab, setActiveTab, handleLogout }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-64">
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="flex items-center p-4 border-b">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
            <User size={24} className="text-gray-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{userInfo.name}</h3>
          </div>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "account"
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <User size={18} className="mr-2" />
                <span>Thông tin tài khoản</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("address")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "address"
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <MapPin size={18} className="mr-2" />
                <span>Sổ địa chỉ</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "orders"
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <ShoppingBag size={18} className="mr-2" />
                <span>Lịch sử mua hàng</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 rounded-md hover:bg-gray-100"
              >
                <LogOut size={18} className="mr-2" />
                <span>Đăng xuất</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default memo(UserSidebar);