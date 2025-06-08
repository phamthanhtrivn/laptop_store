import express from 'express'
import authUser from '../middlewares/authUser.js'
import { allOrders, bestSellingProduct, placeOrder, totalOrders, totalRevenue, updateStatus, userOrders } from '../controllers/orderControllers.js'
import authAdmin from '../middlewares/authAdmin.js'

const orderRoute = express.Router()

orderRoute.get('/user', authUser, userOrders)
orderRoute.post('/place-order', authUser, placeOrder)

orderRoute.get('/all-orders', authAdmin, allOrders)
orderRoute.post('/update-status', authAdmin, updateStatus)
orderRoute.get('/total-revenue', totalRevenue)
orderRoute.get('/total-orders', totalOrders)
orderRoute.get('/best-selling', bestSellingProduct)

export default orderRoute;