import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const productList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const { search, brand, category, stock } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; 
    }
    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (stock === "in-stock") query.stock = { $gt: 0 };
    if (stock === "out-of-stock") query.stock = { $eq: 0 };

    const products = await Product.find(query).sort({ date: -1}).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(query);

    res.json({ 
      success: true,
      products,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        limitPerPage: limit,
      }, });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const productListUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const { search, brand, category, sort, price} = req.query;
    

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; 
    }
    if (brand) {
      query.brand = { $in: brand.split(",")}
    }
    if (category) query.category = category;
    if (price && price.min !== undefined && price.max !== undefined) {
      const minPrice = Number(price.min);
      const maxPrice = Number(price.max);

      if (minPrice > 0 || maxPrice > 0) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      }
    }

    let sortOption = {}
    if (sort === "price-asc") sortOption.price = 1
    else if (sort === "price-desc") sortOption.price = -1;
    else sortOption.date = -1

    const products = await Product.find(query).skip(skip).limit(limit).sort(sortOption);
    const totalProducts = await Product.countDocuments(query);

    res.json({ 
      success: true,
      products,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        limitPerPage: limit,
      }, });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const updateData = req.body;

    const product = await Product.findById(productID);
    if (!product) {
      return res.json({
        success: false,
        message: "Sản phẩm không tồn tại để cập nhật!",
      });
    }

    // Lấy danh sách ảnh cũ
    let updatedImages = [...product.images];

    // Xử lý ảnh mới (nếu có)
    const imageFiles = {
      image1: req.files?.image1?.[0],
      image2: req.files?.image2?.[0],
      image3: req.files?.image3?.[0],
      image4: req.files?.image4?.[0],
    };

    await Promise.all(
      Object.entries(imageFiles).map(async ([key, file], index) => {
        if (file) {
          // Upload ảnh mới lên Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });

          // Cập nhật ảnh mới vào đúng vị trí trong mảng
          updatedImages[index] = result.secure_url;
        }
      })
    );

    // Gán lại danh sách ảnh mới vào updateData
    updateData.images = updatedImages;

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      { $set: updateData },
      { new: true }
    );

    res.json({
      success: true,
      message: "Cập nhật sản phẩm thành công!",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;

    const productDelete = await Product.findByIdAndDelete(productID);

    if (!productDelete) {
      return res.json({
        success: false,
        message: "Sản phẩm không tồn tại để xóa!",
      });
    }

    res.json({
      success: true,
      message: "Xóa sản phẩm thành công!",
      product: productDelete,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      stock,
      description,
      category,
      cpu,
      ram,
      storage,
      gpu,
      screen,
    } = req.body;

    const image1 = req?.files?.image1 && req?.files?.image1[0];
    const image2 = req?.files?.image2 && req?.files?.image2[0];
    const image3 = req?.files?.image3 && req?.files?.image3[0];
    const image4 = req?.files?.image4 && req?.files?.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      brand,
      price,
      stock,
      description,
      category,
      specs: {
        cpu,
        gpu,
        ram,
        storage,
        screen,
      },
      images: imageUrl,
      date: Date.now(),
    };

    const product = new Product(productData);

    await product.save();

    res.json({ success: true, message: "Thêm sản phẩm mới thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);

    if (!product) {
      return res.json({ success: false, message: "Sản phẩm không tồn tại!" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
