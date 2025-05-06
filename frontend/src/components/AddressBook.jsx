const AddressBook = ({
  userInfo,
  handleUserInfoChange,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  cities,
  districts,
  wards,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sổ địa chỉ</h2>
      <div className="border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Nhập họ và tên"
              value={userInfo.name}
              onChange={handleUserInfoChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Số điện thoại
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Nhập số điện thoại"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Tỉnh / Thành phố
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              {cities.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Quận / Huyện
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              {districts.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Phường / Xã
            </label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              {wards.map((w) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Địa chỉ cụ thể
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Số nhà, tên đường..."
            defaultValue="200 An Nhơn"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            LƯU THAY ĐỔI
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
