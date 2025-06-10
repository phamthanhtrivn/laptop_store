import { images } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="container flex flex-col items-start justify-start mx-auto lg:flex-row gap-15">
        {/* About Us Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="my-2 text-lg font-semibold text-red-600">Về chúng tôi</p>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Giới thiệu</a>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Liên hệ</a>
        </div>

        {/* Policies Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="my-2 text-lg font-semibold text-red-600">Chính sách</p>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Chính sách bảo hành</a>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Chính sách giao hàng</a>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Chính sách bảo mật</a>
        </div>

        {/* Information Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="my-2 text-lg font-semibold text-red-600">Thông tin</p>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Hướng dẫn mua hàng</a>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Hướng dẫn thanh toán</a>
          <a href="#" className="text-gray-600 transition-all hover:text-red-600">Tra cứu địa chỉ bảo hành</a>
        </div>

        {/* Payment Methods Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="my-2 text-lg font-semibold text-red-600">Cách thức thanh toán</p>
          <div className="flex gap-2">
            <img src={images.cod} alt="COD" className="w-12 h-auto transition-transform transform hover:scale-110" />
            <img src={images.momo} alt="Momo" className="w-12 h-auto transition-transform transform hover:scale-110" />
            <img src={images.vnpay} alt="VnPay" className="w-8 h-auto transition-transform transform hover:scale-110" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="my-2 text-lg font-semibold text-red-600">Liên hệ</p>
          <div className="flex flex-col gap-2 text-gray-600">
            <p>Chủ sở hữu: Phạm Thành Trí</p>
            <p>Email: phamthanhtri0712@gmail.com</p>
            <p>Điện thoại: 0398694435</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
