/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const [laptops, setLaptops] = useState([]);
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    currentPage: 1,
    totalPages: 0,
    limitPerPage: 9,
  });

  const priceRanges = [
    { label: "Mặc định", min: 0, max: 0 },
    { label: "Dưới 10 triệu", min: 0, max: 10000000 },
    { label: "10 triệu - 20 triệu", min: 10000000, max: 20000000 },
    { label: "20 triệu - 30 triệu", min: 20000000, max: 30000000 },
    { label: "Trên 30 triệu", min: 30000000, max: 50000000 },
  ];

  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

  const handleChange = (range) => {
    setSelectedRange(range);
  };

  const fetchLaptops = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/users",
        {
          params: {
            page: pagination.currentPage,
            search: "",
            brand: "",
            category: "",
            sort: "",
            price: {
              min: selectedRange.min,
              max: selectedRange.max,
            },
          },
        }
      );
      if (response.data.success) {
        setLaptops(response.data.products);
        setPagination({
          totalProducts: response.data.pagination.totalProducts,
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
          limitPerPage: response.data.pagination.limitPerPage,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching laptops:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, [pagination.currentPage]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col min-h-screen pb-10">
      <div className="">
        <div className="container mx-auto px-4 p-9">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600">
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="font-medium text-gray-900">Sản phẩm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Bộ lọc</h2>
                <button className="text-sm text-blue-600 hover:underline">
                  Xóa bộ lọc
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Khoảng giá</h3>

                <div className="space-y-4">
                  {priceRanges.map((range, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={
                          selectedRange.min === range.min &&
                          selectedRange.max === range.max
                        }
                        onChange={() => handleChange(range)}
                        className="form-radio text-rose-600"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
                
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Thương hiệu</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[
                    "ASUS",
                    "ACER",
                    "MSI",
                    "LENOVO",
                    "DELL",
                    "HP",
                    "LG"
                  ].map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input type="checkbox" className="rounded" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {[
                    "Đồ họa - Studio",
                    "Học sinh - Sinh viên",
                    "Mỏng nhẹ cao cấp",
                    "Gaming"
                  ].map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input type="checkbox" className="rounded" />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-500 hidden md:inline">
                Sắp xếp theo:
              </span>
              <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="featured">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Có tất cả {pagination.totalProducts} sản phẩm
              </p>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {/* Sample products - repeated for demonstration */}
              {laptops.map((laptop, index) => (
                <ProductItem key={index} product={laptop} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: Math.max(prev.currentPage - 1, 1),
                    }))
                  }
                  className={`bg-rose-600 text-white px-4 py-2 rounded-lg transition duration-300 ${
                    pagination.currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-rose-700"
                  }`}
                >
                  &lt;
                </button>
                <button className="px-4 py-2">{pagination.currentPage}</button>
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
                  className={`bg-rose-600 text-white px-4 py-2 rounded-lg transition duration-300 ${
                    pagination.currentPage === pagination.totalPages
                      ? "cursor-not-allowed"
                      : "hover:bg-rose-700"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
