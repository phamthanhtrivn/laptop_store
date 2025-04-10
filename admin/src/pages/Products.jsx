/* eslint-disable react-hooks/exhaustive-deps */
import {
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  Edit,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToken } from "../context/TokenContextProvider";
import { toast } from "react-toastify";
import axios from "axios";

const Products = () => {
  const { backendUrl, token } = useToken();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const formatMoney = (number) => {
    return number.toLocaleString('vi-VN')
  }

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + `/api/products?page=${page}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        toast.error("Không thể lấy dữ liệu người dùng!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [page]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5">Quản Lý Sản Phẩm</h1>
      <div className="flex justify-between items-start mt-8">
        <div>
          <div className="flex gap-5 text-gray-700 items-center">
            <label className="text-sm">Nhập tên sản phẩm cần tìm: </label>
            <input
              type="text"
              placeholder="ex: Laptop Acer Swift 3 SF314 511 55QE"
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            />
            <button className="items-center w-[250px] hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium">
              <Search />
              <p>Tìm kiếm</p>
            </button>
          </div>
          <div className="flex gap-10">
            <div className="flex gap-5 items-center text-gray-700 mt-5">
              <label className="text-sm">Danh mục:</label>
              <select className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none">
                <option value="">Tất cả</option>
              </select>
            </div>
            <div className="flex gap-5 items-center text-gray-700 mt-5">
              <label className="text-sm">Thương hiệu:</label>
              <select className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none">
                <option value="">Tất cả</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5 items-center text-gray-700 mt-5">
            <label className="text-sm">Tồn kho:</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none">
              <option value="">Tất cả</option>
              <option value="">Còn hàng</option>
              <option value="">Hết hàng</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <button className="hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium">
            <BookmarkPlus />
            <p>Thêm</p>
          </button>
          <button className="hover:bg-red-500 hover:text-white duration-300 transition-all cursor-pointer bg-white border border-red-500 text-red-500 flex px-4 py-2 rounded-md gap-5 font-medium">
            <RefreshCcw />
            <p>Tải lại</p>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-red-500 to-indigo-500 text-white text-sm">
              <th className="px-4 py-3">STT</th>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên sản phẩm</th>
              <th className="px-4 py-3">Loại sản phẩm</th>
              <th className="px-4 py-3">Tồn kho</th>
              <th className="px-4 py-3">Thương hiệu</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-center bg-white text-gray-800">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100 transition border-b">
                <td className="px-4 py-3">
                  {(page - 1) * pagination.limitPerPage + index + 1}
                </td>
                <td className="px-4 py-3 flex justify-center">
                  <img className="w-15" src={product.images[0]} alt="" />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3">{formatMoney(product.price)} VNĐ</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-4">
                    <button className="text-yellow-500 hover:text-yellow-600 transition cursor-pointer">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-600 transition cursor-pointer">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <div className="text-sm mt-6">
          Tổng số sản phẩm: {pagination.totalProducts}
        </div>
        <div className="flex justify-center items-center gap-5 mt-6">
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

export default Products;
