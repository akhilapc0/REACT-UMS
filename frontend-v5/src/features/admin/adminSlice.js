
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminToken: localStorage.getItem('adminToken') || null,
  isAdminAuthenticated: !!localStorage.getItem('adminToken'),
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.adminToken = action.payload.token;
      state.isAdminAuthenticated = true;
      localStorage.setItem('adminToken', action.payload.token);
    },
    adminLogout: (state) => {
      state.adminToken = null;
      state.isAdminAuthenticated = false;
      localStorage.removeItem('adminToken');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;