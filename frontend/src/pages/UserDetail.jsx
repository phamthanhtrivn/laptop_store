/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import UserSidebar from "../components/UserSideBar";
import AccountInfo from "../components/AccountInfo";
import AddressBook from "../components/AddressBook";
import OrderManagement from "../components/OrderManagement";
import { useNavigate } from "react-router-dom";
import { initializeCart } from "../store/cartSlice";
import axios from "axios";

const UserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const user = useSelector((state) => state.auth.user);
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
    address: {
      city: "",
      district: "",
      ward: "",
      street: "",
    },
  });

  useEffect(() => {
    if (user) {
      const updatedUserInfo = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: {
          city: user.address?.city || "",
          district: user.address?.district || "",
          ward: user.address?.ward || "",
          street: user.address?.street || "",
        },
      };
      setUserInfo(updatedUserInfo);
      setSelectedCity(updatedUserInfo.address.city);
      setSelectedDistrict(updatedUserInfo.address.district);
      setSelectedWard(updatedUserInfo.address.ward);
      setStreet(updatedUserInfo.address.street);
    }
  }, [user]);

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

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
      await dispatch(initializeCart()).unwrap();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
              cities={cities}
              districts={districts}
              wards={wards}
            />
          )}
          {activeTab === "orders" && <OrderManagement />}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
