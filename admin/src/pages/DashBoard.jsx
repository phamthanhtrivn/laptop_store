import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Boxes, CircleUserRound, DollarSign, ShoppingCart } from "lucide-react";

const sampleProductData = {
  // dữ liệu cho top sản phẩm bán chạy
  2025: {
    1: [
      { name: "MacBook Air M2", sold: 85 },
      { name: "Dell XPS 13", sold: 70 },
      { name: "Logitech MX Master 3", sold: 60 },
    ],
    2: [
      { name: "MacBook Air M2", sold: 120 },
      { name: "Dell XPS 13", sold: 95 },
      { name: "Razer Blade 15", sold: 85 },
    ],
    3: [
      { name: "MacBook Air M2", sold: 140 },
      { name: "Dell XPS 13", sold: 120 },
      { name: "Asus ROG Strix", sold: 100 },
    ],
  },
  2024: {
    1: [
      { name: "MacBook Air M2", sold: 60 },
      { name: "Dell XPS 13", sold: 50 },
      { name: "Logitech MX Master 3", sold: 45 },
    ],
    2: [
      { name: "MacBook Air M2", sold: 100 },
      { name: "Dell XPS 13", sold: 85 },
      { name: "Razer Blade 15", sold: 75 },
    ],
    3: [
      { name: "MacBook Air M2", sold: 130 },
      { name: "Dell XPS 13", sold: 110 },
      { name: "Asus ROG Strix", sold: 90 },
    ],
  },
};

