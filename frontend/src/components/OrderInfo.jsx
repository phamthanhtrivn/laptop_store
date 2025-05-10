const OrderInfo = ({
  userInfo,
  handleUserInfoChange,
  note,
  setNote,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  street,
  setStreet,
  cities,
  districts,
  wards,
  totalPrice,
  handleOrderInfo,
  handlePrevStep,
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Thông tin khách mua hàng</h2>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Họ tên</label>
            <input
              value={userInfo.name}
              onChange={handleUserInfoChange}
              type="text"
              name="name"
              placeholder="Nhập họ và tên"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Số điện thoại
            </label>
            <input
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              type="tel"
              name="phone"
              placeholder="Nhập số điện thoại"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-medium mb-4">Địa chỉ giao hàng</h2>

      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                name="city"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn tỉnh / thành</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                name="district"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Chọn quận / huyện</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                name="ward"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Chọn phường / xã</option>
                {wards.map((w) => (
                  <option key={w.code} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Nhập địa chỉ cụ thể (số nhà, tên đường)"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          name="note"
          placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span>Phí vận chuyển:</span>
          <span className="font-medium">Miễn phí</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Tổng tiền:</span>
          <span className="text-xl font-bold text-red-600">{totalPrice.toLocaleString()}đ</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePrevStep}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </button>
          <button
            onClick={handleOrderInfo}
            className="flex-1 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            THANH TOÁN
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
