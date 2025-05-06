import { useState } from "react";

const OrderManagement = () => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý đơn hàng
      </h2>
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
                        <p className="text-sm text-gray-500">
                          Số lượng: {order.quantity}
                        </p>
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
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderManagement;