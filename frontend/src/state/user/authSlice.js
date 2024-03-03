// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authService from "../../hooks/api/authService";
// import { useDispatch } from "react-redux";

// const initialState = {
//   user: null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: ''
// }


// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isError = false,
//       state.isLoading = false,
//       state.isSuccess = false,
//       state.message = ''
//     }
//   },
//   extraReducers: (builder) => {
    
//     builder
//       .addCase(getUser.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(getUser.fulfilled, (state, action) => {
//         state.isLoading = false,
//         state.isSuccess = true,
//         state.user = action.payload
//       })
//       .addCase(getUser.rejected, (state, action) => {
//         state.isError = true,
//         state.isLoading = false, 
//         state.message = action.payload
//         state.user = null
//       })
//   }
// })
  
  
// // signup user
// export const getUser = createAsyncThunk(
//   'user/getuser',
//   async (thunkAPI) => {
//     try {
//       return authService.getUser()
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message)
//     }
//   }
// )

// export const { reset } = authSlice.actions
// export default authSlice.reducer
