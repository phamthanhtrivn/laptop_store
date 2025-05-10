/* eslint-disable react-hooks/exhaustive-deps */
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart, updateCartItemQuantity } from "../store/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CartItems = ({ cartItems, handleNextStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartStatus = useSelector((state) => state.cart.status);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loadingItems, setLoadingItems] = useState({});


  const handleRemoveItem = async (productID) => {
    if (loadingItems[productID]) return;
    try {
      Swal.fire({
        title: "Bạn có muốn xóa sản phẩm này không?",
        text: "Sản phẩm sẽ bị xóa khỏi giỏ hàng",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Hủy",
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setLoadingItems((prev) => ({ ...prev, [productID]: true }));
          await dispatch(deleteItemFromCart(productID)).unwrap();
          Swal.fire("Xóa thành công", "", "success");
        }
      });
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.message || "Có lỗi xảy ra khi cập nhật số lượng sản phẩm!"
      );
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productID]: false }));
    }
  };

  const handleUpdateQuantity = async (productID, change) => {
    if (loadingItems[productID]) return;
    const product = cartItems.find((item) => item._id === productID);
    if (!product) return;

    const newQuantity = product.quantity + change;
    if (newQuantity < 1) return;

    setLoadingItems((prev) => ({ ...prev, [productID]: true }));
    try {
      await dispatch(
        updateCartItemQuantity({ productID, quantity: newQuantity })
      ).unwrap();
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.message || "Có lỗi xảy ra khi cập nhật số lượng sản phẩm!"
      );
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productID]: false }));
    }
  };

  const handleOrder = () => {
    if (isAuthenticated) {
      handleNextStep();
    } else {
      Swal.fire({
        title: "Vui lòng đăng nhập để đặt hàng",
        text: "Bạn sẽ được chuyển đến trang đăng nhập",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Hủy",
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div>
      {cartStatus === "loading" ? (
        <div className="text-center py-10">
          <p className="text-xl font-medium">Đang tải giỏ hàng...</p>
        </div>
      ) : cartItems.length === 0 ? (
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
                    onClick={() => handleRemoveItem(product._id)}
                    disabled={loadingItems[product._id]}
                    className={`text-gray-500 text-sm flex items-center mt-2 transition ${
                      loadingItems[product._id]
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:text-red-600 cursor-pointer"
                    }`}
                  >
                    <Trash2 size={16} className="mr-1" />
                    {loadingItems[product._id] ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              </div>
              <div className="flex items-center ml-auto rounded-lg border overflow-hidden">
                <button
                  onClick={() => handleUpdateQuantity(product._id, -1)}
                  disabled={loadingItems[product._id] || product.quantity <= 1}
                  className={`h-10 w-10 flex items-center justify-center text-gray-600 transition-all ${
                    loadingItems[product._id] || product.quantity <= 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  <Minus size={18} />
                </button>

                <input
                  type="text"
                  readOnly
                  value={product.quantity}
                  className="w-12 h-10 text-center text-base border-x bg-gray-50"
                />

                <button
                  onClick={() => handleUpdateQuantity(product._id, 1)}
                  disabled={loadingItems[product._id]}
                  className={`h-10 w-10 flex items-center justify-center text-gray-600 transition-all ${
                    loadingItems[product._id]
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
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
              onClick={handleOrder}
              className={`w-full bg-red-600 text-white py-3 rounded-md mt-4 font-medium transition hover:bg-red-700 cursor-pointer`}
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
