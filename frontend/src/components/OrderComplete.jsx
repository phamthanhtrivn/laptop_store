/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeCart } from "../store/cartSlice";

const OrderComplete = () => {
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();

  const initializeCartFromUser = async () => {
    await dispatch(initializeCart()).unwrap();
  };

  useEffect(() => {
    initializeCartFromUser();
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg p-8 text-center bg-white shadow-lg rounded-xl">
        <CheckCircle size={72} className="mx-auto text-[#e60023] mb-4" />
        <h2 className="mb-3 text-3xl font-bold text-gray-900">
          Đặt hàng thành công!
        </h2>
        <p className="mb-2 text-gray-700">
          Cảm ơn bạn đã lựa chọn mua sắm tại cửa hàng laptop của chúng tôi.
        </p>
        <p className="text-gray-700">
          Mã đơn hàng của bạn là:{" "}
          <span className="font-semibold text-[#e60023]">{order._id}</span>
        </p>
        <p className="mb-6 text-gray-700">
          Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#e60023] text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Về trang chủ
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto px-6 py-3 border border-[#e60023] text-[#e60023] rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
