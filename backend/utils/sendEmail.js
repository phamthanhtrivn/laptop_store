import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMailResetPasswordToken = async (to, subject, text, otp) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 100%;
            max-width: 600px;
            margin: auto;
          }
          .email-header {
            background-color: #ff0000;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            text-align: center;
            font-size: 18px;
          }
          .email-body {
            padding: 20px;
            font-size: 16px;
            line-height: 1.5;
          }
          .otp {
            font-weight: bold;
            font-size: 20px;
            color: #ff0000;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            Laptop Store - Khôi phục mật khẩu
          </div>
          <div class="email-body">
            <p>Chào bạn,</p>
            <p>Mã OTP của bạn để khôi phục mật khẩu là: <span class="otp">${otp}</span></p>
            <p>Vui lòng nhập mã OTP để tiếp tục quá trình khôi phục mật khẩu.</p>
          </div>
          <div class="footer">
            <p>Không chia sẻ mã OTP này với bất kỳ ai.</p>
            <p>Chúc bạn một ngày tốt lành!</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Laptop Store" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: htmlContent,  // Chèn HTML vào nội dung email
  });
};

export const sendMailSuccessOrder = async (to, subject, orderId) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 100%;
            max-width: 600px;
            margin: auto;
          }
          .email-header {
            background-color: #ff0000;
            color: #fff;
            padding: 10px 20px;
            border-radius: 8px;
            text-align: center;
            font-size: 18px;
          }
          .email-body {
            padding: 20px;
            font-size: 16px;
            line-height: 1.5;
          }
          .order-id {
            font-weight: bold;
            font-size: 20px;
            color: #ff0000;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            Laptop Store - Đặt hàng thành công
          </div>
          <div class="email-body">
            <p>Chào bạn,</p>
            <p>Đơn hàng của bạn đã được đặt thành công!</p>
            <p>Mã đơn hàng của bạn là: <span class="order-id">${orderId}</span></p>
            <p>Chúng tôi sẽ xử lý đơn hàng của bạn và thông báo cho bạn khi đơn hàng đã được vận chuyển.</p>
          </div>
          <div class="footer">
            <p>Xin cảm ơn bạn đã mua hàng tại Laptop Store!</p>
            <p>Chúc bạn một ngày tuyệt vời!</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Laptop Store" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,  // Chèn HTML vào nội dung email
  });
};
