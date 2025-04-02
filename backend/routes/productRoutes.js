import express from 'express'
import { addProduct, deleteProduct, getProduct, productList, updateProduct } from '../controllers/productControllers.js';
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';

const productRoute = express.Router()

productRoute.get('/', productList);
productRoute.post('/delete/:id', authAdmin, deleteProduct);
productRoute.post('/update/:id', authAdmin, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), updateProduct);
productRoute.get('/get/:id', getProduct);
productRoute.post('/add', authAdmin, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]),addProduct);

export default productRoute