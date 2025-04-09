import express from 'express'
import { addUser, adminLogin, checkUserPassword, deleteUser, getUser, getUserByEmail, getUserList, login, register, updateUser } from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'

const userRoute = express.Router()

userRoute.post('/login', login)
userRoute.post('/register', register)
userRoute.get('/get/:id', getUser)
userRoute.get('/email-user', getUserByEmail)
userRoute.delete('/delete/:id', authAdmin, deleteUser)
userRoute.post('/update/:id', updateUser)
userRoute.get('/list', authAdmin, getUserList)
userRoute.post('/admin', adminLogin)
userRoute.post('/add', authAdmin, addUser)
userRoute.post('/check-password/:id', checkUserPassword)

export default userRoute