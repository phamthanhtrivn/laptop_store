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
  }
})

const Product = mongoose.model.product ||  mongoose.model('product', productSchema)

export default Product;