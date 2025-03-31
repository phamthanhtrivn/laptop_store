import express from 'express'
import { productList } from '../controllers/productControllers.js';

const productRoute = express.Router()

productRoute.get('/', productList);

export default productRoute