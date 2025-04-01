import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email không hợp lệ!" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "Tồn tại người dùng sử dụng email này!",
      });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Mật khẩu chưa đủ mạnh!" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      phone: "",
      address: {
        city: "",
        district: "",
        ward: "",
        street: "",
      },
      cartData: [],
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userID, ...data } = req.body
    const updatedUser = await User.findByIdAndUpdate(userID, { $set: data }, {new: true})

    if (!updatedUser) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    res.json({ success: true, message: "Cập nhật thông tin thành công!", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userID } = req.body

    const user = await User.findById(userID)
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    res.json({success: true, user})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
