import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResetToken from "../models/ResetToken.js";
import { sendMailResetPasswordToken } from "../utils/sendEmail.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID);

const verifyGGToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const updateInfo = async (req, res) => {
  try {
    const { userID, name, phone, city, district, ward, street } = req.body;

    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "Không tồn tại người dùng này!",
      });
    }

    const updateUser = {};

    if (name) updateUser.name = name;
    if (phone) updateUser.phone = phone;
    if (city || district || ward || street) {
      updateUser.address = {};
      if (city) updateUser.address.city = city;
      if (district) updateUser.address.district = district;
      if (ward) updateUser.address.ward = ward;
      if (street) updateUser.address.street = street;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $set: updateUser },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Không thể cập nhật thông tin người dùng này!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thông tin người dùng thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi xác minh token:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { userID } = req.body;

    const user = await User.findById(userID).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại!",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Lỗi khi xác minh token:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email không hợp lệ!",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Tồn tại người dùng sử dụng email này!",
      });
    }

    const exist2 = await User.findOne({ phone });
    if (exist2) {
      return res.status(400).json({
        success: false,
        message: "Tồn tại người dùng sử dụng số điện thoại này!",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu chưa đủ mạnh!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      phone,
      address: {
        city: "",
        district: "",
        ward: "",
        street: "",
      },
      cartData: [],
      date: Date.now(),
    });

    const savedUser = await newUser.save();
    const user = await User.findById(savedUser._id).select("-password");

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      user,
      token,
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginGG = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "No credential code provided" });
  }

  try {
    const payload = await verifyGGToken(credential);
    const { email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("12345678", salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
        phone: "",
        address: {
          city: "",
          district: "",
          ward: "",
          street: "",
        },
        cartData: [],
        date: Date.now(),
      });
      await user.save();
    }

    const token = createToken(user._id);
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error verifying Google token", error);
    res.status(401).json({ message: "Invalid Google login" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Người dùng không tồn tại!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Thông tin đăng nhập không hợp lệ",
      });
    }

    const token = createToken(user._id);
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "Tồn tại người dùng sử dụng email này!",
      });
    }

    const exist2 = await User.findOne({ phone });
    if (exist2) {
      return res.json({
        success: false,
        message: "Tồn tại người dùng sử dụng số điện thoại này!",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      phone,
      address,
      cartData: [],
      date: Date.now(),
    });

    await newUser.save();

    res.json({ success: true, message: "Thêm người dùng thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const checkUserPassword = async (req, res) => {
  try {
    const userID = req.params.id;
    const { password } = req.body;

    const user = await User.findById(userID);
    if (!user) {
      return res.json({
        success: false,
        message: "Không tồn tại người dùng này!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Mật khẩu không khớp!" });
    }

    res.json({
      success: true,
      message: "Mật khẩu khớp!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const { ...data } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $set: data },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    res.json({
      success: true,
      message: "Cập nhật thông tin thành công!",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const user = await User.findById(userID);
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const user = await User.findByIdAndDelete(userID);
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    res.json({ success: true, message: "Xóa người dùng thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
    await ResetToken.create({ userId: user._id, token: otp, expiresAt });
    await sendMailResetPasswordToken(
      email,
      "Mã xác nhận khôi phục mật khẩu",
      `Mã OTP của bạn là: ${otp}`,
      otp
    );

    res.json({
      success: true,
      message: "Mã xác nhận đã được gửi đến email của bạn!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Email không tồn tại." });

    const resetRecord = await ResetToken.findOne({
      userId: user._id,
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord)
      return res.status(400).json({
        success: false,
        message: "Mã OTP không hợp lệ hoặc đã hết hạn.",
      });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    await ResetToken.deleteMany({ userId: user._id });

    res.json({ success: true, message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        limitPerPage: limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Tài khoản và mật khẩu không hợp lệ!",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

export const totalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ success: true, totalUsers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
