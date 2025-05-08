/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";

// Thunk để khởi tạo trạng thái xác thực
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue({ message: "Không có token" });
    }

    try {
      const response = await axios.get(backendUrl + "/api/user/verifyToken", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        return rejectWithValue({ message: "Token không hợp lệ" });
      }

      return { user: response.data.user, token: response.data.token };
    } catch (error) {
      const message = error.response?.data || {
        message: "Không thể xác thực người dùng",
      };
      return rejectWithValue(message);
    }
  }
);

// Thunk để đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        return { user: response.data.user, token: response.data.token };
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk để đăng ký
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, phone }, { rejectWithValue }) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
        phone,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        return { user: response.data.user, token: response.data.token };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Lỗi khi đăng ký";
      return rejectWithValue({ message });
    }
  }
);

// Thunk để đăng xuất
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Lỗi khi đăng xuất";
      return rejectWithValue({ message });
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        backendUrl + "/api/user/updateInfo",
        {
          name: user.name,
          phone: user.phone,
          city: user.city,
          district: user.district,
          ward: user.ward,
          street: user.street,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return { user: response.data.user, token: response.data.token };
      } else {
        toast.success(response.data.message);
        return rejectWithValue(response.data);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Lỗi khi cập nhật thông tin";
      return rejectWithValue({ message });
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      state.status = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // initializeAuth
      .addCase(initializeAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = action.payload?.message || "Không thể xác thực";
      })
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Lỗi khi đăng nhập";
      })
      // register
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Lỗi khi đăng ký";
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Lỗi khi đăng xuất";
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Lỗi khi cập nhật thông tin";
      });
  },
});

export const { setAuthStatus, setAuthError } = authSlice.actions;
export default authSlice.reducer;
