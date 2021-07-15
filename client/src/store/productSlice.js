import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state) => {},
  },
});

export const fetchProducts = () => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));

  const { data } = axios.get('/api/products');
};

export default productSlice.reducer;
