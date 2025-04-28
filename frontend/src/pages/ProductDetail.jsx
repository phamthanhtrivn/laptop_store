/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { backendUrl } from "../config/config";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/products/get/${id}`
      );
      if (response.data.success) {
        setProduct(response.data.product);
        setImage(response.data.product.images[0]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return null;

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen">
      {/* Breadcrumbs */}
      <div className="py-9">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-blue-600">
            Sản phẩm
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Ảnh sản phẩm */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-all duration-300"
            />
          </div>

          {/* Thumbnails - responsive */}
          <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto md:overflow-visible">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setImage(img)}
                className={`min-w-[4.5rem] h-20 border-2 rounded-lg overflow-hidden ${
                  image === img ? "border-red-500" : "border-transparent"
                } hover:border-red-400 transition`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-contain" // Chỉnh sửa object-contain để giữ tỷ lệ ảnh
                />
              </button>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 text-lg mt-1">Hãng: {product.brand}</p>
          </div>

          <div className="space-y-2">
            <p className="text-red-600 text-3xl font-extrabold">
              {product.price.toLocaleString()}₫
            </p>
            <p className="text-sm text-gray-500">
              {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
            </p>
            <div className="flex flex-row gap-4 mt-5">
              <input min={1} max={99} type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-1/3 border border-gray-300 px-3 rounded-xl" />
              <button 
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
                disabled={product.stock <= 0}
                className="w-full py-3 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-50 transition"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          <div>
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Thông số kỹ thuật */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Thông số kỹ thuật
            </h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <strong>CPU:</strong> {product.specs.cpu}
              </li>
              <li>
                <strong>RAM:</strong> {product.specs.ram}
              </li>
              <li>
                <strong>Lưu trữ:</strong> {product.specs.storage}
              </li>
              <li>
                <strong>Card đồ họa:</strong> {product.specs.gpu}
              </li>
              <li>
                <strong>Màn hình:</strong> {product.specs.screen}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
