import express from 'express'
import authUser from '../middlewares/authUser.js'
import { allOrders, placeOrder, updateStatus, userOrders } from '../controllers/orderControllers.js'
import authAdmin from '../middlewares/authAdmin.js'

const orderRoute = express.Router()

orderRoute.get('/user', authUser, userOrders)
orderRoute.get('/all-orders', authAdmin, allOrders)
orderRoute.post('/update-status', authAdmin, updateStatus)
orderRoute.post('/place-order', authUser, placeOrder)

export default orderRoute;