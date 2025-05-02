import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { userID, product } = req.body;

    const userData = await User.findById(userID);

    if (!userData) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    const existingItem = userData.cartData.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      await User.findOneAndUpdate(
        { _id: userID, "cartData._id": product._id },
        { $inc: { "cartData.$.quantity": product.quantity } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userID,
        { $push: { cartData: product } },
        { new: true }
      );
    }

    const updatedUser = await User.findById(userID);

    res.json({
      success: true,
      message: "Thêm vào giỏ hàng thành công!",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userID, productID, quantity } = req.body;

    const userData = await User.findById(userID);

    if (!userData) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    const existingItem = userData.cartData.find(
      (item) => item._id === productID
    );

    if (existingItem) {
      await User.findOneAndUpdate(
        { _id: userID, "cartData._id": productID },
        { $set: { "cartData.$.quantity": quantity } },
        { new: true }
      );
    } else {
      return res.json({
        success: false,
        message: "Không tìm thấy sản phẩm để cập nhật!",
      });
    }

    const updatedUser = await User.findById(userID);

    res.json({
      success: true,
      message: "Cập nhật giỏ hàng thành công!",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userID, productID } = req.body;

    const userData = await User.findById(userID);
    if (!userData) {
      return res.json({ success: false, message: "Không tồn tại người dùng" });
    }

    userData.cartData = userData.cartData.filter(
      (item) => item.productID !== productID
    );

    await userData.save();
    res.json({
      success: true,
      message: "Xóa sản phẩm thành công!",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteAllCart = async (req, res) => {
  try {
    const { userID } = req.body;
    const userData = await User.findById(userID);
    if (!userData) {
      return res.json({ success: false, message: "Không tồn tại người dùng" });
    }

    userData.cartData = [];

    await userData.save();

    res.json({
      success: true,
      message: "Xóa tất cả sản phẩm thành công!",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userID } = req.body;
    const userData = await User.findById(userID);
    if (!userData) {
      return res.json({ success: false, message: "Người dùng không tồn tại" });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
