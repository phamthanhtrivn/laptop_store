import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailed = () => {
  return (
    <div className="max-w-4xl px-4 py-8 mx-auto text-center">
      <XCircle className="w-16 h-16 mx-auto text-red-600" />
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Thanh toán thất bại!
      </h2>
      <p className="mt-2 text-gray-600">
        Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
      </p>
      <Link
        to="/cart"
        className="inline-block px-6 py-3 mt-6 text-white bg-red-600 rounded-lg hover:bg-red-700"
      >
        Quay lại giỏ hàng
      </Link>
    </div>
  );
};

export default PaymentFailed;