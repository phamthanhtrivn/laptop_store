/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import { backendUrl } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const [pagination, setPagination] = useState({
    totalOrders: 0,
    currentPage: 1,
    totalPages: 0,
    limitPerPage: 5,
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: pagination.currentPage,
          status: statusFilter !== "Tất cả" ? statusFilter : undefined,
          orderId: searchId.trim(),
        },
      });
      if (response.data.success) {
        setOrders(response.data.orderData);
        setPagination({
          totalOrders: response.data.pagination.totalOrders,
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          limitPerPage: response.data.pagination.limitPerPage,
        });
      } else {
        toast.error("Lỗi khi lấy đơn hàng!");
      }
    } catch (error) {
      toast.error("Lỗi khi lấy đơn hàng!");
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, statusFilter]);

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchOrders();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Lịch sử mua hàng{" "}
        <span className="text-sm text-gray-600">
          (có tất cả {pagination.totalOrders}) đơn hàng
        </span>
      </h2>

      {/* BỘ LỌC */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm theo mã đơn hàng..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
              setStatusFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Đóng gói">Đóng gói</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Đã giao">Đã giao</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition duration-300"
          >
            Tìm kiếm
          </button>
          <button
            onClick={() => {
              setSearchId("");
              setStatusFilter("Tất cả");
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
              fetchOrders();
            }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Làm mới
          </button>
        </div>
      </div>

      {/* BẢNG */}
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2">
                      {order.items.map((item, index) => (
                        <div
                          onClick={() => navigate(`/product/${item._id}`)}
                          key={index}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Số lượng: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-blue-600">
                    {formatCurrency(order.totalPrice)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full
                        ${
                          order.status === "Chờ xác nhận"
                            ? "bg-gray-100 text-gray-700"
                            : order.status === "Đóng gói"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Đang vận chuyển"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Đã giao"
                            ? "bg-green-100 text-green-700"
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
                  Không tìm thấy đơn hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PHÂN TRANG */}
      {pagination.totalOrders > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: Math.max(prev.currentPage - 1, 1),
                }))
              }
              disabled={pagination.currentPage === 1}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                pagination.currentPage === 1
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
            >
              &lt;
            </button>
            <span className="px-4 py-2">{pagination.currentPage} / {pagination.totalPages}</span>
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: Math.min(
                    prev.currentPage + 1,
                    pagination.totalPages
                  ),
                }))
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                pagination.currentPage === pagination.totalPages
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(OrderManagement);
