import Order from "../models/Order.js";
import User from "../models/User.js";
import { sendMailSuccessOrder } from "../utils/sendEmail.js";

export const placeOrder = async (req, res) => {
  try {
    const { userID, items, totalPrice, receiInfo, paymentMethod, note } =
      req.body;

    const orderData = {
      userID,
      items,
      receiInfo,
      totalPrice,
      date: Date.now(),
      payment: false,
      note,
    };

    if (paymentMethod == "COD") {
      orderData.paymentMethod = "COD";
      const newOrder = new Order(orderData);
      await newOrder.save();

      await User.findByIdAndUpdate(
        userID,
        { $set: { cartData: [] } },
        { new: true }
      );
      const user = await User.findById(userID);
      await sendMailSuccessOrder(
        user.email,
        "Đơn hàng của bạn đã được đặt thành công!",
        newOrder._id
      );
      res.json({ success: true, order: newOrder, message: "Đơn hàng được đặt thành công!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const { userID } = req.body;

    const { orderId, status } = req.query;

    const query = { userID };

    if (orderId && orderId !== "") {
      query._id = orderId;
    }

    if (status && status !== "") {
      query.status = status;
    }

    const orderData = await Order.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    const totalOrders = await Order.countDocuments(query);

    res.json({
      success: true,
      orderData,
      pagination: {
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
        limitPerPage: limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const allOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const { phone, status } = req.query;
    const query = {};
    if (phone) {
      query["receiInfo.phone"] = phone;
    }
    if (status !== "") {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    const totalOrders = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      pagination: {
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
        limitPerPage: limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderID, status } = req.body;

    const validStatuses = [
      "Chờ xác nhận",
      "Đóng gói",
      "Đang vận chuyển",
      "Đã giao",
      "Đã hủy",
    ];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: "Trạng thái không hợp lệ!" });
    }

    const updateData = { status };
    if (status === "Đã giao") {
      updateData.payment = true;
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderID, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Không tìm thấy đơn hàng để cập nhật trạng thái!",
      });
    }
    res.json({
      success: true,
      message: "Trạng thái đơn hàng đã được cập nhật",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
