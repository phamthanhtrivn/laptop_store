import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../store/cartSlice";

const CartItems = ({ handleNextStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Giỏ hàng trống</h3>
          <p className="text-gray-500 mb-5">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link
            to="/products"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((product) => (
            <div
              key={product._id}
              className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-gray-300"
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  onClick={() => navigate(`/product/${product._id}`)}
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-contain border border-gray-300 rounded cursor-pointer"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-red-600 font-bold">
                      {product.price.toLocaleString()}đ
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(product._id))}
                    className="text-gray-500 text-sm flex items-center mt-2 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Xóa
                  </button>
                </div>
              </div>
              <div className="flex items-center ml-auto rounded-lg border overflow-hidden">
                {/* Minus Button */}
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ productID: product._id, quantity: -1 })
                    )
                  }
                  className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <Minus size={18} />
                </button>

                {/* Quantity Input */}
                <input
                  type="text"
                  readOnly
                  value={product.quantity}
                  className="w-12 h-10 text-center text-base border-x focus:outline-none"
                />

                {/* Plus Button */}
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ productID: product._id, quantity: 1 })
                    )
                  }
                  className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng tiền:</span>
              <span className="text-xl font-bold text-red-600">
                {totalPrice.toLocaleString()}đ
              </span>
            </div>
            <button
              disabled
              onClick={handleNextStep}
              className="w-full bg-red-600 text-white py-3 rounded-md mt-4 font-medium hover:bg-red-700 cursor-pointer"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
