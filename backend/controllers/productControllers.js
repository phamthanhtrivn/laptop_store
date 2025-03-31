import Product from "../models/Product.js";

export const productList = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json({success: true, products})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}
