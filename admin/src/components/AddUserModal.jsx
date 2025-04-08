/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const AddUserModal = ({ isOpen, onClose }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [street, setStreet] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Lỗi lấy tỉnh/thành phố:", err));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
        .then((res) => setDistricts(res.data.districts))
        .catch((err) => console.error("Lỗi lấy quận/huyện:", err));
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(null);
    setWards([]);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
        )
        .then((res) => setWards(res.data.wards))
        .catch((err) => console.error("Lỗi lấy phường/xã:", err));
    } else {
      setWards([]);
    }
    setSelectedWard(null);
  }, [selectedDistrict]);

  const handleAddUser = async () => {
    toast.success("Đã thêm người dùng!");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalOverlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="bg-white border border-gray-300 rounded-xl p-6 w-full max-w-5xl shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Thêm người dùng</h2>
        </div>

        <div className="flex gap-10 justify-between">
          <div className="border border-gray-300 p-5 rounded w-1/2">
            <div>
              <p className="text-xl font-semibold mb-6">
                Thông tin cá nhân <span className="text-red-500">*</span>
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Họ và tên: </label>
              <input
                type="text"
                placeholder="Họ tên..."
                className="border border-gray-300 px-3 py-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Email: </label>
              <input
                type="email"
                placeholder="Email..."
                className="border border-gray-300 px-3 py-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Số điện thoại: </label>
              <input
                type="number"
                placeholder="Số điện thoại..."
                className="border border-gray-300 px-3 py-2 w-full mb-4 rounded"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-medium">Mật khẩu:</label>
              <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-md px-3 mb-4 py-2">
                <input
                  placeholder="..."
                  className="border-none outline-none w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-medium">Nhập lại mật khẩu:</label>
              <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-md px-3 mb-4 py-2">
                <input
                  placeholder="..."
                  className="border-none outline-none w-full"
                  type={showPassword2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 p-5 rounded w-1/2">
            <div>
              <p className="text-xl font-semibold mb-6">
                Địa chỉ người dùng <span className="text-red-500">*</span>
              </p>
              <hr className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Tỉnh / Thành phố:</label>
              <select
                value={selectedCity?.name || ""}
                onChange={(e) =>
                  setSelectedCity(
                    cities.find((c) => c.name === Number(e.target.value))
                  )
                }
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">--Chọn tỉnh/thành phố--</option>
                {cities.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Quận / Huyện:</label>
              <select
                value={selectedDistrict?.name || ""}
                onChange={(e) =>
                  setSelectedDistrict(
                    districts.find((d) => d.name === Number(e.target.value))
                  )
                }
                className="border border-gray-300 rounded-md px-3 py-2"
                disabled={!selectedCity}
              >
                <option value="">--Chọn quận/huyện--</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Phường / Xã:</label>
              <select
                value={selectedWard?.name || ""}
                onChange={(e) =>
                  setSelectedWard(
                    wards.find((w) => w.name === Number(e.target.value))
                  )
                }
                className="border border-gray-300 rounded-md px-3 py-2"
                disabled={!selectedDistrict}
              >
                <option value="">--Chọn phường/xã--</option>
                {wards.map((w) => (
                  <option key={w.code} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Địa chỉ:</label>
              <input
                placeholder="12 Nguyễn Văn Bảo"
                className="border border-gray-300 rounded-md px-3 py-2"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Đóng
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddUserModal);
