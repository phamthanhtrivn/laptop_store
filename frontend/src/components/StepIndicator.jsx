import { ShoppingBag, FileText, CreditCard, CheckCircle } from "lucide-react";

const StepIndicator = ({ activeStep }) => {
  const steps = [
    { icon: <ShoppingBag size={20} />, label: "Giỏ hàng" },
    { icon: <FileText size={20} />, label: "Thông tin đặt hàng" },
    { icon: <CreditCard size={20} />, label: "Thanh toán" },
    { icon: <CheckCircle size={20} />, label: "Hoàn tất" },
  ];

  return (
    <div className="bg-red-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div
              className={`rounded-full p-2 ${
                index === activeStep
                  ? "bg-red-600 text-white ring-4 ring-red-200"
                  : index < activeStep
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-500 border border-gray-300"
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`text-sm mt-1 ${
                index <= activeStep ? "text-red-600 font-medium" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-10 w-24 h-0.5 md:w-32 lg:w-40 -z-10 ${
                  index < activeStep ? "bg-red-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
        <div className="flex justify-between">
          {steps.map((idx, index) => (
            <div
              key={index}
              className={`text-center ${
                index === activeStep ? "font-bold" : "text-gray-500"
              }`}
            >
              {idx === activeStep && (
                <div className="w-full flex justify-center">
                  <div className="w-8 h-1 bg-red-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;