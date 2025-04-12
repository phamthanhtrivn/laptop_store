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
import React, { useEffect, useRef, useState } from "react";
import { useToken } from "../context/TokenContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Products = () => {
  const { backendUrl, token } = useToken();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const searchRef = useRef("");
  const [selectedCate, setSelectedCate] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [productID, setProductID] = useState("");

  const applyFilters = () => {
    fetchProductsData()
    setPage(1);
  };

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa người dùng này không?",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      denyButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(
          backendUrl + `/api/products/delete/${id}`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          Swal.fire(response.data.message, "", "success");
          fetchProductsData();
        } else {
          Swal.fire(response.data.message);
        }
      }
    });
  };

  const formatMoney = (number) => {
    return number.toLocaleString("vi-VN");
  };

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/products`, {
        params: {
          page,
          search: searchRef.current.value,
          brand: selectedBrand,
          category: selectedCate,
          stock: selectedStock,
        },
        headers: { token },
      });
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

  const handleRefresh = () => {
    searchRef.current.value = "";
    setSelectedBrand("");
    setSelectedCate("");
    setSelectedStock("");
    setPage(1)
  };

  const handleIDProduct = (id) => {
    setProductID(id);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchProductsData();
  }, [page, selectedBrand, selectedCate, selectedStock]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5">Quản Lý Sản Phẩm</h1>
      <div className="flex justify-between items-start mt-8">
        <div>
          <div className="flex gap-5 text-gray-700 items-center">
            <label className="text-sm">Nhập tên sản phẩm cần tìm: </label>
            <input
              ref={searchRef}
              type="text"
              placeholder="ex: Laptop Acer Swift 3 SF314 511 55QE"
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            />
          </div>
          <div className="flex gap-10">
            <div className="flex gap-5 items-center text-gray-700 mt-5">
              <label className="text-sm">Danh mục:</label>
              <select
                value={selectedCate}
                onChange={(e) => setSelectedCate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none"
              >
                <option value="">Tất cả</option>
                <option value="Đồ họa - Studio">Đồ họa - Studio</option>
                <option value="Học sinh - Sinh viên">
                  Học sinh - Sinh viên
                </option>
                <option value="Mỏng nhẹ cao cấp">Mỏng nhẹ cao cấp</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            <div className="flex gap-5 items-center text-gray-700 mt-5">
              <label className="text-sm">Thương hiệu:</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none"
              >
                <option value="">Tất cả</option>
                <option value="ASUS">ASUS</option>
                <option value="ACER">ACER</option>
                <option value="MSI">MSI</option>
                <option value="LENOVO">LENOVO</option>
                <option value="DELL">DELL</option>
                <option value="HP">HP</option>
                <option value="LG">LG</option>
              </select>
            </div>
          </div>
          <div className="flex gap-10 items-center text-gray-700 mt-5">
            <label className="text-sm">Tồn kho:</label>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-[200px] outline-none"
            >
              <option value="">Tất cả</option>
              <option value="in-stock">Còn hàng</option>
              <option value="out-of-stock">Hết hàng</option>
            </select>
            <button onClick={applyFilters} className="hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium">
              <Search />
              <p>Tìm kiếm</p>
            </button>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium"
          >
            <BookmarkPlus />
            <p>Thêm</p>
          </button>
          <button
            onClick={handleRefresh}
            className="hover:bg-red-500 hover:text-white duration-300 transition-all cursor-pointer bg-white border border-red-500 text-red-500 flex px-4 py-2 rounded-md gap-5 font-medium"
          >
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
                      <Edit
                        onClick={() => handleIDProduct(product._id)}
                        className="w-5 h-5"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-500 hover:text-red-600 transition cursor-pointer"
                    >
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
      {showAddModal && (
        <AddProductModal
          fetchProductsData={fetchProductsData}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showEditModal && (
        <EditProductModal
          id={productID}
          fetchProductsData={fetchProductsData}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Products;
