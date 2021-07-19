import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const initialState = JSON.parse(localStorage.getItem('roma-cartItems')) || [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.qty = existingItem.qty + action.payload.qty;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { addItemsToCart } = cartSlice.actions;

export default cartSlice.reducer;
