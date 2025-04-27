const Payment = ({
  customerInfo,
  paymentMethod,
  setPaymentMethod,
  calculateTotal,
  handleNextStep,
  handlePrevStep,
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Thông tin đặt hàng</h2>

      <div className="mb-6">
        <ul className="space-y-3">
          <li className="flex">
            <span className="w-1/3 text-gray-600">• Khách hàng:</span>
            <span className="w-2/3">{customerInfo.name || "Trí Thành"}</span>
          </li>
          <li className="flex">
            <span className="w-1/3 text-gray-600">• Số điện thoại:</span>
            <span className="w-2/3">{customerInfo.phone || "0398694335"}</span>
          </li>
          <li className="flex">
            <span className="w-1/3 text-gray-600">• Địa chỉ nhận hàng:</span>
            <span className="w-2/3">
              {customerInfo.address || "200 An Nhơn"},{" "}
              {customerInfo.ward || "Phường 15"},{" "}
              {customerInfo.district || "Quận Gò Vấp"},{" "}
              {customerInfo.city || "Hồ Chí Minh"}
            </span>
          </li>
          <li className="flex">
            <span className="w-1/3 text-gray-600">• Tạm tính:</span>
            <span className="w-2/3 text-red-600">{calculateTotal().toLocaleString()}đ</span>
          </li>
          <li className="flex">
            <span className="w-1/3 text-gray-600">• Phí vận chuyển:</span>
            <span className="w-2/3">Miễn phí</span>
          </li>
          <li className="flex">
            <span className="w-1/3 text-gray-600">• Tổng tiền:</span>
            <span className="w-2/3 text-red-600 font-bold">{calculateTotal().toLocaleString()}đ</span>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <button className="flex items-center text-blue-600 hover:underline mb-6">
          <span className="mr-1">Sử dụng mã giảm giá</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <h2 className="text-xl font-medium mb-4">Chọn hình thức thanh toán</h2>

      <div className="space-y-4 mb-6">
        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40&text=COD"
              alt="COD"
              className="w-10 h-10 mr-3"
            />
            <span>Thanh toán khi giao hàng (COD)</span>
          </div>
        </label>

        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="momo"
            checked={paymentMethod === "momo"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40&text=MOMO"
              alt="MoMo"
              className="w-10 h-10 mr-3"
            />
            <span>Thanh toán MoMo</span>
          </div>
        </label>

        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="vnpay"
            checked={paymentMethod === "vnpay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40&text=VNPAY"
              alt="VNPay"
              className="w-10 h-10 mr-3"
            />
            <span>Thanh toán VNPay</span>
          </div>
        </label>

        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40&text=BANK"
              alt="Bank Transfer"
              className="w-10 h-10 mr-3"
            />
            <span>Chuyển khoản ngân hàng</span>
          </div>
        </label>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span>Phí vận chuyển:</span>
          <span className="font-medium">Miễn phí</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Tổng tiền:</span>
          <span className="text-xl font-bold text-red-600">{calculateTotal().toLocaleString()}đ</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePrevStep}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </button>
          <button
            onClick={handleNextStep}
            className="flex-1 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            THANH TOÁN NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;