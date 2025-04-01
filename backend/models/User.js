import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true},
  password: String,
  phone: { type: String, default: ""},
  cartData: {
    type: Array, default: []
  },
  address: { type: Object, default: {}}
}, {minimize: false})

const User = mongoose.model.user || mongoose.model('user', userSchema)

export default User;