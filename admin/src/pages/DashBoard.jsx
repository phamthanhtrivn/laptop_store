import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardStatic() {
  const [filter, setFilter] = useState("year");

  const revenueLabels = {
    year: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    quarter: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
    month: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    week: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
  };

  const revenueData = {
    labels: revenueLabels[filter],
    datasets: [
      {
        label: "Doanh thu",
        data: [500, 800, 400, 900, 700, 1000],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const bestSellerData = {
    labels: ["Laptop", "Chuột", "Bàn phím", "Tai nghe"],
    datasets: [
      {
        label: "Số lượng bán",
        data: [50, 30, 20, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const orderStats = {
    labels: ["Thành công", "Thất bại"],
    datasets: [
      {
        label: "Đơn hàng",
        data: [120, 20],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      {/* Bộ lọc nâng cao */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Bộ lọc thống kê</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Năm</label>
            <select className="border rounded px-2 py-1 w-full text-sm">
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quý</label>
            <select className="border rounded px-2 py-1 w-full text-sm">
              <option disabled selected>-- Chọn nếu cần --</option>
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tháng</label>
            <select className="border rounded px-2 py-1 w-full text-sm">
              <option disabled selected>-- Chọn nếu cần --</option>
              {[...Array(12)].map((_, i) => (
                <option key={i}>Tháng {i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày</label>
            <select className="border rounded px-2 py-1 w-full text-sm">
              <option disabled selected>-- Chọn nếu cần --</option>
              {[...Array(31)].map((_, i) => (
                <option key={i}>Ngày {i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái đơn</label>
            <select className="border rounded px-2 py-1 w-full text-sm">
              <option>Tất cả</option>
              <option>Đã giao</option>
              <option>Đang xử lý</option>
              <option>Đã huỷ</option>
              <option>Chờ xác nhận</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-500">Tổng doanh thu</h3>
          <p className="text-lg font-semibold text-red-500">120.000.000₫</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-500">Sản phẩm bán chạy nhất</h3>
          <p className="text-lg font-semibold">Laptop Gaming</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-500">Tổng đơn hàng</h3>
          <p className="text-lg font-semibold">140</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm text-gray-500">Tỷ lệ đơn thành công</h3>
          <p className="text-lg font-semibold text-green-600">85.7%</p>
        </div>
      </div>

      {/* Biểu đồ pie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-md font-semibold mb-2">Top sản phẩm bán chạy</h2>
          <Pie data={bestSellerData} />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-md font-semibold mb-2">Tỷ lệ đơn hàng</h2>
          <Pie data={orderStats} />
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-md font-semibold mb-2">Biểu đồ doanh thu</h2>
        <Bar data={revenueData} />
      </div>

      {/* Bảng doanh thu chi tiết */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-md font-semibold mb-4">Chi tiết doanh thu</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-4 py-2">Khoảng thời gian</th>
                <th className="border px-4 py-2">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {revenueLabels[filter].map((label, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{label}</td>
                  <td className="border px-4 py-2">
                    {revenueData.datasets[0].data[index].toLocaleString()}₫
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2 font-semibold">Tổng</td>
                <td className="border px-4 py-2 font-semibold">
                  {revenueData.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
