import { images } from "../assets/assets";
import { useState } from "react";

const Payment = ({
  userInfo,
  paymentMethod,
  setPaymentMethod,
  totalPrice,
  selectedCity,
  selectedDistrict,
  selectedWard,
  street,
  handlePrevStep,
  handlePlaceOrder,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    if (isLoading) return;
    setIsLoading(true);
    handlePlaceOrder();
  };

  return (
    <div className="p-4 space-y-8 rounded-lg shadow-md bg-gray-50 sm:p-8">
      {/* Thông tin đặt hàng */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Thông tin đặt hàng
        </h2>
        <ul className="space-y-4 text-base text-gray-700">
          <li className="flex">
            <span className="w-1/3 font-medium">• Khách hàng:</span>
            <span className="w-2/3">{userInfo.name}</span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Số điện thoại:</span>
            <span className="w-2/3">{userInfo.phone}</span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Địa chỉ nhận hàng:</span>
            <span className="w-2/3">
              {street}, {selectedWard}, {selectedDistrict}, {selectedCity}
            </span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Tạm tính:</span>
            <span className="w-2/3 text-red-600">
              {totalPrice.toLocaleString()}đ
            </span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Phí vận chuyển:</span>
            <span className="w-2/3 font-semibold text-green-600">Miễn phí</span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Tổng tiền:</span>
            <span className="w-2/3 text-xl font-bold text-red-600">
              {totalPrice.toLocaleString()}đ
            </span>
          </li>
        </ul>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Chọn hình thức thanh toán
        </h2>
        <div className="space-y-4">
          {[
            {
              value: "COD",
              label: "Thanh toán khi giao hàng (COD)",
              image: images.cod,
            },
            { value: "MoMo", label: "Thanh toán MoMo", image: images.momo },
            { value: "VNPay", label: "Thanh toán VNPay", image: images.vnpay },
          ].map(({ value, label, image }) => (
            <label
              key={value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                paymentMethod === value ? "border-red-500 bg-red-50" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={value}
                checked={paymentMethod === value}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-4 accent-red-600"
              />
              <img src={image} alt={label} className="w-8 h-auto mr-4" />
              <span className="text-base">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tổng kết và hành động */}
      <div className="p-6 bg-white shadow rounded-xl">
        <div className="pt-4 space-y-3 border-t">
          <div className="flex justify-between text-gray-600">
            <span>Phí vận chuyển:</span>
            <span className="font-medium text-green-600">Miễn phí</span>
          </div>
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold text-gray-800">Tổng tiền:</span>
            <span className="text-2xl font-bold text-red-600">
              {totalPrice.toLocaleString()}đ
            </span>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              onClick={handlePrevStep}
              className="w-full px-6 py-3 transition border border-gray-300 rounded-lg sm:w-auto hover:bg-gray-100"
              disabled={isLoading}
            >
              Quay lại
            </button>
            <button
              onClick={handlePayment}
              className={`w-full py-3 font-semibold text-white transition rounded-lg sm:flex-1 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "ĐẶT HÀNG"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
