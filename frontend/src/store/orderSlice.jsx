import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";

// Thunk để lấy lịch sử đơn hàng của người dùng
export const initializeOrders = createAsyncThunk(
  // "order/initializeOrders",
  // async (_, { rejectWithValue, getState }) => {
  //   try {
  //     const { token } = getState().auth; // Giả sử token nằm trong auth slice
  //     const response = await axios.get(`${backendUrl}/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     return rejectWithValue(error.response?.data?.message || error.message);
  //   }
  // }
);

// Thunk để đặt hàng
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để đặt hàng!");
        return rejectWithValue({ message: "Không có token" });
      }
      const response = await axios.post(`${backendUrl}/api/orders/place-order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    resetOrderState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Xử lý fetchUserOrders (lấy lịch sử đơn hàng)
    builder
      .addCase(initializeOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(initializeOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Cập nhật danh sách đơn hàng
        state.error = null;
      })
      .addCase(initializeOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý placeOrder (đặt hàng)
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload); // Thêm đơn hàng mới vào danh sách
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;