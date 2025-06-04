import { useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import validator from "validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, loginWithGoogle, register } from "../store/authSlice";
import { clearCartItems } from "../store/cartSlice";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);

  const emailLogin = useRef(null);
  const passwordLogin = useRef(null);

  const emailRegister = useRef(null);
  const passwordRegister = useRef(null);
  const confirmPasswordRegister = useRef(null);
  const nameRegister = useRef(null);
  const phoneRegister = useRef(null);
  const termsRegister = useRef(null);

  const handleLoginSubmit = async () => {
    const email = emailLogin.current.value;
    const password = passwordLogin.current.value;

    if (!email) {
      toast.error("Vui lòng nhập email để đăng nhập!");
      emailLogin.current.focus();
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Email đăng nhập không hợp lệ!");
      emailLogin.current.focus();
      return;
    }
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu đăng nhập!");
      passwordLogin.current.focus();
      return;
    }

    try {
      await dispatch(clearCartItems()).unwrap();
      await dispatch(login({ email, password })).unwrap();
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      toast.error(error.message);
    }
  };

  const handleRegisterSubmit = async () => {
    const name = nameRegister.current.value.trim();
    const email = emailRegister.current.value.trim();
    const phone = phoneRegister.current.value.trim();
    const password = passwordRegister.current.value.trim();
    const confirmPassword = confirmPasswordRegister.current.value;
    const terms = termsRegister.current.checked;

    const nameRegex = /^[A-Za-zÀ-Ỷà-ỹ\s]+$/;

    if (!name || !nameRegex.test(name.trim())) {
      toast.error("Tên không hợp lệ!");
      nameRegister.current.focus();
      return;
    }
    if (!email || !validator.isEmail(email)) {
      toast.error("Email trống hoặc không hợp lệ!");
      emailRegister.current.focus();
      return;
    }
    if (!phone || !validator.isMobilePhone(phone, "vi-VN")) {
      toast.error("Số điện thoại không hợp lệ!");
      phoneRegister.current.focus();
      return;
    }
    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
      passwordRegister.current.focus();
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      confirmPasswordRegister.current.focus();
      return;
    }
    if (!terms) {
      toast.error("Vui lòng đồng ý với Điều khoản dịch vụ!");
      termsRegister.current.focus();
      return;
    }

    try {
      await dispatch(register({ name, email, password, phone })).unwrap();
      toast.success("Đăng ký thành công!");

      await dispatch(login({ email, password })).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      toast.error(error.message);
    }
  };

  const handleSuccessGGLogin = async (credentialResponse) => {
    dispatch(loginWithGoogle(credentialResponse.credential));
    toast.success("Đăng nhập bằng Google thành công!");
    navigate("/")
  };

  const handleErrorGGLogin = async () => {
    toast.error("Google login error");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-15">
          {/* Login Section */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Đăng nhập</h2>
              <p className="text-sm text-gray-500">
                Nhập thông tin đăng nhập của bạn để truy cập tài khoản
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={emailLogin}
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-black hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={passwordLogin}
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
                    {showLoginPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLoginSubmit}
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
                  <span className="bg-white px-2 text-gray-500">
                    Hoặc đăng nhập với
                  </span>
                </div>
              </div>

              <div>
                <GoogleLogin
                  onSuccess={handleSuccessGGLogin}
                  onError={handleErrorGGLogin}
                />
              </div>

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
              <p className="text-sm text-gray-500">
                Tạo tài khoản mới để truy cập đầy đủ tính năng
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="register-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={nameRegister}
                    id="register-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={emailRegister}
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={phoneRegister}
                    id="register-phone"
                    type="tel"
                    placeholder="0912345678"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={passwordRegister}
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showRegisterPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    ref={confirmPasswordRegister}
                    id="register-confirm-password"
                    type={showRegisterConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterConfirmPassword(
                        !showRegisterConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showRegisterConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  ref={termsRegister}
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Tôi đồng ý với{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Chính sách bảo mật
                  </Link>
                </label>
              </div>

              <button
                onClick={handleRegisterSubmit}
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
  );
};

export default Login;
