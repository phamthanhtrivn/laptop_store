import express from 'express'
import authUser from '../middlewares/authUser.js'
import { addToCart, deleteAllCart, deleteCartItem, getCart, updateCart } from '../controllers/cartControllers.js'

const cartRoute = express.Router()

cartRoute.get('/get', authUser, getCart)
cartRoute.post('/add', authUser, addToCart)
cartRoute.post('/update', authUser, updateCart)
cartRoute.post('/delete', authUser, deleteCartItem)
cartRoute.post('/delete-all', authUser, deleteAllCart)

export default cartRoute