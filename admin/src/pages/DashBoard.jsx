/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import { useToken } from "../context/TokenContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { backendUrl } = useToken();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bestSellingProduct, setBestSellingProduct] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Tổng Doanh Thu",
      value: "0",
      unit: "VNĐ",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      id: 2,
      title: "Sản Phẩm Bán Chạy",
      value: "Chưa có dữ liệu",
      icon: Package,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Tổng Đơn Hàng",
      value: "0",
      icon: ShoppingCart,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Tổng Người Dùng",
      value: "0",
      icon: Users,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 86400000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueResponse = await axios.get(
          backendUrl + "/api/orders/total-revenue"
        );
        if (revenueResponse.data.success) {
          setTotalRevenue(revenueResponse.data.totalRevenue);
        }

        const productResponse = await axios.get(
          backendUrl + "/api/orders/best-selling"
        );
        if (productResponse.data.success) {
          setBestSellingProduct(productResponse.data.product);
        }

        const ordersResponse = await axios.get(
          backendUrl + "/api/orders/total-orders"
        );
        if (ordersResponse.data.success) {
          setTotalOrders(ordersResponse.data.totalOrders);
        }

        const usersResponse = await axios.get(
          backendUrl + "/api/user/total-users"
        );
        if (usersResponse.data.success) {
          setTotalUsers(usersResponse.data.totalUsers);
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải dữ liệu: " + error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setStats((prevStats) =>
      prevStats.map((stat) => {
        if (stat.id === 1) {
          return {
            ...stat,
            value: totalRevenue.toLocaleString("vi-VN") + " VNĐ",
          };
        } else if (stat.id === 2) {
          return {
            ...stat,
            value: bestSellingProduct
              ? bestSellingProduct.name
              : "Chưa có dữ liệu",
          };
        } else if (stat.id === 3) {
          return {
            ...stat,
            value: totalOrders.toLocaleString("vi-VN") + " đơn hàng",
          };
        } else if (stat.id === 4) {
          return {
            ...stat,
            value: totalUsers.toLocaleString("vi-VN") + " người dùng",
          };
        }
        return stat;
      })
    );
  }, [totalRevenue, bestSellingProduct, totalOrders, totalUsers]);

  return (
    <div className="relative z-10 min-h-screen p-8 mt-5">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold ">
              Chào mừng trở lại, Admin! 👋
            </h1>
            <p className="text-lg text-gray-700">
              Hôm nay là{" "}
              {currentTime.toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 mt-15">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
}