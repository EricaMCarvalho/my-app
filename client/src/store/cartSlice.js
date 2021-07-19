import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const cartItems = JSON.parse(localStorage.getItem('roma-cartItems')) || [];

const count = cartItems.reduce((total, current) => total + current.qty, 0);

const initialState = {
  cartItems,
  count,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartInfo: (state, action) => {
      state.count = action.payload.count;
      state.totalPrice = action.payload.totalPrice;
    },
    addItemsToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.qty = existingItem.qty + action.payload.qty;
      } else {
        state.cartItems.push(action.payload);
      }

      state.count = state.count + action.payload.qty;
    },
    updateItemQty: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.qty = action.payload.qty;
    },
    removeItemsFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.count = state.count - action.payload.qty;
    },
  },
});

export const { addItemsToCart, updateItemQty, removeItemsFromCart } =
  cartSlice.actions;

export const createOrder = (orderData) => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));

  try {
    await axios.post('/api/orders', orderData);

    dispatch(showNotification(null));
  } catch (error) {
    dispatch(
      showNotification({
        status: 'error',
        message:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      })
    );
  }
};

export default cartSlice.reducer;
