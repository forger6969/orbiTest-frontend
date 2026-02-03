import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return rejectWithValue('No token')

      const response = await axios.get(import.meta.env.VITE_BACKEND_API + '/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data);
      
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Server error')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuth = false
      state.user = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuth = true
        state.user = action.payload
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false
        state.isAuth = false
        state.user = null
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer