import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products asynchronously
export const fetchProducts = createAsyncThunk("cart/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const initialState = {
  products: [],
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
  error: null,
  count: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const item = state.cartItems.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      
    },

    removeFromCart: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter((p) => p.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);
      if (item) {
        state.totalQuantity += action.payload.amount - item.quantity;
        state.totalPrice += item.price * (action.payload.amount - item.quantity);
        item.quantity = action.payload.amount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
