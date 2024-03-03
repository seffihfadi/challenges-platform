import { createSlice } from "@reduxjs/toolkit";

const headerTypes = ['admin', 'participant', 'author']

const initialState = {
  headerType: 'admin',  // [admin, participant, author]
  loader: false
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderType: (state, action) => {
      const type = action.payload
      if (headerTypes.includes(type)) {
        state.headerType = type
      }
    },
    setLoader: (state, action) => {
      state.loader = action.payload
    }
  }
})

export const {setHeaderType, setLoader} = headerSlice.actions
export const selectCurrentHeader = (state) => state.header.headerType
export const loading = (state) => state.header.loader

export default headerSlice.reducer