import { useState } from "react";
import { Link } from "react-router-dom";
import { User, MapPin, ShoppingBag, LogOut } from "lucide-react";

const UserDetail = () => {
  const [activeTab, setActiveTab] = useState("account");

  const orders = [
    {
      id: "#DH00123",
      date: "21/04/2025",
      productName: "Laptop Lenovo IdeaPad 5",
      quantity: 1,
      price: 18500000,
      status: "Đã giao",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      id: "#DH00124",
      date: "22/04/2025",
      productName: "Chuột Logitech G304",
      quantity: 2,
      price: 800000,
      status: "Đang giao",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      id: "#DH00125",
      date: "23/04/2025",
      productName: "Bàn phím cơ Keychron K2",
      quantity: 1,
      price: 2200000,
      status: "Đã hủy",
      imageUrl: "https://via.placeholder.com/50",
    },
    // Thêm nhiều đơn hàng nếu cần
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + "₫";
  };


  const [userInfo, setUserInfo] = useState({
    name: "Trí Thành",
    gender: "male",
    phone: "",
    email: "phamthanhtri0712@gmail.com",
    day: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu thông tin
    alert("Đã lưu thông tin thành công!");
  };

  const renderAccountInfo = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Thông tin tài khoản
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="w-32 text-gray-700 mb-2 md:mb-0">Họ Tên</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="w-32 text-gray-700 mb-2 md:mb-0">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="w-32 text-gray-700 mb-2 md:mb-0">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                LƯU THAY ĐỔI
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const renderAddressBook = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sổ địa chỉ</h2>

        <div className="border rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Họ và tên
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và tên"
                defaultValue="Trí Thành"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Số điện thoại
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
                defaultValue="0398694335"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Tỉnh / Thành phố
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>TP. Hồ Chí Minh</option>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Quận / Huyện
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Quận Gò Vấp</option>
                <option>Quận 1</option>
                <option>Quận 7</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Phường / Xã
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Phường 15</option>
                <option>Phường 12</option>
                <option>Phường 10</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Địa chỉ cụ thể
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Số nhà, tên đường..."
              defaultValue="200 An Nhơn"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </div>
    );
  };

const renderOrderManagement = () => {
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quản lý đơn hàng</h2>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full table-auto text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-medium">Mã đơn hàng</th>
              <th className="p-3 text-left font-medium">Ngày mua</th>
              <th className="p-3 text-left font-medium">Sản phẩm</th>
              <th className="p-3 text-left font-medium">Tổng tiền</th>
              <th className="p-3 text-left font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.imageUrl}
                        alt={order.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{order.productName}</p>
                        <p className="text-sm text-gray-500">Số lượng: {order.quantity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-blue-600">
                    {formatCurrency(order.price)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full
                      ${
                        order.status === "Đã giao"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Đang giao"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Bạn chưa có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* User Profile */}
            <div className="p-4 flex items-center border-b">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={24} className="text-gray-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{userInfo.name}</h3>
              </div>
            </div>

            {/* Navigation */}
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
                    <span>Quản lý đơn hàng</span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/"
                    className="w-full flex items-center p-2 rounded-md hover:bg-gray-100"
                  >
                    <LogOut size={18} className="mr-2" />
                    <span>Đăng xuất</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "account" && renderAccountInfo()}
          {activeTab === "address" && renderAddressBook()}
          {activeTab === "orders" && renderOrderManagement()}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
