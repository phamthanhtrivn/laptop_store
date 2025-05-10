import { images } from "../assets/assets";

const Payment = ({
  userInfo,
  paymentMethod,
  setPaymentMethod,
  totalPrice,
  selectedCity,
  selectedDistrict,
  selectedWard,
  street,
  handlePlaceOrder,
  handlePrevStep,
}) => {
  return (
    <div className="space-y-8 bg-gray-50 p-4 sm:p-8 rounded-lg shadow-md">
      {/* Thông tin đặt hàng */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin đặt hàng</h2>
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
            <span className="w-2/3 text-red-600">{totalPrice.toLocaleString()}đ</span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Phí vận chuyển:</span>
            <span className="w-2/3 text-green-600 font-semibold">Miễn phí</span>
          </li>
          <li className="flex">
            <span className="w-1/3 font-medium">• Tổng tiền:</span>
            <span className="w-2/3 text-xl text-red-600 font-bold">
              {totalPrice.toLocaleString()}đ
            </span>
          </li>
        </ul>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chọn hình thức thanh toán</h2>
        <div className="space-y-4">
          {[
            { value: "COD", label: "Thanh toán khi giao hàng (COD)", image: images.cod },
            { value: "MoMo", label: "Thanh toán MoMo", image: images.momo },
            { value: "VnPay", label: "Thanh toán VNPay", image: images.vnpay },
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
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Phí vận chuyển:</span>
            <span className="font-medium text-green-600">Miễn phí</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-800">Tổng tiền:</span>
            <span className="text-2xl font-bold text-red-600">{totalPrice.toLocaleString()}đ</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handlePrevStep}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Quay lại
            </button>
            <button
              onClick={handlePlaceOrder}
              className="w-full sm:flex-1 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
