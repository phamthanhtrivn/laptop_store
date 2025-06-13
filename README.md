# 💻 Laptop Store – Hệ thống Web bán laptop

**Laptop Store** là một dự án cá nhân mình thực hiện với mục tiêu xây dựng một hệ thống bán hàng trực tuyến chuyên về laptop.  
Từ trải nghiệm của một người yêu công nghệ và muốn tạo ra một nền tảng mua sắm tiện lợi, mình đã phát triển đầy đủ các tính 
năng cần thiết cho cả người dùng và quản trị viên (mặc dù chưa hoàn hảo lắm vì mình vẫn còn là sinh viên năm 3 và đây là một 
dự án cá nhân đầu tay).

Ứng dụng hỗ trợ người dùng duyệt sản phẩm, tìm kiếm theo nhu cầu, mua hàng trực tuyến và thanh toán nhanh chóng qua **MoMo** 
hoặc **VNPay**. Với giao diện hiện đại, dễ sử dụng và backend mạnh mẽ, dự án này không chỉ là một bài thực hành kỹ thuật, 
mà còn là bước tiến thực tế trong việc xây dựng một ứng dụng thương mại điện tử hoàn chỉnh.

> 📝 **Ghi chú:** Giao diện và trải nghiệm người dùng trong dự án được mình lấy cảm hứng từ website **[GEARVN](https://gearvn.com)** – bao gồm cách trình bày, bố cục, và cả phần logo (được sử dụng lại cho mục đích học tập và phi thương mại).


---

## 🚀 Tính năng nổi bật

### 👤 Người dùng
- Đăng ký, đăng nhập (hỗ trợ đăng nhập bằng **Google**)
- Chỉnh sửa thông tin cá nhân
- Xem danh sách sản phẩm laptop
- Tìm kiếm, lọc theo **hãng**, **giá**, **cấu hình**,...
- Thêm, cập nhật và xóa sản phẩm vào giỏ hàng
- Thanh toán trực tuyến qua **MoMo** và **VNPay**
- Theo dõi lịch sử đơn hàng

### 🛠️ Quản trị viên (Admin)
- Quản lý người dùng (thêm, tìm kiếm, cập nhật nếu biết mật khẩu, xóa thông tin người dùng)
- Quản lý sản phẩm (thêm, tìm kiếm, cập nhật, xóa sản phẩm)
- Quản lý đơn hàng (tìm kiếm, cập nhật trạng thái đơn hàng)
- Thống kê doanh thu cơ bản
- Đăng nhập

---

## 📁 Cấu trúc thư mục

laptop_store/
├── admin/       # Giao diện quản trị viên (React)
├── backend/     # API server (Node.js + Express)
├── frontend/    # Giao diện người dùng (React)

---

## 🛠️ Công nghệ sử dụng

| Công nghệ           | Mô tả                                                          |
|--------------------|----------------------------------------------------------------|
| React.js           | Giao diện người dùng (frontend & admin)                        |
| Redux Toolkit      | Quản lý state hiệu quả, chuẩn hóa luồng dữ liệu trong ứng dụng |
| Tailwind CSS       | Thiết kế UI nhanh, responsive                                   |
| Node.js + Express  | Backend REST API                                               |
| MongoDB            | Cơ sở dữ liệu NoSQL lưu trữ sản phẩm, người dùng, đơn hàng     |
| MoMo & VNPay API   | Thanh toán trực tuyến an toàn, tiện lợi                         |
| Google OAuth       | Đăng nhập nhanh bằng tài khoản Google                           |

---

## 📸 Demo hình ảnh

### 🧑‍💻 Giao diện người dùng (User)

**Trang chủ**
![Trang chủ](assets/user/user-home.png)

**Giao diện đăng nhập người dùng**
![Đăng nhập](assets/user/user-login.png)

**Danh sách laptop với tính năng lọc theo nhu cầu**
![Danh sách laptop](assets/user/user-products.png)

**Chi tiết sản phẩm – mô tả, cấu hình, thêm vào giỏ hàng**
![Chi tiết sản phẩm](assets/user/user-product-detail.png)

**Giỏ hàng – hiển thị sản phẩm đã chọn**
![Giỏ hàng](assets/user/user-cart.png)

**Nhập thông tin giao hàng và địa chỉ**
![Thông tin đặt hàng](assets/user/user-order-info.png)

**Chọn phương thức thanh toán: COD, MoMo hoặc VNPay**
![Thanh toán](assets/user/user-payment.png)

**Thông báo đặt hàng thành công**
![Đặt hàng thành công](assets/user/user-order-complete.png)

**Thông báo giao dịch thất bại**
![Thanh toán thất bại](assets/user/user-payment-failed.png)

**Thông tin cá nhân của người dùng**
![Thông tin người dùng](assets/user/user-info.png)

**Danh sách địa chỉ giao hàng đã lưu**
![Địa chỉ của người dùng](assets/user/user-address-info.png)

**Lịch sử các đơn hàng đã mua**
![Lịch sử các đơn hàng](assets/user/user-order-history.png)

---

### 🛠️ Giao diện quản trị (Admin)

**Đăng nhập dành cho quản trị viên**
![Đăng nhập](assets/admin/admin-login.png)

**Dashboard thống kê đơn hàng, doanh thu**
![Dashboard thống kê](assets/admin/admin-dashboard.png)

**Danh sách sản phẩm trong hệ thống**
![Quản lý sản phẩm](assets/admin/admin-products.png)

**Form thêm sản phẩm mới**
![Thêm sản phẩm](assets/admin/admin-add-product.png)

**Form chỉnh sửa thông tin sản phẩm**
![Cập nhật sản phẩm](assets/admin/admin-update-product.png)

**Danh sách đơn hàng từ người dùng**
![Quản lý đơn hàng](assets/admin/admin-orders.png)

**Quản lý người dùng trong hệ thống**
![Quản lý người dùng](assets/admin/admin-users.png)

**Form thêm người dùng mới**
![Thêm người dùng](assets/admin/admin-add-user.png)

**From cập nhật thông tin người dùng**
![Cập nhật thông tin người dùng](assets/admin/admin-update-user.png)


---

## 📬 Liên hệ

- 👤 Tác giả: **Phạm Thanh Trí**  
- 📧 Email: [phamthanhtri0712@gmail.com](mailto:phamthanhtri0712@gmail.com)  
- 🌐 GitHub: [https://github.com/phamthanhtrivn](https://github.com/phamthanhtrivn)

---

> 🔧 *Dự án vẫn đang được phát triển và hoàn thiện thêm các tính năng nâng cao.*
