import { createSlice } from '@reduxjs/toolkit';

const initialState = { notification: null };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const { showNotification } = uiSlice.actions;

export default uiSlice.reducer;
