import moment from "moment";
import qs from "qs";
import axios from "axios";
import crypto from "crypto";
import vnpay from "../config/vnpay.js";
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
      paymentMethod,
      note,
      status: paymentMethod === "COD" ? "Chờ xác nhận" : "Chờ thanh toán",
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    if (paymentMethod === "COD") {
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
      return res.json({
        success: true,
        order: newOrder,
        message: "Đơn hàng COD được đặt thành công!",
      });
    } else if (paymentMethod === "VNPay") {
      return res.json({
        success: true,
        order: newOrder,
        message: "Đơn hàng được tạo, chờ thanh toán VNPay!",
      });
    } else if (paymentMethod === "MoMo") {
      return res.json({
        success: true,
        order: newOrder,
        message: "Đơn hàng được tạo, chờ thanh toán MoMo!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const createPaymentURLMoMo = async (req, res) => {
  try {
    const { amount, orderId, orderInfo } = req.body;

    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    // var orderId = requestId;
    // var orderInfo = "pay with MoMo";
    var redirectUrl = process.env.RETURN_URL + "/api/orders/momo_return";
    var ipnUrl = process.env.RETURN_URL + "/api/orders/momo_return";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    // var amount = "50000";
    var requestType = "captureWallet";
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    // console.log("--------------------RAW SIGNATURE----------------");
    // console.log(rawSignature);
    //signature
    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    // console.log("--------------------SIGNATURE----------------");
    // console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount.toString(),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json({
      success: true,
      data: response.data,
      message: "Tạo URL thanh toán MoMo thành công!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const momoReturn = async (req, res) => {
  try {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.query; // MoMo uses query parameters for return URL
    
    // Validate required fields
    if (!partnerCode || !orderId || !requestId || !signature) {
      return res.json({
        success: false,
        message: "Thiếu các trường bắt buộc trong phản hồi MoMo!",
      });
    }

    const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

    // Create raw signature for verification
    const rawSignature =
      `accessKey=F8BBA842ECF85&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}` +
      `&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}` +
      `&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

    const calculatedSignature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    if (calculatedSignature !== signature) {
      return res.json({ success: false, message: "Chữ ký không hợp lệ!" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Đơn hàng không tồn tại!" });
    }

    if (resultCode === "0") {
      // Payment successful
      await Order.findByIdAndUpdate(
        orderId,
        { payment: true, status: "Chờ xác nhận" },
        { new: true }
      );
      await User.findByIdAndUpdate(
        order.userID,
        { $set: { cartData: [] } },
        { new: true }
      );
      const user = await User.findById(order.userID);
      await sendMailSuccessOrder(
        user.email,
        "Đơn hàng của bạn đã được đặt thành công!",
        orderId
      );
      res.redirect(process.env.FRONTEND_URL + "/order-complete");
    } else {
      // Payment failed
      await Order.findByIdAndUpdate(
        orderId,
        { status: "Đã hủy" },
        { new: true }
      );
      res.redirect(process.env.FRONTEND_URL + "/payment-failed");
    }
  } catch (error) {
    console.error("Error in momoReturn:", error);
    res.json({ success: false, message: error.message });
  }
};

const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

export const createPaymentURLVNPay = async (req, res) => {
  try {
    const { amount, bankCode, language, orderInfo, orderId } = req.body;

    if (!orderId) {
      return res.json({ success: false, message: "Thiếu orderId!" });
    }

    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress;

    const tmnCode = vnpay.vnp_TmnCode;
    const secretKey = vnpay.vnp_HashSecret;
    const vnpUrlBase = vnpay.vnp_Url;
    const returnUrl = vnpay.vnp_ReturnUrl;

    let locale = language || "vn";
    const currCode = "VND";

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const vnpUrl = `${vnpUrlBase}?${qs.stringify(vnp_Params, {
      encode: false,
    })}`;
    res.json({ success: true, data: vnpUrl });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const secretKey = vnpay.vnp_HashSecret;
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const orderId = vnp_Params["vnp_TxnRef"];
      const responseCode = vnp_Params["vnp_ResponseCode"];
      const order = await Order.findById(orderId);

      if (!order) {
        return res.json({ success: false, message: "Đơn hàng không tồn tại!" });
      }

      if (responseCode === "00") {
        await Order.findByIdAndUpdate(
          orderId,
          { payment: true, status: "Chờ xác nhận" },
          { new: true }
        );
        await User.findByIdAndUpdate(
          order.userID,
          { $set: { cartData: [] } },
          { new: true }
        );
        const user = await User.findById(order.userID);
        await sendMailSuccessOrder(
          user.email,
          "Đơn hàng của bạn đã được đặt thành công!",
          orderId
        );
        res.redirect(process.env.FRONTEND_URL + "/order-complete");
      } else {
        await Order.findByIdAndUpdate(
          orderId,
          { status: "Đã hủy" },
          { new: true }
        );
        res.redirect(process.env.FRONTEND_URL + "/payment-failed");
      }
    } else {
      res.json({ success: false, message: "Chữ ký không hợp lệ!" });
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

    const { phone, status, orderID } = req.query;
    const query = {};
    if (phone) {
      query["receiInfo.phone"] = phone;
    }
    if (status !== "") {
      query.status = status;
    }
    if (orderID) {
      query._id = orderID;
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

export const totalRevenue = async (req, res) => {
  try {
    const total = await Order.aggregate([
      {
        $match: { payment: true },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json({ success: true, totalRevenue: total[0]?.totalRevenue || 0 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const totalOrders = async (req, res) => {
  try {
    const total = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ]);
    res.json({ success: true, totalOrders: total[0]?.totalOrders || 0 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const bestSellingProduct = async (req, res) => {
  try {
    const total = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.productID",
          name: { $first: "$items.name" },
          totalSold: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    res.json({ success: true, product: total[0] || null });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
