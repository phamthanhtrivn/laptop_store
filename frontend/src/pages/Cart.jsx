"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingBag, FileText, CreditCard, CheckCircle, Minus, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop MSI Modern 15 H C13M 216VN",
      price: 17990000,
      oldPrice: 22490000,
      quantity: 1,
      image: "/placeholder.svg?height=200&width=200&text=MSI",
    },
    {
      id: 2,
      name: "Laptop Gaming Asus ROG Strix G15",
      price: 28990000,
      oldPrice: 32990000,
      quantity: 1,
      image: "/placeholder.svg?height=200&width=200&text=ASUS",
    },
  ])

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
  })

  const [paymentMethod, setPaymentMethod] = useState("cod")

  // Tính tổng tiền
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0)
  }

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (id, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = product.quantity + change
          return {
            ...product,
            quantity: newQuantity > 0 ? newQuantity : 1,
          }
        }
        return product
      }),
    )
  }

  // Xử lý xóa sản phẩm
  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  // Xử lý thay đổi thông tin khách hàng
  const handleCustomerInfoChange = (e) => {
    const { name, value, type, checked } = e.target
    setCustomerInfo({
      ...customerInfo,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Xử lý chuyển bước
  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  // Xử lý quay lại bước trước
  const handlePrevStep = () => {
    setActiveStep(activeStep - 1)
  }

  // Hiển thị các bước
  const renderStepIndicator = () => {
    const steps = [
      { icon: <ShoppingBag size={20} />, label: "Giỏ hàng" },
      { icon: <FileText size={20} />, label: "Thông tin đặt hàng" },
      { icon: <CreditCard size={20} />, label: "Thanh toán" },
      { icon: <CheckCircle size={20} />, label: "Hoàn tất" },
    ]

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
              <span className={`text-sm mt-1 ${index <= activeStep ? "text-red-600 font-medium" : "text-gray-500"}`}>
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

        {/* Thêm đường kẻ ngang để hiển thị vị trí hiện tại */}
        <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className={`text-center ${index === activeStep ? "font-bold" : "text-gray-500"}`}>
                {index === activeStep && (
                  <div className="w-full flex justify-center">
                    <div className="w-8 h-1 bg-red-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị giỏ hàng
  const renderCart = () => {
    return (
      <div>
        {products.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">Giỏ hàng trống</h3>
            <p className="text-gray-500 mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.id} className="flex flex-col md:flex-row items-start md:items-center py-4 border-b">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 object-contain border rounded"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-baseline mt-1">
                      <span className="text-red-600 font-bold">{product.price.toLocaleString()}đ</span>
                      {product.oldPrice && (
                        <span className="text-gray-500 text-sm line-through ml-2">
                          {product.oldPrice.toLocaleString()}đ
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-gray-500 text-sm flex items-center mt-2 hover:text-red-600"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="flex items-center border rounded-md ml-auto">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="text"
                    value={product.quantity}
                    readOnly
                    className="w-10 text-center border-x focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <button className="flex items-center text-blue-600 hover:underline">
                <span className="mr-1">Sử dụng mã giảm giá</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Tổng tiền:</span>
                <span className="text-xl font-bold text-red-600">{calculateTotal().toLocaleString()}đ</span>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full bg-red-600 text-white py-3 rounded-md mt-4 font-medium hover:bg-red-700"
              >
                ĐẶT HÀNG NGAY
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  // Hiển thị thông tin đặt hàng
  const renderOrderInfo = () => {
    return (
      <div>
        <h2 className="text-xl font-medium mb-4">Thông tin khách mua hàng</h2>

        <div className="mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={customerInfo.gender === "male"}
                onChange={handleCustomerInfoChange}
                className="mr-2"
              />
              Anh
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={customerInfo.gender === "female"}
                onChange={handleCustomerInfoChange}
                className="mr-2"
              />
              Chị
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nhập họ tên</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                placeholder="Trí Thành"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nhập số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                placeholder="0398694335"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-4">Chọn cách nhận hàng</h2>

        <div className="mb-4">
          <label className="flex items-center mb-4">
            <input
              type="radio"
              name="deliveryMethod"
              value="delivery"
              checked={customerInfo.deliveryMethod === "delivery"}
              onChange={handleCustomerInfoChange}
              className="mr-2"
            />
            Giao hàng tận nơi
          </label>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <select
                  name="city"
                  value={customerInfo.city}
                  onChange={handleCustomerInfoChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Hồ Chí Minh</option>
                </select>
              </div>
              <div>
                <select
                  name="district"
                  value={customerInfo.district}
                  onChange={handleCustomerInfoChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Quận Gò Vấp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <select
                  name="ward"
                  value={customerInfo.ward}
                  onChange={handleCustomerInfoChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Phường 15</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                  placeholder="200 An Nhơn"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <textarea
            name="note"
            value={customerInfo.note}
            onChange={handleCustomerInfoChange}
            placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="invoice"
              checked={customerInfo.invoice}
              onChange={handleCustomerInfoChange}
              className="mr-2"
            />
            Xuất hoá đơn cho đơn hàng
          </label>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Dịch vụ giao hàng</h3>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="radio" name="shippingService" checked={true} className="mr-2" />
              Miễn phí vận chuyển (Giao hàng tiêu chuẩn)
            </div>
            <span>0đ</span>
          </label>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span>Phí vận chuyển:</span>
            <span className="font-medium">Miễn phí</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Tổng tiền:</span>
            <span className="text-xl font-bold text-red-600">{calculateTotal().toLocaleString()}đ</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Bạn có thể chọn hình thức thanh toán sau khi đặt hàng
          </p>
        </div>
      </div>
    )
  }

  // Hiển thị thanh toán
  const renderPayment = () => {
    return (
      <div>
        <h2 className="text-xl font-medium mb-4">Thông tin đặt hàng</h2>

        <div className="mb-6">
          <ul className="space-y-3">
            <li className="flex">
              <span className="w-1/3 text-gray-600">• Khách hàng:</span>
              <span className="w-2/3">{customerInfo.name || "Trí Thành"}</span>
            </li>
            <li className="flex">
              <span className="w-1/3 text-gray-600">• Số điện thoại:</span>
              <span className="w-2/3">{customerInfo.phone || "0398694335"}</span>
            </li>
            <li className="flex">
              <span className="w-1/3 text-gray-600">• Địa chỉ nhận hàng:</span>
              <span className="w-2/3">
                {customerInfo.address || "200 An Nhơn"}, {customerInfo.ward || "Phường 15"},{" "}
                {customerInfo.district || "Quận Gò Vấp"}, {customerInfo.city || "Hồ Chí Minh"}
              </span>
            </li>
            <li className="flex">
              <span className="w-1/3 text-gray-600">• Tạm tính:</span>
              <span className="w-2/3 text-red-600">{calculateTotal().toLocaleString()}đ</span>
            </li>
            <li className="flex">
              <span className="w-1/3 text-gray-600">• Phí vận chuyển:</span>
              <span className="w-2/3">Miễn phí</span>
            </li>
            <li className="flex">
              <span className="w-1/3 text-gray-600">• Tổng tiền:</span>
              <span className="w-2/3 text-red-600 font-bold">{calculateTotal().toLocaleString()}đ</span>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <button className="flex items-center text-blue-600 hover:underline mb-6">
            <span className="mr-1">Sử dụng mã giảm giá</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <h2 className="text-xl font-medium mb-4">Chọn hình thức thanh toán</h2>

        <div className="space-y-4 mb-6">
          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center">
              <img src="/placeholder.svg?height=40&width=40&text=COD" alt="COD" className="w-10 h-10 mr-3" />
              <span>Thanh toán khi giao hàng (COD)</span>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center">
              <img src="/placeholder.svg?height=40&width=40&text=MOMO" alt="MoMo" className="w-10 h-10 mr-3" />
              <span>Thanh toán MoMo</span>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="vnpay"
              checked={paymentMethod === "vnpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center">
              <img src="/placeholder.svg?height=40&width=40&text=VNPAY" alt="VNPay" className="w-10 h-10 mr-3" />
              <span>Thanh toán VNPay</span>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center">
              <img src="/placeholder.svg?height=40&width=40&text=BANK" alt="Bank Transfer" className="w-10 h-10 mr-3" />
              <span>Chuyển khoản ngân hàng</span>
            </div>
          </label>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span>Phí vận chuyển:</span>
            <span className="font-medium">Miễn phí</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Tổng tiền:</span>
            <span className="text-xl font-bold text-red-600">{calculateTotal().toLocaleString()}đ</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              THANH TOÁN NGAY
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị hoàn tất
  const renderComplete = () => {
    return (
      <div className="text-center py-10">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
        <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại TechLaptop</p>
        <p className="text-gray-600 mb-2">
          Mã đơn hàng của bạn: <span className="font-medium">TL123456789</span>
        </p>
        <p className="text-gray-600 mb-6">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Về trang chủ
          </Link>
          <Link to="/products" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Mua thêm sản phẩm khác
        </Link>
      </div>

      {renderStepIndicator()}

      {activeStep === 0 && renderCart()}
      {activeStep === 1 && renderOrderInfo()}
      {activeStep === 2 && renderPayment()}
      {activeStep === 3 && renderComplete()}
    </div>
  )
}

export default Cart
