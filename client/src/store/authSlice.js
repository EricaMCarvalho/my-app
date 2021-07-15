import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from './uiSlice';

const initialState = {
  userInfo: {},
  token: null,
  expiresAt: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearAuthInfo: (state) => {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.token = null;
      state.expiresAt = null;
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;

export const signup = (userData) => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));

  try {
    const { data } = await axios.post('/api/auth/signup', userData);
    const { userInfo, token, expiresAt } = data;
    dispatch(
      setAuthInfo({
        userInfo,
        token,
        expiresAt,
        isAuthenticated: true,
      })
    );
    persistAuthInfo(data);
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

export const login = (userData) => async (dispatch) => {
  dispatch(showNotification({ status: 'loading' }));

  try {
    const { data } = await axios.post('/api/auth/login', userData);
    const { userInfo, token, expiresAt } = data;
    dispatch(
      setAuthInfo({ userInfo, token, expiresAt, isAuthenticated: true })
    );
    persistAuthInfo(data);
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

export const logout = () => (dispatch) => {
  dispatch(clearAuthInfo());
  localStorage.removeItem('roma-userInfo');
  localStorage.removeItem('roma-token');
  localStorage.removeItem('roma-expiresAt');
};

const persistAuthInfo = ({ userInfo, token, expiresAt }) => {
  localStorage.setItem('roma-userInfo', JSON.stringify(userInfo));
  localStorage.setItem('roma-token', token);
  localStorage.setItem('roma-expiresAt', expiresAt);
};

export default authSlice.reducer;
