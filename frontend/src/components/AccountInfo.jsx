const AccountInfo = ({
  userInfo,
  handleUserInfoChange,
  handleChangeUserInfo,
}) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        Thông tin tài khoản
      </h2>
      <form>
        <div className="grid grid-cols-1 gap-6">
          {/* Họ tên */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-40 text-gray-700 font-medium">
              Họ Tên
            </label>
            <input
              value={userInfo.name}
              onChange={handleUserInfoChange}
              type="text"
              name="name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Nhập họ tên"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-40 text-gray-700 font-medium">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-40 text-gray-700 font-medium">
              Email
            </label>
            <p className="flex-1 text-gray-900">{userInfo.email}</p>
          </div>

          {/* Nút lưu */}
          <div className="flex justify-center mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleChangeUserInfo();
              }}
              type="submit"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;
