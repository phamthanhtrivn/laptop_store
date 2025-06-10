/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import CartItems from "../components/CartItems";
import OrderInfo from "../components/OrderInfo";
import Payment from "../components/Payment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { initializeAuth, updateUser } from "../store/authSlice";
import OrderComplete from "../components/OrderComplete";
import { placeOrder } from "../store/orderSlice";
import { initializeCart } from "../store/cartSlice";
import { backendUrl } from "../config/config";

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
  });
  const [note, setNote] = useState("");
  

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
        return;
      }

      try {
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

  const handleOrderInfo = async () => {
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
      if (user.address.city === "") {
        Swal.fire({
          title:
            "Bạn có muốn lưu thông tin đặt hàng để tiếp tục mua hàng cho lần sau không?",
          text: "Thông tin sẽ được lưu lại và bạn có thể thay đổi sau.",
          icon: "info",
          showDenyButton: true,
          confirmButtonText: "Đồng ý",
          denyButtonText: "Hủy",
          confirmButtonColor: "#d33",
          denyButtonColor: "#ccc",
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await dispatch(updateUser(updatedUser)).unwrap();
            toast.success("Cập nhật thông tin thành công!");
            await dispatch(initializeAuth()).unwrap();
          }
        });
      }
      handleNextStep();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userID: user._id,
        items: cartItems,
        totalPrice,
        receiInfo: {
          name: userInfo.name,
          phone: userInfo.phone,
          city: selectedCity,
          district: selectedDistrict,
          ward: selectedWard,
          street,
        },
        paymentMethod,
        note,
      };

      Swal.fire({
        title: "Bạn hãy kiểm tra lại thông tin trước khi đặt hàng!",
        text: "Thông tin sẽ không thể thay đổi sau khi đặt hàng.",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Đồng ý đặt hàng",
        denyButtonText: "Hủy",
        confirmButtonColor: "#d33",
        denyButtonColor: "#ccc",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (paymentMethod === "VNPay") {
            const newOrder = await dispatch(placeOrder(orderData)).unwrap();
            const vnpayResponse = await axios.post(
              `${backendUrl}/api/orders/vnpay/create-payment-url`,
              {
                amount: totalPrice,
                bankCode: "",
                language: "vn",
                orderInfo: `Thanh toán đơn hàng cho ${userInfo.name}`,
                orderId: newOrder._id,
              },
              { withCredentials: true }
            );
            
            window.location.href = vnpayResponse.data.data;
          } else {
            await dispatch(placeOrder(orderData)).unwrap();
            await dispatch(initializeCart()).unwrap();
            handleNextStep();
          }
        }
      });
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link
          to="/products"
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} className="mr-1" />
          Mua thêm sản phẩm khác
        </Link>
      </div>

      <StepIndicator activeStep={activeStep} />

      {activeStep === 0 && (
        <CartItems cartItems={cartItems} handleNextStep={handleNextStep} />
      )}
      {activeStep === 1 && (
        <OrderInfo
          userInfo={userInfo}
          handleUserInfoChange={handleUserInfoChange}
          note={note}
          setNote={setNote}
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
          totalPrice={totalPrice}
          handleOrderInfo={handleOrderInfo}
          handlePrevStep={handlePrevStep}
        />
      )}
      {activeStep === 2 && (
        <Payment
          userInfo={userInfo}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          totalPrice={totalPrice}
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          selectedWard={selectedWard}
          street={street}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          cartItems={cartItems}
          note={note}
          handlePlaceOrder={handlePlaceOrder}
        />
      )}
      {activeStep === 3 && <OrderComplete />}
    </div>
  );
};

export default Cart;
