import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
import categoryReducer from './categorySlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    category: categoryReducer,
  }
})

export default store
