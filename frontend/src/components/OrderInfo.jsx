const OrderInfo = ({
  customerInfo,
  handleCustomerInfoChange,
  calculateTotal,
  handleNextStep,
  handlePrevStep,
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Thông tin khách mua hàng</h2>

      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={customerInfo.gender === "male"}
              onChange={handleCustomerInfoChange}
              className="mr-2"
            />
            Anh
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={customerInfo.gender === "female"}
              onChange={handleCustomerInfoChange}
              className="mr-2"
            />
            Chị
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Nhập họ tên</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
              placeholder="Trí Thành"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Nhập số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleCustomerInfoChange}
              placeholder="0398694335"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-medium mb-4">Chọn cách nhận hàng</h2>

      <div className="mb-4">
        <label className="flex items-center mb-4">
          <input
            type="radio"
            name="deliveryMethod"
            value="delivery"
            checked={customerInfo.deliveryMethod === "delivery"}
            onChange={handleCustomerInfoChange}
            className="mr-2"
          />
          Giao hàng tận nơi
        </label>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <select
                name="city"
                value={customerInfo.city}
                onChange={handleCustomerInfoChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Hồ Chí Minh</option>
              </select>
            </div>
            <div>
              <select
                name="district"
                value={customerInfo.district}
                onChange={handleCustomerInfoChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Quận Gò Vấp</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="ward"
                value={customerInfo.ward}
                onChange={handleCustomerInfoChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Phường 15</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                placeholder="200 An Nhơn"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          name="note"
          value={customerInfo.note}
          onChange={handleCustomerInfoChange}
          placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="invoice"
            checked={customerInfo.invoice}
            onChange={handleCustomerInfoChange}
            className="mr-2"
          />
          Xuất hoá đơn cho đơn hàng
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Dịch vụ giao hàng</h3>
        <label className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="radio" name="shippingService" checked={true} className="mr-2" />
            Miễn phí vận chuyển (Giao hàng tiêu chuẩn)
          </div>
          <span>0đ</span>
        </label>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span>Phí vận chuyển:</span>
          <span className="font-medium">Miễn phí</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Tổng tiền:</span>
          <span className="text-xl font-bold text-red-600">
            {calculateTotal().toLocaleString()}đ
          </span>
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
            ĐẶT HÀNG NGAY
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Bạn có thể chọn hình thức thanh toán sau khi đặt hàng
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;