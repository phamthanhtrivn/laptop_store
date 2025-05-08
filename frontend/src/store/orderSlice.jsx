import { createSlice } from "@reduxjs/toolkit"

const inititalState = {
  orders: [],
  status: 'idle',
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: inititalState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})
export const { setOrders, setLoading, setError, setSuccess, setMessage } = orderSlice.actions