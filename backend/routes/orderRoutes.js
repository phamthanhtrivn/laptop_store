import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  allOrders,
  bestSellingProduct,
  createPaymentURLMoMo,
  createPaymentURLVNPay,
  momoReturn,
  placeOrder,
  totalOrders,
  totalRevenue,
  updateStatus,
  userOrders,
  vnpayReturn,
} from "../controllers/orderControllers.js";
import authAdmin from "../middlewares/authAdmin.js";

const orderRoute = express.Router();

orderRoute.get("/user", authUser, userOrders);
orderRoute.post("/place-order", authUser, placeOrder);
orderRoute.post("/vnpay/create-payment-url", createPaymentURLVNPay);
orderRoute.get("/vnpay_return", vnpayReturn);
orderRoute.post("/momo/create-payment-url", createPaymentURLMoMo);
orderRoute.get("/momo_return", momoReturn);

orderRoute.get("/all-orders", authAdmin, allOrders);
orderRoute.post("/update-status", authAdmin, updateStatus);
orderRoute.get("/total-revenue", totalRevenue);
orderRoute.get("/total-orders", totalOrders);
orderRoute.get("/best-selling", bestSellingProduct);

export default orderRoute;
