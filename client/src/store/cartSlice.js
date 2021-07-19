import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('roma-cartItems')) || [],
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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
  },
});

export const { addItemsToCart } = cartSlice.actions;

export default cartSlice.reducer;
