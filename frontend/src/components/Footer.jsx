import { images } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="container mx-auto flex flex-col lg:flex-row items-start justify-start gap-15">
        {/* About Us Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-lg font-semibold text-red-600 my-2">Về chúng tôi</p>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Giới thiệu</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Liên hệ</a>
        </div>

        {/* Policies Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-lg font-semibold text-red-600 my-2">Chính sách</p>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Chính sách bảo hành</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Chính sách giao hàng</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Chính sách bảo mật</a>
        </div>

        {/* Information Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-lg font-semibold text-red-600 my-2">Thông tin</p>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Hướng dẫn mua hàng</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Hướng dẫn thanh toán</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-all">Tra cứu địa chỉ bảo hành</a>
        </div>

        {/* Payment Methods Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-lg font-semibold text-red-600 my-2">Cách thức thanh toán</p>
          <div className="flex gap-2">
            <img src={images.cod} alt="COD" className="w-12 h-auto transition-transform transform hover:scale-110" />
            <img src={images.momo} alt="Momo" className="w-12 h-auto transition-transform transform hover:scale-110" />
            <img src={images.vnpay} alt="VnPay" className="w-8 h-auto transition-transform transform hover:scale-110" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
