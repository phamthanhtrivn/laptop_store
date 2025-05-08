import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
