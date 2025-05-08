import { memo } from "react";

const AddressBook = ({
  userInfo,
  handleUserInfoChange,
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
  handleChangeUserInfo,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Sổ địa chỉ
      </h2>
      <div className="p-4 space-y-6">
        {/* Họ tên & SĐT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm text-gray-600 font-semibold">
              Họ và tên
            </label>
            <input
              name="name"
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Nhập họ và tên"
              value={userInfo.name}
              onChange={handleUserInfoChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 font-semibold">
              Số điện thoại
            </label>
            <input
              name="phone"
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Nhập số điện thoại"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
            />
          </div>
        </div>

        {/* Địa chỉ hành chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 text-sm text-gray-600 font-semibold">
              Tỉnh / Thành phố
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            >
              <option>Chọn tỉnh / thành</option>
              {cities.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 font-semibold">
              Quận / Huyện
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            >
              <option>Chọn quận / huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600 font-semibold">
              Phường / Xã
            </label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            >
              <option>Chọn phường / xã</option>
              {wards.map((w) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Địa chỉ cụ thể */}
        <div>
          <label className="block mb-1 text-sm text-gray-600 font-semibold">
            Địa chỉ cụ thể
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            placeholder="Số nhà, tên đường..."
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        {/* Nút lưu */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleChangeUserInfo}
            className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            LƯU THAY ĐỔI
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddressBook);
