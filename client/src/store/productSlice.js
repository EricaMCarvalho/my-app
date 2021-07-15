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
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

const { setProducts } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));
  try {
    const { data } = await axios.get('/api/products');

    dispatch(setProducts(data.products));
    dispatch(showNotification(null));
  } catch (error) {
    dispatch(
      showNotification({
        status: 'error',
        message:
          error.resonse && error.response.data.error
            ? error.response.data.error
            : error.message,
      })
    );
  }
};

export default productSlice.reducer;
