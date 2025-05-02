import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";

const getCartFromSessionStorage = () => {
  const cart = sessionStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};

const saveCartToSessionStorage = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const initializeCart = createAsyncThunk(
  "cart/initializeCart",
  async (_, { getState, dispatch }) => {
    const { user } = getState().auth;
    dispatch(setStatus("loading"));
    try {
      if (user) {
        const response = await axios.get(backendUrl + "/api/cart/get", {
          headers: { token: user.token },
        });
        if (response.data.success) {
          const cartData = response.data.cartData || [];
          const items = cartData.slice();
          const totalQuantity = items.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const totalPrice = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          return { items, totalQuantity, totalPrice };
        } else {
          return { items: [], totalQuantity: 0, totalPrice: 0 };
        }
      } else {
        return getCartFromSessionStorage();
      }
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu giỏ hàng");
      throw error;
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (product, { getState, dispatch }) => {
    const { user } = getState().auth;
    dispatch(cartSlice.actions.addToCart(product));
    try {
      if (user) {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { productId: product._id, quantity: product.quantity },
          { headers: { token: user.token } }
        );
        if (response.data.success) {
          toast.success(response.data.message || "Đã thêm vào giỏ hàng");
          return response.data;
        } else {
          toast.error(response.data.message || "Lỗi khi thêm vào giỏ hàng");
          throw new Error(response.data.message);
        }
      } else {
        const cart = getState().cart;
        saveCartToSessionStorage(cart);
        return cart;
      }
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
      throw error;
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }, { getState, dispatch }) => {
    const { user } = getState().auth;
    dispatch(cartSlice.actions.updateQuantity({ productID: productId, quantity }));
    try {
      if (user) {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { productId, quantity },
          { headers: { token: user.token } }
        );
        if (response.data.success) {
          toast.success(response.data.message || "Đã cập nhật số lượng");
          return response.data;
        } else {
          toast.error(response.data.message || "Lỗi khi cập nhật số lượng");
          throw new Error(response.data.message);
        }
      } else {
        const cart = getState().cart;
        saveCartToSessionStorage(cart);
        return cart;
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật số lượng");
      throw error;
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (productId, { getState, dispatch }) => {
    const { user } = getState().auth;
    dispatch(cartSlice.actions.removeItem(productId));
    try {
      if (user) {
        const response = await axios.post(
          backendUrl + "/api/cart/delete",
          { productId },
          { headers: { token: user.token } }
        );
        if (response.data.success) {
          toast.success(response.data.message || "Đã xóa sản phẩm khỏi giỏ hàng");
          return response.data;
        } else {
          toast.error(response.data.message || "Lỗi khi xóa sản phẩm");
          throw new Error(response.data.message);
        }
      } else {
        const cart = getState().cart;
        saveCartToSessionStorage(cart);
        return cart;
      }
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm");
      throw error;
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { getState, dispatch }) => {
    const { user } = getState().auth;
    dispatch(cartSlice.actions.clearCart());
    try {
      if (user) {
        const response = await axios.post(
          backendUrl + "/api/cart/delete-all",
          {},
          { headers: { token: user.token } }
        );
        if (response.data.success) {
          toast.success(response.data.message || "Đã xóa toàn bộ giỏ hàng");
          return response.data;
        } else {
          toast.error(response.data.message || "Lỗi khi xóa giỏ hàng");
          throw new Error(response.data.message);
        }
      } else {
        sessionStorage.removeItem("cart");
        return { success: true };
      }
    } catch (error) {
      toast.error("Lỗi khi xóa giỏ hàng");
      throw error;
    }
  }
);

export const syncCartOnLogin = createAsyncThunk(
  "cart/syncCartOnLogin",
  async (_, { getState, dispatch }) => {
    const { user } = getState().auth;
    const sessionCart = getCartFromSessionStorage();
    if (user && sessionCart.items.length > 0) {
      dispatch(setStatus("loading"));
      try {
        const response = await axios.get(backendUrl + "/api/cart/get", {
          headers: { token: user.token },
        });
        let backendItems = response.data.success ? response.data.cartData || [] : [];
        const itemsToAdd = [];
        for (const sessionItem of sessionCart.items) {
          const existingItem = backendItems.find(
            (item) => item._id === sessionItem._id
          );
          if (existingItem) {
            const newQuantity = existingItem.quantity + sessionItem.quantity;
            await axios.post(
              backendUrl + "/api/cart/update",
              { productId: sessionItem._id, quantity: newQuantity },
              { headers: { token: user.token } }
            );
          } else {
            itemsToAdd.push(sessionItem);
          }
        }
        for (const item of itemsToAdd) {
          await axios.post(
            backendUrl + "/api/cart/add",
            { productId: item._id, quantity: item.quantity },
            { headers: { token: user.token } }
          );
        }
        sessionStorage.removeItem("cart");
        const updatedResponse = await axios.get(backendUrl + "/api/cart/get", {
          headers: { token: user.token },
        });
        if (updatedResponse.data.success) {
          const cartData = updatedResponse.data.cartData || [];
          const items = cartData.slice();
          const totalQuantity = items.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const totalPrice = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          toast.success("Đã đồng bộ giỏ hàng thành công");
          return { items, totalQuantity, totalPrice };
        } else {
          throw new Error(updatedResponse.data.message || "Lỗi khi đồng bộ giỏ hàng");
        }
      } catch (error) {
        toast.error("Lỗi khi đồng bộ giỏ hàng");
        throw error;
      }
    }
    return null;
  }
);

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
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        state.items = state.items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        state.items.push({ ...product, quantity: product.quantity });
      }
      state.totalQuantity += product.quantity;
      state.totalPrice += product.price * product.quantity;
    },
    removeItem(state, action) {
      const productID = action.payload;
      const product = state.items.find((item) => item._id === productID);
      if (product) {
        state.items = state.items.filter((item) => item._id !== productID);
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.price * product.quantity;
      }
    },
    updateQuantity(state, action) {
      const { productID, quantity } = action.payload;
      const product = state.items.find((item) => item._id === productID);
      if (product) {
        state.items = state.items.map((item) =>
          item._id === productID
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        );
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
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
      .addCase(syncCartOnLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.items;
          state.totalQuantity = action.payload.totalQuantity;
          state.totalPrice = action.payload.totalPrice;
          state.status = "succeeded";
        }
      })
      .addCase(syncCartOnLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCart, setError, setStatus } = cartSlice.actions;
export default cartSlice.reducer;