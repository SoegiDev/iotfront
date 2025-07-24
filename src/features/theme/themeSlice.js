
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarShow: true,
    theme: 'light',
  }

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers:{
    show: (state) => {
        state.sidebarShow = !state.sidebarShow;
      }
    }
})
export default themeSlice.reducer
export const {show} = themeSlice.actions