const orderStatusByYearMonth = {
  // dữ liệu cho các tình trạng đơn hàng
  2025: {
    1: [
      { name: "Đã giao", value: 120 },
      { name: "Đang xử lý", value: 45 },
      { name: "Đã huỷ", value: 10 },
      { name: "Chờ xác nhận", value: 20 },
    ],
    2: [
      { name: "Đã giao", value: 150 },
      { name: "Đang xử lý", value: 55 },
      { name: "Đã huỷ", value: 15 },
      { name: "Chờ xác nhận", value: 25 },
    ],
    3: [
      { name: "Đã giao", value: 130 },
      { name: "Đang xử lý", value: 50 },
      { name: "Đã huỷ", value: 20 },
      { name: "Chờ xác nhận", value: 18 },
    ],
  },
  2024: {
    1: [
      { name: "Đã giao", value: 100 },
      { name: "Đang xử lý", value: 40 },
      { name: "Đã huỷ", value: 12 },
      { name: "Chờ xác nhận", value: 14 },
    ],
    2: [
      { name: "Đã giao", value: 110 },
      { name: "Đang xử lý", value: 35 },
      { name: "Đã huỷ", value: 14 },
      { name: "Chờ xác nhận", value: 16 },
    ],
  },
};

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Dashboard() {
  const [productYear, setProductYear] = useState("2025");

  const [productMonth, setProductMonth] = useState("1");
  const [orderFilter, setOrderFilter] = useState("all");
  const productData = sampleProductData[productYear][productMonth];

  const [orderYear, setOrderYear] = useState("2025");
  const [orderMonth, setOrderMonth] = useState("1");
  const filteredOrderStatus = () => {
    const data = orderStatusByYearMonth?.[orderYear]?.[orderMonth] || [];
    if (orderFilter === "all") return data;
    const nameMap = {
      deliveredOnly: "Đã giao",
      processingOnly: "Đang xử lý",
      canceledOnly: "Đã huỷ",
      pendingOnly: "Chờ xác nhận",
    };
    return data.filter((item) => item.name === nameMap[orderFilter]);
  };
  const [revenueType, setRevenueType] = useState("year");
  const [revenueYear, setRevenueYear] = useState("2025");
  const [revenueMonth, setRevenueMonth] = useState("1");
  const [revenueWeek, setRevenueWeek] = useState("1");

  const revenueByYearMonth = {
    2025: {
      1: [
        { day: "01", revenue: 1000 },
        { day: "02", revenue: 1200 },
        { day: "03", revenue: 800 },
        { day: "04", revenue: 1500 },
      ],
      2: [
        { day: "01", revenue: 2000 },
        { day: "02", revenue: 1800 },
        { day: "03", revenue: 1700 },
      ],
    },
    2024: {
      12: [
        { day: "01", revenue: 900 },
        { day: "02", revenue: 1000 },
        { day: "03", revenue: 1100 },
      ],
    },
  };

  const revenueByYearMonthWeek = {
    2025: {
      1: {
        1: [
          { day: "01", revenue: 1000 },
          { day: "02", revenue: 1200 },
          { day: "03", revenue: 800 },
        ],
        2: [
          { day: "08", revenue: 2000 },
          { day: "09", revenue: 1500 },
          { day: "10", revenue: 1700 },
        ],
      },
      2: {
        1: [
          { day: "01", revenue: 1100 },
          { day: "02", revenue: 1300 },
          { day: "03", revenue: 900 },
        ],
      },
    },
  };

  const filteredRevenueData = (() => {
    if (revenueType === "year") {
      const months = revenueByYearMonth[revenueYear] || {};
      return Object.keys(months).map((month) => {
        const monthData = months[month];
        const total = monthData.reduce((sum, entry) => sum + entry.revenue, 0);
        return { day: `Tháng ${month}`, revenue: total };
      });
    } else if (revenueType === "month") {
      return revenueByYearMonth?.[revenueYear]?.[revenueMonth] || [];
    } else if (revenueType === "week") {
      return (
        revenueByYearMonthWeek?.[revenueYear]?.[revenueMonth]?.[revenueWeek] ||
        []
      );
    } else if (revenueType === "all") {
      const allData = [];
      const yearData = revenueByYearMonth[revenueYear] || {};
      Object.values(yearData).forEach((monthData) => {
        allData.push(...monthData);
      });
      return allData;
    }
    return [];
  })();

  return (
    <div className="p-6 grid grid-cols-1 gap-6">
      {/* Tổng quan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-start gap-25 p-5 bg-[#FFF0F5] rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Tổng đơn hàng</p>
            <p className="text-2xl font-bold">$92,405</p>
          </div>
          <div className="text-[#ff6c9d] border p-2 rounded">
            <ShoppingCart size={30} />
          </div>
        </div>
        <div className="flex items-start gap-25 p-5 bg-[#EFF6FF] rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Doanh Thu Hôm Nay</p>
            <p className="text-2xl font-bold">$32,218</p>
          </div>
          <div className="text-[#62a6ff] border p-2 rounded">
            <DollarSign size={30} />
          </div>
        </div>
        <div className="flex items-start gap-25 p-5 bg-[#F0F7FD] rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Khách Hàng Mới</p>
            <p className="text-2xl font-bold">298</p>
          </div>
          <div className="text-[#59b2ff] border p-2 rounded">
            <CircleUserRound size={30} />
          </div>
        </div>
        <div className="flex items-start gap-25 p-5 bg-[#e0ffe1] rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Sản Phẩm Tồn Kho</p>
            <p className="text-2xl font-bold">298</p>
          </div>
          <div className="text-[#5dff62] border p-2 rounded">
            <Boxes size={30} />
          </div>
        </div>
      </div>

      {/* Top sản phẩm & Tình trạng đơn hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top sản phẩm bán chạy */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top sản phẩm bán chạy</h2>
            <div className="flex gap-4">
              <select
                value={productYear}
                onChange={(e) => setProductYear(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <select
                value={productMonth}
                onChange={(e) => setProductMonth(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
                {/* Thêm các tháng khác nếu cần */}
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={200} />
              <Tooltip formatter={(value) => `${value} sản phẩm`} />
              <Bar dataKey="sold" fill="#62a6ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tình trạng đơn hàng */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tình trạng đơn hàng</h2>
            <div className="flex items-center gap-2">
              <select
                value={orderYear}
                onChange={(e) => setOrderYear(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="2025">Năm 2025</option>
                <option value="2024">Năm 2024</option>
              </select>
              <select
                value={orderMonth}
                onChange={(e) => setOrderMonth(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="deliveredOnly">Chỉ đã giao</option>
                <option value="processingOnly">Chỉ đang xử lý</option>
                <option value="canceledOnly">Chỉ đã huỷ</option>
                <option value="pendingOnly">Chỉ chờ xác nhận</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredOrderStatus()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {filteredOrderStatus().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} đơn`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Doanh thu theo tháng */}
      <div className="p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Doanh thu</h2>
          <div className="flex items-center gap-2">
            <select
              value={revenueType}
              onChange={(e) => setRevenueType(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="year">Theo năm</option>
              <option value="month">Theo tháng</option>
              <option value="week">Theo tuần</option>
              <option value="all">Tất cả</option>
            </select>
            <select
              value={revenueYear}
              onChange={(e) => setRevenueYear(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="2025">Năm 2025</option>
              <option value="2024">Năm 2024</option>
            </select>

            {(revenueType === "month" || revenueType === "week") && (
              <select
                value={revenueMonth}
                onChange={(e) => setRevenueMonth(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
            )}

            {revenueType === "week" && (
              <select
                value={revenueWeek}
                onChange={(e) => setRevenueWeek(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Tuần {i + 1}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN").format(value) + " ₫"
              }
            />
            <Bar dataKey="revenue" fill="#62a6ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
