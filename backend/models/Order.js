import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userID: { type: String, required: true }, 
  items: { type: Array, required: true }, 
  totalPrice: { type: Number, required: true }, 
  address: { type: Object, required: true },  
  status: { type: String, enum: ["Chờ xác nhận", "Đang xử lý", "Đang vận chuyển", "Đã giao"], default: "Chờ xác nhận" },
  date: { type: Number, required: true },
  paymentMethod: { type: String, require: true},
  payment: { type: Boolean, require: true}
});

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
