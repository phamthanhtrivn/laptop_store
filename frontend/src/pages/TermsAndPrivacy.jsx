import React from "react";

const TermsAndPrivacy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-red-600">Điều khoản Dịch vụ & Chính sách Bảo mật</h1>

      {/* Điều khoản Dịch vụ */}
      <section>
        <h2 className="text-2xl font-semibold text-red-500">1. Điều khoản Dịch vụ</h2>
        <p className="text-sm text-gray-500 mb-2">Cập nhật lần cuối: 08/05/2025</p>
        <div className="space-y-4">
          <p>
            Khi sử dụng website này, bạn đồng ý tuân thủ các điều khoản dịch vụ được nêu ra dưới đây.
          </p>

          <h3 className="font-semibold">1.1. Tài khoản người dùng</h3>
          <ul className="list-disc list-inside ml-4">
            <li>Thông tin đăng ký phải chính xác và đầy đủ.</li>
            <li>Người dùng có trách nhiệm bảo mật tài khoản.</li>
          </ul>

          <h3 className="font-semibold">1.2. Đơn hàng và thanh toán</h3>
          <ul className="list-disc list-inside ml-4">
            <li>Chúng tôi xác nhận đơn qua email hoặc tài khoản người dùng.</li>
            <li>Chúng tôi có quyền từ chối đơn hàng trong một số trường hợp.</li>
          </ul>

          <h3 className="font-semibold">1.3. Vận chuyển và giao hàng</h3>
          <p>
            Giao hàng toàn quốc, thời gian 1–5 ngày. Trường hợp chậm trễ sẽ được thông báo.
          </p>

          <h3 className="font-semibold">1.4. Bảo hành và đổi trả</h3>
          <p>
            Sản phẩm lỗi do nhà sản xuất hoặc giao nhầm sẽ được đổi trả trong vòng 7 ngày.
          </p>

          <h3 className="font-semibold">1.5. Quyền và nghĩa vụ</h3>
          <p>
            Người dùng không được sử dụng dịch vụ cho mục đích gian lận hoặc bất hợp pháp.
          </p>
        </div>
      </section>

      {/* Chính sách Bảo mật */}
      <section>
        <h2 className="text-2xl font-semibold text-red-500">2. Chính sách Bảo mật</h2>
        <div className="space-y-4">
          <p>
            Chúng tôi cam kết bảo mật thông tin cá nhân của khách hàng. Dưới đây là cách chúng tôi xử lý dữ liệu.
          </p>

          <h3 className="font-semibold">2.1. Thông tin thu thập</h3>
          <ul className="list-disc list-inside ml-4">
            <li>Họ tên, email, số điện thoại, địa chỉ giao hàng.</li>
            <li>Dữ liệu về thiết bị truy cập như IP, cookies.</li>
          </ul>

          <h3 className="font-semibold">2.2. Mục đích sử dụng</h3>
          <ul className="list-disc list-inside ml-4">
            <li>Xử lý đơn hàng, hỗ trợ khách hàng, bảo mật hệ thống.</li>
          </ul>

          <h3 className="font-semibold">2.3. Bảo vệ dữ liệu</h3>
          <p>
            Chúng tôi sử dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân.
          </p>

          <h3 className="font-semibold">2.4. Quyền của bạn</h3>
          <p>
            Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân bất kỳ lúc nào. Ngoài ra, bạn có thể yêu cầu ngừng nhận email quảng cáo.
          </p>
        </div>
      </section>

      <section className="border-t pt-6 text-center text-sm text-gray-500">
        Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hiển thị trên website.
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
