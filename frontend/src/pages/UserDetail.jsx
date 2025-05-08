/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth, logout, updateUser } from "../store/authSlice";
import UserSidebar from "../components/UserSideBar";
import AccountInfo from "../components/AccountInfo";
import AddressBook from "../components/AddressBook";
import OrderManagement from "../components/OrderManagement";
import { useNavigate } from "react-router-dom";
import { initializeCart } from "../store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user || !user.address) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const updatedUserInfo = {
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        };
        setUserInfo(updatedUserInfo);
        setStreet(user.address.street || "");

        setSelectedCity(user.address.city || "");
        const cityObj = cities.find((c) => c.name === user.address.city);
        if (cityObj) {
          const districtRes = await axios.get(
            `https://provinces.open-api.vn/api/p/${cityObj.code}?depth=2`
          );
          setDistricts(districtRes.data.districts || []);

          setSelectedDistrict(user.address.district || "");
          const districtObj = districtRes.data.districts.find(
            (d) => d.name === user.address.district
          );
          if (districtObj) {
            const wardRes = await axios.get(
              `https://provinces.open-api.vn/api/d/${districtObj.code}?depth=2`
            );
            setWards(wardRes.data.wards || []);
            setSelectedWard(user.address.ward || "");
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [user, cities]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleChangeUserInfo = async () => {
    try {
      if (
        !userInfo.name.match(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơưẠ-ỹ\s]+$/
        )
      ) {
        toast.error("Tên không hợp lệ!");
        return;
      }

      if (
        !userInfo.phone.match(
          /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/
        )
      ) {
        toast.error("Số điện thoại không hợp lệ!");
        return;
      }

      if (!selectedCity || !selectedDistrict || !selectedWard || !street) {
        toast.error("Vui lòng chọn đầy đủ địa chỉ!");
        return;
      }

      const updatedUser = {
        name: userInfo.name.trim(),
        phone: userInfo.phone.trim(),
        city: selectedCity.trim(),
        district: selectedDistrict.trim(),
        ward: selectedWard.trim(),
        street: street.trim(),
      };

      await dispatch(updateUser(updatedUser)).unwrap();
      await dispatch(initializeAuth()).unwrap();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  };

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "Bạn có muốn đăng xuất không?",
        text: "Bạn sẽ phải đăng nhập lại để tiếp tục sử dụng!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Đăng xuất",
        denyButtonText: "Hủy",
        confirmButtonColor: "#d33",
        denyButtonColor: "#ccc",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await dispatch(logout()).unwrap();
          navigate("/");
          await dispatch(initializeCart()).unwrap();
        }
      });
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {isLoading ? (
        <div className="text-center">Đang tải...</div>
      ) : !user ? (
        <div className="text-center text-red-600">
          Vui lòng đăng nhập để xem thông tin
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <UserSidebar
            userInfo={userInfo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
          />
          <div className="flex-1">
            {activeTab === "account" && (
              <AccountInfo
                userInfo={userInfo}
                handleUserInfoChange={handleUserInfoChange}
                handleChangeUserInfo={handleChangeUserInfo}
              />
            )}
            {activeTab === "address" && (
              <AddressBook
                userInfo={userInfo}
                handleUserInfoChange={handleUserInfoChange}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                selectedWard={selectedWard}
                setSelectedWard={setSelectedWard}
                street={street}
                setStreet={setStreet}
                cities={cities}
                districts={districts}
                wards={wards}
                handleChangeUserInfo={handleChangeUserInfo}
              />
            )}
            {activeTab === "orders" && <OrderManagement />}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UserDetail);
