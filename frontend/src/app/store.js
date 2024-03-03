import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../features/api/apiSlice"
import authReducer from '../features/auth/authSlice'
import headerReducer from '../features/ui/headerSlice'
import alertReducer from '../features/ui/alertSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    header: headerReducer, 
    alert: alertReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})