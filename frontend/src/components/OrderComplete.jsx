import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderComplete = () => {
  const order = useSelector((state) => state.order.order);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <CheckCircle size={72} className="mx-auto text-[#e60023] mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Đặt hàng thành công!</h2>
        <p className="text-gray-700 mb-2">
          Cảm ơn bạn đã lựa chọn mua sắm tại cửa hàng laptop của chúng tôi.
        </p>
        <p className="text-gray-700">
          Mã đơn hàng của bạn là:{" "}
          <span className="font-semibold text-[#e60023]">{order._id}</span>
        </p>
        <p className="text-gray-700 mb-6">Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
