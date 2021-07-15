import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  token: '',
  expiresAt: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.token = '';
      state.expiresAt = 0;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export const signup = (userData) => async (dispatch) => {
  dispatch(
    showNotification({
      status: 'loading',
    })
  );

  try {
    const { data } = await axios.post('/api/auth/signup', userData);

    const { userInfo, token, expiresAt } = data;

    dispatch(authenticate({ userInfo, token, expiresAt }));

    dispatch(
      showNotification({
        status: 'success',
        message: 'Cadastro realizado com sucesso',
      })
    );
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

export const login = (userData) => async (dispatch) => {
  dispatch(
    showNotification({
      status: 'loading',
    })
  );

  try {
    const { data } = await axios.post('/api/auth/login', userData);

    const { userInfo, token, expiresAt } = data;

    dispatch(authenticate({ userInfo, token, expiresAt }));

    dispatch(
      showNotification({
        status: 'success',
        message: 'Login realizado com successo',
      })
    );
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

export default authSlice.reducer;
