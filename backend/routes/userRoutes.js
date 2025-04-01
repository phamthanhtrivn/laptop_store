import express from 'express'
import { getUser, login, register, updateUser } from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js'

const userRoute = express.Router()

userRoute.post('/login', login)
userRoute.post('/register', register)
userRoute.post('/get', authUser, getUser)
userRoute.post('/update', authUser, updateUser)

export default userRoute