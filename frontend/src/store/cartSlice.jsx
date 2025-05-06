/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";

// Lấy giỏ hàng từ sessionStorage
const getCartFromSessionStorage = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalPrice: 0 };
};

// Lưu giỏ hàng vào sessionStorage
const saveCartToSessionStorage = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

// Trạng thái khởi tạo
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
  error: null,
};

// Khởi tạo giỏ hàng
export const initializeCart = createAsyncThunk(
  "cart/initializeCart",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    
    try {
      if (token) {
        const response = await axios.get(backendUrl + "/api/cart/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const items = response.data.cartData || [];
          const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return { items, totalQuantity, totalPrice };
        }
      }

      // Không có token hoặc không thành công
      const storedCart = getCartFromSessionStorage();
      return storedCart;
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu giỏ hàng");
      return getCartFromSessionStorage();
    }
  }
);

// Thêm sản phẩm vào giỏ hàng
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (product, { getState, dispatch }) => {
    const token = localStorage.getItem("token");
    dispatch(cartSlice.actions.addToCart(product));
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { product },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          return response.data;
        }
      }

      // Nếu không có token hoặc lỗi
      saveCartToSessionStorage(getState().cart);
      return getState().cart;
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
      return getState().cart;
    }
  }
);

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productID, quantity }, { getState, dispatch }) => {
    const token = localStorage.getItem("token");
    dispatch(cartSlice.actions.updateQuantity({ productID, quantity }));
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { productID, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          return response.data;
        }
      }

      saveCartToSessionStorage(getState().cart);
      return getState().cart;
    } catch (error) {
      toast.error("Lỗi khi cập nhật số lượng");
      return getState().cart;
    }
  }
);

// Xóa sản phẩm khỏi giỏ
export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (productID, { getState, dispatch }) => {
    const token = localStorage.getItem("token");
    dispatch(cartSlice.actions.removeItem(productID));
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/delete",
          { productID },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          return response.data;
        }
      }

      saveCartToSessionStorage(getState().cart);
      return getState().cart;
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm");
      return getState().cart;
    }
  }
);

// Xóa toàn bộ giỏ hàng
export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { getState, dispatch }) => {
    const token = localStorage.getItem("token");
    dispatch(cartSlice.actions.clearCart());
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/delete-all",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          return response.data;
        }
      }

      sessionStorage.removeItem("cart");
      return { success: true };
    } catch (error) {
      toast.error("Lỗi khi xóa giỏ hàng");
      return { success: false };
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.status = "succeeded";
    },
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += product.quantity;
      } else {
        state.items.push({ ...product, quantity: product.quantity });
      }

      state.totalQuantity += product.quantity;
      state.totalPrice += product.price * product.quantity;
    },
    updateQuantity(state, action) {
      const { productID, quantity } = action.payload;
      const product = state.items.find((item) => item._id === productID);

      if (product) {
        product.quantity = Math.max(1, quantity);
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      }
    },
    removeItem(state, action) {
      const productID = action.payload;
      const product = state.items.find((item) => item._id === productID);
      if (product) {
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.price * product.quantity;
        state.items = state.items.filter((item) => item._id !== productID);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.status = "succeeded";
      })
      .addCase(initializeCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Export
export const {
  setCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  setStatus,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
