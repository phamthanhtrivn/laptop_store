import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../store/cartSlice";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      await dispatch(addItemToCart({ ...product, quantity: 1 })).unwrap();
      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.message || "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!"
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow transition-all hover:shadow-lg">
      <Link to={`/product/${product._id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View</span>
      </Link>

      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          width={600}
          height={400}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="self-start rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {product.category}
        </div>

        <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-red-600">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`cursor-pointer relative inline-flex items-center gap-1 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all z-20 ${
              isAdding ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {isAdding ? "Đang thêm..." : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
