import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

//  login -> USER
export const login = createAsyncThunk(
  'auth/USER_LOGIN',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', user);
      return { user };
    } catch (error) {
      return rejectWithValue(error.response?.data.message || 'An error ');
    }
  }
);


// Register -> USER
export const register = createAsyncThunk(
  'auth/USER_REGISTER',
  async ({ name, email, password,date_of_birth }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password,
        date_of_birth
      });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', user);
      return { user };
    } catch (error) {
      return rejectWithValue(error.response?.data.message || 'An error ');
    }
  }
);


// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('userInfo') || null,
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    isLoading: false,
    error: null,
  },
  reducers: {
    // for USER LOGOUT
    logout: (state) => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('authToken');
        state.isAuthenticated = false;
        state.userRole = null;
        state.user = null;
        state.isLoading = false;
        state.error = null;
    }
  },
    extraReducers: (builder) => {
      builder
        // for USER login
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        // for USER REGISTERATION
        .addCase(register.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
    },
  });

export const { logout } = authSlice.actions;
export default authSlice.reducer;
