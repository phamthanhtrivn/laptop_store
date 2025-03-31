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
  ratings: {
    average: Number,
    reviews: Number
  }
})

const Product =  mongoose.model('Product', productSchema)

export default Product;