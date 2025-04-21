import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react"


const Login = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-15">
          {/* Login Section */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Đăng nhập</h2>
              <p className="text-sm text-gray-500">Nhập thông tin đăng nhập của bạn để truy cập tài khoản</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                    Mật khẩu
                  </label>
                  <a href="#" className="text-xs text-black hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="cursor-pointer w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Đăng nhập
              </button> 

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              <button
                type="button"
                className="cursor-pointer w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </button>

              <div className="text-center text-sm text-gray-500 mt-4 md:hidden">
                Chưa có tài khoản?{" "}
                <a href="#" className="text-black hover:underline">
                  Đăng ký ngay
                </a>
              </div>
            </div>
          </div>

          {/* Register Section */}
          <div className="p-8 md:p-12 bg-gray-50">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Đăng ký</h2>
              <p className="text-sm text-gray-500">Tạo tài khoản mới để truy cập đầy đủ tính năng</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="register-phone" className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="register-phone"
                    type="tel"
                    placeholder="0912345678"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="register-confirm-password"
                    type={showRegisterConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showRegisterConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Chính sách bảo mật
                  </a>
                </label>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Đăng ký
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <div className="text-center text-sm text-gray-500 mt-4 md:hidden">
                Đã có tài khoản?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Đăng nhập
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login