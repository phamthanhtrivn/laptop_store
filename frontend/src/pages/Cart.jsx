import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import CartItems from "../components/CartItems";
import OrderInfo from "../components/OrderInfo";
import Payment from "../components/Payment";
import OrderComplete from "../components/OrderComplete";

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);
  

  const [customerInfo, setCustomerInfo] = useState({
    gender: "male",
    name: "",
    phone: "",
    deliveryMethod: "delivery",
    city: "",
    district: "",
    ward: "",
    address: "",
    note: "",
    invoice: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleCustomerInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Mua thêm sản phẩm khác
        </Link>
      </div>

      <StepIndicator activeStep={activeStep} />

      {activeStep === 0 && (
        <CartItems
          handleNextStep={handleNextStep}
        />
      )}
      {/* {activeStep === 1 && (
        <OrderInfo
          customerInfo={customerInfo}
          handleCustomerInfoChange={handleCustomerInfoChange}
          calculateTotal={calculateTotal}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {activeStep === 2 && (
        <Payment
          customerInfo={customerInfo}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          calculateTotal={calculateTotal}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {activeStep === 3 && <OrderComplete />} */}
    </div>
  );
};

export default Cart;