import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  stock: Number,
  description: String,
  images: [String],
  category: String,
  specs: {
    cpu: String,
    ram: String,
    storage: String,
    gpu: String,
    screen: String
  },
  date: Number
})

const Product = mongoose.models.product ||  mongoose.model('product', productSchema)

export default Product;