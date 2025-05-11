import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
import categoryReducer from './categorySlice'
import authReducer from './authSlice'
import orderReducer from './orderSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    category: categoryReducer,
    auth: authReducer,
    order: orderReducer,
  }
})

export default store
