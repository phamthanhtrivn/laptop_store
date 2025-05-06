const AccountInfo = ({ userInfo, handleUserInfoChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Thông tin tài khoản
      </h2>
      <form>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-32 text-gray-700 mb-2 md:mb-0">Họ Tên</label>
            <input
              value={userInfo.name}
              onChange={handleUserInfoChange}
              type="text"
              name="name"
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-32 text-gray-700 mb-2 md:mb-0">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="w-32 text-gray-700 mb-2 md:mb-0">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
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
      </form>
    </div>
  );
};

export default AccountInfo;