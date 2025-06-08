/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToken } from "../context/TokenContextProvider";
import { toast } from "react-toastify";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  RefreshCcw,
  Search,
} from "lucide-react";
import { images } from "../assets/assets";

const Orders = () => {
  const searchRef = useRef(null);
  const { backendUrl, token } = useToken();
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const orderIdRef = useRef(null);

  const formatMoney = (number) => {
    return number.toLocaleString("vi-VN");
  };

  const handleSearch = async () => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchOrdersData();
    }
  };

  const handleChangeStatus = async (e, orderID) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        backendUrl + `/api/orders/update-status`,
        { orderID, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrdersData();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    searchRef.current.value = "";
    orderIdRef.current.value = "";

    if (selectedStatus !== "") {
      setSelectedStatus("");
    }

    if (page !== 1) {
      setPage(1);
    } else if (selectedStatus === "") {
      fetchOrdersData();
    }
  };

  const fetchOrdersData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/orders/all-orders", {
        params: {
          page,
          phone: searchRef.current.value.trim() || undefined,
          status: selectedStatus,
          orderID: orderIdRef.current.value.trim() || undefined,
        },
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      } else {
        toast.error("Không thể lấy dữ liệu người dùng!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, [page, selectedStatus]);

  return (
    <div className="p-5">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <img src={images.Loading_icon} alt="loading" className="w-full" />
        </div>
      )}
      <h1 className="mb-5 text-2xl font-semibold">Quản Lý Đơn Hàng</h1>
      <div className="flex items-start justify-between mt-8">
        <div>
          <div className="flex items-center gap-5 mt-5 text-gray-700">
            <label className="text-sm">Nhập mã đơn đặt hàng:</label>
            <input
              type="text"
              placeholder="ex: 6640f34f3ec8a349e82f4609"
              ref={orderIdRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div className="flex items-center gap-5 mt-5 text-gray-700">
            <label className="text-sm">Nhập số điện thoại cần tìm: </label>
            <input
              type="tel"
              placeholder="ex: 038964435"
              ref={searchRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
            <button
              onClick={handleSearch}
              className="items-center w-[250px] hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium"
            >
              <Search />
              <p>Tìm kiếm</p>
            </button>
          </div>
          <div className="flex items-center gap-5 mt-5 text-gray-700">
            <label className="text-sm">Trạng thái đơn hàng:</label>
            <select
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
              className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none"
            >
              <option value="">Tất cả</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đóng gói">Đóng gói</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Đã giao">Đã giao</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => handleRefresh()}
            className="flex gap-5 px-4 py-2 font-medium text-red-500 transition-all duration-300 bg-white border border-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
          >
            <RefreshCcw />
            <p>Tải lại</p>
          </button>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-base text-gray-700"
          >
            <Package size={48} className="w-20 h-20" />
            <div>
              <p className="mb-2 text-xl font-medium">{order.receiInfo.name}</p>
              <div className="mb-2">
                <p>{order.receiInfo.street}</p>
                <p>
                  {order.receiInfo.ward}, {order.receiInfo.đistrict},{" "}
                  {order.receiInfo.city}
                </p>
              </div>
              <p className="mb-2">{order.receiInfo.phone}</p>
              {order.items.map((item, index) => (
                <div key={index}>
                  <p className="py-0.5">
                    {item.name} x {item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm sm:text-[18px]">
                Số Lượng: {order.items.length}
              </p>
              <p className="mt-3">
                Phương pháp Thanh Toán: {order.paymentMethod}
              </p>
              <p>Đã Thanh Toán: {order.paymentMethod ? "Rồi" : "Chưa"}</p>
              <p>Ngày: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[18px] text-center font-medium">
              {formatMoney(order.totalPrice)} VNĐ
            </p>
            <select
              value={order.status}
              onChange={(e) => handleChangeStatus(e, order._id)}
              className="p-2 font-semibold border border-gray-300"
            >
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đóng gói">Đóng gói</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Đã giao">Đã giao</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="mt-6 text-sm">
          Tổng số đơn hàng: {pagination.totalOrders}
        </div>
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span>
            Trang <strong>{page}</strong> / {pagination.totalPages}
          </span>
          <button
            disabled={page === pagination.totalPages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.totalPages))
            }
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
