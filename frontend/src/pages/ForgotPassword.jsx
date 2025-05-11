import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../config/config";
import validator from "validator";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendCode = async () => {
    if (!email) return toast.error("Vui lòng nhập email của bạn.");
    if (!validator.isEmail(email)) return toast.error("Email không hợp lệ.");

    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/user/forgot-password`, {
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
        setCountdown(300);
      } else {
        toast.error(res.data.message);
        setStep(1);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!otp) return toast.error("Vui lòng nhập mã xác nhận.");
    if (!newPassword) return toast.error("Vui lòng nhập mật khẩu mới.");
    if (newPassword.length < 8)
      return toast.error("Mật khẩu phải có ít nhất 8 ký tự.");

    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        token: otp,
        newPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setStep(3);
      } else {
        toast.error(res.data.message);
        setStep(1);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Quên mật khẩu
        </h2>

        {step === 1 && (
          <>
            <label className="block mb-2 text-gray-700">Email của bạn</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e60023]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleSendCode}
              disabled={loading}
              className={`mt-6 w-full bg-[#e60023] hover:bg-red-700 text-white py-2 rounded-md font-semibold transition flex items-center justify-center ${
                loading && "opacity-60 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Đang gửi mã...
                </>
              ) : (
                "Gửi mã xác nhận"
              )}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-gray-700">Mã xác nhận</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#e60023]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />

            <div className="text-sm text-gray-500 mb-4">
              {countdown > 0 ? (
                <span>
                  Mã sẽ hết hạn sau{" "}
                  <span className="text-red-500 font-medium">
                    {formatTime(countdown)}
                  </span>
                </span>
              ) : (
                <button
                  onClick={handleSendCode}
                  className="text-blue-600 hover:underline font-medium"
                  disabled={loading}
                >
                  Gửi lại mã
                </button>
              )}
            </div>

            <label className="block mb-2 text-gray-700">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className={`mt-6 w-full bg-[#e60023] hover:bg-red-700 text-white py-2 rounded-md font-semibold transition flex items-center justify-center ${
                loading && "opacity-60 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Đang đặt lại mật khẩu...
                </>
              ) : (
                "Đặt lại mật khẩu"
              )}
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center text-gray-600 font-semibold">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <p className="mb-4">
              Mật khẩu đã được cập nhật! Bạn có thể đăng nhập lại.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-[#e60023] text-white rounded-md hover:bg-red-700 transition"
            >
              Đến trang đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
