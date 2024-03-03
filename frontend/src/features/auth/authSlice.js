import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload
      state.user = user
    }
  },
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user