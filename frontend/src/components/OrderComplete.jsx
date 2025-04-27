import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  return (
    <div className="text-center py-10">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
      <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại TechLaptop</p>
      <p className="text-gray-600 mb-2">
        Mã đơn hàng của bạn: <span className="font-medium">TL123456789</span>
      </p>
      <p className="text-gray-600 mb-6">
        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Về trang chủ
        </Link>
        <Link
          to="/products"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;