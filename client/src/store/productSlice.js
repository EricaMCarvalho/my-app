import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const initialState = {
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
  },
});

const { setProducts, setProduct, addProduct, editProduct } =
  productSlice.actions;

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

export const fetchProductDetails = (id) => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data.product));
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

export const createProduct = (productData) => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));
  try {
    const { data } = await axios.post('/api/products', productData);
    dispatch(addProduct(data.product));
    dispatch(
      showNotification({
        status: 'success',
        message: 'Produto adicionado com successo',
      })
    );
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

export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));
  try {
    const { data } = await axios.post('/api/products', productData);
    dispatch(editProduct(data.product));
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
