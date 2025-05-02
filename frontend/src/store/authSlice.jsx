import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config/config";

// Thunk để đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message || "Đăng nhập thành công");
        return {
          user: response.data.user,
          token: response.data.token,
        };
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Lỗi khi đăng nhập";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Thunk để đăng xuất
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Gọi API đăng xuất nếu backend yêu cầu
      const response = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        {
          headers: { token: localStorage.getItem("token") }, // Nếu lưu token trong localStorage
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Đã đăng xuất");
        return true;
      } else {
        toast.error(response.data.message || "Lỗi khi đăng xuất");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Lỗi khi đăng xuất";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Thunk để kiểm tra trạng thái đăng nhập khi tải lại trang
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      // Giả sử token được lưu trong localStorage sau khi đăng nhập
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${backendUrl}/api/auth/me`, {
          headers: { token },
        });
        if (response.data.success) {
          return {
            user: response.data.user,
            token,
          };
        } else {
          localStorage.removeItem("token");
          return rejectWithValue(response.data.message);
        }
      }
      return null; // Không có token, không đăng nhập
    } catch (error) {
      localStorage.removeItem("token");
      const message = error.response?.data?.message || "Lỗi khi kiểm tra trạng thái đăng nhập";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null, // { id, email, username, ... } hoặc null nếu chưa đăng nhập
  token: null, // Token xác thực
  isAuthenticated: false, // Trạng thái đăng nhập
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Lỗi nếu có
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Xử lý login
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token); // Lưu token
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Xử lý logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Vẫn xóa state để đảm bảo client-side nhất quán
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      })
      // Xử lý initializeAuth
      .addCase(initializeAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;