/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useToken } from "../context/TokenContextProvider";
import { images } from "../assets/assets";

const EditUserModal = ({ fetchUserData, id, isOpen, onClose }) => {
  const { backendUrl } = useToken();

  const [isLoading, setIsLoading] = useState(false)

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Lỗi lấy tỉnh/thành phố:", err));
  }, []);

  useEffect(() => {
    const selectedCityObj = cities.find((c) => c.name === selectedCity);
    if (selectedCityObj) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${selectedCityObj.code}?depth=2`
        )
        .then((res) => setDistricts(res.data.districts))
        .catch((err) => console.error("Lỗi lấy quận/huyện:", err));
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setWards([]);
  }, [selectedCity]);

  useEffect(() => {
    const selectedDistrictObj = districts.find(
      (d) => d.name === selectedDistrict
    );
    if (selectedDistrictObj) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${selectedDistrictObj.code}?depth=2`
        )
        .then((res) => setWards(res.data.wards))
        .catch((err) => console.error("Lỗi lấy phường/xã:", err));
    } else {
      setWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict]);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setUser(null);
      setName("");
      setPhone("");
      setEmail("");
      setStreet("");
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedWard("");
      setPassword("");
    }
  }, [isOpen]);

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(backendUrl + `/api/user/get/${id}`);
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      const u = response.data.user;
      setUser(u);
      setName(u.name);
      setPhone(u.phone);
      setEmail(u.email);
      setStreet(u.address.street);

      setSelectedCity(u.address.city);
      const cityObj = cities.find((c) => c.name === u.address.city);
      if (cityObj) {
        const districtRes = await axios.get(
          `https://provinces.open-api.vn/api/p/${cityObj.code}?depth=2`
        );
        setDistricts(districtRes.data.districts);

        setSelectedDistrict(u.address.district);
        const districtObj = districtRes.data.districts.find(
          (d) => d.name === u.address.district
        );
        if (districtObj) {
          const wardRes = await axios.get(
            `https://provinces.open-api.vn/api/d/${districtObj.code}?depth=2`
          );
          setWards(wardRes.data.wards);

          setSelectedWard(u.address.ward);
        }
      }
    } catch (err) {
      console.error("Lỗi khi load user:", err);
      toast.error("Đã có lỗi khi tải thông tin người dùng.");
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (cities.length > 0 && id) {
      fetchUser();
    }
  }, [cities, id]);

  const handleUpdateUser = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        backendUrl + `/api/user/check-password/${id}`,
        { password }
      );
  
      if (
        !name.match(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơưẠ-ỹ\s]+$/)
      ) {
        toast.error("Tên không hợp lệ!");
        return;
      }
  
      if (!phone.match(/^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/)) {
        toast.error("Số điện thoại không hợp lệ!");
        return;
      }
  
      if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/)) {
        toast.error("Email không hợp lệ!");
        return;
      }
  
      if (response.data.success) {
        const updateUser = {
          name,
          phone,
          email,
          address: {
            city: selectedCity,
            district: selectedDistrict,
            ward: selectedWard,
            street,
          },
        };
  
        const response2 = await axios.post(
          backendUrl + `/api/user/update/${id}`,
          updateUser
        );
        if (response2.data.success) {
          toast.success(response2.data.message);
          fetchUserData();
          onClose();
        } else {
          toast.error(response2.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalOverlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="relative bg-white border border-gray-300 rounded-xl p-6 w-full max-w-5xl shadow-xl">
        {isLoading && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <img src={images.Loading_icon} alt="loading" className="w-full" />
                  </div>
                )}
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-indigo-500 text-white rounded py-5">
            Cập nhật thông tin người dùng
          </h2>
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
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Họ tên..."
                className="border border-gray-300 px-3 py-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Email: </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email..."
                className="border border-gray-300 px-3 py-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label className="font-medium">Số điện thoại: </label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Số điện thoại..."
                className="border border-gray-300 px-3 py-2 w-full mb-4 rounded"
              />
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
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
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
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
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
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
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
                required
                placeholder="12 Nguyễn Văn Bảo"
                className="border border-gray-300 rounded-md px-3 py-2"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-5 border border-gray-300 rounded mt-8">
          <div className="flex flex-col gap-3">
            <label className="font-medium">
              Xác nhận mật khẩu để lưu thay đổi:
            </label>
            <div className="flex items-center justify-between gap-3 border border-gray-300 rounded-md px-3 mb-4 py-2">
              <input
                required
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
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Đóng
          </button>
          <button
            onClick={handleUpdateUser}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditUserModal);
