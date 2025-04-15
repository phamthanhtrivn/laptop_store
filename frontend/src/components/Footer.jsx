import { images } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col lg:flex-row items-start justify-start gap-15 py-10">
      <div className="flex flex-col gap-3 text-sm">
        <p className="text-lg font-medium my-2">Về chúng tôi</p>
        <p>Giới thiệu</p>
        <p>Liên hệ</p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <p className="text-lg font-medium my-2">Chính sách</p>
        <p>Chính sách bảo hành</p>
        <p>Chính sách giao hàng</p>
        <p>Chính sách bảo mật</p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <p className="text-lg font-medium my-2">Thông tin</p>
        <p>Hướng dẫn mua hàng</p>
        <p>Hướng dẫn thanh toán</p>
        <p>Tra cứu địa chỉ bảo hành</p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <p className="text-lg font-medium my-2">Cách thức thanh toán</p>
        <div className="flex gap-2 w-20">
          <img src={images.cod} alt="cod" />
          <img src={images.momo} alt="momo" />
          <img src={images.visa} alt="visa" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
